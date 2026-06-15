package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.*;
import com.questio.questio_backend.entity.Class;
import com.questio.questio_backend.entity.SubmitTask;
import com.questio.questio_backend.entity.Task;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.repository.ClassRepository;
import com.questio.questio_backend.repository.SubmitRepository;
import com.questio.questio_backend.repository.TaskRepository;
import com.questio.questio_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository tarefaRepository;
    private final SubmitRepository submissaoRepository;
    private final ClassRepository turmaRepository;
    private final GamificationService gamificationService;
    private final UserRepository userRepository;

    // 🔥 CORREÇÃO: Método alterado para extrair o e-mail (String) de forma segura e buscar o User completo do banco
    private User getUsuarioAutenticado() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal == null || principal.toString().equals("anonymousUser")) {
            throw new RuntimeException("Usuário não autenticado");
        }

        String email = (principal instanceof UserDetails userDetails) ?
                userDetails.getUsername() : principal.toString();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado para o e-mail: " + email));
    }

    @Transactional
    public TaskResponseDTO criarTarefa(TaskRequestDTO dto) {
        User professor = getUsuarioAutenticado();

        Class turma = turmaRepository.findById(dto.idClass())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        Task novaTarefa = Task.builder()
                .titulo(dto.titulo())
                .descricao(dto.descricao())
                .prazo(dto.prazo())
                .pontos(dto.pontos())
                .status("Pendente")
                .professor(professor)
                .turma(turma)
                .build();

        Task salva = tarefaRepository.save(novaTarefa);

        return new TaskResponseDTO(salva.getIdTask(), salva.getTitulo(), salva.getDescricao(), salva.getPrazo(), false, salva.getPontos());
    }

    @Transactional
    public String submeterTarefa(UUID idTarefa) {
        User aluno = getUsuarioAutenticado();

        if (Boolean.TRUE.equals(aluno.getAcessoBloqueado())) {
            throw new RuntimeException("Acesso bloqueado. Entre em contato com a coordenação.");
        }

        Task tarefa = tarefaRepository.findById(idTarefa)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

        if (submissaoRepository.existsByAlunoAndTarefa(aluno, tarefa)) {
            throw new RuntimeException("Você já submeteu esta tarefa!");
        }

        SubmitTask submissao = SubmitTask.builder()
                .aluno(aluno)
                .tarefa(tarefa)
                .status("Concluido")
                .enviadoEm(LocalDateTime.now())
                .build();

        submissaoRepository.save(submissao);

        gamificationService.touchActivity(aluno.getIdUsuario());
        gamificationService.addXp(aluno.getIdUsuario(), tarefa.getPontos() == null ? 0 : tarefa.getPontos());

        return "Tarefa concluída com sucesso! +" + tarefa.getPontos() + " XP";
    }

    @Transactional
    public void alunoEntrarNaTurma(UUID idTurma) {
        User user = getUsuarioAutenticado();

        User aluno = userRepository.findByIdWithTurmas(user.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Class turma = turmaRepository.findById(idTurma)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        aluno.getTurmas().add(turma);
        turma.getAlunos().add(aluno);
        turmaRepository.save(turma);
    }

    @Transactional
    public List<TaskResponseDTO> listarTarefasDoAluno() {
        User alunoPrincipal = getUsuarioAutenticado();

        // Busca o aluno trazendo junto as turmas dele para evitar LazyInitializationException
        User aluno = userRepository.findByIdWithTurmas(alunoPrincipal.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (Boolean.TRUE.equals(aluno.getAcessoBloqueado())) {
            throw new RuntimeException("Acesso bloqueado.");
        }

        Set<Class> turmas = aluno.getTurmas();

        // ============ LOGS DE DIAGNÓSTICO DO PROCESSO ============
        System.out.println(">>> ID do aluno: " + aluno.getIdUsuario());
        System.out.println(">>> Nome do aluno: " + aluno.getNome());
        System.out.println(">>> Qtd turmas vinculadas ao aluno: " + turmas.size());
        turmas.forEach(t -> System.out.println("    - Turma mapeada: " + t.getIdClass() + " | " + t.getNome()));

        if (turmas.isEmpty()) {
            System.out.println(">>> Alerta: O aluno não está matriculado em NENHUMA turma.");
            return Collections.emptyList();
        }

        List<Task> tarefas = tarefaRepository.findByTurmaIn(turmas);
        System.out.println(">>> Qtd tarefas encontradas para essas turmas: " + tarefas.size());
        tarefas.forEach(t -> System.out.println("    - Tarefa: " + t.getTitulo() + " | Pertence à Turma: " + t.getTurma().getIdClass()));
        // =========================================================

        return tarefas.stream()
                .map(t -> {
                    boolean isConcluida = submissaoRepository.existsByAlunoAndTarefa(aluno, t);
                    return new TaskResponseDTO(
                            t.getIdTask(),
                            t.getTitulo(),
                            t.getDescricao(),
                            t.getPrazo(),
                            isConcluida,
                            t.getPontos()
                    );
                })
                .toList();
    }
    @Transactional
    public List<ClassResponseDTO> listarTurmasDoProfessor() {
        User professor = getUsuarioAutenticado();
        return turmaRepository.findByProfessorIdUsuario(professor.getIdUsuario())
                .stream()
                .map(t -> new ClassResponseDTO(t.getIdClass(), t.getNome(), professor.getNome(), t.isAtiva()))
                .toList();
    }

    @Transactional
    public List<DesempenhoAlunoDTO> desempenhoPorTurma(UUID idTurma) {
        List<Task> tarefas = tarefaRepository.findByTurmaIdClass(idTurma);
        Class turma = turmaRepository.findById(idTurma)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        return turma.getAlunos().stream().map(aluno -> {
            int total = tarefas.size();
            int concluidas = (int) tarefas.stream()
                    .filter(t -> submissaoRepository.existsByAlunoAndTarefa(aluno, t))
                    .count();

            List<TarefaPendenteDTO> pendentes = tarefas.stream()
                    .filter(t -> !submissaoRepository.existsByAlunoAndTarefa(aluno, t))
                    .map(t -> new TarefaPendenteDTO(
                            t.getIdTask(),
                            t.getTitulo(),
                            t.getPrazo() != null ? t.getPrazo().toString() : null,
                            null
                    ))
                    .toList();

            return new DesempenhoAlunoDTO(
                    aluno.getIdUsuario(),
                    aluno.getNome(),
                    concluidas,
                    total,
                    total == 0 ? null : (concluidas * 100.0 / total),
                    pendentes
            );
        }).toList();
    }

    @Transactional
    public void avaliarTarefa(UUID idTarefa, AvaliacaoDTO dto) {
        // Implementar quando SubmitTask tiver campos de nota/feedback
    }
}

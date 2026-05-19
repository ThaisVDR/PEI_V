package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.SubmitRequestDTO;
import com.questio.questio_backend.dto.TaskRequestDTO;
import com.questio.questio_backend.dto.TaskResponseDTO;
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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository tarefaRepository;
    private final SubmitRepository submissaoRepository;
    private final UserRepository userRepository;
    private final ClassRepository turmaRepository;

    @Transactional
    public TaskResponseDTO criarTarefa(TaskRequestDTO dto) {
        User professor = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

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

        return new TaskResponseDTO(salva.getIdTask(), salva.getTitulo(), salva.getPontos(), salva.getStatus());
    }
    @Transactional
    public String submeterTarefa(SubmitRequestDTO dto) {
        User aluno = (User) Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getPrincipal();

        Task tarefa = tarefaRepository.findById(dto.idTask())
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

        if (submissaoRepository.existsByAlunoAndTarefa(aluno, tarefa)) {
            throw new RuntimeException("Você já submeteu esta tarefa!");
        }

        SubmitTask submissao = SubmitTask.builder()
                .aluno(aluno)
                .tarefa(tarefa)
                .arquivoUrl(dto.arquivoUrl())
                .status("Concluido")
                .enviadoEm(LocalDateTime.now())
                .build();

        submissaoRepository.save(submissao);

        this.updateUserXp(aluno, tarefa.getPontos());

        return "Tarefa enviada com sucesso! +" + tarefa.getPontos() + " XP";
    }

    private void updateUserXp(User user, Integer pontosGanhos) {
        int xpAtual = (user.getXpTotal() != null) ? user.getXpTotal() : 0;
        int novoXp = xpAtual + pontosGanhos;
        user.setXpTotal(novoXp);

        int novoNivel = (int) (Math.sqrt(novoXp) / 10) + 1;

        if (novoNivel > user.getNivel()) {
            user.setNivel(novoNivel);
        }

        userRepository.save(user);
    }

    public List<TaskResponseDTO> listarTarefasDoAluno() {

        User aluno = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Set<Class> turmas = aluno.getTurmas();

        return tarefaRepository.findByTurmaIn(turmas).stream()
                .map(t -> new TaskResponseDTO(
                        t.getIdTask(),
                        t.getTitulo(),
                        t.getPontos(),
                        t.getStatus()
                ))
                .toList();
    }
}

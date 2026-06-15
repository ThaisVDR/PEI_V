package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.ClassRequestDTO;
import com.questio.questio_backend.dto.ClassResponseDTO;
import com.questio.questio_backend.dto.EnrolmentRequestDTO;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.repository.ClassRepository;
import com.questio.questio_backend.repository.UserRepository;
import com.questio.questio_backend.entity.Class;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassService {

    private final UserRepository userRepository;
    private final ClassRepository turmaRepository;

    @Transactional
    public ClassResponseDTO criarTurma(ClassRequestDTO dto) {

        User usuario = (User) userRepository.findById(dto.idProfessor())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean isProfessor = usuario.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_PROFESSOR"));

        if (!isProfessor) {
            throw new RuntimeException("Operação Inválida: O usuário selecionado não possui perfil de Professor.");
        }

        Class novaTurma = Class.builder()
                .nome(dto.nome())
                .professor(usuario)
                .build();

        return mapToDTO(turmaRepository.save(novaTurma));
    }

    private ClassResponseDTO mapToDTO(Class turma) {
        return new ClassResponseDTO(
                turma.getIdClass(),
                turma.getNome(),
                turma.getProfessor().getNome(),
                turma.isAtiva()
        );
    }


    @Transactional
    public String matricularTodosAlunosSemTurma() {
        Class turma = turmaRepository.findAll().stream()
                .filter(Class::isAtiva)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Nenhuma turma ativa encontrada"));

        List<User> alunosSemTurma = userRepository.findByTipoUsuario(com.questio.questio_backend.entity.enums.TipoUsuario.ALUNO).stream()
                .filter(u -> u.getTurmas().isEmpty())
                .toList();

        for (User aluno : alunosSemTurma) {
            aluno.getTurmas().add(turma);
            turma.getAlunos().add(aluno);
        }

        turmaRepository.save(turma);

        return "Matriculados " + alunosSemTurma.size() + " alunos na turma " + turma.getNome();
    }

    @Transactional
    public void matricularAlunos(EnrolmentRequestDTO dto) {
        Class turma = turmaRepository.findById(dto.idTurma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        List<User> usuarios = userRepository.findAllById(dto.idsAlunos());

        for (User usuario : usuarios) {
            boolean isAluno = usuario.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ALUNO"));

            if (!isAluno) {
                throw new RuntimeException("O usuário " + usuario.getNome() + " não é um Aluno e não pode ser matriculado.");
            }

            turma.getAlunos().add(usuario);
            usuario.getTurmas().add(turma);
        }
        turmaRepository.save(turma);
    }

    public List<ClassResponseDTO> listarTurmasDoProfessor(UUID idProfessor) {
        return turmaRepository.findByProfessorIdUsuario(idProfessor)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public List<ClassResponseDTO> listarTurmas() {
        return turmaRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // 🔥 LÓGICA IMPLEMENTADA E CORRIGIDA:
    @Transactional
    public void alunoEntrarNaTurma(UUID idTurma) {
        // 1. Captura o principal de forma genérica para evitar ClassCastException
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal == null || principal.toString().equals("anonymousUser")) {
            throw new RuntimeException("Usuário não autenticado");
        }

        String email = (principal instanceof UserDetails userDetails) ?
                userDetails.getUsername() : principal.toString();

        // 2. Busca o aluno no banco pelo e-mail
        User alunoPrincipal = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 3. Recarrega o aluno com a coleção de turmas inicializada
        User aluno = userRepository.findByIdWithTurmas(alunoPrincipal.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 4. Busca a turma pelo ID informado na rota
        Class turma = turmaRepository.findById(idTurma)
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        // 5. Adiciona os vínculos recíprocos na memória
        aluno.getTurmas().add(turma);
        turma.getAlunos().add(aluno);

        // 6. Salva ambos os repositórios para forçar a persistência da tabela intermediária ManyToMany
        turmaRepository.save(turma);
        userRepository.save(aluno);
    }
}

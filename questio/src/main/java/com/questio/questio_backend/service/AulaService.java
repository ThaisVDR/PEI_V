package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.AulaRequestDTO;
import com.questio.questio_backend.dto.AulaResponseDTO;
import com.questio.questio_backend.dto.GradeRequestDTO;
import com.questio.questio_backend.entity.Aula;
import com.questio.questio_backend.entity.Class;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.repository.AulaRepository;
import com.questio.questio_backend.repository.ClassRepository;
import com.questio.questio_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository aulaRepository;
    private final UserRepository userRepository;
    private final ClassRepository turmaRepository;

    @Transactional
    public List<AulaResponseDTO> salvarGrade(GradeRequestDTO dto) {
        return dto.aulas().stream()
                .map(this::salvarAula)
                .toList();
    }

    private AulaResponseDTO salvarAula(AulaRequestDTO dto) {
        User professor = userRepository.findById(dto.idProfessor())
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        Class turma = turmaRepository.findById(dto.idTurma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        Aula aula = Aula.builder()
                .diaSemana(dto.diaSemana())
                .horario(dto.horario())
                .disciplina(dto.disciplina())
                .sala(dto.sala())
                .professor(professor)
                .turma(turma)
                .build();

        return mapToDTO(aulaRepository.save(aula));
    }

    public List<AulaResponseDTO> listarPorTurma(UUID idTurma) {
        return aulaRepository.findByTurmaIdClass(idTurma)
                .stream().map(this::mapToDTO).toList();
    }

    public List<AulaResponseDTO> listarPorProfessor(UUID idProfessor) {
        return aulaRepository.findByProfessorIdUsuario(idProfessor)
                .stream().map(this::mapToDTO).toList();
    }

    private AulaResponseDTO mapToDTO(Aula a) {
        return new AulaResponseDTO(
                a.getIdAula(),
                a.getDiaSemana(),
                a.getHorario(),
                a.getDisciplina(),
                a.getSala(),
                a.getProfessor().getNome(),
                a.getTurma().getNome()
        );
    }
}
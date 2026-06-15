package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.CursoRequestDTO;
import com.questio.questio_backend.dto.CursoResponseDTO;
import com.questio.questio_backend.dto.DisciplinaResponseDTO;
import com.questio.questio_backend.entity.Curso;
import com.questio.questio_backend.entity.Disciplina;
import com.questio.questio_backend.repository.CursoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CursoService {

    private final CursoRepository cursoRepository;

    @Transactional
    public CursoResponseDTO criarCurso(CursoRequestDTO dto) {
        Curso curso = Curso.builder()
                .nome(dto.nome())
                .descricao(dto.descricao())
                .cargaHoraria(dto.cargaHoraria())
                .semestre(dto.semestre())
                .coordenador(dto.coordenador())
                .vagas(dto.vagas())
                .ativo(true)
                .build();

        if (dto.disciplinas() != null) {
            List<Disciplina> disciplinas = dto.disciplinas().stream()
                    .map(d -> Disciplina.builder()
                            .nome(d.nome())
                            .cargaHoraria(d.cargaHoraria())
                            .curso(curso)
                            .build())
                    .toList();
            curso.getDisciplinas().addAll(disciplinas);
        }

        return mapToDTO(cursoRepository.save(curso));
    }

    public List<CursoResponseDTO> listarCursos() {
        return cursoRepository.findAll().stream()
                .map(this::mapToDTO)
                .toList();
    }

    private CursoResponseDTO mapToDTO(Curso curso) {
        List<DisciplinaResponseDTO> disciplinas = curso.getDisciplinas().stream()
                .map(d -> new DisciplinaResponseDTO(d.getIdDisciplina(), d.getNome(), d.getCargaHoraria()))
                .toList();

        return new CursoResponseDTO(
                curso.getIdCurso(),
                curso.getNome(),
                curso.getDescricao(),
                curso.getCargaHoraria(),
                curso.getSemestre(),
                curso.getCoordenador(),
                curso.getVagas(),
                curso.getAtivo(),
                disciplinas
        );
    }
}
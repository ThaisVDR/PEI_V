// CursoRequestDTO.java
package com.questio.questio_backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record CursoRequestDTO(
        @NotBlank String nome,
        String descricao,
        String cargaHoraria,
        String semestre,
        String coordenador,
        Integer vagas,
        List<DisciplinaRequestDTO> disciplinas
) {}
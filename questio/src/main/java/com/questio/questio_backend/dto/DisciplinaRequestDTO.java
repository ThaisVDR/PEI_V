// DisciplinaRequestDTO.java
package com.questio.questio_backend.dto;

import jakarta.validation.constraints.NotBlank;

public record DisciplinaRequestDTO(
        @NotBlank String nome,
        String cargaHoraria
) {}
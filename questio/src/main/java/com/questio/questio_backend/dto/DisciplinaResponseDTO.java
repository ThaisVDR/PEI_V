// DisciplinaResponseDTO.java
package com.questio.questio_backend.dto;

import java.util.UUID;

public record DisciplinaResponseDTO(
        UUID idDisciplina,
        String nome,
        String cargaHoraria
) {}
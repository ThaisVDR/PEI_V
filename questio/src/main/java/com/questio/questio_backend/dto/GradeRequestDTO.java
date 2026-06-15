// GradeRequestDTO.java — para salvar várias aulas de uma vez
package com.questio.questio_backend.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record GradeRequestDTO(
        @NotEmpty List<AulaRequestDTO> aulas
) {}
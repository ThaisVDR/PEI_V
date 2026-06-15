package com.questio.questio_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record AulaRequestDTO(
        @NotBlank String diaSemana,
        @NotBlank String horario,
        @NotBlank String disciplina,
        String sala,
        @NotNull UUID idProfessor,
        @NotNull UUID idTurma
) {}
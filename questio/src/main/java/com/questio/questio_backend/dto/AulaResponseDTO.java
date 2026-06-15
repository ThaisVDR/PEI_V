package com.questio.questio_backend.dto;

import java.util.UUID;

public record AulaResponseDTO(
        UUID idAula,
        String diaSemana,
        String horario,
        String disciplina,
        String sala,
        String nomeProfessor,
        String nomeTurma
) {}
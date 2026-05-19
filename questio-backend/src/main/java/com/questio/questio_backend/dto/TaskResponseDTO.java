package com.questio.questio_backend.dto;

import java.util.UUID;

public record TaskResponseDTO(
        UUID idTask,
        String titulo,
        Integer pontos,
        String status
) {}

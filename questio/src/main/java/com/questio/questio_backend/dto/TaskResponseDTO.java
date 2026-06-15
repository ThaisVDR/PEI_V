package com.questio.questio_backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskResponseDTO(
        UUID id,
        String titulo,
        String descricao,
        LocalDateTime prazo,
        boolean concluida,
        Integer pontos
) {}
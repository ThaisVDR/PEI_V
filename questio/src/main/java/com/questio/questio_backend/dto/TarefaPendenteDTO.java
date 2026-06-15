package com.questio.questio_backend.dto;

import java.util.UUID;

public record TarefaPendenteDTO(
        UUID id,
        String titulo,
        String dataEntrega,
        String resposta
) {}
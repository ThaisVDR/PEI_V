package com.questio.questio_backend.dto;

public record AvaliacaoDTO(
        Integer nota,
        String feedback,
        Boolean avaliadoPorIA
) {}
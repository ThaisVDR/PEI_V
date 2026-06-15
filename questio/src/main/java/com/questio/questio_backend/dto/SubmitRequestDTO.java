package com.questio.questio_backend.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SubmitRequestDTO(@NotNull UUID idTask, String arquivoUrl) {

}
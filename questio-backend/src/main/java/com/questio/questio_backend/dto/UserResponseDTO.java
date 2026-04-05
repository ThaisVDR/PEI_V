package com.questio.questio_backend.dto;

import com.questio.questio_backend.entity.enums.TipoUsuario;
import lombok.*;

import java.util.List;
import java.util.UUID;


@Builder
public record UserResponseDTO(
        UUID idUsuario,
        String nome,
        String email,
        TipoUsuario tipoUsuario,
        Integer xpTotal,
        Integer nivel,
        Integer streakAtual,
        List<String> turmas,
        String mensagem
) {}

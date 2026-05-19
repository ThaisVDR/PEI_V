package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.LoginRequestDTO;
import com.questio.questio_backend.dto.UserRankingResponseDTO;
import com.questio.questio_backend.dto.UserRegisterRequestDTO;
import com.questio.questio_backend.dto.UserResponseDTO;
import jakarta.validation.Valid;

import java.util.UUID;

public interface UserService {
    UserResponseDTO registerNewUser (UserRegisterRequestDTO request);

    UserResponseDTO getUserProfile (UUID userId);

    UserResponseDTO updateStreak(UUID userId, Integer novosPontos);

    Object login(@Valid LoginRequestDTO data);

    /**
     * Retorna o perfil do usuário autenticado no momento.
     * Obs.: o comportamento depende do fluxo de autenticação (JWT).
     */
    UserResponseDTO getAuthenticatedUserProfile();

    /**
     * Retorna o ranking (placeholder por enquanto).
     */
    UserRankingResponseDTO getUserRankingStatus();
}

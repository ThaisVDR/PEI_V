package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.UserRegisterRequestDTO;
import com.questio.questio_backend.dto.UserResponseDTO;

import java.util.UUID;

public interface UserService {
    UserResponseDTO registerNewUser (UserRegisterRequestDTO request);

    UserResponseDTO getUserProfile (UUID userId);

    UserResponseDTO updateStreak(UUID userId, Integer novosPontos);
}

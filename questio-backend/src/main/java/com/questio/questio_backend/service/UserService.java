package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.UserRegisterRequestDTO;
import com.questio.questio_backend.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO registerNewUser (UserRegisterRequestDTO request);

    UserResponseDTO getUserProfile (Long userId);

    UserResponseDTO updateStreak(Long userId, Integer novosPontos);
}

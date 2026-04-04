package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.UserRankingResponseDTO;
import com.questio.questio_backend.dto.UserResponseDTO;

import java.util.List;

public interface UserService {
    UserResponseDTO getAuthenticatedUserProfile();
    UserRankingResponseDTO getUserRankingStatus();
}

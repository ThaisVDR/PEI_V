package com.questio.questio_backend.controller;

import com.questio.questio_backend.dto.UserResponseDTO;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.repository.UserRepository;
import com.questio.questio_backend.service.GamificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // ADICIONE ESTE IMPORT
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkin")
@RequiredArgsConstructor
public class StreakController {

    private final GamificationService gamificationService;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("isAuthenticated()") // ADICIONE ISTO AQUI PARA PROTEGER O ENDPOINT
    public ResponseEntity<UserResponseDTO> checkin() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // Bloqueio preventivo se o Spring Security por acaso deixar passar o "anonymousUser"
        if (principal == null || principal.toString().equals("anonymousUser")) {
            return ResponseEntity.status(401).build();
        }

        String email = (principal instanceof org.springframework.security.core.userdetails.UserDetails) ?
                ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername() : principal.toString();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        UserResponseDTO response = gamificationService.checkin(user.getIdUsuario());
        return ResponseEntity.ok(response);
    }
}

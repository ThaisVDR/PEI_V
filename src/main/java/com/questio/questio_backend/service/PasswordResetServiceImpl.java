package com.questio.questio_backend.service;

import com.questio.questio_backend.entity.PasswordResetToken;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.repository.PasswordResetTokenRepository;
import com.questio.questio_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void solicitarReset(String email) {
        User usuario = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("E-mail não encontrado"));


        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .usuario(usuario)
                .dataExpiracao(LocalDateTime.now().plusMinutes(15))
                .build();

        tokenRepository.save(resetToken);


        emailService.enviarEmailResetSenha(usuario.getEmail(), token);
    }

    @Transactional
    public void resetarSenha(String token, String novaSenha) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (resetToken.isExpirado()) {
            tokenRepository.delete(resetToken);
            throw new RuntimeException("Este token expirou. Solicite um novo.");
        }

        User usuario = resetToken.getUsuario();
        usuario.setSenha(passwordEncoder.encode(novaSenha));

        userRepository.save(usuario);


        tokenRepository.delete(resetToken);
    }
}
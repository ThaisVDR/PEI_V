package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.UserRegisterRequestDTO;
import com.questio.questio_backend.dto.UserResponseDTO;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.entity.enums.TipoUsuario;
import com.questio.questio_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements  UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO registerNewUser(UserRegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return UserResponseDTO.builder()
                    .mensagem("E-mail já cadastrado!!")
                    .build();
        }

        if (Boolean.FALSE.equals(request.getTermoAceito())) {
            return UserResponseDTO.builder()
                    .mensagem("É necessario aceitar os termos")
                    .build();
        }

        TipoUsuario tipo = toTipoUsuarioEnum(String.valueOf(request.getTipoUsuario()));
        if (tipo == null) {
            return UserResponseDTO.builder()
                    .mensagem("Tipo de Usuário Inválido")
                    .build();
        }

        User newUser = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .senhaHash(passwordEncoder.encode(request.getSenha()))
                .curso(request.getCurso())
                .tipoUsuario(tipo)
                .termoAceito(true)
                .xpTotal(0)
                .nivel(1)
                .streakAtual(0)
                .active(true)
                .build();
        User salvo=userRepository.save(newUser);

        return UserResponseDTO.builder()
                .idUsuario(salvo.getIdUsuario())
                .nome(salvo.getName())
                .email(salvo.getEmail())
                .curso(salvo.getCurso())
                .tipoUsuario(TipoUsuario.valueOf(salvo.getTipoUsuario().name()))
                .termoAceito(salvo.getTermoAceito())
                .xpTotal(salvo.getXpTotal())
                .nivel(salvo.getNivel())
                .streakAtual(salvo.getStreakAtual())
                .mensagem("Usuário criado com sucesso!")
                .build();

    }

    private TipoUsuario toTipoUsuarioEnum(String tipo) {
        try {
            return TipoUsuario.valueOf(tipo.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    @Override
    public UserResponseDTO getUserProfile(Long userId) {
        // Implementar depois
        return null;
    }

    @Override
    public UserResponseDTO updateStreak(Long userId, Integer novosPontos) {
        // Implementar depois (gamificação)
        return null;
    }
}

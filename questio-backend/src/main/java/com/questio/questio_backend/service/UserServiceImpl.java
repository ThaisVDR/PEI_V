package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.LoginRequestDTO;
import com.questio.questio_backend.dto.LoginResponseDTO;
import com.questio.questio_backend.dto.UserRegisterRequestDTO;
import com.questio.questio_backend.dto.UserResponseDTO;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.entity.enums.TipoUsuario;
import com.questio.questio_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements  UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

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

        TipoUsuario tipo = request.getTipoUsuario();
        if (tipo == null) {
            return UserResponseDTO.builder()
                    .mensagem("Tipo de Usuário Inválido")
                    .build();
        }

        User newUser = User.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .curso(request.getCurso())
                .tipoUsuario(tipo.getValor())
                .termoAceito(true)
                .xpTotal(0)
                .nivel(1)
                .streakAtual(0)
                .build();
        User salvo=userRepository.save(newUser);
        TipoUsuario tipoDeRetorno = TipoUsuario.fromString(salvo.getTipoUsuario());
        return UserResponseDTO.builder()
                .idUsuario(salvo.getIdUsuario())
                .nome(salvo.getNome())
                .email(salvo.getEmail())
                .curso(salvo.getCurso())
                .tipoUsuario(tipoDeRetorno)
                .termoAceito(salvo.getTermoAceito())
                .xpTotal(salvo.getXpTotal())
                .nivel(salvo.getNivel())
                .streakAtual(salvo.getStreakAtual())
                .mensagem("Usuário criado com sucesso!")
                .build();

    }

    public LoginResponseDTO login(LoginRequestDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return new LoginResponseDTO(token, "Login bem-sucedido!");
    }

    @Override
    public UserResponseDTO getUserProfile(UUID userId) {
        // Implementar depois
        return null;
    }

    @Override
    public UserResponseDTO updateStreak(UUID userId, Integer novosPontos) {
        // Implementar depois (gamificação)
        return null;
    }
}

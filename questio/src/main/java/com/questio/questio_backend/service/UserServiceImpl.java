package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.LoginRequestDTO;
import com.questio.questio_backend.dto.LoginResponseDTO;
import com.questio.questio_backend.dto.UserRankingResponseDTO;
import com.questio.questio_backend.dto.UserRegisterRequestDTO;
import com.questio.questio_backend.dto.UserResponseDTO;
import com.questio.questio_backend.dto.RankingDTO;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.entity.enums.TipoUsuario;
import com.questio.questio_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final GamificationService gamificationService;

    @Override
    public UserResponseDTO registerNewUser(UserRegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            return UserResponseDTO.builder()
                    .mensagem("E-mail já cadastrado!!")
                    .build();
        }

        if (Boolean.FALSE.equals(request.termoAceito())) {
            return UserResponseDTO.builder()
                    .mensagem("É necessario aceitar os termos")
                    .build();
        }

        TipoUsuario tipo = request.tipoUsuario();
        if (tipo == null) {
            return UserResponseDTO.builder()
                    .mensagem("Tipo de Usuário Inválido")
                    .build();
        }

        User newUser = User.builder()
                .nome(request.nome())
                .email(request.email())
                .senha(passwordEncoder.encode(request.senha()))
                .curso(request.curso())
                .tipoUsuario(tipo.getValor())
                .termoAceito(true)
                .emailVerificado(false)
                .xpTotal(0)
                .nivel(1)
                .streakAtual(0)
                .build();
        User salvo = userRepository.save(newUser);
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

        var user = (User) auth.getPrincipal();
        user.setUltimaAtividadeEm(LocalDateTime.now());
        userRepository.save(user);

        var token = tokenService.generateToken(user);

        return new LoginResponseDTO(token, "Login bem-sucedido!");
    }

    @Override
    public UserResponseDTO getUserProfile(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        TipoUsuario tipo = TipoUsuario.fromString(user.getTipoUsuario());
        return UserResponseDTO.builder()
                .idUsuario(user.getIdUsuario())
                .nome(user.getNome())
                .email(user.getEmail())
                .curso(user.getCurso())
                .tipoUsuario(tipo)
                .termoAceito(user.getTermoAceito())
                .xpTotal(user.getXpTotal())
                .nivel(user.getNivel())
                .streakAtual(user.getStreakAtual())
                .acessoBloqueado(Boolean.TRUE.equals(user.getAcessoBloqueado()))
                .build();
    }

    @Override
    public UserResponseDTO updateStreak(UUID userId, Integer novosPontos) {
        return gamificationService.checkin(userId);
    }

    @Override
    public UserResponseDTO getAuthenticatedUserProfile() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return UserResponseDTO.builder()
                    .mensagem("Usuário não autenticado")
                    .build();
        }

        gamificationService.checkin(user.getIdUsuario());
        User atualizado = userRepository.findById(user.getIdUsuario()).orElse(user);

        TipoUsuario tipo = TipoUsuario.fromString(atualizado.getTipoUsuario());
        return UserResponseDTO.builder()
                .idUsuario(atualizado.getIdUsuario())
                .nome(atualizado.getNome())
                .email(atualizado.getEmail())
                .curso(atualizado.getCurso())
                .tipoUsuario(tipo)
                .termoAceito(atualizado.getTermoAceito())
                .xpTotal(atualizado.getXpTotal())
                .nivel(atualizado.getNivel())
                .streakAtual(atualizado.getStreakAtual())
                .acessoBloqueado(Boolean.TRUE.equals(atualizado.getAcessoBloqueado()))
                .build();
    }

    @Override
    public UserRankingResponseDTO getUserRankingStatus() {
        var topUsers = userRepository.findTop10ByOrderByXpTotalDesc();
        var top10 = topUsers.stream()
                .map(u -> new RankingDTO(
                        u.getIdUsuario(),
                        u.getNome(),
                        u.getXpTotal() == null ? 0 : u.getXpTotal(),
                        u.getNivel() == null ? 1 : u.getNivel(),
                        null
                ))
                .toList();

        RankingDTO usuarioAtual = null;
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User user) {
            int xp = user.getXpTotal() == null ? 0 : user.getXpTotal();
            long posicao = userRepository.countByXpTotalGreaterThan(xp) + 1;
            usuarioAtual = new RankingDTO(
                    user.getIdUsuario(),
                    user.getNome(),
                    xp,
                    user.getNivel() == null ? 1 : user.getNivel(),
                    posicao
            );
        }

        return new UserRankingResponseDTO(top10, usuarioAtual);
    }

    @Override
    public UserResponseDTO setAcessoBloqueado(UUID userId, boolean bloqueado) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        user.setAcessoBloqueado(bloqueado);
        var salvo = userRepository.save(user);

        TipoUsuario tipo = TipoUsuario.fromString(salvo.getTipoUsuario());
        return UserResponseDTO.builder()
                .idUsuario(salvo.getIdUsuario())
                .nome(salvo.getNome())
                .email(salvo.getEmail())
                .curso(salvo.getCurso())
                .tipoUsuario(tipo)
                .termoAceito(salvo.getTermoAceito())
                .xpTotal(salvo.getXpTotal())
                .nivel(salvo.getNivel())
                .streakAtual(salvo.getStreakAtual())
                .acessoBloqueado(Boolean.TRUE.equals(salvo.getAcessoBloqueado()))
                .mensagem(bloqueado ? "Acesso bloqueado com sucesso." : "Acesso liberado com sucesso.")
                .build();
    }

    @Override
    public void touchUltimaAtividade(UUID userId) {
        gamificationService.touchActivity(userId);
    }

    @Override
    public List<UserResponseDTO> listarPorRole(String professor) {
        List<User> usuarios = userRepository.findByTipoUsuario(professor);
        return usuarios.stream()
                .map(user -> {
                    TipoUsuario tipoEnumUser = TipoUsuario.fromString(user.getTipoUsuario());

                    return UserResponseDTO.builder()
                            .idUsuario(user.getIdUsuario())
                            .nome(user.getNome())
                            .email(user.getEmail())
                            .curso(user.getCurso())
                            .tipoUsuario(tipoEnumUser)
                            .xpTotal(user.getXpTotal() == null ? 0 : user.getXpTotal())
                            .nivel(user.getNivel() == null ? 1 : user.getNivel())
                            .streakAtual(user.getStreakAtual() == null ? 0 : user.getStreakAtual())
                            .acessoBloqueado(Boolean.TRUE.equals(user.getAcessoBloqueado()))
                            .build();
                })
                .toList();
    } // 🌟 Chave do método corrigida

    @Override
    public List<UserResponseDTO> listarPorTipo(TipoUsuario tipo) {
        if (tipo == null) return List.of();
        return listarPorRole(tipo.getValor());
    }
}
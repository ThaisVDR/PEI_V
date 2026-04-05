package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.RankingDTO;
import com.questio.questio_backend.dto.UserRankingResponseDTO;
import com.questio.questio_backend.dto.UserResponseDTO;
import com.questio.questio_backend.entity.Class;
import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.entity.enums.TipoUsuario;
import com.questio.questio_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponseDTO getAuthenticatedUserProfile() {
        User user = getLoggedUser();
        return mapToResponseDTO(user, "Perfil carregado.");
    }

    @Override
    public UserRankingResponseDTO getUserRankingStatus() {
        User currentUser = getLoggedUser();

        List<User> topUsers = userRepository.findTop10ByOrderByXpTotalDesc();
        List<RankingDTO> top10Dtos = new ArrayList<>();

        for (int i = 0; i < topUsers.size(); i++) {
            User u = topUsers.get(i);
            top10Dtos.add(new RankingDTO(u.getNome(), u.getXpTotal(), u.getNivel(), i + 1));
        }

        Integer posicaoAtual = userRepository.countUsersWithMoreXp(currentUser.getXpTotal()) + 1;

        RankingDTO userStatus = new RankingDTO(
                currentUser.getNome(),
                currentUser.getXpTotal(),
                currentUser.getNivel(),
                posicaoAtual
        );

        return new UserRankingResponseDTO(top10Dtos, userStatus);
    }

    private User getLoggedUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private UserResponseDTO mapToResponseDTO(User user, String msg) {

        List<String> nomesTurmas = user.getTurmas().stream()
                .map(Class::getNome)
                .toList();

        return UserResponseDTO.builder()
                .idUsuario(user.getIdUsuario())
                .nome(user.getNome())
                .email(user.getEmail())
                .tipoUsuario(TipoUsuario.fromString(user.getTipoUsuario()))
                .xpTotal(user.getXpTotal())
                .nivel(user.getNivel())
                .streakAtual(user.getStreakAtual())
                .turmas(nomesTurmas)
                .mensagem(msg)
                .build();
    }

}
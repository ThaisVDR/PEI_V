package com.questio.questio_backend.repository;

import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.entity.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    // Adicione esta consulta customizada para carregar as turmas junto com o usuário
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.turmas WHERE u.id = :id")
    Optional<User> findByIdWithTurmas(@Param("id") UUID id);

    boolean existsByEmail(String email);
    long countByTipoUsuario(String tipoUsuario);
    Optional<User> findByEmail(String email);
    List<User> findByTipoUsuario(String tipoUsuario);
    List<User> findByTipoUsuario(TipoUsuario tipoUsuario);
    long countByTipoUsuario(TipoUsuario tipoUsuario);
    List<User> findTop10ByOrderByXpTotalDesc();
    long countByXpTotalGreaterThan(int xpTotal);
    List<User> findByUltimaAtividadeEmBeforeAndStreakAtualGreaterThan(java.time.LocalDateTime data, Integer streakAtual);
    List<User> findByUltimoCheckinEmBeforeAndStreakAtualGreaterThan(java.time.LocalDateTime data, Integer streakAtual);
}

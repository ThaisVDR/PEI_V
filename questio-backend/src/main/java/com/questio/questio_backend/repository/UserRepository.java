package com.questio.questio_backend.repository;


import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.entity.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    long countByTipoUsuario(TipoUsuario tipoUsuario);
}

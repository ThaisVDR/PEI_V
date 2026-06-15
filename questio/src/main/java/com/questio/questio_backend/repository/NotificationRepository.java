package com.questio.questio_backend.repository;

import com.questio.questio_backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    // Conta quantas notificações não lidas o aluno tem
    long countByUsuarioIdUsuarioAndLidaFalse(UUID idUsuario);

    // Busca a lista de notificações não lidas, trazendo as mais recentes primeiro
    List<Notification> findByUsuarioIdUsuarioAndLidaFalseOrderByCriadaEmDesc(UUID idUsuario);
}
package com.questio.questio_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notificacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_notificacao")
    private UUID id;

    // 🌟 Vincula a notificação ao seu modelo de Usuário já existente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private User usuario;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String mensagem;

    @Builder.Default
    private boolean lida = false;

    @Column(name = "criada_em")
    @Builder.Default
    private LocalDateTime criadaEm = LocalDateTime.now();
}
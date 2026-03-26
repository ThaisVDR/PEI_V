package com.questio.questio_backend.entity;

import com.questio.questio_backend.entity.enums.TipoUsuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idUsuario;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "senha", nullable = false,length = 255)
    private String senha;

    @Column(nullable = false, length = 255)
    private String curso;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false, length = 40)
    private TipoUsuario tipoUsuario;

    @Column(name = "termo_aceito", nullable = false)
    private Boolean termoAceito = false;

    @Builder.Default
    @Column(name = "xp_total", nullable = false)
    private Integer xpTotal = 0;

    @Builder.Default
    @Column(nullable = false)
    private Integer nivel = 1;

    @Builder.Default
    @Column(name = "sequencia_dias", nullable = false)
    private Integer streakAtual = 0;

    private LocalDateTime ultimoLogin;

    @Builder.Default
    @Column(name = "criado_em", updatable = false, nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean active = true;
}

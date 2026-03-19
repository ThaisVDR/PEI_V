package com.questio.questio_backend.entity;

import com.questio.questio_backend.entity.enums.TipoUsuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false,length = 255)
    private String senhaHash;

    @Column(nullable = false, length = 255)
    private String curso;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private TipoUsuario tipoUsuario;

    @Column(nullable = false)
    private Boolean termoAceito = false;

    @Column(nullable = false)
    private Integer xpTotal = 0;

    @Column(nullable = false)
    private Integer nivel = 1;

    @Column(nullable = false)
    private Integer streakAtual = 0;

    private LocalDateTime ultimoLogin;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean active = true;
}

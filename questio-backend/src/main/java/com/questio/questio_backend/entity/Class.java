package com.questio.questio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "turmas")
@Getter @Setter @NoArgsConstructor
@AllArgsConstructor
@Builder
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_turma")
    private UUID idClass;

    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_professor")
    private User professor;

    private boolean ativa = true;

    @Column(name = "media_engajamento")
    private Float mediaEngajamento = 0.0f;

    @ManyToMany(mappedBy = "turmas")
    private Set<User> alunos = new HashSet<>();
}
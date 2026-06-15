package com.questio.questio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "disciplinas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_disciplina")
    private UUID idDisciplina;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(name = "carga_horaria")
    private String cargaHoraria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_curso", nullable = false)
    private Curso curso;
}
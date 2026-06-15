package com.questio.questio_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "aulas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_aula")
    private UUID idAula;

    @Column(name = "dia_semana", nullable = false)
    private String diaSemana;

    @Column(nullable = false)
    private String horario;

    @Column(nullable = false)
    private String disciplina;

    private String sala;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_professor", nullable = false)
    private User professor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_turma", nullable = false)
    private Class turma;
}
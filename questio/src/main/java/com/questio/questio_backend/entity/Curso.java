package com.questio.questio_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "cursos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_curso")
    private UUID idCurso;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 1000)
    private String descricao;

    @Column(name = "carga_horaria")
    private String cargaHoraria;

    private String semestre;

    private String coordenador;

    private Integer vagas;

    @Builder.Default
    @Column(nullable = false)
    private Boolean ativo = true;

    @Builder.Default
    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Disciplina> disciplinas = new ArrayList<>();
}
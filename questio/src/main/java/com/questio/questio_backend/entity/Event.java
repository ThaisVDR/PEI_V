package com.questio.questio_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "eventos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_evento")
    private UUID id;

    private String disciplina;

    @Column(name = "id_professor")
    private UUID idProfessor;

    private String nomeProfessor;

    @Column(name = "id_aluno")
    private UUID idAluno;

    private String nomeAluno;

    private String turma;
    private String semestre;

    @Column(name = "titulo_evento")
    private String tituloEvento;

    @Column(name = "descricao_evento", columnDefinition = "TEXT")
    private String descricaoEvento;

    @Column(name = "data_evento")
    private LocalDateTime dataEvento;

    private String tipo; // "reuniao", "aviso", "comunicado", "importante"
    private boolean lido;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @PrePersist
    protected void onCreate() {
        this.criadoEm = LocalDateTime.now();
        this.lido = false;
    }
}
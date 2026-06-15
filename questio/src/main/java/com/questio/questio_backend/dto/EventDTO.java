package com.questio.questio_backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record EventDTO(
        UUID id,
        String disciplina,
        UUID idProfessor,
        String nomeProfessor,
        UUID idAluno,
        String nomeAluno,
        String turma,
        String semestre,
        String tituloEvento,
        String descricaoEvento,
        LocalDateTime dataEvento,
        String tipo,
        boolean lido
) {}
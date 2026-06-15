package com.questio.questio_backend.dto;

import java.util.List;
import java.util.UUID;

public record DesempenhoAlunoDTO(
        UUID id,
        String nome,
        int tarefasConcluidas,
        int tarefasTotal,
        Double mediaNotas,
        List<TarefaPendenteDTO> tarefasPendentes
) {}
package com.questio.questio_backend.controller;

import com.questio.questio_backend.dto.SubmitRequestDTO;
import com.questio.questio_backend.dto.TaskRequestDTO;
import com.questio.questio_backend.dto.TaskResponseDTO;
import com.questio.questio_backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tarefas")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService tarefaService;

    @PostMapping("/criar")
    @PreAuthorize("hasAnyRole('PROFESSOR', 'COORDENACAO')")
    public ResponseEntity<TaskResponseDTO> criar(@RequestBody @Valid TaskRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tarefaService.criarTarefa(dto));
    }

    @PostMapping("/submeter")
    public ResponseEntity<Map<String, String>> submeter(@RequestBody @Valid SubmitRequestDTO dto) {
        String mensagem = tarefaService.submeterTarefa(dto);
        return ResponseEntity.ok(Map.of("mensagem", mensagem));
    }

    @GetMapping("/minhas-tarefas")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<List<TaskResponseDTO>> listarMinhasTarefas() {
        return ResponseEntity.ok(tarefaService.listarTarefasDoAluno());
    }
}

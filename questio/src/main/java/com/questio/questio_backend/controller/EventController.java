package com.questio.questio_backend.controller;

import com.questio.questio_backend.dto.EventDTO;
import com.questio.questio_backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/eventos")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventoService;

    @PostMapping
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<EventDTO> criar(@RequestBody EventDTO dto) {
        return ResponseEntity.ok(eventoService.salvarEvent(dto));
    }

    @GetMapping("/professor/{idProfessor}")
    @PreAuthorize("hasAnyRole('COORDENACAO', 'PROFESSOR')")
    public ResponseEntity<List<EventDTO>> listarPorProfessor(@PathVariable UUID idProfessor) {
        return ResponseEntity.ok(eventoService.listarPorProfessor(idProfessor));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<Void> deletar(@PathVariable UUID id) {
        eventoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('COORDENACAO', 'PROFESSOR', 'ALUNO')")
    public ResponseEntity<List<EventDTO>> listar() {
        return ResponseEntity.ok(eventoService.listarTodos());
    }
}
package com.questio.questio_backend.controller;

import com.questio.questio_backend.dto.ClassRequestDTO;
import com.questio.questio_backend.dto.ClassResponseDTO;
import com.questio.questio_backend.dto.EnrolmentRequestDTO;
import com.questio.questio_backend.service.ClassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/coordenacao")
@RequiredArgsConstructor
public class CoordinationController {
    private final ClassService turmaService;

    @PostMapping("/matricular-alunos")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<String> matricular(@RequestBody @Valid EnrolmentRequestDTO dto) {
        turmaService.matricularAlunos(dto);
        return ResponseEntity.ok("Alunos matriculados com sucesso na turma!");
    }

    @PostMapping("/turmas")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<ClassResponseDTO> criarTurma(@RequestBody @Valid ClassRequestDTO dto) {
        return ResponseEntity.ok(turmaService.criarTurma(dto));
    }

}

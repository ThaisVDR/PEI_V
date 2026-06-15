package com.questio.questio_backend.controller;

import com.questio.questio_backend.dto.*;
import com.questio.questio_backend.entity.enums.TipoUsuario;
import com.questio.questio_backend.service.AulaService;
import com.questio.questio_backend.service.ClassService;
import com.questio.questio_backend.service.CursoService;
import com.questio.questio_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/coordenacao")
@RequiredArgsConstructor
public class CoordinationController {

    private final ClassService turmaService;
    private final UserService userService;
    private final AulaService aulaService;
    private final CursoService cursoService;

    @PostMapping("/matricular-alunos")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<String> matricular(@RequestBody @Valid EnrolmentRequestDTO dto) {
        turmaService.matricularAlunos(dto);
        return ResponseEntity.ok("Alunos matriculados com sucesso na turma!");
    }

    @PostMapping("/turmas/criar")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<ClassResponseDTO> criarTurma(@RequestBody @Valid ClassRequestDTO dto) {
        return ResponseEntity.ok(turmaService.criarTurma(dto));
    }

    @GetMapping("/turmas")
    @PreAuthorize("hasAnyRole('COORDENACAO', 'PROFESSOR')")
    public ResponseEntity<List<ClassResponseDTO>> listarTurmas() {
        return ResponseEntity.ok(turmaService.listarTurmas());
    }

    @PostMapping("/grade")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<List<AulaResponseDTO>> salvarGrade(@RequestBody @Valid GradeRequestDTO dto) {
        return ResponseEntity.ok(aulaService.salvarGrade(dto));
    }

    @GetMapping("/professores")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<List<UserResponseDTO>> listarProfessores() {
        return ResponseEntity.ok(userService.listarPorRole(TipoUsuario.PROFESSOR.getValor()));
    }

    @GetMapping("/grade")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<List<AulaResponseDTO>> listarGrade(@RequestParam UUID idTurma) {
        return ResponseEntity.ok(aulaService.listarPorTurma(idTurma));
    }

    @PatchMapping("/usuarios/{idUsuario}/acesso")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<Object> atualizarAcesso(
            @PathVariable UUID idUsuario,
            @RequestBody @Valid AcessoRequestDTO dto
    ) {
        return ResponseEntity.ok(userService.setAcessoBloqueado(idUsuario, Boolean.TRUE.equals(dto.acessoBloqueado())));
    }

    @PostMapping("/cursos/criar")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<CursoResponseDTO> criarCurso(@RequestBody @Valid CursoRequestDTO dto) {
        return ResponseEntity.ok(cursoService.criarCurso(dto));
    }

    @GetMapping("/cursos")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<List<CursoResponseDTO>> listarCursos() {
        return ResponseEntity.ok(cursoService.listarCursos());
    }

    @GetMapping("/alunos")
    @PreAuthorize("hasRole('COORDENACAO')")
    public ResponseEntity<List<UserResponseDTO>> listarAlunos() {
        return ResponseEntity.ok(userService.listarPorRole("Aluno"));
    }
}
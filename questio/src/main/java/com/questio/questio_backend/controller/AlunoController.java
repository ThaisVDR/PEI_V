package com.questio.questio_backend.controller;

import com.questio.questio_backend.entity.User;
import com.questio.questio_backend.repository.UserRepository;
import com.questio.questio_backend.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/aluno")
@RequiredArgsConstructor
public class AlunoController {

    private final ClassService turmaService;
    private final UserRepository userRepository;

    @GetMapping("/tem-turma")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<Map<String, Boolean>> temTurma() {
        // 1. Pegue o principal de forma genérica (ele está vindo como String ou UserDetails)
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;

        if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
            email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        User aluno = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        User alunoComTurmas = userRepository.findByIdWithTurmas(aluno.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean temTurma = !alunoComTurmas.getTurmas().isEmpty();
        return ResponseEntity.ok(Map.of("temTurma", temTurma));
    }


    @PostMapping("/entrar-turma/{idTurma}")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<String> entrarNaTurma(@PathVariable UUID idTurma) {
        turmaService.alunoEntrarNaTurma(idTurma);
        return ResponseEntity.ok("Matriculado com sucesso!");
    }
}
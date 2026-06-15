package com.questio.questio_backend.controller;

import com.questio.questio_backend.entity.Notification;
import com.questio.questio_backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notificacoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    /**
     * Rota para o contador de bolinha vermelha na Home do Aluno
     */
    @GetMapping("/contador/{idUsuario}")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<Map<String, Long>> obterContadorNaoLidas(@PathVariable UUID idUsuario) {
        long total = notificationRepository.countByUsuarioIdUsuarioAndLidaFalse(idUsuario);
        return ResponseEntity.ok(Map.of("total", total));
    }

    /**
     * Rota para carregar a lista escura de notificações do Aluno
     */
    @GetMapping("/usuario/{idUsuario}")
    @PreAuthorize("hasRole('ALUNO')")
    public ResponseEntity<List<Map<String, Object>>> listarNotificacoes(@PathVariable UUID idUsuario) {
        // 1. O banco já traz ordenado: Mais recentes PRIMEIRO
        List<Notification> notificacoes = notificationRepository
                .findByUsuarioIdUsuarioAndLidaFalseOrderByCriadaEmDesc(idUsuario);

        // 2. Mapeia os dados usando HashMap tradicional para evitar problemas de imutabilidade com Jackson
        List<Map<String, Object>> resposta = notificacoes.stream().map(n -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", n.getId().toString());
            map.put("titulo", n.getTitulo());
            map.put("mensagem", n.getMensagem());
            map.put("criadaEm", n.getCriadaEm().toString());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(resposta);
    }
}
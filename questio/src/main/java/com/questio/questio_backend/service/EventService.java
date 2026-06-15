package com.questio.questio_backend.service;

import com.questio.questio_backend.dto.EventDTO;
import com.questio.questio_backend.entity.Event;
import com.questio.questio_backend.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventoRepository;

    public EventDTO salvarEvent(EventDTO dto) {
        Event evento = Event.builder()
                .disciplina(dto.disciplina())
                .idProfessor(dto.idProfessor())
                .nomeProfessor(dto.nomeProfessor())
                .idAluno(dto.idAluno())
                .nomeAluno(dto.nomeAluno())
                .turma(dto.turma())
                .semestre(dto.semestre())
                .tituloEvento(dto.tituloEvento())
                .descricaoEvento(dto.descricaoEvento())
                .dataEvento(dto.dataEvento())
                .tipo(dto.tipo())
                .build();

        Event salvo = eventoRepository.save(evento);

        // 💡 Aqui dispararia o gatilho de notificação Push real para o Aluno se necessário.

        return deEntidadeParaDTO(salvo);
    }

    public List<EventDTO> listarTodos() {
        return eventoRepository.findAll().stream().map(this::deEntidadeParaDTO).toList();
    }

    private EventDTO deEntidadeParaDTO(Event e) {
        return new EventDTO(
                e.getId(), e.getDisciplina(), e.getIdProfessor(), e.getNomeProfessor(),
                e.getIdAluno(), e.getNomeAluno(), e.getTurma(), e.getSemestre(),
                e.getTituloEvento(), e.getDescricaoEvento(), e.getDataEvento(),
                e.getTipo(), e.isLido()
        );
    }

    public List<EventDTO> listarPorProfessor(UUID idProfessor) {
        return eventoRepository.findByIdProfessor(idProfessor)
                .stream()
                .map(this::deEntidadeParaDTO)
                .toList();
    }

    public void deletar(UUID id) {
        eventoRepository.deleteById(id);
    }

}
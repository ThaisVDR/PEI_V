package com.questio.questio_backend.repository;

import com.questio.questio_backend.entity.Aula;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AulaRepository extends JpaRepository<Aula, UUID> {
    List<Aula> findByTurmaIdClass(UUID idTurma);
    List<Aula> findByProfessorIdUsuario(UUID idProfessor);
}
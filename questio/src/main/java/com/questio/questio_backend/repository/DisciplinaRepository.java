package com.questio.questio_backend.repository;

import com.questio.questio_backend.entity.Disciplina;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface DisciplinaRepository extends JpaRepository<Disciplina, UUID> {
}
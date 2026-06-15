package com.questio.questio_backend.repository;

import com.questio.questio_backend.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClassRepository extends JpaRepository<Class, UUID> {
    List<Class> findByProfessorIdUsuario(UUID idProfessor);
}
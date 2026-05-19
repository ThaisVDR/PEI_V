package com.questio.questio_backend.repository;

import com.questio.questio_backend.dto.CursoDashboardDTO;
import com.questio.questio_backend.entity.Curso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CursoRepository extends JpaRepository<Curso, UUID> {

    long countByAtivoTrue();

    @Query("SELECT new com.questio.questio_backend.dto.CursoDashboardDTO(c.idCurso, c.nome, COUNT(DISTINCT a.idUsuario)) " +
            "FROM Curso c " +
            "LEFT JOIN c.turmas t " +
            "LEFT JOIN t.alunos a " +
            "WHERE c.ativo = true " +
            "GROUP BY c.idCurso, c.nome")
    List<CursoDashboardDTO> findCursosAtivosComQuantidadeDeAlunos();
}


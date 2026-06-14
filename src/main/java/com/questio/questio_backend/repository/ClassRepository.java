package com.questio.questio_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.questio.questio_backend.entity.Class;
import java.util.UUID;

@Repository
public interface ClassRepository extends JpaRepository<Class, UUID> {
}

package com.questio.questio_backend.repository;


import com.questio.questio_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findTop10ByOrderByXpTotalDesc();

    @Query("SELECT COUNT(u) FROM User u WHERE u.xpTotal > :xp")
    Integer countUsersWithMoreXp(@Param("xp") Integer xp);

}

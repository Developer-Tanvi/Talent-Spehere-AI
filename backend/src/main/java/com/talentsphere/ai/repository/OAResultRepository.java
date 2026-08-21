package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.OAResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OAResultRepository extends JpaRepository<OAResult, String> {
    Optional<OAResult> findByCandidateId(String candidateId);
}

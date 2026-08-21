package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {
    List<Candidate> findByJobId(String jobId);
    Optional<Candidate> findByUserId(String userId);
    List<Candidate> findAllByOrderByFitScoreDesc();
}

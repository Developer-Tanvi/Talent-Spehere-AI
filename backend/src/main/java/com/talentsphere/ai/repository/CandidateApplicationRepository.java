package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.CandidateApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateApplicationRepository extends JpaRepository<CandidateApplication, String> {
    List<CandidateApplication> findByCandidateId(String candidateId);
    List<CandidateApplication> findByJobId(String jobId);
}

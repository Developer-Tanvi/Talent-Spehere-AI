package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, String> {
    List<Interview> findByCandidateIdOrderByScheduledAtDesc(String candidateId);
    List<Interview> findByJobIdOrderByScheduledAtDesc(String jobId);
    List<Interview> findAllByOrderByScheduledAtDesc();
}

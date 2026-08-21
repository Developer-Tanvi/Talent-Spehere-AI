package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.InterviewFocusArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewFocusAreaRepository extends JpaRepository<InterviewFocusArea, String> {
    List<InterviewFocusArea> findByCandidateId(String candidateId);
}

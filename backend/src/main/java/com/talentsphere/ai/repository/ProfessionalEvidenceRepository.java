package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.ProfessionalEvidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessionalEvidenceRepository extends JpaRepository<ProfessionalEvidence, String> {
    List<ProfessionalEvidence> findByCandidateId(String candidateId);
}

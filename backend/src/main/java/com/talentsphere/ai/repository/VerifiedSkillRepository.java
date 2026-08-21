package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.VerifiedSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerifiedSkillRepository extends JpaRepository<VerifiedSkill, String> {
    List<VerifiedSkill> findByCandidateId(String candidateId);
}

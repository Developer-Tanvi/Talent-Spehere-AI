package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.ExperienceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperienceItemRepository extends JpaRepository<ExperienceItem, String> {
    List<ExperienceItem> findByCandidateId(String candidateId);
}

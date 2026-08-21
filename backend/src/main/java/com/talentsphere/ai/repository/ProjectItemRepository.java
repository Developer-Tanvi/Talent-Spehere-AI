package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.ProjectItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectItemRepository extends JpaRepository<ProjectItem, String> {
    List<ProjectItem> findByCandidateId(String candidateId);
}

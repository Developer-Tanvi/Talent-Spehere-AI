package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.ApplicationStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationStageRepository extends JpaRepository<ApplicationStage, String> {
    List<ApplicationStage> findByApplicationIdOrderByDisplayOrderAsc(String applicationId);
}

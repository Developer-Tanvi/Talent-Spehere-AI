package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, String> {
    List<AuditLog> findAllByOrderByCreatedAtDesc();
    List<AuditLog> findByCandidateIdOrderByCreatedAtDesc(String candidateId);
    List<AuditLog> findByJobIdOrderByCreatedAtDesc(String jobId);
}

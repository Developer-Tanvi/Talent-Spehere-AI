package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    Optional<Job> findByReqCode(String reqCode);
    List<Job> findAllByOrderByCreatedAtDesc();
}

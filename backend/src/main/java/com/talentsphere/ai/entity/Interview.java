package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interview {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(name = "candidate_name")
    private String candidateName;

    @Column(name = "job_id", nullable = false, length = 64)
    private String jobId;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "scheduled_at", nullable = false, length = 100)
    private String scheduledAt;

    @Column(nullable = false)
    private String interviewer;

    @Column(nullable = false, length = 50)
    private String type; // Technical, HR, Managerial

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String status = "SCHEDULED"; // SCHEDULED, COMPLETED, CANCELLED, RESCHEDULED

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}

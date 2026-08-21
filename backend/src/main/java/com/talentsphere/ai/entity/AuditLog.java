package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, length = 100)
    private String timestamp;

    @Column(name = "candidate_id", length = 64)
    private String candidateId;

    @Column(name = "candidate_name")
    private String candidateName;

    @Column(name = "candidate_avatar", columnDefinition = "TEXT")
    private String candidateAvatar;

    @Column(name = "job_id", length = 64)
    private String jobId;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "ai_recommendation", length = 50)
    private String aiRecommendation;

    @Column(name = "ai_fit_score")
    private Integer aiFitScore;

    @Column(name = "recruiter_action", nullable = false)
    private String recruiterAction;

    @Column(name = "recruiter_name", nullable = false)
    private String recruiterName;

    @Column(name = "is_override")
    @Builder.Default
    private Boolean isOverride = false;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}

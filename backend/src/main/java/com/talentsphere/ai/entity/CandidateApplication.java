package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "candidate_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateApplication {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(name = "job_id", nullable = false, length = 64)
    private String jobId;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "req_code", length = 64)
    private String reqCode;

    private String department;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "applied_date", length = 100)
    private String appliedDate;

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String status = "applied";

    @Column(name = "fit_score")
    @Builder.Default
    private Integer fitScore = 0;

    @Column(name = "resume_file_name")
    private String resumeFileName;

    @Column(name = "cover_note", columnDefinition = "TEXT")
    private String coverNote;

    @Column(name = "oa_required")
    @Builder.Default
    private Boolean oaRequired = false;

    @Column(name = "oa_completed")
    @Builder.Default
    private Boolean oaCompleted = false;

    @Column(name = "oa_score")
    private Integer oaScore;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}

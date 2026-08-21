package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "oa_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAResult {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(name = "assessment_id", nullable = false, length = 64)
    private String assessmentId;

    @Column(nullable = false)
    private String title;

    @Column(name = "total_score", nullable = false)
    @Builder.Default
    private Integer totalScore = 0;

    @Column(name = "completed_at", length = 100)
    private String completedAt;

    @Column(name = "time_spent_minutes")
    @Builder.Default
    private Integer timeSpentMinutes = 0;

    @Column(name = "code_quality_score")
    @Builder.Default
    private Integer codeQualityScore = 0;

    @Column(name = "algorithmic_score")
    @Builder.Default
    private Integer algorithmicScore = 0;

    @Column(name = "system_design_score")
    @Builder.Default
    private Integer systemDesignScore = 0;

    @Column(name = "proctor_trust_score")
    @Builder.Default
    private Integer proctorTrustScore = 100;

    @Column(name = "plagiarism_index")
    @Builder.Default
    private Double plagiarismIndex = 0.0;

    @Column(name = "sections_json", columnDefinition = "TEXT")
    private String sectionsJson;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}

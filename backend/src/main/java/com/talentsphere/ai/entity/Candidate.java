package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "user_id", length = 36)
    private String userId;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String avatar;

    @Column(nullable = false)
    private String email;

    @Column(length = 100)
    private String phone;

    private String location;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "experience_years")
    @Builder.Default
    private Double experienceYears = 0.0;

    @Column(name = "current_company")
    private String currentCompany;

    @Column(name = "is_open_to_work")
    @Builder.Default
    private Boolean isOpenToWork = true;

    @Column(name = "resume_file_name")
    private String resumeFileName;

    @Column(name = "resume_uploaded_at", length = 100)
    private String resumeUploadedAt;

    private String degree;
    private String institution;

    @Column(name = "graduation_year", length = 50)
    private String graduationYear;

    @Column(length = 50)
    private String gpa;

    @Column(name = "job_id", length = 64)
    private String jobId;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "applied_date", length = 100)
    private String appliedDate;

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String status = "applied";

    @Column(name = "fit_score")
    @Builder.Default
    private Integer fitScore = 0;

    @Column(name = "confidence_score")
    @Builder.Default
    private Integer confidenceScore = 0;

    @Column(length = 50)
    @Builder.Default
    private String recommendation = "NEEDS_REVIEW"; // PROCEED, HIGH_POTENTIAL, NEEDS_REVIEW, DO_NOT_PROCEED

    @Column(name = "recommendation_reason", columnDefinition = "TEXT")
    private String recommendationReason;

    @Column(name = "factor_core_skills")
    @Builder.Default
    private Integer factorCoreSkills = 0;

    @Column(name = "factor_experience_relevance")
    @Builder.Default
    private Integer factorExperienceRelevance = 0;

    @Column(name = "factor_oa_performance")
    @Builder.Default
    private Integer factorOaPerformance = 0;

    @Column(name = "factor_code_quality")
    @Builder.Default
    private Integer factorCodeQuality = 0;

    @Column(name = "factor_profile_consistency")
    @Builder.Default
    private Integer factorProfileConsistency = 0;

    @Column(name = "top_matched_skills", columnDefinition = "TEXT")
    private String topMatchedSkills; // JSON array string

    @Column(name = "skill_gaps", columnDefinition = "TEXT")
    private String skillGaps; // JSON array string

    @Column(name = "github_username")
    private String githubUsername;

    @Column(name = "github_public_repos")
    @Builder.Default
    private Integer githubPublicRepos = 0;

    @Column(name = "github_total_stars")
    @Builder.Default
    private Integer githubTotalStars = 0;

    @Column(name = "github_total_commits")
    @Builder.Default
    private Integer githubTotalCommits = 0;

    @Column(name = "github_consistency_rating")
    @Builder.Default
    private Integer githubConsistencyRating = 0;

    @Column(name = "github_quality_rating")
    @Builder.Default
    private Integer githubQualityRating = 0;

    @Column(name = "github_languages_json", columnDefinition = "TEXT")
    private String githubLanguagesJson;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}

package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "req_code", unique = true, nullable = false, length = 64)
    private String reqCode;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, length = 50)
    private String type; // Full-time, Contract, Remote, Hybrid

    @Column(nullable = false, length = 50)
    private String seniority; // Junior, Mid, Senior, Staff, Lead

    @Column(name = "salary_range", length = 100)
    private String salaryRange;

    @Column(nullable = false, length = 50)
    @Builder.Default
    private String status = "Active";

    @Column(name = "applicants_count")
    @Builder.Default
    private Integer applicantsCount = 0;

    @Column(name = "shortlisted_count")
    @Builder.Default
    private Integer shortlistedCount = 0;

    @Column(name = "interviewing_count")
    @Builder.Default
    private Integer interviewingCount = 0;

    @Column(name = "hired_count")
    @Builder.Default
    private Integer hiredCount = 0;

    @Column(name = "target_hire_date", length = 100)
    private String targetHireDate;

    @Column(name = "min_experience_years")
    @Builder.Default
    private Integer minExperienceYears = 0;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "required_skills", columnDefinition = "TEXT")
    private String requiredSkills; // JSON array string

    @Column(name = "nice_to_have_skills", columnDefinition = "TEXT")
    private String niceToHaveSkills; // JSON array string

    @Column(columnDefinition = "TEXT")
    private String responsibilities; // JSON array string

    @Column(name = "weight_skills")
    @Builder.Default
    private Integer weightSkills = 35;

    @Column(name = "weight_experience")
    @Builder.Default
    private Integer weightExperience = 25;

    @Column(name = "weight_oa_score")
    @Builder.Default
    private Integer weightOaScore = 25;

    @Column(name = "weight_github_evidence")
    @Builder.Default
    private Integer weightGithubEvidence = 10;

    @Column(name = "weight_education")
    @Builder.Default
    private Integer weightEducation = 5;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;
}

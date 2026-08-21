package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "professional_evidence")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfessionalEvidence {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(nullable = false, length = 50)
    private String platform; // GitHub, LinkedIn, LeetCode, HackerRank, CodeChef, Kaggle, Portfolio, Blog, StackOverflow

    private String handle;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String url;

    @Builder.Default
    private Boolean verified = false;

    @Column(name = "verification_status", length = 50)
    @Builder.Default
    private String verificationStatus = "PENDING"; // CONNECTED, PENDING, VERIFIED, UNAVAILABLE

    @Column(name = "connected_at", length = 100)
    private String connectedAt;

    @Column(columnDefinition = "TEXT")
    private String stats;

    private String badge;

    @Column(name = "evidence_summary", columnDefinition = "TEXT")
    private String evidenceSummary;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}

package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "verified_skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifiedSkill {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 50)
    private String level; // Expert, Advanced, Intermediate, Foundational

    @Builder.Default
    private Integer score = 0;

    @Column(name = "evidence_source", length = 100)
    private String evidenceSource; // GitHub, Assessment, Work History, Certification, StackOverflow

    @Column(name = "evidence_snippet", columnDefinition = "TEXT")
    private String evidenceSnippet;

    @Builder.Default
    private Boolean verified = false;
}

package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "experience_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceItem {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String company;

    @Column(length = 100)
    private String period;

    private String location;

    @Column(name = "description_json", columnDefinition = "TEXT")
    private String descriptionJson;

    @Column(name = "key_deliverables_json", columnDefinition = "TEXT")
    private String keyDeliverablesJson;

    @Column(name = "skills_used_json", columnDefinition = "TEXT")
    private String skillsUsedJson;

    @Column(name = "relevance_score")
    @Builder.Default
    private Integer relevanceScore = 0;
}

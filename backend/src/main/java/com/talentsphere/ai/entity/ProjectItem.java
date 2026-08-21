package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectItem {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "repo_url", columnDefinition = "TEXT")
    private String repoUrl;

    @Column(name = "live_url", columnDefinition = "TEXT")
    private String liveUrl;

    @Builder.Default
    private Integer stars = 0;

    @Builder.Default
    private Integer commits = 0;

    @Column(name = "tech_stack_json", columnDefinition = "TEXT")
    private String techStackJson;

    @Column(name = "highlights_json", columnDefinition = "TEXT")
    private String highlightsJson;

    @Column(name = "complexity_score")
    @Builder.Default
    private Integer complexityScore = 0;
}

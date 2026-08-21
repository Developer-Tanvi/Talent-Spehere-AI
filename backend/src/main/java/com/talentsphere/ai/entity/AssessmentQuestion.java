package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "assessment_questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 50)
    private String difficulty; // Easy, Medium, Hard

    @Column(nullable = false, length = 50)
    private String type; // coding, system_design, multiple_choice

    @Column(nullable = false)
    private String category;

    @Column(name = "time_limit_minutes")
    @Builder.Default
    private Integer timeLimitMinutes = 25;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "starter_code_json", nullable = false, columnDefinition = "TEXT")
    private String starterCodeJson;

    @Column(name = "examples_json", columnDefinition = "TEXT")
    private String examplesJson;

    @Column(name = "constraints_json", columnDefinition = "TEXT")
    private String constraintsJson;

    @Column(name = "test_cases_json", columnDefinition = "TEXT")
    private String testCasesJson;

    @Column(name = "tags_json", columnDefinition = "TEXT")
    private String tagsJson;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}

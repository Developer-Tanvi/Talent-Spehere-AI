package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_focus_areas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewFocusArea {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "candidate_id", nullable = false, length = 64)
    private String candidateId;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String rationale;

    @Column(name = "suggested_question", nullable = false, columnDefinition = "TEXT")
    private String suggestedQuestion;

    @Column(name = "expected_answer_rubric", nullable = false, columnDefinition = "TEXT")
    private String expectedAnswerRubric;

    @Column(nullable = false, length = 50)
    private String difficulty; // Medium, Hard, Expert
}

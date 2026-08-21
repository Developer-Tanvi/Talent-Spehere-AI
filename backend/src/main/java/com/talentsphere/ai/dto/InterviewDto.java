package com.talentsphere.ai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewDto {
    private String id;

    @NotBlank(message = "Candidate ID is required")
    private String candidateId;
    private String candidateName;

    @NotBlank(message = "Job ID is required")
    private String jobId;
    private String jobTitle;

    @NotBlank(message = "Scheduled date/time is required")
    private String scheduledAt;

    @NotBlank(message = "Interviewer name is required")
    private String interviewer;

    @NotBlank(message = "Interview type is required")
    private String type; // Technical, HR, Managerial

    private String status;
    private String notes;

    private List<InterviewFocusAreaDto> aiFocusAreas;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InterviewFocusAreaDto {
        private String topic;
        private String rationale;
        private String suggestedQuestion;
        private String expectedAnswerRubric;
        private String difficulty;
    }
}

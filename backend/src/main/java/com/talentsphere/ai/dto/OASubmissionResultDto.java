package com.talentsphere.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OASubmissionResultDto {
    private String submissionId;
    private String candidateId;
    private String assessmentId;
    private String title;
    private Integer totalScore; // 0-100
    private String completedAt;
    private Integer timeSpentMinutes;
    private Integer codeQualityScore;
    private Integer algorithmicScore;
    private Integer systemDesignScore;
    private Integer proctorTrustScore;
    private Double plagiarismIndex;
    private List<CandidateDto.OASectionDto> sections;
    private String feedbackSummary;
}

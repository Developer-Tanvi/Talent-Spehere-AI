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
public class DecisionIntelligenceDto {
    private String candidateId;
    private String candidateName;
    private String jobTitle;
    private Integer fitScore;
    private Integer confidenceScore;
    private String aiRecommendation; // PROCEED, HIGH_POTENTIAL, NEEDS_REVIEW, DO_NOT_PROCEED
    private String recommendationReason;
    private List<String> keyStrengths;
    private List<String> potentialRisksOrGaps;
    private List<String> recommendedNextActions;
    private CandidateDto.FactorBreakdownDto factorBreakdown;
    private String evidenceSynthesis;
    private Integer oaOverallScore;
    private Boolean isOverridden;
    private String recruiterDecision;
    private String overrideReason;
}

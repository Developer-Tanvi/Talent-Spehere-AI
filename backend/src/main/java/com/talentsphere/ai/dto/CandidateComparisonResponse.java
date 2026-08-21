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
public class CandidateComparisonResponse {
    private CandidateDto candidateA;
    private CandidateDto candidateB;
    private String winnerId;
    private String comparisonSummary;
    private List<String> advantagePointsA;
    private List<String> advantagePointsB;
    private String recommendation;
}

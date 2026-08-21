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
public class EvidenceConsistencyDto {
    private String candidateId;
    private String candidateName;
    private Integer overallConsistencyScore; // 0-100
    private String status; // VERIFIED, NEEDS_VERIFICATION, LIMITED_EVIDENCE
    private String summaryRationale;
    private List<ConsistencyItemDto> consistencyItems;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConsistencyItemDto {
        private String skillOrClaim;
        private String resumeClaim;
        private String externalEvidenceSource; // GitHub, LeetCode, Assessment, LinkedIn
        private String evidenceObservation;
        private String verificationFlag; // VERIFIED_STRONG, VERIFIED_MODERATE, NEEDS_VERIFICATION
        private String interviewerNote;
    }
}

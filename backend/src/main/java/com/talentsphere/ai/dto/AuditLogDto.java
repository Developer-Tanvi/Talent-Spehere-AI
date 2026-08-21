package com.talentsphere.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogDto {
    private String id;
    private String timestamp;
    private String candidateId;
    private String candidateName;
    private String candidateAvatar;
    private String jobId;
    private String jobTitle;
    private String aiRecommendation;
    private Integer aiFitScore;
    private String recruiterAction;
    private String recruiterName;
    private Boolean isOverride;
    private String notes;
}

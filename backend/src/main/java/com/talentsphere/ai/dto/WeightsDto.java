package com.talentsphere.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeightsDto {
    @Builder.Default
    private Integer skills = 35;
    @Builder.Default
    private Integer experience = 25;
    @Builder.Default
    private Integer oaScore = 25;
    @Builder.Default
    private Integer githubEvidence = 10;
    @Builder.Default
    private Integer education = 5;
}

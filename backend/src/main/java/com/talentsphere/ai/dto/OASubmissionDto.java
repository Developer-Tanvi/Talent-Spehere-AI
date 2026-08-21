package com.talentsphere.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OASubmissionDto {
    private String candidateId;
    private String assessmentId;
    private Integer timeSpentMinutes;
    private Map<String, String> answers; // questionId -> code/answer
    private List<CodeSubmissionItem> codeSubmissions;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CodeSubmissionItem {
        private Long questionId;
        private String language; // java, typescript, python
        private String code;
    }
}

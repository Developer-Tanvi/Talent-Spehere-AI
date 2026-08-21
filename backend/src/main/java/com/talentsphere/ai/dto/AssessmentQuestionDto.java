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
public class AssessmentQuestionDto {
    private Long id;
    private String title;
    private String difficulty;
    private String type;
    private String category;
    private Integer timeLimitMinutes;
    private String description;
    private Map<String, String> starterCode;
    private List<ExampleDto> examples;
    private List<String> constraints;
    private List<TestCaseDto> testCases;
    private List<String> tags;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExampleDto {
        private String input;
        private String output;
        private String explanation;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TestCaseDto {
        private String id;
        private String input;
        private String expectedOutput;
        private Boolean isHidden;
    }
}

package com.talentsphere.ai.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talentsphere.ai.dto.AICopilotRequest;
import com.talentsphere.ai.dto.AICopilotResponse;
import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.CandidateDto;
import com.talentsphere.ai.dto.JobDto;
import com.talentsphere.ai.service.CandidateService;
import com.talentsphere.ai.service.GeminiService;
import com.talentsphere.ai.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "AI Decision Support", description = "AI Copilot, Explainable Reasoning Engine, and Decision Intelligence")
public class AIController {

    private final GeminiService geminiService;
    private final CandidateService candidateService;
    private final JobService jobService;
    private final ObjectMapper objectMapper;

    @PostMapping("/copilot")
    @Operation(summary = "Ask AI Copilot talent reasoning questions with candidate/job context")
    public ResponseEntity<ApiResponse<AICopilotResponse>> askCopilot(@RequestBody AICopilotRequest request) {
        String context = "{}";
        try {
            if (request.getCandidateId() != null) {
                CandidateDto cand = candidateService.getCandidateById(request.getCandidateId());
                context = objectMapper.writeValueAsString(cand);
            } else if (request.getJobId() != null) {
                JobDto job = jobService.getJobById(request.getJobId());
                context = objectMapper.writeValueAsString(job);
            }
        } catch (Exception ex) {
            log.warn("Could not serialize context for AI Copilot", ex);
        }

        String aiAnswer = geminiService.askCopilot(request.getPrompt(), context);

        AICopilotResponse response = AICopilotResponse.builder()
                .response(aiAnswer)
                .suggestions(List.of(
                        "Explain candidate scoring breakdown",
                        "Show missing skills needing verification",
                        "Generate panel interview questions for this role",
                        "Compare with top candidate in pipeline"
                ))
                .rationale("Synthesized from candidate profile, assessment scores, and job requisition requirements.")
                .build();

        return ResponseEntity.ok(ApiResponse.success(response, "Copilot response generated"));
    }

    @PostMapping("/candidates/{candidateId}/evaluate")
    @Operation(summary = "Run explainable AI reasoning & fit score calculation for a candidate")
    public ResponseEntity<ApiResponse<Map<String, Object>>> evaluateCandidate(
            @PathVariable String candidateId,
            @RequestParam(required = false) String jobId) {
        CandidateDto cand = candidateService.getCandidateById(candidateId);
        String targetJobId = (jobId != null) ? jobId : cand.getJobId();
        JobDto job = (targetJobId != null) ? jobService.getJobById(targetJobId) : null;

        try {
            String candJson = objectMapper.writeValueAsString(cand);
            String jobJson = (job != null) ? objectMapper.writeValueAsString(job) : "{}";
            String evaluation = geminiService.evaluateCandidate(candJson, jobJson);
            Map<String, Object> resultMap = objectMapper.readValue(evaluation, Map.class);
            return ResponseEntity.ok(ApiResponse.success(resultMap, "Candidate evaluated with explainable AI reasoning"));
        } catch (Exception ex) {
            log.error("Failed to evaluate candidate", ex);
            return ResponseEntity.ok(ApiResponse.success(Map.of(
                    "fitScore", cand.getFitScore(),
                    "confidenceScore", cand.getConfidenceScore(),
                    "recommendation", cand.getRecommendation(),
                    "recommendationReason", cand.getRecommendationReason()
            ), "Evaluation returned"));
        }
    }
}

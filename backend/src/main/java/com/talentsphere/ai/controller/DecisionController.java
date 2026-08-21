package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.DecisionIntelligenceDto;
import com.talentsphere.ai.service.DecisionIntelligenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/decisions")
@RequiredArgsConstructor
@Tag(name = "Decision Intelligence", description = "Decision Intelligence synthesis, hiring decisions, and human-in-the-loop overrides")
public class DecisionController {

    private final DecisionIntelligenceService decisionService;

    @GetMapping("/candidate/{candidateId}")
    @Operation(summary = "Get full AI Decision Intelligence synthesis for a candidate")
    public ResponseEntity<ApiResponse<DecisionIntelligenceDto>> getDecisionIntelligence(@PathVariable String candidateId) {
        DecisionIntelligenceDto dto = decisionService.getDecisionIntelligence(candidateId);
        return ResponseEntity.ok(ApiResponse.success(dto, "Decision intelligence synthesized"));
    }

    @PostMapping("/override")
    @Operation(summary = "Record a human recruiter override on AI recommendation with audit logging")
    public ResponseEntity<ApiResponse<DecisionIntelligenceDto>> recordOverride(@RequestBody Map<String, String> payload) {
        String candidateId = payload.get("candidateId");
        String action = payload.get("action");
        String reason = payload.get("reason");
        String recruiterName = payload.getOrDefault("recruiterName", "Recruiter");

        DecisionIntelligenceDto result = decisionService.recordRecruiterOverride(candidateId, action, reason, recruiterName);
        return ResponseEntity.ok(ApiResponse.success(result, "Human decision override recorded in audit trail"));
    }
}

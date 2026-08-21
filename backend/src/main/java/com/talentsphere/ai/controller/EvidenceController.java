package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.EvidenceConsistencyDto;
import com.talentsphere.ai.entity.ProfessionalEvidence;
import com.talentsphere.ai.service.EvidenceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/evidence")
@RequiredArgsConstructor
@Tag(name = "Professional Evidence", description = "Multi-source evidence verification, GitHub/portfolio analysis, and consistency checks")
public class EvidenceController {

    private final EvidenceService evidenceService;

    @GetMapping("/consistency/{candidateId}")
    @Operation(summary = "Perform automated resume vs external evidence consistency analysis")
    public ResponseEntity<ApiResponse<EvidenceConsistencyDto>> checkConsistency(@PathVariable String candidateId) {
        EvidenceConsistencyDto result = evidenceService.checkEvidenceConsistency(candidateId);
        return ResponseEntity.ok(ApiResponse.success(result, "Evidence consistency analysis completed"));
    }

    @PostMapping("/candidate/{candidateId}")
    @Operation(summary = "Connect candidate professional evidence (GitHub, LinkedIn, LeetCode, etc.)")
    public ResponseEntity<ApiResponse<ProfessionalEvidence>> connectEvidence(
            @PathVariable String candidateId,
            @RequestBody ProfessionalEvidence evidence) {
        ProfessionalEvidence saved = evidenceService.addProfessionalEvidence(candidateId, evidence);
        return ResponseEntity.ok(ApiResponse.success(saved, "Professional evidence linked"));
    }
}

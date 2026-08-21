package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.CandidateComparisonResponse;
import com.talentsphere.ai.dto.CandidateDto;
import com.talentsphere.ai.service.CandidateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/candidates")
@RequiredArgsConstructor
@Tag(name = "Candidates", description = "Candidate Profiles, Rankings, Evidence Verification, and Comparisons")
public class CandidateController {

    private final CandidateService candidateService;

    @GetMapping
    @Operation(summary = "Get candidate pool (optionally filter by jobId)")
    public ResponseEntity<ApiResponse<List<CandidateDto>>> getCandidates(@RequestParam(required = false) String jobId) {
        List<CandidateDto> list = (jobId != null) ? candidateService.getCandidatesByJobId(jobId) : candidateService.getAllCandidates();
        return ResponseEntity.ok(ApiResponse.success(list, "Candidates loaded"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get comprehensive candidate profile by ID")
    public ResponseEntity<ApiResponse<CandidateDto>> getCandidateById(@PathVariable String id) {
        CandidateDto candidate = candidateService.getCandidateById(id);
        return ResponseEntity.ok(ApiResponse.success(candidate, "Candidate profile loaded"));
    }

    @PostMapping
    @Operation(summary = "Create a candidate in the pipeline")
    public ResponseEntity<ApiResponse<CandidateDto>> createCandidate(@RequestBody CandidateDto dto) {
        CandidateDto created = candidateService.createCandidate(dto);
        return ResponseEntity.ok(ApiResponse.success(created, "Candidate added to pipeline"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update candidate profile")
    public ResponseEntity<ApiResponse<CandidateDto>> updateCandidate(@PathVariable String id, @RequestBody CandidateDto dto) {
        CandidateDto updated = candidateService.updateCandidate(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Candidate updated"));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Advance or update candidate stage in pipeline")
    public ResponseEntity<ApiResponse<CandidateDto>> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        CandidateDto updated = candidateService.updateStatus(id, newStatus);
        return ResponseEntity.ok(ApiResponse.success(updated, "Candidate status updated to " + newStatus));
    }

    @PostMapping(value = "/{id}/resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload and parse candidate resume PDF/DOCX")
    public ResponseEntity<ApiResponse<CandidateDto>> uploadResume(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        CandidateDto updated = candidateService.uploadResume(id, file);
        return ResponseEntity.ok(ApiResponse.success(updated, "Resume uploaded and parsed"));
    }

    @GetMapping("/compare")
    @Operation(summary = "Compare two candidates side-by-side with explainable AI reasoning")
    public ResponseEntity<ApiResponse<CandidateComparisonResponse>> compareCandidates(
            @RequestParam String candidateA,
            @RequestParam String candidateB) {
        CandidateComparisonResponse comparison = candidateService.compareCandidates(candidateA, candidateB);
        return ResponseEntity.ok(ApiResponse.success(comparison, "Candidates compared"));
    }
}

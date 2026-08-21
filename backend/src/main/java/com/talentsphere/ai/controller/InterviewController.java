package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.InterviewDto;
import com.talentsphere.ai.service.InterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/interviews")
@RequiredArgsConstructor
@Tag(name = "Interviews", description = "Interview scheduling, panel coordination, and AI interview briefs")
public class InterviewController {

    private final InterviewService interviewService;

    @GetMapping
    @Operation(summary = "Get all scheduled interviews")
    public ResponseEntity<ApiResponse<List<InterviewDto>>> getAllInterviews() {
        List<InterviewDto> list = interviewService.getAllInterviews();
        return ResponseEntity.ok(ApiResponse.success(list, "Interviews loaded"));
    }

    @GetMapping("/candidate/{candidateId}")
    @Operation(summary = "Get interviews for a specific candidate")
    public ResponseEntity<ApiResponse<List<InterviewDto>>> getCandidateInterviews(@PathVariable String candidateId) {
        List<InterviewDto> list = interviewService.getInterviewsByCandidate(candidateId);
        return ResponseEntity.ok(ApiResponse.success(list, "Candidate interviews loaded"));
    }

    @PostMapping
    @Operation(summary = "Schedule an interview with a candidate")
    public ResponseEntity<ApiResponse<InterviewDto>> scheduleInterview(@Valid @RequestBody InterviewDto dto) {
        InterviewDto scheduled = interviewService.scheduleInterview(dto);
        return ResponseEntity.ok(ApiResponse.success(scheduled, "Interview scheduled successfully"));
    }

    @GetMapping("/brief/{candidateId}")
    @Operation(summary = "Generate or load AI Interview Brief with tailored questions and rubrics")
    public ResponseEntity<ApiResponse<List<InterviewDto.InterviewFocusAreaDto>>> getInterviewBrief(@PathVariable String candidateId) {
        List<InterviewDto.InterviewFocusAreaDto> brief = interviewService.generateInterviewBrief(candidateId);
        return ResponseEntity.ok(ApiResponse.success(brief, "Interview brief generated"));
    }
}

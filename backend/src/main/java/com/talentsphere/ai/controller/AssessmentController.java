package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.AssessmentQuestionDto;
import com.talentsphere.ai.dto.CandidateDto;
import com.talentsphere.ai.dto.OASubmissionDto;
import com.talentsphere.ai.dto.OASubmissionResultDto;
import com.talentsphere.ai.service.AssessmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/assessments")
@RequiredArgsConstructor
@Tag(name = "Online Assessments", description = "Assessment IDE, Coding Challenges, Questions Bank, and Submissions")
public class AssessmentController {

    private final AssessmentService assessmentService;

    @GetMapping("/questions")
    @Operation(summary = "Get all questions in the assessment question bank")
    public ResponseEntity<ApiResponse<List<AssessmentQuestionDto>>> getAllQuestions() {
        List<AssessmentQuestionDto> list = assessmentService.getAllQuestions();
        return ResponseEntity.ok(ApiResponse.success(list, "Assessment questions loaded"));
    }

    @GetMapping("/questions/{id}")
    @Operation(summary = "Get question by ID")
    public ResponseEntity<ApiResponse<AssessmentQuestionDto>> getQuestionById(@PathVariable Long id) {
        AssessmentQuestionDto question = assessmentService.getQuestionById(id);
        return ResponseEntity.ok(ApiResponse.success(question, "Question loaded"));
    }

    @PostMapping("/questions")
    @Operation(summary = "Create an assessment question")
    public ResponseEntity<ApiResponse<AssessmentQuestionDto>> createQuestion(@RequestBody AssessmentQuestionDto dto) {
        AssessmentQuestionDto created = assessmentService.createQuestion(dto);
        return ResponseEntity.ok(ApiResponse.success(created, "Question created"));
    }

    @PutMapping("/questions/{id}")
    @Operation(summary = "Update an assessment question")
    public ResponseEntity<ApiResponse<AssessmentQuestionDto>> updateQuestion(@PathVariable Long id, @RequestBody AssessmentQuestionDto dto) {
        AssessmentQuestionDto updated = assessmentService.updateQuestion(id, dto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Question updated"));
    }

    @DeleteMapping("/questions/{id}")
    @Operation(summary = "Delete an assessment question")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable Long id) {
        assessmentService.deleteQuestion(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Question deleted"));
    }

    @PostMapping("/submit")
    @Operation(summary = "Candidate submits Online Assessment (code, answers, time spent)")
    public ResponseEntity<ApiResponse<OASubmissionResultDto>> submitAssessment(@RequestBody OASubmissionDto submissionDto) {
        OASubmissionResultDto result = assessmentService.submitAssessment(submissionDto);
        return ResponseEntity.ok(ApiResponse.success(result, "Assessment submitted and scored successfully"));
    }

    @PostMapping("/{assessmentId}/assign")
    @Operation(summary = "Assign Online Assessment to candidate shortlist")
    public ResponseEntity<ApiResponse<List<CandidateDto>>> assignAssessment(
            @PathVariable String assessmentId,
            @RequestBody Map<String, List<String>> payload) {
        List<String> candidateIds = payload.get("candidateIds");
        List<CandidateDto> result = assessmentService.assignAssessment(assessmentId, candidateIds != null ? candidateIds : List.of());
        return ResponseEntity.ok(ApiResponse.success(result, "Assessment assigned to candidate(s)"));
    }

    @PostMapping("/generate-questions")
    @Operation(summary = "Generate suggested coding questions using AI for recruiter review")
    public ResponseEntity<ApiResponse<List<AssessmentQuestionDto>>> generateQuestions(@RequestBody Map<String, Object> payload) {
        String roleTitle = (String) payload.getOrDefault("roleTitle", "Senior Software Engineer");
        List<String> targetSkills = (List<String>) payload.getOrDefault("targetSkills", List.of("Java", "Spring Boot"));
        String difficulty = (String) payload.getOrDefault("difficulty", "Medium");

        List<AssessmentQuestionDto> generated = assessmentService.generateAiQuestions(roleTitle, targetSkills, difficulty);
        return ResponseEntity.ok(ApiResponse.success(generated, "AI assessment questions generated for recruiter review"));
    }
}

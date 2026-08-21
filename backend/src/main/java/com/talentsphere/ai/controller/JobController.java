package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.JobDto;
import com.talentsphere.ai.dto.WeightsDto;
import com.talentsphere.ai.service.JobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name = "Job Requisitions", description = "Management of Job Openings, Requirements, AI Scoring Weights, and JD Analysis")
public class JobController {

    private final JobService jobService;

    @GetMapping
    @Operation(summary = "List all job requisitions")
    public ResponseEntity<ApiResponse<List<JobDto>>> getAllJobs() {
        List<JobDto> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(ApiResponse.success(jobs, "Jobs retrieved"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get single job requisition by ID")
    public ResponseEntity<ApiResponse<JobDto>> getJobById(@PathVariable String id) {
        JobDto job = jobService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success(job, "Job retrieved"));
    }

    @PostMapping
    @Operation(summary = "Create a new job requisition")
    public ResponseEntity<ApiResponse<JobDto>> createJob(@RequestBody JobDto jobDto) {
        JobDto created = jobService.createJob(jobDto);
        return ResponseEntity.ok(ApiResponse.success(created, "Job created successfully"));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing job requisition")
    public ResponseEntity<ApiResponse<JobDto>> updateJob(@PathVariable String id, @RequestBody JobDto jobDto) {
        JobDto updated = jobService.updateJob(id, jobDto);
        return ResponseEntity.ok(ApiResponse.success(updated, "Job updated successfully"));
    }

    @PatchMapping("/{id}/weights")
    @Operation(summary = "Update AI scoring weights for a job")
    public ResponseEntity<ApiResponse<JobDto>> updateWeights(@PathVariable String id, @RequestBody WeightsDto weights) {
        JobDto updated = jobService.updateWeights(id, weights);
        return ResponseEntity.ok(ApiResponse.success(updated, "Weights updated and ranking recalculated"));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a job requisition")
    public ResponseEntity<ApiResponse<Void>> deleteJob(@PathVariable String id) {
        jobService.deleteJob(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Job deleted successfully"));
    }

    @PostMapping(value = "/analyze-jd", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Analyze uploaded Job Description document or text using AI")
    public ResponseEntity<ApiResponse<JobDto>> analyzeJd(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(value = "text", required = false) String text) {
        JobDto analyzed = jobService.analyzeJd(file, text != null ? text : "");
        return ResponseEntity.ok(ApiResponse.success(analyzed, "Job Description analyzed by AI"));
    }
}

package com.talentsphere.ai.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.talentsphere.ai.dto.JobDto;
import com.talentsphere.ai.dto.WeightsDto;
import com.talentsphere.ai.entity.Job;
import com.talentsphere.ai.exception.ResourceNotFoundException;
import com.talentsphere.ai.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final GeminiService geminiService;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public List<JobDto> getAllJobs() {
        return jobRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public JobDto getJobById(String id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job requisition not found with id: " + id));
        return mapToDto(job);
    }

    @Transactional
    public JobDto createJob(JobDto dto) {
        String id = dto.getId() != null ? dto.getId() : "job-" + UUID.randomUUID().toString().substring(0, 8);
        String reqCode = dto.getReqCode() != null ? dto.getReqCode() : "REQ-" + (1000 + (int)(Math.random() * 9000));

        WeightsDto weights = dto.getWeights() != null ? dto.getWeights() : new WeightsDto();

        Job job = Job.builder()
                .id(id)
                .reqCode(reqCode)
                .title(dto.getTitle())
                .department(dto.getDepartment() != null ? dto.getDepartment() : "Engineering")
                .location(dto.getLocation() != null ? dto.getLocation() : "Remote")
                .type(dto.getType() != null ? dto.getType() : "Full-time")
                .seniority(dto.getSeniority() != null ? dto.getSeniority() : "Senior")
                .salaryRange(dto.getSalaryRange())
                .status(dto.getStatus() != null ? dto.getStatus() : "Active")
                .applicantsCount(0)
                .shortlistedCount(0)
                .interviewingCount(0)
                .hiredCount(0)
                .targetHireDate(dto.getTargetHireDate())
                .minExperienceYears(dto.getMinExperienceYears() != null ? dto.getMinExperienceYears() : 3)
                .description(dto.getDescription())
                .requiredSkills(writeJson(dto.getRequiredSkills()))
                .niceToHaveSkills(writeJson(dto.getNiceToHaveSkills()))
                .responsibilities(writeJson(dto.getResponsibilities()))
                .weightSkills(weights.getSkills())
                .weightExperience(weights.getExperience())
                .weightOaScore(weights.getOaScore())
                .weightGithubEvidence(weights.getGithubEvidence())
                .weightEducation(weights.getEducation())
                .build();

        Job saved = jobRepository.save(job);
        return mapToDto(saved);
    }

    @Transactional
    public JobDto updateJob(String id, JobDto dto) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        if (dto.getTitle() != null) job.setTitle(dto.getTitle());
        if (dto.getDepartment() != null) job.setDepartment(dto.getDepartment());
        if (dto.getLocation() != null) job.setLocation(dto.getLocation());
        if (dto.getType() != null) job.setType(dto.getType());
        if (dto.getSeniority() != null) job.setSeniority(dto.getSeniority());
        if (dto.getSalaryRange() != null) job.setSalaryRange(dto.getSalaryRange());
        if (dto.getStatus() != null) job.setStatus(dto.getStatus());
        if (dto.getTargetHireDate() != null) job.setTargetHireDate(dto.getTargetHireDate());
        if (dto.getMinExperienceYears() != null) job.setMinExperienceYears(dto.getMinExperienceYears());
        if (dto.getDescription() != null) job.setDescription(dto.getDescription());
        if (dto.getRequiredSkills() != null) job.setRequiredSkills(writeJson(dto.getRequiredSkills()));
        if (dto.getNiceToHaveSkills() != null) job.setNiceToHaveSkills(writeJson(dto.getNiceToHaveSkills()));
        if (dto.getResponsibilities() != null) job.setResponsibilities(writeJson(dto.getResponsibilities()));

        if (dto.getWeights() != null) {
            job.setWeightSkills(dto.getWeights().getSkills());
            job.setWeightExperience(dto.getWeights().getExperience());
            job.setWeightOaScore(dto.getWeights().getOaScore());
            job.setWeightGithubEvidence(dto.getWeights().getGithubEvidence());
            job.setWeightEducation(dto.getWeights().getEducation());
        }

        Job updated = jobRepository.save(job);
        return mapToDto(updated);
    }

    @Transactional
    public JobDto updateWeights(String id, WeightsDto weights) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        job.setWeightSkills(weights.getSkills());
        job.setWeightExperience(weights.getExperience());
        job.setWeightOaScore(weights.getOaScore());
        job.setWeightGithubEvidence(weights.getGithubEvidence());
        job.setWeightEducation(weights.getEducation());

        Job updated = jobRepository.save(job);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteJob(String id) {
        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }

    public JobDto analyzeJd(MultipartFile file, String textInput) {
        String text = textInput;
        if (file != null && !file.isEmpty()) {
            text = fileStorageService.extractTextFromFile(file);
        }

        String aiResult = geminiService.analyzeJobDescription(text);
        try {
            JsonNode node = objectMapper.readTree(aiResult);
            List<String> reqSkills = new ArrayList<>();
            if (node.has("requiredSkills")) {
                node.get("requiredSkills").forEach(s -> reqSkills.add(s.asText()));
            }
            List<String> niceSkills = new ArrayList<>();
            if (node.has("niceToHaveSkills")) {
                node.get("niceToHaveSkills").forEach(s -> niceSkills.add(s.asText()));
            }
            List<String> responsibilities = new ArrayList<>();
            if (node.has("responsibilities")) {
                node.get("responsibilities").forEach(s -> responsibilities.add(s.asText()));
            }

            WeightsDto weights = new WeightsDto();
            if (node.has("suggestedWeights")) {
                JsonNode w = node.get("suggestedWeights");
                weights.setSkills(w.path("skills").asInt(35));
                weights.setExperience(w.path("experience").asInt(25));
                weights.setOaScore(w.path("oaScore").asInt(25));
                weights.setGithubEvidence(w.path("githubEvidence").asInt(10));
                weights.setEducation(w.path("education").asInt(5));
            }

            return JobDto.builder()
                    .title(node.path("title").asText("New Requisition"))
                    .seniority(node.path("seniority").asText("Senior"))
                    .department(node.path("department").asText("Engineering"))
                    .minExperienceYears(node.path("minExperienceYears").asInt(4))
                    .description(node.path("description").asText(text))
                    .requiredSkills(reqSkills)
                    .niceToHaveSkills(niceSkills)
                    .responsibilities(responsibilities)
                    .weights(weights)
                    .build();
        } catch (Exception ex) {
            log.error("Failed to parse AI JD analysis output", ex);
            return JobDto.builder()
                    .title("Analyzed Job Opening")
                    .description(text)
                    .requiredSkills(List.of("Java", "Spring Boot", "REST API"))
                    .weights(new WeightsDto())
                    .build();
        }
    }

    private JobDto mapToDto(Job job) {
        return JobDto.builder()
                .id(job.getId())
                .reqCode(job.getReqCode())
                .title(job.getTitle())
                .department(job.getDepartment())
                .location(job.getLocation())
                .type(job.getType())
                .seniority(job.getSeniority())
                .salaryRange(job.getSalaryRange())
                .status(job.getStatus())
                .applicantsCount(job.getApplicantsCount())
                .shortlistedCount(job.getShortlistedCount())
                .interviewingCount(job.getInterviewingCount())
                .hiredCount(job.getHiredCount())
                .targetHireDate(job.getTargetHireDate())
                .minExperienceYears(job.getMinExperienceYears())
                .description(job.getDescription())
                .requiredSkills(readJsonList(job.getRequiredSkills()))
                .niceToHaveSkills(readJsonList(job.getNiceToHaveSkills()))
                .responsibilities(readJsonList(job.getResponsibilities()))
                .weights(WeightsDto.builder()
                        .skills(job.getWeightSkills())
                        .experience(job.getWeightExperience())
                        .oaScore(job.getWeightOaScore())
                        .githubEvidence(job.getWeightGithubEvidence())
                        .education(job.getWeightEducation())
                        .build())
                .build();
    }

    private String writeJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "[]";
        }
    }

    private List<String> readJsonList(String json) {
        if (json == null || json.isBlank()) return new ArrayList<>();
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}

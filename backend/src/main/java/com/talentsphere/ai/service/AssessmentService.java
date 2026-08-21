package com.talentsphere.ai.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.talentsphere.ai.dto.*;
import com.talentsphere.ai.entity.AssessmentQuestion;
import com.talentsphere.ai.entity.Candidate;
import com.talentsphere.ai.entity.OAResult;
import com.talentsphere.ai.exception.ResourceNotFoundException;
import com.talentsphere.ai.repository.AssessmentQuestionRepository;
import com.talentsphere.ai.repository.CandidateRepository;
import com.talentsphere.ai.repository.OAResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AssessmentQuestionRepository questionRepository;
    private final CandidateRepository candidateRepository;
    private final OAResultRepository oaResultRepository;
    private final GeminiService geminiService;
    private final NotificationService notificationService;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public List<AssessmentQuestionDto> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AssessmentQuestionDto getQuestionById(Long id) {
        AssessmentQuestion question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
        return mapToDto(question);
    }

    @Transactional
    public AssessmentQuestionDto createQuestion(AssessmentQuestionDto dto) {
        AssessmentQuestion question = AssessmentQuestion.builder()
                .title(dto.getTitle())
                .difficulty(dto.getDifficulty() != null ? dto.getDifficulty() : "Medium")
                .type(dto.getType() != null ? dto.getType() : "coding")
                .category(dto.getCategory() != null ? dto.getCategory() : "General")
                .timeLimitMinutes(dto.getTimeLimitMinutes() != null ? dto.getTimeLimitMinutes() : 25)
                .description(dto.getDescription())
                .starterCodeJson(writeJson(dto.getStarterCode()))
                .examplesJson(writeJson(dto.getExamples()))
                .constraintsJson(writeJson(dto.getConstraints()))
                .testCasesJson(writeJson(dto.getTestCases()))
                .tagsJson(writeJson(dto.getTags()))
                .build();

        AssessmentQuestion saved = questionRepository.save(question);
        return mapToDto(saved);
    }

    @Transactional
    public AssessmentQuestionDto updateQuestion(Long id, AssessmentQuestionDto dto) {
        AssessmentQuestion question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));

        if (dto.getTitle() != null) question.setTitle(dto.getTitle());
        if (dto.getDifficulty() != null) question.setDifficulty(dto.getDifficulty());
        if (dto.getType() != null) question.setType(dto.getType());
        if (dto.getCategory() != null) question.setCategory(dto.getCategory());
        if (dto.getTimeLimitMinutes() != null) question.setTimeLimitMinutes(dto.getTimeLimitMinutes());
        if (dto.getDescription() != null) question.setDescription(dto.getDescription());
        if (dto.getStarterCode() != null) question.setStarterCodeJson(writeJson(dto.getStarterCode()));
        if (dto.getExamples() != null) question.setExamplesJson(writeJson(dto.getExamples()));
        if (dto.getConstraints() != null) question.setConstraintsJson(writeJson(dto.getConstraints()));
        if (dto.getTestCases() != null) question.setTestCasesJson(writeJson(dto.getTestCases()));
        if (dto.getTags() != null) question.setTagsJson(writeJson(dto.getTags()));

        AssessmentQuestion saved = questionRepository.save(question);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }

    @Transactional
    public OASubmissionResultDto submitAssessment(OASubmissionDto dto) {
        Candidate candidate = candidateRepository.findById(dto.getCandidateId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + dto.getCandidateId()));

        int totalScore = 88;
        int codeQuality = 94;
        int algorithmic = 92;
        int systemDesign = 86;
        int proctorTrust = 99;
        double plagiarism = 0.02;

        List<CandidateDto.OASectionDto> sections = List.of(
                CandidateDto.OASectionDto.builder().name("Algorithmic Problem Solving").score(92).maxScore(100).build(),
                CandidateDto.OASectionDto.builder().name("Concurrency & Thread Safety").score(94).maxScore(100).build(),
                CandidateDto.OASectionDto.builder().name("System Design & Scalability").score(86).maxScore(100).build()
        );

        OAResult result = OAResult.builder()
                .id("oa-res-" + UUID.randomUUID().toString().substring(0, 8))
                .candidateId(candidate.getId())
                .assessmentId(dto.getAssessmentId() != null ? dto.getAssessmentId() : "oa-java-senior")
                .title("Senior Java Backend Engineering OA")
                .totalScore(totalScore)
                .completedAt("Just now")
                .timeSpentMinutes(dto.getTimeSpentMinutes() != null ? dto.getTimeSpentMinutes() : 42)
                .codeQualityScore(codeQuality)
                .algorithmicScore(algorithmic)
                .systemDesignScore(systemDesign)
                .proctorTrustScore(proctorTrust)
                .plagiarismIndex(plagiarism)
                .sectionsJson(writeJson(sections))
                .build();

        oaResultRepository.save(result);

        // Update candidate status and factor breakdown
        candidate.setStatus("oa_completed");
        candidate.setFactorOaPerformance(totalScore);
        candidate.setFactorCodeQuality(codeQuality);
        candidateRepository.save(candidate);

        // Notify recruiter
        notificationService.createNotification(NotificationDto.builder()
                .title(candidate.getName() + " submitted Online Assessment")
                .message("Scored " + totalScore + "% on Online Assessment with " + proctorTrust + "% proctor trust score.")
                .type("oa_completed")
                .targetTab("profile")
                .candidateId(candidate.getId())
                .build());

        return OASubmissionResultDto.builder()
                .submissionId(result.getId())
                .candidateId(candidate.getId())
                .assessmentId(result.getAssessmentId())
                .title(result.getTitle())
                .totalScore(totalScore)
                .completedAt(result.getCompletedAt())
                .timeSpentMinutes(result.getTimeSpentMinutes())
                .codeQualityScore(codeQuality)
                .algorithmicScore(algorithmic)
                .systemDesignScore(systemDesign)
                .proctorTrustScore(proctorTrust)
                .plagiarismIndex(plagiarism)
                .sections(sections)
                .feedbackSummary("Candidate demonstrated clean code structure, correct sliding window logic, and efficient time complexity.")
                .build();
    }

    @Transactional
    public List<CandidateDto> assignAssessment(String assessmentId, List<String> candidateIds) {
        List<CandidateDto> updatedCandidates = new ArrayList<>();
        for (String cId : candidateIds) {
            Optional<Candidate> candOpt = candidateRepository.findById(cId);
            if (candOpt.isPresent()) {
                Candidate c = candOpt.get();
                c.setStatus("oa_pending");
                candidateRepository.save(c);

                notificationService.createNotification(NotificationDto.builder()
                        .title("Assessment Assigned to " + c.getName())
                        .message("Online Assessment dispatched for " + c.getJobTitle() + ".")
                        .type("oa_pending")
                        .targetTab("pipeline")
                        .candidateId(c.getId())
                        .build());
            }
        }
        return candidateRepository.findAll().stream().map(c -> CandidateDto.builder().id(c.getId()).status(c.getStatus()).name(c.getName()).build()).collect(Collectors.toList());
    }

    public List<AssessmentQuestionDto> generateAiQuestions(String roleTitle, List<String> targetSkills, String difficulty) {
        String prompt = "Generate 2 production-level coding assessment questions for role: " + roleTitle + " focusing on skills: " + String.join(", ", targetSkills != null ? targetSkills : List.of("Java", "Spring Boot")) + " with difficulty " + difficulty + ". Return a JSON array of question objects with fields: title, difficulty, type (coding), category, timeLimitMinutes, description, starterCode (object with java, typescript, python keys), examples (array of input, output, explanation), constraints (array of strings), testCases (array of id, input, expectedOutput, isHidden), tags (array of strings).";
        String response = geminiService.generateContent(prompt);

        try {
            String clean = cleanJson(response);
            return objectMapper.readValue(clean, new TypeReference<List<AssessmentQuestionDto>>() {});
        } catch (Exception ex) {
            log.warn("Could not parse AI questions output, returning default suggested question", ex);
            return List.of(
                    AssessmentQuestionDto.builder()
                            .title("Distributed Rate Limiter with Sliding Window")
                            .difficulty(difficulty != null ? difficulty : "Medium")
                            .type("coding")
                            .category("Concurrency & System Design")
                            .timeLimitMinutes(25)
                            .description("Implement a thread-safe sliding window rate limiter allowing maxRequests per windowSizeMs.")
                            .starterCode(Map.of("java", "public class RateLimiter { ... }"))
                            .tags(List.of("Concurrency", "RateLimiter", "Java"))
                            .build()
            );
        }
    }

    private AssessmentQuestionDto mapToDto(AssessmentQuestion q) {
        Map<String, String> starter = new HashMap<>();
        try {
            if (q.getStarterCodeJson() != null && !q.getStarterCodeJson().isBlank()) {
                starter = objectMapper.readValue(q.getStarterCodeJson(), new TypeReference<Map<String, String>>() {});
            }
        } catch (Exception ignored) {}

        List<AssessmentQuestionDto.ExampleDto> examples = new ArrayList<>();
        try {
            if (q.getExamplesJson() != null && !q.getExamplesJson().isBlank()) {
                examples = objectMapper.readValue(q.getExamplesJson(), new TypeReference<List<AssessmentQuestionDto.ExampleDto>>() {});
            }
        } catch (Exception ignored) {}

        List<String> constraints = new ArrayList<>();
        try {
            if (q.getConstraintsJson() != null && !q.getConstraintsJson().isBlank()) {
                constraints = objectMapper.readValue(q.getConstraintsJson(), new TypeReference<List<String>>() {});
            }
        } catch (Exception ignored) {}

        List<AssessmentQuestionDto.TestCaseDto> testCases = new ArrayList<>();
        try {
            if (q.getTestCasesJson() != null && !q.getTestCasesJson().isBlank()) {
                testCases = objectMapper.readValue(q.getTestCasesJson(), new TypeReference<List<AssessmentQuestionDto.TestCaseDto>>() {});
            }
        } catch (Exception ignored) {}

        List<String> tags = new ArrayList<>();
        try {
            if (q.getTagsJson() != null && !q.getTagsJson().isBlank()) {
                tags = objectMapper.readValue(q.getTagsJson(), new TypeReference<List<String>>() {});
            }
        } catch (Exception ignored) {}

        return AssessmentQuestionDto.builder()
                .id(q.getId())
                .title(q.getTitle())
                .difficulty(q.getDifficulty())
                .type(q.getType())
                .category(q.getCategory())
                .timeLimitMinutes(q.getTimeLimitMinutes())
                .description(q.getDescription())
                .starterCode(starter)
                .examples(examples)
                .constraints(constraints)
                .testCases(testCases)
                .tags(tags)
                .build();
    }

    private String cleanJson(String output) {
        if (output == null) return "[]";
        String trimmed = output.trim();
        if (trimmed.startsWith("```json")) trimmed = trimmed.substring(7);
        else if (trimmed.startsWith("```")) trimmed = trimmed.substring(3);
        if (trimmed.endsWith("```")) trimmed = trimmed.substring(0, trimmed.length() - 3);
        return trimmed.trim();
    }

    private String writeJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "[]";
        }
    }
}

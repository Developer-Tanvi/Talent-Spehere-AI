package com.talentsphere.ai.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.talentsphere.ai.dto.InterviewDto;
import com.talentsphere.ai.entity.Candidate;
import com.talentsphere.ai.entity.Interview;
import com.talentsphere.ai.entity.InterviewFocusArea;
import com.talentsphere.ai.exception.ResourceNotFoundException;
import com.talentsphere.ai.repository.CandidateRepository;
import com.talentsphere.ai.repository.InterviewFocusAreaRepository;
import com.talentsphere.ai.repository.InterviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final CandidateRepository candidateRepository;
    private final InterviewFocusAreaRepository focusAreaRepository;
    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public List<InterviewDto> getAllInterviews() {
        return interviewRepository.findAllByOrderByScheduledAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<InterviewDto> getInterviewsByCandidate(String candidateId) {
        return interviewRepository.findByCandidateIdOrderByScheduledAtDesc(candidateId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public InterviewDto scheduleInterview(InterviewDto dto) {
        String id = dto.getId() != null ? dto.getId() : "int-" + UUID.randomUUID().toString().substring(0, 8);

        Candidate candidate = candidateRepository.findById(dto.getCandidateId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + dto.getCandidateId()));

        Interview interview = Interview.builder()
                .id(id)
                .candidateId(candidate.getId())
                .candidateName(candidate.getName())
                .jobId(dto.getJobId() != null ? dto.getJobId() : candidate.getJobId())
                .jobTitle(dto.getJobTitle() != null ? dto.getJobTitle() : candidate.getJobTitle())
                .scheduledAt(dto.getScheduledAt())
                .interviewer(dto.getInterviewer())
                .type(dto.getType() != null ? dto.getType() : "Technical")
                .status("SCHEDULED")
                .notes(dto.getNotes())
                .build();

        Interview saved = interviewRepository.save(interview);
        return mapToDto(saved);
    }

    @Transactional
    public List<InterviewDto.InterviewFocusAreaDto> generateInterviewBrief(String candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + candidateId));

        List<InterviewFocusArea> existing = focusAreaRepository.findByCandidateId(candidateId);
        if (!existing.isEmpty()) {
            return existing.stream().map(f -> InterviewDto.InterviewFocusAreaDto.builder()
                    .topic(f.getTopic())
                    .rationale(f.getRationale())
                    .suggestedQuestion(f.getSuggestedQuestion())
                    .expectedAnswerRubric(f.getExpectedAnswerRubric())
                    .difficulty(f.getDifficulty())
                    .build()).collect(Collectors.toList());
        }

        // Generate with Gemini AI
        String prompt = "Generate 3 targeted interview focus areas for candidate " + candidate.getName() + " applying for " + candidate.getJobTitle() + " with skills " + candidate.getTopMatchedSkills() + " and gaps " + candidate.getSkillGaps() + ". Return a JSON array of objects with fields: topic, rationale, suggestedQuestion, expectedAnswerRubric, difficulty (Medium, Hard, Expert).";
        String aiResponse = geminiService.generateContent(prompt);

        List<InterviewDto.InterviewFocusAreaDto> result = new ArrayList<>();
        try {
            String clean = cleanJson(aiResponse);
            result = objectMapper.readValue(clean, new TypeReference<List<InterviewDto.InterviewFocusAreaDto>>() {});

            for (InterviewDto.InterviewFocusAreaDto item : result) {
                focusAreaRepository.save(InterviewFocusArea.builder()
                        .id("fa-" + UUID.randomUUID().toString().substring(0, 8))
                        .candidateId(candidateId)
                        .topic(item.getTopic())
                        .rationale(item.getRationale())
                        .suggestedQuestion(item.getSuggestedQuestion())
                        .expectedAnswerRubric(item.getExpectedAnswerRubric())
                        .difficulty(item.getDifficulty() != null ? item.getDifficulty() : "Hard")
                        .build());
            }
        } catch (Exception ex) {
            log.warn("Could not parse AI interview brief JSON, using default focus areas", ex);
            InterviewDto.InterviewFocusAreaDto fallback = InterviewDto.InterviewFocusAreaDto.builder()
                    .topic("Distributed Systems & JVM Internals")
                    .rationale("Candidate claims strong Spring Boot and Kafka experience.")
                    .suggestedQuestion("How do you handle idempotent consumer processing and out-of-order Kafka records in a multi-partition topic?")
                    .expectedAnswerRubric("Mentions transactional outbox, sequence IDs, dead letter queues, and consumer offset commits.")
                    .difficulty("Hard")
                    .build();
            result.add(fallback);
        }

        return result;
    }

    private InterviewDto mapToDto(Interview i) {
        List<InterviewFocusArea> focusAreas = focusAreaRepository.findByCandidateId(i.getCandidateId());
        List<InterviewDto.InterviewFocusAreaDto> focusDtos = focusAreas.stream()
                .map(f -> InterviewDto.InterviewFocusAreaDto.builder()
                        .topic(f.getTopic())
                        .rationale(f.getRationale())
                        .suggestedQuestion(f.getSuggestedQuestion())
                        .expectedAnswerRubric(f.getExpectedAnswerRubric())
                        .difficulty(f.getDifficulty())
                        .build())
                .collect(Collectors.toList());

        return InterviewDto.builder()
                .id(i.getId())
                .candidateId(i.getCandidateId())
                .candidateName(i.getCandidateName())
                .jobId(i.getJobId())
                .jobTitle(i.getJobTitle())
                .scheduledAt(i.getScheduledAt())
                .interviewer(i.getInterviewer())
                .type(i.getType())
                .status(i.getStatus())
                .notes(i.getNotes())
                .aiFocusAreas(focusDtos)
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
}

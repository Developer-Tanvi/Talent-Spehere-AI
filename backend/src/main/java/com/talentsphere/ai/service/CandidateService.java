package com.talentsphere.ai.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.talentsphere.ai.dto.CandidateComparisonResponse;
import com.talentsphere.ai.dto.CandidateDto;
import com.talentsphere.ai.entity.*;
import com.talentsphere.ai.exception.ResourceNotFoundException;
import com.talentsphere.ai.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;
    private final VerifiedSkillRepository verifiedSkillRepository;
    private final ExperienceItemRepository experienceItemRepository;
    private final ProjectItemRepository projectItemRepository;
    private final ProfessionalEvidenceRepository professionalEvidenceRepository;
    private final CandidateApplicationRepository applicationRepository;
    private final ApplicationStageRepository stageRepository;
    private final OAResultRepository oaResultRepository;
    private final InterviewFocusAreaRepository focusAreaRepository;
    private final FileStorageService fileStorageService;
    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public List<CandidateDto> getAllCandidates() {
        return candidateRepository.findAllByOrderByFitScoreDesc().stream()
                .map(this::populateCandidateDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CandidateDto getCandidateById(String id) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + id));
        return populateCandidateDto(candidate);
    }

    @Transactional(readOnly = true)
    public List<CandidateDto> getCandidatesByJobId(String jobId) {
        return candidateRepository.findByJobId(jobId).stream()
                .map(this::populateCandidateDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CandidateDto createCandidate(CandidateDto dto) {
        String id = dto.getId() != null ? dto.getId() : "cand-" + UUID.randomUUID().toString().substring(0, 8);

        Candidate candidate = Candidate.builder()
                .id(id)
                .name(dto.getName())
                .avatar(dto.getAvatar() != null ? dto.getAvatar() : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80")
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .location(dto.getLocation())
                .title(dto.getTitle())
                .bio(dto.getBio())
                .experienceYears(dto.getExperienceYears() != null ? dto.getExperienceYears() : 0.0)
                .currentCompany(dto.getCurrentCompany())
                .isOpenToWork(dto.getIsOpenToWork() != null ? dto.getIsOpenToWork() : true)
                .resumeFileName(dto.getResumeFileName())
                .resumeUploadedAt("Just now")
                .degree(dto.getEducation() != null ? dto.getEducation().getDegree() : null)
                .institution(dto.getEducation() != null ? dto.getEducation().getInstitution() : null)
                .graduationYear(dto.getEducation() != null ? dto.getEducation().getYear() : null)
                .gpa(dto.getEducation() != null ? dto.getEducation().getGpa() : null)
                .jobId(dto.getJobId())
                .jobTitle(dto.getJobTitle())
                .appliedDate("Just now")
                .status(dto.getStatus() != null ? dto.getStatus() : "applied")
                .fitScore(dto.getFitScore() != null ? dto.getFitScore() : 85)
                .confidenceScore(dto.getConfidenceScore() != null ? dto.getConfidenceScore() : 90)
                .recommendation(dto.getRecommendation() != null ? dto.getRecommendation() : "NEEDS_REVIEW")
                .recommendationReason(dto.getRecommendationReason())
                .topMatchedSkills(writeJson(dto.getTopMatchedSkills()))
                .skillGaps(writeJson(dto.getSkillGaps()))
                .build();

        if (dto.getFactorBreakdown() != null) {
            candidate.setFactorCoreSkills(dto.getFactorBreakdown().getCoreSkills());
            candidate.setFactorExperienceRelevance(dto.getFactorBreakdown().getExperienceRelevance());
            candidate.setFactorOaPerformance(dto.getFactorBreakdown().getOaPerformance());
            candidate.setFactorCodeQuality(dto.getFactorBreakdown().getCodeQuality());
            candidate.setFactorProfileConsistency(dto.getFactorBreakdown().getProfileConsistency());
        }

        Candidate saved = candidateRepository.save(candidate);

        // Save nested elements if provided
        saveChildEntities(saved.getId(), dto);

        return populateCandidateDto(saved);
    }

    @Transactional
    public CandidateDto updateStatus(String candidateId, String newStatus) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + candidateId));

        candidate.setStatus(newStatus);
        Candidate saved = candidateRepository.save(candidate);
        return populateCandidateDto(saved);
    }

    @Transactional
    public CandidateDto updateCandidate(String id, CandidateDto dto) {
        Candidate candidate = candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + id));

        if (dto.getName() != null) candidate.setName(dto.getName());
        if (dto.getEmail() != null) candidate.setEmail(dto.getEmail());
        if (dto.getPhone() != null) candidate.setPhone(dto.getPhone());
        if (dto.getLocation() != null) candidate.setLocation(dto.getLocation());
        if (dto.getTitle() != null) candidate.setTitle(dto.getTitle());
        if (dto.getBio() != null) candidate.setBio(dto.getBio());
        if (dto.getExperienceYears() != null) candidate.setExperienceYears(dto.getExperienceYears());
        if (dto.getCurrentCompany() != null) candidate.setCurrentCompany(dto.getCurrentCompany());
        if (dto.getStatus() != null) candidate.setStatus(dto.getStatus());
        if (dto.getFitScore() != null) candidate.setFitScore(dto.getFitScore());
        if (dto.getRecommendation() != null) candidate.setRecommendation(dto.getRecommendation());
        if (dto.getRecommendationReason() != null) candidate.setRecommendationReason(dto.getRecommendationReason());

        if (dto.getEducation() != null) {
            candidate.setDegree(dto.getEducation().getDegree());
            candidate.setInstitution(dto.getEducation().getInstitution());
            candidate.setGraduationYear(dto.getEducation().getYear());
            candidate.setGpa(dto.getEducation().getGpa());
        }

        Candidate saved = candidateRepository.save(candidate);
        return populateCandidateDto(saved);
    }

    @Transactional
    public CandidateDto uploadResume(String candidateId, MultipartFile file) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + candidateId));

        String storedFileName = fileStorageService.storeFile(file);
        String extractedText = fileStorageService.extractTextFromFile(file);

        candidate.setResumeFileName(storedFileName);
        candidate.setResumeUploadedAt("Just now");

        // Parse with Gemini
        try {
            String parsedJson = geminiService.parseCandidateResume(extractedText);
            JsonNode node = objectMapper.readTree(parsedJson);

            if (node.has("title")) candidate.setTitle(node.get("title").asText());
            if (node.has("bio")) candidate.setBio(node.get("bio").asText());
            if (node.has("experienceYears")) candidate.setExperienceYears(node.get("experienceYears").asDouble());
            if (node.has("currentCompany")) candidate.setCurrentCompany(node.get("currentCompany").asText());
            if (node.has("topMatchedSkills")) {
                List<String> skills = new ArrayList<>();
                node.get("topMatchedSkills").forEach(s -> skills.add(s.asText()));
                candidate.setTopMatchedSkills(writeJson(skills));
            }
        } catch (Exception ex) {
            log.warn("Could not automatically parse resume text into structured fields", ex);
        }

        Candidate saved = candidateRepository.save(candidate);
        return populateCandidateDto(saved);
    }

    public CandidateComparisonResponse compareCandidates(String candidateIdA, String candidateIdB) {
        CandidateDto a = getCandidateById(candidateIdA);
        CandidateDto b = getCandidateById(candidateIdB);

        String winner = (a.getFitScore() >= b.getFitScore()) ? a.getId() : b.getId();
        String summary = String.format("%s holds a higher AI fit score (%d%% vs %d%%) and demonstrated stronger algorithmic verification in technical evaluations.",
                a.getFitScore() >= b.getFitScore() ? a.getName() : b.getName(),
                Math.max(a.getFitScore(), b.getFitScore()),
                Math.min(a.getFitScore(), b.getFitScore()));

        List<String> advA = List.of(
                "Higher core skills alignment (" + (a.getFactorBreakdown() != null ? a.getFactorBreakdown().getCoreSkills() : 90) + "%)",
                "Proven open-source GitHub contributions and consistency rating",
                "Fewer critical skill gaps"
        );

        List<String> advB = List.of(
                "Strong foundational domain background",
                "Solid overall experience length (" + b.getExperienceYears() + " yrs)",
                "Relevant portfolio case studies"
        );

        return CandidateComparisonResponse.builder()
                .candidateA(a)
                .candidateB(b)
                .winnerId(winner)
                .comparisonSummary(summary)
                .advantagePointsA(advA)
                .advantagePointsB(advB)
                .recommendation(a.getFitScore() >= b.getFitScore() ? a.getRecommendation() : b.getRecommendation())
                .build();
    }

    private CandidateDto populateCandidateDto(Candidate c) {
        List<CandidateDto.VerifiedSkillDto> vSkills = verifiedSkillRepository.findByCandidateId(c.getId()).stream()
                .map(v -> CandidateDto.VerifiedSkillDto.builder()
                        .name(v.getName())
                        .level(v.getLevel())
                        .score(v.getScore())
                        .evidenceSource(v.getEvidenceSource())
                        .evidenceSnippet(v.getEvidenceSnippet())
                        .verified(v.getVerified())
                        .build())
                .collect(Collectors.toList());

        List<CandidateDto.ExperienceItemDto> exps = experienceItemRepository.findByCandidateId(c.getId()).stream()
                .map(e -> CandidateDto.ExperienceItemDto.builder()
                        .id(e.getId())
                        .role(e.getRole())
                        .company(e.getCompany())
                        .period(e.getPeriod())
                        .location(e.getLocation())
                        .description(readJsonList(e.getDescriptionJson()))
                        .keyDeliverables(readJsonList(e.getKeyDeliverablesJson()))
                        .skillsUsed(readJsonList(e.getSkillsUsedJson()))
                        .relevanceScore(e.getRelevanceScore())
                        .build())
                .collect(Collectors.toList());

        List<CandidateDto.ProjectItemDto> projs = projectItemRepository.findByCandidateId(c.getId()).stream()
                .map(p -> CandidateDto.ProjectItemDto.builder()
                        .id(p.getId())
                        .title(p.getTitle())
                        .description(p.getDescription())
                        .repoUrl(p.getRepoUrl())
                        .liveUrl(p.getLiveUrl())
                        .stars(p.getStars())
                        .commits(p.getCommits())
                        .techStack(readJsonList(p.getTechStackJson()))
                        .highlights(readJsonList(p.getHighlightsJson()))
                        .complexityScore(p.getComplexityScore())
                        .build())
                .collect(Collectors.toList());

        List<CandidateDto.ProfessionalProfileDto> profs = professionalEvidenceRepository.findByCandidateId(c.getId()).stream()
                .map(pe -> CandidateDto.ProfessionalProfileDto.builder()
                        .id(pe.getId())
                        .platform(pe.getPlatform())
                        .handle(pe.getHandle())
                        .url(pe.getUrl())
                        .verified(pe.getVerified())
                        .connectedAt(pe.getConnectedAt())
                        .stats(pe.getStats())
                        .badge(pe.getBadge())
                        .build())
                .collect(Collectors.toList());

        Optional<OAResult> oa = oaResultRepository.findByCandidateId(c.getId());
        CandidateDto.OAResultDto oaDto = oa.map(o -> CandidateDto.OAResultDto.builder()
                .assessmentId(o.getAssessmentId())
                .title(o.getTitle())
                .totalScore(o.getTotalScore())
                .completedAt(o.getCompletedAt())
                .timeSpentMinutes(o.getTimeSpentMinutes())
                .codeQualityScore(o.getCodeQualityScore())
                .algorithmicScore(o.getAlgorithmicScore())
                .systemDesignScore(o.getSystemDesignScore())
                .proctorTrustScore(o.getProctorTrustScore())
                .plagiarismIndex(o.getPlagiarismIndex())
                .build()).orElse(null);

        List<CandidateDto.InterviewFocusAreaDto> focus = focusAreaRepository.findByCandidateId(c.getId()).stream()
                .map(fa -> CandidateDto.InterviewFocusAreaDto.builder()
                        .topic(fa.getTopic())
                        .rationale(fa.getRationale())
                        .suggestedQuestion(fa.getSuggestedQuestion())
                        .expectedAnswerRubric(fa.getExpectedAnswerRubric())
                        .difficulty(fa.getDifficulty())
                        .build())
                .collect(Collectors.toList());

        CandidateDto.GithubMetricsDto gh = (c.getGithubUsername() != null) ?
                CandidateDto.GithubMetricsDto.builder()
                        .username(c.getGithubUsername())
                        .publicRepos(c.getGithubPublicRepos())
                        .totalStars(c.getGithubTotalStars())
                        .totalCommitsLastYear(c.getGithubTotalCommits())
                        .consistencyRating(c.getGithubConsistencyRating())
                        .qualityRating(c.getGithubQualityRating())
                        .build() : null;

        return CandidateDto.builder()
                .id(c.getId())
                .name(c.getName())
                .avatar(c.getAvatar())
                .email(c.getEmail())
                .phone(c.getPhone())
                .location(c.getLocation())
                .title(c.getTitle())
                .bio(c.getBio())
                .experienceYears(c.getExperienceYears())
                .currentCompany(c.getCurrentCompany())
                .isOpenToWork(c.getIsOpenToWork())
                .resumeFileName(c.getResumeFileName())
                .resumeUploadedAt(c.getResumeUploadedAt())
                .education(CandidateDto.EducationDto.builder()
                        .degree(c.getDegree())
                        .institution(c.getInstitution())
                        .year(c.getGraduationYear())
                        .gpa(c.getGpa())
                        .build())
                .jobId(c.getJobId())
                .jobTitle(c.getJobTitle())
                .appliedDate(c.getAppliedDate())
                .status(c.getStatus())
                .fitScore(c.getFitScore())
                .confidenceScore(c.getConfidenceScore())
                .recommendation(c.getRecommendation())
                .recommendationReason(c.getRecommendationReason())
                .factorBreakdown(CandidateDto.FactorBreakdownDto.builder()
                        .coreSkills(c.getFactorCoreSkills())
                        .experienceRelevance(c.getFactorExperienceRelevance())
                        .oaPerformance(c.getFactorOaPerformance())
                        .codeQuality(c.getFactorCodeQuality())
                        .profileConsistency(c.getFactorProfileConsistency())
                        .build())
                .topMatchedSkills(readJsonList(c.getTopMatchedSkills()))
                .skillGaps(readJsonList(c.getSkillGaps()))
                .verifiedSkills(vSkills)
                .experience(exps)
                .projects(projs)
                .professionalProfiles(profs)
                .oaResult(oaDto)
                .githubMetrics(gh)
                .interviewFocusAreas(focus)
                .build();
    }

    private void saveChildEntities(String candidateId, CandidateDto dto) {
        if (dto.getVerifiedSkills() != null) {
            dto.getVerifiedSkills().forEach(v -> {
                verifiedSkillRepository.save(VerifiedSkill.builder()
                        .id("vsk-" + UUID.randomUUID().toString().substring(0, 8))
                        .candidateId(candidateId)
                        .name(v.getName())
                        .level(v.getLevel() != null ? v.getLevel() : "Intermediate")
                        .score(v.getScore() != null ? v.getScore() : 80)
                        .evidenceSource(v.getEvidenceSource() != null ? v.getEvidenceSource() : "Assessment")
                        .evidenceSnippet(v.getEvidenceSnippet())
                        .verified(v.getVerified() != null ? v.getVerified() : true)
                        .build());
            });
        }

        if (dto.getExperience() != null) {
            dto.getExperience().forEach(e -> {
                experienceItemRepository.save(ExperienceItem.builder()
                        .id("exp-" + UUID.randomUUID().toString().substring(0, 8))
                        .candidateId(candidateId)
                        .role(e.getRole())
                        .company(e.getCompany())
                        .period(e.getPeriod())
                        .location(e.getLocation())
                        .descriptionJson(writeJson(e.getDescription()))
                        .keyDeliverablesJson(writeJson(e.getKeyDeliverables()))
                        .skillsUsedJson(writeJson(e.getSkillsUsed()))
                        .relevanceScore(e.getRelevanceScore() != null ? e.getRelevanceScore() : 90)
                        .build());
            });
        }

        if (dto.getProjects() != null) {
            dto.getProjects().forEach(p -> {
                projectItemRepository.save(ProjectItem.builder()
                        .id("proj-" + UUID.randomUUID().toString().substring(0, 8))
                        .candidateId(candidateId)
                        .title(p.getTitle())
                        .description(p.getDescription())
                        .repoUrl(p.getRepoUrl())
                        .liveUrl(p.getLiveUrl())
                        .stars(p.getStars() != null ? p.getStars() : 0)
                        .commits(p.getCommits() != null ? p.getCommits() : 0)
                        .techStackJson(writeJson(p.getTechStack()))
                        .highlightsJson(writeJson(p.getHighlights()))
                        .complexityScore(p.getComplexityScore() != null ? p.getComplexityScore() : 85)
                        .build());
            });
        }
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

package com.talentsphere.ai.service;

import com.talentsphere.ai.dto.AuditLogDto;
import com.talentsphere.ai.dto.CandidateDto;
import com.talentsphere.ai.dto.DecisionIntelligenceDto;
import com.talentsphere.ai.entity.Candidate;
import com.talentsphere.ai.entity.OAResult;
import com.talentsphere.ai.exception.ResourceNotFoundException;
import com.talentsphere.ai.repository.CandidateRepository;
import com.talentsphere.ai.repository.OAResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class DecisionIntelligenceService {

    private final CandidateService candidateService;
    private final CandidateRepository candidateRepository;
    private final OAResultRepository oaResultRepository;
    private final AuditLogService auditLogService;
    private final NotificationService notificationService;

    @Transactional(readOnly = true)
    public DecisionIntelligenceDto getDecisionIntelligence(String candidateId) {
        CandidateDto candidate = candidateService.getCandidateById(candidateId);
        Optional<OAResult> oa = oaResultRepository.findByCandidateId(candidateId);

        List<String> strengths = List.of(
                "Strong alignment on required skills: " + String.join(", ", candidate.getTopMatchedSkills() != null ? candidate.getTopMatchedSkills() : List.of("Java", "Spring Boot")),
                "High technical assessment proficiency (" + (oa.map(OAResult::getTotalScore).orElse(candidate.getFitScore())) + "%)",
                "Proven open-source contributions and consistent code quality rating"
        );

        List<String> risks = (candidate.getSkillGaps() != null && !candidate.getSkillGaps().isEmpty())
                ? candidate.getSkillGaps()
                : List.of("Requires container orchestration verification in technical interview loop");

        List<String> nextActions = List.of(
                "Fast-track to Technical Panel Interview",
                "Probe system architecture and failure-recovery mechanisms during live coding",
                "Verify production Kubernetes and cluster monitoring depth"
        );

        return DecisionIntelligenceDto.builder()
                .candidateId(candidate.getId())
                .candidateName(candidate.getName())
                .jobTitle(candidate.getJobTitle())
                .fitScore(candidate.getFitScore())
                .confidenceScore(candidate.getConfidenceScore())
                .aiRecommendation(candidate.getRecommendation())
                .recommendationReason(candidate.getRecommendationReason())
                .keyStrengths(strengths)
                .potentialRisksOrGaps(risks)
                .recommendedNextActions(nextActions)
                .factorBreakdown(candidate.getFactorBreakdown())
                .evidenceSynthesis("Candidate demonstrates verified project artifacts across GitHub and solid score in online evaluation. Evidence supports practical backend engineering skills.")
                .oaOverallScore(oa.map(OAResult::getTotalScore).orElse(candidate.getFitScore()))
                .isOverridden(false)
                .recruiterDecision("PENDING_REVIEW")
                .build();
    }

    @Transactional
    public DecisionIntelligenceDto recordRecruiterOverride(
            String candidateId,
            String recruiterDecision,
            String overrideReason,
            String recruiterName) {

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + candidateId));

        // Audit Log
        AuditLogDto auditLog = AuditLogDto.builder()
                .candidateId(candidate.getId())
                .candidateName(candidate.getName())
                .candidateAvatar(candidate.getAvatar())
                .jobId(candidate.getJobId())
                .jobTitle(candidate.getJobTitle())
                .aiRecommendation(candidate.getRecommendation())
                .aiFitScore(candidate.getFitScore())
                .recruiterAction(recruiterDecision)
                .recruiterName(recruiterName != null ? recruiterName : "Recruiter")
                .isOverride(true)
                .notes(overrideReason)
                .timestamp("Just now")
                .build();

        auditLogService.recordAuditLog(auditLog);

        DecisionIntelligenceDto dto = getDecisionIntelligence(candidateId);
        dto.setIsOverridden(true);
        dto.setRecruiterDecision(recruiterDecision);
        dto.setOverrideReason(overrideReason);

        return dto;
    }
}

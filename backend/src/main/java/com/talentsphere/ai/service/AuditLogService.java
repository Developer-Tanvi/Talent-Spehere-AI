package com.talentsphere.ai.service;

import com.talentsphere.ai.dto.AuditLogDto;
import com.talentsphere.ai.entity.AuditLog;
import com.talentsphere.ai.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Transactional(readOnly = true)
    public List<AuditLogDto> getAllAuditLogs() {
        return auditLogRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public AuditLogDto recordAuditLog(AuditLogDto dto) {
        String id = dto.getId() != null ? dto.getId() : "log-" + UUID.randomUUID().toString().substring(0, 8);
        AuditLog log = AuditLog.builder()
                .id(id)
                .timestamp(dto.getTimestamp() != null ? dto.getTimestamp() : "Just now")
                .candidateId(dto.getCandidateId())
                .candidateName(dto.getCandidateName())
                .candidateAvatar(dto.getCandidateAvatar())
                .jobId(dto.getJobId())
                .jobTitle(dto.getJobTitle())
                .aiRecommendation(dto.getAiRecommendation())
                .aiFitScore(dto.getAiFitScore())
                .recruiterAction(dto.getRecruiterAction())
                .recruiterName(dto.getRecruiterName())
                .isOverride(dto.getIsOverride() != null ? dto.getIsOverride() : false)
                .notes(dto.getNotes())
                .build();

        AuditLog saved = auditLogRepository.save(log);
        return mapToDto(saved);
    }

    private AuditLogDto mapToDto(AuditLog l) {
        return AuditLogDto.builder()
                .id(l.getId())
                .timestamp(l.getTimestamp())
                .candidateId(l.getCandidateId())
                .candidateName(l.getCandidateName())
                .candidateAvatar(l.getCandidateAvatar())
                .jobId(l.getJobId())
                .jobTitle(l.getJobTitle())
                .aiRecommendation(l.getAiRecommendation())
                .aiFitScore(l.getAiFitScore())
                .recruiterAction(l.getRecruiterAction())
                .recruiterName(l.getRecruiterName())
                .isOverride(l.getIsOverride())
                .notes(l.getNotes())
                .build();
    }
}

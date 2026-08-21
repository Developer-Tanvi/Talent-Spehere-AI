package com.talentsphere.ai.service;

import com.talentsphere.ai.dto.NotificationDto;
import com.talentsphere.ai.entity.Notification;
import com.talentsphere.ai.exception.ResourceNotFoundException;
import com.talentsphere.ai.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Transactional(readOnly = true)
    public List<NotificationDto> getAllNotifications() {
        return notificationRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public NotificationDto createNotification(NotificationDto dto) {
        String id = dto.getId() != null ? dto.getId() : "notif-" + UUID.randomUUID().toString().substring(0, 8);
        Notification notif = Notification.builder()
                .id(id)
                .title(dto.getTitle())
                .message(dto.getMessage())
                .timestampLabel(dto.getTimestamp() != null ? dto.getTimestamp() : "Just now")
                .type(dto.getType() != null ? dto.getType() : "system")
                .read(dto.getRead() != null ? dto.getRead() : false)
                .targetTab(dto.getTargetTab())
                .candidateId(dto.getCandidateId())
                .build();

        Notification saved = notificationRepository.save(notif);
        return mapToDto(saved);
    }

    @Transactional
    public NotificationDto markAsRead(String id) {
        Notification notif = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));
        notif.setRead(true);
        Notification saved = notificationRepository.save(notif);
        return mapToDto(saved);
    }

    @Transactional
    public void markAllAsRead() {
        List<Notification> list = notificationRepository.findAll();
        list.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(list);
    }

    private NotificationDto mapToDto(Notification n) {
        return NotificationDto.builder()
                .id(n.getId())
                .title(n.getTitle())
                .message(n.getMessage())
                .timestamp(n.getTimestampLabel())
                .type(n.getType())
                .read(n.getRead())
                .targetTab(n.getTargetTab())
                .candidateId(n.getCandidateId())
                .build();
    }
}

package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.NotificationDto;
import com.talentsphere.ai.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "Real-time Recruiter Alerts, OA updates, and System Events")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Get all notifications")
    public ResponseEntity<ApiResponse<List<NotificationDto>>> getAllNotifications() {
        List<NotificationDto> list = notificationService.getAllNotifications();
        return ResponseEntity.ok(ApiResponse.success(list, "Notifications loaded"));
    }

    @PostMapping
    @Operation(summary = "Create a notification")
    public ResponseEntity<ApiResponse<NotificationDto>> createNotification(@RequestBody NotificationDto dto) {
        NotificationDto created = notificationService.createNotification(dto);
        return ResponseEntity.ok(ApiResponse.success(created, "Notification created"));
    }

    @PatchMapping("/{id}/read")
    @Operation(summary = "Mark single notification as read")
    public ResponseEntity<ApiResponse<NotificationDto>> markAsRead(@PathVariable String id) {
        NotificationDto updated = notificationService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.success(updated, "Notification marked as read"));
    }

    @PatchMapping("/read-all")
    @Operation(summary = "Mark all notifications as read")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead() {
        notificationService.markAllAsRead();
        return ResponseEntity.ok(ApiResponse.success(null, "All notifications marked as read"));
    }
}

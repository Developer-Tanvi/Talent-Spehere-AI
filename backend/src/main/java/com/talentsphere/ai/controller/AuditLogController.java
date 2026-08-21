package com.talentsphere.ai.controller;

import com.talentsphere.ai.dto.ApiResponse;
import com.talentsphere.ai.dto.AuditLogDto;
import com.talentsphere.ai.service.AuditLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/audit-logs")
@RequiredArgsConstructor
@Tag(name = "Audit Logs", description = "Auditable records of Human-in-the-loop decisions, overrides, and actions")
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping
    @Operation(summary = "Get audit logs")
    public ResponseEntity<ApiResponse<List<AuditLogDto>>> getAuditLogs() {
        List<AuditLogDto> list = auditLogService.getAllAuditLogs();
        return ResponseEntity.ok(ApiResponse.success(list, "Audit logs loaded"));
    }

    @PostMapping
    @Operation(summary = "Record a recruiter decision or action into audit trail")
    public ResponseEntity<ApiResponse<AuditLogDto>> recordAuditLog(@RequestBody AuditLogDto dto) {
        AuditLogDto recorded = auditLogService.recordAuditLog(dto);
        return ResponseEntity.ok(ApiResponse.success(recorded, "Audit log recorded"));
    }
}

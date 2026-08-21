package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "user_id", length = 36)
    private String userId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "timestamp_label", nullable = false, length = 100)
    private String timestampLabel;

    @Column(nullable = false, length = 50)
    private String type;

    @Builder.Default
    private Boolean read = false;

    @Column(name = "target_tab", length = 50)
    private String targetTab;

    @Column(name = "candidate_id", length = 64)
    private String candidateId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;
}

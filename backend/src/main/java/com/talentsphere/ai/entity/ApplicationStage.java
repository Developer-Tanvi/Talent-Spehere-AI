package com.talentsphere.ai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "application_stages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationStage {

    @Id
    @Column(length = 64)
    private String id;

    @Column(name = "application_id", nullable = false, length = 64)
    private String applicationId;

    @Column(nullable = false)
    private String stage;

    @Builder.Default
    private Boolean completed = false;

    @Builder.Default
    private Boolean current = false;

    @Column(name = "date_info", length = 100)
    private String dateInfo;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}

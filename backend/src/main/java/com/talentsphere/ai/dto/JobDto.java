package com.talentsphere.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobDto {
    private String id;
    private String reqCode;
    private String title;
    private String department;
    private String location;
    private String type;
    private String seniority;
    private String salaryRange;
    private String status;
    private Integer applicantsCount;
    private Integer shortlistedCount;
    private Integer interviewingCount;
    private Integer hiredCount;
    private String targetHireDate;
    private Integer minExperienceYears;
    private String description;
    private List<String> requiredSkills;
    private List<String> niceToHaveSkills;
    private List<String> responsibilities;
    private WeightsDto weights;
}

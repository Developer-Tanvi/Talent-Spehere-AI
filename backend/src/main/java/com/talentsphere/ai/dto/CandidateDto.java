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
public class CandidateDto {
    private String id;
    private String name;
    private String avatar;
    private String email;
    private String phone;
    private String location;
    private String title;
    private String bio;
    private Double experienceYears;
    private String currentCompany;
    private Boolean isOpenToWork;
    private String resumeFileName;
    private String resumeUploadedAt;

    private EducationDto education;

    private String jobId;
    private String jobTitle;
    private String appliedDate;
    private String status;
    private Integer fitScore;
    private Integer confidenceScore;
    private String recommendation;
    private String recommendationReason;

    private FactorBreakdownDto factorBreakdown;

    private List<String> topMatchedSkills;
    private List<String> skillGaps;
    private List<VerifiedSkillDto> verifiedSkills;
    private List<ExperienceItemDto> experience;
    private List<ProjectItemDto> projects;
    private List<ProfessionalProfileDto> professionalProfiles;
    private List<CandidateApplicationDto> applications;
    private OAResultDto oaResult;
    private GithubMetricsDto githubMetrics;
    private List<InterviewFocusAreaDto> interviewFocusAreas;
    private List<AuditNoteDto> auditNotes;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EducationDto {
        private String degree;
        private String institution;
        private String year;
        private String gpa;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FactorBreakdownDto {
        private Integer coreSkills;
        private Integer experienceRelevance;
        private Integer oaPerformance;
        private Integer codeQuality;
        private Integer profileConsistency;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VerifiedSkillDto {
        private String name;
        private String level;
        private Integer score;
        private String evidenceSource;
        private String evidenceSnippet;
        private Boolean verified;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExperienceItemDto {
        private String id;
        private String role;
        private String company;
        private String period;
        private String location;
        private List<String> description;
        private List<String> keyDeliverables;
        private List<String> skillsUsed;
        private Integer relevanceScore;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProjectItemDto {
        private String id;
        private String title;
        private String description;
        private String repoUrl;
        private String liveUrl;
        private Integer stars;
        private Integer commits;
        private List<String> techStack;
        private List<String> highlights;
        private Integer complexityScore;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProfessionalProfileDto {
        private String id;
        private String platform;
        private String handle;
        private String url;
        private Boolean verified;
        private String connectedAt;
        private String stats;
        private String badge;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CandidateApplicationDto {
        private String id;
        private String jobId;
        private String jobTitle;
        private String reqCode;
        private String department;
        private String companyName;
        private String appliedDate;
        private String status;
        private Integer fitScore;
        private String resumeFileName;
        private String coverNote;
        private Boolean oaRequired;
        private Boolean oaCompleted;
        private Integer oaScore;
        private List<StageProgressDto> stageProgress;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StageProgressDto {
        private String stage;
        private Boolean completed;
        private Boolean current;
        private String date;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OAResultDto {
        private String assessmentId;
        private String title;
        private Integer totalScore;
        private String completedAt;
        private Integer timeSpentMinutes;
        private List<OASectionDto> sections;
        private Integer codeQualityScore;
        private Integer algorithmicScore;
        private Integer systemDesignScore;
        private Integer proctorTrustScore;
        private Double plagiarismIndex;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OASectionDto {
        private String name;
        private Integer score;
        private Integer maxScore;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GithubMetricsDto {
        private String username;
        private Integer publicRepos;
        private Integer totalStars;
        private Integer totalCommitsLastYear;
        private List<LanguagePercentageDto> contributedLanguages;
        private Integer consistencyRating;
        private Integer qualityRating;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LanguagePercentageDto {
        private String lang;
        private Integer percentage;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InterviewFocusAreaDto {
        private String topic;
        private String rationale;
        private String suggestedQuestion;
        private String expectedAnswerRubric;
        private String difficulty;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AuditNoteDto {
        private String decision;
        private String recruiterName;
        private String timestamp;
        private String reason;
    }
}

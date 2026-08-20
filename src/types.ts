export type UserRole = 'recruiter' | 'candidate';

export type CandidateStatus = 
  | 'applied' 
  | 'ats_shortlist' 
  | 'ai_review' 
  | 'oa_pending' 
  | 'oa_completed' 
  | 'interview_scheduled' 
  | 'interview_completed' 
  | 'offer_extended' 
  | 'hired' 
  | 'rejected';

export type RecommendationType = 'PROCEED' | 'HIGH_POTENTIAL' | 'NEEDS_REVIEW' | 'DO_NOT_PROCEED';

export interface VerifiedSkill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Foundational';
  score: number; // 0-100
  evidenceSource: 'GitHub' | 'Assessment' | 'Work History' | 'Certification' | 'StackOverflow';
  evidenceSnippet: string;
  verified: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  keyDeliverables: string[];
  skillsUsed: string[];
  relevanceScore: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  repoUrl?: string;
  liveUrl?: string;
  stars?: number;
  commits?: number;
  techStack: string[];
  highlights: string[];
  complexityScore: number;
}

export interface OAResult {
  assessmentId: string;
  title: string;
  totalScore: number; // 0-100
  completedAt: string;
  timeSpentMinutes: number;
  sections: {
    name: string;
    score: number;
    maxScore: number;
  }[];
  codeQualityScore: number;
  algorithmicScore: number;
  systemDesignScore: number;
  proctorTrustScore: number;
  plagiarismIndex: number;
}

export interface ProfessionalProfile {
  id: string;
  platform: 'GitHub' | 'LinkedIn' | 'LeetCode' | 'HackerRank' | 'CodeChef' | 'Kaggle' | 'Portfolio' | 'Blog' | 'StackOverflow';
  handle: string;
  url: string;
  verified: boolean;
  connectedAt: string;
  stats?: string;
  badge?: string;
}

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  reqCode: string;
  department: string;
  companyName: string;
  appliedDate: string;
  status: CandidateStatus;
  fitScore: number;
  resumeFileName: string;
  coverNote?: string;
  oaRequired: boolean;
  oaCompleted: boolean;
  oaScore?: number;
  stageProgress: {
    stage: string;
    completed: boolean;
    current: boolean;
    date: string;
  }[];
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  bio?: string;
  experienceYears: number;
  currentCompany: string;
  isOpenToWork?: boolean;
  resumeFileName?: string;
  resumeUploadedAt?: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  };
  jobId: string;
  jobTitle: string;
  appliedDate: string;
  status: CandidateStatus;
  fitScore: number; // 0-100
  confidenceScore: number; // 0-100
  recommendation: RecommendationType;
  recommendationReason: string;
  factorBreakdown: {
    coreSkills: number;
    experienceRelevance: number;
    oaPerformance: number;
    codeQuality: number;
    profileConsistency: number;
  };
  topMatchedSkills: string[];
  skillGaps: string[];
  verifiedSkills: VerifiedSkill[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  professionalProfiles?: ProfessionalProfile[];
  applications?: CandidateApplication[];
  oaResult?: OAResult;
  githubMetrics?: {
    username: string;
    publicRepos: number;
    totalStars: number;
    totalCommitsLastYear: number;
    contributedLanguages: { lang: string; percentage: number }[];
    consistencyRating: number;
    qualityRating: number;
  };
  interviewFocusAreas: {
    topic: string;
    rationale: string;
    suggestedQuestion: string;
    expectedAnswerRubric: string;
    difficulty: 'Medium' | 'Hard' | 'Expert';
  }[];
  auditNotes?: {
    decision: 'APPROVED' | 'OVERRIDDEN' | 'FLAGGED';
    recruiterName: string;
    timestamp: string;
    reason: string;
  }[];
}

export interface JobRequisition {
  id: string;
  reqCode: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Staff' | 'Lead';
  salaryRange: string;
  status: 'Active' | 'Paused' | 'Closed';
  applicantsCount: number;
  shortlistedCount: number;
  interviewingCount: number;
  hiredCount: number;
  targetHireDate: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  minExperienceYears: number;
  description: string;
  responsibilities: string[];
  weights: {
    skills: number;
    experience: number;
    oaScore: number;
    githubEvidence: number;
    education: number;
  };
}

export interface AssessmentQuestion {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'coding' | 'system_design' | 'multiple_choice';
  category: string;
  timeLimitMinutes: number;
  description: string;
  starterCode: {
    [key: string]: string; // java, typescript, python
  };
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  testCases: {
    id: string;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }[];
  tags: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar: string;
  jobId?: string;
  jobTitle: string;
  aiRecommendation: RecommendationType;
  aiFitScore: number;
  recruiterAction: string;
  recruiterName: string;
  isOverride: boolean;
  notes: string;
}

export type ActiveTab = 
  | 'landing'
  | 'login'
  | 'overview' 
  | 'jobs'
  | 'sourcing'
  | 'candidates' 
  | 'profile' 
  | 'comparison' 
  | 'decisions' 
  | 'evidence' 
  | 'assessments' 
  | 'pipeline' 
  | 'interview_brief' 
  | 'analytics' 
  | 'audit' 
  | 'candidate_portal'
  | 'assessment_ide';


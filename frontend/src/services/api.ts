import { 
  JobRequisition, 
  Candidate, 
  AssessmentQuestion, 
  AuditLogEntry, 
  CandidateStatus 
} from '../types';
import { AppNotification } from '../components/NotificationsDropdown';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

async function fetchJson<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const token = localStorage.getItem('talentsphere_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers as Record<string, string> || {})
      }
    });

    if (!res.ok) {
      console.warn(`API call to ${endpoint} returned HTTP status ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`Failed to reach backend API at ${endpoint}:`, err);
    return null;
  }
}

export const api = {
  // Auth
  async login(email: string, password: string) {
    return fetchJson<{ accessToken: string; id: string; name: string; email: string; role: string }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    );
  },

  async register(name: string, email: string, password: string, role: string) {
    return fetchJson<{ accessToken: string; id: string; name: string; email: string; role: string }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify({ name, email, password, role }) }
    );
  },

  // Jobs
  async getJobs(): Promise<JobRequisition[] | null> {
    return fetchJson<JobRequisition[]>('/jobs');
  },

  async createJob(job: JobRequisition): Promise<JobRequisition | null> {
    return fetchJson<JobRequisition>('/jobs', {
      method: 'POST',
      body: JSON.stringify(job)
    });
  },

  async updateWeights(jobId: string, weights: JobRequisition['weights']): Promise<JobRequisition | null> {
    return fetchJson<JobRequisition>(`/jobs/${jobId}/weights`, {
      method: 'PATCH',
      body: JSON.stringify(weights)
    });
  },

  // Candidates
  async getCandidates(jobId?: string): Promise<Candidate[] | null> {
    const query = jobId ? `?jobId=${encodeURIComponent(jobId)}` : '';
    return fetchJson<Candidate[]>(`/candidates${query}`);
  },

  async getCandidateById(id: string): Promise<Candidate | null> {
    return fetchJson<Candidate>(`/candidates/${id}`);
  },

  async createCandidate(candidate: Candidate): Promise<Candidate | null> {
    return fetchJson<Candidate>('/candidates', {
      method: 'POST',
      body: JSON.stringify(candidate)
    });
  },

  async updateCandidateStatus(candidateId: string, status: CandidateStatus): Promise<Candidate | null> {
    return fetchJson<Candidate>(`/candidates/${candidateId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  async compareCandidates(candA: string, candB: string) {
    return fetchJson<{
      candidateA: Candidate;
      candidateB: Candidate;
      winnerId: string;
      comparisonSummary: string;
      advantagePointsA: string[];
      advantagePointsB: string[];
      recommendation: string;
    }>(`/candidates/compare?candidateA=${encodeURIComponent(candA)}&candidateB=${encodeURIComponent(candB)}`);
  },

  // Online Assessments
  async getQuestions(): Promise<AssessmentQuestion[] | null> {
    return fetchJson<AssessmentQuestion[]>('/assessments/questions');
  },

  async createQuestion(question: AssessmentQuestion): Promise<AssessmentQuestion | null> {
    return fetchJson<AssessmentQuestion>('/assessments/questions', {
      method: 'POST',
      body: JSON.stringify(question)
    });
  },

  async submitAssessment(submission: { candidateId: string; assessmentId: string; timeSpentMinutes: number; answers: Record<string, string> }) {
    return fetchJson('/assessments/submit', {
      method: 'POST',
      body: JSON.stringify(submission)
    });
  },

  async assignAssessment(assessmentId: string, candidateIds: string[]) {
    return fetchJson(`/assessments/${assessmentId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ candidateIds })
    });
  },

  async generateQuestions(roleTitle: string, targetSkills: string[], difficulty = 'Medium') {
    return fetchJson<AssessmentQuestion[]>('/assessments/generate-questions', {
      method: 'POST',
      body: JSON.stringify({ roleTitle, targetSkills, difficulty })
    });
  },

  // Interviews
  async getInterviews() {
    return fetchJson('/interviews');
  },

  async scheduleInterview(dto: { candidateId: string; candidateName?: string; jobId: string; jobTitle?: string; scheduledAt: string; interviewer: string; type: string; notes?: string }) {
    return fetchJson('/interviews', {
      method: 'POST',
      body: JSON.stringify(dto)
    });
  },

  async getInterviewBrief(candidateId: string) {
    return fetchJson(`/interviews/brief/${candidateId}`);
  },

  // Decision Intelligence
  async getDecisionIntelligence(candidateId: string) {
    return fetchJson(`/decisions/candidate/${candidateId}`);
  },

  async recordOverride(candidateId: string, action: string, reason: string, recruiterName = 'Recruiter') {
    return fetchJson('/decisions/override', {
      method: 'POST',
      body: JSON.stringify({ candidateId, action, reason, recruiterName })
    });
  },

  // Evidence
  async checkEvidenceConsistency(candidateId: string) {
    return fetchJson(`/evidence/consistency/${candidateId}`);
  },

  // Audit Logs
  async getAuditLogs(): Promise<AuditLogEntry[] | null> {
    return fetchJson<AuditLogEntry[]>('/audit-logs');
  },

  async recordAuditLog(log: AuditLogEntry): Promise<AuditLogEntry | null> {
    return fetchJson<AuditLogEntry>('/audit-logs', {
      method: 'POST',
      body: JSON.stringify(log)
    });
  },

  // Notifications
  async getNotifications(): Promise<AppNotification[] | null> {
    return fetchJson<AppNotification[]>('/notifications');
  },

  async createNotification(notif: Omit<AppNotification, 'id'>): Promise<AppNotification | null> {
    return fetchJson<AppNotification>('/notifications', {
      method: 'POST',
      body: JSON.stringify(notif)
    });
  },

  async markNotificationRead(id: string) {
    return fetchJson(`/notifications/${id}/read`, { method: 'PATCH' });
  },

  async markAllNotificationsRead() {
    return fetchJson('/notifications/read-all', { method: 'PATCH' });
  },

  // AI Copilot
  async askCopilot(prompt: string, candidateId?: string, jobId?: string) {
    return fetchJson<{ response: string; suggestions: string[]; rationale: string }>('/ai/copilot', {
      method: 'POST',
      body: JSON.stringify({ prompt, candidateId, jobId })
    });
  }
};

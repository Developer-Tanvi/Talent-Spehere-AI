import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Sidebar } from './components/Sidebar';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { CandidateRanking } from './components/CandidateRanking';
import { CandidateProfile } from './components/CandidateProfile';
import { CandidateComparison } from './components/CandidateComparison';
import { DecisionIntelligence } from './components/DecisionIntelligence';
import { EvidenceDashboard } from './components/EvidenceDashboard';
import { AssessmentBuilder } from './components/AssessmentBuilder';
import { InterviewBrief } from './components/InterviewBrief';
import { PipelineKanban } from './components/PipelineKanban';
import { AnalyticsInsights } from './components/AnalyticsInsights';
import { AuditLog } from './components/AuditLog';
import { CandidatePortal } from './components/CandidatePortal';
import { AssessmentIDE } from './components/AssessmentIDE';
import { CreateJobModal } from './components/CreateJobModal';
import { ScheduleInterviewModal } from './components/ScheduleInterviewModal';
import { OverrideModal } from './components/OverrideModal';
import { LandingPage } from './components/LandingPage';
import { SignInModal } from './components/SignInModal';
import { JobsList } from './components/JobsList';
import { CandidateSourcing } from './components/CandidateSourcing';
import { WeightsModal } from './components/WeightsModal';
import { AICopilotDrawer } from './components/AICopilotDrawer';
import { AppNotification } from './components/NotificationsDropdown';

import { 
  mockJobs, 
  mockCandidates, 
  mockQuestions, 
  mockAuditLogs 
} from './data/mockData';

import { 
  Candidate, 
  JobRequisition, 
  AssessmentQuestion, 
  AuditLogEntry, 
  ActiveTab, 
  UserRole,
  CandidateStatus
} from './types';

const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Elena Rodriguez submitted OA',
    message: 'Scored 88% on Senior Java Backend OA with 99% proctor trust score.',
    timestamp: '10m ago',
    type: 'oa_completed',
    read: false,
    targetTab: 'profile',
    candidateId: 'cand-1'
  },
  {
    id: 'notif-2',
    title: 'Candidate Ranking Updated',
    message: 'AI decision engine synthesized GitHub evidence for 4 new applicants.',
    timestamp: '1h ago',
    type: 'new_ranking',
    read: false,
    targetTab: 'candidates'
  },
  {
    id: 'notif-3',
    title: 'Verification Flag on Docker Skills',
    message: 'Marcus Johnson has moderate GitHub project proof for Kubernetes cluster administration.',
    timestamp: '3h ago',
    type: 'skill_verification',
    read: true,
    targetTab: 'evidence',
    candidateId: 'cand-2'
  }
];

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('recruiter');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  
  // Data State
  const [jobs, setJobs] = useState<JobRequisition[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<JobRequisition>(mockJobs[0]);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(mockCandidates[0]);
  const [candidateA, setCandidateA] = useState<Candidate>(mockCandidates[0]);
  const [candidateB, setCandidateB] = useState<Candidate>(mockCandidates[1]);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(mockQuestions);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  // Modals state
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [candidateToSchedule, setCandidateToSchedule] = useState<Candidate | null>(null);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [candidateToOverride, setCandidateToOverride] = useState<Candidate | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add Notification Helper
  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Role switch handler
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'candidate') {
      setActiveTab('candidate_portal');
      showToast('Switched to Candidate Experience (Elena Rodriguez)');
    } else {
      if (activeTab === 'candidate_portal' || activeTab === 'assessment_ide') {
        setActiveTab('overview');
      }
      showToast('Switched to Recruiter Command Center (Sarah Jenkins)');
    }
  };

  // Demo Sign In Handler
  const handleSignInSuccess = (role: UserRole, email: string) => {
    setCurrentRole(role);
    if (role === 'candidate') {
      setActiveTab('candidate_portal');
      showToast(`Signed in as candidate (${email})`);
    } else {
      setActiveTab('overview');
      showToast(`Signed in as recruiter (${email})`);
    }
  };

  // Create Job
  const handleJobCreated = (newJob: JobRequisition) => {
    setJobs(prev => [newJob, ...prev]);
    setSelectedJob(newJob);
    showToast(`New Job Requisition ${newJob.reqCode}: "${newJob.title}" launched!`);
    addNotification({
      title: `Requisition Created: ${newJob.reqCode}`,
      message: `${newJob.title} created with ${newJob.requiredSkills.length} target skills.`,
      type: 'new_ranking',
      targetTab: 'jobs'
    });
  };

  // Save Weights
  const handleSaveWeights = (weights: JobRequisition['weights']) => {
    setSelectedJob(prev => ({ ...prev, weights }));
    setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, weights } : j));
    showToast('AI scoring weights updated and candidate ranking recalculated!');
    addNotification({
      title: 'Scoring Weights Recalibrated',
      message: `Adjusted weights for ${selectedJob.reqCode}. Skills: ${weights.skills}%, OA: ${weights.oaScore}%.`,
      type: 'new_ranking',
      targetTab: 'candidates'
    });
  };

  // Candidate Added
  const handleCandidateAdded = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
    setSelectedCandidate(newCand);
    showToast(`Candidate "${newCand.name}" added to pipeline!`);
    addNotification({
      title: `New Candidate Ingested: ${newCand.name}`,
      message: `${newCand.title} applied with ${newCand.fitScore}% initial AI Fit Score.`,
      type: 'new_ranking',
      targetTab: 'profile',
      candidateId: newCand.id
    });
  };

  // Change Candidate Status
  const handleMoveCandidateStage = (candidateId: string, newStatus: CandidateStatus) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
    showToast(`Candidate stage updated to ${newStatus.replace('_', ' ')}!`);
  };

  // Open Schedule Modal
  const handleOpenScheduleModal = (candidate: Candidate) => {
    setCandidateToSchedule(candidate);
    setIsScheduleModalOpen(true);
  };

  // Confirm Schedule
  const handleScheduled = (candidate: Candidate, date: string, type: string) => {
    handleMoveCandidateStage(candidate.id, 'interview_scheduled');
    
    // Add to audit log
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      aiRecommendation: candidate.recommendation,
      aiFitScore: candidate.fitScore,
      recruiterAction: 'Interview Scheduled',
      recruiterName: 'Sarah Jenkins',
      isOverride: false,
      notes: `Scheduled ${type} for ${date} with panel.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showToast(`Interview invitation sent to ${candidate.name} for ${date}!`);

    addNotification({
      title: `Interview Scheduled: ${candidate.name}`,
      message: `${type} confirmed for ${date}.`,
      type: 'interview_scheduled',
      targetTab: 'pipeline',
      candidateId: candidate.id
    });
  };

  // Open Override Modal
  const handleOpenOverrideModal = (candidate: Candidate) => {
    setCandidateToOverride(candidate);
    setIsOverrideModalOpen(true);
  };

  // Confirm Override
  const handleOverrideConfirmed = (candidate: Candidate, newAction: string, reason: string) => {
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      aiRecommendation: candidate.recommendation,
      aiFitScore: candidate.fitScore,
      recruiterAction: newAction,
      recruiterName: 'Sarah Jenkins',
      isOverride: true,
      notes: reason
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showToast(`Human override recorded in audit log: ${newAction}`);

    addNotification({
      title: `Human Decision Override: ${candidate.name}`,
      message: `Action changed to "${newAction}". Reason: ${reason}`,
      type: 'skill_verification',
      targetTab: 'audit',
      candidateId: candidate.id
    });
  };

  // Record Quick Recruiter Decision
  const handleRecordDecision = (candidate: Candidate, action: string) => {
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      aiRecommendation: candidate.recommendation,
      aiFitScore: candidate.fitScore,
      recruiterAction: action,
      recruiterName: 'Sarah Jenkins',
      isOverride: false,
      notes: `Decision processed via quick action bar.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showToast(`Decision recorded: ${action} for ${candidate.name}`);
  };

  // Candidate Online Assessment Completion
  const handleSubmitAssessment = (score: number) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === 'cand-1') {
        return {
          ...c,
          status: 'oa_completed',
          oaResult: {
            assessmentId: 'oa-01',
            title: 'Senior Java Backend OA',
            totalScore: score,
            completedAt: 'Just now',
            timeSpentMinutes: 44,
            sections: [
              { name: 'Algorithmic Concurrency', score: 100, maxScore: 100 },
              { name: 'Code Architecture & SOLID', score: 96, maxScore: 100 },
              { name: 'System Scalability', score: 88, maxScore: 100 }
            ],
            codeQualityScore: 94,
            algorithmicScore: 98,
            systemDesignScore: 88,
            proctorTrustScore: 99,
            plagiarismIndex: 2
          }
        };
      }
      return c;
    }));
    showToast(`Assessment submitted with score ${score}%! Recruiter dashboard updated.`);
    addNotification({
      title: 'Elena Rodriguez finished OA Exam',
      message: `Scored ${score}% with 99% proctor trust score. Ready for recruiter review.`,
      type: 'oa_completed',
      targetTab: 'profile',
      candidateId: 'cand-1'
    });
  };

  // Candidate applies to a job opening
  const handleCandidateApplyJob = (job: JobRequisition, resumeData: { fileName: string; coverNote?: string }) => {
    // Increment applicant count on job
    setJobs(prev => prev.map(j => j.id === job.id ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));
    
    // Add audit log
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: 'Just now',
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.name,
      candidateAvatar: selectedCandidate.avatar,
      jobId: job.id,
      jobTitle: job.title,
      aiRecommendation: 'PROCEED',
      aiFitScore: selectedCandidate.fitScore || 94,
      recruiterAction: 'Application Submitted',
      recruiterName: 'Candidate Self-Service',
      isOverride: false,
      notes: `Applied with resume: ${resumeData.fileName}. Automated ATS parse completed.`
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Add notification to recruiter
    addNotification({
      title: `New Application: ${selectedCandidate.name}`,
      message: `Applied for ${job.title} (${job.reqCode}) with resume ${resumeData.fileName}.`,
      type: 'skill_verification',
      targetTab: 'pipeline',
      candidateId: selectedCandidate.id
    });

    showToast(`Application for ${job.title} submitted with resume ${resumeData.fileName}!`);
  };

  // Candidate updates profile
  const handleCandidateUpdateProfile = (updated: Candidate) => {
    setSelectedCandidate(updated);
    setCandidates(prev => prev.map(c => c.id === updated.id ? updated : c));
    showToast('Candidate profile updated successfully!');
  };

  // Notification Click Handler
  const handleNotificationClick = (notif: AppNotification) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    if (notif.candidateId) {
      const found = candidates.find(c => c.id === notif.candidateId);
      if (found) setSelectedCandidate(found);
    }
    setActiveTab(notif.targetTab);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // Render Landing Page if activeTab === 'landing'
  if (activeTab === 'landing') {
    return (
      <LandingPage
        onEnterRole={(role) => {
          handleRoleChange(role);
        }}
        onOpenSignIn={() => setIsSignInModalOpen(true)}
        onExploreDemo={() => {
          handleRoleChange('recruiter');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 rounded-xl border border-emerald-500/40 bg-slate-900/95 p-3.5 shadow-2xl text-xs font-semibold text-emerald-300 flex items-center space-x-2 backdrop-blur-md animate-in slide-in-from-top">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Top Navigation */}
      <Navigation
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        selectedJob={selectedJob}
        jobs={jobs}
        onSelectJob={setSelectedJob}
        onOpenCreateJob={() => setIsCreateJobOpen(true)}
        onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
        isCopilotOpen={isCopilotOpen}
        onOpenSignIn={() => setIsSignInModalOpen(true)}
        onOpenWeightsModal={() => setIsWeightsModalOpen(true)}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
      />

      {/* Main Body with Sidebar + Active View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar (hidden when in Candidate mode or full-screen Exam IDE) */}
        {currentRole === 'recruiter' && activeTab !== 'assessment_ide' && (
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            currentRole={currentRole}
            candidatesCount={candidates.length}
            activeJob={selectedJob}
            onOpenWeightsModal={() => setIsWeightsModalOpen(true)}
            onSignOut={() => setActiveTab('landing')}
          />
        )}

        {/* Dynamic Main Workspace Container */}
        <main className={`flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 ${activeTab === 'assessment_ide' ? 'p-3' : ''}`}>
          
          {/* Recruiter Dashboard Overview */}
          {activeTab === 'overview' && (
            <RecruiterDashboard
              selectedJob={selectedJob}
              jobs={jobs}
              candidates={candidates}
              onSelectCandidate={(c) => {
                setSelectedCandidate(c);
                setActiveTab('profile');
              }}
              onSelectTab={setActiveTab}
              onOpenCreateJob={() => setIsCreateJobOpen(true)}
              onOpenWeightsModal={() => setIsWeightsModalOpen(true)}
            />
          )}

          {/* Jobs & Requisitions Section */}
          {activeTab === 'jobs' && (
            <JobsList
              jobs={jobs}
              selectedJob={selectedJob}
              onSelectJob={setSelectedJob}
              onSelectTab={setActiveTab}
              onOpenCreateJob={() => setIsCreateJobOpen(true)}
              onOpenWeightsModal={() => setIsWeightsModalOpen(true)}
            />
          )}

          {/* Candidate Sourcing & Intake Hub */}
          {activeTab === 'sourcing' && (
            <CandidateSourcing
              selectedJob={selectedJob}
              candidates={candidates}
              onCandidateAdded={handleCandidateAdded}
              onSelectCandidate={(c) => {
                setSelectedCandidate(c);
                setActiveTab('profile');
              }}
              onSelectTab={setActiveTab}
            />
          )}

          {/* Candidate Ranking & Table View */}
          {activeTab === 'candidates' && (
            <CandidateRanking
              candidates={candidates}
              selectedJob={selectedJob}
              onSelectCandidate={(c) => {
                setSelectedCandidate(c);
                setActiveTab('profile');
              }}
              onSelectTab={setActiveTab}
              onOpenWeightsModal={() => setIsWeightsModalOpen(true)}
              onOpenScheduleModal={handleOpenScheduleModal}
              onStartComparison={(cA, cB) => {
                setCandidateA(cA);
                setCandidateB(cB);
                setActiveTab('comparison');
              }}
            />
          )}

          {/* Detailed Candidate Dossier */}
          {activeTab === 'profile' && (
            <CandidateProfile
              candidate={selectedCandidate}
              onSelectTab={setActiveTab}
              onOpenScheduleModal={handleOpenScheduleModal}
              onOpenOverrideModal={handleOpenOverrideModal}
            />
          )}

          {/* Head-to-Head Candidate Comparison Matrix */}
          {activeTab === 'comparison' && (
            <CandidateComparison
              candidates={candidates}
              candidateA={candidateA}
              candidateB={candidateB}
              onSelectCandidateA={setCandidateA}
              onSelectCandidateB={setCandidateB}
              onSelectTab={setActiveTab}
              onOpenScheduleModal={handleOpenScheduleModal}
              onRecordDecision={handleRecordDecision}
            />
          )}

          {/* Decision Intelligence Hub */}
          {activeTab === 'decisions' && (
            <DecisionIntelligence
              candidate={selectedCandidate}
              onSelectTab={setActiveTab}
              onOpenScheduleModal={handleOpenScheduleModal}
              onOpenOverrideModal={handleOpenOverrideModal}
              onRecordDecision={handleRecordDecision}
            />
          )}

          {/* Evidence Analysis Dashboard */}
          {activeTab === 'evidence' && (
            <EvidenceDashboard
              candidate={selectedCandidate}
              onSelectTab={setActiveTab}
            />
          )}

          {/* Technical Assessment Builder */}
          {activeTab === 'assessments' && (
            <AssessmentBuilder
              questions={questions}
              selectedJob={selectedJob}
              onSelectTab={setActiveTab}
              onOpenTestSimulator={() => {
                setCurrentRole('candidate');
                setActiveTab('assessment_ide');
              }}
            />
          )}

          {/* Interview Question Brief & Rubric Guide */}
          {activeTab === 'interview_brief' && (
            <InterviewBrief
              candidate={selectedCandidate}
              onSelectTab={setActiveTab}
              onOpenScheduleModal={handleOpenScheduleModal}
            />
          )}

          {/* Pipeline Kanban Board */}
          {activeTab === 'pipeline' && (
            <PipelineKanban
              candidates={candidates}
              selectedJob={selectedJob}
              onSelectCandidate={(c) => {
                setSelectedCandidate(c);
                setActiveTab('profile');
              }}
              onSelectTab={setActiveTab}
              onMoveCandidateStage={handleMoveCandidateStage}
              onOpenScheduleModal={handleOpenScheduleModal}
            />
          )}

          {/* Analytics & Funnel Insights */}
          {activeTab === 'analytics' && (
            <AnalyticsInsights
              onSelectTab={setActiveTab}
            />
          )}

          {/* Immutable Decision Audit Log */}
          {activeTab === 'audit' && (
            <AuditLog
              auditLogs={auditLogs}
              onSelectTab={setActiveTab}
            />
          )}

          {/* Candidate Portal View */}
          {activeTab === 'candidate_portal' && (
            <CandidatePortal
              candidate={selectedCandidate}
              jobs={jobs}
              onSelectTab={setActiveTab}
              onStartAssessment={() => setActiveTab('assessment_ide')}
              onUpdateProfile={handleCandidateUpdateProfile}
              onApplyJob={handleCandidateApplyJob}
            />
          )}

          {/* Interactive Candidate Online Assessment Exam IDE */}
          {activeTab === 'assessment_ide' && (
            <AssessmentIDE
              questions={questions}
              onSelectTab={setActiveTab}
              onSubmitAssessment={handleSubmitAssessment}
            />
          )}

        </main>
      </div>

      {/* AI Copilot Drawer */}
      <AICopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        selectedJob={selectedJob}
        candidates={candidates}
        onSelectCandidate={(c) => setSelectedCandidate(c)}
        onSelectTab={setActiveTab}
      />

      {/* Sign In / Demo Auth Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignInSuccess={handleSignInSuccess}
      />

      {/* AI Scoring Weights Calibration Modal */}
      <WeightsModal
        isOpen={isWeightsModalOpen}
        onClose={() => setIsWeightsModalOpen(false)}
        selectedJob={selectedJob}
        onSaveWeights={handleSaveWeights}
      />

      {/* Create Job Requisition Modal */}
      <CreateJobModal
        isOpen={isCreateJobOpen}
        onClose={() => setIsCreateJobOpen(false)}
        onJobCreated={handleJobCreated}
      />

      {/* Schedule Interview Modal */}
      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        candidate={candidateToSchedule}
        onClose={() => setIsScheduleModalOpen(false)}
        onScheduled={handleScheduled}
      />

      {/* Human Override Modal */}
      <OverrideModal
        isOpen={isOverrideModalOpen}
        candidate={candidateToOverride}
        onClose={() => setIsOverrideModalOpen(false)}
        onOverrideConfirmed={handleOverrideConfirmed}
      />

    </div>
  );
}

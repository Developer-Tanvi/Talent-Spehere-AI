import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Play, 
  FileCode2, 
  ShieldCheck, 
  AlertCircle, 
  ExternalLink,
  Github,
  Linkedin,
  Award,
  ChevronRight,
  Briefcase,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Plus,
  Edit3,
  Trash2,
  FileText,
  Upload,
  Globe,
  Code2,
  Check,
  Building2,
  Layers,
  User,
  Zap,
  Mail,
  Phone,
  Calendar,
  BookOpen
} from 'lucide-react';
import { 
  Candidate, 
  JobRequisition, 
  ActiveTab, 
  ProfessionalProfile, 
  CandidateApplication,
  ExperienceItem,
  ProjectItem,
  VerifiedSkill
} from '../types';
import { JobRequirementsModal } from './JobRequirementsModal';
import { JobApplicationModal } from './JobApplicationModal';
import { AddProfessionalProfileModal } from './AddProfessionalProfileModal';
import { EditCandidateProfileModal } from './EditCandidateProfileModal';

interface CandidatePortalProps {
  candidate: Candidate;
  jobs: JobRequisition[];
  onSelectTab: (tab: ActiveTab) => void;
  onStartAssessment: () => void;
  onUpdateProfile?: (updated: Candidate) => void;
  onApplyJob?: (job: JobRequisition, resumeData: { fileName: string; coverNote?: string }) => void;
}

export const CandidatePortal: React.FC<CandidatePortalProps> = ({
  candidate,
  jobs,
  onSelectTab,
  onStartAssessment,
  onUpdateProfile,
  onApplyJob
}) => {
  // Sub-navigation view inside candidate section
  const [candidateSubTab, setCandidateSubTab] = useState<'openings' | 'applications' | 'profile' | 'evidence'>('openings');
  
  // Job Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobRequisition | null>(null);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState<JobRequisition | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);

  // Local candidate state with fallback applications
  const [localCandidate, setLocalCandidate] = useState<Candidate>(() => {
    return {
      ...candidate,
      professionalProfiles: candidate.professionalProfiles || [
        {
          id: 'prof-1',
          platform: 'GitHub',
          handle: 'elenarodriguez',
          url: 'https://github.com/elenarodriguez',
          verified: true,
          connectedAt: 'Oct 22, 2026',
          stats: '24 repos · 615 stars · 842 commits (top 2%)',
          badge: 'Top 2% Open Source Contributor'
        },
        {
          id: 'prof-2',
          platform: 'LinkedIn',
          handle: 'elena-rodriguez-dev',
          url: 'https://linkedin.com/in/elena-rodriguez-dev',
          verified: true,
          connectedAt: 'Oct 22, 2026',
          stats: '500+ connections · 18 skill endorsements',
          badge: 'Verified Identity & Work History'
        },
        {
          id: 'prof-3',
          platform: 'LeetCode',
          handle: 'elena_algo',
          url: 'https://leetcode.com/elena_algo',
          verified: true,
          connectedAt: 'Oct 23, 2026',
          stats: 'Rating 2,145 (Guardian Tier) · 640 solved (190 Hard)',
          badge: 'Guardian Tier (Top 1.5%)'
        },
        {
          id: 'prof-4',
          platform: 'Portfolio',
          handle: 'elena-tech.io',
          url: 'https://elena-tech.io',
          verified: true,
          connectedAt: 'Oct 23, 2026',
          stats: 'Live architecture case studies & tech blog',
          badge: 'Verified Domain'
        }
      ],
      applications: candidate.applications || [
        {
          id: 'app-01',
          jobId: 'job-1042',
          jobTitle: 'Senior Java Developer',
          reqCode: 'REQ-1042',
          department: 'Backend Engineering',
          companyName: 'TalentSphere Systems Inc.',
          appliedDate: 'Oct 22, 2026',
          status: candidate.status || 'oa_completed',
          fitScore: candidate.fitScore || 94,
          resumeFileName: candidate.resumeFileName || 'Elena_Rodriguez_Senior_Backend_Engineer.pdf',
          coverNote: 'Excited about the high-throughput architecture challenges. My recent work at FinTech Velocity Labs matches the Kafka and Spring Boot requirements directly.',
          oaRequired: true,
          oaCompleted: candidate.status === 'oa_completed',
          oaScore: candidate.oaResult?.totalScore || 88,
          stageProgress: [
            { stage: 'Application Submitted', completed: true, current: false, date: 'Oct 22, 2026' },
            { stage: 'AI Fit & ATS Screening', completed: true, current: false, date: 'Oct 23, 2026' },
            { stage: 'Online Coding Assessment (OA)', completed: candidate.status === 'oa_completed', current: candidate.status === 'oa_pending', date: 'Oct 24, 2026' },
            { stage: 'Technical Panel Interview', completed: false, current: candidate.status === 'oa_completed', date: 'Estimated Nov 02, 2026' },
            { stage: 'Final Hiring Decision', completed: false, current: false, date: 'Pending' }
          ]
        }
      ]
    };
  });

  // Departments list for filters
  const departments = ['All', ...Array.from(new Set(jobs.map(j => j.department)))];

  // Filtered Job Openings
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesType = selectedType === 'All' || job.type === selectedType;

    return matchesSearch && matchesDept && matchesType;
  });

  // Calculate matching score for a job
  const getJobMatchScore = (job: JobRequisition) => {
    const candidateSkills = [
      ...localCandidate.topMatchedSkills,
      ...localCandidate.verifiedSkills.map(s => s.name)
    ].map(s => s.toLowerCase());

    const matched = job.requiredSkills.filter(req => 
      candidateSkills.some(cs => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs))
    );

    const baseScore = Math.round((matched.length / Math.max(1, job.requiredSkills.length)) * 75);
    const expBonus = localCandidate.experienceYears >= job.minExperienceYears ? 18 : 8;
    return Math.min(99, Math.max(65, baseScore + expBonus));
  };

  // Check if candidate already applied to a job
  const hasAppliedToJob = (jobId: string) => {
    return localCandidate.applications?.some(app => app.jobId === jobId) || false;
  };

  // Handle new application submit
  const handleApplicationSubmit = (
    job: JobRequisition, 
    appData: {
      resumeFileName: string;
      coverNote: string;
      preferredStartDate: string;
      salaryExpectation: string;
      customSkills: string[];
    }
  ) => {
    const newApp: CandidateApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      reqCode: job.reqCode,
      department: job.department,
      companyName: 'TalentSphere Systems Inc.',
      appliedDate: 'Just now',
      status: 'oa_pending',
      fitScore: getJobMatchScore(job),
      resumeFileName: appData.resumeFileName,
      coverNote: appData.coverNote,
      oaRequired: true,
      oaCompleted: false,
      stageProgress: [
        { stage: 'Application Submitted', completed: true, current: false, date: 'Just now' },
        { stage: 'AI Fit & ATS Screening', completed: true, current: false, date: 'Just now' },
        { stage: 'Online Coding Assessment (OA)', completed: false, current: true, date: 'Action Required' },
        { stage: 'Technical Panel Interview', completed: false, current: false, date: 'Upcoming' },
        { stage: 'Final Hiring Decision', completed: false, current: false, date: 'Pending' }
      ]
    };

    const updated = {
      ...localCandidate,
      applications: [newApp, ...(localCandidate.applications || [])]
    };

    setLocalCandidate(updated);
    if (onUpdateProfile) onUpdateProfile(updated);
    if (onApplyJob) onApplyJob(job, { fileName: appData.resumeFileName, coverNote: appData.coverNote });

    // Switch to applications view to show the newly submitted application
    setCandidateSubTab('applications');
  };

  // Handle adding a new professional profile
  const handleAddProfessionalProfile = (newProfile: ProfessionalProfile) => {
    const updatedProfiles = [...(localCandidate.professionalProfiles || []), newProfile];
    const updated = {
      ...localCandidate,
      professionalProfiles: updatedProfiles
    };
    setLocalCandidate(updated);
    if (onUpdateProfile) onUpdateProfile(updated);
  };

  // Handle saving general profile edits
  const handleSaveProfile = (updatedCandidate: Candidate) => {
    const merged = {
      ...localCandidate,
      ...updatedCandidate,
      professionalProfiles: localCandidate.professionalProfiles,
      applications: localCandidate.applications
    };
    setLocalCandidate(merged);
    if (onUpdateProfile) onUpdateProfile(merged);
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto animate-in fade-in duration-150">
      
      {/* Candidate Top Header & Snapshot */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-indigo-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={localCandidate.avatar} 
                alt={localCandidate.name} 
                className="h-16 w-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-950">
                ✓
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {localCandidate.name}
                </h1>
                <span className="rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 border border-emerald-500/30">
                  Open for Opportunities
                </span>
                <span className="rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 border border-indigo-500/30">
                  Candidate Hub
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{localCandidate.title}</span>
                <span>·</span>
                <span className="text-slate-400">{localCandidate.currentCompany}</span>
                <span>·</span>
                <span className="text-slate-400">{localCandidate.location}</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">{localCandidate.experienceYears} Years Exp</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics & Edit Profile Button */}
          <div className="flex items-center space-x-3 self-start md:self-auto">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition shadow-sm"
            >
              <Edit3 className="h-3.5 w-3.5 text-indigo-400" />
              <span>Edit Profile</span>
            </button>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3.5 py-1.5 flex items-center space-x-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-400">Profile Readiness</div>
                <div className="text-lg font-black text-emerald-400 font-mono">96%</div>
              </div>
              <Award className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Candidate Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setCandidateSubTab('openings')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              candidateSubTab === 'openings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Job Openings & Requirements</span>
            <span className="ml-1 rounded-full bg-emerald-950 px-1.5 py-0.2 text-[10px] text-emerald-300 font-mono">
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setCandidateSubTab('applications')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              candidateSubTab === 'applications'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            <span>My Applications & Progress</span>
            <span className="ml-1 rounded-full bg-indigo-950 px-1.5 py-0.2 text-[10px] text-indigo-300 font-mono">
              {localCandidate.applications?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setCandidateSubTab('profile')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              candidateSubTab === 'profile'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>My Profile & Resume</span>
          </button>

          <button
            onClick={() => setCandidateSubTab('evidence')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              candidateSubTab === 'evidence'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Professional Profiles & Evidence</span>
            <span className="ml-1 rounded-full bg-amber-950 px-1.5 py-0.2 text-[10px] text-amber-300 font-mono">
              {localCandidate.professionalProfiles?.length || 0}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: JOB OPENINGS & REQUIREMENTS                                        */}
      {/* ========================================================================= */}
      {candidateSubTab === 'openings' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Search & Filter Bar */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search job title, skills, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                <Filter className="h-3.5 w-3.5" />
                <span>Department:</span>
              </div>
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                    selectedDepartment === dept 
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold' 
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Openings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredJobs.map(job => {
              const matchScore = getJobMatchScore(job);
              const applied = hasAppliedToJob(job.id);

              return (
                <div 
                  key={job.id} 
                  className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 relative group"
                >
                  {/* Job Card Top */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-mono text-indigo-400 font-bold">
                            {job.reqCode}
                          </span>
                          <span className="rounded bg-slate-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 border border-slate-700">
                            {job.type}
                          </span>
                          <span className="rounded bg-purple-950/40 text-purple-300 text-[10px] font-semibold px-2 py-0.5 border border-purple-800/40">
                            {job.seniority}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white tracking-tight mt-1 group-hover:text-emerald-400 transition">
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center space-x-3 mt-1">
                          <span className="flex items-center space-x-1 text-slate-300">
                            <Building2 className="h-3 w-3 text-indigo-400" />
                            <span>{job.department}</span>
                          </span>
                          <span>·</span>
                          <span className="flex items-center space-x-1 text-slate-300">
                            <MapPin className="h-3 w-3 text-rose-400" />
                            <span>{job.location}</span>
                          </span>
                        </p>
                      </div>

                      {/* AI Match Badge */}
                      <div className="text-right shrink-0">
                        <div className="inline-flex items-center space-x-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 text-xs font-bold text-emerald-400 font-mono">
                          <Sparkles className="h-3 w-3" />
                          <span>{matchScore}% Match</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                          {job.salaryRange}
                        </div>
                      </div>
                    </div>

                    {/* Brief description */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Required Skills Badges with match indicator */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Required Core Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {job.requiredSkills.map((skill, idx) => {
                          const candidateSkillsLower = [
                            ...localCandidate.topMatchedSkills,
                            ...localCandidate.verifiedSkills.map(s => s.name)
                          ].map(s => s.toLowerCase());

                          const isMatched = candidateSkillsLower.some(cs => 
                            cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs)
                          );

                          return (
                            <span 
                              key={idx}
                              className={`inline-flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded-md border ${
                                isMatched 
                                  ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300 font-medium' 
                                  : 'border-slate-800 bg-slate-900 text-slate-400'
                              }`}
                            >
                              {isMatched && <Check className="h-3 w-3 text-emerald-400" />}
                              <span>{skill}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedJobForDetails(job)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1 transition"
                    >
                      <span>View Job Requirements</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    {applied ? (
                      <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-xs bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Applied</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedJobForApplication(job)}
                        className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-1.5 text-xs font-bold text-white hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/20 transition"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Apply with Resume</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <div className="glass-panel rounded-2xl p-12 text-center space-y-3 border border-slate-800">
              <Briefcase className="h-10 w-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No job openings found</h3>
              <p className="text-xs text-slate-400">
                Try adjusting your search query or department filters.
              </p>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MY APPLICATIONS & PROGRESS                                         */}
      {/* ========================================================================= */}
      {candidateSubTab === 'applications' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Action Required Callout: Coding Assessment */}
          <div className="glass-panel rounded-2xl p-6 border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-900/80 to-slate-950/90 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-2xl bg-amber-500/20 p-3 text-amber-400 border border-amber-500/30 mt-1 shrink-0">
                  <FileCode2 className="h-6 w-6" />
                </div>
                <div>
                  <span className="rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 border border-amber-500/30 uppercase tracking-wider">
                    Assessment Invitation Active
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                    Technical Online Assessment: {localCandidate.jobTitle}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                    Complete 3 interactive coding challenges testing Distributed Systems, Concurrency, and Algorithms in our live browser IDE.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
                    <span>⏱ Duration: 60 minutes</span>
                    <span>·</span>
                    <span>3 Coding Modules</span>
                    <span>·</span>
                    <span className="text-emerald-400">Java / TypeScript / Python Supported</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onStartAssessment}
                className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-xs font-bold text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition self-start md:self-auto shrink-0"
              >
                <Play className="h-4 w-4 fill-slate-950" />
                <span>Launch Coding IDE</span>
              </button>
            </div>
          </div>

          {/* List of Applications */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Job Applications ({localCandidate.applications?.length || 0})
            </h2>

            {localCandidate.applications?.map(app => (
              <div key={app.id} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
                
                {/* Application Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono font-bold text-indigo-400">{app.reqCode}</span>
                      <span className="text-xs text-slate-400">· Applied {app.appliedDate}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                      {app.jobTitle}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {app.department} · {app.companyName}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">AI Match Score</div>
                      <div className="text-lg font-black text-emerald-400 font-mono">{app.fitScore}%</div>
                    </div>
                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-2 text-xs text-slate-300">
                      <FileText className="h-4 w-4 text-indigo-400 inline mr-1.5" />
                      <span>{app.resumeFileName}</span>
                    </div>
                  </div>
                </div>

                {/* Stage Tracker */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Application Lifecycle Tracker:
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                    {app.stageProgress.map((st, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border space-y-1 ${
                          st.completed 
                            ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300' 
                            : st.current 
                            ? 'border-amber-500/40 bg-amber-950/20 text-amber-300 ring-1 ring-amber-500/30' 
                            : 'border-slate-800 bg-slate-900/50 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono">0{idx + 1}</span>
                          {st.completed && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                          {st.current && <Clock className="h-3.5 w-3.5 text-amber-400 animate-pulse" />}
                        </div>
                        <div className="font-bold text-xs text-white leading-tight">{st.stage}</div>
                        <div className="text-[10px] opacity-80">{st.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cover Note Excerpt if present */}
                {app.coverNote && (
                  <div className="rounded-xl bg-slate-900/50 border border-slate-800/80 p-3 text-xs text-slate-300">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Note to Hiring Manager:
                    </span>
                    <p className="italic text-slate-300 line-clamp-2">"{app.coverNote}"</p>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MY PROFILE & RESUME                                                */}
      {/* ========================================================================= */}
      {candidateSubTab === 'profile' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Profile Overview Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Professional Profile & Summary</h3>
                <p className="text-xs text-slate-400">Manage your verified background, resume, and credentials</p>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md transition self-start sm:self-auto"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit Profile Details</span>
              </button>
            </div>

            {/* Bio / Summary */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Professional Bio & Value Proposition
              </label>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {localCandidate.bio || 'Senior Software Engineer with extensive experience designing resilient microservices, high-throughput message streaming architectures, and distributed systems.'}
              </p>
            </div>

            {/* Quick Contact & Education Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl bg-slate-900/70 p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <Mail className="h-3 w-3 text-indigo-400" />
                  <span>Email Address</span>
                </div>
                <div className="font-semibold text-white mt-1 truncate">{localCandidate.email}</div>
              </div>

              <div className="rounded-xl bg-slate-900/70 p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <Phone className="h-3 w-3 text-indigo-400" />
                  <span>Phone Number</span>
                </div>
                <div className="font-semibold text-white mt-1">{localCandidate.phone}</div>
              </div>

              <div className="rounded-xl bg-slate-900/70 p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-indigo-400" />
                  <span>Location</span>
                </div>
                <div className="font-semibold text-white mt-1">{localCandidate.location}</div>
              </div>

              <div className="rounded-xl bg-slate-900/70 p-3 border border-slate-800">
                <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <GraduationCap className="h-3 w-3 text-indigo-400" />
                  <span>Education</span>
                </div>
                <div className="font-semibold text-white mt-1 truncate">
                  {localCandidate.education.degree}, {localCandidate.education.institution}
                </div>
              </div>
            </div>
          </div>

          {/* Active Resume Document Manager Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Primary Resume Document
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Used by default for 1-click job applications</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center space-x-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>ATS Parse Score 98%</span>
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="rounded-xl bg-indigo-500/20 p-2.5 text-indigo-400 border border-indigo-500/30">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm font-mono">
                    {localCandidate.resumeFileName || 'Elena_Rodriguez_Senior_Backend_Engineer.pdf'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Uploaded: {localCandidate.resumeUploadedAt || 'Oct 22, 2026'} · 245 KB PDF
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Simulating download of ${localCandidate.resumeFileName}`)}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => setIsEditProfileOpen(true)}
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 transition"
                >
                  Upload Updated PDF
                </button>
              </div>
            </div>
          </div>

          {/* Verified Technical Skills Matrix */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Verified Skills Matrix & Evidence Badges
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Evaluated against GitHub repos and test assessments</p>
              </div>
              <span className="text-xs text-emerald-400 font-bold flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1" />
                <span>{localCandidate.verifiedSkills.length} Badges Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {localCandidate.verifiedSkills.map((skill, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-white text-xs flex items-center space-x-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      {skill.level} ({skill.score}%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {skill.evidenceSnippet}
                  </p>
                  <div className="text-[10px] text-indigo-400 font-mono flex items-center space-x-1 pt-1 border-t border-slate-800">
                    <Sparkles className="h-3 w-3" />
                    <span>Source: {skill.evidenceSource}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work History Timeline */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Work Experience Timeline
            </h3>

            <div className="space-y-4">
              {localCandidate.experience.map(exp => (
                <div key={exp.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h4 className="font-bold text-white text-sm">{exp.role}</h4>
                      <div className="text-xs text-indigo-300">{exp.company} · {exp.location}</div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx} className="flex items-start space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                    {exp.skillsUsed.map((sk, skIdx) => (
                      <span key={skIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Engineering Projects */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Featured Technical Projects & Open Source Repos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {localCandidate.projects.map(proj => (
                <div key={proj.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-xs sm:text-sm">{proj.title}</h4>
                      <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
                        Complexity: {proj.complexityScore}/100
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.repoUrl && (
                      <a 
                        href={proj.repoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                      >
                        <Github className="h-3 w-3" />
                        <span>View Repository</span>
                        <ExternalLink className="h-3 w-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PROFESSIONAL PROFILES & EVIDENCE                                   */}
      {/* ========================================================================= */}
      {candidateSubTab === 'evidence' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header with Add Button */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Connected Professional Profiles & Evidence</h3>
              <p className="text-xs text-slate-400">
                Link external developer platforms to automatically verify your coding velocity, contest ratings, and public repositories.
              </p>
            </div>

            <button
              onClick={() => setIsAddProfileOpen(true)}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/20 transition self-start sm:self-auto shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Connect Professional Profile</span>
            </button>
          </div>

          {/* Connected Profiles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localCandidate.professionalProfiles?.map(prof => (
              <div key={prof.id} className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400">
                      {prof.platform === 'GitHub' && <Github className="h-5 w-5" />}
                      {prof.platform === 'LinkedIn' && <Linkedin className="h-5 w-5" />}
                      {prof.platform === 'LeetCode' && <Code2 className="h-5 w-5" />}
                      {prof.platform === 'Portfolio' && <Globe className="h-5 w-5" />}
                      {prof.platform === 'Blog' && <BookOpen className="h-5 w-5" />}
                      {prof.platform === 'StackOverflow' && <Layers className="h-5 w-5" />}
                      {!['GitHub', 'LinkedIn', 'LeetCode', 'Portfolio', 'Blog', 'StackOverflow'].includes(prof.platform) && (
                        <Award className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">{prof.platform}</div>
                      <div className="text-xs text-slate-400 font-mono">@{prof.handle}</div>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 flex items-center space-x-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Verified</span>
                  </span>
                </div>

                {prof.stats && (
                  <div className="rounded-xl bg-slate-900/80 p-3 text-xs text-slate-300 border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">
                      Verified Metric Evidence
                    </div>
                    <div>{prof.stats}</div>
                  </div>
                )}

                {prof.badge && (
                  <div className="flex items-center space-x-1.5 text-xs text-amber-400">
                    <Award className="h-3.5 w-3.5" />
                    <span className="font-semibold">{prof.badge}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-[11px] text-slate-500">Connected {prof.connectedAt}</span>
                  <a 
                    href={prof.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                  >
                    <span>View Public Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Evidence Correlation Insights */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              TalentSphere AI Evidence Synthesis
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Repository Velocity</div>
                <div className="text-xl font-bold text-white font-mono">842 Commits</div>
                <p className="text-[11px] text-emerald-400">Consistent commit frequency in top 2% of Java contributors.</p>
              </div>

              <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Algorithmic Problem Solving</div>
                <div className="text-xl font-bold text-white font-mono">2,145 Elo</div>
                <p className="text-[11px] text-indigo-400">Guardian rank (Top 1.5%) with 190 Hard challenges solved.</p>
              </div>

              <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">Production Reliability</div>
                <div className="text-xl font-bold text-white font-mono">98% Consistency</div>
                <p className="text-[11px] text-purple-400">Verified zero-downtime Kafka ingestion pipelines in production.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS: JOB REQUIREMENTS, APPLICATION, PROFILE EDITOR, ADD PROFILE        */}
      {/* ========================================================================= */}
      
      {/* Job Requirements & Details Modal */}
      <JobRequirementsModal
        isOpen={!!selectedJobForDetails}
        job={selectedJobForDetails}
        candidate={localCandidate}
        hasApplied={selectedJobForDetails ? hasAppliedToJob(selectedJobForDetails.id) : false}
        onClose={() => setSelectedJobForDetails(null)}
        onApply={(job) => {
          setSelectedJobForDetails(null);
          setSelectedJobForApplication(job);
        }}
      />

      {/* Job Application with Resume Upload Modal */}
      <JobApplicationModal
        isOpen={!!selectedJobForApplication}
        job={selectedJobForApplication}
        candidate={localCandidate}
        onClose={() => setSelectedJobForApplication(null)}
        onSubmitApplication={handleApplicationSubmit}
      />

      {/* Edit Candidate Profile Modal */}
      <EditCandidateProfileModal
        isOpen={isEditProfileOpen}
        candidate={localCandidate}
        onClose={() => setIsEditProfileOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      {/* Add Professional Profile Modal */}
      <AddProfessionalProfileModal
        isOpen={isAddProfileOpen}
        onClose={() => setIsAddProfileOpen(false)}
        onAddProfile={handleAddProfessionalProfile}
        existingPlatforms={localCandidate.professionalProfiles?.map(p => p.platform) || []}
      />

    </div>
  );
};

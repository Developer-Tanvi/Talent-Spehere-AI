import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Star, 
  ExternalLink, 
  FileCode2, 
  Code2,
  TrendingUp, 
  AlertCircle, 
  ArrowRight,
  GitBranch,
  Calendar,
  Layers,
  ChevronRight,
  SlidersHorizontal,
  FileCheck2,
  Clock,
  Edit3,
  Award,
  Link2,
  Check,
  Scale,
  Plus,
  Trash2
} from 'lucide-react';
import { Candidate, ActiveTab } from '../types';
import { ConnectEvidenceModal } from './ConnectEvidenceModal';
import { EditCandidateProfileModal } from './EditCandidateProfileModal';

interface CandidateProfileProps {
  candidate: Candidate;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onOpenOverrideModal: (candidate: Candidate) => void;
  onUpdateCandidate?: (updated: Candidate) => void;
}

export const CandidateProfile: React.FC<CandidateProfileProps> = ({
  candidate,
  onSelectTab,
  onOpenScheduleModal,
  onOpenOverrideModal,
  onUpdateCandidate
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'skills' | 'experience' | 'projects' | 'evidence' | 'oa' | 'ai_reasoning' | 'interview'>('overview');
  
  // Interactive state for Evidence modal
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectPlatform, setConnectPlatform] = useState('LeetCode');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Dynamic evidence connection state
  const [evidenceSources, setEvidenceSources] = useState([
    { platform: 'GitHub', status: 'Connected', details: '5 relevant public repositories, 842 commits', icon: Github, color: 'text-white' },
    { platform: 'LinkedIn', status: 'Authorized', details: 'Profile data & endorsement records available', icon: Linkedin, color: 'text-blue-400' },
    { platform: 'LeetCode', status: 'Not Connected', details: 'Algorithmic contest rating verification', icon: Code2, color: 'text-amber-400' },
    { platform: 'CodeChef', status: 'Unavailable', details: 'No public profile declared', icon: Award, color: 'text-slate-500' },
    { platform: 'Portfolio / Live Demos', status: 'Connected', details: 'Verified custom domain & staging links', icon: ExternalLink, color: 'text-emerald-400' },
    { platform: 'Certifications (AWS / Oracle)', status: 'Authorized', details: 'AWS Certified Solutions Architect verified', icon: ShieldCheck, color: 'text-cyan-400' }
  ]);

  // Clickable timeline state
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number | null>(null);

  // Candidate Interview Notes
  const [interviewNotes, setInterviewNotes] = useState<string>('');
  const [noteSaved, setNoteSaved] = useState(false);

  const handleOpenConnect = (platform: string) => {
    setConnectPlatform(platform);
    setIsConnectModalOpen(true);
  };

  const handleEvidenceConnected = (platformName: string, accountHandle: string) => {
    setEvidenceSources(prev => prev.map(source => 
      source.platform === platformName 
        ? { ...source, status: 'Connected', details: `@${accountHandle} - Verified profile & metrics synced` }
        : source
    ));
  };

  const timelineItems = [
    { stage: 'Education', title: `${candidate.education.degree}`, org: candidate.education.institution, year: candidate.education.year, details: `GPA: ${candidate.education.gpa || '3.85'} · Major in Systems Architecture & Distributed Computing.` },
    { stage: 'Employment', title: `${candidate.experience[0]?.role || candidate.title}`, org: candidate.experience[0]?.company || candidate.currentCompany, year: '2023–Present', details: `Led core high-concurrency microservice scaling with Spring Boot & Kafka.` },
    { stage: 'Projects', title: 'Open-Source Distributed Cache', org: 'GitHub', year: '2024', details: '500+ stars on GitHub, implemented lock-free sliding window rate limiter.' },
    { stage: 'Certifications', title: 'AWS Solutions Architect Associate', org: 'Amazon Web Services', year: '2024', details: 'Digital badge verified via Credly token ID: AWS-992014.' },
    { stage: 'Professional Activity', title: 'Conference Speaker / Technical Writer', org: 'JavaTech Journal', year: '2025', details: 'Published deep dive on "High-Throughput Concurrency in Java 21".' },
    { stage: 'Online Assessment', title: 'Technical Coding OA', org: 'TalentSphere IDE', year: 'Oct 2026', details: `Score: ${candidate.oaResult?.totalScore || 88}% · 100% test case pass rate on concurrency challenges.` },
    { stage: 'Technical Interview', title: 'Panel Architecture Round', org: 'Recruitment Team', year: 'Scheduled', details: 'Focusing on Docker orchestration and distributed transaction rollbacks.' }
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Back & Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <button onClick={() => onSelectTab('candidates')} className="hover:text-white transition">Candidates</button>
          <span>/</span>
          <span className="text-indigo-400 font-medium">{candidate.name}</span>
          <span>/</span>
          <span className="text-slate-500">{candidate.jobTitle}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setIsEditProfileOpen(true)}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>
          <button 
            onClick={() => onSelectTab('comparison')}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 transition"
          >
            <span>Compare with others</span>
          </button>
          <button 
            onClick={() => onOpenOverrideModal(candidate)}
            className="flex items-center space-x-1.5 rounded-lg border border-amber-500/30 bg-amber-950/20 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-900/30 transition"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Override AI</span>
          </button>
          <button 
            onClick={() => onOpenScheduleModal(candidate)}
            className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      {/* Candidate Profile Hero Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950/90">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          
          {/* Avatar & Core Bio */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="relative flex-shrink-0">
              <img 
                src={candidate.avatar} 
                alt={candidate.name} 
                className="h-20 w-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-xl"
              />
              <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white ring-2 ring-slate-950 shadow-md">
                ✓
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold text-white tracking-tight">{candidate.name}</h1>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                  Verified Candidate
                </span>
                <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400 border border-indigo-500/20">
                  {candidate.jobTitle}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                <div className="flex items-center space-x-1">
                  <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                  <span>{candidate.title} at <strong className="text-slate-300 font-semibold">{candidate.currentCompany}</strong> ({candidate.experienceYears}y exp)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-500" />
                  <span>{candidate.education.degree}, {candidate.education.institution} ({candidate.education.year})</span>
                </div>
              </div>

              {/* Social & Contact links */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center space-x-1 text-slate-300">
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  <span>{candidate.email}</span>
                </span>
                <span>·</span>
                <span className="flex items-center space-x-1 text-slate-300">
                  <Phone className="h-3.5 w-3.5 text-slate-500" />
                  <span>{candidate.phone}</span>
                </span>
                {candidate.githubMetrics && (
                  <>
                    <span>·</span>
                    <a href={`https://github.com/${candidate.githubMetrics.username}`} target="_blank" rel="noreferrer" className="flex items-center space-x-1 text-indigo-400 hover:underline">
                      <Github className="h-3.5 w-3.5" />
                      <span>github.com/{candidate.githubMetrics.username}</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* AI Score & Confidence Box */}
          <div className="flex items-center gap-3 bg-slate-900/90 rounded-xl p-3.5 border border-slate-800/80 self-start md:self-auto shadow-inner">
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-medium">AI Fit Score</div>
              <div className="text-3xl font-extrabold text-emerald-400 tracking-tight font-mono">{candidate.fitScore}%</div>
              <div className="text-[10px] text-emerald-400/80 font-medium">Rank #1 Applicant</div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800"></div>
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-medium">AI Confidence</div>
              <div className="text-2xl font-bold text-indigo-400 tracking-tight font-mono">{candidate.confidenceScore}%</div>
              <div className="text-[10px] text-indigo-400/80">Multi-source grounded</div>
            </div>
          </div>

        </div>

        {/* AI Recommendation Banner */}
        <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-400 mt-0.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    AI Recommendation: {candidate.recommendation.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400">({candidate.confidenceScore}% confidence)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {candidate.recommendationReason}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab('ai_reasoning')}
              className="flex-shrink-0 text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
            >
              <span>Why is Elena ranked #1?</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="mt-6 flex items-center space-x-1 border-b border-slate-800 overflow-x-auto pb-px">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'skills', label: 'Skills' },
            { id: 'experience', label: 'Experience' },
            { id: 'projects', label: 'Projects' },
            { id: 'evidence', label: 'Evidence & Consistency' },
            { id: 'oa', label: 'Assessment (OA)' },
            { id: 'ai_reasoning', label: 'AI Reasoning' },
            { id: 'interview', label: 'Interview Guide' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition ${
                activeSubTab === tab.id
                  ? 'border-indigo-500 text-indigo-300 bg-indigo-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* 1. OVERVIEW TAB */}
      {activeSubTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {/* Factor Breakdown */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Decision Factor Breakdown
              </h3>
              <div className="space-y-3.5">
                {[
                  { label: 'Core Technical Skills Match', score: candidate.factorBreakdown.coreSkills, weight: '35%' },
                  { label: 'Experience Relevance & Depth', score: candidate.factorBreakdown.experienceRelevance, weight: '25%' },
                  { label: 'Online Assessment (OA) Performance', score: candidate.factorBreakdown.oaPerformance, weight: '25%' },
                  { label: 'Code Quality & GitHub Activity', score: candidate.factorBreakdown.codeQuality, weight: '10%' },
                  { label: 'Profile Consistency & Credential Truth', score: candidate.factorBreakdown.profileConsistency, weight: '5%' }
                ].map((factor, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{factor.label} <span className="text-slate-500 font-normal">({factor.weight} wt)</span></span>
                      <span className="font-bold text-white font-mono">{factor.score}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          factor.score >= 90 ? 'bg-emerald-500' : factor.score >= 80 ? 'bg-indigo-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Skills Matrix */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Verified Skills Matrix
                </h3>
                <button 
                  onClick={() => setActiveSubTab('skills')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View All Skills →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {candidate.verifiedSkills.map((skill, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{skill.name}</span>
                      <span className="text-[10px] font-semibold rounded bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 border border-emerald-500/20">
                        {skill.level} ({skill.score}%)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {skill.evidenceSnippet}
                    </p>
                    <div className="flex items-center space-x-1 text-[10px] text-slate-500 pt-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      <span>Source: {skill.evidenceSource}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: OA Result & Quick Actions */}
          <div className="space-y-6">
            {candidate.oaResult && (
              <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Online Assessment
                  </h3>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {candidate.oaResult.totalScore}% Passed
                  </span>
                </div>
                <div className="rounded-xl bg-slate-900 p-3 space-y-2 text-xs">
                  <div className="font-semibold text-white">{candidate.oaResult.title}</div>
                  <div className="text-[11px] text-slate-400">Completed in {candidate.oaResult.timeSpentMinutes} mins · {candidate.oaResult.completedAt}</div>
                  
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    {candidate.oaResult.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">{sec.name}</span>
                        <span className="text-slate-200 font-mono font-medium">{sec.score}/{sec.maxScore}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveSubTab('oa')}
                    className="w-full mt-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 py-1.5 text-xs text-indigo-300 font-semibold transition"
                  >
                    View Detailed Code Solutions
                  </button>
                </div>
              </div>
            )}

            {/* Identified Skill Gaps */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
                <AlertCircle className="h-3.5 w-3.5 text-amber-400 mr-1.5" />
                <span>Identified Skill Gaps</span>
              </h3>
              <div className="space-y-2">
                {candidate.skillGaps.map((gap, gIdx) => (
                  <div key={gIdx} className="rounded-lg bg-amber-950/20 border border-amber-500/20 p-2.5 text-xs text-amber-200/90 leading-relaxed">
                    • {gap}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 2. SKILLS TAB */}
      {activeSubTab === 'skills' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-1">Multi-Source Skill Evidence</h3>
            <p className="text-xs text-slate-400 mb-6">Skills verified through GitHub repositories, live online coding assessments, and professional deliverables.</p>

            <div className="space-y-4">
              {candidate.verifiedSkills.map((skill, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{skill.name}</span>
                      <span className="rounded bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 font-semibold">
                        {skill.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Proficiency:</span>
                      <span className="text-sm font-bold text-emerald-400 font-mono">{skill.score}%</span>
                      <span className="text-xs text-slate-500">· Source: {skill.evidenceSource}</span>
                    </div>
                  </div>

                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${skill.score >= 90 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                    "{skill.evidenceSnippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. EXPERIENCE TAB */}
      {activeSubTab === 'experience' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">Full Work History & Deliverables</h3>
          <div className="space-y-6">
            {candidate.experience.map((exp) => (
              <div key={exp.id} className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-base font-bold text-white">{exp.role} · <span className="text-indigo-400">{exp.company}</span></h4>
                    <p className="text-xs text-slate-400">{exp.location} · {exp.period}</p>
                  </div>
                  <span className="text-xs rounded-full bg-indigo-500/10 text-indigo-300 px-3 py-1 font-semibold border border-indigo-500/20">
                    Relevance: {exp.relevanceScore}%
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-300">Core Responsibilities:</div>
                  <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                    {exp.description.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/60 space-y-1">
                  <div className="text-xs font-semibold text-emerald-400">Key Deliverables & Business Impact:</div>
                  <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                    {exp.keyDeliverables.map((kd, kdIdx) => (
                      <li key={kdIdx}>{kd}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PROJECTS TAB */}
      {activeSubTab === 'projects' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <h3 className="text-base font-bold text-white mb-4">Highlighted Open-Source & Enterprise Projects</h3>
            <div className="space-y-4">
              {candidate.projects.map((project) => (
                <div key={project.id} className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center">
                        <span>{project.title}</span>
                        {project.repoUrl && (
                          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="ml-2 text-indigo-400 hover:text-indigo-300">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                        <span>★ {project.stars} stars</span>
                        <span>·</span>
                        <span>{project.commits} commits</span>
                        <span>·</span>
                        <span className="text-indigo-400 font-medium">Complexity: {project.complexityScore}/100</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="rounded bg-slate-800 text-slate-300 px-2 py-0.5 text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="rounded-lg bg-slate-950/60 p-3 border border-slate-800/60 space-y-1">
                    <div className="text-[11px] font-semibold text-slate-400">Architectural Highlights:</div>
                    <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                      {project.highlights.map((hl, hIdx) => (
                        <li key={hIdx}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. EVIDENCE & CONSISTENCY TAB */}
      {activeSubTab === 'evidence' && (
        <div className="space-y-6">
          
          {/* Section 8: Professional Evidence Sources */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Connected Professional Evidence Sources</h3>
                <p className="text-xs text-slate-400">External identity integrations, public repositories, and algorithmic platforms.</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 text-xs font-bold">
                Evidence Confidence: 94%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {evidenceSources.map((source, idx) => {
                const IconComponent = source.icon;
                return (
                  <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`h-5 w-5 ${source.color}`} />
                          <span className="font-bold text-white text-xs">{source.platform}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          source.status === 'Connected' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                          source.status === 'Authorized' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                          source.status === 'Not Connected' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                          'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {source.status === 'Connected' ? 'Connected ✓' : source.status === 'Authorized' ? 'Authorized ✓' : source.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {source.details}
                      </p>
                    </div>

                    {source.status === 'Not Connected' ? (
                      <button
                        onClick={() => handleOpenConnect(source.platform)}
                        className="w-full flex items-center justify-center space-x-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 py-1.5 text-xs text-indigo-200 font-semibold transition"
                      >
                        <Link2 className="h-3.5 w-3.5" />
                        <span>Connect {source.platform}</span>
                      </button>
                    ) : (
                      <div className="text-[10px] text-slate-500 flex items-center space-x-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        <span>Grounded in external claims</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 9: Profile Consistency (Resume vs Evidence) */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Profile Consistency Analysis (Resume vs Evidence)</h3>
              <p className="text-xs text-slate-400">Comparing claimed resume skills against verifiable code projects and assessment telemetry.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="py-3 px-4">Skill Claim</th>
                    <th className="py-3 px-4">Resume Claim</th>
                    <th className="py-3 px-4">Verifiable Evidence</th>
                    <th className="py-3 px-4">Consistency Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                  {[
                    { skill: 'Java', resume: '3+ years experience', evidence: 'Multiple production Java repos & 92% OA score', status: 'Consistent' },
                    { skill: 'Spring Boot', resume: '2.5 years experience', evidence: '3 backend microservice projects with REST APIs', status: 'Consistent' },
                    { skill: 'Docker', resume: 'Advanced containerization', evidence: 'Limited container configuration files in public repos', status: 'Needs Verification' },
                    { skill: 'Kubernetes', resume: 'Listed in profile', evidence: 'Unavailable in public projects', status: 'Insufficient Evidence' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition">
                      <td className="py-3 px-4 font-bold text-white">{row.skill}</td>
                      <td className="py-3 px-4 text-slate-300">{row.resume}</td>
                      <td className="py-3 px-4 text-slate-400">{row.evidence}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          row.status === 'Consistent' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          row.status === 'Needs Verification' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {row.status === 'Consistent' && <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-400" />}
                          {row.status === 'Needs Verification' && <AlertCircle className="h-3 w-3 mr-1 text-amber-400" />}
                          <span>{row.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 10: Evidence Timeline */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Interactive Evidence Timeline</h3>
              <p className="text-xs text-slate-400">Click any milestone to inspect verified artifacts and telemetry.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2">
              {timelineItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTimelineIndex(selectedTimelineIndex === idx ? null : idx)}
                  className={`p-3 rounded-xl border text-left transition space-y-1 ${
                    selectedTimelineIndex === idx 
                      ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500/50' 
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-bold font-mono text-indigo-400 uppercase">{item.stage}</div>
                  <div className="text-xs font-bold text-white truncate">{item.title}</div>
                  <div className="text-[10px] text-slate-400">{item.year}</div>
                </button>
              ))}
            </div>

            {selectedTimelineIndex !== null && (
              <div className="rounded-xl bg-slate-900 border border-indigo-500/30 p-4 text-xs space-y-1.5 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300 text-sm">
                    {timelineItems[selectedTimelineIndex].stage}: {timelineItems[selectedTimelineIndex].title}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">{timelineItems[selectedTimelineIndex].year}</span>
                </div>
                <div className="text-slate-400">Organization / Issuer: <strong className="text-slate-200">{timelineItems[selectedTimelineIndex].org}</strong></div>
                <p className="text-slate-300 leading-relaxed pt-1">
                  {timelineItems[selectedTimelineIndex].details}
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 6. OA ASSESSMENT TAB */}
      {activeSubTab === 'oa' && candidate.oaResult && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">{candidate.oaResult.title}</h3>
                <p className="text-xs text-slate-400">Completed on {candidate.oaResult.completedAt} in {candidate.oaResult.timeSpentMinutes} minutes.</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">OA Total Score</div>
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">{candidate.oaResult.totalScore}%</div>
                </div>
                <button
                  onClick={() => onSelectTab('decisions')}
                  className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
                >
                  View Decision Intelligence
                </button>
              </div>
            </div>

            {/* Section Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { name: 'Java Fundamentals', score: 92, max: 100 },
                { name: 'Spring Boot 3', score: 90, max: 100 },
                { name: 'SQL Optimization', score: 76, max: 100 },
                { name: 'Problem Solving', score: 94, max: 100 },
                { name: 'Backend Scenarios', score: 86, max: 100 }
              ].map((sec, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900 p-3.5 space-y-1.5 text-center">
                  <div className="text-[11px] text-slate-400 font-medium">{sec.name}</div>
                  <div className="text-xl font-bold text-white font-mono">{sec.score}%</div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${sec.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths and Areas to Improve */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Demonstrated Strengths</span>
                </div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li>Strong problem solving & lock-free algorithm implementation</li>
                  <li>Strong Java 21 virtual threads and memory management</li>
                  <li>Exceptional Spring Boot architectural dependency wiring</li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Areas to Verify in Interview</span>
                </div>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  <li>Complex SQL multi-table join indexing strategies (scored 76%)</li>
                  <li>Distributed database shard transaction failover mechanisms</li>
                </ul>
              </div>
            </div>

            {/* Proctor Integrity Badge */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Proctor Integrity Score: 100% (Clean Session)</div>
                  <div className="text-[11px] text-slate-400">Zero unauthorized tab switches, external paste anomalies, or browser extensions detected.</div>
                </div>
              </div>
              <span className="rounded bg-emerald-500/20 px-3 py-1 text-emerald-300 font-bold">Verified Authentic</span>
            </div>
          </div>
        </div>
      )}

      {/* 7. AI REASONING TAB */}
      {activeSubTab === 'ai_reasoning' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            
            {/* Disclaimer */}
            <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-3.5 flex items-center justify-between text-xs text-indigo-300">
              <div className="flex items-center space-x-2">
                <Scale className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span><strong>AI Decision Support:</strong> AI provides evidence-based candidate recommendations. The human recruiter retains final hiring authority.</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Why is Elena Rodriguez Ranked #1?</h3>
              <p className="text-xs text-slate-400">Multimodal evaluation synthesizing JD alignment, code repository proof, and coding assessment benchmarks.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Skill Alignment', val: '94%', note: 'Core Java & Spring Boot' },
                { label: 'Experience Relevance', val: '92%', note: '6.5y backend engineering' },
                { label: 'Project Relevance', val: '88%', note: '5 verified open-source repos' },
                { label: 'Evidence Strength', val: 'Strong', note: 'GitHub, OA, LinkedIn verified' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl bg-slate-900 border border-slate-800 p-3.5 space-y-1">
                  <div className="text-xs text-slate-400">{item.label}</div>
                  <div className="text-xl font-bold text-white font-mono">{item.val}</div>
                  <div className="text-[10px] text-slate-500">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-indigo-500/20 bg-slate-900 p-4 space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="font-bold text-indigo-400 uppercase tracking-wider">AI Reasoning Summary:</div>
              <p>
                Candidate demonstrates strong role alignment and practical evidence. Assessment performance (88% OA score) further supports technical suitability for the Senior Java Developer requisition.
              </p>
              <p>
                Elena possesses 6.5 years of verifiable experience in high-throughput JVM environments. Her code repositories show mature test automation, clean architecture, and robust concurrency practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 space-y-2">
                <div className="font-bold text-emerald-400 uppercase tracking-wider">Matched Core Skills:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Java 21', 'Spring Boot 3', 'REST APIs', 'PostgreSQL', 'Docker', 'Microservices', 'Kafka Streams'].map((s, idx) => (
                    <span key={idx} className="rounded bg-emerald-950 border border-emerald-500/30 px-2 py-0.5 text-emerald-300 text-[11px]">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4 space-y-2">
                <div className="font-bold text-amber-400 uppercase tracking-wider">Identified Skill Gaps & Focus:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Kubernetes - Limited Project Evidence', 'SQL Join Index Optimization', 'Distributed 2PC Rollbacks'].map((g, idx) => (
                    <span key={idx} className="rounded bg-amber-950 border border-amber-500/30 px-2 py-0.5 text-amber-300 text-[11px]">
                      • {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 8. INTERVIEW TAB */}
      {activeSubTab === 'interview' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Technical Interview Question Guide & Rubric</h3>
                <p className="text-xs text-slate-400">Questions formulated to verify candidate skill gaps and probe architectural depth.</p>
              </div>
              <button 
                onClick={() => onOpenScheduleModal(candidate)}
                className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Schedule Interview Panel</span>
              </button>
            </div>

            <div className="space-y-4">
              {candidate.interviewFocusAreas.map((area, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{area.topic}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      area.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {area.difficulty} Difficulty
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-xs text-white font-medium leading-relaxed">
                    "{area.suggestedQuestion}"
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <strong className="text-slate-300">Expected Response Rubric:</strong>
                    <p className="text-[11px] leading-relaxed text-slate-400">{area.expectedAnswerRubric}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recruiter Interview Notes Form */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Recruiter Interview Evaluation Notes:</span>
                {noteSaved && <span className="text-emerald-400 font-bold">Notes saved to candidate record ✓</span>}
              </div>
              <textarea
                rows={3}
                value={interviewNotes}
                onChange={(e) => setInterviewNotes(e.target.value)}
                placeholder="Record candidate answers, panel observations, and evaluation scores..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900 p-3 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  setNoteSaved(true);
                  setTimeout(() => setNoteSaved(false), 2500);
                }}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 text-xs font-semibold transition"
              >
                Save Interview Notes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Interactive Evidence Connection Modal */}
      <ConnectEvidenceModal
        isOpen={isConnectModalOpen}
        platformName={connectPlatform}
        onClose={() => setIsConnectModalOpen(false)}
        onConnected={handleEvidenceConnected}
      />

      {/* Interactive Edit Profile Modal */}
      <EditCandidateProfileModal
        isOpen={isEditProfileOpen}
        candidate={candidate}
        onClose={() => setIsEditProfileOpen(false)}
        onSaveProfile={(updated) => {
          if (onUpdateCandidate) {
            onUpdateCandidate(updated);
          }
        }}
      />

    </div>
  );
};

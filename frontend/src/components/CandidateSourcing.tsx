import React, { useState } from 'react';
import { 
  Upload, 
  RefreshCw, 
  UserPlus, 
  CheckCircle2, 
  FileText, 
  Users, 
  Sparkles, 
  Briefcase, 
  Github, 
  Layers, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Candidate, JobRequisition, ActiveTab } from '../types';

interface CandidateSourcingProps {
  selectedJob: JobRequisition;
  candidates: Candidate[];
  onCandidateAdded: (newCand: Candidate) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const CandidateSourcing: React.FC<CandidateSourcingProps> = ({
  selectedJob,
  candidates,
  onCandidateAdded,
  onSelectCandidate,
  onSelectTab
}) => {
  const [isSyncingATS, setIsSyncingATS] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Manual Candidate Form state
  const [name, setName] = useState('Devon Miller');
  const [email, setEmail] = useState('devon.miller@example.com');
  const [title, setTitle] = useState('Senior Systems Engineer');
  const [experienceYears, setExperienceYears] = useState(6);
  const [currentCompany, setCurrentCompany] = useState('CloudScale Systems');
  const [githubUser, setGithubUser] = useState('devon-miller-io');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSyncATS = () => {
    setIsSyncingATS(true);
    setTimeout(() => {
      setIsSyncingATS(false);
      triggerToast('Greenhouse & Lever ATS sync complete: 6 new candidate applications ingested.');
    }, 1500);
  };

  const handleResumeDrop = () => {
    setIsUploadingResume(true);
    setTimeout(() => {
      setIsUploadingResume(false);
      const parsedCand: Candidate = {
        id: `cand-${Date.now()}`,
        name: 'Samantha Wu',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
        email: 'samantha.wu@example.com',
        phone: '+1 (555) 492-1049',
        location: 'Seattle, WA',
        title: 'Distributed Systems Tech Lead',
        experienceYears: 7,
        currentCompany: 'Amazon Web Services',
        education: {
          degree: 'B.S. in Computer Science',
          institution: 'University of Washington',
          year: '2019'
        },
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        appliedDate: 'Just now (Resume Upload)',
        status: 'ai_review',
        fitScore: 89,
        confidenceScore: 92,
        recommendation: 'PROCEED',
        recommendationReason: 'Ingested via resume batch. Strong distributed systems background with high alignment to Kafka & Go/Rust microservices.',
        factorBreakdown: {
          coreSkills: 91,
          experienceRelevance: 88,
          oaPerformance: 85,
          codeQuality: 90,
          profileConsistency: 92
        },
        topMatchedSkills: ['Distributed Systems', 'Go / Rust', 'Kafka', 'Kubernetes'],
        skillGaps: ['eBPF observability'],
        verifiedSkills: [
          { name: 'Distributed Systems', level: 'Expert', score: 92, evidenceSource: 'Work History', evidenceSnippet: 'Led DynamoDB partition replication team', verified: true },
          { name: 'Go / Rust', level: 'Advanced', score: 88, evidenceSource: 'GitHub', evidenceSnippet: 'Active maintainer on raft-consensus-engine', verified: true }
        ],
        experience: [
          {
            id: 'exp-swu-1',
            role: 'Senior Distributed Engineer',
            company: 'AWS',
            period: '2021 - Present',
            location: 'Seattle, WA',
            description: ['Architected multi-region consensus layers for cloud database fabrics.'],
            keyDeliverables: ['P99 latency reduction by 42%'],
            skillsUsed: ['Go', 'Raft', 'Kubernetes'],
            relevanceScore: 95
          }
        ],
        projects: [
          {
            id: 'proj-swu-1',
            title: 'raft-consensus-engine',
            description: 'High throughput Go implementation of Raft with log compaction.',
            techStack: ['Go', 'gRPC', 'Protobuf'],
            highlights: ['1.4k stars on GitHub'],
            complexityScore: 94
          }
        ],
        interviewFocusAreas: [
          {
            topic: 'Raft Partition Recovery',
            rationale: 'Deep dive on split-brain scenarios and leader election timeouts.',
            suggestedQuestion: 'How do you prevent split-brain during asymmetric network partitions in Raft?',
            expectedAnswerRubric: 'Candidate should describe quorum quorum checks and heartbeat lease mechanisms.',
            difficulty: 'Expert'
          }
        ]
      };
      onCandidateAdded(parsedCand);
      triggerToast('Resume successfully parsed: Samantha Wu added to pipeline!');
    }, 1200);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCand: Candidate = {
      id: `cand-${Date.now()}`,
      name,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      email,
      phone: '+1 (555) 304-9210',
      location: 'Austin, TX',
      title,
      experienceYears,
      currentCompany,
      education: {
        degree: 'B.S. in Software Engineering',
        institution: 'UT Austin',
        year: '2020'
      },
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      appliedDate: 'Just now (Manual Entry)',
      status: 'applied',
      fitScore: 84,
      confidenceScore: 88,
      recommendation: 'PROCEED',
      recommendationReason: 'Manually added candidate. Core systems and concurrency skills matched with active GitHub profile.',
      factorBreakdown: {
        coreSkills: 85,
        experienceRelevance: 84,
        oaPerformance: 80,
        codeQuality: 86,
        profileConsistency: 85
      },
      topMatchedSkills: ['Systems Engineering', 'Distributed Concurrency', 'Linux Kernel'],
      skillGaps: ['Proctor verification pending'],
      verifiedSkills: [
        { name: 'Systems Engineering', level: 'Advanced', score: 86, evidenceSource: 'Work History', evidenceSnippet: 'CloudScale production infrastructure', verified: true }
      ],
      experience: [
        {
          id: 'exp-dm-1',
          role: title,
          company: currentCompany,
          period: '2020 - Present',
          location: 'Austin, TX',
          description: ['Maintained high scale telemetry pipelines.'],
          keyDeliverables: ['Engineered log ingestion clusters.'],
          skillsUsed: ['Go', 'Kafka'],
          relevanceScore: 88
        }
      ],
      projects: [
        {
          id: 'proj-dm-1',
          title: 'distributed-telemetry-pipe',
          description: 'High throughput metrics daemon.',
          techStack: ['Go', 'Redis'],
          highlights: ['Handles 50k events/sec'],
          complexityScore: 86
        }
      ],
      interviewFocusAreas: [
        {
          topic: 'High Scale Telemetry',
          rationale: 'Verify thread pool configuration and backpressure limits.',
          suggestedQuestion: 'How do you handle buffer overflow in message ingest pipelines?',
          expectedAnswerRubric: 'Expect discussion of drop strategies, disk spillover, and backpressure signalling.',
          difficulty: 'Hard'
        }
      ]
    };
    onCandidateAdded(newCand);
    triggerToast(`Candidate "${name}" created and added to ranking table!`);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-indigo-400 font-medium">Candidate Sourcing & Intake</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Users className="h-6 w-6 text-indigo-400" />
            <span>Candidate Sourcing Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ingest candidate resumes, sync ATS pipelines, and parse technical evidence for {selectedJob.reqCode}: {selectedJob.title}.
          </p>
        </div>

        <button
          onClick={handleSyncATS}
          disabled={isSyncingATS}
          className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-indigo-400 ${isSyncingATS ? 'animate-spin' : ''}`} />
          <span>{isSyncingATS ? 'Syncing ATS Pipeline...' : 'Sync ATS (Greenhouse / Lever)'}</span>
        </button>
      </div>

      {toast && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-emerald-400 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Grid: Resume Parser Dropzone & Manual Intake */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Resume Dropzone */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Upload className="h-4 w-4 text-indigo-400" />
              <span>Batch Resume PDF Parser & Evidence Extractor</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Drag & drop resumes to automatically parse work history, extract declared skills, and fetch linked GitHub repos.
            </p>
          </div>

          <div 
            onClick={handleResumeDrop}
            className="rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500/60 bg-slate-950/60 p-8 text-center cursor-pointer transition space-y-3 group"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 group-hover:scale-110 transition">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                {isUploadingResume ? 'Parsing Resume with Multi-Evidence AI...' : 'Drop PDF / DOCX resumes here or click to browse'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports batch uploads up to 50 files. Automatic GitHub URL discovery and tech stack extraction.
              </p>
            </div>
            <button
              type="button"
              disabled={isUploadingResume}
              className="rounded-lg bg-indigo-600/30 border border-indigo-500/40 px-4 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-600/50 transition"
            >
              Simulate Uploading Sample Candidate Resume
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>ATS Format Detection: 100% standard parsing</span>
            <span className="text-emerald-400 font-semibold">Zero data retention</span>
          </div>
        </div>

        {/* Manual Candidate Addition Form */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <UserPlus className="h-4 w-4 text-emerald-400" />
              <span>Direct Candidate Intake</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Add a candidate directly from referral, outbound sourcing, or executive loop.
            </p>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Current Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Current Company</label>
                <input 
                  type="text" 
                  value={currentCompany}
                  onChange={(e) => setCurrentCompany(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Years of Experience</label>
                <input 
                  type="number" 
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  required
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">GitHub Username</label>
                <input 
                  type="text" 
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 font-bold text-white transition shadow-md shadow-emerald-600/20"
            >
              Add Candidate & Launch Evidence Scan
            </button>
          </form>
        </div>

      </div>

      {/* Sourced Pipeline Feed Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recently Ingested Candidates ({candidates.length})
            </h3>
            <p className="text-xs text-slate-400">Showing candidate intake feed for {selectedJob.reqCode}</p>
          </div>
          <button 
            onClick={() => onSelectTab('candidates')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
          >
            <span>Open Ranking Table</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-800/80">
          {candidates.map((cand) => (
            <div key={cand.id} className="py-3 flex items-center justify-between hover:bg-slate-900/40 px-2 rounded-xl transition">
              <div className="flex items-center space-x-3">
                <img src={cand.avatar} alt={cand.name} className="h-9 w-9 rounded-full object-cover border border-slate-700" />
                <div>
                  <div className="text-xs font-bold text-white">{cand.name}</div>
                  <div className="text-[11px] text-slate-400">{cand.title} · {cand.currentCompany}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">{cand.appliedDate}</span>
                <span className="rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold">
                  Fit {cand.fitScore}%
                </span>
                <button
                  onClick={() => {
                    onSelectCandidate(cand);
                    onSelectTab('profile');
                  }}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition"
                >
                  Dossier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

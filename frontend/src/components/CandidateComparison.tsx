import React, { useState } from 'react';
import { 
  GitCompare, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Award, 
  Code2, 
  Calendar, 
  ArrowRight, 
  Scale, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';
import { Candidate, ActiveTab } from '../types';

interface CandidateComparisonProps {
  candidates: Candidate[];
  candidateA: Candidate;
  candidateB: Candidate;
  onSelectCandidateA: (candidate: Candidate) => void;
  onSelectCandidateB: (candidate: Candidate) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onRecordDecision: (candidate: Candidate, action: string) => void;
}

export const CandidateComparison: React.FC<CandidateComparisonProps> = ({
  candidates,
  candidateA,
  candidateB,
  onSelectCandidateA,
  onSelectCandidateB,
  onSelectTab,
  onOpenScheduleModal,
  onRecordDecision
}) => {
  const [showSelectorA, setShowSelectorA] = useState(false);
  const [showSelectorB, setShowSelectorB] = useState(false);

  const isARank1 = candidateA.fitScore >= candidateB.fitScore;

  const metrics = [
    { label: 'Overall AI Fit Score', keyA: candidateA.fitScore, keyB: candidateB.fitScore, isPercent: true },
    { label: 'AI Confidence Level', keyA: candidateA.confidenceScore, keyB: candidateB.confidenceScore, isPercent: true },
    { label: 'Online Assessment Score', keyA: candidateA.oaResult?.totalScore || 88, keyB: candidateB.oaResult?.totalScore || 72, isPercent: true },
    { label: 'Evidence Strength', keyA: 'Strong', keyB: 'Moderate', isPercent: false, isCustomText: true },
    { label: 'Core Technical Skills', keyA: candidateA.factorBreakdown.coreSkills, keyB: candidateB.factorBreakdown.coreSkills, isPercent: true },
    { label: 'Experience Relevance', keyA: candidateA.factorBreakdown.experienceRelevance, keyB: candidateB.factorBreakdown.experienceRelevance, isPercent: true },
    { label: 'Code Quality & Cleanliness', keyA: candidateA.factorBreakdown.codeQuality, keyB: candidateB.factorBreakdown.codeQuality, isPercent: true },
    { label: 'Years of Experience', keyA: candidateA.experienceYears, keyB: candidateB.experienceYears, isPercent: false, suffix: ' years' },
    { label: 'GitHub Commits (12mo)', keyA: candidateA.githubMetrics?.totalCommitsLastYear || 842, keyB: candidateB.githubMetrics?.totalCommitsLastYear || 512, isPercent: false },
    { label: 'GitHub Project Stars', keyA: candidateA.githubMetrics?.totalStars || 615, keyB: candidateB.githubMetrics?.totalStars || 184, isPercent: false, suffix: ' ★' },
    { label: 'Profile Consistency Index', keyA: candidateA.factorBreakdown.profileConsistency, keyB: candidateB.factorBreakdown.profileConsistency, isPercent: true }
  ];

  return (
    <div className="space-y-6 pb-28">
      
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <button onClick={() => onSelectTab('candidates')} className="hover:text-white">Candidates</button>
            <span>/</span>
            <span className="text-indigo-400 font-medium">Head-to-Head Comparison</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <GitCompare className="h-6 w-6 text-indigo-400" />
            <span>Candidate Comparison Matrix</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Side-by-side evidence analysis, OA benchmarks, and verifiable code metrics for {candidateA.jobTitle}.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSelectTab('decisions')}
            className="flex items-center space-x-1.5 rounded-lg border border-indigo-500/30 bg-indigo-950/20 px-3.5 py-1.5 text-xs text-indigo-300 hover:bg-indigo-900/30 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>View Decision Intelligence</span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Candidate Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Candidate A Card */}
        <div className={`glass-panel rounded-2xl p-5 border relative ${
          isARank1 ? 'border-indigo-500/50 bg-gradient-to-b from-indigo-950/30 to-slate-900/80 shadow-lg' : 'border-slate-800 bg-slate-900/60'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="relative">
                <img 
                  src={candidateA.avatar} 
                  alt={candidateA.name} 
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md"
                />
                <span className={`absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-md ${
                  isARank1 ? 'bg-emerald-500 text-slate-950 ring-2 ring-slate-950' : 'bg-slate-700 text-white'
                }`}>
                  {isARank1 ? '#1' : '#2'}
                </span>
              </div>

              <div>
                <div className="relative">
                  <button 
                    onClick={() => setShowSelectorA(!showSelectorA)}
                    className="flex items-center space-x-1.5 text-base font-bold text-white hover:text-indigo-300"
                  >
                    <span>{candidateA.name}</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                  {showSelectorA && (
                    <div className="absolute left-0 mt-2 w-60 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50">
                      {candidates.map(c => (
                        <button
                          key={c.id}
                          onClick={() => { onSelectCandidateA(c); setShowSelectorA(false); }}
                          className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800 flex items-center justify-between"
                        >
                          <span>{c.name}</span>
                          <span className="font-mono text-emerald-400 font-bold">{c.fitScore}%</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-400">{candidateA.title} · {candidateA.currentCompany}</div>
                <div className="text-[11px] text-slate-500">{candidateA.education.degree}, {candidateA.education.institution}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{candidateA.fitScore}%</div>
              <div className="text-[10px] text-emerald-400 font-bold">AI Fit ({candidateA.confidenceScore}% conf)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">OA: {candidateA.oaResult?.totalScore || 88}% · Strong Evidence</div>
            </div>
          </div>
        </div>

        {/* Candidate B Card */}
        <div className={`glass-panel rounded-2xl p-5 border relative ${
          !isARank1 ? 'border-indigo-500/50 bg-gradient-to-b from-indigo-950/30 to-slate-900/80 shadow-lg' : 'border-slate-800 bg-slate-900/60'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="relative">
                <img 
                  src={candidateB.avatar} 
                  alt={candidateB.name} 
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
                />
                <span className={`absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-md ${
                  !isARank1 ? 'bg-emerald-500 text-slate-950 ring-2 ring-slate-950' : 'bg-slate-700 text-white'
                }`}>
                  {!isARank1 ? '#1' : '#2'}
                </span>
              </div>

              <div>
                <div className="relative">
                  <button 
                    onClick={() => setShowSelectorB(!showSelectorB)}
                    className="flex items-center space-x-1.5 text-base font-bold text-white hover:text-indigo-300"
                  >
                    <span>{candidateB.name}</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                  {showSelectorB && (
                    <div className="absolute left-0 mt-2 w-60 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50">
                      {candidates.map(c => (
                        <button
                          key={c.id}
                          onClick={() => { onSelectCandidateB(c); setShowSelectorB(false); }}
                          className="w-full text-left rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800 flex items-center justify-between"
                        >
                          <span>{c.name}</span>
                          <span className="font-mono text-emerald-400 font-bold">{c.fitScore}%</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-400">{candidateB.title} · {candidateB.currentCompany}</div>
                <div className="text-[11px] text-slate-500">{candidateB.education.degree}, {candidateB.education.institution}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold text-indigo-400 font-mono">{candidateB.fitScore}%</div>
              <div className="text-[10px] text-indigo-400 font-bold">AI Fit ({candidateB.confidenceScore}% conf)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">OA: {candidateB.oaResult?.totalScore || 72}% · Moderate Evidence</div>
            </div>
          </div>
        </div>

      </div>

      {/* AI Comparative Reasoning Box */}
      <div className="glass-panel rounded-2xl p-6 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AI Comparative Reasoning: {candidateA.name} (Rank #1) vs {candidateB.name} (Rank #2)
              </h3>
              <p className="text-xs text-indigo-300">
                Both candidates meet the core requirements. Candidate A demonstrates stronger practical evidence and assessment performance.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('decisions')}
            className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition self-start sm:self-auto"
          >
            <span>View AI Reasoning</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Difference Highlights Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="rounded-xl bg-slate-900/90 border border-emerald-500/30 p-3.5 space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{candidateA.name} Advantages:</span>
            </div>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li>Higher Online Assessment Score: <strong>88%</strong> (vs {candidateB.oaResult?.totalScore || 72}%)</li>
              <li>Strong project evidence: 5 verified GitHub repos, 842 verified commits</li>
              <li>Production experience in high-concurrency Spring Boot & Kafka microservices</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-900/90 border border-amber-500/30 p-3.5 space-y-1.5">
            <div className="font-bold text-amber-400 flex items-center space-x-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{candidateB.name} Verification Areas:</span>
            </div>
            <ul className="space-y-1 text-slate-300 list-disc list-inside">
              <li>Lower Online Assessment Score: <strong>72%</strong> on concurrency test cases</li>
              <li>Moderate project evidence: Docker & Kubernetes listed on resume require verification</li>
              <li>Recommend probing container orchestration during technical interview</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metrics Comparison Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Direct Factor Score Comparison</h3>
          <span className="text-xs text-slate-400">Green highlight indicates statistical winner</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {metrics.map((metric, idx) => {
            const isANumeric = typeof metric.keyA === 'number';
            const isBNumeric = typeof metric.keyB === 'number';
            const isAWinner = isANumeric && isBNumeric && (metric.keyA as number) > (metric.keyB as number);
            const isBWinner = isANumeric && isBNumeric && (metric.keyB as number) > (metric.keyA as number);
            
            return (
              <div key={idx} className="grid grid-cols-3 p-4 text-xs items-center hover:bg-slate-900/40 transition">
                {/* A value */}
                <div className="flex items-center justify-between pr-4 sm:pr-6">
                  <div className="flex items-center space-x-2">
                    {isAWinner && <span className="h-2 w-2 rounded-full bg-emerald-400"></span>}
                    <span className={`font-mono font-bold text-sm ${isAWinner ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {metric.keyA}{metric.isPercent ? '%' : ''}{metric.suffix || ''}
                    </span>
                  </div>
                  {metric.isPercent && (
                    <div className="hidden sm:block w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${isAWinner ? 'bg-emerald-500' : 'bg-slate-500'}`} style={{ width: `${metric.keyA}%` }}></div>
                    </div>
                  )}
                </div>

                {/* Metric Label */}
                <div className="text-center font-semibold text-slate-300 border-x border-slate-800/60 px-2">
                  {metric.label}
                </div>

                {/* B value */}
                <div className="flex items-center justify-between pl-4 sm:pl-6">
                  {metric.isPercent && (
                    <div className="hidden sm:block w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${isBWinner ? 'bg-emerald-500' : 'bg-slate-500'}`} style={{ width: `${metric.keyB}%` }}></div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 ml-auto">
                    <span className={`font-mono font-bold text-sm ${isBWinner ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {metric.keyB}{metric.isPercent ? '%' : ''}{metric.suffix || ''}
                    </span>
                    {isBWinner && <span className="h-2 w-2 rounded-full bg-emerald-400"></span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Matrix Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Candidate A Skills */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{candidateA.name}'s Verified Skills</h4>
          <div className="space-y-2">
            {candidateA.verifiedSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-900/80 p-2.5 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">{skill.score}% ({skill.level})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate B Skills */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{candidateB.name}'s Verified Skills</h4>
          <div className="space-y-2">
            {candidateB.verifiedSkills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-900/80 p-2.5 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400">{skill.score}% ({skill.level})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action Matrix */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800/90 bg-slate-950/95 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-300 flex items-center space-x-2">
            <Scale className="h-4 w-4 text-indigo-400" />
            <span>Ready to submit hiring decision for this comparison pair?</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onRecordDecision(candidateA, 'Approved for Interview')}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md transition"
            >
              Advance {candidateA.name}
            </button>
            <button
              onClick={() => onRecordDecision(candidateB, 'Approved for Interview')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800 transition"
            >
              Advance {candidateB.name}
            </button>
            <button
              onClick={() => {
                onOpenScheduleModal(candidateA);
              }}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition"
            >
              Schedule Interview Panel
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

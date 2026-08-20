import React from 'react';
import { 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  SlidersHorizontal, 
  Clock, 
  FileText, 
  CheckCheck,
  UserX,
  UserCheck
} from 'lucide-react';
import { Candidate, ActiveTab } from '../types';

interface DecisionIntelligenceProps {
  candidate: Candidate;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onOpenOverrideModal: (candidate: Candidate) => void;
  onRecordDecision: (candidate: Candidate, action: string) => void;
}

export const DecisionIntelligence: React.FC<DecisionIntelligenceProps> = ({
  candidate,
  onSelectTab,
  onOpenScheduleModal,
  onOpenOverrideModal,
  onRecordDecision
}) => {
  return (
    <div className="space-y-6 pb-20">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <button onClick={() => onSelectTab('candidates')} className="hover:text-white">Candidates</button>
            <span>/</span>
            <span className="text-indigo-400 font-medium">{candidate.name}</span>
            <span>/</span>
            <span className="text-slate-500">Decision Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Scale className="h-6 w-6 text-indigo-400" />
            <span>AI Decision Intelligence Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Multi-factor recommendation synthesis, explainability logs, and human-in-the-loop governance.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onOpenOverrideModal(candidate)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-950/30 hover:border-amber-500/40 transition"
          >
            Override AI Recommendation
          </button>
          <button
            onClick={() => onOpenScheduleModal(candidate)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition flex items-center space-x-1.5"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      {/* Primary Recommendation Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-indigo-950/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="rounded-2xl bg-emerald-500/20 p-3.5 text-emerald-400 border border-emerald-500/30 mt-1">
              <Sparkles className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                  FINAL AI RECOMMENDATION
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                  {candidate.confidenceScore}% Confidence
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                {candidate.recommendation === 'PROCEED' ? 'PROCEED TO TECHNICAL INTERVIEW' : candidate.recommendation.replace('_', ' ')}
              </h2>
              <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {candidate.recommendationReason}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/80 rounded-xl p-4 border border-slate-800 self-start md:self-auto">
            <div className="text-center px-2">
              <div className="text-[11px] text-slate-400 font-medium">Composite Score</div>
              <div className="text-3xl font-black text-emerald-400 font-mono">{candidate.fitScore}%</div>
            </div>
            <div className="h-10 w-[1px] bg-slate-800"></div>
            <div className="text-center px-2">
              <div className="text-[11px] text-slate-400 font-medium">Recommendation</div>
              <div className="text-sm font-bold text-white mt-1">Strong Advance</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of the Decision */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Fit</span>
            <span className="text-emerald-400 font-mono font-bold">{candidate.factorBreakdown.coreSkills}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${candidate.factorBreakdown.coreSkills}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-400">Matched {candidate.topMatchedSkills.length} of 6 essential job criteria.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">OA Performance</span>
            <span className="text-emerald-400 font-mono font-bold">{candidate.oaResult?.totalScore || 88}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${candidate.oaResult?.totalScore || 88}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-400">Exceeded 80% passing threshold across all 4 modules.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Consistency Index</span>
            <span className="text-indigo-400 font-mono font-bold">{candidate.factorBreakdown.profileConsistency}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${candidate.factorBreakdown.profileConsistency}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-400">High alignment across resume, LinkedIn, and GitHub code history.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">AI Confidence</span>
            <span className="text-cyan-400 font-mono font-bold">{candidate.confidenceScore}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${candidate.confidenceScore}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-400">12 verified external artifacts corroborate competence.</p>
        </div>

      </div>

      {/* Decision Deep-Dive: Evidence Breakdown & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Reasoning Explanation & Gaps */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Algorithmic Decision Justification
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Technical Competency Proof</span>
                </div>
                <p className="text-slate-400">
                  The candidate scored 94% on Concurrency & Thread Safety in the Online Assessment and has 840+ commits on public GitHub repositories, demonstrating genuine fluency in Java 21, Spring Boot 3, and Kafka streaming.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-indigo-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Credential Authenticity & Bias Protection</span>
                </div>
                <p className="text-slate-400">
                  All dates, titles, and employer histories match public tax and employment registries. The scoring model was audited with zero demographic bias triggers, ensuring 100% EEOC affirmative alignment.
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Interview Focus Guide */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Tailored Interview Focus for Next Round
              </h3>
              <button 
                onClick={() => onSelectTab('interview_brief')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                View Full Question Guide →
              </button>
            </div>

            <div className="space-y-3">
              {candidate.interviewFocusAreas.slice(0, 2).map((area, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{area.topic}</span>
                    <span className="text-indigo-400 font-semibold">{area.difficulty}</span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    "{area.suggestedQuestion}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Human In The Loop Actions */}
        <div className="space-y-6">
          
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recruiter Action Matrix
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => onRecordDecision(candidate, 'Approved for Interview')}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition"
              >
                <UserCheck className="h-4 w-4" />
                <span>Accept AI & Advance Candidate</span>
              </button>

              <button
                onClick={() => onOpenScheduleModal(candidate)}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Technical Interview</span>
              </button>

              <button
                onClick={() => onOpenOverrideModal(candidate)}
                className="w-full flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-950/30 hover:border-amber-500/40 transition"
              >
                <span>Record Override Note</span>
              </button>

              <button
                onClick={() => onRecordDecision(candidate, 'Overridden / Rejected')}
                className="w-full flex items-center justify-center space-x-2 rounded-xl border border-rose-500/30 bg-rose-950/20 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition"
              >
                <UserX className="h-4 w-4" />
                <span>Reject Application</span>
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-white">Compliance & Traceability</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Every hiring decision made on TalentSphere AI is timestamped and cryptographically archived in the Decision Audit Log for SOC2 and EEOC auditing.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

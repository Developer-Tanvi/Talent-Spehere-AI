import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Github, 
  CheckCircle2, 
  ExternalLink, 
  GitCommit, 
  Star, 
  FileCheck, 
  AlertTriangle, 
  Layers, 
  Code2,
  Linkedin,
  Activity,
  Cpu
} from 'lucide-react';
import { Candidate, ActiveTab } from '../types';

interface EvidenceDashboardProps {
  candidate: Candidate;
  onSelectTab: (tab: ActiveTab) => void;
}

export const EvidenceDashboard: React.FC<EvidenceDashboardProps> = ({
  candidate,
  onSelectTab
}) => {
  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <button onClick={() => onSelectTab('candidates')} className="hover:text-white">Candidates</button>
            <span>/</span>
            <span className="text-indigo-400 font-medium">{candidate.name}</span>
            <span>/</span>
            <span className="text-slate-500">Evidence Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
            <span>Multi-Source Evidence Verification</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verifying candidate claims with GitHub commits, online assessment telemetry, and open-source project analysis.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-1.5 flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300">99.2% Authentic Evidence Score</span>
          </div>
        </div>
      </div>

      {/* Hero Evidence Summary Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/90">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={candidate.avatar} 
              alt={candidate.name} 
              className="h-16 w-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
                <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-300 font-semibold">
                  {candidate.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{candidate.currentCompany} · {candidate.experienceYears} Years Verified Experience</p>
              <div className="flex items-center space-x-3 text-xs text-slate-400 mt-2">
                <span className="text-emerald-400 flex items-center font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Resume Verified
                </span>
                <span>·</span>
                <span className="text-emerald-400 flex items-center font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> GitHub Profile Linked
                </span>
                <span>·</span>
                <span className="text-emerald-400 flex items-center font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> OA Completed Cleanly
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
              <div className="text-xl font-extrabold text-white font-mono">{candidate.githubMetrics?.totalCommitsLastYear || 842}</div>
              <div className="text-[10px] text-slate-400">Verified Commits</div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
              <div className="text-xl font-extrabold text-white font-mono">{candidate.githubMetrics?.totalStars || 615} ★</div>
              <div className="text-[10px] text-slate-400">Project Stars</div>
            </div>
            <div className="rounded-xl bg-slate-900 p-3 border border-slate-800">
              <div className="text-xl font-extrabold text-emerald-400 font-mono">0.02</div>
              <div className="text-[10px] text-slate-400">Plagiarism Index</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Verified Skills Evidence + GitHub Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Deep Skill Evidence Bars */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Skill Evidence Strength Analysis
              </h3>
              <span className="text-xs text-slate-400">Grounded in code repositories & test runs</span>
            </div>

            <div className="space-y-4">
              {candidate.verifiedSkills.map((skill, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-xs">{skill.name}</span>
                      <span className="rounded bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 font-semibold">
                        {skill.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400 font-medium">Confidence:</span>
                      <span className="text-sm font-extrabold text-emerald-400 font-mono">{skill.score}%</span>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        skill.score >= 90 ? 'bg-emerald-500' : skill.score >= 80 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span className="text-slate-300 italic">"{skill.evidenceSnippet}"</span>
                    <span className="font-medium text-indigo-400 whitespace-nowrap">Verified via {skill.evidenceSource}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Public Project Artifacts */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Verifiable Open-Source Repositories
            </h3>

            <div className="space-y-3">
              {candidate.projects.map((proj) => (
                <div key={proj.id} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Code2 className="h-4 w-4 text-indigo-400" />
                      <span className="font-bold text-white text-xs">{proj.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{proj.description}</p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 mt-1.5">
                      <span>★ {proj.stars} stars</span>
                      <span>·</span>
                      <span>{proj.commits} commits</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-medium">Complexity: {proj.complexityScore}/100</span>
                    </div>
                  </div>

                  {proj.repoUrl && (
                    <a 
                      href={proj.repoUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-indigo-300 hover:bg-slate-850 hover:border-indigo-500 transition self-start sm:self-auto"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Inspect Code</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Anti-Fraud & Proctor Telemetry */}
        <div className="space-y-6">
          
          {/* Integrity & Authenticity Badge */}
          <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/20 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Candidate Authenticity: PASS</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              No evidence of ChatGPT resume stuffing, fake diploma mills, or fraudulent employment overlap found.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-emerald-500/20 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Identity Consistency</span>
                <span className="text-emerald-400 font-bold">100%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>OA Proctor Trust Index</span>
                <span className="text-emerald-400 font-bold">99.0%</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Code Authorship Match</span>
                <span className="text-emerald-400 font-bold">96.4%</span>
              </div>
            </div>
          </div>

          {/* GitHub Activity Metrics */}
          {candidate.githubMetrics && (
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  GitHub Code Quality Metrics
                </h3>
                <Github className="h-4 w-4 text-slate-400" />
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-lg bg-slate-900 p-3 space-y-1">
                  <div className="flex items-center justify-between text-slate-300 font-medium">
                    <span>Commit Regularity & Consistency</span>
                    <span className="text-emerald-400 font-bold">{candidate.githubMetrics.consistencyRating}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Active commit streaks spanning 2+ years without abrupt gaps.</p>
                </div>

                <div className="rounded-lg bg-slate-900 p-3 space-y-1">
                  <div className="flex items-center justify-between text-slate-300 font-medium">
                    <span>Code Quality & Test Ratio</span>
                    <span className="text-emerald-400 font-bold">{candidate.githubMetrics.qualityRating}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400">High unit-test coverage and adherence to semantic Git commits.</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

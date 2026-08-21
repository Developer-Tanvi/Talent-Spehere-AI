import React from 'react';
import { 
  Users, 
  Briefcase, 
  FileCode2, 
  Award, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  TrendingUp, 
  Clock, 
  Plus, 
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Candidate, JobRequisition, ActiveTab } from '../types';

interface RecruiterDashboardProps {
  candidates: Candidate[];
  jobs: JobRequisition[];
  selectedJob: JobRequisition;
  onSelectCandidate: (candidate: Candidate) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenCreateJob: () => void;
  onOpenWeightsModal: () => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  candidates,
  jobs,
  selectedJob,
  onSelectCandidate,
  onSelectTab,
  onOpenCreateJob,
  onOpenWeightsModal
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Welcome & Quick Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Recruiter Command Center</h1>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              Live AI Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time candidate intelligence, automated skill verification, and multi-evidence decision recommendations.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenWeightsModal}
            className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-400" />
            <span>Tune AI Weights</span>
          </button>
          <button 
            onClick={onOpenCreateJob}
            className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Create Requisition</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1 */}
        <div className="glass-panel rounded-2xl p-4 relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="flex items-center text-xs font-medium text-emerald-400">
              <TrendingUp className="h-3 w-3 mr-1" /> +2 this week
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">12</div>
            <div className="text-xs text-slate-400">Active Job Requisitions</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
            <span>Engineering & Product</span>
            <span className="text-indigo-400 font-medium cursor-pointer" onClick={() => onSelectTab('candidates')}>View All</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel rounded-2xl p-4 relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 border border-cyan-500/20">
              <Users className="h-5 w-5" />
            </div>
            <span className="flex items-center text-xs font-medium text-emerald-400">
              <Sparkles className="h-3 w-3 mr-1" /> 94.2% AI Accuracy
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">1,420</div>
            <div className="text-xs text-slate-400">Candidates Analyzed</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
            <span>Multimodal Evidence Verified</span>
            <span className="text-cyan-400 font-medium">98% Auto-scraped</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-panel rounded-2xl p-4 relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20">
              <FileCode2 className="h-5 w-5" />
            </div>
            <span className="flex items-center text-xs font-medium text-amber-400">
              <Clock className="h-3 w-3 mr-1" /> 18 completed today
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">34</div>
            <div className="text-xs text-slate-400">Online Assessments Active</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
            <span>Avg Score: 84.6%</span>
            <span className="text-amber-400 font-medium cursor-pointer" onClick={() => onSelectTab('oa_builder')}>Manage OAs</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-panel rounded-2xl p-4 relative overflow-hidden group hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20">
              <Award className="h-5 w-5" />
            </div>
            <span className="flex items-center text-xs font-medium text-emerald-400">
              <CheckCircle2 className="h-3 w-3 mr-1" /> 92.4% Offer Acceptance
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-white tracking-tight">18</div>
            <div className="text-xs text-slate-400">Final Interview Loops</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800/80 pt-2">
            <span>Avg Time to Fill: 18d</span>
            <span className="text-emerald-400 font-medium cursor-pointer" onClick={() => onSelectTab('pipeline')}>Kanban Board</span>
          </div>
        </div>

      </div>

      {/* Global Recruitment Pipeline Funnel Visualization */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center">
              <span>Recruitment Funnel Throughput</span>
              <span className="ml-2 text-xs font-normal text-slate-400">({selectedJob.reqCode} · {selectedJob.title})</span>
            </h2>
            <p className="text-xs text-slate-400">High-fidelity stage progression powered by evidence verification</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-indigo-500"></span>
            <span>Total Intake: 450 Applications</span>
          </div>
        </div>

        {/* Funnel Step Bars */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 relative">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ATS Shortlisted</div>
            <div className="text-xl font-bold text-white mt-1">450</div>
            <div className="text-[11px] text-slate-500 mt-1">100% of pipeline</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-slate-500 h-full rounded-full w-full"></div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 relative">
            <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">AI Verified</div>
            <div className="text-xl font-bold text-indigo-300 mt-1">182</div>
            <div className="text-[11px] text-indigo-400/80 mt-1">40.4% pass rate</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '40.4%' }}></div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 relative">
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Online Assessment</div>
            <div className="text-xl font-bold text-amber-300 mt-1">94</div>
            <div className="text-[11px] text-amber-400/80 mt-1">20.8% reached OA</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '20.8%' }}></div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 relative">
            <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">Interview Panel</div>
            <div className="text-xl font-bold text-cyan-300 mt-1">38</div>
            <div className="text-[11px] text-cyan-400/80 mt-1">8.4% qualified</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: '8.4%' }}></div>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 relative">
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Offers / Hired</div>
            <div className="text-xl font-bold text-emerald-300 mt-1">12</div>
            <div className="text-[11px] text-emerald-400/80 mt-1">2.6% final conversion</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Two Column Layout: AI Engine Insights & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Candidate Priority Ranking List */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Top AI Recommended Candidates</h2>
              <p className="text-xs text-slate-400">Ranked dynamically by multi-factor score (OA, GitHub, Experience)</p>
            </div>
            <button 
              onClick={() => onSelectTab('candidates')}
              className="flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              <span>Full Ranking Table</span>
              <ChevronRight className="h-4 w-4 ml-0.5" />
            </button>
          </div>

          <div className="space-y-3">
            {candidates.slice(0, 4).map((candidate) => (
              <div 
                key={candidate.id}
                onClick={() => {
                  onSelectCandidate(candidate);
                  onSelectTab('profile');
                }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 hover:border-indigo-500/40 hover:bg-slate-900 transition cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="relative">
                    <img 
                      src={candidate.avatar} 
                      alt={candidate.name} 
                      className="h-11 w-11 rounded-full object-cover border border-indigo-500/30"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white ring-2 ring-slate-950">
                      ✓
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm text-white group-hover:text-indigo-300 transition">{candidate.name}</span>
                      <span className="text-[10px] rounded-md bg-slate-800 px-2 py-0.5 text-slate-300">
                        {candidate.experienceYears}y exp
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{candidate.title} · {candidate.currentCompany}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {candidate.topMatchedSkills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-[10px] rounded bg-indigo-950/60 text-indigo-300 px-1.5 py-0.5 border border-indigo-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center sm:justify-end space-x-1.5">
                      <span className="text-xs text-slate-400 font-medium">AI Fit:</span>
                      <span className={`text-base font-bold ${
                        candidate.fitScore >= 90 ? 'text-emerald-400' : candidate.fitScore >= 80 ? 'text-indigo-400' : 'text-amber-400'
                      }`}>
                        {candidate.fitScore}%
                      </span>
                    </div>
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      candidate.recommendation === 'PROCEED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {candidate.recommendation.replace('_', ' ')}
                    </span>
                  </div>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: AI Engine Insights & Quick Actions */}
        <div className="space-y-6">
          
          {/* AI Intelligence Snapshot */}
          <div className="glass-panel rounded-2xl p-5 border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 to-slate-950/80">
            <div className="flex items-center space-x-2 text-indigo-400 mb-3">
              <Zap className="h-4 w-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider">AI Engine Insights</h3>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                  <span>Top Candidate Identified</span>
                  <span className="text-emerald-400 font-bold">94% Match</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Elena Rodriguez achieved a 96% verification index on Java 21 & Kafka streaming with 0 flagged plagiarism anomalies in OA.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                  <span>Skill Shortage Alert</span>
                  <span className="text-amber-400 font-bold">42% Gap</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Kubernetes cluster administration is weak across 58% of backend applicants. Recommending interview probe on container limits.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div className="flex items-center justify-between text-slate-300 font-medium mb-1">
                  <span>EEOC & Bias Compliance</span>
                  <span className="text-cyan-400 font-bold">99.8% Pass</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Zero demographic or institutional bias detected in automated scoring algorithms.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Fast Track Actions
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => onSelectTab('compare')}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition text-left"
              >
                <span className="font-medium">Compare Top Candidates (Alex vs Jordan)</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </button>

              <button 
                onClick={() => onSelectTab('interview_brief')}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition text-left"
              >
                <span className="font-medium">Generate Technical Interview Brief</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </button>

              <button 
                onClick={() => onSelectTab('audit_log')}
                className="w-full flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition text-left"
              >
                <span className="font-medium">View Recruiter Decision Audit Log</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Candidate, CandidateStatus, JobRequisition, ActiveTab } from '../types';

interface PipelineKanbanProps {
  candidates: Candidate[];
  selectedJob: JobRequisition;
  onSelectCandidate: (candidate: Candidate) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onMoveCandidateStage: (candidateId: string, newStatus: CandidateStatus) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
}

export const PipelineKanban: React.FC<PipelineKanbanProps> = ({
  candidates,
  selectedJob,
  onSelectCandidate,
  onSelectTab,
  onMoveCandidateStage,
  onOpenScheduleModal
}) => {
  const columns: { id: CandidateStatus; label: string; count: number; color: string }[] = [
    { id: 'applied', label: 'Applied', count: 450, color: 'border-slate-700 text-slate-400' },
    { id: 'ats_shortlist', label: 'ATS Shortlist', count: 182, color: 'border-blue-500/40 text-blue-400' },
    { id: 'ai_review', label: 'AI Review', count: 94, color: 'border-purple-500/40 text-purple-400' },
    { id: 'oa_completed', label: 'OA Stage', count: 34, color: 'border-amber-500/40 text-amber-400' },
    { id: 'interview_scheduled', label: 'Interview', count: 18, color: 'border-indigo-500/40 text-indigo-400' },
    { id: 'offer_extended', label: 'Offer / Hired', count: 12, color: 'border-emerald-500/40 text-emerald-400' }
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <button onClick={() => onSelectTab('overview')} className="hover:text-white">Dashboard</button>
            <span>/</span>
            <span className="text-indigo-400 font-medium">Hiring Pipeline</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Kanban className="h-6 w-6 text-indigo-400" />
            <span>Interactive Recruitment Pipeline</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Stage progression board for {selectedJob.reqCode}: {selectedJob.title}
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button 
            onClick={() => onSelectTab('candidates')}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* Horizontal Kanban Scroll Columns */}
      <div className="flex space-x-4 overflow-x-auto pb-6 pt-2">
        {columns.map((column) => {
          const colCandidates = candidates.filter(c => {
            if (column.id === 'oa_completed') {
              return c.status === 'oa_completed' || c.status === 'oa_pending';
            }
            if (column.id === 'interview_scheduled') {
              return c.status === 'interview_scheduled' || c.status === 'interview_completed';
            }
            return c.status === column.id;
          });

          return (
            <div 
              key={column.id}
              className="w-80 flex-shrink-0 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 flex flex-col space-y-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-2">
                  <span className={`h-2.5 w-2.5 rounded-full border ${column.color}`}></span>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">{column.label}</h3>
                </div>
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-slate-400 font-mono border border-slate-800">
                  {colCandidates.length}
                </span>
              </div>

              {/* Candidate Cards List */}
              <div className="space-y-3 flex-1 min-h-[350px]">
                {colCandidates.map((candidate) => (
                  <div 
                    key={candidate.id}
                    className="glass-panel rounded-xl p-4 border border-slate-800 hover:border-indigo-500/40 hover:shadow-lg transition space-y-3 cursor-pointer group"
                  >
                    {/* Header: Avatar, Name, Fit */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <img 
                          src={candidate.avatar} 
                          alt={candidate.name} 
                          className="h-9 w-9 rounded-full object-cover border border-indigo-500/30"
                        />
                        <div>
                          <div 
                            onClick={() => {
                              onSelectCandidate(candidate);
                              onSelectTab('profile');
                            }}
                            className="font-bold text-white text-xs group-hover:text-indigo-300 transition"
                          >
                            {candidate.name}
                          </div>
                          <div className="text-[10px] text-slate-400">{candidate.title}</div>
                        </div>
                      </div>

                      <span className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded-md ${
                        candidate.fitScore >= 90 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
                      }`}>
                        {candidate.fitScore}%
                      </span>
                    </div>

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-1">
                      {candidate.topMatchedSkills.slice(0, 2).map((skill, sIdx) => (
                        <span key={sIdx} className="rounded bg-slate-900 px-1.5 py-0.5 text-[9px] text-slate-400 border border-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                      <span className="text-slate-500">OA: {candidate.oaResult ? `${candidate.oaResult.totalScore}%` : 'N/A'}</span>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenScheduleModal(candidate);
                          }}
                          className="p-1 text-slate-400 hover:text-white"
                          title="Schedule Interview"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                        </button>
                        
                        {/* Quick Advance Button */}
                        {column.id === 'oa_completed' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveCandidateStage(candidate.id, 'interview_scheduled');
                            }}
                            className="flex items-center space-x-1 rounded bg-indigo-600/80 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-indigo-500"
                          >
                            <span>Advance</span>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {colCandidates.length === 0 && (
                  <div className="h-32 flex items-center justify-center rounded-xl border border-dashed border-slate-800/80 text-xs text-slate-500">
                    No candidates in this stage
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Sparkles, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Star, 
  Calendar, 
  Printer, 
  Share2,
  ChevronRight,
  ShieldAlert,
  ThumbsUp
} from 'lucide-react';
import { Candidate, ActiveTab } from '../types';

interface InterviewBriefProps {
  candidate: Candidate;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
}

export const InterviewBrief: React.FC<InterviewBriefProps> = ({
  candidate,
  onSelectTab,
  onOpenScheduleModal
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({ 0: 4, 1: 5, 2: 4 });
  const [notes, setNotes] = useState<{ [key: number]: string }>({});

  const handleCopyQuestion = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <button onClick={() => onSelectTab('candidates')} className="hover:text-white">Candidates</button>
            <span>/</span>
            <span className="text-indigo-400 font-medium">{candidate.name}</span>
            <span>/</span>
            <span className="text-slate-500">Interview Intelligence</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <MessageSquareCode className="h-6 w-6 text-indigo-400" />
            <span>Technical Interview Briefing & Question Guide</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tailored architectural questions and evaluation rubrics dynamically calibrated to {candidate.name}'s resume gaps.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button 
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            <Printer className="h-3.5 w-3.5 text-slate-400" />
            <span>Print Interview Guide</span>
          </button>
          <button 
            onClick={() => onOpenScheduleModal(candidate)}
            className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Schedule Panel</span>
          </button>
        </div>
      </div>

      {/* Candidate Snapshot Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <img 
            src={candidate.avatar} 
            alt={candidate.name} 
            className="h-11 w-11 rounded-full object-cover border border-indigo-500/30"
          />
          <div>
            <div className="font-bold text-white text-sm">{candidate.name}</div>
            <div className="text-xs text-slate-400">{candidate.title} · {candidate.jobTitle} (Fit: {candidate.fitScore}%)</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {candidate.interviewFocusAreas.map((area, idx) => (
            <span key={idx} className="rounded-full bg-indigo-950/60 border border-indigo-500/30 px-3 py-1 text-xs text-indigo-300 font-medium">
              {area.topic}
            </span>
          ))}
        </div>
      </div>

      {/* Generated Questions List with Live Rubric */}
      <div className="space-y-6">
        {candidate.interviewFocusAreas.map((area, idx) => (
          <div key={idx} className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            
            {/* Question Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold font-mono">
                  {idx + 1}
                </span>
                <h3 className="font-bold text-white text-base">{area.topic}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  area.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {area.difficulty} Difficulty
                </span>
                <button
                  onClick={() => handleCopyQuestion(area.suggestedQuestion, idx)}
                  className="flex items-center space-x-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
                >
                  {copiedIndex === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Suggested Question Prompt */}
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-sm text-white font-medium leading-relaxed">
              "{area.suggestedQuestion}"
            </div>

            {/* AI Rationale & Rubric */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-800/80 space-y-2">
                <div className="font-bold text-indigo-400 flex items-center space-x-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Selection Rationale:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {area.rationale}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-950/20 p-4 border border-emerald-500/20 space-y-2">
                <div className="font-bold text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>What to Look For in Candidate Response:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {area.expectedAnswerRubric}
                </p>
              </div>

            </div>

            {/* Live Scoring & Notes Bar */}
            <div className="rounded-xl bg-slate-900/60 p-4 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-medium">Candidate Score:</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatings(prev => ({ ...prev, [idx]: star }))}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star className={`h-4 w-4 ${
                        star <= (ratings[idx] || 0) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 max-w-md">
                <input 
                  type="text" 
                  placeholder="Add private interviewer notes for this question..."
                  value={notes[idx] || ''}
                  onChange={(e) => setNotes({ ...notes, [idx]: e.target.value })}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

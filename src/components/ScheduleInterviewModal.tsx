import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  X, 
  CheckCircle2, 
  FileText, 
  Send 
} from 'lucide-react';
import { Candidate } from '../types';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  candidate: Candidate | null;
  onClose: () => void;
  onScheduled: (candidate: Candidate, date: string, type: string) => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  isOpen,
  candidate,
  onClose,
  onScheduled
}) => {
  if (!isOpen || !candidate) return null;

  const [date, setDate] = useState('2026-10-28');
  const [time, setTime] = useState('14:00');
  const [interviewType, setInterviewType] = useState('Technical Architecture & Live Coding');
  const [interviewers, setInterviewers] = useState<string[]>(['Sarah Jenkins (Lead Architect)', 'Michael Zhang (Staff Engineer)']);
  const [includeAIBrief, setIncludeAIBrief] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduled(candidate, `${date} at ${time}`, interviewType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Schedule Technical Interview</h2>
              <p className="text-xs text-slate-400">With {candidate.name} · {candidate.jobTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Candidate Info Badge */}
          <div className="flex items-center space-x-3 rounded-xl bg-slate-900/80 p-3 border border-slate-800">
            <img src={candidate.avatar} alt={candidate.name} className="h-10 w-10 rounded-xl object-cover border border-indigo-500/40" />
            <div>
              <div className="font-bold text-white text-xs">{candidate.name}</div>
              <div className="text-[11px] text-slate-400">{candidate.title} · OA Score: {candidate.oaResult?.totalScore}%</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Interview Date</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Time Slot (EST)</label>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Interview Stage</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="Technical Architecture & Live Coding">Technical Architecture & Live Coding (60m)</option>
              <option value="System Design Deep Dive">System Design Deep Dive (45m)</option>
              <option value="Engineering Leadership & Culture">Engineering Leadership & Culture (45m)</option>
            </select>
          </div>

          <div className="rounded-xl bg-indigo-950/30 border border-indigo-500/30 p-3 flex items-start space-x-2.5">
            <input 
              type="checkbox" 
              id="includeAIBrief"
              checked={includeAIBrief}
              onChange={(e) => setIncludeAIBrief(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
            />
            <label htmlFor="includeAIBrief" className="text-[11px] text-slate-300">
              <strong className="text-white">Auto-attach Tailored AI Question Brief:</strong> Automatically embeds the {candidate.interviewFocusAreas.length} custom architectural challenge questions into the calendar invites for interviewers.
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Confirm & Send Invites</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

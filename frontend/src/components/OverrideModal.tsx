import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  ShieldAlert, 
  SlidersHorizontal, 
  Lock 
} from 'lucide-react';
import { Candidate } from '../types';

interface OverrideModalProps {
  isOpen: boolean;
  candidate: Candidate | null;
  onClose: () => void;
  onOverrideConfirmed: (candidate: Candidate, newAction: string, reason: string) => void;
}

export const OverrideModal: React.FC<OverrideModalProps> = ({
  isOpen,
  candidate,
  onClose,
  onOverrideConfirmed
}) => {
  if (!isOpen || !candidate) return null;

  const [overrideAction, setOverrideAction] = useState('Manual Advance to Interview');
  const [reasonCategory, setReasonCategory] = useState('Specific Domain / Open Source Context');
  const [detailedNotes, setDetailedNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOverrideConfirmed(
      candidate, 
      overrideAction, 
      `[${reasonCategory}] ${detailedNotes || 'Recruiter verified exceptional background credentials.'}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-amber-500/40 bg-slate-950 p-6 space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="rounded-xl bg-amber-500/20 p-2 text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Human Override of AI Recommendation</h2>
              <p className="text-xs text-slate-400">Recording audit trail for {candidate.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Current AI state */}
          <div className="rounded-xl bg-slate-900 p-3 border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Current AI Decision:</span>
              <span className="font-bold text-emerald-400">{candidate.recommendation} ({candidate.fitScore}% Fit)</span>
            </div>
            <p className="text-[11px] text-slate-400">AI Confidence: {candidate.confidenceScore}%</p>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Human Recruiter Action</label>
            <select
              value={overrideAction}
              onChange={(e) => setOverrideAction(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="Manual Advance to Interview">Manual Advance to Interview (Ignore Flag)</option>
              <option value="Manual Hold / Request More Info">Manual Hold / Request Additional Work Sample</option>
              <option value="Manual Reject">Manual Reject (Human Disqualification)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Structured Justification Category</label>
            <select
              value={reasonCategory}
              onChange={(e) => setReasonCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="Specific Domain / Open Source Context">Specific Domain / Open Source Context Not In Resume</option>
              <option value="Executive Referral / Prior Proven Colleague">Executive Referral / Prior Proven Colleague</option>
              <option value="Niche Tooling Equivalency Exception">Niche Tooling Equivalency Exception</option>
              <option value="Specialized Patent / Research Authorship">Specialized Patent / Research Authorship</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Detailed Recruiter Audit Notes</label>
            <textarea
              rows={3}
              placeholder="Provide context on why this override is justified..."
              value={detailedNotes}
              onChange={(e) => setDetailedNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <Lock className="h-3.5 w-3.5 text-indigo-400" />
            <span>This override will be cryptographically logged to the compliance ledger.</span>
          </div>

          {/* Actions */}
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
              className="rounded-lg bg-amber-600 px-4 py-2 font-bold text-slate-950 hover:bg-amber-500 shadow-md transition"
            >
              Record Override in Ledger
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

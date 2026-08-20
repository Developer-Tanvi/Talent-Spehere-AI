import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw 
} from 'lucide-react';
import { JobRequisition } from '../types';

interface WeightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: JobRequisition;
  onSaveWeights: (weights: JobRequisition['weights']) => void;
}

export const WeightsModal: React.FC<WeightsModalProps> = ({
  isOpen,
  onClose,
  selectedJob,
  onSaveWeights
}) => {
  const [weights, setWeights] = useState(selectedJob.weights || {
    skills: 35,
    experience: 25,
    oaScore: 25,
    githubEvidence: 10,
    education: 5
  });

  if (!isOpen) return null;

  const total = weights.skills + weights.experience + weights.oaScore + weights.githubEvidence + weights.education;
  const isValid = total === 100;

  const handleSliderChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetToDefault = () => {
    setWeights({
      skills: 35,
      experience: 25,
      oaScore: 25,
      githubEvidence: 10,
      education: 5
    });
  };

  const handleSave = () => {
    if (isValid) {
      onSaveWeights(weights);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Tune AI Scoring Weights</h2>
              <p className="text-xs text-slate-400">{selectedJob.reqCode}: {selectedJob.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Weights Sliders */}
        <div className="space-y-4 text-xs">
          
          {/* Skills */}
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-slate-300">Core Technical Skills Match</span>
              <span className="text-indigo-400 font-mono font-bold">{weights.skills}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="60" 
              value={weights.skills}
              onChange={(e) => handleSliderChange('skills', Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* Experience */}
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-slate-300">Relevant Work Experience & Deliverables</span>
              <span className="text-indigo-400 font-mono font-bold">{weights.experience}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={weights.experience}
              onChange={(e) => handleSliderChange('experience', Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* OA Performance */}
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-slate-300">Online Assessment (OA) Coding Score</span>
              <span className="text-indigo-400 font-mono font-bold">{weights.oaScore}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={weights.oaScore}
              onChange={(e) => handleSliderChange('oaScore', Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* GitHub & Project Evidence */}
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-slate-300">GitHub Verified Commits & Project Complexity</span>
              <span className="text-indigo-400 font-mono font-bold">{weights.githubEvidence}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={weights.githubEvidence}
              onChange={(e) => handleSliderChange('githubEvidence', Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* Education */}
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-slate-300">Education & Accreditations</span>
              <span className="text-indigo-400 font-mono font-bold">{weights.education}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="30" 
              value={weights.education}
              onChange={(e) => handleSliderChange('education', Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* Total Validation */}
          <div className={`rounded-xl p-3 flex items-center justify-between text-xs font-semibold ${
            isValid ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-500/30' : 'bg-rose-950/30 text-rose-400 border border-rose-500/30'
          }`}>
            <div className="flex items-center space-x-2">
              {isValid ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>Total Weight: {total}% {isValid ? '(Valid 100%)' : '(Must sum to exactly 100%)'}</span>
            </div>
            <button 
              type="button" 
              onClick={handleResetToDefault}
              className="text-[11px] underline hover:text-white"
            >
              Reset Default
            </button>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition disabled:opacity-40"
          >
            Recalculate Ranking
          </button>
        </div>

      </div>
    </div>
  );
};

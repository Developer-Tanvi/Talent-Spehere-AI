import React, { useState } from 'react';
import { 
  FileCode2, 
  Sparkles, 
  Plus, 
  Trash2, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Save, 
  Play, 
  ChevronRight,
  SlidersHorizontal,
  FileCheck2
} from 'lucide-react';
import { AssessmentQuestion, JobRequisition, ActiveTab } from '../types';

interface AssessmentBuilderProps {
  questions: AssessmentQuestion[];
  selectedJob: JobRequisition;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenTestSimulator: () => void;
}

export const AssessmentBuilder: React.FC<AssessmentBuilderProps> = ({
  questions: initialQuestions,
  selectedJob,
  onSelectTab,
  onOpenTestSimulator
}) => {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>(initialQuestions);
  const [assessmentTitle, setAssessmentTitle] = useState('Senior Java Backend Engineering OA');
  const [timeLimit, setTimeLimit] = useState(60);
  const [passingScore, setPassingScore] = useState(75);
  const [proctorStrictness, setProctorStrictness] = useState('Strict');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAutoGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 1200);
  };

  const handleRemoveQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <span>Online Assessments</span>
            <span>/</span>
            <span className="text-indigo-400 font-medium">OA Builder</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <FileCode2 className="h-6 w-6 text-indigo-400" />
            <span>Technical Assessment Builder</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build bespoke coding exams and system design challenges mapped to {selectedJob.reqCode}: {selectedJob.title}.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenTestSimulator}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition"
          >
            <Play className="h-3.5 w-3.5 text-emerald-400" />
            <span>Preview Candidate IDE</span>
          </button>

          <button
            onClick={handleAutoGenerate}
            disabled={isGenerating}
            className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>{isGenerating ? 'AI Synthesizing Exam...' : 'Auto-Generate Full OA'}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Assessment auto-generated with tailored test-cases for {selectedJob.title}!</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-400 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Main Grid: Core Setup & Questions Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Core Settings Panel */}
        <div className="space-y-6">
          
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Assessment Configuration
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Assessment Name</label>
                <input 
                  type="text" 
                  value={assessmentTitle}
                  onChange={(e) => setAssessmentTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Requisition</label>
                <input 
                  type="text" 
                  disabled
                  value={`${selectedJob.reqCode}: ${selectedJob.title}`}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Time Limit (mins)</label>
                  <input 
                    type="number" 
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pass Score (%)</label>
                  <input 
                    type="number" 
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Proctor Anti-Cheat Level</label>
                <select
                  value={proctorStrictness}
                  onChange={(e) => setProctorStrictness(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Strict">Strict (Browser lockdown & audio proctoring)</option>
                  <option value="Standard">Standard (Copy-paste & tab switch detection)</option>
                  <option value="Relaxed">Relaxed (Self-paced open book)</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Recommended Section Weights */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>AI Section Weights</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Algorithmic Coding (Data Structures)</span>
                <span className="font-bold text-white font-mono">40%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Concurrency & System Design</span>
                <span className="font-bold text-white font-mono">35%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>REST API & Security Patterns</span>
                <span className="font-bold text-white font-mono">25%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right 2 Cols: Questions Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Assessment Modules & Coding Challenges ({questions.length})
            </h3>
            <span className="text-xs text-slate-400">Total Duration: ~{questions.reduce((acc, q) => acc + q.timeLimitMinutes, 0)} mins</span>
          </div>

          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3 hover:border-slate-700 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600/30 text-indigo-300 text-xs font-bold font-mono">
                      {index + 1}
                    </span>
                    <h4 className="font-bold text-white text-sm">{q.title}</h4>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">⏱ {q.timeLimitMinutes} min</span>
                    <button 
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Remove question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {q.description.replace(/###/g, '').replace(/`/g, '')}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {q.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] text-indigo-400 font-medium">
                    {q.testCases.length} Test Cases ({q.testCases.filter(t => t.isHidden).length} hidden)
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Question Button */}
          <button 
            onClick={() => {
              const newQ: AssessmentQuestion = {
                id: Date.now(),
                title: 'Concurrent Transaction Balance Ledger',
                difficulty: 'Hard',
                type: 'coding',
                category: 'Concurrency',
                timeLimitMinutes: 25,
                description: 'Implement a thread-safe multi-account double-entry transaction processor with rollback mechanisms.',
                starterCode: {
                  java: 'public class LedgerProcessor { ... }',
                  typescript: 'export class LedgerProcessor { ... }',
                  python: 'class LedgerProcessor: ...'
                },
                examples: [{ input: 'Transfer $50 from A to B', output: 'Balance A: $50, Balance B: $150' }],
                constraints: ['Support 10,000 concurrent threads'],
                testCases: [{ id: 'tc-new', input: '100 concurrent transfers', expectedOutput: 'Zero balance discrepancy', isHidden: false }],
                tags: ['Concurrency', 'Transactions', 'Java 21']
              };
              setQuestions(prev => [...prev, newQ]);
            }}
            className="w-full rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/50 p-4 text-center text-xs font-semibold text-slate-400 hover:text-indigo-300 transition flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Custom Challenge or Question from Bank</span>
          </button>

        </div>

      </div>

    </div>
  );
};

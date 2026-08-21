import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Code2, 
  Terminal, 
  RotateCcw, 
  Send, 
  Bookmark, 
  Check, 
  AlertCircle,
  FileCode2,
  X,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssessmentQuestion, ActiveTab } from '../types';

interface AssessmentIDEProps {
  questions: AssessmentQuestion[];
  onSelectTab: (tab: ActiveTab) => void;
  onSubmitAssessment: (score: number) => void;
}

export const AssessmentIDE: React.FC<AssessmentIDEProps> = ({
  questions,
  onSelectTab,
  onSubmitAssessment
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'java' | 'typescript' | 'python'>('java');
  const [code, setCode] = useState<string>('');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(2660); // ~44 mins 20 secs
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<{
    status: 'idle' | 'passed' | 'failed';
    executedCases: { id: string; name: string; passed: boolean; output: string; executionMs: number }[];
    executionTimeMs?: number;
    memoryMb?: number;
    feedback?: string;
  }>({ status: 'idle', executedCases: [] });
  const [isMarkedForReview, setIsMarkedForReview] = useState<{ [key: number]: boolean }>({});
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Initialize code when question or language changes
  useEffect(() => {
    if (currentQ && currentQ.starterCode) {
      setCode(currentQ.starterCode[selectedLanguage] || currentQ.starterCode.java || '');
    }
  }, [currentQuestionIndex, selectedLanguage, currentQ]);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      setIsRunningCode(false);
      setTestResults({
        status: 'passed',
        executedCases: [
          { id: '1', name: 'Test Case 1: Sliding Window 3 reqs limit', passed: true, output: 'Result: [true, true, true, false] == Expected', executionMs: 14 },
          { id: '2', name: 'Test Case 2: Window sliding timestamp expiration', passed: true, output: 'Result: [true, true] == Expected', executionMs: 18 }
        ],
        executionTimeMs: 32,
        memoryMb: 42.4,
        feedback: 'All public test cases passed with 0 execution exceptions.'
      });
    }, 800);
  };

  const handleSubmitSolution = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTestResults({
        status: 'passed',
        executedCases: [
          { id: '1', name: 'Public Case 1: Sliding Window Capacity', passed: true, output: 'OK', executionMs: 12 },
          { id: '2', name: 'Public Case 2: Expiration Eviction', passed: true, output: 'OK', executionMs: 15 },
          { id: '3', name: 'Hidden Case 3: High-Frequency Race Condition', passed: true, output: 'OK (Thread-safe verified)', executionMs: 24 },
          { id: '4', name: 'Hidden Case 4: 10,000 Burst QPS Stress Load', passed: true, output: 'OK (P99: 0.04ms, 0 leaks)', executionMs: 38 }
        ],
        executionTimeMs: 89,
        memoryMb: 48.2,
        feedback: 'Outstanding! 4 of 4 test cases passed successfully (100% score).'
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleFinalSubmitAssessment = () => {
    setShowCelebrationModal(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] pb-4 space-y-3">
      
      {/* IDE Top Navigation Bar */}
      <div className="glass-panel rounded-xl px-4 py-2.5 border border-slate-800 flex items-center justify-between flex-shrink-0">
        
        {/* Left: Exam title and Question status */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => onSelectTab('candidate_portal')}
            className="flex items-center text-xs text-slate-400 hover:text-white transition mr-1"
          >
            <ChevronLeft className="h-4 w-4 mr-0.5" />
            <span>Portal</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800"></div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-xs">Senior Java Backend Engineering OA</span>
              <span className="rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-1.5 py-0.2">
                Q{currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
            <div className="text-[10px] text-slate-400">{currentQ.title}</div>
          </div>
        </div>

        {/* Center: Countdown Timer */}
        <div className="flex items-center space-x-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 font-mono text-xs text-amber-400">
          <Clock className="h-3.5 w-3.5 animate-pulse" />
          <span className="font-bold">{formatTime(timeLeftSeconds)}</span>
          <span className="text-[10px] text-slate-500">remaining</span>
        </div>

        {/* Right: Language Selector & Submit */}
        <div className="flex items-center space-x-3">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as any)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          >
            <option value="java">Java 21 (OpenJDK)</option>
            <option value="typescript">TypeScript 5.x</option>
            <option value="python">Python 3.12</option>
          </select>

          <button
            onClick={handleFinalSubmitAssessment}
            className="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition flex items-center space-x-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Finish & Submit</span>
          </button>
        </div>

      </div>

      {/* Main 2-Pane Split Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0 overflow-hidden">
        
        {/* Left Pane (5 Cols): Problem Statement */}
        <div className="lg:col-span-5 glass-panel rounded-2xl border border-slate-800 p-5 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              currentQ.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {currentQ.difficulty} Difficulty
            </span>
            <span className="text-[11px] text-slate-400 font-mono">⏱ Est. {currentQ.timeLimitMinutes} mins</span>
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight">{currentQ.title}</h2>

          <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
            <div className="whitespace-pre-line">
              {currentQ.description}
            </div>

            {/* Examples */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="font-bold text-white text-xs">Example 1:</div>
              {currentQ.examples.map((ex, exIdx) => (
                <div key={exIdx} className="rounded-xl bg-slate-950 p-3 border border-slate-800 space-y-1 font-mono text-[11px]">
                  <div><strong className="text-indigo-400">Input:</strong> {ex.input}</div>
                  <div><strong className="text-emerald-400">Output:</strong> {ex.output}</div>
                  {ex.explanation && <div className="text-slate-400 text-[10px] font-sans pt-1"><strong>Explanation:</strong> {ex.explanation}</div>}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <div className="font-bold text-white text-xs">Constraints:</div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400 font-mono">
                {currentQ.constraints.map((c, cIdx) => (
                  <li key={cIdx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 pt-2">
              {currentQ.tags.map((tag, tIdx) => (
                <span key={tIdx} className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane (7 Cols): Code Editor & Execution Console */}
        <div className="lg:col-span-7 flex flex-col space-y-3 min-h-0">
          
          {/* Code Editor Frame */}
          <div className="glass-panel rounded-2xl border border-slate-800 flex-1 flex flex-col overflow-hidden min-h-[300px]">
            {/* Editor Toolbar */}
            <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <span className="font-mono text-white text-[11px]">Solution.{selectedLanguage === 'java' ? 'java' : selectedLanguage === 'typescript' ? 'ts' : 'py'}</span>
              </div>
              <button
                onClick={() => setCode(currentQ.starterCode[selectedLanguage] || '')}
                className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-white transition"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Code</span>
              </button>
            </div>

            {/* Textarea Code Input */}
            <div className="flex-1 relative bg-slate-950 p-4 font-mono text-xs overflow-auto">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="w-full h-full bg-transparent text-slate-200 font-mono text-xs focus:outline-none resize-none leading-relaxed selection:bg-indigo-500/30"
              />
            </div>
          </div>

          {/* Test Execution Console & Action Buttons */}
          <div className="glass-panel rounded-2xl border border-slate-800 p-4 space-y-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Execution Console</span>
                {testResults.status === 'passed' && (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    All Tests Passed ({testResults.executionTimeMs}ms)
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isRunningCode ? 'Compiling...' : 'Run Code'}</span>
                </button>

                <button
                  onClick={handleSubmitSolution}
                  disabled={isSubmitting}
                  className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>{isSubmitting ? 'Evaluating Test Cases...' : 'Submit Solution'}</span>
                </button>
              </div>
            </div>

            {/* Test Results Output Box */}
            <div className="rounded-xl bg-slate-950 p-3 border border-slate-800 text-xs font-mono max-h-32 overflow-y-auto space-y-1.5">
              {testResults.executedCases.length > 0 ? (
                <>
                  <div className="text-[11px] text-emerald-400 font-semibold mb-1">{testResults.feedback}</div>
                  {testResults.executedCases.map((tc) => (
                    <div key={tc.id} className="flex items-center justify-between text-[11px] text-slate-300 border-b border-slate-900 pb-1">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{tc.name}</span>
                      </div>
                      <span className="text-slate-500 font-mono">{tc.executionMs}ms · {tc.output}</span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-slate-500 text-[11px] italic">
                  Press "Run Code" to test against sample test cases or "Submit Solution" to run full test suite.
                </div>
              )}
            </div>

            {/* Bottom Question Navigation Footer */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center space-x-1">
                {questions.map((q, qIdx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(qIdx)}
                    className={`h-7 w-7 rounded-lg text-xs font-bold font-mono transition ${
                      currentQuestionIndex === qIdx
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white border border-slate-800'
                    }`}
                  >
                    Q{qIdx + 1}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMarkedForReview(prev => ({ ...prev, [currentQuestionIndex]: !prev[currentQuestionIndex] }))}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                    isMarkedForReview[currentQuestionIndex] 
                      ? 'border-amber-500/40 bg-amber-500/20 text-amber-300' 
                      : 'border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bookmark className="h-3 w-3" />
                  <span>{isMarkedForReview[currentQuestionIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>

                <button
                  disabled={currentQuestionIndex === questions.length - 1}
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 text-slate-200 hover:bg-slate-800 disabled:opacity-30"
                >
                  Next →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Submission Congratulations Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md rounded-2xl border border-emerald-500/40 bg-slate-950 p-6 text-center space-y-4 shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Award className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">Assessment Completed!</h3>
              <p className="text-xs text-slate-300 mt-1">
                You scored <strong className="text-emerald-400 font-mono text-sm">94/100</strong> across all 3 coding and architectural modules.
              </p>
            </div>

            <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800 text-xs text-slate-400 space-y-1 text-left">
              <div className="flex justify-between text-slate-300">
                <span>Algorithmic Concurrency:</span>
                <span className="text-emerald-400 font-bold font-mono">100% Passed</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Code Quality & SOLID Patterns:</span>
                <span className="text-emerald-400 font-bold font-mono">96% Clean</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Proctor Telemetry Integrity:</span>
                <span className="text-emerald-400 font-bold font-mono">100% Verified</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowCelebrationModal(false);
                onSubmitAssessment(94);
                onSelectTab('candidate_portal');
              }}
              className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition"
            >
              Return to Candidate Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

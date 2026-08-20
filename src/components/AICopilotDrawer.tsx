import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Scale,
  Code2
} from 'lucide-react';
import { Candidate, JobRequisition } from '../types';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: JobRequisition;
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  onSelectTab: (tab: any) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    tab: string;
    candidateId?: string;
  };
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  selectedJob,
  candidates,
  onSelectCandidate,
  onSelectTab
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Hello! I am your TalentSphere AI Decision Support Copilot. I analyze multi-source candidate evidence (GitHub commits, Online Assessment scores, resume history, and technical deliverables) for ${selectedJob.reqCode}: "${selectedJob.title}". How can I assist your review?`,
      timestamp: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  const candidateElena = candidates.find(c => c.name.includes('Elena')) || candidates[0];
  const candidateMarcus = candidates.find(c => c.name.includes('Marcus')) || candidates[1];

  const suggestedQueries = [
    {
      label: 'Why is Elena ranked #1?',
      query: 'Why is Elena ranked #1 for this role?',
      response: `Elena ranks #1 with a 91% AI Fit Score and 94% Confidence because she has stronger role-relevant project evidence, high Online Assessment performance (88%), and verified production experience in Spring Boot, distributed concurrency, and PostgreSQL optimization.`,
      action: { label: 'View Elena\'s AI Reasoning', tab: 'decisions', candidateId: candidateElena?.id }
    },
    {
      label: 'Compare my top candidates',
      query: 'Compare my top two candidates: Elena Rodriguez and Marcus Johnson.',
      response: `Comparing Elena Rodriguez (Rank #1) and Marcus Johnson (Rank #2): Both possess strong fundamentals and 5+ years experience. Elena demonstrates stronger practical evidence in distributed systems and scored 88% on the OA. Marcus scored 72% on the OA and has moderate evidence for Docker/Kubernetes requiring verification in the technical interview.`,
      action: { label: 'Open Candidate Comparison', tab: 'comparison' }
    },
    {
      label: 'What skills need verification?',
      query: 'Which candidate skills have insufficient or moderate evidence that require verification?',
      response: `Across the shortlist:
• Docker & Kubernetes: Elena has listed Docker on resume but project evidence is moderate; Marcus has Kubernetes listed with limited external evidence.
• Recommended Action: Probe container orchestration and SQL indexing during the technical interview stage.`,
      action: { label: 'Inspect Evidence Dashboard', tab: 'evidence', candidateId: candidateElena?.id }
    },
    {
      label: 'Generate interview questions',
      query: 'Generate targeted technical interview questions for Elena Rodriguez.',
      response: `Here are 2 tailored interview questions based on Elena's verified background:
1. Concurrency & Microservices: "You have a Spring Boot service receiving 10,000 requests per minute. How would you design a rate-limiter with Redis and optimize DB connection pooling?"
2. Distributed Transactions: "How do you handle eventual consistency between Kafka event consumers and PostgreSQL read replicas?"`,
      action: { label: 'View Interview Brief', tab: 'interview_brief', candidateId: candidateElena?.id }
    }
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);

    // Simulate AI response synthesis
    setTimeout(() => {
      let aiText = `Based on multi-evidence evaluation for ${selectedJob.title}: Candidate profiles show strong alignment with core Java and distributed systems. Verified GitHub artifacts and OA results support moving top candidates to the technical interview loop.`;
      let actionBtn: any = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('elena') || lower.includes('ranked #1') || lower.includes('why')) {
        aiText = `Elena Rodriguez ranks #1 because she demonstrates strong alignment across core Java 21, Spring Boot 3, and distributed architectures, supported by 5 verified GitHub repos and an 88% OA score.`;
        actionBtn = { label: 'View Elena\'s Decision Hub', tab: 'decisions', candidateId: candidateElena?.id };
      } else if (lower.includes('compare') || lower.includes('marcus')) {
        aiText = `Comparison summary: Elena Rodriguez has a 91% fit (88% OA, strong evidence) while Marcus Johnson has an 88% fit (72% OA, moderate evidence). Elena is recommended for immediate interview scheduling.`;
        actionBtn = { label: 'Open Head-to-Head Matrix', tab: 'comparison' };
      } else if (lower.includes('skill') || lower.includes('verification') || lower.includes('evidence')) {
        aiText = `Skills requiring verification: Docker container orchestration and distributed lock management. Resume claims are consistent with general background, but require deeper verification in the technical panel.`;
        actionBtn = { label: 'Check Evidence Analysis', tab: 'evidence', candidateId: candidateElena?.id };
      } else if (lower.includes('interview') || lower.includes('question')) {
        aiText = `Generated technical question: "How would you diagnose high P99 latency in a Spring Boot service with Kafka message backpressure?" Expected rubric: checks thread pool saturation, consumer group lag, and garbage collection pauses.`;
        actionBtn = { label: 'Open Interview Brief', tab: 'interview_brief', candidateId: candidateElena?.id };
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: 'Just now',
        actionButton: actionBtn
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-indigo-500/30 bg-slate-950/95 shadow-2xl backdrop-blur-xl animate-in slide-in-from-right duration-200">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center space-x-2.5">
          <div className="rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-2 shadow-md shadow-indigo-500/20">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-sm font-bold text-white tracking-tight">TalentSphere Copilot</h2>
              <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-indigo-300 border border-indigo-500/30">
                AI Assistant
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Decision support for {selectedJob.reqCode}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Decision Support Disclaimer Badge */}
      <div className="bg-indigo-950/40 border-b border-indigo-500/20 px-4 py-2 flex items-center justify-between text-[11px] text-indigo-300">
        <div className="flex items-center space-x-1.5">
          <Scale className="h-3.5 w-3.5 text-indigo-400" />
          <span>AI Decision Support · Human recruiter makes final decision</span>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex flex-col space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
              {msg.sender === 'ai' ? (
                <>
                  <span className="font-bold text-indigo-400">TalentSphere AI</span>
                  <span className="rounded bg-indigo-950 px-1 py-0.2 text-[9px] text-indigo-300 border border-indigo-500/30">AI Demo Response</span>
                </>
              ) : (
                <span className="font-bold text-slate-300">You (Recruiter)</span>
              )}
              <span>·</span>
              <span>{msg.timestamp}</span>
            </div>

            <div 
              className={`rounded-2xl p-3.5 max-w-[90%] leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20' 
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {msg.actionButton && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      if (msg.actionButton?.candidateId && candidateElena) {
                        onSelectCandidate(candidateElena);
                      }
                      onSelectTab(msg.actionButton?.tab);
                      onClose();
                    }}
                    className="flex items-center space-x-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 px-3 py-1.5 text-xs font-semibold text-indigo-200 transition"
                  >
                    <span>{msg.actionButton.label}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center space-x-2 text-xs text-indigo-400 py-2">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span className="font-medium">Synthesizing evidence-based explanation...</span>
          </div>
        )}
      </div>

      {/* Quick Suggested Queries Chips */}
      <div className="border-t border-slate-800/80 p-3 bg-slate-950/70 space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
          <Sparkles className="h-3 w-3 text-amber-400" />
          <span>Suggested Questions:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {suggestedQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(item.query)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-300 hover:border-indigo-500/50 hover:bg-indigo-950/40 hover:text-indigo-200 transition text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="border-t border-slate-800 p-3 bg-slate-950">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input 
            type="text" 
            placeholder="Ask about candidate fit, skills, evidence..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isGenerating}
            className="rounded-xl bg-indigo-600 p-2 text-white hover:bg-indigo-500 transition disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

    </div>
  );
};

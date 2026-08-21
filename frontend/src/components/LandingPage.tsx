import React from 'react';
import { 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  FileCode2, 
  Scale, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  GitCompare, 
  Search, 
  Layers, 
  BarChart3,
  Lock,
  Cpu,
  Play
} from 'lucide-react';
import { UserRole, ActiveTab } from '../types';

interface LandingPageProps {
  onEnterRole: (role: UserRole) => void;
  onOpenSignIn: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterRole,
  onOpenSignIn,
  onExploreDemo
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Sparkles className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg text-white tracking-tight">TalentSphere</span>
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/30">AI</span>
              </div>
              <p className="text-[11px] text-slate-400">Recruitment Decision Support</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onEnterRole('candidate')}
              className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              <GraduationCap className="h-4 w-4 text-emerald-400" />
              <span>Candidate Portal</span>
            </button>

            <button
              onClick={() => onEnterRole('recruiter')}
              className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition"
            >
              <Briefcase className="h-4 w-4" />
              <span>Enter Recruiter Workspace</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center space-y-4 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3 py-1 text-xs font-medium text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Evidence-Based AI Decision Support · Human-in-the-Loop</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Stop Guessing on Resumes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200">
              Verify Engineering Evidence.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            TalentSphere AI correlates candidate resumes with real GitHub commits, bespoke online coding assessments, and multi-factor decision intelligence to deliver objective hiring recommendations.
          </p>

          {/* Quick Dual Role Launch Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 text-left max-w-2xl mx-auto">
            
            {/* Recruiter Card */}
            <div 
              onClick={() => onEnterRole('recruiter')}
              className="group relative rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-slate-900/90 p-5 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/10 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="rounded-xl bg-indigo-600/20 p-2.5 text-indigo-400 border border-indigo-500/30">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                  Recruiter Mode
                </span>
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition flex items-center">
                <span>Recruiter Command Center</span>
                <ArrowRight className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Rank talent with multi-evidence scores, build bespoke technical OAs, compare candidates head-to-head, and track audit trails.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-indigo-400 font-semibold">
                <span>Account: demo.recruiter@talentsphere.local</span>
                <span>Launch →</span>
              </div>
            </div>

            {/* Candidate Card */}
            <div 
              onClick={() => onEnterRole('candidate')}
              className="group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/30 to-slate-900/90 p-5 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/10 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="rounded-xl bg-emerald-600/20 p-2.5 text-emerald-400 border border-emerald-500/30">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  Candidate Mode
                </span>
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-emerald-300 transition flex items-center">
                <span>Candidate Portal & OA IDE</span>
                <ArrowRight className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Track live application progress, take live coding assessments in browser IDE, verify GitHub proof, and receive transparent feedback.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                <span>Account: demo.candidate@talentsphere.local</span>
                <span>Launch →</span>
              </div>
            </div>

          </div>

        </div>

        {/* Feature Grid Breakdown */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20 w-fit">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Evidence-Based Dossier</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes actual GitHub repos, commit frequency, code architecture, and project complexity rather than self-reported resume bullets.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400 border border-amber-500/20 w-fit">
              <FileCode2 className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Bespoke OA Builder</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically creates coding challenges mapped to your job description with built-in test-cases, time limits, and browser IDE simulation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 border border-cyan-500/20 w-fit">
              <GitCompare className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Head-to-Head Comparison</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compare candidate strengths, skill gaps, OA pass rates, and AI reasoning side-by-side to make confident hiring decisions.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20 w-fit">
              <Scale className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-white text-sm">Human-in-the-Loop Audit</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI provides transparent reasoning and recommendations. Recruiters can tune scoring weights and record overrides in an immutable audit log.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TalentSphere AI · Recruitment Decision Support Prototype</span>
          <span>Human-in-the-Loop Evaluation Engine</span>
        </div>
      </footer>

    </div>
  );
};

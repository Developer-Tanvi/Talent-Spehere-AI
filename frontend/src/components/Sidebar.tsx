import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase,
  UserPlus,
  Users, 
  UserCheck, 
  GitCompare, 
  Scale, 
  ShieldCheck, 
  FileCode2, 
  MessageSquareCode, 
  Kanban, 
  BarChart3, 
  History, 
  HelpCircle,
  Settings,
  Sparkles,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import { ActiveTab, UserRole, JobRequisition } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentRole: UserRole;
  candidatesCount: number;
  activeJob: JobRequisition;
  onOpenWeightsModal: () => void;
  onSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentRole,
  candidatesCount,
  activeJob,
  onOpenWeightsModal,
  onSignOut
}) => {
  const sections = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'overview' as ActiveTab, label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
        { id: 'jobs' as ActiveTab, label: 'Jobs & Requisitions', icon: Briefcase, badge: '12' },
        { id: 'sourcing' as ActiveTab, label: 'Candidate Sourcing', icon: UserPlus, badge: 'New' }
      ]
    },
    {
      title: 'CANDIDATES & PIPELINE',
      items: [
        { id: 'candidates' as ActiveTab, label: 'Candidate Ranking', icon: Users, badge: candidatesCount.toString() },
        { id: 'profile' as ActiveTab, label: 'Candidate Dossier', icon: UserCheck, badge: '94%' },
        { id: 'comparison' as ActiveTab, label: 'Head-to-Head Compare', icon: GitCompare, badge: 'VS' },
        { id: 'pipeline' as ActiveTab, label: 'Hiring Pipeline', icon: Kanban, badge: null }
      ]
    },
    {
      title: 'ASSESSMENT & INTERVIEW',
      items: [
        { id: 'assessments' as ActiveTab, label: 'Assessment Builder', icon: FileCode2, badge: 'OA' },
        { id: 'interview_brief' as ActiveTab, label: 'Interview Brief & Rubric', icon: MessageSquareCode, badge: null }
      ]
    },
    {
      title: 'DECISION INTELLIGENCE',
      items: [
        { id: 'decisions' as ActiveTab, label: 'Decision Intelligence', icon: Scale, badge: 'AI' },
        { id: 'evidence' as ActiveTab, label: 'Evidence Analysis', icon: ShieldCheck, badge: 'Verified' }
      ]
    },
    {
      title: 'GOVERNANCE & INSIGHTS',
      items: [
        { id: 'analytics' as ActiveTab, label: 'Analytics & Funnel', icon: BarChart3, badge: null },
        { id: 'audit' as ActiveTab, label: 'Decision Audit Log', icon: History, badge: 'Live' }
      ]
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800/80 bg-slate-950/70 p-3.5 flex flex-col justify-between hidden md:flex overflow-y-auto">
      <div className="space-y-5">
        
        {/* Active Context Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
            <span>Active Role</span>
            <span className="text-emerald-400 font-semibold">{activeJob.status}</span>
          </div>
          <div className="text-xs font-bold text-white truncate">{activeJob.title}</div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{activeJob.reqCode} · {activeJob.department}</div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-4">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                        isActive
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm font-semibold'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <Icon className={`h-3.5 w-3.5 flex-shrink-0 transition ${
                          isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] rounded-full px-1.5 py-0.2 font-semibold ${
                          isActive 
                            ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/30' 
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* AI System Status Widget (Accurate, Human-in-the-Loop Copy) */}
        <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/40 to-slate-900/60 p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-indigo-400" />
              <span>AI Decision Engine</span>
            </span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Multi-evidence scoring active. Recommendations require recruiter review.
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Human-in-the-loop</span>
            <button 
              onClick={onOpenWeightsModal}
              className="text-indigo-400 hover:underline flex items-center space-x-0.5"
            >
              <span>Tune Weights</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Footer Controls */}
      <div className="pt-3 border-t border-slate-800/80 space-y-1 text-xs text-slate-400">
        <button 
          onClick={onOpenWeightsModal}
          className="flex w-full items-center space-x-2.5 rounded-lg px-2.5 py-1.5 hover:bg-slate-900 hover:text-slate-200 transition text-[11px]"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-400" />
          <span>Calibrate AI Scoring</span>
        </button>
        <button 
          onClick={onSignOut}
          className="flex w-full items-center space-x-2.5 rounded-lg px-2.5 py-1.5 hover:bg-slate-900 hover:text-rose-300 transition text-[11px] text-slate-400"
        >
          <LogOut className="h-3.5 w-3.5 text-slate-400" />
          <span>Switch Role / Exit Demo</span>
        </button>
      </div>
    </aside>
  );
};

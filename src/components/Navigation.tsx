import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Bell, 
  UserCheck, 
  Briefcase, 
  ChevronDown, 
  GraduationCap, 
  Zap, 
  Layers,
  LogOut,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { UserRole, JobRequisition, ActiveTab } from '../types';
import { NotificationsDropdown, AppNotification } from './NotificationsDropdown';

interface NavigationProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  selectedJob: JobRequisition;
  jobs: JobRequisition[];
  onSelectJob: (job: JobRequisition) => void;
  onOpenCreateJob: () => void;
  onToggleCopilot: () => void;
  isCopilotOpen: boolean;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSignIn: () => void;
  onOpenWeightsModal: () => void;
  notifications: AppNotification[];
  onNotificationClick: (notif: AppNotification) => void;
  onMarkAllNotificationsRead: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentRole,
  onRoleChange,
  selectedJob,
  jobs,
  onSelectJob,
  onOpenCreateJob,
  onToggleCopilot,
  isCopilotOpen,
  onSelectTab,
  onOpenSignIn,
  onOpenWeightsModal,
  notifications,
  onNotificationClick,
  onMarkAllNotificationsRead
}) => {
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo & Requisition Selector */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div 
            onClick={() => onSelectTab('landing')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
            title="Go to Landing Page"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Sparkles className="h-4 w-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base text-white tracking-tight">TalentSphere</span>
                <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-indigo-400 border border-indigo-500/30">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Recruitment Decision Support</p>
            </div>
          </div>

          {/* Recruiter Active Requisition Switcher */}
          {currentRole === 'recruiter' && (
            <div className="relative hidden md:block">
              <button 
                onClick={() => setShowJobDropdown(!showJobDropdown)}
                className="flex items-center space-x-2 rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-700 hover:bg-slate-850 transition"
              >
                <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
                <span className="font-medium text-slate-300 font-mono">{selectedJob.reqCode}:</span>
                <span className="max-w-[130px] truncate text-white font-semibold">{selectedJob.title}</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-0.5" />
              </button>

              {showJobDropdown && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl z-50 animate-in fade-in">
                  <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Active Requisitions</span>
                    <button 
                      onClick={() => { setShowJobDropdown(false); onOpenCreateJob(); }}
                      className="text-indigo-400 hover:underline text-[10px]"
                    >
                      + New
                    </button>
                  </div>
                  <div className="space-y-1">
                    {jobs.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => {
                          onSelectJob(job);
                          setShowJobDropdown(false);
                        }}
                        className={`w-full text-left rounded-lg px-3 py-2 text-xs transition flex items-center justify-between ${
                          selectedJob.id === job.id 
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold' 
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-white">{job.title}</div>
                          <div className="text-[10px] text-slate-400">{job.reqCode} · {job.department}</div>
                        </div>
                        <span className="text-[10px] rounded-full bg-slate-800 px-2 py-0.5 text-slate-400">
                          {job.applicantsCount} apps
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentRole === 'recruiter' ? "Search candidates, skills, evidence..." : "Search jobs, skills, practice questions..."}
              className="w-full rounded-lg border border-slate-800 bg-slate-900/80 pl-8 pr-4 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Role Switcher & Action Tools */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          
          {/* Dual Role Switcher Pill */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/90 p-0.5">
            <button
              onClick={() => onRoleChange('recruiter')}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                currentRole === 'recruiter' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Recruiter</span>
            </button>
            <button
              onClick={() => onRoleChange('candidate')}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                currentRole === 'candidate' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Candidate</span>
            </button>
          </div>

          {/* AI Copilot Toggle Button */}
          {currentRole === 'recruiter' && (
            <button
              onClick={onToggleCopilot}
              className={`relative flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                isCopilotOpen 
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-md shadow-indigo-500/20' 
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden md:inline">AI Copilot</span>
            </button>
          )}

          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}

            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              notifications={notifications}
              onNotificationClick={onNotificationClick}
              onMarkAllAsRead={onMarkAllNotificationsRead}
            />
          </div>

          {/* User Profile Avatar / Demo Switcher */}
          <div 
            onClick={onOpenSignIn}
            className="flex items-center space-x-2 border-l border-slate-800 pl-2.5 cursor-pointer group"
            title="Click to Switch User / Demo Account"
          >
            <img 
              src={currentRole === 'recruiter' 
                ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
              } 
              alt="User Avatar" 
              className="h-8 w-8 rounded-full border border-indigo-500/40 object-cover ring-2 ring-slate-900 group-hover:border-indigo-400 transition"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition">
                {currentRole === 'recruiter' ? 'Sarah Jenkins' : 'Elena Rodriguez'}
              </div>
              <div className="text-[10px] text-slate-400">
                {currentRole === 'recruiter' ? 'demo.recruiter' : 'demo.candidate'}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

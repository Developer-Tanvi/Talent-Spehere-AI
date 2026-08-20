import React, { useState } from 'react';
import { 
  Lock, 
  Sparkles, 
  X, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound
} from 'lucide-react';
import { UserRole } from '../types';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (role: UserRole, email: string) => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSignInSuccess
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('recruiter');
  const [email, setEmail] = useState('demo.recruiter@talentsphere.local');
  const [password, setPassword] = useState('••••••••••••');

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'recruiter') {
      setEmail('demo.recruiter@talentsphere.local');
    } else {
      setEmail('demo.candidate@talentsphere.local');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignInSuccess(selectedRole, email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-5 shadow-2xl relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand header */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">TalentSphere AI Sign In</h2>
            <p className="text-xs text-slate-400">Select demo account credentials to proceed</p>
          </div>
        </div>

        {/* Demo role toggle pills */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleRoleSelect('recruiter')}
            className={`flex items-center justify-center space-x-2 rounded-lg py-2 text-xs font-semibold transition ${
              selectedRole === 'recruiter'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Recruiter</span>
          </button>
          
          <button
            type="button"
            onClick={() => handleRoleSelect('candidate')}
            className={`flex items-center justify-center space-x-2 rounded-lg py-2 text-xs font-semibold transition ${
              selectedRole === 'candidate'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Candidate</span>
          </button>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Account</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3 text-[11px] text-indigo-300 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold">
              <KeyRound className="h-3.5 w-3.5 text-indigo-400" />
              <span>Demo Account Credentials</span>
            </div>
            <p className="text-slate-400">
              {selectedRole === 'recruiter' 
                ? 'Loads Recruiter Command Center with 12 requisitions and full candidate intelligence.'
                : 'Loads Candidate Portal with active Senior Java Engineer application and OA Exam.'}
            </p>
          </div>

          <button
            type="submit"
            className={`w-full flex items-center justify-center space-x-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-lg transition ${
              selectedRole === 'recruiter'
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
            }`}
          >
            <span>Sign In to {selectedRole === 'recruiter' ? 'Recruiter' : 'Candidate'} Workspace</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  Code2, 
  Sparkles,
  Link2
} from 'lucide-react';

interface ConnectEvidenceModalProps {
  isOpen: boolean;
  platformName: string;
  onClose: () => void;
  onConnected: (platformName: string, accountHandle: string) => void;
}

export const ConnectEvidenceModal: React.FC<ConnectEvidenceModalProps> = ({
  isOpen,
  platformName,
  onClose,
  onConnected
}) => {
  if (!isOpen) return null;

  const [accountHandle, setAccountHandle] = useState('elena_dev_99');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSimulateConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthorizing(true);

    setTimeout(() => {
      setIsAuthorizing(false);
      setIsDone(true);
      setTimeout(() => {
        onConnected(platformName, accountHandle);
        setIsDone(false);
        onClose();
      }, 900);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Connect {platformName}</h3>
              <p className="text-xs text-slate-400">Simulate evidence integration</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h4 className="text-sm font-bold text-white">Connection Verified!</h4>
            <p className="text-xs text-slate-400">
              {platformName} profile <strong className="text-slate-200">@{accountHandle}</strong> linked to evidence dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSimulateConnect} className="space-y-4 text-xs">
            <div className="rounded-xl bg-indigo-950/30 p-3.5 border border-indigo-500/30 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-indigo-300 font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Evidence Verification Simulation</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Connect your {platformName} account to verify contest ratings, algorithmic solutions, and project contributions.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">{platformName} Username / Handle</label>
              <input 
                type="text" 
                required
                value={accountHandle}
                onChange={(e) => setAccountHandle(e.target.value)}
                placeholder={`e.g. your_${platformName.toLowerCase()}_handle`}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-500">
              <Lock className="h-3.5 w-3.5 text-indigo-400" />
              <span>Read-only profile verification token · No write permissions requested</span>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-slate-300 hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAuthorizing}
                className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
              >
                {isAuthorizing ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Verifying {platformName}...</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Authorize & Link</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

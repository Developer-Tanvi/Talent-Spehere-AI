import React, { useState } from 'react';
import { 
  History, 
  ShieldCheck, 
  Filter, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal, 
  ExternalLink, 
  UserCheck,
  Calendar,
  Lock
} from 'lucide-react';
import { AuditLogEntry, ActiveTab } from '../types';

interface AuditLogProps {
  auditLogs: AuditLogEntry[];
  onSelectTab: (tab: ActiveTab) => void;
}

export const AuditLog: React.FC<AuditLogProps> = ({
  auditLogs,
  onSelectTab
}) => {
  const [filterType, setFilterType] = useState<'all' | 'overrides' | 'approved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<AuditLogEntry | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recruiterName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterType === 'all' || 
      (filterType === 'overrides' && log.isOverride) ||
      (filterType === 'approved' && !log.isOverride);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <button onClick={() => onSelectTab('overview')} className="hover:text-white">Dashboard</button>
            <span>/</span>
            <span className="text-indigo-400 font-medium">Compliance & Audit</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <History className="h-6 w-6 text-indigo-400" />
            <span>Decision History & Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable, explainable log of AI recommendations, human recruiter overrides, and hiring decisions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 px-3.5 py-1.5 flex items-center space-x-2">
            <Lock className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300">SOC2 & EEOC Certified</span>
          </div>
        </div>
      </div>

      {/* Top 4 Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-slate-800">
          <div className="text-xs text-slate-400">Total Logged Decisions</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">1,248</div>
          <div className="text-[10px] text-slate-500 mt-1">100% cryptographic ledger</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-slate-800">
          <div className="text-xs text-slate-400">AI Alignment Rate</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">92.4%</div>
          <div className="text-[10px] text-emerald-400/80 mt-1">High recruiter consensus</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-slate-800">
          <div className="text-xs text-slate-400">Human Overrides</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">94</div>
          <div className="text-[10px] text-slate-500 mt-1">7.6% of candidate decisions</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-slate-800">
          <div className="text-xs text-slate-400">Demographic Bias Invariance</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">99.8%</div>
          <div className="text-[10px] text-cyan-400/80 mt-1">Zero protected class skew</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          {[
            { id: 'all', label: 'All Log Entries' },
            { id: 'approved', label: 'AI Endorsed' },
            { id: 'overrides', label: 'Human Overrides' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filterType === f.id
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search audit trail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Job Requisition</th>
                <th className="py-3 px-4">AI Rec & Score</th>
                <th className="py-3 px-4">Recruiter Action</th>
                <th className="py-3 px-4">Reviewer</th>
                <th className="py-3 px-4">Decision Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id}
                  onClick={() => setSelectedEntry(log)}
                  className="hover:bg-slate-900/60 transition cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2.5">
                      <img src={log.candidateAvatar} alt={log.candidateName} className="h-7 w-7 rounded-full object-cover border border-slate-700" />
                      <span className="font-bold text-white text-xs">{log.candidateName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{log.jobTitle}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-emerald-400 font-mono">{log.aiFitScore}%</span>
                      <span className="text-[10px] text-slate-400">({log.aiRecommendation})</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      log.isOverride 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {log.recruiterAction}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">{log.recruiterName}</td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate text-[11px]">{log.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Audit Log Entry Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <History className="h-5 w-5 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Audit Record: {selectedEntry.id}</h3>
              </div>
              <button onClick={() => setSelectedEntry(null)} className="text-slate-400 hover:text-white text-xs">✕ Close</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Candidate:</span>
                <span className="font-bold text-white">{selectedEntry.candidateName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Requisition:</span>
                <span>{selectedEntry.jobTitle}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-mono">{selectedEntry.timestamp}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Reviewer:</span>
                <span>{selectedEntry.recruiterName}</span>
              </div>

              <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-bold text-indigo-400">Reviewer Justification & Notes:</div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{selectedEntry.notes}</p>
              </div>

              <div className="text-[10px] text-slate-500 font-mono">
                SHA-256 Block Signature: e7c9a4b281f009e4d1567bc4a112093... (Verified)
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setSelectedEntry(null)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

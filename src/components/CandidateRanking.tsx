import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  CheckSquare, 
  Square, 
  GitCompare, 
  Calendar, 
  ExternalLink,
  Download,
  Mail,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Candidate, JobRequisition, ActiveTab } from '../types';

interface CandidateRankingProps {
  candidates: Candidate[];
  selectedJob: JobRequisition;
  onSelectCandidate: (candidate: Candidate) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenWeightsModal: () => void;
  onOpenScheduleModal: (candidate: Candidate) => void;
  onStartComparison: (candA: Candidate, candB: Candidate) => void;
}

export const CandidateRanking: React.FC<CandidateRankingProps> = ({
  candidates,
  selectedJob,
  onSelectCandidate,
  onSelectTab,
  onOpenWeightsModal,
  onOpenScheduleModal,
  onStartComparison
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<'fitScore' | 'oaPerformance' | 'experienceYears'>('fitScore');
  const [sortAsc, setSortAsc] = useState(false);

  const toggleSelectCandidate = (id: string) => {
    setSelectedCandidateIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidateIds.length === filteredCandidates.length) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(filteredCandidates.map(c => c.id));
    }
  };

  const filteredCandidates = candidates
    .filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.topMatchedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'oa_completed' && c.status === 'oa_completed') ||
        (statusFilter === 'interview' && (c.status === 'interview_scheduled' || c.status === 'interview_completed')) ||
        (statusFilter === 'needs_review' && c.recommendation === 'NEEDS_REVIEW');

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let valA = a[sortField] || 0;
      let valB = b[sortField] || 0;
      if (sortField === 'oaPerformance') {
        valA = a.oaResult?.totalScore || 0;
        valB = b.oaResult?.totalScore || 0;
      }
      return sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

  const handleCompareSelected = () => {
    if (selectedCandidateIds.length >= 2) {
      const candA = candidates.find(c => c.id === selectedCandidateIds[0]);
      const candB = candidates.find(c => c.id === selectedCandidateIds[1]);
      if (candA && candB) {
        onStartComparison(candA, candB);
      }
    } else if (candidates.length >= 2) {
      onStartComparison(candidates[0], candidates[1]);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Requisition Header & Quick Summary */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="rounded-md bg-indigo-500/20 px-2 py-0.5 text-xs font-bold text-indigo-400 border border-indigo-500/30">
                {selectedJob.reqCode}
              </span>
              <h1 className="text-xl font-bold text-white tracking-tight">{selectedJob.title}</h1>
              <span className="text-xs text-slate-400">· {selectedJob.department} ({selectedJob.location})</span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 max-w-3xl">
              Targeting candidates proficient in {selectedJob.requiredSkills.join(', ')}. Scored using multi-evidence decision algorithms.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenWeightsModal}
              className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-400" />
              <span>Adjust AI Weights</span>
            </button>
            <button
              onClick={handleCompareSelected}
              className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
            >
              <GitCompare className="h-3.5 w-3.5" />
              <span>Compare Candidates ({selectedCandidateIds.length || 2})</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Applicants', count: candidates.length },
              { id: 'oa_completed', label: 'OA Completed', count: candidates.filter(c => c.status === 'oa_completed').length },
              { id: 'interview', label: 'Interview Scheduled', count: candidates.filter(c => c.status === 'interview_scheduled').length },
              { id: 'needs_review', label: 'Needs Review', count: candidates.filter(c => c.recommendation === 'NEEDS_REVIEW').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  statusFilter === tab.id
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-400">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by skill, name, company..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950/80 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button 
              onClick={() => setSortAsc(!sortAsc)} 
              className="flex items-center space-x-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              title="Toggle Sort Ascending/Descending"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Candidates Ranking Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3.5 pl-4 pr-2 w-10">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-white">
                    {selectedCandidateIds.length === filteredCandidates.length && filteredCandidates.length > 0 ? (
                      <CheckSquare className="h-4 w-4 text-indigo-400" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-300">Candidate</th>
                <th className="py-3.5 px-4 font-semibold text-slate-300">
                  <button 
                    onClick={() => { setSortField('fitScore'); setSortAsc(!sortAsc); }}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>AI Fit Score</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-300">
                  <button 
                    onClick={() => { setSortField('oaPerformance'); setSortAsc(!sortAsc); }}
                    className="flex items-center space-x-1 hover:text-white"
                  >
                    <span>OA Score</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="py-3.5 px-4 font-semibold text-slate-300">Top Matched Skills</th>
                <th className="py-3.5 px-4 font-semibold text-slate-300">AI Reasoning Summary</th>
                <th className="py-3.5 px-4 font-semibold text-slate-300">Status</th>
                <th className="py-3.5 px-4 text-right font-semibold text-slate-300">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {filteredCandidates.map((candidate, idx) => {
                const isSelected = selectedCandidateIds.includes(candidate.id);
                return (
                  <tr 
                    key={candidate.id}
                    className={`hover:bg-slate-900/60 transition group ${isSelected ? 'bg-indigo-950/20' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 pl-4 pr-2">
                      <button onClick={() => toggleSelectCandidate(candidate.id)} className="text-slate-500 hover:text-indigo-400">
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-indigo-400" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                    </td>

                    {/* Candidate Identity */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={candidate.avatar} 
                            alt={candidate.name} 
                            className="h-10 w-10 rounded-full object-cover border border-indigo-500/30"
                          />
                          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-bold text-white ring-1 ring-slate-950">
                            ✓
                          </span>
                        </div>
                        <div>
                          <div 
                            onClick={() => {
                              onSelectCandidate(candidate);
                              onSelectTab('profile');
                            }}
                            className="font-bold text-white group-hover:text-indigo-300 transition cursor-pointer text-sm"
                          >
                            {candidate.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{candidate.title} · {candidate.currentCompany} ({candidate.experienceYears}y)</div>
                          <div className="text-[10px] text-slate-500">{candidate.location}</div>
                        </div>
                      </div>
                    </td>

                    {/* AI Fit Score */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <span className={`text-base font-extrabold font-mono ${
                            candidate.fitScore >= 90 ? 'text-emerald-400' : candidate.fitScore >= 80 ? 'text-indigo-400' : 'text-amber-400'
                          }`}>
                            {candidate.fitScore}%
                          </span>
                          <div className="text-[10px] text-slate-500">{candidate.confidenceScore}% conf</div>
                        </div>
                        <div className="w-12 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              candidate.fitScore >= 90 ? 'bg-emerald-500' : candidate.fitScore >= 80 ? 'bg-indigo-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${candidate.fitScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* OA Score */}
                    <td className="py-4 px-4">
                      {candidate.oaResult ? (
                        <div className="space-y-0.5">
                          <span className="font-bold font-mono text-white text-xs">{candidate.oaResult.totalScore}%</span>
                          <div className="text-[10px] text-emerald-400 flex items-center">
                            <ShieldCheck className="h-3 w-3 mr-0.5" /> 99% trust
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-xs">Pending OA</span>
                      )}
                    </td>

                    {/* Top Matched Skills */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {candidate.topMatchedSkills.slice(0, 3).map((skill, sIdx) => (
                          <span key={sIdx} className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                            {skill}
                          </span>
                        ))}
                        {candidate.topMatchedSkills.length > 3 && (
                          <span className="text-[10px] text-slate-500 self-center">
                            +{candidate.topMatchedSkills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* AI Reasoning Summary */}
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                        {candidate.recommendationReason}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        candidate.recommendation === 'PROCEED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : candidate.recommendation === 'NEEDS_REVIEW'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}>
                        {candidate.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => {
                            onSelectCandidate(candidate);
                            onSelectTab('profile');
                          }}
                          className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 hover:border-indigo-500 hover:bg-indigo-600 hover:text-white transition font-medium"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => onOpenScheduleModal(candidate)}
                          className="rounded-lg bg-indigo-600/80 hover:bg-indigo-500 p-1.5 text-white transition"
                          title="Schedule Interview"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-slate-800 bg-slate-900/60 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <strong className="text-white font-semibold">{filteredCandidates.length}</strong> candidates for {selectedJob.reqCode}
          </div>
          <div className="flex items-center space-x-2">
            <button className="rounded border border-slate-800 bg-slate-950 px-2 py-1 hover:bg-slate-900 disabled:opacity-40" disabled>
              Previous
            </button>
            <span className="font-mono text-white">Page 1 of 1</span>
            <button className="rounded border border-slate-800 bg-slate-950 px-2 py-1 hover:bg-slate-900 disabled:opacity-40" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Upload, 
  SlidersHorizontal, 
  Users, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  MapPin,
  Sparkles,
  Layers,
  Filter,
  FileText
} from 'lucide-react';
import { JobRequisition, ActiveTab } from '../types';

interface JobsListProps {
  jobs: JobRequisition[];
  selectedJob: JobRequisition;
  onSelectJob: (job: JobRequisition) => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenCreateJob: () => void;
  onOpenWeightsModal: () => void;
}

export const JobsList: React.FC<JobsListProps> = ({
  jobs,
  selectedJob,
  onSelectJob,
  onSelectTab,
  onOpenCreateJob,
  onOpenWeightsModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Paused' | 'Closed'>('All');
  const [isUploadingJD, setIsUploadingJD] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.reqCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSimulateJDUpload = () => {
    setIsUploadingJD(true);
    setTimeout(() => {
      setIsUploadingJD(false);
      setUploadSuccess("JD 'Senior Cloud Platform Architect' uploaded and parsed into 8 verified skill criteria!");
      setTimeout(() => setUploadSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-indigo-400 font-medium">Requisitions</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-indigo-400" />
            <span>Job Requisitions & JDs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage active roles, upload job descriptions, adjust scoring weights, and monitor pipeline health.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleSimulateJDUpload}
            disabled={isUploadingJD}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            <Upload className="h-3.5 w-3.5 text-indigo-400" />
            <span>{isUploadingJD ? 'Parsing JD PDF...' : 'Upload JD Document'}</span>
          </button>

          <button
            onClick={onOpenCreateJob}
            className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Create Requisition</span>
          </button>
        </div>
      </div>

      {/* Upload Success Alert */}
      {uploadSuccess && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{uploadSuccess}</span>
          </div>
          <button onClick={() => setUploadSuccess(null)} className="text-emerald-400 hover:text-white">Dismiss</button>
        </div>
      )}

      {/* Requisitions Filters & Search */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Status filter pills */}
        <div className="flex items-center space-x-1.5">
          {(['All', 'Active', 'Paused', 'Closed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                statusFilter === tab
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {tab} Roles ({tab === 'All' ? jobs.length : jobs.filter(j => j.status === tab).length})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, req code, skill..."
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Jobs Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const isCurrentSelected = selectedJob.id === job.id;
          return (
            <div 
              key={job.id}
              className={`glass-panel rounded-2xl p-5 border transition flex flex-col justify-between space-y-4 hover:border-slate-700 ${
                isCurrentSelected ? 'border-indigo-500/50 bg-indigo-950/15 ring-1 ring-indigo-500/30' : 'border-slate-800'
              }`}
            >
              <div className="space-y-3">
                
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800">
                      {job.reqCode}
                    </span>
                    <h3 className="font-bold text-white text-base mt-1.5 line-clamp-1">{job.title}</h3>
                    <p className="text-xs text-slate-400">{job.department} · {job.location}</p>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {job.status}
                  </span>
                </div>

                {/* Job metadata pills */}
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800">
                    {job.seniority} Level
                  </span>
                  <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800">
                    {job.salaryRange}
                  </span>
                  <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800">
                    {job.minExperienceYears}+ yrs exp
                  </span>
                </div>

                {/* Skills tags */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Core Target Skills
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.slice(0, 4).map((skill, sIdx) => (
                      <span key={sIdx} className="rounded bg-indigo-950/60 text-indigo-300 px-2 py-0.5 text-[10px] border border-indigo-500/20">
                        {skill}
                      </span>
                    ))}
                    {job.requiredSkills.length > 4 && (
                      <span className="text-[10px] text-slate-500 self-center">
                        +{job.requiredSkills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Funnel Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                  <div className="rounded-lg bg-slate-900/60 p-2 border border-slate-850">
                    <div className="text-sm font-bold text-white font-mono">{job.applicantsCount}</div>
                    <div className="text-[10px] text-slate-400">Applicants</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/60 p-2 border border-slate-850">
                    <div className="text-sm font-bold text-indigo-300 font-mono">{job.shortlistedCount}</div>
                    <div className="text-[10px] text-slate-400">Shortlisted</div>
                  </div>
                  <div className="rounded-lg bg-slate-900/60 p-2 border border-slate-850">
                    <div className="text-sm font-bold text-emerald-400 font-mono">{job.interviewingCount}</div>
                    <div className="text-[10px] text-slate-400">Interviews</div>
                  </div>
                </div>

              </div>

              {/* Action Buttons Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    onSelectJob(job);
                    onSelectTab('candidates');
                  }}
                  className="flex-1 flex items-center justify-center space-x-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition"
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>View Ranking</span>
                </button>

                <button
                  onClick={() => {
                    onSelectJob(job);
                    onOpenWeightsModal();
                  }}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  title="Adjust AI Weights"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-400" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

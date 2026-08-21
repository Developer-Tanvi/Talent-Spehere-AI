import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  User, 
  Briefcase, 
  Code2, 
  FileCode2, 
  ArrowRight,
  ShieldCheck,
  Star,
  Layers
} from 'lucide-react';
import { Candidate, JobRequisition, AssessmentQuestion, ActiveTab } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  jobs: JobRequisition[];
  questions: AssessmentQuestion[];
  onSelectCandidate: (candidate: Candidate) => void;
  onSelectJob: (job: JobRequisition) => void;
  onSelectTab: (tab: ActiveTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  candidates,
  jobs,
  questions,
  onSelectCandidate,
  onSelectJob,
  onSelectTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'candidates' | 'jobs' | 'assessments'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const query = searchTerm.toLowerCase().trim();

  const filteredCandidates = candidates.filter(c => 
    !query || 
    c.name.toLowerCase().includes(query) ||
    c.title.toLowerCase().includes(query) ||
    c.topMatchedSkills.some(s => s.toLowerCase().includes(query)) ||
    c.verifiedSkills.some(s => s.name.toLowerCase().includes(query))
  );

  const filteredJobs = jobs.filter(j => 
    !query ||
    j.title.toLowerCase().includes(query) ||
    j.reqCode.toLowerCase().includes(query) ||
    j.department.toLowerCase().includes(query) ||
    j.requiredSkills.some(s => s.toLowerCase().includes(query))
  );

  const filteredQuestions = questions.filter(q =>
    !query ||
    q.title.toLowerCase().includes(query) ||
    q.section.toLowerCase().includes(query) ||
    q.difficulty.toLowerCase().includes(query)
  );

  const totalResults = (activeCategory === 'all' || activeCategory === 'candidates' ? filteredCandidates.length : 0) +
    (activeCategory === 'all' || activeCategory === 'jobs' ? filteredJobs.length : 0) +
    (activeCategory === 'all' || activeCategory === 'assessments' ? filteredQuestions.length : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Header Bar */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3.5 bg-slate-900/80">
          <Search className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0" />
          <input 
            type="text" 
            autoFocus
            placeholder="Search candidates, requisitions, skills, code challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-white mr-2">
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
            ESC
          </kbd>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 border-b border-slate-800/80 px-4 py-2 bg-slate-950/90 text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'candidates', label: `Candidates (${filteredCandidates.length})` },
            { id: 'jobs', label: `Jobs (${filteredJobs.length})` },
            { id: 'assessments', label: `OA Questions (${filteredQuestions.length})` }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`rounded-lg px-2.5 py-1 font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {totalResults === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <p>No results found for "{searchTerm}".</p>
              <p className="text-[11px] text-slate-600">Try searching for "Java", "Elena", "Spring Boot", or "REQ-1042".</p>
            </div>
          ) : (
            <>
              {/* Candidates Section */}
              {(activeCategory === 'all' || activeCategory === 'candidates') && filteredCandidates.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 px-1">
                    <User className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Candidate Intelligence Profiles</span>
                  </div>

                  <div className="space-y-1.5">
                    {filteredCandidates.map(candidate => (
                      <div
                        key={candidate.id}
                        onClick={() => {
                          onSelectCandidate(candidate);
                          onSelectTab('profile');
                          onClose();
                        }}
                        className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 hover:border-indigo-500/50 hover:bg-slate-900 transition cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <img src={candidate.avatar} alt={candidate.name} className="h-9 w-9 rounded-full object-cover border border-indigo-500/30" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-white text-xs group-hover:text-indigo-300 transition">{candidate.name}</span>
                              <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[10px] text-indigo-300 font-semibold font-mono">
                                {candidate.fitScore}% Fit
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400">{candidate.title} · {candidate.currentCompany}</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="hidden sm:flex items-center space-x-1">
                            {candidate.topMatchedSkills.slice(0, 2).map((s, idx) => (
                              <span key={idx} className="rounded bg-slate-950 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-800">
                                {s}
                              </span>
                            ))}
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Jobs Section */}
              {(activeCategory === 'all' || activeCategory === 'jobs') && filteredJobs.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 px-1">
                    <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Job Requisitions</span>
                  </div>

                  <div className="space-y-1.5">
                    {filteredJobs.map(job => (
                      <div
                        key={job.id}
                        onClick={() => {
                          onSelectJob(job);
                          onSelectTab('candidates');
                          onClose();
                        }}
                        className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 hover:border-emerald-500/50 hover:bg-slate-900 transition cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-xs group-hover:text-emerald-300 transition">{job.title}</span>
                            <span className="font-mono text-[10px] text-emerald-400 font-bold">{job.reqCode}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{job.department} · {job.location} · {job.applicantsCount} Applicants</div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="rounded-full bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-300 font-medium">
                            {job.status}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assessment Questions */}
              {(activeCategory === 'all' || activeCategory === 'assessments') && filteredQuestions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 px-1">
                    <FileCode2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Online Assessment Questions</span>
                  </div>

                  <div className="space-y-1.5">
                    {filteredQuestions.map(q => (
                      <div
                        key={q.id}
                        onClick={() => {
                          onSelectTab('assessments');
                          onClose();
                        }}
                        className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 hover:border-amber-500/50 hover:bg-slate-900 transition cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-xs group-hover:text-amber-300 transition">{q.title}</span>
                            <span className="text-[10px] text-amber-400 font-bold">[{q.difficulty}]</span>
                          </div>
                          <div className="text-[11px] text-slate-400">{q.section} · {q.timeEstimateMinutes} mins · {q.points} pts</div>
                        </div>

                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-800/80 px-4 py-2.5 bg-slate-950 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with click or Enter</span>
          <span>TalentSphere Global Intelligence Search</span>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { 
  X, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Building2,
  Layers,
  FileCode2,
  Users,
  Award
} from 'lucide-react';
import { JobRequisition, Candidate } from '../types';

interface JobRequirementsModalProps {
  isOpen: boolean;
  job: JobRequisition | null;
  candidate: Candidate;
  onClose: () => void;
  onApply: (job: JobRequisition) => void;
  hasApplied?: boolean;
}

export const JobRequirementsModal: React.FC<JobRequirementsModalProps> = ({
  isOpen,
  job,
  candidate,
  onClose,
  onApply,
  hasApplied = false
}) => {
  if (!isOpen || !job) return null;

  // Calculate matching skills with candidate's verified/top skills
  const candidateSkillsLower = [
    ...candidate.topMatchedSkills,
    ...candidate.verifiedSkills.map(s => s.name)
  ].map(s => s.toLowerCase());

  const matchedRequiredSkills = job.requiredSkills.filter(req => 
    candidateSkillsLower.some(cSkill => cSkill.includes(req.toLowerCase()) || req.toLowerCase().includes(cSkill))
  );

  const missingRequiredSkills = job.requiredSkills.filter(req => 
    !candidateSkillsLower.some(cSkill => cSkill.includes(req.toLowerCase()) || req.toLowerCase().includes(cSkill))
  );

  const matchedNiceSkills = job.niceToHaveSkills.filter(nice => 
    candidateSkillsLower.some(cSkill => cSkill.includes(nice.toLowerCase()) || nice.toLowerCase().includes(cSkill))
  );

  // Dynamic Fit Score Estimation
  const calculatedFit = Math.min(
    98, 
    Math.round((matchedRequiredSkills.length / Math.max(1, job.requiredSkills.length)) * 70 + 
    (candidate.experienceYears >= job.minExperienceYears ? 20 : 10) + 
    (matchedNiceSkills.length > 0 ? 8 : 4))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-950 p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center space-x-2.5">
              <span className="rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-mono font-bold px-2.5 py-0.5 border border-indigo-500/30">
                {job.reqCode}
              </span>
              <span className="rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 border border-emerald-500/30">
                {job.type}
              </span>
              <span className="rounded-md bg-purple-500/20 text-purple-300 text-[11px] font-bold px-2.5 py-0.5 border border-purple-500/30">
                {job.seniority} Level
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <span className="flex items-center space-x-1 text-slate-300">
                <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>{job.department}</span>
              </span>
              <span className="flex items-center space-x-1 text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-rose-400" />
                <span>{job.location}</span>
              </span>
              <span className="flex items-center space-x-1 font-mono text-emerald-400 font-bold">
                <DollarSign className="h-3.5 w-3.5" />
                <span>{job.salaryRange}</span>
              </span>
              <span className="flex items-center space-x-1 text-slate-400">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Min. {job.minExperienceYears}+ Yrs Exp</span>
              </span>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* AI Skill Match Spotlight Banner */}
        <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-bold text-white">Your Profile Compatibility Score</h4>
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                  AI Evaluated
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Matched <strong>{matchedRequiredSkills.length}</strong> of <strong>{job.requiredSkills.length}</strong> core skills & qualifications from your profile.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[11px] text-slate-400">Estimated Match</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">{calculatedFit}%</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
              ✓
            </div>
          </div>
        </div>

        {/* Role Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            <span>Role Description & Scope</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed rounded-xl bg-slate-900/60 p-4 border border-slate-800">
            {job.description}
          </p>
        </div>

        {/* Key Responsibilities */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>Key Responsibilities</span>
          </h3>
          <div className="space-y-2">
            {job.responsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Required Technical Skills with Profile Match Indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <FileCode2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Required Technical Skills & Competencies</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              <span className="text-emerald-400 font-bold">{matchedRequiredSkills.length}</span> / {job.requiredSkills.length} Matched
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {job.requiredSkills.map((skill, idx) => {
              const isMatched = candidateSkillsLower.some(cSkill => 
                cSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cSkill)
              );

              return (
                <div 
                  key={idx}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                    isMatched 
                      ? 'border-emerald-500/30 bg-emerald-950/20 text-slate-200' 
                      : 'border-slate-800 bg-slate-900/50 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {isMatched ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                        •
                      </span>
                    )}
                    <span className="font-medium">{skill}</span>
                  </div>
                  {isMatched ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Verified in Profile
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Skill Gap</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Nice to Have Skills */}
        {job.niceToHaveSkills && job.niceToHaveSkills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Preferred / Nice-to-Have Skills</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.niceToHaveSkills.map((skill, idx) => {
                const isMatched = candidateSkillsLower.some(cSkill => 
                  cSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cSkill)
                );

                return (
                  <span 
                    key={idx}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs border ${
                      isMatched 
                        ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300' 
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    {isMatched && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                    <span>{skill}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Evaluation Weights Transparency */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
              <Award className="h-3.5 w-3.5 text-indigo-400" />
              <span>Candidate Evaluation Criteria Weights</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">100% Total Calibration</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <div className="text-[10px] text-slate-400">Core Skills</div>
              <div className="text-sm font-bold text-indigo-400">{job.weights.skills}%</div>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <div className="text-[10px] text-slate-400">Work Exp</div>
              <div className="text-sm font-bold text-blue-400">{job.weights.experience}%</div>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <div className="text-[10px] text-slate-400">Coding OA</div>
              <div className="text-sm font-bold text-amber-400">{job.weights.oaScore}%</div>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <div className="text-[10px] text-slate-400">GitHub Proof</div>
              <div className="text-sm font-bold text-purple-400">{job.weights.githubEvidence}%</div>
            </div>
            <div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
              <div className="text-[10px] text-slate-400">Education</div>
              <div className="text-sm font-bold text-emerald-400">{job.weights.education}%</div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
          >
            Close
          </button>

          {hasApplied ? (
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs bg-emerald-950/40 border border-emerald-500/30 px-4 py-2.5 rounded-xl">
              <CheckCircle2 className="h-4 w-4" />
              <span>Application Submitted</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onApply(job);
              }}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-xs font-bold text-white hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition"
            >
              <span>Apply for this Opening</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

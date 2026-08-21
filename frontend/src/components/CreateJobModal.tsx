import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  X, 
  Plus, 
  Trash2, 
  SlidersHorizontal, 
  CheckCircle2, 
  MapPin, 
  DollarSign, 
  Building
} from 'lucide-react';
import { JobRequisition } from '../types';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: JobRequisition) => void;
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated
}) => {
  const [title, setTitle] = useState('Staff Distributed Systems Engineer');
  const [department, setDepartment] = useState('Core Infrastructure');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [seniority, setSeniority] = useState<'Senior' | 'Staff' | 'Lead'>('Staff');
  const [salaryRange, setSalaryRange] = useState('$185,000 - $225,000');
  const [description, setDescription] = useState(
    'We are looking for a Staff Distributed Systems Engineer to scale our multi-region event pipelines and distributed storage engines using Go, Rust, and Kafka.'
  );
  const [requiredSkills, setRequiredSkills] = useState<string[]>([
    'Go / Rust', 'Distributed Systems', 'Apache Kafka', 'Raft Consensus', 'Kubernetes'
  ]);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [isAnalyzingJD, setIsAnalyzingJD] = useState(false);
  const [aiExtractedSuccess, setAiExtractedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !requiredSkills.includes(newSkillInput.trim())) {
      setRequiredSkills([...requiredSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setRequiredSkills(requiredSkills.filter(s => s !== skill));
  };

  const handleAnalyzeJD = () => {
    setIsAnalyzingJD(true);
    setTimeout(() => {
      setIsAnalyzingJD(false);
      setAiExtractedSuccess(true);
      setRequiredSkills([
        'Go / Rust', 'Distributed Systems', 'Kafka', 'Raft Consensus', 'Kubernetes', 'gRPC', 'RocksDB'
      ]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: JobRequisition = {
      id: `job-${Date.now()}`,
      reqCode: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      department,
      location,
      type: 'Full-time',
      seniority,
      salaryRange,
      status: 'Active',
      applicantsCount: 1,
      shortlistedCount: 1,
      interviewingCount: 0,
      hiredCount: 0,
      targetHireDate: 'Dec 15, 2026',
      requiredSkills,
      niceToHaveSkills: ['OpenTelemetry', 'eBPF'],
      minExperienceYears: 6,
      description,
      responsibilities: [
        'Lead the architectural evolution of our multi-region distributed compute fabric.',
        'Optimize consensus replication latency across geo-distributed nodes.'
      ],
      weights: {
        skills: 35,
        experience: 25,
        oaScore: 25,
        githubEvidence: 10,
        education: 5
      }
    };
    onJobCreated(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-5 shadow-2xl my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Create New Requisition</h2>
              <p className="text-xs text-slate-400">Define role requirements, calibrate AI weights, and launch sourcing.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Core Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Job Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Department</label>
              <input 
                type="text" 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Seniority Level</label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value as any)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Junior">Junior</option>
                <option value="Mid">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Staff">Staff</option>
                <option value="Lead">Principal / Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Location / Remote</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Salary Range</label>
              <input 
                type="text" 
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Job Description & AI Analyzer */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium">Job Description & Responsibilities</label>
              <button
                type="button"
                onClick={handleAnalyzeJD}
                disabled={isAnalyzingJD}
                className="flex items-center space-x-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition"
              >
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>{isAnalyzingJD ? 'Analyzing with AI...' : 'Analyze JD with AI'}</span>
              </button>
            </div>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Required Skills Chips */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-medium">Target Required Skills</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {requiredSkills.map((skill, idx) => (
                <span key={idx} className="flex items-center space-x-1 rounded-md bg-indigo-950/80 border border-indigo-500/30 px-2.5 py-1 text-xs text-indigo-300">
                  <span>{skill}</span>
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-indigo-400 hover:text-white">
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Add skill (e.g. Docker, Redis, Go)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="rounded-lg bg-slate-800 px-3 py-1.5 font-medium text-slate-200 hover:bg-slate-700 transition"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2 font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
            >
              Launch Requisition
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

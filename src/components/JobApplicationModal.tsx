import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Send, 
  ArrowRight, 
  FileCode, 
  Building2, 
  DollarSign, 
  Calendar, 
  User, 
  Briefcase, 
  Check, 
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { JobRequisition, Candidate } from '../types';

interface JobApplicationModalProps {
  isOpen: boolean;
  job: JobRequisition | null;
  candidate: Candidate;
  onClose: () => void;
  onSubmitApplication: (
    job: JobRequisition, 
    applicationData: {
      resumeFileName: string;
      coverNote: string;
      preferredStartDate: string;
      salaryExpectation: string;
      customSkills: string[];
    }
  ) => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  job,
  candidate,
  onClose,
  onSubmitApplication
}) => {
  if (!isOpen || !job) return null;

  const [useProfileResume, setUseProfileResume] = useState(true);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(candidate.resumeFileName || 'Elena_Rodriguez_Resume_2026.pdf');
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseComplete, setParseComplete] = useState(true);
  const [coverNote, setCoverNote] = useState(
    `Dear Hiring Team at ${job.department},\n\nI am thrilled to apply for the ${job.title} position. With over ${candidate.experienceYears} years of engineering experience and a strong background in ${job.requiredSkills.slice(0, 3).join(', ')}, I am confident in my ability to immediately deliver scalable results for your team.`
  );
  const [preferredStartDate, setPreferredStartDate] = useState('Immediate / 2 Weeks Notice');
  const [salaryExpectation, setSalaryExpectation] = useState(job.salaryRange.split('-')[0].trim());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    setIsParsing(true);
    setParseComplete(false);
    setUploadedFileName(file.name);
    setUseProfileResume(false);

    // Simulate AI ATS resume parsing
    setTimeout(() => {
      setIsParsing(false);
      setParseComplete(true);
    }, 1200);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      
      setTimeout(() => {
        onSubmitApplication(job, {
          resumeFileName: uploadedFileName || `${candidate.name.replace(' ', '_')}_Resume.pdf`,
          coverNote,
          preferredStartDate,
          salaryExpectation,
          customSkills: candidate.topMatchedSkills
        });
        setIsSubmittedSuccess(false);
        onClose();
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-950 p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/30">
                Application Submission
              </span>
              <span className="text-xs text-slate-400 font-mono">{job.reqCode}</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Apply for {job.title}
            </h2>
            <p className="text-xs text-slate-400">
              {job.department} · {job.location} · <strong className="text-emerald-400 font-mono">{job.salaryRange}</strong>
            </p>
          </div>

          <button 
            onClick={onClose} 
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmittedSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Application Received!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Your application for <strong className="text-white">{job.title}</strong> has been routed to the talent evaluation pipeline. You will receive an invitation to the technical assessment shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            
            {/* Candidate Snapshot */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={candidate.avatar} 
                  alt={candidate.name} 
                  className="h-10 w-10 rounded-xl object-cover border border-slate-700" 
                />
                <div>
                  <div className="font-bold text-white text-sm">{candidate.name}</div>
                  <div className="text-slate-400 text-[11px]">{candidate.email} · {candidate.phone}</div>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 flex items-center space-x-1">
                <ShieldCheck className="h-3 w-3 mr-1" />
                <span>Verified Profile</span>
              </span>
            </div>

            {/* Resume Selection & Upload Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-slate-300 font-bold">
                  Resume / Curriculum Vitae
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUseProfileResume(true);
                      setUploadedFileName(candidate.resumeFileName || 'Elena_Rodriguez_Resume_2026.pdf');
                      setParseComplete(true);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md transition ${
                      useProfileResume 
                        ? 'bg-indigo-600 text-white font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Use Profile Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUseProfileResume(false);
                      fileInputRef.current?.click();
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md transition ${
                      !useProfileResume 
                        ? 'bg-indigo-600 text-white font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Upload New
                  </button>
                </div>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".pdf,.docx,.doc" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              {/* Upload Drag Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition ${
                  isDragging 
                    ? 'border-indigo-500 bg-indigo-950/30' 
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-slate-200 font-semibold text-xs">
                  {uploadedFileName ? (
                    <span className="text-emerald-300 flex items-center justify-center space-x-1.5 font-mono">
                      <FileText className="h-4 w-4" />
                      <span>{uploadedFileName}</span>
                    </span>
                  ) : (
                    'Click to upload or drag and drop your resume (PDF / DOCX)'
                  )}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Automatic AI parsing extracts your verified competencies and match score
                </p>
              </div>

              {/* Live AI Parser Status */}
              {isParsing && (
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/30 p-3 flex items-center space-x-2 text-indigo-300 text-xs">
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                  <span>AI ATS Parser reading file & evaluating skills match...</span>
                </div>
              )}

              {parseComplete && !isParsing && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 flex items-center justify-between text-xs text-emerald-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Resume parsed with 98% ATS accuracy rating</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    {candidate.experienceYears} Yrs Experience Extracted
                  </span>
                </div>
              )}
            </div>

            {/* Note to Hiring Manager / Cover Letter */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-bold">
                Cover Note / Pitch to Hiring Manager
              </label>
              <textarea 
                rows={4}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Introduce yourself and explain why you're a great fit for this opening..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 text-slate-200 text-xs leading-relaxed focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Two Column Form Row: Start Date & Salary Expectation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Earliest Start Date
                </label>
                <input 
                  type="text" 
                  value={preferredStartDate}
                  onChange={(e) => setPreferredStartDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Target Salary Expectation
                </label>
                <input 
                  type="text" 
                  value={salaryExpectation}
                  onChange={(e) => setSalaryExpectation(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Connected Professional Profiles Preview */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Evidence Links Automatically Included in Application
              </span>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 flex items-center space-x-1 border border-slate-700">
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>GitHub: @elenarodriguez (842 commits)</span>
                </span>
                <span className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 flex items-center space-x-1 border border-slate-700">
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>LeetCode: @elena_algo (Guardian 2,145)</span>
                </span>
                <span className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 flex items-center space-x-1 border border-slate-700">
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span>LinkedIn: @elena-rodriguez-dev</span>
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-xs font-bold text-white hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Job Application</span>
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

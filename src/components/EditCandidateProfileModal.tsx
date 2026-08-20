import React, { useState } from 'react';
import { 
  User, 
  X, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Code2 
} from 'lucide-react';
import { Candidate } from '../types';

interface EditCandidateProfileModalProps {
  isOpen: boolean;
  candidate: Candidate;
  onClose: () => void;
  onSaveProfile: (updatedCandidate: Candidate) => void;
}

export const EditCandidateProfileModal: React.FC<EditCandidateProfileModalProps> = ({
  isOpen,
  candidate,
  onClose,
  onSaveProfile
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(candidate.name);
  const [title, setTitle] = useState(candidate.title);
  const [email, setEmail] = useState(candidate.email || 'elena.rodriguez@example.com');
  const [phone, setPhone] = useState(candidate.phone || '+1 (415) 892-4109');
  const [location, setLocation] = useState(candidate.location);
  const [currentCompany, setCurrentCompany] = useState(candidate.currentCompany);
  const [experienceYears, setExperienceYears] = useState(candidate.experienceYears);
  const [degree, setDegree] = useState(candidate.education.degree);
  const [institution, setInstitution] = useState(candidate.education.institution);
  const [bio, setBio] = useState(candidate.bio || '');
  const [skillsText, setSkillsText] = useState(candidate.topMatchedSkills.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCandidate: Candidate = {
      ...candidate,
      name,
      title,
      email,
      phone,
      location,
      bio,
      currentCompany,
      experienceYears: Number(experienceYears),
      education: {
        ...candidate.education,
        degree,
        institution
      },
      topMatchedSkills: skillsText.split(',').map(s => s.trim()).filter(Boolean)
    };

    setSavedSuccess(true);
    setTimeout(() => {
      onSaveProfile(updatedCandidate);
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Edit Candidate Profile</h3>
              <p className="text-xs text-slate-400">Update verified contact, background, and skill details</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {savedSuccess && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 flex items-center space-x-2 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Profile Updated Successfully ✓</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Professional Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Current Company</label>
              <input 
                type="text" 
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Location</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Total Experience (Years)</label>
              <input 
                type="number" 
                step="0.5"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Degree</label>
              <input 
                type="text" 
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Institution / University</label>
              <input 
                type="text" 
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Professional Bio & Summary</label>
            <textarea 
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief professional summary..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Top Matched Skills (comma separated)</label>
            <input 
              type="text" 
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
            />
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
              className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

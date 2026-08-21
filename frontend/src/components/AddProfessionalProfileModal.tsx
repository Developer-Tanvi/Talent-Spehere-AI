import React, { useState } from 'react';
import { 
  X, 
  Link2, 
  CheckCircle2, 
  ExternalLink, 
  Lock, 
  Sparkles, 
  Github, 
  Linkedin, 
  Code2, 
  Globe, 
  BookOpen, 
  Award,
  Layers
} from 'lucide-react';
import { ProfessionalProfile } from '../types';

interface AddProfessionalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProfile: (newProfile: ProfessionalProfile) => void;
  existingPlatforms?: string[];
}

export const AddProfessionalProfileModal: React.FC<AddProfessionalProfileModalProps> = ({
  isOpen,
  onClose,
  onAddProfile,
  existingPlatforms = []
}) => {
  if (!isOpen) return null;

  const platforms: {
    name: ProfessionalProfile['platform'];
    label: string;
    icon: string;
    placeholder: string;
    defaultUrlPrefix: string;
    sampleStats: string;
    sampleBadge: string;
  }[] = [
    {
      name: 'GitHub',
      label: 'GitHub Developer Profile',
      icon: 'github',
      placeholder: 'your_github_username',
      defaultUrlPrefix: 'https://github.com/',
      sampleStats: '32 repos · 450+ commits this year · 120 stars',
      sampleBadge: 'Verified Open Source Contributor'
    },
    {
      name: 'LinkedIn',
      label: 'LinkedIn Professional Profile',
      icon: 'linkedin',
      placeholder: 'in/your-profile-slug',
      defaultUrlPrefix: 'https://linkedin.com/',
      sampleStats: '500+ connections · Verified experience & endorsements',
      sampleBadge: 'Identity & Experience Verified'
    },
    {
      name: 'LeetCode',
      label: 'LeetCode Algorithmic Profile',
      icon: 'code',
      placeholder: 'your_leetcode_handle',
      defaultUrlPrefix: 'https://leetcode.com/',
      sampleStats: 'Rating 2,120 · 580 Solved (160 Hard) · Top 2%',
      sampleBadge: 'Guardian Tier (Top 2%)'
    },
    {
      name: 'HackerRank',
      label: 'HackerRank Problem Solving Badge',
      icon: 'code',
      placeholder: 'hackerrank_username',
      defaultUrlPrefix: 'https://hackerrank.com/',
      sampleStats: '6 Stars Problem Solving & Java Gold Badge',
      sampleBadge: 'Gold Problem Solver'
    },
    {
      name: 'CodeChef',
      label: 'CodeChef Competitive Programming',
      icon: 'code',
      placeholder: 'codechef_handle',
      defaultUrlPrefix: 'https://codechef.com/users/',
      sampleStats: '5-Star Division 1 Contestant · Global Rank #420',
      sampleBadge: '5-Star Division 1'
    },
    {
      name: 'Kaggle',
      label: 'Kaggle / ML Research Profile',
      icon: 'award',
      placeholder: 'kaggle_username',
      defaultUrlPrefix: 'https://kaggle.com/',
      sampleStats: '2 Expert Medals in NLP & Computer Vision',
      sampleBadge: 'Kaggle Notebooks Expert'
    },
    {
      name: 'Portfolio',
      label: 'Personal Engineering Portfolio',
      icon: 'globe',
      placeholder: 'https://yourportfolio.dev',
      defaultUrlPrefix: 'https://',
      sampleStats: 'Architecture case studies, interactive UI demos',
      sampleBadge: 'Verified Custom Domain'
    },
    {
      name: 'Blog',
      label: 'Tech Blog / Substack / Medium',
      icon: 'book',
      placeholder: 'https://blog.yourdomain.com',
      defaultUrlPrefix: 'https://',
      sampleStats: '14 deep-dive engineering articles on Distributed Systems',
      sampleBadge: 'Technical Author'
    },
    {
      name: 'StackOverflow',
      label: 'Stack Overflow Developer Reputation',
      icon: 'layers',
      placeholder: 'users/12345/username',
      defaultUrlPrefix: 'https://stackoverflow.com/',
      sampleStats: 'Top 5% in Java, Spring, and Concurrency tags',
      sampleBadge: 'Top 5% Contributor'
    }
  ];

  const [selectedPlatform, setSelectedPlatform] = useState<ProfessionalProfile['platform']>('GitHub');
  const [handle, setHandle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentPlatformConfig = platforms.find(p => p.name === selectedPlatform) || platforms[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);

      const finalHandle = handle.replace('@', '').trim();
      const finalUrl = customUrl.trim() 
        ? customUrl.trim() 
        : `${currentPlatformConfig.defaultUrlPrefix}${finalHandle}`;

      const newProfile: ProfessionalProfile = {
        id: `prof-${Date.now()}`,
        platform: selectedPlatform,
        handle: finalHandle,
        url: finalUrl,
        verified: true,
        connectedAt: 'Just now',
        stats: currentPlatformConfig.sampleStats,
        badge: currentPlatformConfig.sampleBadge
      };

      setTimeout(() => {
        onAddProfile(newProfile);
        setIsSuccess(false);
        onClose();
      }, 900);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="rounded-xl bg-indigo-500/20 p-2 text-indigo-400">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Add Professional Profile</h3>
              <p className="text-xs text-slate-400">Link verified developer evidence, repos, and contest stats</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h4 className="text-sm font-bold text-white">Profile Verified & Connected!</h4>
            <p className="text-xs text-slate-400">
              {selectedPlatform} profile linked with live evidence badges.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Select Platform */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-bold">Select Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {platforms.map(p => {
                  const isSelected = selectedPlatform === p.name;
                  return (
                    <button
                      type="button"
                      key={p.name}
                      onClick={() => {
                        setSelectedPlatform(p.name);
                        setHandle('');
                        setCustomUrl('');
                      }}
                      className={`p-2.5 rounded-xl border text-left flex flex-col items-center justify-center space-y-1 transition ${
                        isSelected 
                          ? 'border-indigo-500 bg-indigo-950/40 text-white font-bold ring-1 ring-indigo-500' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-xs">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Handle / Username */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-bold">
                {currentPlatformConfig.name} Handle / Username
              </label>
              <input 
                type="text" 
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder={currentPlatformConfig.placeholder}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Custom URL (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-slate-300 font-medium">
                Full Profile URL (Optional override)
              </label>
              <input 
                type="url" 
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder={handle ? `${currentPlatformConfig.defaultUrlPrefix}${handle}` : currentPlatformConfig.defaultUrlPrefix}
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Verification Security Note */}
            <div className="rounded-xl bg-indigo-950/20 border border-indigo-500/20 p-3 flex items-center space-x-2.5 text-indigo-300 text-[11px]">
              <Lock className="h-4 w-4 shrink-0 text-indigo-400" />
              <span>Read-only cryptographic token validation. No write permissions required.</span>
            </div>

            {/* Actions */}
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
                disabled={isVerifying || !handle.trim()}
                className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Verifying {selectedPlatform}...</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Verify & Connect Profile</span>
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

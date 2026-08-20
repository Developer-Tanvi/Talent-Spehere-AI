import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Sparkles, 
  Users, 
  Clock, 
  Award, 
  ShieldCheck, 
  Flame, 
  ArrowUpRight,
  PieChart
} from 'lucide-react';
import { ActiveTab } from '../types';

interface AnalyticsInsightsProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const AnalyticsInsights: React.FC<AnalyticsInsightsProps> = ({
  onSelectTab
}) => {
  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1">
            <button onClick={() => onSelectTab('overview')} className="hover:text-white">Dashboard</button>
            <span>/</span>
            <span className="text-indigo-400 font-medium">Hiring Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-indigo-400" />
            <span>Recruitment Intelligence & Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise recruitment funnel metrics, skill density heatmaps, and algorithm calibration accuracy.
          </p>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> +4.2% MoM
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white font-mono">82.4%</div>
            <div className="text-xs text-slate-400">Average AI Match Score</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400">
              <Award className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> 3.2x benchmark
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">15.2%</div>
            <div className="text-xs text-slate-400">Interview to Offer Conversion</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-cyan-400 flex items-center">
              -24 days faster
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white font-mono">18 Days</div>
            <div className="text-xs text-slate-400">Average Time to Fill</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-purple-500/10 p-2 text-purple-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              92.4% alignment
            </span>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-purple-400 font-mono">88.6%</div>
            <div className="text-xs text-slate-400">Recruiter AI Acceptance Rate</div>
          </div>
        </div>

      </div>

      {/* Main Charts Grid: Skill Heatmap & Funnel Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skill Gap Heatmap Across Talent Pool */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Skill Gap & Shortage Heatmap</h3>
              <p className="text-xs text-slate-400">Distribution of verified skills across 1,420 applicants</p>
            </div>
            <span className="rounded bg-indigo-500/10 text-indigo-400 text-[10px] px-2 py-0.5 font-bold">
              Engineering Pool
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { skill: 'Java 21 / Spring Boot 3', proficiency: 78, gap: 22, status: 'Healthy Supply' },
              { skill: 'Distributed Systems & Microservices', proficiency: 54, gap: 46, status: 'Moderate Shortage' },
              { skill: 'Apache Kafka Event Streams', proficiency: 42, gap: 58, status: 'Critical Shortage' },
              { skill: 'Kubernetes Cluster Administration', proficiency: 38, gap: 62, status: 'High Shortage' },
              { skill: 'PostgreSQL Advanced Tuning', proficiency: 65, gap: 35, status: 'Moderate Supply' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{item.skill}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    item.gap > 50 ? 'bg-rose-500/10 text-rose-400' : item.gap > 35 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {item.status} ({item.proficiency}% qualified)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex">
                  <div className="bg-indigo-500 h-full" style={{ width: `${item.proficiency}%` }} title="Proficient"></div>
                  <div className="bg-slate-800 h-full" style={{ width: `${item.gap}%` }} title="Skill Gap"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Channel Quality & Diversity */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Candidate Sourcing Channel Quality</h3>
              <p className="text-xs text-slate-400">Match score & conversion per candidate source</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { source: 'GitHub Open Source Sourcing', avgScore: 92, count: 240, color: 'bg-emerald-500' },
              { source: 'Employee Referrals', avgScore: 89, count: 180, color: 'bg-indigo-500' },
              { source: 'Direct Careers Portal', avgScore: 81, count: 560, color: 'bg-cyan-500' },
              { source: 'LinkedIn Inbound Applications', avgScore: 74, count: 440, color: 'bg-amber-500' }
            ].map((src, idx) => (
              <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{src.source}</div>
                  <div className="text-[11px] text-slate-400">{src.count} total candidates</div>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold text-emerald-400 font-mono">{src.avgScore}%</div>
                  <div className="text-[10px] text-slate-400">Avg AI Match</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

import React from 'react';
import { useCareer } from '../../context/CareerContext';
import { ALL_ACHIEVEMENTS } from '../../data/achievementsData';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import {
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Code2,
  Layers,
  Compass,
  ShieldCheck,
  FolderGit2
} from 'lucide-react';

export const ProgressAnalyticsView: React.FC = () => {
  const { targetCareer, readiness, userSkills, projects, assessments, unlockedAchievements } = useCareer();

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'FolderGit2':
        return <FolderGit2 className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Continuous Progress & Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual growth metrics, assessment records, and earned achievement badges over time.
            </p>
          </div>
        </div>

        {/* Growth Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Career Readiness</span>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 mt-1">
              {readiness.overallScore}%
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Verified Skills</span>
            <div className="text-3xl font-extrabold font-mono text-brand-600 mt-1">
              {userSkills.filter(s => s.verificationStatus === 'Verified').length}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Projects Submitted</span>
            <div className="text-3xl font-extrabold font-mono text-indigo-600 mt-1">
              {projects.length}
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Assessments Taken</span>
            <div className="text-3xl font-extrabold font-mono text-amber-600 mt-1">
              {assessments.length}
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Trajectory Visual Chart */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Career Readiness Growth Trajectory</h3>
        <p className="text-xs text-slate-500">
          Showing calculated readiness score progression across milestones.
        </p>

        {/* Visual Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-4 pt-8 px-4 border-b border-slate-100">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full max-w-[40px] bg-slate-200 rounded-t-xl h-16 transition-all" />
            <span className="text-[10px] text-slate-400 font-semibold">Onboarding (0%)</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full max-w-[40px] bg-brand-200 rounded-t-xl h-24 transition-all" />
            <span className="text-[10px] text-slate-400 font-semibold">Initial Analysis (58%)</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full max-w-[40px] bg-brand-500 rounded-t-xl h-32 transition-all" />
            <span className="text-[10px] text-slate-700 font-bold">SQL Verified ({readiness.overallScore}%)</span>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full max-w-[40px] border-2 border-dashed border-emerald-400 rounded-t-xl h-40 transition-all opacity-60" />
            <span className="text-[10px] text-emerald-700 font-semibold">Project Capstone (85% Target)</span>
          </div>
        </div>
      </div>

      {/* Earned Achievements (Requirement #57) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Earned Platform Achievements</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Achievements are unlocked through real learning actions and verified assessment completions.
            </p>
          </div>
          <span className="text-xs font-bold text-brand-600">
            {unlockedAchievements.length} of {ALL_ACHIEVEMENTS.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-50/50 to-white border-amber-200 shadow-subtle'
                    : 'bg-slate-50/60 border-slate-200/80 opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  isUnlocked ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-400'
                }`}>
                  {getAchievementIcon(ach.icon)}
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h4 className="font-extrabold text-xs text-slate-900">{ach.title}</h4>
                    {isUnlocked && <Sparkles className="w-3 h-3 text-amber-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{ach.description}</p>
                  <span className="text-[10px] font-bold mt-2 block capitalize text-slate-400">
                    {isUnlocked ? '✓ Unlocked' : 'Locked'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

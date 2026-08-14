import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { Badge } from '../common/Badge';
import { SkillGapItem, PriorityLevel } from '../../types';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  Filter
} from 'lucide-react';

interface SkillGapAnalyzerProps {
  onSelectSkill: (skillId: string) => void;
}

export const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({ onSelectSkill }) => {
  const { targetCareer, skillGaps } = useCareer();
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGaps = skillGaps.filter((g) => {
    const matchesPriority = priorityFilter === 'all' || g.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesSearch = g.skillName.toLowerCase().includes(searchQuery.toLowerCase()) || g.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const skillsHave = filteredGaps.filter((g) => g.gapCategory === 'have');
  const skillsImprove = filteredGaps.filter((g) => g.gapCategory === 'improve');
  const skillsMissing = filteredGaps.filter((g) => g.gapCategory === 'missing');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <Target className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">Skill Gap Analyzer</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Comparing your current self-reported and verified abilities against required skills for{' '}
              <span className="font-bold text-slate-900">{targetCareer?.name || 'Target Career'}</span>.
            </p>
          </div>

          {/* Quick Learning Order Recommendation Badge */}
          <div className="p-3 bg-brand-50 border border-brand-200/80 rounded-2xl flex items-center gap-2 text-xs text-brand-900 font-medium">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Ordered automatically by career priority & weight</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search required skills..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Priority:
            </span>
            {['all', 'critical', 'high', 'medium'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1 text-xs font-bold rounded-xl capitalize transition-colors ${
                  priorityFilter === p
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Learning Order Priority List (Requirement #22) */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Recommended Learning Order</span>
            </h3>
            <p className="text-xs text-slate-300">
              We have sequenced your missing skills based on technical prerequisites and employer weighting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {skillGaps.filter(g => g.gapCategory !== 'have').slice(0, 4).map((gap, idx) => (
            <div
              key={gap.skillId}
              onClick={() => onSelectSkill(gap.skillId)}
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-brand-500/30 text-brand-300 font-mono font-extrabold text-xs flex items-center justify-center border border-brand-400/30">
                  #{idx + 1}
                </span>
                <div>
                  <span className="font-bold text-xs text-white block group-hover:text-amber-300 transition-colors">
                    {gap.skillName}
                  </span>
                  <span className="text-[10px] text-slate-400">{gap.priority} Priority</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </div>

      {/* 3 Interactive Columns (Requirement #21) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Skills You Already Have */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-extrabold text-slate-900">
                Skills You Already Have ({skillsHave.length})
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Meets Role Baseline</span>
          </div>

          <div className="space-y-3">
            {skillsHave.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                No skills currently meet the target career baseline.
              </div>
            ) : (
              skillsHave.map((gap) => (
                <div
                  key={gap.skillId}
                  onClick={() => onSelectSkill(gap.skillId)}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card hover:border-emerald-300 hover:shadow-card-hover cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{gap.skillName}</span>
                    <Badge label={gap.verificationStatus} variant={gap.verificationStatus as any} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 bg-emerald-50/50 p-2 rounded-xl border border-emerald-100">
                    <span>Level: <strong className="text-emerald-800">{gap.userLevel}</strong></span>
                    <span>Weight: <strong>{gap.weight}%</strong></span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{gap.whyNeeded}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Skills You Need to Improve */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="text-sm font-extrabold text-slate-900">
                Needs Improvement ({skillsImprove.length})
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Below Required Level</span>
          </div>

          <div className="space-y-3">
            {skillsImprove.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                No partial skill gaps found.
              </div>
            ) : (
              skillsImprove.map((gap) => (
                <div
                  key={gap.skillId}
                  onClick={() => onSelectSkill(gap.skillId)}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card hover:border-amber-400 hover:shadow-card-hover cursor-pointer transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{gap.skillName}</span>
                    <Badge label={gap.priority} variant={gap.priority} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-amber-50/60 rounded-xl border border-amber-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Current:</span>
                      <span className="font-bold text-slate-700">{gap.userLevel}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Required:</span>
                      <span className="font-bold text-brand-700">{gap.requiredLevel}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{gap.whyNeeded}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-600 font-bold">
                    <span>View Learning Guidance</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Missing Skills */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <h3 className="text-sm font-extrabold text-slate-900">
                Missing Skills ({skillsMissing.length})
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Not Yet Started</span>
          </div>

          <div className="space-y-3">
            {skillsMissing.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                No missing skills. All requirements touched!
              </div>
            ) : (
              skillsMissing.map((gap) => (
                <div
                  key={gap.skillId}
                  onClick={() => onSelectSkill(gap.skillId)}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-card hover:border-rose-300 hover:shadow-card-hover cursor-pointer transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{gap.skillName}</span>
                    <Badge label={gap.priority} variant={gap.priority} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-rose-50/50 rounded-xl border border-rose-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Current:</span>
                      <span className="font-bold text-rose-600">Not Learned</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Required:</span>
                      <span className="font-bold text-brand-700">{gap.requiredLevel}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{gap.whyNeeded}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-600 font-bold">
                    <span>Explore Learning Path & Tasks</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

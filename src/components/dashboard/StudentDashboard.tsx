import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import {
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  BookOpen,
  Code2,
  Briefcase,
  Layers,
  ChevronRight,
  Info,
  ShieldCheck
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (route: string) => void;
  onOpenSkillGuidance?: (skillId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigate,
  onOpenSkillGuidance,
}) => {
  const { user } = useAuth();
  const {
    targetCareer,
    userSkills,
    readiness,
    skillGaps,
    assessments,
    projects,
    nextAction,
  } = useCareer();

  const [showScoreExplanation, setShowScoreExplanation] = useState(false);

  const verifiedSkillsCount = userSkills.filter(s => s.verificationStatus === 'Verified').length;
  const missingCount = skillGaps.filter(g => g.gapCategory === 'missing').length;
  const improveCount = skillGaps.filter(g => g.gapCategory === 'improve').length;
  const completedSkillsCount = skillGaps.filter(g => g.gapCategory === 'have').length;

  const topGaps = skillGaps.filter(g => g.gapCategory !== 'have').slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Header & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
              Target Career Pathway
            </span>
            {user?.isDemo && (
              <Badge label="DEMO PROFILE" variant="Demo" size="sm" />
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || 'Student'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Targeting <span className="text-emerald-400 font-bold">{targetCareer?.name || 'Data Analyst'}</span> • {user?.college || 'Computer Science'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/skill-gap')}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
          >
            <span>View Skill Gaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Career Readiness */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Readiness</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {readiness.isCalculated ? `${readiness.overallScore}%` : 'Pending'}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">
            {readiness.overallScore >= 70 ? 'Job Ready' : 'In Progress'}
          </span>
        </div>

        {/* Missing Skills */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Skill Gaps</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {missingCount + improveCount}
          </div>
          <span className="text-[10px] text-rose-600 font-semibold mt-0.5 block">
            {missingCount} missing, {improveCount} weak
          </span>
        </div>

        {/* Verified Skills */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Verified Skills</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {verifiedSkillsCount}
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
            By assessment / project
          </span>
        </div>

        {/* Completed Skills */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Skills Met</span>
            <CheckCircle2 className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {completedSkillsCount}
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
            Satisfies role baseline
          </span>
        </div>

        {/* Projects */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Projects</span>
            <Code2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {projects.length}
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
            Portfolio projects
          </span>
        </div>

        {/* Assessments */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Assessments</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {assessments.length}
          </div>
          <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">
            Completed tests
          </span>
        </div>
      </div>

      {/* 3. Prominent "What Should I Do Next?" Intelligent Card (Requirement #45, #68) */}
      <div className="p-6 bg-gradient-to-br from-brand-600 via-indigo-600 to-indigo-700 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold tracking-wider uppercase backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Recommended Next Action</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
              {nextAction.title}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-normal">
              {nextAction.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (nextAction.skillId && onOpenSkillGuidance) {
                onOpenSkillGuidance(nextAction.skillId);
              } else {
                onNavigate(nextAction.route);
              }
            }}
            className="px-6 py-3.5 bg-white hover:bg-slate-50 text-indigo-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 shrink-0"
          >
            <span>{nextAction.actionLabel}</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </button>
        </div>
      </div>

      {/* 4. Career Readiness Score & Transparent Explanation Card (Requirement #20) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900">Career Readiness Score</h3>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {readiness.overallScore}% Ready for {targetCareer?.name || 'Target Career'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Dynamic multi-factor score calibrated against industry job descriptions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowScoreExplanation(!showScoreExplanation)}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Why is my score {readiness.overallScore}%?</span>
          </button>
        </div>

        {/* Dynamic Explanation Note */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900 block mb-1">Algorithmic Summary:</span>
          {readiness.explanation}
        </div>

        {/* Expandable Transparent Breakdown (Technical 40%, Tools 15%, Projects 15%, Assessments 10%, Experience 10%, Soft Skills 10%) */}
        {showScoreExplanation && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 animate-slide-up">
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Technical Skills (40% weight)</span>
                <span className="font-mono text-brand-700">{readiness.technicalSkillsScore}%</span>
              </div>
              <ProgressBar value={readiness.technicalSkillsScore} size="sm" variant="brand" />
              <p className="text-[10px] text-slate-400 mt-2">Fulfillment of core required technical abilities</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Recommended Tools (15% weight)</span>
                <span className="font-mono text-brand-700">{readiness.toolsScore}%</span>
              </div>
              <ProgressBar value={readiness.toolsScore} size="sm" variant="brand" />
              <p className="text-[10px] text-slate-400 mt-2">Proficiency in industry tools & platforms</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Portfolio Projects (15% weight)</span>
                <span className="font-mono text-brand-700">{readiness.projectsScore}%</span>
              </div>
              <ProgressBar value={readiness.projectsScore} size="sm" variant="brand" />
              <p className="text-[10px] text-slate-400 mt-2">Demonstrated hands-on GitHub/live projects</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Verified Assessments (10% weight)</span>
                <span className="font-mono text-brand-700">{readiness.assessmentsScore}%</span>
              </div>
              <ProgressBar value={readiness.assessmentsScore} size="sm" variant="brand" />
              <p className="text-[10px] text-slate-400 mt-2">Passed standardized skill assessments</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Practical Experience (10% weight)</span>
                <span className="font-mono text-brand-700">{readiness.experienceScore}%</span>
              </div>
              <ProgressBar value={readiness.experienceScore} size="sm" variant="brand" />
              <p className="text-[10px] text-slate-400 mt-2">Internships and applied real-world exposure</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                <span>Soft Skills (10% weight)</span>
                <span className="font-mono text-brand-700">{readiness.softSkillsScore}%</span>
              </div>
              <ProgressBar value={readiness.softSkillsScore} size="sm" variant="brand" />
              <p className="text-[10px] text-slate-400 mt-2">Communication, leadership, and problem solving</p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Top Critical Skill Gaps Row (Requirement #24) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Highest-Priority Skill Gaps</h3>
            <p className="text-xs text-slate-500">
              Start learning these skills in the recommended order to maximize readiness growth.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/skill-gap')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>See all {skillGaps.length} skills</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topGaps.map((gap) => (
            <div
              key={gap.skillId}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-5 flex flex-col justify-between hover:border-brand-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">{gap.skillName}</span>
                  <Badge label={gap.priority} variant={gap.priority} size="sm" />
                </div>

                <div className="flex items-center justify-between text-xs py-2 px-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Current:</span>
                    <span className="font-bold text-slate-700">{gap.userLevel}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Required:</span>
                    <span className="font-bold text-brand-700">{gap.requiredLevel}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {gap.whyNeeded}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenSkillGuidance) {
                      onOpenSkillGuidance(gap.skillId);
                    } else {
                      onNavigate(`/learning/${gap.skillId}`);
                    }
                  }}
                  className="w-full py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Step-by-Step Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Quick Access Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('/roadmap')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-card hover:border-brand-300 hover:shadow-card-hover cursor-pointer transition-all flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Career Roadmap</h4>
            <p className="text-xs text-slate-500 mt-0.5">5 structured phases from foundation to job prep</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('/assessments')}
          className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-card hover:border-brand-300 hover:shadow-card-hover cursor-pointer transition-all flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Skill Assessments</h4>
            <p className="text-xs text-slate-500 mt-0.5">Test knowledge & earn verified skill credentials</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('/ai-assistant')}
          className="p-5 bg-gradient-to-br from-brand-50 to-indigo-50/50 rounded-2xl border border-brand-200/80 shadow-card hover:border-brand-300 hover:shadow-card-hover cursor-pointer transition-all flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">AI Career Assistant</h4>
            <p className="text-xs text-slate-500 mt-0.5">Ask questions about your skills, roadmap & resume</p>
          </div>
        </div>
      </div>
    </div>
  );
};

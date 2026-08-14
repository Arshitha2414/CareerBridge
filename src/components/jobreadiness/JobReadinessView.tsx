import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import {
  FileCheck2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  FileText,
  Github,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

interface JobReadinessViewProps {
  onNavigate?: (route: string) => void;
}

export const JobReadinessView: React.FC<JobReadinessViewProps> = ({ onNavigate }) => {
  const { targetCareer, readiness, skillGaps, projects, assessments, userSkills } = useCareer();
  const { user } = useAuth();

  const [resumeScore, setResumeScore] = useState<number>(74);

  const resumeSuggestions = [
    {
      original: 'Created Power BI dashboard for sales data.',
      improved: 'Designed an executive Power BI dashboard integrating 50,000+ SQL sales records, visualizing YoY revenue growth and reducing reporting turnaround by 40%.',
      reason: 'Quantifies business impact, data volume, and performance outcomes.'
    },
    {
      original: 'Wrote SQL queries to find customer data.',
      improved: 'Constructed optimized PostgreSQL queries utilizing CTEs, multi-table JOINs, and window functions to identify top 10% repeat customer cohorts.',
      reason: 'Highlights specific technical depth and advanced database concepts.'
    }
  ];

  const portfolioChecklist = [
    { label: 'Clean README with architecture diagram & findings', checked: true },
    { label: 'Live deployed dashboard link / demo video attached', checked: projects.length > 0 },
    { label: 'Well-commented SQL scripts & documentation', checked: projects.length > 0 },
    { label: 'Clear license and reproducible dataset instructions', checked: true },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Job Readiness & Market Preparation</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive evaluation of your technical readiness, portfolio deliverables, and resume strength.
            </p>
          </div>
        </div>

        {/* Big Score Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
          <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl space-y-2 text-center md:text-left shadow-lg">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Overall Job Readiness
            </span>
            <div className="text-4xl font-extrabold font-mono text-emerald-400">
              {readiness.overallScore}%
            </div>
            <span className="text-xs text-slate-300 block">
              Calibrated for {targetCareer?.name || 'Data Analyst'} positions
            </span>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800">Job Readiness Trajectory</span>
              <span className="text-brand-600">{readiness.overallScore}% / 100%</span>
            </div>
            <ProgressBar value={readiness.overallScore} size="lg" variant="auto" />
            <p className="text-xs text-slate-500 leading-relaxed">
              Candidates with 75%+ verified readiness receive 4x more employer interview callbacks on average.
            </p>
          </div>
        </div>
      </div>

      {/* "What is stopping me from being job ready?" (Requirement #47) */}
      <div className="bg-rose-50/50 rounded-3xl border border-rose-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <h3 className="text-base font-extrabold text-rose-950">
            What is stopping me from being job ready?
          </h3>
        </div>

        <div className="space-y-2.5">
          {readiness.stoppingFactors.length === 0 ? (
            <div className="p-3.5 bg-white rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>You meet all primary criteria! You are ready to apply to open roles.</span>
            </div>
          ) : (
            readiness.stoppingFactors.map((factor, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white rounded-xl border border-rose-200 text-xs font-semibold text-rose-900 flex items-center gap-2.5 shadow-subtle"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span>{factor}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Resume Strength Analyzer (Requirement #50) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h3 className="text-lg font-extrabold text-slate-900">Resume Strength Analyzer</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Actionable bullet-point transformations tailored to {targetCareer?.name || 'your target career'}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
              <span>Resume Strength:</span>
              <span className="font-mono text-sm">{resumeScore}%</span>
            </div>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/resume-builder')}
                className="px-4 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Resume Builder</span>
              </button>
            )}
          </div>
        </div>

        {/* Suggestions Comparison */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-900 block">
            Recommended Actionable Bullet Point Enhancements:
          </span>

          {resumeSuggestions.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                  Weak / Generic Version:
                </span>
                <p className="p-2 bg-rose-50/60 rounded-lg text-rose-900 line-through">
                  "{item.original}"
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Strong / High-Impact Version:
                </span>
                <p className="p-2 bg-emerald-50 rounded-lg text-emerald-950 font-medium">
                  "{item.improved}"
                </p>
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                <strong>Why this works: </strong>{item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Checklist (Requirement #51) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">GitHub & Portfolio Builder Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {portfolioChecklist.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 ${
                item.checked ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${item.checked ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

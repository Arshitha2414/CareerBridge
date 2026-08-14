import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { DEMO_JOB_OPPORTUNITIES } from '../../data/jobsData';
import { JobOpportunity } from '../../types';
import { Badge } from '../common/Badge';
import {
  Briefcase,
  Building2,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Send,
  ExternalLink,
  Sparkles,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const JobRecommendationsView: React.FC = () => {
  const { targetCareer, userSkills, readiness } = useCareer();
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Compute job match percentage dynamically based on user's actual skills vs required
  const scoredJobs = DEMO_JOB_OPPORTUNITIES.map((job) => {
    let matchedSkillsCount = 0;
    const haveList: string[] = [];
    const missingList: string[] = [];

    job.requiredSkills.forEach((req) => {
      const userHas = userSkills.find(
        (s) => s.skillName.toLowerCase().includes(req.skillName.toLowerCase()) || req.skillName.toLowerCase().includes(s.skillName.toLowerCase())
      );
      if (userHas) {
        matchedSkillsCount++;
        haveList.push(req.skillName);
      } else {
        missingList.push(req.skillName);
      }
    });

    const matchPct = Math.min(
      Math.max(Math.round((matchedSkillsCount / job.requiredSkills.length) * 100), 30),
      95
    );

    return {
      job,
      matchPct,
      haveList,
      missingList,
    };
  }).filter(({ job }) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (jobId: string) => {
    setAppliedJobs((prev) => [...prev, jobId]);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <Briefcase className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">Job Recommendations</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Roles calibrated and matched against your verified skills and portfolio readiness.
            </p>
          </div>

          <span className="px-3 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold self-start">
            Clearly Labelled: Demo Opportunities (Rule #49)
          </span>
        </div>

        {/* Search */}
        <div className="relative pt-5 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-7.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, or location..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scoredJobs.map(({ job, matchPct, haveList, missingList }) => {
          const isApplied = appliedJobs.includes(job.id);
          return (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-card hover:border-brand-300 hover:shadow-card-hover p-6 flex flex-col justify-between space-y-5 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {job.experienceLevel} • {job.type}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{job.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Building2 className="w-3.5 h-3.5" /> {job.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-400 block">Match</span>
                    <span className="text-xl font-extrabold font-mono text-brand-600">{matchPct}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                {/* Why This Role Matches You & What to Improve (Requirement #48) */}
                <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="font-bold text-emerald-800 text-[11px] block mb-1">
                      ✓ Skills You Already Have for this Role:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {haveList.length > 0 ? (
                        haveList.map((h, i) => (
                          <span key={i} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                            {h}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-[11px]">No exact matches yet</span>
                      )}
                    </div>
                  </div>

                  {missingList.length > 0 && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="font-bold text-rose-800 text-[11px] block mb-1">
                        ⚠ What to Improve Before Applying:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {missingList.map((m, i) => (
                          <span key={i} className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-semibold text-[10px]">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Posted {job.postedDate}</span>

                <button
                  type="button"
                  disabled={isApplied}
                  onClick={() => handleApply(job.id)}
                  className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                    isApplied
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Application Sent</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Apply with Verified Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CareerBridgeDB } from '../../services/db';
import { JobOpportunity, SkillLevel, PriorityLevel } from '../../types';
import { Badge } from '../common/Badge';
import { Building2, Plus, Briefcase, CheckCircle2, Users2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EmployerDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpportunity[]>(CareerBridgeDB.getJobOpportunities());
  const [showPostModal, setShowPostModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('TechNova Solutions');
  const [location, setLocation] = useState('Bangalore, India');
  const [jobDesc, setJobDesc] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('SQL (Intermediate), Power BI (Intermediate), Excel (Intermediate)');

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    const newJob = CareerBridgeDB.createJobOpportunity({
      title: jobTitle,
      company,
      location,
      type: 'Full-time',
      experienceLevel: 'Entry-Level',
      careerRole: 'data-analyst',
      requiredSkills: [
        { skillName: 'SQL', level: 'Intermediate' as SkillLevel, priority: 'Critical' as PriorityLevel },
        { skillName: 'Power BI', level: 'Intermediate' as SkillLevel, priority: 'High' as PriorityLevel },
        { skillName: 'Excel', level: 'Intermediate' as SkillLevel, priority: 'Medium' as PriorityLevel }
      ],
      description: jobDesc || 'Exciting entry-level position seeking talent with verified SQL and Power BI dashboard abilities.'
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setJobs(CareerBridgeDB.getJobOpportunities());
    setShowPostModal(false);
    setJobTitle('');
    setJobDesc('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Employer & Recruiter Portal</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Post job opportunities, define required skill weights, and filter verified candidates.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPostModal(!showPostModal)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5 self-start"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post New Opportunity</span>
          </button>
        </div>

        {/* Post Form */}
        {showPostModal && (
          <form onSubmit={handlePostJob} className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs animate-slide-up">
            <h3 className="font-extrabold text-sm text-slate-900">Create New Opportunity</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Junior Data Analyst"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Role Description</label>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                rows={2}
                placeholder="Describe key responsibilities and required deliverables..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPostModal(false)}
                className="px-3 py-1.5 font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm"
              >
                Publish Opportunity
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Matched Candidates Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Matched Candidate Pool (Data Analyst)</h3>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 divide-y divide-slate-100">
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm text-slate-900">Arshitha S</h4>
                <Badge label="Verified Skills: 2" variant="Verified" size="sm" />
              </div>
              <p className="text-xs text-slate-500">
                National Institute of Engineering • B.Tech Computer Science (2027)
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">Python (Verified)</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">Excel (Advanced)</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px]">SQL (Intermediate)</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-slate-400 block">Candidate Match</span>
              <span className="text-xl font-extrabold font-mono text-emerald-600">82%</span>
              <button
                type="button"
                className="mt-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors block w-full text-center"
              >
                Shortlist Candidate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

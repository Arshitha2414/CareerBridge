import React, { useState } from 'react';
import { CareerBridgeDB } from '../../services/db';
import { Badge } from '../common/Badge';
import { Users2, CheckCircle2, MessageSquare, Send, BookOpen, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MentorDashboard: React.FC = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [adviceText, setAdviceText] = useState('');
  const [step1, setStep1] = useState('Practice complex SQL JOINs and window functions');
  const [step2, setStep2] = useState('Publish your Power BI dashboard to GitHub with a live demo link');

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adviceText.trim()) return;

    CareerBridgeDB.addMentorFeedback({
      mentorId: 'm-1',
      mentorName: 'Priya Sharma (Lead Data Analyst)',
      studentId: 'demo-student',
      category: 'Career Advice',
      message: adviceText,
      actionableSteps: [step1, step2].filter(Boolean),
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFeedbackSent(true);
    setAdviceText('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600">
            <Users2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Mentor Portal</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review assigned students, inspect skill roadmaps, and submit actionable feedback.
            </p>
          </div>
        </div>

        {/* Assigned Student Card */}
        <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Assigned Student
              </span>
              <h3 className="text-base font-extrabold text-slate-900">Arshitha S</h3>
              <span className="text-xs text-slate-500">Targeting: Data Analyst • Readiness: 58%</span>
            </div>
            <Badge label="Active Mentorship" variant="Learning" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 block mb-0.5">Strong Skills:</span>
              <span className="font-bold text-emerald-800">Python (Int), Excel (Adv)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 block mb-0.5">Primary Gaps:</span>
              <span className="font-bold text-rose-700">SQL (Beg), Power BI (Missing)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-slate-400 block mb-0.5">Assessment:</span>
              <span className="font-bold text-brand-700">Pending SQL Test</span>
            </div>
          </div>
        </div>
      </div>

      {/* Give Feedback Form (Requirement #53) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Provide Student Feedback & Next Steps</h3>

        {feedbackSent && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Feedback dispatched to student dashboard successfully!</span>
          </div>
        )}

        <form onSubmit={handleSendFeedback} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Feedback & Recommendations</label>
            <textarea
              value={adviceText}
              onChange={(e) => setAdviceText(e.target.value)}
              rows={3}
              placeholder="Provide constructive feedback on roadmap progression, project ideas, or interview readiness..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Action Step 1</label>
              <input
                type="text"
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Action Step 2</label>
              <input
                type="text"
                value={step2}
                onChange={(e) => setStep2(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Feedback to Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

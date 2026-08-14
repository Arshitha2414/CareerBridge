import React, { useState } from 'react';
import { MENTOR_PROFILES, INITIAL_MENTOR_FEEDBACK } from '../../data/mentorsData';
import { CareerBridgeDB } from '../../services/db';
import { useAuth } from '../../context/AuthContext';
import { MentorProfile } from '../../types';
import { Modal } from '../common/Modal';
import {
  Users2,
  Star,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Send,
  Building2,
  Sparkles,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MentorGuidanceView: React.FC = () => {
  const { user } = useAuth();
  const [feedbackList, setFeedbackList] = useState(CareerBridgeDB.getMentorFeedback());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  const filteredMentors = MENTOR_PROFILES.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenRequest = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setRequestMessage(`Hi ${mentor.name}, I am preparing for a Data Analyst role and would love feedback on my SQL practice and Power BI dashboard portfolio.`);
    setShowRequestModal(true);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    CareerBridgeDB.addNotification({
      userId: user?.id || 'usr-temp',
      title: `Guidance Request Sent to ${selectedMentor.name}`,
      message: `Your request for career guidance has been dispatched. ${selectedMentor.name} will respond during their next availability window.`,
      type: 'mentor',
      link: '/mentors'
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setShowRequestModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
            <Users2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Industry Mentor Guidance</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Connect with senior engineers, data leads, and recruiters to get personalized code reviews and career advice.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative pt-5 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-7.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter mentors by name, company or skill..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>
      </div>

      {/* Mentor Feedback Notes (Requirement #53) */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Recent Mentor Feedback & Advice</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbackList.map((fb) => (
            <div key={fb.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-bold text-xs flex items-center justify-center">
                    {fb.mentorName[0]}
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-900 block">{fb.mentorName}</span>
                    <span className="text-[10px] text-slate-400">{fb.date} • {fb.category}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-brand-50 text-brand-700 text-[10px] font-bold rounded-full">
                  Actionable Advice
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                "{fb.message}"
              </p>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Action Steps:
                </span>
                <ul className="space-y-1">
                  {fb.actionableSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Mentors Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Available Verified Mentors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-card hover:border-brand-300 hover:shadow-card-hover p-5 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.avatarUrl}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{mentor.name}</h4>
                    <span className="text-xs text-slate-500 block">{mentor.title}</span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {mentor.company}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{mentor.bio}</p>

                <div className="flex flex-wrap gap-1">
                  {mentor.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 text-[10px] rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> {mentor.rating}
                  </span>
                  <span>{mentor.studentsCount} Mentees</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenRequest(mentor)}
                  className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Guidance</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Guidance Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        maxWidth="md"
        title={`Request Guidance from ${selectedMentor?.name}`}
        subtitle={`${selectedMentor?.title} at ${selectedMentor?.company}`}
      >
        <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">What would you like guidance on?</label>
            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px]">
            <strong>Availability: </strong>{selectedMentor?.availability}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowRequestModal(false)}
              className="px-3.5 py-1.5 font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Request</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

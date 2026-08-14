import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import { CAREER_ROLES } from '../../data/careersData';
import { CareerBridgeDB } from '../../services/db';
import { UserCircle, User, Briefcase, Mail, MapPin, GraduationCap, Sparkles, Check, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UserProfileView: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { targetCareer, setTargetCareer } = useCareer();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [college, setCollege] = useState(user?.college || '');
  const [degree, setDegree] = useState(user?.degree || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [currentYear, setCurrentYear] = useState(user?.currentYear || '3rd Year');
  const [graduationYear, setGraduationYear] = useState(user?.graduationYear || '2027');
  const [location, setLocation] = useState(user?.location || '');
  const [selectedCareer, setSelectedCareer] = useState(user?.targetCareerId || 'data-analyst');
  const [dailyTime, setDailyTime] = useState(user?.dailyLearningTime || '1 hour per day');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    CareerBridgeDB.updateProfile({
      fullName,
      college,
      degree,
      department,
      currentYear,
      graduationYear,
      location,
      targetCareerId: selectedCareer,
      dailyLearningTime: dailyTime,
    });

    if (selectedCareer !== user?.targetCareerId) {
      setTargetCareer(selectedCareer);
    }

    refreshUser();
    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });

    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
            <UserCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Career Profile Settings</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Update your target career goal, study preferences, and institutional background.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-slide-up">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profile saved successfully! Career Readiness recalculated dynamically.</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-6 pt-6 text-xs">
          {/* Target Career Switching (Requirement #61) */}
          <div className="p-5 bg-brand-50/50 rounded-2xl border border-brand-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>Target Career Goal (Switch Anytime)</span>
              </label>
              <span className="text-[11px] text-brand-700 font-semibold">
                Preserves all previously verified skills
              </span>
            </div>

            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-900 outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {CAREER_ROLES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} – ({c.category})
                </option>
              ))}
            </select>
          </div>

          {/* Personal & Academic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">College / University</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Degree & Major</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Year of Study</label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white"
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>Final Year</option>
                <option>Recent Graduate</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Expected Graduation Year</label>
              <input
                type="text"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Daily Study Commitment</label>
              <select
                value={dailyTime}
                onChange={(e) => setDailyTime(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white"
              >
                <option>30 minutes per day</option>
                <option>1 hour per day</option>
                <option>2 hours per day</option>
                <option>Weekends only</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Recalculate Career Readiness</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

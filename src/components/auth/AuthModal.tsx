import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { UserCheck, Lock, Mail, User, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, signup, loadDemoUser } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [role, setSelectedRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide all required fields.');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      signup(fullName, email, role);
    } else {
      login(email, role);
    }

    onSuccess();
    onClose();
  };

  const handleDemoClick = () => {
    loadDemoUser();
    onSuccess();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={mode === 'signup' ? 'Create Your CareerBridge Account' : 'Welcome Back'}
      subtitle={
        mode === 'signup'
          ? 'Start your personalized journey from current skills to career ready'
          : 'Log in to track your skill gaps, roadmap, and learning progress'
      }
    >
      <div className="space-y-5">
        {/* Quick Demo Switcher banner */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-900">Want to test without typing?</span>
          </div>
          <button
            type="button"
            onClick={handleDemoClick}
            className="px-2.5 py-1 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Launch Demo
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign Up (New User)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Your Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                  role === 'student'
                    ? 'border-brand-600 bg-brand-50/60 font-bold text-brand-900 ring-1 ring-brand-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">Student / Job Seeker</div>
                <div className="text-[10px] text-slate-500 font-normal">Personalized Guidance</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('mentor')}
                className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                  role === 'mentor'
                    ? 'border-brand-600 bg-brand-50/60 font-bold text-brand-900 ring-1 ring-brand-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">Mentor</div>
                <div className="text-[10px] text-slate-500 font-normal">Review & Guide</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('employer')}
                className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                  role === 'employer'
                    ? 'border-brand-600 bg-brand-50/60 font-bold text-brand-900 ring-1 ring-brand-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">Employer</div>
                <div className="text-[10px] text-slate-500 font-normal">Post & Hire Talent</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-2.5 text-left rounded-xl border text-xs transition-all ${
                  role === 'admin'
                    ? 'border-brand-600 bg-brand-50/60 font-bold text-brand-900 ring-1 ring-brand-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-bold">Admin</div>
                <div className="text-[10px] text-slate-500 font-normal">Platform Management</div>
              </button>
            </div>
          </div>

          {/* Full Name (Sign Up only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                required
              />
            </div>
          </div>

          {/* Confirm Password (Sign Up only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{mode === 'signup' ? 'Create Account & Start Onboarding' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </Modal>
  );
};

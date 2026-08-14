import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import { NotificationDropdown } from './NotificationDropdown';
import { Badge } from './Badge';
import { CAREER_ROLES } from '../../data/careersData';
import { Compass, User, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
  currentRoute: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenAuth }) => {
  const { user, role, setRole, logout, isAuthenticated, loadDemoUser } = useAuth();
  const { targetCareer, setTargetCareer } = useCareer();
  const [showCareerDropdown, setShowCareerDropdown] = React.useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Target Career */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => onNavigate(isAuthenticated ? '/dashboard' : '/')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight block leading-none">
                CareerBridge<span className="text-brand-600">.AI</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mt-0.5">
                Readiness Engine
              </span>
            </div>
          </button>

          {/* Demo Profile Badge */}
          {user?.isDemo && (
            <Badge label="DEMO PROFILE" variant="Demo" size="sm" className="hidden sm:inline-flex" />
          )}

          {/* Target Career Quick Switcher (Student Only) */}
          {isAuthenticated && role === 'student' && user?.isOnboardingCompleted && (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setShowCareerDropdown(!showCareerDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span className="text-slate-400">Target:</span>
                <span className="text-brand-700 font-bold">{targetCareer?.name || 'Select Career'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showCareerDropdown && (
                <div className="absolute left-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-slide-up">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-100">
                    Switch Target Career
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {CAREER_ROLES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setTargetCareer(c.id);
                          setShowCareerDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between ${
                          targetCareer?.id === c.id ? 'bg-brand-50/70 font-bold text-brand-700' : 'text-slate-700'
                        }`}
                      >
                        <span>{c.name}</span>
                        {targetCareer?.id === c.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {/* Role Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-subtle"
                >
                  <span className="capitalize text-indigo-600 font-bold">{role}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showRoleDropdown && (
                  <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-slide-up">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase text-slate-400 tracking-wider border-b border-slate-100">
                      Switch Role View
                    </div>
                    {(['student', 'mentor', 'employer', 'admin'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setRole(r);
                          setShowRoleDropdown(false);
                          if (r === 'mentor') onNavigate('/mentor-hub');
                          else if (r === 'employer') onNavigate('/employer-portal');
                          else if (r === 'admin') onNavigate('/admin-portal');
                          else onNavigate('/dashboard');
                        }}
                        className={`w-full text-left px-3 py-2 text-xs capitalize hover:bg-brand-50 flex items-center justify-between ${
                          role === r ? 'bg-brand-50/70 font-bold text-brand-700' : 'text-slate-700'
                        }`}
                      >
                        <span>{r === 'student' ? 'Student / Job Seeker' : r}</span>
                        {role === r && <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <NotificationDropdown onNavigate={onNavigate} />

              {/* User Avatar & Logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  type="button"
                  onClick={() => onNavigate('/profile')}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                      {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="hidden lg:block text-left">
                    <span className="text-xs font-bold text-slate-800 block leading-none">
                      {user?.fullName || 'Student'}
                    </span>
                    <span className="text-[10px] text-slate-400 capitalize">{role}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  loadDemoUser();
                  onNavigate('/dashboard');
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Try Demo
              </button>

              <button
                type="button"
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Log In
              </button>

              <button
                type="button"
                onClick={onOpenAuth}
                className="px-4 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm rounded-xl transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import {
  LayoutDashboard,
  Target,
  GraduationCap,
  Map,
  Code2,
  Award,
  Briefcase,
  Users2,
  Bot,
  TrendingUp,
  UserCircle,
  FileCheck2,
  FileText,
  Building2,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

interface SidebarNavItem {
  label: string;
  route: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate }) => {
  const { role, user } = useAuth();
  const { readiness, skillGaps } = useCareer();

  const missingCount = skillGaps.filter(g => g.gapCategory === 'missing' || g.gapCategory === 'improve').length;

  const studentNavItems: SidebarNavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      label: 'Skill Gap Analyzer',
      route: '/skill-gap',
      icon: <Target className="w-4 h-4" />,
      badge: missingCount > 0 ? `${missingCount}` : undefined,
      badgeColor: 'bg-rose-500'
    },
    { label: 'Learning Center', route: '/learning', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Career Roadmap', route: '/roadmap', icon: <Map className="w-4 h-4" /> },
    { label: 'Practice & Projects', route: '/projects', icon: <Code2 className="w-4 h-4" /> },
    { label: 'Skill Assessments', route: '/assessments', icon: <Award className="w-4 h-4" /> },
    {
      label: 'Job Readiness',
      route: '/job-readiness',
      icon: <FileCheck2 className="w-4 h-4" />,
      badge: readiness.isCalculated ? `${readiness.overallScore}%` : undefined,
      badgeColor: readiness.overallScore >= 70 ? 'bg-emerald-500' : 'bg-brand-500'
    },
    {
      label: 'AI Resume Builder',
      route: '/resume-builder',
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      badge: 'AI',
      badgeColor: 'bg-emerald-600'
    },
    { label: 'Job Opportunities', route: '/job-recommendations', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Find a Mentor', route: '/mentors', icon: <Users2 className="w-4 h-4" /> },
    {
      label: 'AI Career Assistant',
      route: '/ai-assistant',
      icon: <Bot className="w-4 h-4 text-brand-500" />,
      highlight: true
    },
    { label: 'Progress & Analytics', route: '/progress', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'My Career Profile', route: '/profile', icon: <UserCircle className="w-4 h-4" /> },
  ];

  const mentorNavItems: SidebarNavItem[] = [
    { label: 'Assigned Students', route: '/mentor-hub', icon: <Users2 className="w-4 h-4" /> },
    { label: 'Project Submissions', route: '/projects', icon: <Code2 className="w-4 h-4" /> },
    { label: 'Skill Roadmaps', route: '/roadmap', icon: <Map className="w-4 h-4" /> },
  ];

  const employerNavItems: SidebarNavItem[] = [
    { label: 'Post Opportunities', route: '/employer-portal', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Matched Candidates', route: '/job-recommendations', icon: <Users2 className="w-4 h-4" /> },
    { label: 'Verified Skills Pool', route: '/skill-gap', icon: <Award className="w-4 h-4" /> },
  ];

  const adminNavItems: SidebarNavItem[] = [
    { label: 'User & Role Management', route: '/admin/users', icon: <Users2 className="w-4 h-4" /> },
    { label: 'Manage Career Roles', route: '/admin/careers', icon: <Target className="w-4 h-4" /> },
    { label: 'Manage Skills & Resources', route: '/admin/resources', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Manage Assessments', route: '/admin/assessments', icon: <Award className="w-4 h-4" /> },
    { label: 'Platform Analytics', route: '/admin/analytics', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  const items =
    role === 'mentor'
      ? mentorNavItems
      : role === 'employer'
      ? employerNavItems
      : role === 'admin'
      ? adminNavItems
      : studentNavItems;

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200/80 min-h-[calc(100vh-61px)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        {/* Role Header Banner if not Student */}
        {role !== 'student' && (
          <div className="p-3 bg-indigo-50/80 border border-indigo-100 rounded-xl">
            <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-500 block">
              Active Portal
            </span>
            <p className="text-xs font-bold text-indigo-950 capitalize">{role} Dashboard</p>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = currentRoute === item.route || currentRoute.startsWith(item.route + '/');
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => onNavigate(item.route)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-bold shadow-subtle'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                } ${item.highlight ? 'ring-1 ring-brand-200/60 bg-gradient-to-r from-brand-50/40 to-transparent' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-brand-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold text-white rounded-full ${
                      item.badgeColor || 'bg-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Mini Card: Target Readiness (Student Only) */}
      {role === 'student' && user?.isOnboardingCompleted && (
        <div className="p-3.5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              Career Readiness
            </span>
            <span className="text-xs font-extrabold text-emerald-400 font-mono">
              {readiness.isCalculated ? `${readiness.overallScore}%` : 'Pending'}
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mb-2.5">
            <div
              className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${readiness.overallScore}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/skill-gap')}
            className="w-full text-center text-[11px] font-bold text-slate-200 hover:text-white flex items-center justify-center gap-1 group"
          >
            <span>Close Skill Gaps</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </aside>
  );
};

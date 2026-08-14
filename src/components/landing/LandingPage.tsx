import React from 'react';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Target,
  GraduationCap,
  ShieldCheck,
  Code2,
  Users2,
  Brain,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CAREER_ROLES } from '../../data/careersData';

interface LandingPageProps {
  onOpenAuth: () => void;
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onNavigate }) => {
  const { loadDemoUser } = useAuth();

  const handleTryDemo = () => {
    loadDemoUser();
    onNavigate('/dashboard');
  };

  const steps = [
    {
      number: '01',
      title: 'Analyze Your Current Position',
      desc: 'Tell us your background, self-reported skills, and target role or take our Career Discovery quiz to find the right fit.',
      icon: <Target className="w-5 h-5 text-brand-600" />
    },
    {
      number: '02',
      title: 'Identify & Prioritize Skill Gaps',
      desc: 'We compare your profile against actual job requirements, categorizing skills into Have, Need Improvement, and Missing.',
      icon: <BarChart3 className="w-5 h-5 text-indigo-600" />
    },
    {
      number: '03',
      title: 'Learn with Verified Resources',
      desc: 'Receive curated topics, authentic verified course links (Microsoft, Kaggle, SQLBolt), and a customized weekly study schedule.',
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />
    },
    {
      number: '04',
      title: 'Practice, Build Projects & Verify',
      desc: 'Solve guided problems, submit portfolio projects, and take standardized assessments to earn verified skill credentials.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />
    },
    {
      number: '05',
      title: 'Track Dynamic Readiness & Apply',
      desc: 'Watch your Readiness score climb transparently with every verified skill and apply to matched employer opportunities.',
      icon: <TrendingUp className="w-5 h-5 text-rose-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Smart Career-Readiness & Skill Gap System</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              Discover Your Skill Gaps.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-600">
                Learn What Matters.
              </span>{' '}
              Become Career Ready.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal">
              CareerBridge AI analyzes your target career, current skills, and practical experience to build a step-by-step roadmap from where you are now to where you want to be.
            </p>

            {/* Core Philosophy Banner */}
            <div className="p-3.5 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-subtle inline-block text-xs sm:text-sm font-semibold text-slate-700">
              <span className="text-brand-600 font-bold">Core Principle: </span>
              We don’t just identify missing skills — we explain <span className="underline decoration-brand-300 underline-offset-2">why</span> you need them and guide you on <span className="underline decoration-emerald-300 underline-offset-2">how, where, and in what order</span> to learn them.
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 hover:shadow-brand-600/30 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Get Started (Free)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleTryDemo}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Try Demo Profile (Arshitha)</span>
              </button>

              <button
                type="button"
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-6 py-3.5 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
              >
                Already have an account? Log In
              </button>
            </div>
          </div>

          {/* Interactive Feature Snapshot Preview */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-4 sm:p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">
                  Interactive Live Snapshot
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Data Analyst Readiness & Skill Gap Breakdown
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-lg">
                  Readiness: 62% Calculated
                </span>
                <span className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
                  SQL: 1 Gap Detected
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              {/* Card 1: Skills You Have */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-800">Skills You Already Have</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-emerald-100 shadow-subtle">
                    <span className="font-semibold text-slate-800">Python</span>
                    <span className="font-mono text-emerald-700 font-bold">Intermediate</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-emerald-100 shadow-subtle">
                    <span className="font-semibold text-slate-800">Excel</span>
                    <span className="font-mono text-emerald-700 font-bold">Advanced</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Needs Improvement */}
              <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-800">Needs Improvement</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-500 text-white rounded">Critical</span>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="bg-white p-2 rounded-lg border border-amber-100 shadow-subtle">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900">SQL</span>
                      <span className="text-[11px] text-amber-700 font-semibold">Beg → Int</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      Querying relational databases is required for 90% of analyst jobs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Missing Skills */}
              <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-800">Missing Skills</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-100 text-rose-800 rounded">High Priority</span>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="bg-white p-2 rounded-lg border border-rose-100 shadow-subtle">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900">Power BI</span>
                      <span className="text-[11px] text-rose-600 font-semibold">Not Learned</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      Used for converting raw data into executive dashboards & DAX KPIs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">
              The Journey
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              How CareerBridge AI Transforms You
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From confused student to verified, job-ready candidate through a proven step-by-step framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((s, idx) => (
              <div
                key={s.number}
                className="relative bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-brand-200 hover:shadow-card transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    {s.icon}
                  </div>
                  <span className="text-xs font-mono font-extrabold text-slate-400">{s.number}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Popular Supported Careers */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">
                Supported Pathways
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Explore Industry-Calibrated Roles
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Each career includes weighted skill requirements, tool stacks, verified learning paths, and projects.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTryDemo}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              <span>Explore all {CAREER_ROLES.length} careers in app</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAREER_ROLES.slice(0, 6).map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {c.category}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-full">
                      {c.marketDemand} Demand
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{c.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{c.shortDescription}</p>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {c.recommendedTools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 text-[11px] font-medium bg-slate-50 border border-slate-200 text-slate-700 rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="w-full py-2 text-center text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
                  >
                    Analyze My Fit for {c.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 User Roles Section */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 block mb-2">
              Multi-Role Ecosystem
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Built for Students, Mentors, Employers & Admins
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              CareerBridge AI brings all career readiness stakeholders onto one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Student / Job Seeker</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover gaps, learn missing skills with verified resources, take assessments, build capstones, and get job matched.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                <Users2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Industry Mentors</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect assigned student roadmaps, review project submissions, suggest high-value resources, and provide feedback.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Employers & Recruiters</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Post opportunities, define required skill weights, and filter candidates by actual verified assessment scores and projects.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-2">Platform Admins</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manage career taxonomies, skill weights, verified course directories, assessment question banks, and platform metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Stop Guessing What to Study. Start Becoming Career Ready.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Get your comprehensive career readiness score, customized learning plan, and verified skills in minutes.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl shadow-lg transition-colors"
            >
              Create Free Student Account
            </button>
            <button
              type="button"
              onClick={handleTryDemo}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              Launch Demo Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold text-xs">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-700">CareerBridge AI</span>
            <span>– Personalized Career Readiness Engine</span>
          </div>
          <p>© {new Date().getFullYear()} CareerBridge AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

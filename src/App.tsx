import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useCareer } from './context/CareerContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { SkillGapAnalyzer } from './components/skillgap/SkillGapAnalyzer';
import { MissingSkillGuidance } from './components/learning/MissingSkillGuidance';
import { LearningCenter } from './components/learning/LearningCenter';
import { CareerRoadmapView } from './components/roadmap/CareerRoadmapView';
import { ProjectsCenter } from './components/projects/ProjectsCenter';
import { AssessmentRunner } from './components/assessments/AssessmentRunner';
import { JobReadinessView } from './components/jobreadiness/JobReadinessView';
import { JobRecommendationsView } from './components/jobs/JobRecommendationsView';
import { MentorGuidanceView } from './components/mentor/MentorGuidanceView';
import { AICareerAssistant } from './components/ai/AICareerAssistant';
import { ProgressAnalyticsView } from './components/analytics/ProgressAnalyticsView';
import { UserProfileView } from './components/profile/UserProfileView';
import { ResumeBuilderView } from './components/resume/ResumeBuilderView';
import { MentorDashboard } from './components/mentor/MentorDashboard';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const { user, role, isAuthenticated, isLoading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<string>('/dashboard');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [activeSkillId, setActiveSkillId] = useState<string>('sql');
  const [activeAssessmentSkillId, setActiveAssessmentSkillId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-500">Loading CareerBridge AI...</span>
        </div>
      </div>
    );
  }

  // 1. If not authenticated -> Show Landing Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header
          onNavigate={(route) => setCurrentRoute(route)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          currentRoute={currentRoute}
        />
        <LandingPage
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onNavigate={(route) => setCurrentRoute(route)}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => setCurrentRoute('/dashboard')}
        />
      </div>
    );
  }

  // 2. If student has not completed onboarding -> Show Onboarding Wizard (Rule #6 & #7)
  if (role === 'student' && (!user?.isOnboardingCompleted || !user?.isAnalyzed)) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header
          onNavigate={(route) => setCurrentRoute(route)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          currentRoute={currentRoute}
        />
        <OnboardingWizard
          onComplete={() => setCurrentRoute('/dashboard')}
        />
      </div>
    );
  }

  // 3. Render appropriate main view
  const renderMainContent = () => {
    // Assessment Runner Mode
    if (activeAssessmentSkillId) {
      return (
        <AssessmentRunner
          skillId={activeAssessmentSkillId}
          onFinish={() => {
            setActiveAssessmentSkillId(null);
            setCurrentRoute('/dashboard');
          }}
        />
      );
    }

    // Role-specific Portals
    if (role === 'mentor') return <MentorDashboard />;
    if (role === 'employer') return <EmployerDashboard />;
    if (role === 'admin') {
      return (
        <AdminDashboard
          currentRoute={currentRoute}
          onNavigate={(route) => setCurrentRoute(route)}
        />
      );
    }

    // Student Views
    if (currentRoute.startsWith('/learning/') || currentRoute === '/skill-guidance') {
      return (
        <MissingSkillGuidance
          skillId={activeSkillId}
          onBack={() => setCurrentRoute('/skill-gap')}
          onLaunchAssessment={(sId) => setActiveAssessmentSkillId(sId)}
          onOpenProject={() => setCurrentRoute('/projects')}
        />
      );
    }

    switch (currentRoute) {
      case '/skill-gap':
        return (
          <SkillGapAnalyzer
            onSelectSkill={(sId) => {
              setActiveSkillId(sId);
              setCurrentRoute(`/learning/${sId}`);
            }}
          />
        );

      case '/learning':
        return (
          <LearningCenter
            onSelectSkill={(sId) => {
              setActiveSkillId(sId);
              setCurrentRoute(`/learning/${sId}`);
            }}
          />
        );

      case '/roadmap':
        return (
          <CareerRoadmapView
            onSelectSkill={(sId) => {
              setActiveSkillId(sId);
              setCurrentRoute(`/learning/${sId}`);
            }}
            onOpenProject={() => setCurrentRoute('/projects')}
          />
        );

      case '/projects':
        return <ProjectsCenter />;

      case '/assessments':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
              <h1 className="text-2xl font-extrabold text-slate-900">Standardized Skill Assessments</h1>
              <p className="text-xs text-slate-500 mt-1">
                Take standardized multiple-choice and scenario exams to earn officially Verified skill credentials.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {['sql', 'power-bi', 'statistics', 'python', 'react'].map((sId) => (
                <div key={sId} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
                  <h3 className="font-extrabold text-base text-slate-900 uppercase">{sId.replace('-', ' ')}</h3>
                  <p className="text-xs text-slate-500">10 Questions • 15 Minutes • 70% Pass Mark</p>
                  <button
                    type="button"
                    onClick={() => setActiveAssessmentSkillId(sId)}
                    className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    Launch Assessment
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case '/job-readiness':
        return <JobReadinessView onNavigate={(route) => setCurrentRoute(route)} />;

      case '/resume-builder':
        return <ResumeBuilderView />;

      case '/job-recommendations':
        return <JobRecommendationsView />;

      case '/mentors':
        return <MentorGuidanceView />;

      case '/ai-assistant':
        return (
          <AICareerAssistant
            onNavigate={(route) => setCurrentRoute(route)}
            onOpenSkillGuidance={(sId) => {
              setActiveSkillId(sId);
              setCurrentRoute(`/learning/${sId}`);
            }}
          />
        );

      case '/progress':
        return <ProgressAnalyticsView />;

      case '/profile':
        return <UserProfileView />;

      case '/dashboard':
      default:
        return (
          <StudentDashboard
            onNavigate={(route) => setCurrentRoute(route)}
            onOpenSkillGuidance={(sId) => {
              setActiveSkillId(sId);
              setCurrentRoute(`/learning/${sId}`);
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header
        onNavigate={(route) => {
          setActiveAssessmentSkillId(null);
          setCurrentRoute(route);
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currentRoute={currentRoute}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={(route) => {
            setActiveAssessmentSkillId(null);
            setCurrentRoute(route);
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setCurrentRoute('/dashboard')}
      />
    </div>
  );
};

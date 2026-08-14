import { AchievementItem } from '../types';

export const ALL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-onboarding',
    title: 'First Step Taken',
    description: 'Completed career profile onboarding and defined your target career trajectory.',
    icon: 'Compass',
    category: 'onboarding'
  },
  {
    id: 'ach-first-assessment',
    title: 'Assessment Pioneer',
    description: 'Took your first skill assessment to validate your hands-on technical proficiency.',
    icon: 'Award',
    category: 'assessment'
  },
  {
    id: 'ach-skill-verified',
    title: 'Verified Professional',
    description: 'Earned your first officially verified skill badge by scoring 70%+ on an assessment.',
    icon: 'ShieldCheck',
    category: 'assessment'
  },
  {
    id: 'ach-first-project',
    title: 'Builder Mindset',
    description: 'Submitted your first practical hands-on portfolio project with a GitHub repository.',
    icon: 'FolderGit2',
    category: 'project'
  },
  {
    id: 'ach-50-readiness',
    title: 'Halfway There (50%+ Readiness)',
    description: 'Attained a calculated Career Readiness score above 50% for your target role.',
    icon: 'TrendingUp',
    category: 'readiness'
  },
  {
    id: 'ach-phase-completed',
    title: 'Phase Conqueror',
    description: 'Successfully finished all skills and projects within a Career Roadmap phase.',
    icon: 'CheckCircle2',
    category: 'roadmap'
  }
];

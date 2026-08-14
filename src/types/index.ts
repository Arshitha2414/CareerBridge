export type UserRole = 'student' | 'mentor' | 'employer' | 'admin';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type SkillVerificationStatus = 'Self-Reported' | 'Verified' | 'Project-Demonstrated';
export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type GapCategory = 'have' | 'improve' | 'missing';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  college?: string;
  degree?: string;
  department?: string;
  currentYear?: string;
  graduationYear?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  targetCareerId?: string;
  dailyLearningTime?: string; // e.g. '1 hour per day'
  learningStyle?: 'video' | 'reading' | 'interactive' | 'projects' | 'mixed';
  resourcePreference?: 'free' | 'all';
  interests?: string[];
  isOnboardingCompleted: boolean;
  isAnalyzed: boolean;
  createdAt: string;
  updatedAt: string;
  isDemo?: boolean;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  skillName: string;
  category: string;
  level: SkillLevel;
  verificationStatus: SkillVerificationStatus;
  assessmentScore?: number;
  assessmentDate?: string;
  verifiedDate?: string;
  notes?: string;
}

export interface ProjectItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  skillsDemonstrated: string[];
  status: 'planning' | 'in-progress' | 'completed';
  submittedAt?: string;
  feedback?: string;
}

export interface InternshipItem {
  id: string;
  userId: string;
  company: string;
  role: string;
  duration: string;
  skillsUsed: string[];
  description: string;
}

export interface CertificationItem {
  id: string;
  userId: string;
  name: string;
  provider: string;
  completionDate: string;
  credentialUrl?: string;
}

export interface CareerRole {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  coreResponsibilities: string[];
  recommendedTools: string[];
  softSkills: string[];
  recommendedProjects: string[];
  relatedCareers: string[];
  marketDemand: 'Very High' | 'High' | 'Moderate';
}

export interface CareerSkillRequirement {
  id: string;
  careerId: string;
  skillId: string;
  skillName: string;
  category: string;
  requiredLevel: SkillLevel;
  priority: PriorityLevel;
  weight: number; // percentage, e.g. 15 for 15%
  whyNeeded: string;
  workplaceApplications: string[];
}

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  category: string;
  gapCategory: GapCategory; // 'have' | 'improve' | 'missing'
  userLevel: SkillLevel | 'Not Learned';
  requiredLevel: SkillLevel;
  priority: PriorityLevel;
  weight: number;
  verificationStatus: SkillVerificationStatus | 'None';
  assessmentScore?: number;
  whyNeeded: string;
  workplaceApplications: string[];
  estimatedWeeks: number;
}

export interface ReadinessBreakdown {
  overallScore: number; // 0 - 100
  isCalculated: boolean;
  technicalSkillsScore: number;
  toolsScore: number;
  projectsScore: number;
  assessmentsScore: number;
  experienceScore: number;
  softSkillsScore: number;
  explanation: string;
  stoppingFactors: string[];
  topGaps: SkillGapItem[];
}

export interface LearningTopic {
  id: string;
  stageNumber: number;
  stageTitle: string;
  topics: string[];
}

export interface LearningResource {
  id: string;
  skillId: string;
  topic?: string;
  title: string;
  provider: string;
  url: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  cost: 'Free' | 'Freemium' | 'Paid';
  type: 'Video' | 'Reading' | 'Interactive' | 'Course' | 'Project' | 'Documentation';
  estimatedHours: number;
  isPrimary?: boolean;
  rating?: number;
}

export interface LearningScheduleWeek {
  weekNumber: number;
  theme: string;
  topics: string[];
  estimatedHours: number;
  suggestedTasks: string[];
}

export interface PracticeTask {
  id: string;
  skillId: string;
  careerId?: string;
  title: string;
  datasetName: string;
  datasetDescription: string;
  tasks: {
    id: string;
    description: string;
    hint?: string;
    solutionSnippet?: string;
  }[];
  skillsPracticed: string[];
}

export interface UserPracticeState {
  taskId: string;
  completedSubtasks: string[];
  isCompleted: boolean;
  completedAt?: string;
}

export interface ProjectTemplate {
  id: string;
  skillIds: string[];
  careerId?: string;
  title: string;
  difficulty: string;
  estimatedTime: string;
  overview: string;
  requirements: string[];
  skillsDemonstrated: string[];
  deliverables: string[];
  sampleDatasetUrl?: string;
}

export interface AssessmentQuestion {
  id: string;
  skillId: string;
  question: string;
  type: 'mcq' | 'scenario' | 'code';
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  topicTag: string;
  explanation: string;
}

export interface AssessmentAttempt {
  id: string;
  userId: string;
  skillId: string;
  skillName: string;
  score: number; // 0 - 100
  totalQuestions: number;
  correctCount: number;
  passedLevel: SkillLevel | 'Needs More Practice';
  strongAreas: string[];
  weakAreas: string[];
  date: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  description: string;
  skills: {
    skillId: string;
    skillName: string;
    status: 'completed' | 'learning' | 'not-started' | 'locked';
  }[];
  projects: {
    projectId: string;
    title: string;
    status: 'completed' | 'available' | 'locked';
  }[];
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  expertiseCareers: string[];
  skills: string[];
  experienceYears: number;
  bio: string;
  availability: string;
  rating: number;
  studentsCount: number;
}

export interface MentorFeedbackItem {
  id: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  date: string;
  category: 'Career Advice' | 'Resource Suggestion' | 'Project Feedback' | 'Skill Recommendation';
  message: string;
  actionableSteps: string[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
  experienceLevel: 'Entry-Level' | 'Junior' | 'Associate';
  careerRole: string;
  requiredSkills: {
    skillName: string;
    level: SkillLevel;
    priority: PriorityLevel;
  }[];
  description: string;
  isDemoJob: true; // clearly labelled as per rules
  postedDate: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'onboarding' | 'assessment' | 'project' | 'readiness' | 'roadmap';
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'assessment' | 'mentor' | 'roadmap' | 'achievement' | 'learning' | 'system';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ResumeExtractedData {
  skills: string[];
  experience: InternshipItem[];
  projects: ProjectItem[];
  education: {
    institution: string;
    degree: string;
    year: string;
  };
  certifications: string[];
  score: number;
  suggestions: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

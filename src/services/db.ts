import {
  UserProfile,
  UserSkill,
  ProjectItem,
  InternshipItem,
  CertificationItem,
  SkillGapItem,
  ReadinessBreakdown,
  AssessmentAttempt,
  UserPracticeState,
  AppNotification,
  AchievementItem,
  JobOpportunity,
  MentorFeedbackItem,
  SkillLevel,
  UserRole,
  LearningResource
} from '../types';
import { CAREER_ROLES, CAREER_SKILL_REQUIREMENTS } from '../data/careersData';
import { ALL_ACHIEVEMENTS } from '../data/achievementsData';
import { DEMO_JOB_OPPORTUNITIES } from '../data/jobsData';
import { INITIAL_MENTOR_FEEDBACK } from '../data/mentorsData';

const STORAGE_KEYS = {
  PROFILE: 'cb_user_profile',
  SKILLS: 'cb_user_skills',
  PROJECTS: 'cb_user_projects',
  EXPERIENCES: 'cb_user_experiences',
  CERTIFICATIONS: 'cb_user_certifications',
  ASSESSMENTS: 'cb_user_assessments',
  PRACTICE: 'cb_user_practice',
  LEARNING_PROGRESS: 'cb_user_learning_progress',
  NOTIFICATIONS: 'cb_user_notifications',
  UNLOCKED_ACHIEVEMENTS: 'cb_user_achievements',
  CUSTOM_JOBS: 'cb_custom_jobs',
  MENTOR_FEEDBACK: 'cb_mentor_feedback',
  ALL_USERS: 'cb_all_users',
  CUSTOM_RESOURCES: 'cb_custom_resources',
};

export const LEVEL_MAP: Record<SkillLevel | 'Not Learned', number> = {
  'Not Learned': 0,
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
};

export class CareerBridgeDB {
  // ---------------------------------------------------------------------------
  // Profile Methods
  // ---------------------------------------------------------------------------
  static getProfile(): UserProfile | null {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static saveProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }

  static updateProfile(partial: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    if (!current) throw new Error('No profile exists');
    const updated = { ...current, ...partial, updatedAt: new Date().toISOString() };
    this.saveProfile(updated);
    return updated;
  }

  // ---------------------------------------------------------------------------
  // User Skills
  // ---------------------------------------------------------------------------
  static getUserSkills(): UserSkill[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SKILLS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static saveUserSkills(skills: UserSkill[]): void {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }

  static setUserSkill(skill: Omit<UserSkill, 'id'> & { id?: string }): UserSkill {
    const skills = this.getUserSkills();
    const existingIndex = skills.findIndex(s => s.skillId === skill.skillId);
    const item: UserSkill = {
      id: skill.id || `us-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...skill
    };

    if (existingIndex >= 0) {
      skills[existingIndex] = item;
    } else {
      skills.push(item);
    }
    this.saveUserSkills(skills);
    return item;
  }

  // ---------------------------------------------------------------------------
  // Projects
  // ---------------------------------------------------------------------------
  static getUserProjects(): ProjectItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static saveUserProjects(projects: ProjectItem[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }

  static addProject(project: Omit<ProjectItem, 'id'>): ProjectItem {
    const projects = this.getUserProjects();
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      ...project
    };
    projects.push(newProj);
    this.saveUserProjects(projects);
    this.checkAndUnlockAchievement('ach-first-project');
    return newProj;
  }

  // ---------------------------------------------------------------------------
  // Experiences & Certifications
  // ---------------------------------------------------------------------------
  static getExperiences(): InternshipItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
    return raw ? JSON.parse(raw) : [];
  }

  static saveExperiences(items: InternshipItem[]): void {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(items));
  }

  static getCertifications(): CertificationItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  }

  static saveCertifications(items: CertificationItem[]): void {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATIONS, JSON.stringify(items));
  }

  // ---------------------------------------------------------------------------
  // Assessments
  // ---------------------------------------------------------------------------
  static getAssessmentAttempts(): AssessmentAttempt[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
    return raw ? JSON.parse(raw) : [];
  }

  static recordAssessmentAttempt(attempt: Omit<AssessmentAttempt, 'id' | 'date'>): AssessmentAttempt {
    const attempts = this.getAssessmentAttempts();
    const newAttempt: AssessmentAttempt = {
      id: `att-${Date.now()}`,
      date: new Date().toISOString(),
      ...attempt
    };
    attempts.push(newAttempt);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(attempts));

    // If passed score >= 70%, verify user skill!
    if (attempt.score >= 70) {
      const skills = this.getUserSkills();
      const existing = skills.find(s => s.skillId === attempt.skillId);
      const passedLevel: SkillLevel = attempt.score >= 85 ? 'Advanced' : 'Intermediate';

      if (existing) {
        existing.level = passedLevel;
        existing.verificationStatus = 'Verified';
        existing.assessmentScore = attempt.score;
        existing.verifiedDate = new Date().toISOString();
        this.saveUserSkills(skills);
      } else {
        this.setUserSkill({
          userId: attempt.userId,
          skillId: attempt.skillId,
          skillName: attempt.skillName,
          category: 'Technical',
          level: passedLevel,
          verificationStatus: 'Verified',
          assessmentScore: attempt.score,
          verifiedDate: new Date().toISOString()
        });
      }

      this.checkAndUnlockAchievement('ach-skill-verified');
      this.addNotification({
        userId: attempt.userId,
        title: `Skill Verified: ${attempt.skillName}!`,
        message: `Congratulations! You scored ${attempt.score}% on the ${attempt.skillName} assessment and earned the Verified badge. Career readiness recalculated!`,
        type: 'assessment',
        link: '/assessments'
      });
    }

    this.checkAndUnlockAchievement('ach-first-assessment');
    return newAttempt;
  }

  // ---------------------------------------------------------------------------
  // Practice Progress
  // ---------------------------------------------------------------------------
  static getPracticeState(taskId: string): UserPracticeState {
    const raw = localStorage.getItem(STORAGE_KEYS.PRACTICE);
    const map: Record<string, UserPracticeState> = raw ? JSON.parse(raw) : {};
    return map[taskId] || { taskId, completedSubtasks: [], isCompleted: false };
  }

  static togglePracticeSubtask(taskId: string, subtaskId: string, totalSubtasks: number): UserPracticeState {
    const raw = localStorage.getItem(STORAGE_KEYS.PRACTICE);
    const map: Record<string, UserPracticeState> = raw ? JSON.parse(raw) : {};
    const state = map[taskId] || { taskId, completedSubtasks: [], isCompleted: false };

    if (state.completedSubtasks.includes(subtaskId)) {
      state.completedSubtasks = state.completedSubtasks.filter(id => id !== subtaskId);
    } else {
      state.completedSubtasks.push(subtaskId);
    }

    state.isCompleted = state.completedSubtasks.length >= totalSubtasks;
    if (state.isCompleted) {
      state.completedAt = new Date().toISOString();
    }

    map[taskId] = state;
    localStorage.setItem(STORAGE_KEYS.PRACTICE, JSON.stringify(map));
    return state;
  }

  // ---------------------------------------------------------------------------
  // Learning Progress
  // ---------------------------------------------------------------------------
  static getLearningProgress(): Record<string, { completedTopics: string[]; currentStage: number; status: 'Not Started' | 'Learning' | 'Completed' }> {
    const raw = localStorage.getItem(STORAGE_KEYS.LEARNING_PROGRESS);
    return raw ? JSON.parse(raw) : {};
  }

  static markTopicCompleted(skillId: string, topicName: string): void {
    const progress = this.getLearningProgress();
    const item = progress[skillId] || { completedTopics: [], currentStage: 1, status: 'Learning' };
    if (!item.completedTopics.includes(topicName)) {
      item.completedTopics.push(topicName);
      item.status = 'Learning';
    }
    progress[skillId] = item;
    localStorage.setItem(STORAGE_KEYS.LEARNING_PROGRESS, JSON.stringify(progress));
  }

  // ---------------------------------------------------------------------------
  // Notifications & Achievements
  // ---------------------------------------------------------------------------
  static getNotifications(): AppNotification[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return raw ? JSON.parse(raw) : [];
  }

  static addNotification(notif: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>): AppNotification {
    const list = this.getNotifications();
    const item: AppNotification = {
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
      ...notif
    };
    list.unshift(item);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    return item;
  }

  static markNotificationAsRead(id: string): void {
    const list = this.getNotifications();
    const found = list.find(n => n.id === id);
    if (found) {
      found.isRead = true;
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    }
  }

  static getUnlockedAchievements(): string[] {
    const raw = localStorage.getItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS);
    return raw ? JSON.parse(raw) : [];
  }

  static checkAndUnlockAchievement(achievementId: string): boolean {
    const unlocked = this.getUnlockedAchievements();
    if (!unlocked.includes(achievementId)) {
      unlocked.push(achievementId);
      localStorage.setItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS, JSON.stringify(unlocked));
      const ach = ALL_ACHIEVEMENTS.find(a => a.id === achievementId);
      if (ach) {
        const profile = this.getProfile();
        if (profile) {
          this.addNotification({
            userId: profile.id,
            title: `Achievement Unlocked: ${ach.title}!`,
            message: ach.description,
            type: 'achievement',
            link: '/progress'
          });
        }
      }
      return true;
    }
    return false;
  }

  // ---------------------------------------------------------------------------
  // Mentor Feedback
  // ---------------------------------------------------------------------------
  static getMentorFeedback(): MentorFeedbackItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MENTOR_FEEDBACK);
    if (!raw) return INITIAL_MENTOR_FEEDBACK;
    return JSON.parse(raw);
  }

  static addMentorFeedback(feedback: Omit<MentorFeedbackItem, 'id' | 'date'>): MentorFeedbackItem {
    const list = this.getMentorFeedback();
    const item: MentorFeedbackItem = {
      id: `mf-${Date.now()}`,
      date: 'Just now',
      ...feedback
    };
    list.unshift(item);
    localStorage.setItem(STORAGE_KEYS.MENTOR_FEEDBACK, JSON.stringify(list));
    return item;
  }

  // ---------------------------------------------------------------------------
  // Opportunities / Jobs
  // ---------------------------------------------------------------------------
  static getJobOpportunities(): JobOpportunity[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_JOBS);
    const custom: JobOpportunity[] = raw ? JSON.parse(raw) : [];
    return [...DEMO_JOB_OPPORTUNITIES, ...custom];
  }

  static createJobOpportunity(job: Omit<JobOpportunity, 'id' | 'isDemoJob' | 'postedDate'>): JobOpportunity {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_JOBS);
    const list: JobOpportunity[] = raw ? JSON.parse(raw) : [];
    const item: JobOpportunity = {
      id: `job-${Date.now()}`,
      isDemoJob: true,
      postedDate: 'Just now',
      ...job
    };
    list.unshift(item);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_JOBS, JSON.stringify(list));
    return item;
  }

  // ===========================================================================
  // ALGORITHM: Skill Gap Analyzer (Requirements #21, #22, #67)
  // ===========================================================================
  static calculateSkillGaps(targetCareerId?: string, userSkillsParam?: UserSkill[]): SkillGapItem[] {
    if (!targetCareerId) return [];
    const requirements = CAREER_SKILL_REQUIREMENTS.filter(r => r.careerId === targetCareerId);
    const userSkills = userSkillsParam || this.getUserSkills();

    const gaps: SkillGapItem[] = requirements.map(req => {
      const userSkill = userSkills.find(s => s.skillId === req.skillId || s.skillName.toLowerCase() === req.skillName.toLowerCase());
      const userLevel = userSkill ? userSkill.level : 'Not Learned';
      const userVal = LEVEL_MAP[userLevel];
      const reqVal = LEVEL_MAP[req.requiredLevel];

      let gapCategory: 'have' | 'improve' | 'missing';
      if (!userSkill || userLevel === 'Not Learned') {
        gapCategory = 'missing';
      } else if (userVal < reqVal) {
        gapCategory = 'improve';
      } else {
        gapCategory = 'have';
      }

      // Estimate learning weeks based on required level
      const estimatedWeeks = req.requiredLevel === 'Advanced' ? 5 : req.requiredLevel === 'Intermediate' ? 3 : 2;

      return {
        skillId: req.skillId,
        skillName: req.skillName,
        category: req.category,
        gapCategory,
        userLevel,
        requiredLevel: req.requiredLevel,
        priority: req.priority,
        weight: req.weight,
        verificationStatus: userSkill ? userSkill.verificationStatus : 'None',
        assessmentScore: userSkill?.assessmentScore,
        whyNeeded: req.whyNeeded,
        workplaceApplications: req.workplaceApplications,
        estimatedWeeks
      };
    });

    // Priority sorting: Missing/Improve first, sorted by Critical -> High -> Medium -> Low, then by weight
    const priorityWeight: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    gaps.sort((a, b) => {
      // Missing and Improve come before Have
      const catOrder = { missing: 0, improve: 1, have: 2 };
      if (catOrder[a.gapCategory] !== catOrder[b.gapCategory]) {
        return catOrder[a.gapCategory] - catOrder[b.gapCategory];
      }
      // Then by priority
      const pDiff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      if (pDiff !== 0) return pDiff;
      // Then by weight
      return b.weight - a.weight;
    });

    return gaps;
  }

  // ===========================================================================
  // ALGORITHM: Dynamic Career Readiness Score (Requirements #20, #40, #65, #66)
  // ===========================================================================
  static calculateReadiness(
    profile: UserProfile | null,
    userSkillsParam?: UserSkill[],
    projectsParam?: ProjectItem[],
    experiencesParam?: InternshipItem[],
    assessmentsParam?: AssessmentAttempt[]
  ): ReadinessBreakdown {
    if (!profile || !profile.isAnalyzed || !profile.targetCareerId) {
      return {
        overallScore: 0,
        isCalculated: false,
        technicalSkillsScore: 0,
        toolsScore: 0,
        projectsScore: 0,
        assessmentsScore: 0,
        experienceScore: 0,
        softSkillsScore: 0,
        explanation: 'Career readiness has not been calculated yet. Complete onboarding and click "Analyze My Career" to generate your baseline score.',
        stoppingFactors: ['Initial career analysis pending'],
        topGaps: []
      };
    }

    const career = CAREER_ROLES.find(c => c.id === profile.targetCareerId);
    const requirements = CAREER_SKILL_REQUIREMENTS.filter(r => r.careerId === profile.targetCareerId);
    const userSkills = userSkillsParam || this.getUserSkills();
    const projects = projectsParam || this.getUserProjects();
    const experiences = experiencesParam || this.getExperiences();
    const assessments = assessmentsParam || this.getAssessmentAttempts();

    const gaps = this.calculateSkillGaps(profile.targetCareerId, userSkills);
    const missingOrWeak = gaps.filter(g => g.gapCategory !== 'have');

    // 1. Technical Skills Score (Weight: 40%)
    let earnedSkillPoints = 0;
    let totalSkillWeight = 0;

    requirements.forEach(req => {
      totalSkillWeight += req.weight;
      const userSkill = userSkills.find(s => s.skillId === req.skillId || s.skillName.toLowerCase() === req.skillName.toLowerCase());
      if (userSkill) {
        const uVal = LEVEL_MAP[userSkill.level];
        const rVal = LEVEL_MAP[req.requiredLevel];
        const fulfillment = Math.min(uVal / rVal, 1.0);
        // Confidence weight: Verified = 1.0, Self-Reported = 0.85
        const confidence = userSkill.verificationStatus === 'Verified' ? 1.0 : userSkill.verificationStatus === 'Project-Demonstrated' ? 0.95 : 0.85;
        earnedSkillPoints += fulfillment * confidence * req.weight;
      }
    });

    const technicalSkillsScore = totalSkillWeight > 0 ? Math.round((earnedSkillPoints / totalSkillWeight) * 100) : 0;

    // 2. Tools Score (Weight: 15%)
    let toolsMatched = 0;
    const recommendedTools = career?.recommendedTools || [];
    recommendedTools.forEach(t => {
      const match = userSkills.some(s => s.skillName.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.skillName.toLowerCase()));
      if (match) toolsMatched++;
    });
    const toolsScore = recommendedTools.length > 0 ? Math.min(Math.round((toolsMatched / recommendedTools.length) * 100), 100) : 60;

    // 3. Projects Score (Weight: 15%)
    let projectsScore = 0;
    const completedProjects = projects.filter(p => p.status === 'completed');
    if (completedProjects.length >= 2) {
      projectsScore = 100;
    } else if (completedProjects.length === 1) {
      projectsScore = 70;
    } else if (projects.length > 0) {
      projectsScore = 40;
    } else {
      projectsScore = 0;
    }

    // 4. Assessments Score (Weight: 10%)
    const passedAssessments = assessments.filter(a => a.score >= 70);
    const assessmentsScore = Math.min(passedAssessments.length * 40, 100);

    // 5. Experience Score (Weight: 10%)
    const experienceScore = experiences.length >= 2 ? 100 : experiences.length === 1 ? 75 : 30;

    // 6. Soft Skills Score (Weight: 10%)
    const softSkillsScore = userSkills.some(s => s.category.toLowerCase().includes('soft') || s.skillName.toLowerCase().includes('communication')) ? 80 : 50;

    // Composite Weighted Calculation
    const composite = (
      technicalSkillsScore * 0.40 +
      toolsScore * 0.15 +
      projectsScore * 0.15 +
      assessmentsScore * 0.10 +
      experienceScore * 0.10 +
      softSkillsScore * 0.10
    );

    const overallScore = Math.min(Math.max(Math.round(composite), 5), 100);

    // Stopping Factors
    const stoppingFactors: string[] = [];
    if (missingOrWeak.length > 0) {
      const topGapNames = missingOrWeak.slice(0, 3).map(g => g.skillName).join(', ');
      stoppingFactors.push(`Critical technical skill gaps in: ${topGapNames}`);
    }
    if (completedProjects.length === 0) {
      stoppingFactors.push('No verified hands-on portfolio projects submitted');
    }
    if (passedAssessments.length === 0) {
      stoppingFactors.push('No skills have been verified by standardized assessment');
    }

    // Dynamic Explanation
    let explanation = '';
    const knownSkills = userSkills.filter(s => (s.level as string) !== 'Not Learned').map(s => s.skillName);
    if (knownSkills.length > 0 && missingOrWeak.length > 0) {
      explanation = `You already have a solid foundation in ${knownSkills.slice(0, 3).join(', ')}, but ${missingOrWeak.slice(0, 3).map(g => g.skillName).join(', ')} are critical requirements to become fully job ready for ${career?.name || 'this role'}.`;
    } else if (missingOrWeak.length === 0) {
      explanation = `Outstanding! You satisfy all core technical requirements for ${career?.name || 'this role'}. Focus on project portfolio refinement and mock interview practice.`;
    } else {
      explanation = `To become competitive for ${career?.name || 'this role'}, start with the foundational skills highlighted in your skill gap analysis.`;
    }

    // Achievement check for 50%
    if (overallScore >= 50) {
      this.checkAndUnlockAchievement('ach-50-readiness');
    }

    return {
      overallScore,
      isCalculated: true,
      technicalSkillsScore,
      toolsScore,
      projectsScore,
      assessmentsScore,
      experienceScore,
      softSkillsScore,
      explanation,
      stoppingFactors,
      topGaps: missingOrWeak.slice(0, 3)
    };
  }

  // ===========================================================================
  // ALGORITHM: "What Should I Do Next?" Intelligent Action (Requirement #45, #68)
  // ===========================================================================
  static getRecommendedNextAction(
    profile: UserProfile | null,
    gaps: SkillGapItem[],
    assessments: AssessmentAttempt[],
    projects: ProjectItem[]
  ): { title: string; subtitle: string; actionLabel: string; route: string; skillId?: string } {
    if (!profile || !profile.isAnalyzed) {
      return {
        title: 'Complete Your Career Analysis',
        subtitle: 'Finish your onboarding profile to unlock your personalized career readiness roadmap.',
        actionLabel: 'Start Onboarding',
        route: '/onboarding'
      };
    }

    // 1. Look for unverified skills where user already has intermediate knowledge -> Recommend Assessment!
    const unverifiedGoodSkill = gaps.find(g => (g.userLevel === 'Intermediate' || g.userLevel === 'Advanced') && g.verificationStatus !== 'Verified');
    if (unverifiedGoodSkill && !assessments.some(a => a.skillId === unverifiedGoodSkill.skillId && a.score >= 70)) {
      return {
        title: `Validate Your ${unverifiedGoodSkill.skillName} Knowledge`,
        subtitle: `You self-reported ${unverifiedGoodSkill.userLevel} proficiency. Take the 15-minute assessment to earn a Verified badge and boost your readiness.`,
        actionLabel: `Take ${unverifiedGoodSkill.skillName} Assessment`,
        route: `/learning/${unverifiedGoodSkill.skillId}`,
        skillId: unverifiedGoodSkill.skillId
      };
    }

    // 2. Look for top priority missing or weak skill
    const topGap = gaps.find(g => g.gapCategory === 'missing' || g.gapCategory === 'improve');
    if (topGap) {
      return {
        title: topGap.gapCategory === 'improve' ? `Master ${topGap.skillName} to Intermediate Level` : `Start Learning ${topGap.skillName} (${topGap.priority} Priority)`,
        subtitle: `${topGap.whyNeeded.slice(0, 100)}... Follow your personalized weekly schedule and practice tasks.`,
        actionLabel: `View ${topGap.skillName} Learning Path`,
        route: `/learning/${topGap.skillId}`,
        skillId: topGap.skillId
      };
    }

    // 3. If skills are met but no project completed -> Recommend Project!
    if (projects.filter(p => p.status === 'completed').length === 0) {
      return {
        title: 'Build Your First Portfolio Project',
        subtitle: 'Employers require proof of practical ability. Submit an end-to-end project to demonstrate your skills.',
        actionLabel: 'Explore Projects',
        route: '/projects'
      };
    }

    return {
      title: 'Review Job Recommendations',
      subtitle: 'Your readiness is looking strong! Explore matched opportunities and refine your resume.',
      actionLabel: 'View Matched Jobs',
      route: '/job-recommendations'
    };
  }

  // ===========================================================================
  // DEMO PROFILE LOADER: Arshitha (Data Analyst) (Requirement #69)
  // ===========================================================================
  static loadDemoProfile(): void {
    const demoProfile: UserProfile = {
      id: 'demo-user-arshitha',
      email: 'arshitha@careerbridge.ai',
      fullName: 'Arshitha S',
      role: 'student',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      college: 'National Institute of Engineering',
      degree: 'B.Tech in Computer Science',
      department: 'Computer Science & Engineering',
      currentYear: '3rd Year',
      graduationYear: '2027',
      location: 'Bangalore, India',
      linkedinUrl: 'https://linkedin.com/in/arshitha-demo',
      githubUrl: 'https://github.com/arshitha-demo',
      targetCareerId: 'data-analyst',
      dailyLearningTime: '1 hour per day',
      learningStyle: 'interactive',
      resourcePreference: 'all',
      interests: ['Data Analysis', 'Programming', 'Business', 'Automation'],
      isOnboardingCompleted: true,
      isAnalyzed: true,
      isDemo: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const demoSkills: UserSkill[] = [
      {
        id: 'us-py',
        userId: demoProfile.id,
        skillId: 'python',
        skillName: 'Python',
        category: 'Programming',
        level: 'Intermediate',
        verificationStatus: 'Self-Reported'
      },
      {
        id: 'us-xl',
        userId: demoProfile.id,
        skillId: 'excel',
        skillName: 'Excel',
        category: 'Data & Analytics',
        level: 'Advanced',
        verificationStatus: 'Self-Reported'
      },
      {
        id: 'us-sql',
        userId: demoProfile.id,
        skillId: 'sql',
        skillName: 'SQL',
        category: 'Data & Databases',
        level: 'Beginner',
        verificationStatus: 'Self-Reported'
      },
      {
        id: 'us-comm',
        userId: demoProfile.id,
        skillId: 'communication',
        skillName: 'Communication & Data Storytelling',
        category: 'Soft Skills',
        level: 'Intermediate',
        verificationStatus: 'Self-Reported'
      }
    ];

    this.saveProfile(demoProfile);
    this.saveUserSkills(demoSkills);
    this.saveUserProjects([]);
    this.saveExperiences([]);
    this.saveCertifications([]);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.PRACTICE, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.LEARNING_PROGRESS, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_ACHIEVEMENTS, JSON.stringify(['ach-onboarding']));
    
    // Add initial welcome notification
    this.addNotification({
      userId: demoProfile.id,
      title: 'Welcome to CareerBridge AI, Arshitha!',
      message: 'Your baseline Career Readiness has been calculated at 58%. Check your Skill Gap Analyzer to see why SQL and Power BI are your highest-priority focus areas.',
      type: 'system',
      link: '/skill-gap'
    });
  }

  // ---------------------------------------------------------------------------
  // Admin User & Role Management (Requirement #3, #55)
  // ---------------------------------------------------------------------------
  static getAllUsers(): UserProfile[] {
    const raw = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
    let list: UserProfile[] = raw ? JSON.parse(raw) : [];
    const current = this.getProfile();
    if (current && !list.some(u => u.id === current.id)) {
      list.unshift(current);
    }
    if (list.length === 0) {
      list = [
        {
          id: 'usr-student-1',
          email: 'arshitha@careerbridge.ai',
          fullName: 'Arshitha S',
          role: 'student',
          college: 'National Institute of Engineering',
          degree: 'B.Tech CS',
          targetCareerId: 'data-analyst',
          isOnboardingCompleted: true,
          isAnalyzed: true,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'usr-mentor-1',
          email: 'priya.mentor@careerbridge.ai',
          fullName: 'Priya Sharma',
          role: 'mentor',
          college: 'IIT Madras',
          location: 'Bangalore',
          isOnboardingCompleted: true,
          isAnalyzed: false,
          createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'usr-employer-1',
          email: 'recruiter@technova.com',
          fullName: 'Vikram Joshi (HR)',
          role: 'employer',
          location: 'Bangalore',
          isOnboardingCompleted: true,
          isAnalyzed: false,
          createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'usr-admin-1',
          email: 'admin@careerbridge.ai',
          fullName: 'System Administrator',
          role: 'admin',
          isOnboardingCompleted: true,
          isAnalyzed: false,
          createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(list));
    }
    return list;
  }

  static updateUserRole(userId: string, newRole: UserRole): UserProfile | null {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      users[userIndex].role = newRole;
      users[userIndex].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));

      // Also update active session if current user
      const current = this.getProfile();
      if (current && current.id === userId) {
        current.role = newRole;
        this.saveProfile(current);
      }
      return users[userIndex];
    }
    return null;
  }

  static createUserByAdmin(data: Partial<UserProfile> & { email: string; fullName: string; role: UserRole }): UserProfile {
    const users = this.getAllUsers();
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      college: 'Engineering Institute',
      degree: 'Bachelor of Technology',
      targetCareerId: 'data-analyst',
      location: 'India',
      isOnboardingCompleted: true,
      isAnalyzed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    users.unshift(newUser);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
    return newUser;
  }

  static deleteUser(userId: string): void {
    const users = this.getAllUsers().filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
  }

  // Clear all data for a clean fresh slate
  static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
  }
}

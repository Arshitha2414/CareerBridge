import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UserProfile,
  UserSkill,
  ProjectItem,
  InternshipItem,
  CertificationItem,
  CareerRole,
  SkillGapItem,
  ReadinessBreakdown,
  AssessmentAttempt,
  AppNotification,
  SkillLevel
} from '../types';
import { CareerBridgeDB } from '../services/db';
import { CAREER_ROLES } from '../data/careersData';
import { useAuth } from './AuthContext';

interface CareerContextType {
  targetCareer: CareerRole | null;
  userSkills: UserSkill[];
  projects: ProjectItem[];
  experiences: InternshipItem[];
  certifications: CertificationItem[];
  assessments: AssessmentAttempt[];
  readiness: ReadinessBreakdown;
  skillGaps: SkillGapItem[];
  notifications: AppNotification[];
  unlockedAchievements: string[];
  nextAction: { title: string; subtitle: string; actionLabel: string; route: string; skillId?: string };
  
  // Actions
  setTargetCareer: (careerId: string) => void;
  updateUserSkill: (skillId: string, skillName: string, category: string, level: SkillLevel) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => ProjectItem;
  submitAssessment: (attempt: Omit<AssessmentAttempt, 'id' | 'date'>) => AssessmentAttempt;
  togglePracticeTask: (taskId: string, subtaskId: string, totalSubtasks: number) => void;
  completeTopic: (skillId: string, topicName: string) => void;
  markNotificationRead: (id: string) => void;
  recalculateAll: () => void;
  triggerCareerAnalysis: () => void;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, refreshUser } = useAuth();

  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [experiences, setExperiences] = useState<InternshipItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [assessments, setAssessments] = useState<AssessmentAttempt[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  
  const [readiness, setReadiness] = useState<ReadinessBreakdown>({
    overallScore: 0,
    isCalculated: false,
    technicalSkillsScore: 0,
    toolsScore: 0,
    projectsScore: 0,
    assessmentsScore: 0,
    experienceScore: 0,
    softSkillsScore: 0,
    explanation: 'Career readiness not calculated.',
    stoppingFactors: [],
    topGaps: []
  });

  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>([]);

  const reloadData = useCallback(() => {
    const skills = CareerBridgeDB.getUserSkills();
    const projs = CareerBridgeDB.getUserProjects();
    const exps = CareerBridgeDB.getExperiences();
    const certs = CareerBridgeDB.getCertifications();
    const atts = CareerBridgeDB.getAssessmentAttempts();
    const notifs = CareerBridgeDB.getNotifications();
    const achs = CareerBridgeDB.getUnlockedAchievements();

    setUserSkills(skills);
    setProjects(projs);
    setExperiences(exps);
    setCertifications(certs);
    setAssessments(atts);
    setNotifications(notifs);
    setUnlockedAchievements(achs);

    if (user?.targetCareerId) {
      const gaps = CareerBridgeDB.calculateSkillGaps(user.targetCareerId, skills);
      setSkillGaps(gaps);

      const ready = CareerBridgeDB.calculateReadiness(user, skills, projs, exps, atts);
      setReadiness(ready);
    } else {
      setSkillGaps([]);
      setReadiness({
        overallScore: 0,
        isCalculated: false,
        technicalSkillsScore: 0,
        toolsScore: 0,
        projectsScore: 0,
        assessmentsScore: 0,
        experienceScore: 0,
        softSkillsScore: 0,
        explanation: 'Career readiness has not been calculated.',
        stoppingFactors: ['No target career selected'],
        topGaps: []
      });
    }
  }, [user]);

  useEffect(() => {
    reloadData();
  }, [user, reloadData]);

  const targetCareer = CAREER_ROLES.find(c => c.id === user?.targetCareerId) || null;

  const setTargetCareer = (careerId: string) => {
    if (!user) return;
    CareerBridgeDB.updateProfile({ targetCareerId: careerId, isAnalyzed: true });
    refreshUser();
  };

  const updateUserSkill = (skillId: string, skillName: string, category: string, level: SkillLevel) => {
    if (!user) return;
    CareerBridgeDB.setUserSkill({
      userId: user.id,
      skillId,
      skillName,
      category,
      level,
      verificationStatus: 'Self-Reported'
    });
    reloadData();
  };

  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const created = CareerBridgeDB.addProject(project);
    reloadData();
    return created;
  };

  const submitAssessment = (attempt: Omit<AssessmentAttempt, 'id' | 'date'>) => {
    const recorded = CareerBridgeDB.recordAssessmentAttempt(attempt);
    reloadData();
    return recorded;
  };

  const togglePracticeTask = (taskId: string, subtaskId: string, totalSubtasks: number) => {
    CareerBridgeDB.togglePracticeSubtask(taskId, subtaskId, totalSubtasks);
    reloadData();
  };

  const completeTopic = (skillId: string, topicName: string) => {
    CareerBridgeDB.markTopicCompleted(skillId, topicName);
    reloadData();
  };

  const markNotificationRead = (id: string) => {
    CareerBridgeDB.markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const triggerCareerAnalysis = () => {
    if (!user) return;
    CareerBridgeDB.updateProfile({ isAnalyzed: true, isOnboardingCompleted: true });
    CareerBridgeDB.checkAndUnlockAchievement('ach-onboarding');
    refreshUser();
  };

  const nextAction = CareerBridgeDB.getRecommendedNextAction(user, skillGaps, assessments, projects);

  return (
    <CareerContext.Provider
      value={{
        targetCareer,
        userSkills,
        projects,
        experiences,
        certifications,
        assessments,
        readiness,
        skillGaps,
        notifications,
        unlockedAchievements,
        nextAction,
        setTargetCareer,
        updateUserSkill,
        addProject,
        submitAssessment,
        togglePracticeTask,
        completeTopic,
        markNotificationRead,
        recalculateAll: reloadData,
        triggerCareerAnalysis,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) throw new Error('useCareer must be used within a CareerProvider');
  return context;
};

import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { SKILL_LEARNING_DETAILS } from '../../data/learningPathsData';
import { VERIFIED_LEARNING_RESOURCES } from '../../data/learningResourcesData';
import { PRACTICE_TASKS } from '../../data/practiceTasksData';
import { PROJECT_TEMPLATES } from '../../data/projectsData';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles,
  Code2,
  Award,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  PlayCircle,
  Layers,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

interface MissingSkillGuidanceProps {
  skillId: string;
  onBack: () => void;
  onLaunchAssessment: (skillId: string) => void;
  onOpenProject: (projectId: string) => void;
}

export const MissingSkillGuidance: React.FC<MissingSkillGuidanceProps> = ({
  skillId,
  onBack,
  onLaunchAssessment,
  onOpenProject,
}) => {
  const { user } = useAuth();
  const {
    targetCareer,
    skillGaps,
    userSkills,
    assessments,
    togglePracticeTask,
    completeTopic,
  } = useCareer();

  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'resources' | 'schedule' | 'practice' | 'project'>(
    'overview'
  );
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({ 'sql-s1': true, 'pbi-s1': true, 'stat-s1': true });
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Skill Gap details
  const gapItem = skillGaps.find((g) => g.skillId === skillId) || {
    skillId,
    skillName: skillId.toUpperCase(),
    category: 'Technical',
    gapCategory: 'missing',
    userLevel: 'Not Learned',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 15,
    verificationStatus: 'None',
    whyNeeded: 'Crucial requirement for industry data analysis and reporting.',
    workplaceApplications: ['Data Extraction', 'KPI Reporting'],
    estimatedWeeks: 3,
  };

  // Learning detail dataset
  const learningDetail = SKILL_LEARNING_DETAILS[skillId] || {
    skillId,
    skillName: gapItem.skillName,
    defaultTimeWeeks: gapItem.estimatedWeeks,
    whatIsThis: `${gapItem.skillName} is an industry-standard technology required for modern software and data workflows.`,
    whyNeededByCareer: {},
    generalWhyNeeded: gapItem.whyNeeded,
    generalUseCases: gapItem.workplaceApplications,
    stages: [
      {
        id: `${skillId}-s1`,
        stageNumber: 1,
        stageTitle: 'Stage 1 – Core Fundamentals',
        topics: ['Basic syntax and commands', 'Data types and structures', 'Core operation workflow']
      },
      {
        id: `${skillId}-s2`,
        stageNumber: 2,
        stageTitle: 'Stage 2 – Intermediate Practical Applications',
        topics: ['Filtering and aggregation', 'Complex logic handling', 'Real-world dataset scenarios']
      },
      {
        id: `${skillId}-s3`,
        stageNumber: 3,
        stageTitle: 'Stage 3 – Capstone & Verification',
        topics: ['Building portfolio project', 'Taking standardized skill assessment']
      }
    ],
    schedulesByHours: {
      '1h': [
        { weekNumber: 1, theme: 'Foundations', topics: ['Core concepts'], estimatedHours: 7, suggestedTasks: ['Intro exercises'] },
        { weekNumber: 2, theme: 'Intermediate Practice', topics: ['Applied queries/code'], estimatedHours: 7, suggestedTasks: ['Build demo problem'] },
        { weekNumber: 3, theme: 'Project & Assessment', topics: ['Capstone & Verification'], estimatedHours: 7, suggestedTasks: ['Submit project & take assessment'] }
      ]
    }
  };

  // Verified Resources for this skill
  const skillResources = VERIFIED_LEARNING_RESOURCES.filter((r) => r.skillId === skillId);
  const primaryResource = skillResources.find((r) => r.isPrimary) || skillResources[0];
  const alternativeResources = skillResources.filter((r) => r.id !== primaryResource?.id);

  // Practice task for this skill
  const practiceTask = PRACTICE_TASKS.find((pt) => pt.skillId === skillId);

  // Project for this skill
  const projectTemplate = PROJECT_TEMPLATES.find((p) => p.skillIds.includes(skillId));

  // Career specific Why & Use Cases
  const careerCareerKey = targetCareer?.id || 'data-analyst';
  const careerSpecific = learningDetail.whyNeededByCareer[careerCareerKey];
  const whyNeededText = careerSpecific?.whyNeeded || learningDetail.generalWhyNeeded;
  const useCasesList = careerSpecific?.useCases || learningDetail.generalUseCases;

  // Selected schedule by user daily hours
  const scheduleWeeks = learningDetail.schedulesByHours['1h'] || Object.values(learningDetail.schedulesByHours)[0];

  const userSkillRecord = userSkills.find((s) => s.skillId === skillId);
  const isVerified = userSkillRecord?.verificationStatus === 'Verified';
  const pastAssessment = assessments.find((a) => a.skillId === skillId);

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const toggleSolution = (subtaskId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [subtaskId]: !prev[subtaskId] }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Skill Header Card (Requirements #23 & #24) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Skill Gaps</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-100 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-extrabold text-slate-900">{gapItem.skillName}</h1>
              <Badge label={gapItem.priority} variant={gapItem.priority} />
              {isVerified ? (
                <Badge label="Verified by Assessment" variant="Verified" />
              ) : (
                <Badge label={`Current: ${gapItem.userLevel}`} variant={gapItem.userLevel as any} />
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {learningDetail.whatIsThis}
            </p>
          </div>

          {/* Quick Assessment Launch Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-200/80 shrink-0 space-y-2 text-center md:text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 block">
              Skill Verification
            </span>
            <div className="text-xs font-semibold text-slate-700">
              {isVerified ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1 justify-center md:justify-end">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Score: {userSkillRecord?.assessmentScore}% Verified
                </span>
              ) : (
                <span>10 Questions • ~15 Minutes</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onLaunchAssessment(skillId)}
              className="w-full px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isVerified ? 'Retake Assessment' : 'Take Skill Assessment'}</span>
            </button>
          </div>
        </div>

        {/* Level Comparison & Target Goal Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Your Current Level
            </span>
            <span className="font-extrabold text-slate-800 text-sm">{gapItem.userLevel}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Required for {targetCareer?.name || 'Career'}
            </span>
            <span className="font-extrabold text-brand-700 text-sm">{gapItem.requiredLevel}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Estimated Duration
            </span>
            <span className="font-extrabold text-slate-800 text-sm">~{gapItem.estimatedWeeks} Weeks ({user?.dailyLearningTime || '1h/day'})</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Readiness Weight
            </span>
            <span className="font-extrabold text-emerald-700 text-sm">{gapItem.weight}% of Technical Score</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100 text-xs font-bold">
          {[
            { id: 'overview', label: '1. Why You Need It', icon: <HelpCircle className="w-3.5 h-3.5" /> },
            { id: 'curriculum', label: '2. What to Learn (Topics)', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'resources', label: '3. Where to Learn', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'schedule', label: '4. Personalized Schedule', icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'practice', label: '5. Hands-on Practice', icon: <Code2 className="w-3.5 h-3.5" /> },
            { id: 'project', label: '6. Mini Project & Verify', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW & WHY NEEDED (Requirements #26 & #27) */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Why Needed specifically for Target Career */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Why You Need {gapItem.skillName} for {targetCareer?.name || 'Your Career'}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
              {whyNeededText}
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-900 block mb-2">
                Real-World Workplace Applications:
              </span>
              <ul className="space-y-2">
                {useCasesList.map((uc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How learning affects Readiness (Requirement #40 & #65) */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 space-y-5 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">
                  Career Readiness Recalculation Impact
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Completing this learning path and verifying {gapItem.skillName} with a 70%+ assessment score will directly satisfy a <strong className="text-white">{gapItem.weight}%</strong> career requirement.
              </p>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Target Proficiency Boost</span>
                  <span className="text-emerald-400 font-mono">+{Math.round(gapItem.weight * 0.45)}% Readiness</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-2 rounded-full"
                    style={{ width: `${gapItem.weight * 3}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Weighted transparent calculation based on role requirements.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('curriculum')}
              className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Stage-by-Stage Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STAGE-BY-STAGE TOPICS (Requirements #25 & #26) */}
      {/* ========================================================================= */}
      {activeTab === 'curriculum' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                What to Learn: {gapItem.skillName} Roadmap
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sequential learning stages curated specifically for {targetCareer?.name || 'your target career'}.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {learningDetail.stages.length} Structured Stages
            </span>
          </div>

          <div className="space-y-4">
            {learningDetail.stages.map((stage) => {
              const isExpanded = expandedStages[stage.id] ?? true;
              return (
                <div
                  key={stage.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleStage(stage.id)}
                    className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                        {stage.stageNumber}
                      </span>
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {stage.stageTitle}
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {stage.topics.map((t, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700"
                          >
                            <span className="font-medium">{t}</span>
                            <button
                              type="button"
                              onClick={() => completeTopic(skillId, t)}
                              className="text-[10px] font-bold text-brand-600 hover:text-brand-800"
                            >
                              Mark Read
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('resources')}
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>See Verified Learning Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VERIFIED LEARNING RESOURCES (Requirements #28, #29, #30, #31) */}
      {/* ========================================================================= */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Primary Recommended Resource (Requirement #30) */}
          {primaryResource && (
            <div className="p-6 bg-gradient-to-br from-brand-50 via-white to-indigo-50/40 rounded-3xl border-2 border-brand-300 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-brand-600 text-white text-xs font-extrabold rounded-full shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Primary Recommended Resource</span>
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {primaryResource.cost} • Rating: {primaryResource.rating}★
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">{primaryResource.title}</h3>
                <p className="text-xs text-slate-500">
                  Provider: <strong className="text-slate-800">{primaryResource.provider}</strong> • Type:{' '}
                  <strong>{primaryResource.type}</strong> • Estimated Time:{' '}
                  <strong>~{primaryResource.estimatedHours} Hours</strong>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Selected as the top match for your profile because it offers direct interactive browser exercises without setup friction.
              </p>

              <div className="pt-2">
                <a
                  href={primaryResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
                >
                  <span>Start Learning on {primaryResource.provider}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Alternative Resources (Requirement #30) */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Alternative Trusted Resources</h3>
            <p className="text-xs text-slate-500">
              Verified links to complementary courses, official documentation, and video deep-dives.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {alternativeResources.map((res) => (
                <div
                  key={res.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">{res.provider}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-slate-700 border border-slate-200 rounded">
                        {res.cost}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">{res.title}</h4>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      {res.type} • {res.difficulty} • ~{res.estimatedHours}h
                    </span>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PERSONALIZED SCHEDULE (Requirement #32) */}
      {/* ========================================================================= */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Personalized Learning Schedule ({user?.dailyLearningTime || '1 Hour / Day'})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Week-by-week progression pacing to achieve {gapItem.requiredLevel} proficiency.
              </p>
            </div>
            <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-xl border border-brand-200">
              {scheduleWeeks.length} Weeks Total
            </span>
          </div>

          <div className="space-y-4">
            {scheduleWeeks.map((week) => (
              <div
                key={week.weekNumber}
                className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-brand-600 text-white text-xs font-extrabold rounded-lg">
                    Week {week.weekNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    ~{week.estimatedHours} Hours Total
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900">{week.theme}</h4>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {week.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-lg font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Suggested Tasks:
                  </span>
                  <ul className="space-y-1">
                    {week.suggestedTasks.map((st, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: HANDS-ON PRACTICE TASKS (Requirement #34) */}
      {/* ========================================================================= */}
      {activeTab === 'practice' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Hands-on Practice: {practiceTask?.title || `${gapItem.skillName} Practice Lab`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dataset: <strong className="text-slate-800">{practiceTask?.datasetName || 'Sample Transaction Dataset'}</strong>
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 self-start">
              Interactive Lab
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {practiceTask?.datasetDescription || 'Complete the real-world business scenarios below to solidify your understanding.'}
          </p>

          <div className="space-y-4">
            {practiceTask?.tasks.map((task, idx) => {
              const isSolutionOpen = revealedSolutions[task.id];
              return (
                <div
                  key={task.id}
                  className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{task.description}</p>
                        {task.hint && (
                          <p className="text-[11px] text-brand-700 mt-1">
                            <strong>Hint: </strong>{task.hint}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSolution(task.id)}
                      className="px-3 py-1.5 text-[11px] font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shrink-0"
                    >
                      {isSolutionOpen ? 'Hide Solution' : 'Reveal Solution'}
                    </button>
                  </div>

                  {isSolutionOpen && task.solutionSnippet && (
                    <div className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto border border-slate-800 animate-slide-up">
                      <pre className="whitespace-pre-wrap">{task.solutionSnippet}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('project')}
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>Next: Capstone Project & Verification</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: PROJECT & ASSESSMENT VERIFICATION (Requirements #35, #37, #39, #40) */}
      {/* ========================================================================= */}
      {activeTab === 'project' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mini Project Spec */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Capstone Project: {projectTemplate?.title || `${gapItem.skillName} Portfolio Project`}
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {projectTemplate?.overview || 'Build an end-to-end practical project demonstrating your mastery of this skill.'}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 block">Deliverables & Requirements:</span>
              <ul className="space-y-1.5">
                {projectTemplate?.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onOpenProject(projectTemplate?.id || 'proj-ecommerce-sql')}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Open Project Workspace & Submit</span>
              </button>
            </div>
          </div>

          {/* Assessment Launcher */}
          <div className="bg-gradient-to-br from-brand-600 to-indigo-700 text-white rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-300" />
                <h3 className="text-base font-extrabold text-white">
                  Skill Assessment & Verified Badge
                </h3>
              </div>

              <p className="text-xs text-indigo-100 leading-relaxed">
                Take the 10-question standardized test to upgrade your skill from <span className="font-bold underline">Self-Reported</span> to <span className="font-bold underline">Verified</span>.
              </p>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Format:</span>
                  <span className="font-bold">10 MCQs & Scenario Questions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Time Limit:</span>
                  <span className="font-bold">15 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Pass Threshold:</span>
                  <span className="font-bold text-amber-300">70% (Intermediate) / 85% (Advanced)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onLaunchAssessment(skillId)}
              className="w-full py-3.5 bg-white hover:bg-slate-50 text-indigo-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-brand-600" />
              <span>Launch {gapItem.skillName} Assessment Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

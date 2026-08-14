import React from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import {
  Map,
  CheckCircle2,
  Lock,
  PlayCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  FolderGit2
} from 'lucide-react';

interface CareerRoadmapViewProps {
  onSelectSkill: (skillId: string) => void;
  onOpenProject: (projectId: string) => void;
}

export const CareerRoadmapView: React.FC<CareerRoadmapViewProps> = ({
  onSelectSkill,
  onOpenProject,
}) => {
  const { targetCareer, skillGaps, userSkills, projects } = useCareer();
  const { user } = useAuth();

  // Dynamic 5-phase generation based on target career and user skills
  const phases = [
    {
      phaseNumber: 1,
      title: 'Phase 1 – Core Foundations',
      description: 'Foundational query languages, data manipulation tools, and core syntax.',
      skills: skillGaps.filter(g => ['sql', 'excel', 'html', 'css', 'python'].includes(g.skillId)),
      projects: ['proj-ecommerce-sql']
    },
    {
      phaseNumber: 2,
      title: 'Phase 2 – Dimensional Data & Analytics',
      description: 'Advanced filtering, exploratory analysis, statistical modeling, and data cleaning.',
      skills: skillGaps.filter(g => ['statistics', 'pandas', 'data-cleaning', 'typescript', 'react'].includes(g.skillId)),
      projects: []
    },
    {
      phaseNumber: 3,
      title: 'Phase 3 – Visual Intelligence & Architecture',
      description: 'Executive dashboards, DAX KPI modeling, REST APIs, and system design.',
      skills: skillGaps.filter(g => ['power-bi', 'tableau', 'node-js', 'rest-apis', 'docker'].includes(g.skillId)),
      projects: ['proj-powerbi-sales']
    },
    {
      phaseNumber: 4,
      title: 'Phase 4 – Multi-Skill Capstone Projects',
      description: 'Full-pipeline portfolio projects demonstrating end-to-end industry competency.',
      skills: skillGaps.filter(g => ['communication', 'git'].includes(g.skillId)),
      projects: ['proj-multi-retail-analytics']
    },
    {
      phaseNumber: 5,
      title: 'Phase 5 – Career Readiness & Interview Prep',
      description: 'Resume optimization, mock interviews, portfolio publishing, and employer applications.',
      skills: [],
      projects: []
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-brand-50 text-brand-600">
                <Map className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Personalized Career Roadmap
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Step-by-step sequential path to becoming a verified{' '}
              <strong className="text-slate-900">{targetCareer?.name || 'Data Analyst'}</strong>.
            </p>
          </div>

          <div className="px-4 py-2 bg-brand-50 border border-brand-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-brand-800">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Adapts dynamically as you verify skills</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-4 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <strong>How your roadmap works: </strong>If you already possess a skill (e.g. Advanced Excel), we skip redundant basics and advance you directly to higher-tier gaps like SQL window functions and Power BI DAX.
        </p>
      </div>

      {/* 5-Phase Roadmap Timeline */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-200 before:hidden md:before:block">
        {phases.map((phase) => {
          const allSkillsCompleted = phase.skills.length > 0 && phase.skills.every(s => s.gapCategory === 'have');
          const isCurrentPhase = !allSkillsCompleted && phase.skills.some(s => s.gapCategory !== 'have');

          return (
            <div
              key={phase.phaseNumber}
              className={`relative bg-white rounded-3xl border p-6 sm:p-8 shadow-card transition-all ${
                isCurrentPhase ? 'border-brand-400 ring-2 ring-brand-100' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-2xl font-mono font-extrabold text-sm flex items-center justify-center shadow-sm ${
                    allSkillsCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrentPhase
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {allSkillsCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${phase.phaseNumber}`}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{phase.title}</h3>
                    <p className="text-xs text-slate-500">{phase.description}</p>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  {allSkillsCompleted ? (
                    <Badge label="Phase Completed" variant="Completed" />
                  ) : isCurrentPhase ? (
                    <Badge label="Current Active Phase" variant="Learning" />
                  ) : (
                    <Badge label="Upcoming" variant="Not Started" />
                  )}
                </div>
              </div>

              {/* Skills in this Phase */}
              <div className="mt-5 space-y-4">
                {phase.skills.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Target Skills & Milestones:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {phase.skills.map((skill) => (
                        <div
                          key={skill.skillId}
                          onClick={() => onSelectSkill(skill.skillId)}
                          className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl cursor-pointer transition-all flex items-center justify-between group"
                        >
                          <div>
                            <span className="font-bold text-xs text-slate-900 block group-hover:text-brand-600 transition-colors">
                              {skill.skillName}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {skill.gapCategory === 'have' ? '✓ Mastered' : `${skill.requiredLevel} Required`}
                            </span>
                          </div>
                          <Badge
                            label={skill.gapCategory === 'have' ? 'Completed' : skill.priority}
                            variant={skill.gapCategory === 'have' ? 'Completed' : (skill.priority as any)}
                            size="sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects in this phase */}
                {phase.projects.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-brand-600" />
                      <span className="text-xs font-bold text-slate-800">
                        Associated Milestone Project Available
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenProject(phase.projects[0])}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      <span>Open Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

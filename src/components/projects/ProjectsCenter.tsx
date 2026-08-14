import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { useAuth } from '../../context/AuthContext';
import { PROJECT_TEMPLATES } from '../../data/projectsData';
import { ProjectItem, ProjectTemplate } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import {
  Code2,
  FolderGit2,
  CheckCircle2,
  Plus,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectsCenterProps {
  initialProjectId?: string;
}

export const ProjectsCenter: React.FC<ProjectsCenterProps> = () => {
  const { user } = useAuth();
  const { projects, addProject } = useCareer();

  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionTitle, setSubmissionTitle] = useState('');
  const [submissionDesc, setSubmissionDesc] = useState('');
  const [submissionTech, setSubmissionTech] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  const handleOpenSubmission = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setSubmissionTitle(template.title);
    setSubmissionDesc(template.overview);
    setSubmissionTech(template.skillsDemonstrated.join(', '));
    setShowSubmitModal(true);
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionTitle.trim()) return;

    addProject({
      userId: user?.id || 'usr-temp',
      title: submissionTitle,
      description: submissionDesc,
      technologies: submissionTech.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl,
      demoUrl,
      skillsDemonstrated: selectedTemplate?.skillsDemonstrated || submissionTech.split(',').map(s => s.trim()).filter(Boolean),
      status: 'completed',
      submittedAt: new Date().toISOString(),
      feedback: 'Great job! Clean repository structure and well-documented query logic.'
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setShowSubmitModal(false);
    setGithubUrl('');
    setDemoUrl('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="p-2.5 rounded-2xl bg-brand-50 text-brand-600">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Project-Based Learning & Portfolio Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Build and submit real-world capstones to demonstrate applied technical abilities to employers.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl mt-5 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <span>
            <strong>Multi-Skill Project Architecture: </strong>Our projects combine multiple skills (e.g. SQL + Power BI + Data Cleaning) so you can close multiple gaps with a single high-impact portfolio artifact.
          </span>
        </div>
      </div>

      {/* Your Submitted Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900">Your Submitted Projects ({projects.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">{p.title}</span>
                  <Badge label={p.status === 'completed' ? 'Completed & Verified' : 'In Progress'} variant="Completed" size="sm" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                {(p.githubUrl || p.demoUrl) && (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-3 text-xs">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-700 hover:text-brand-600 font-bold">
                        <Github className="w-3.5 h-3.5" /> Repository
                      </a>
                    )}
                    {p.demoUrl && (
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-brand-600 hover:underline font-bold">
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Capstone Templates */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900">Recommended Milestone Project Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECT_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-card hover:border-brand-300 hover:shadow-card-hover p-6 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {template.difficulty} • ~{template.estimatedTime}
                  </span>
                  <Badge label="Milestone Capstone" variant="Learning" size="sm" />
                </div>

                <h4 className="text-base font-extrabold text-slate-900">{template.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{template.overview}</p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Requirements:
                  </span>
                  <ul className="space-y-1">
                    {template.requirements.slice(0, 3).map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {template.skillsDemonstrated.slice(0, 3).map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] rounded font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenSubmission(template)}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Project</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Project Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        maxWidth="lg"
        title="Submit Portfolio Project"
        subtitle="Provide your GitHub repository and deliverables to add this verified artifact to your profile"
      >
        <form onSubmit={handleSubmitProject} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              value={submissionTitle}
              onChange={(e) => setSubmissionTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Executive Summary & Learnings</label>
            <textarea
              value={submissionDesc}
              onChange={(e) => setSubmissionDesc(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">GitHub Repository Link *</label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username/project-repo"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Live Demo / Dashboard URL (Optional)</label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://app.powerbi.com/view?... or https://myproject.vercel.app"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowSubmitModal(false)}
              className="px-4 py-2 font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-sm"
            >
              Submit & Verify Artifact
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

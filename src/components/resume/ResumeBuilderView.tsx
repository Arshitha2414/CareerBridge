import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import { Badge } from '../common/Badge';
import {
  FileText,
  Sparkles,
  Printer,
  Copy,
  Check,
  Download,
  Eye,
  Edit3,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Award,
  Layers,
  Briefcase,
  GraduationCap,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

type ResumeTheme = 'modern' | 'classic' | 'two-column';

export const ResumeBuilderView: React.FC = () => {
  const { user } = useAuth();
  const { targetCareer, userSkills, projects, experiences, certifications, assessments, readiness } = useCareer();

  const careerTitle = targetCareer?.name || 'Data Analyst';

  // ---------------------------------------------------------------------------
  // Resume State (Initialized from user profile, skills, projects, assessments)
  // ---------------------------------------------------------------------------
  const [theme, setTheme] = useState<ResumeTheme>('modern');
  const [activeEditorTab, setActiveEditorTab] = useState<'basics' | 'summary' | 'skills' | 'projects' | 'experience' | 'education'>('basics');

  // 1. Contact & Header
  const [fullName, setFullName] = useState(user?.fullName || 'Arshitha S');
  const [title, setTitle] = useState(`Aspiring ${careerTitle}`);
  const [email, setEmail] = useState(user?.email || 'arshitha@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState(user?.location || 'Bangalore, India');
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || 'linkedin.com/in/arshitha');
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || 'github.com/arshitha');
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl || 'arshitha.dev');

  // 2. Summary
  const defaultSummary = `Analytical and proactive ${careerTitle} candidate with demonstrated foundational and verified skills in ${
    userSkills.slice(0, 3).map(s => s.skillName).join(', ') || 'data analysis, SQL, and Python'
  }. Hands-on experience developing end-to-end projects, executing database queries, and deriving actionable business metrics to support data-driven decision making.`;

  const [summary, setSummary] = useState(defaultSummary);

  // 3. Skills
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>(
    userSkills.map(s => s.skillId)
  );

  // 4. Projects
  const [resumeProjects, setResumeProjects] = useState(
    projects.length > 0
      ? projects.map(p => ({
          id: p.id,
          title: p.title,
          technologies: p.technologies.join(', '),
          githubUrl: p.githubUrl || '',
          demoUrl: p.demoUrl || '',
          bullets: [
            p.description || `Developed end-to-end ${p.title} using ${p.technologies.join(', ')}.`,
            `Analyzed structured transactional datasets to identify key trends, performance KPIs, and user cohorts.`,
            `Built scalable query pipelines and structured documentation for transparent reproducible results.`
          ]
        }))
      : [
          {
            id: 'proj-def-1',
            title: 'E-commerce Revenue & Customer Retention SQL Analysis',
            technologies: 'SQL (PostgreSQL), CTEs, Window Functions, Excel',
            githubUrl: 'https://github.com/arshitha/ecommerce-sql-analysis',
            demoUrl: '',
            bullets: [
              'Constructed advanced SQL queries analyzing 50,000+ transactional records across multi-table relational databases.',
              'Engineered monthly cohort retention models and identified top 10% repeat customer purchasing patterns.',
              'Utilized Common Table Expressions (CTEs) and Window Functions (LAG, RANK) to evaluate month-over-month revenue growth.'
            ]
          },
          {
            id: 'proj-def-2',
            title: 'Executive Sales & Profitability Dashboard',
            technologies: 'Power BI, DAX, Power Query ETL, Star Schema',
            githubUrl: 'https://github.com/arshitha/powerbi-sales-dashboard',
            demoUrl: '',
            bullets: [
              'Designed an interactive 3-page executive Power BI dashboard visualizing regional sales, profit margins, and KPI indicators.',
              'Built a normalized Star Schema data model and authored custom DAX time-intelligence measures (YTD, YoY Growth %).',
              'Created responsive drill-through visual filters enabling stakeholders to audit product performance by category.'
            ]
          }
        ]
  );

  // 5. Experience / Internships
  const [resumeExperiences, setResumeExperiences] = useState(
    experiences.length > 0
      ? experiences.map(e => ({
          id: e.id,
          company: e.company,
          role: e.role,
          duration: e.duration,
          bullets: [
            e.description || `Contributed to ${e.company} as a ${e.role}.`,
            `Collaborated with cross-functional teams to streamline data reporting workflows.`
          ]
        }))
      : [
          {
            id: 'exp-def-1',
            company: 'TechNova Solutions',
            role: 'Data Analyst Intern',
            duration: 'Jun 2025 – Aug 2025',
            bullets: [
              'Partnered with product managers to audit user funnels and clean transactional databases using SQL and Excel.',
              'Created automated reporting templates that reduced weekly manual data preparation time by 30%.',
              'Participated in daily agile standups and presented sprint analytical findings to department leads.'
            ]
          }
        ]
  );

  // 6. Education & Certifications
  const [degree, setDegree] = useState(user?.degree || 'B.Tech in Computer Science & Engineering');
  const [college, setCollege] = useState(user?.college || 'National Institute of Engineering');
  const [graduationYear, setGraduationYear] = useState(user?.graduationYear || '2027');
  const [gpa, setGpa] = useState('8.8 / 10.0 CGPA');

  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // ---------------------------------------------------------------------------
  // AI Assistants for Resume
  // ---------------------------------------------------------------------------
  const handleAIGenerateSummary = () => {
    const verifiedSkillsNames = userSkills
      .filter(s => s.verificationStatus === 'Verified')
      .map(s => s.skillName);

    const skillsString = verifiedSkillsNames.length > 0
      ? `verified expertise in ${verifiedSkillsNames.join(', ')}`
      : `strong proficiency in ${userSkills.slice(0, 3).map(s => s.skillName).join(', ')}`;

    const enhanced = `Results-oriented and detail-driven ${careerTitle} candidate with ${skillsString}. Proven background analyzing complex datasets, engineering optimized queries, and designing clear interactive visual reports. Adept at translating ambiguous business questions into actionable insights and strategic recommendations.`;
    setSummary(enhanced);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handlePrintResume = () => {
    window.print();
  };

  const handleCopyPlainText = () => {
    const plainText = `
${fullName.toUpperCase()}
${title}
${location} | ${email} | ${phone}
LinkedIn: ${linkedinUrl} | GitHub: ${githubUrl}

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
${summary}

TECHNICAL & VERIFIED SKILLS
--------------------------------------------------------------------------------
${userSkills.filter(s => selectedSkillIds.includes(s.skillId)).map(s => `• ${s.skillName} (${s.level}${s.verificationStatus === 'Verified' ? ' - Verified' : ''})`).join('\n')}

PROJECTS
--------------------------------------------------------------------------------
${resumeProjects.map(p => `
${p.title.toUpperCase()} | ${p.technologies}
${p.githubUrl ? `GitHub: ${p.githubUrl}` : ''}
${p.bullets.map(b => `  * ${b}`).join('\n')}
`).join('\n')}

EXPERIENCE
--------------------------------------------------------------------------------
${resumeExperiences.map(e => `
${e.role.toUpperCase()} - ${e.company} (${e.duration})
${e.bullets.map(b => `  * ${b}`).join('\n')}
`).join('\n')}

EDUCATION & CREDENTIALS
--------------------------------------------------------------------------------
${degree} - ${college} (Graduation: ${graduationYear}) - ${gpa}
${assessments.filter(a => a.score >= 70).map(a => `• CareerBridge Certified: ${a.skillName} (${a.score}% Score)`).join('\n')}
`.trim();

    navigator.clipboard.writeText(plainText);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner (hidden during printing via CSS) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">AI Professional Resume Builder</h1>
                <Badge label="ATS-Optimized" variant="have" size="sm" />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically compiled from your profile, verified skills, assessment credentials, and project portfolio.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleCopyPlainText}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSuccess ? 'Copied ATS Text' : 'Copy Plaintext'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintResume}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

        {/* Template Theme Selector & AI Quick Boost Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Template Style:</span>
            {[
              { id: 'modern', label: 'Modern Tech' },
              { id: 'classic', label: 'Classic Minimalist' },
              { id: 'two-column', label: 'Executive Split' }
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id as ResumeTheme)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  theme === t.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAIGenerateSummary}
            className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
            <span>AI Enhance Professional Summary</span>
          </button>
        </div>
      </div>

      {/* Main Builder Grid: Editor on Left, Live Sheet on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: RESUME CUSTOMIZER (no-print) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-card p-6 space-y-6 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-brand-600" />
              <span>Resume Content Editor</span>
            </h3>
            <span className="text-[11px] text-slate-400">Live Updating Preview</span>
          </div>

          {/* Subtabs for Editor */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-bold">
            {[
              { id: 'basics', label: 'Header' },
              { id: 'summary', label: 'Summary' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveEditorTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                  activeEditorTab === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editor Form Body */}
          <div className="space-y-4 text-xs">
            {/* Header & Basics */}
            {activeEditorTab === 'basics' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            {activeEditorTab === 'summary' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700">Professional Summary</label>
                  <button
                    type="button"
                    onClick={handleAIGenerateSummary}
                    className="text-[11px] font-bold text-brand-600 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-brand-500" /> Rewrite with AI
                  </button>
                </div>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none leading-relaxed"
                />
              </div>
            )}

            {/* Skills selection */}
            {activeEditorTab === 'skills' && (
              <div className="space-y-3">
                <span className="font-bold text-slate-700 block">Select Skills to Include on Resume:</span>
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {userSkills.map((s) => {
                    const isChecked = selectedSkillIds.includes(s.skillId);
                    return (
                      <label
                        key={s.id}
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSkillIds([...selectedSkillIds, s.skillId]);
                              } else {
                                setSelectedSkillIds(selectedSkillIds.filter(id => id !== s.skillId));
                              }
                            }}
                            className="rounded text-brand-600"
                          />
                          <span className="font-bold text-slate-800">{s.skillName}</span>
                        </div>
                        <Badge label={s.verificationStatus} variant={s.verificationStatus as any} size="sm" />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Projects */}
            {activeEditorTab === 'projects' && (
              <div className="space-y-4">
                {resumeProjects.map((p, pIdx) => (
                  <div key={p.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={p.title}
                        onChange={(e) => {
                          const updated = [...resumeProjects];
                          updated[pIdx].title = e.target.value;
                          setResumeProjects(updated);
                        }}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Technologies Used</label>
                      <input
                        type="text"
                        value={p.technologies}
                        onChange={(e) => {
                          const updated = [...resumeProjects];
                          updated[pIdx].technologies = e.target.value;
                          setResumeProjects(updated);
                        }}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-slate-700">Bullet Points</label>
                      {p.bullets.map((b, bIdx) => (
                        <textarea
                          key={bIdx}
                          value={b}
                          onChange={(e) => {
                            const updated = [...resumeProjects];
                            updated[pIdx].bullets[bIdx] = e.target.value;
                            setResumeProjects(updated);
                          }}
                          rows={2}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none bg-white text-[11px]"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience */}
            {activeEditorTab === 'experience' && (
              <div className="space-y-4">
                {resumeExperiences.map((exp, expIdx) => (
                  <div key={exp.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...resumeExperiences];
                            updated[expIdx].company = e.target.value;
                            setResumeExperiences(updated);
                          }}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Role</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...resumeExperiences];
                            updated[expIdx].role = e.target.value;
                            setResumeExperiences(updated);
                          }}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none bg-white font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const updated = [...resumeExperiences];
                          updated[expIdx].duration = e.target.value;
                          setResumeExperiences(updated);
                        }}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-bold text-slate-700">Achievement Bullets</label>
                      {exp.bullets.map((b, bIdx) => (
                        <textarea
                          key={bIdx}
                          value={b}
                          onChange={(e) => {
                            const updated = [...resumeExperiences];
                            updated[expIdx].bullets[bIdx] = e.target.value;
                            setResumeExperiences(updated);
                          }}
                          rows={2}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none bg-white text-[11px]"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education & Certifications */}
            {activeEditorTab === 'education' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">College / University</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GPA / Score</label>
                    <input
                      type="text"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: LIVE ATS-COMPLIANT PRINTABLE RESUME CANVAS */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex justify-center w-full">
          {/* THE RESUME SHEET (A4 printable canvas) */}
          <div
            id="resume-printable-sheet"
            className={`resume-sheet w-full bg-white rounded-2xl shadow-2xl border border-slate-300 p-8 sm:p-10 transition-all font-sans text-slate-900 ${
              theme === 'classic' ? 'font-serif' : ''
            }`}
            style={{ minHeight: '842px' }}
          >
            {/* =================================================================== */}
            {/* THEME 1: MODERN TECH (Indigo Accents, Crisp Dividers) */}
            {/* =================================================================== */}
            {theme === 'modern' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b-2 border-indigo-600 pb-4 space-y-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                    {fullName}
                  </h1>
                  <p className="text-sm font-bold text-indigo-700">{title}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-600 pt-1">
                    {location && <span>📍 {location}</span>}
                    {email && <span>✉ {email}</span>}
                    {phone && <span>📞 {phone}</span>}
                    {linkedinUrl && <span>🔗 {linkedinUrl}</span>}
                    {githubUrl && <span>💻 {githubUrl}</span>}
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-1.5">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                    Professional Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                </div>

                {/* Technical & Verified Skills */}
                <div className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                    Technical & Analytical Skills
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {userSkills.filter(s => selectedSkillIds.includes(s.skillId)).map(s => (
                      <span
                        key={s.id}
                        className={`px-2 py-0.5 text-[11px] rounded font-medium border ${
                          s.verificationStatus === 'Verified'
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                            : 'bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        {s.skillName} {s.verificationStatus === 'Verified' ? '✓ (Verified)' : `(${s.level})`}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-3">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                    Key Technical Projects
                  </h2>
                  <div className="space-y-3">
                    {resumeProjects.map((p) => (
                      <div key={p.id} className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <span className="text-xs font-bold text-slate-900">{p.title}</span>
                          <span className="text-[10px] font-mono text-indigo-600">{p.technologies}</span>
                        </div>
                        {p.githubUrl && (
                          <span className="text-[10px] text-slate-500 block">Link: {p.githubUrl}</span>
                        )}
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                          {p.bullets.map((b, i) => (
                            <li key={i} className="leading-relaxed">{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                {resumeExperiences.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                      Experience & Internships
                    </h2>
                    <div className="space-y-3">
                      {resumeExperiences.map((e) => (
                        <div key={e.id} className="space-y-1">
                          <div className="flex items-baseline justify-between text-xs">
                            <span className="font-bold text-slate-900">{e.role} — <span className="font-semibold text-slate-700">{e.company}</span></span>
                            <span className="text-[10px] text-slate-500 font-mono">{e.duration}</span>
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                            {e.bullets.map((b, i) => (
                              <li key={i} className="leading-relaxed">{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education & Verified Certifications */}
                <div className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-700">
                    Education & Credentials
                  </h2>
                  <div className="flex items-baseline justify-between text-xs text-slate-800">
                    <div>
                      <span className="font-bold">{degree}</span>
                      <span className="text-slate-600 block text-[11px]">{college} • {gpa}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Graduation: {graduationYear}</span>
                  </div>

                  {assessments.filter(a => a.score >= 70).length > 0 && (
                    <div className="pt-2 text-[11px] text-slate-700 space-y-0.5">
                      <span className="font-bold text-slate-900 block">Verified Assessments:</span>
                      {assessments.filter(a => a.score >= 70).map(a => (
                        <div key={a.id} className="flex items-center gap-1.5 text-emerald-800 font-medium">
                          <span>✓ CareerBridge Verified: {a.skillName} (Score: {a.score}%)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* THEME 2: CLASSIC MINIMALIST (Clean Serif ATS Standard) */}
            {/* =================================================================== */}
            {theme === 'classic' && (
              <div className="space-y-5 text-slate-900">
                {/* Centered Classic Header */}
                <div className="text-center space-y-1 border-b border-slate-400 pb-4">
                  <h1 className="text-2xl font-bold uppercase tracking-wider">{fullName}</h1>
                  <p className="text-xs italic text-slate-700">{title}</p>
                  <div className="text-[11px] text-slate-600 space-x-2">
                    <span>{location}</span>
                    <span>•</span>
                    <span>{email}</span>
                    <span>•</span>
                    <span>{phone}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 space-x-2 pt-0.5">
                    <span>{linkedinUrl}</span>
                    <span>•</span>
                    <span>{githubUrl}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5">
                    Summary
                  </h2>
                  <p className="text-[11px] leading-relaxed text-slate-800">{summary}</p>
                </div>

                {/* Skills */}
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5">
                    Core Technical Skills
                  </h2>
                  <p className="text-[11px] leading-relaxed text-slate-800">
                    {userSkills.filter(s => selectedSkillIds.includes(s.skillId)).map(s => `${s.skillName}${s.verificationStatus === 'Verified' ? ' [Verified]' : ''}`).join(', ')}
                  </p>
                </div>

                {/* Experience */}
                {resumeExperiences.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5">
                      Experience
                    </h2>
                    {resumeExperiences.map(e => (
                      <div key={e.id} className="space-y-1 text-xs">
                        <div className="flex justify-between font-bold">
                          <span>{e.role}, {e.company}</span>
                          <span className="font-normal text-[11px] italic">{e.duration}</span>
                        </div>
                        <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-800">
                          {e.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5">
                    Technical Projects
                  </h2>
                  {resumeProjects.map(p => (
                    <div key={p.id} className="space-y-0.5 text-xs">
                      <div className="flex justify-between font-bold">
                        <span>{p.title}</span>
                        <span className="text-[11px] font-normal italic">{p.technologies}</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] space-y-0.5 text-slate-800">
                        {p.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5">
                    Education & Credentials
                  </h2>
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="font-bold">{degree}</span> — {college} ({gpa})
                    </div>
                    <span className="text-[11px] italic">{graduationYear}</span>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* THEME 3: EXECUTIVE TWO-COLUMN */}
            {/* =================================================================== */}
            {theme === 'two-column' && (
              <div className="grid grid-cols-12 gap-6">
                {/* Left 4 Cols (Sidebar) */}
                <div className="col-span-4 bg-slate-50 p-4 rounded-xl space-y-5 border-r border-slate-200 text-xs">
                  <div className="space-y-1">
                    <h1 className="text-xl font-black text-slate-900 leading-tight">{fullName}</h1>
                    <p className="text-[11px] font-bold text-indigo-600">{title}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200 text-[10px] text-slate-600">
                    <p>📍 {location}</p>
                    <p>✉ {email}</p>
                    <p>📞 {phone}</p>
                    <p>🔗 {linkedinUrl}</p>
                    <p>💻 {githubUrl}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <span className="font-extrabold uppercase tracking-wider text-slate-900 block text-[10px]">
                      Skills & Tools
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {userSkills.filter(s => selectedSkillIds.includes(s.skillId)).map(s => (
                        <span key={s.id} className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-800">
                          {s.skillName}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200 text-[10px]">
                    <span className="font-extrabold uppercase tracking-wider text-slate-900 block">
                      Education
                    </span>
                    <p className="font-bold text-slate-800">{degree}</p>
                    <p className="text-slate-500">{college}</p>
                    <p className="text-slate-400">Class of {graduationYear} • {gpa}</p>
                  </div>
                </div>

                {/* Right 8 Cols (Main Content) */}
                <div className="col-span-8 space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-xs font-black uppercase tracking-wider text-indigo-700">
                      Executive Profile
                    </h2>
                    <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-xs font-black uppercase tracking-wider text-indigo-700">
                      Key Technical Projects
                    </h2>
                    {resumeProjects.map(p => (
                      <div key={p.id} className="space-y-0.5">
                        <span className="font-bold text-xs text-slate-900 block">{p.title}</span>
                        <span className="text-[10px] text-indigo-600 font-mono block">{p.technologies}</span>
                        <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
                          {p.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {resumeExperiences.length > 0 && (
                    <div className="space-y-3">
                      <h2 className="text-xs font-black uppercase tracking-wider text-indigo-700">
                        Experience & Internships
                      </h2>
                      {resumeExperiences.map(e => (
                        <div key={e.id} className="space-y-0.5">
                          <div className="flex justify-between text-xs font-bold">
                            <span>{e.role} — {e.company}</span>
                            <span className="font-normal text-[10px] text-slate-400 font-mono">{e.duration}</span>
                          </div>
                          <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
                            {e.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';
import { CareerBridgeDB } from '../../services/db';
import { CAREER_ROLES } from '../../data/careersData';
import { SKILL_CATEGORIES } from '../../data/skillsData';
import { CareerDiscoveryModal } from './CareerDiscoveryModal';
import { SkillLevel, ProjectItem, InternshipItem, CertificationItem } from '../../types';
import {
  User,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Search,
  FileText,
  Clock,
  BookOpen,
  Edit3,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { user, refreshUser } = useAuth();
  const { triggerCareerAnalysis } = useCareer();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 8;

  // Step 1: Personal Info
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [college, setCollege] = useState(user?.college || '');
  const [degree, setDegree] = useState(user?.degree || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [currentYear, setCurrentYear] = useState(user?.currentYear || '3rd Year');
  const [graduationYear, setGraduationYear] = useState(user?.graduationYear || '2027');
  const [location, setLocation] = useState(user?.location || '');
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl || '');
  const [githubUrl, setGithubUrl] = useState(user?.githubUrl || '');
  const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl || '');

  // Step 2: Career Goal
  const [targetCareerId, setTargetCareerId] = useState(user?.targetCareerId || 'data-analyst');
  const [careerSearch, setCareerSearch] = useState('');
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  // Step 3 & 4: Skills & Proficiency
  const [selectedSkills, setSelectedSkills] = useState<{
    id: string;
    name: string;
    category: string;
    level: SkillLevel;
  }[]>([
    { id: 'python', name: 'Python', category: 'Programming', level: 'Intermediate' },
    { id: 'excel', name: 'Excel', category: 'Data & Analytics', level: 'Advanced' },
    { id: 'sql', name: 'SQL', category: 'Data & Databases', level: 'Beginner' }
  ]);
  const [customSkillName, setCustomSkillName] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  // Step 5: Practical Experience (Projects, Internships, Certifications)
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', technologies: '', githubUrl: '', demoUrl: '' });
  const [showAddProject, setShowAddProject] = useState(false);

  const [internships, setInternships] = useState<InternshipItem[]>([]);
  const [newInternship, setNewInternship] = useState({ company: '', role: '', duration: '', description: '' });
  const [showAddInternship, setShowAddInternship] = useState(false);

  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [newCert, setNewCert] = useState({ name: '', provider: '', completionDate: '', credentialUrl: '' });
  const [showAddCert, setShowAddCert] = useState(false);

  // Step 6: Interests
  const [interests, setInterests] = useState<string[]>([
    'Programming',
    'Data Analysis',
    'Automation'
  ]);

  // Step 7: Learning Preferences
  const [dailyTime, setDailyTime] = useState(user?.dailyLearningTime || '1 hour per day');
  const [learningStyle, setLearningStyle] = useState<'video' | 'reading' | 'interactive' | 'projects' | 'mixed'>(
    user?.learningStyle || 'interactive'
  );
  const [resourcePref, setResourcePref] = useState<'free' | 'all'>(user?.resourcePreference || 'all');

  // Step 8: Resume Upload
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [parsedSkillsReview, setParsedSkillsReview] = useState<string[]>([]);
  const [showParsedReviewModal, setShowParsedReviewModal] = useState(false);

  // Step 9: Review Mode
  const [isReviewing, setIsReviewing] = useState(false);

  const interestOptions = [
    'Programming',
    'Data Analysis',
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
    'Web Development',
    'App Development',
    'UI/UX',
    'Business & Product',
    'Automation',
    'Research'
  ];

  // Helper toggle skill
  const toggleSkill = (skillId: string, skillName: string, category: string) => {
    const existing = selectedSkills.find((s) => s.id === skillId);
    if (existing) {
      setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
    } else {
      setSelectedSkills((prev) => [
        ...prev,
        { id: skillId, name: skillName, category, level: 'Beginner' }
      ]);
    }
  };

  const updateSkillLevel = (skillId: string, level: SkillLevel) => {
    setSelectedSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, level } : s))
    );
  };

  const addCustomSkill = () => {
    if (!customSkillName.trim()) return;
    const id = customSkillName.toLowerCase().replace(/\s+/g, '-');
    if (!selectedSkills.some((s) => s.id === id)) {
      setSelectedSkills((prev) => [
        ...prev,
        { id, name: customSkillName.trim(), category: 'Custom', level: 'Beginner' }
      ]);
    }
    setCustomSkillName('');
  };

  // Add project handler
  const handleAddProject = () => {
    if (!newProject.title.trim()) return;
    const item: ProjectItem = {
      id: `p-${Date.now()}`,
      userId: user?.id || 'temp',
      title: newProject.title,
      description: newProject.description,
      technologies: newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      githubUrl: newProject.githubUrl,
      demoUrl: newProject.demoUrl,
      skillsDemonstrated: newProject.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      status: 'completed'
    };
    setProjects((prev) => [...prev, item]);
    setNewProject({ title: '', description: '', technologies: '', githubUrl: '', demoUrl: '' });
    setShowAddProject(false);
  };

  // Add internship handler
  const handleAddInternship = () => {
    if (!newInternship.company.trim()) return;
    const item: InternshipItem = {
      id: `i-${Date.now()}`,
      userId: user?.id || 'temp',
      company: newInternship.company,
      role: newInternship.role,
      duration: newInternship.duration,
      description: newInternship.description,
      skillsUsed: []
    };
    setInternships((prev) => [...prev, item]);
    setNewInternship({ company: '', role: '', duration: '', description: '' });
    setShowAddInternship(false);
  };

  // Add cert handler
  const handleAddCert = () => {
    if (!newCert.name.trim()) return;
    const item: CertificationItem = {
      id: `c-${Date.now()}`,
      userId: user?.id || 'temp',
      name: newCert.name,
      provider: newCert.provider,
      completionDate: newCert.completionDate,
      credentialUrl: newCert.credentialUrl
    };
    setCertifications((prev) => [...prev, item]);
    setNewCert({ name: '', provider: '', completionDate: '', credentialUrl: '' });
    setShowAddCert(false);
  };

  // Simulated Resume Parser
  const handleResumeSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeUploaded(true);
      // Simulated extracted skills
      const extracted = ['Git', 'Communication', 'Statistics', 'Problem Solving'];
      setParsedSkillsReview(extracted);
      setShowParsedReviewModal(true);
    }
  };

  const acceptParsedSkills = () => {
    parsedSkillsReview.forEach((name) => {
      const id = name.toLowerCase().replace(/\s+/g, '-');
      if (!selectedSkills.some((s) => s.id === id)) {
        setSelectedSkills((prev) => [
          ...prev,
          { id, name, category: 'Extracted', level: 'Intermediate' }
        ]);
      }
    });
    setShowParsedReviewModal(false);
  };

  // Save all profile state into DB and Trigger Career Analysis
  const handleAnalyzeCareer = () => {
    if (!user) return;

    // 1. Save Profile
    CareerBridgeDB.updateProfile({
      fullName,
      college,
      degree,
      department,
      currentYear,
      graduationYear,
      location,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      targetCareerId,
      dailyLearningTime: dailyTime,
      learningStyle,
      resourcePreference: resourcePref,
      interests,
      isOnboardingCompleted: true,
      isAnalyzed: true
    });

    // 2. Save Skills
    const userSkills = selectedSkills.map((s) => ({
      id: `us-${s.id}`,
      userId: user.id,
      skillId: s.id,
      skillName: s.name,
      category: s.category,
      level: s.level,
      verificationStatus: 'Self-Reported' as const
    }));
    CareerBridgeDB.saveUserSkills(userSkills);

    // 3. Save Projects, Experiences, Certifications
    CareerBridgeDB.saveUserProjects(projects);
    CareerBridgeDB.saveExperiences(internships);
    CareerBridgeDB.saveCertifications(certifications);

    // Trigger celebration & analysis
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    triggerCareerAnalysis();
    refreshUser();
    onComplete();
  };

  const selectedCareerObj = CAREER_ROLES.find((c) => c.id === targetCareerId);

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar & Header */}
        {!isReviewing && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span className="text-brand-600 font-semibold">
                {Math.round((currentStep / totalSteps) * 100)}% Completed
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* REVIEW SCREEN (Requirement #17) */}
        {/* ========================================================================= */}
        {isReviewing ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8 animate-fade-in">
            <div className="border-b border-slate-100 pb-5">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
                Final Step
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Review Your Career Profile
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verify your information before CareerBridge AI performs your baseline Career Readiness and Skill Gap Analysis.
              </p>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Box 1: Personal & Target Role */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <User className="w-4 h-4 text-brand-600" />
                    <span>Personal & Target Goal</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => { setIsReviewing(false); setCurrentStep(1); }}
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1.5 text-slate-700">
                  <p><span className="font-semibold text-slate-400">Name:</span> {fullName || 'Student'}</p>
                  <p><span className="font-semibold text-slate-400">College:</span> {college || 'Not provided'} ({degree})</p>
                  <p><span className="font-semibold text-slate-400">Year / Grad:</span> {currentYear} (Class of {graduationYear})</p>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="font-semibold text-slate-400 block mb-1">Target Career:</span>
                    <span className="px-2.5 py-1 text-xs font-bold bg-brand-100 text-brand-800 rounded-lg inline-block">
                      {selectedCareerObj?.name || 'Data Analyst'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Box 2: Self-Reported Skills */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-brand-600" />
                    <span>Self-Reported Skills ({selectedSkills.length})</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => { setIsReviewing(false); setCurrentStep(3); }}
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-1">
                  {selectedSkills.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-medium text-slate-800 flex items-center gap-1"
                    >
                      <span className="font-bold">{s.name}:</span>
                      <span className="text-brand-700 font-semibold">{s.level}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 3: Practical Experience */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-brand-600" />
                    <span>Experience & Projects</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => { setIsReviewing(false); setCurrentStep(5); }}
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-slate-600">
                  <span className="font-semibold">{projects.length}</span> Projects,{' '}
                  <span className="font-semibold">{internships.length}</span> Internships,{' '}
                  <span className="font-semibold">{certifications.length}</span> Certifications.
                </p>
              </div>

              {/* Box 4: Learning Preferences */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-brand-600" />
                    <span>Learning Plan Settings</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => { setIsReviewing(false); setCurrentStep(7); }}
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-slate-600">
                  <span className="font-semibold">Time:</span> {dailyTime} •{' '}
                  <span className="font-semibold">Style:</span> {learningStyle} •{' '}
                  <span className="font-semibold">Resources:</span> {resourcePref === 'free' ? 'Free Only' : 'Free + Paid'}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => { setIsReviewing(false); setCurrentStep(8); }}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Edit</span>
              </button>

              <button
                type="button"
                onClick={handleAnalyzeCareer}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 group transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Analyze My Career & Calculate Readiness</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 8-STEP ONBOARDING WIZARD */
          /* ========================================================================= */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in">
            {/* STEP 1: PERSONAL INFORMATION */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900">Tell Us About Yourself</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your background helps us tailor realistic learning schedules and role expectations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Arshitha S"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">College / Institution *</label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. National Institute of Engineering"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Degree *</label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. B.Tech / B.E / B.Sc"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department / Specialization</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Current Year of Study</label>
                    <select
                      value={currentYear}
                      onChange={(e) => setCurrentYear(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none bg-white"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>Final Year</option>
                      <option>Recent Graduate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Expected Graduation Year</label>
                    <input
                      type="text"
                      value={graduationYear}
                      onChange={(e) => setGraduationYear(e.target.value)}
                      placeholder="e.g. 2027"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Location (Optional)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Bangalore, India"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CAREER GOAL & DISCOVERY */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Which career are you preparing for?</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select your target role to benchmark your skills against industry requirements.
                    </p>
                  </div>

                  {/* "I'm Not Sure Yet" Button (Requirement #10) */}
                  <button
                    type="button"
                    onClick={() => setIsDiscoveryOpen(true)}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>I'm Not Sure Yet (Career Quiz)</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={careerSearch}
                    onChange={(e) => setCareerSearch(e.target.value)}
                    placeholder="Search careers (e.g. Data Analyst, Full Stack Developer, AI Engineer...)"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                {/* Career Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {CAREER_ROLES.filter((c) =>
                    c.name.toLowerCase().includes(careerSearch.toLowerCase()) ||
                    c.shortDescription.toLowerCase().includes(careerSearch.toLowerCase())
                  ).map((career) => {
                    const isSelected = targetCareerId === career.id;
                    return (
                      <button
                        key={career.id}
                        type="button"
                        onClick={() => setTargetCareerId(career.id)}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/70 ring-1 ring-brand-600 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-slate-900">{career.name}</span>
                          <span className="text-[10px] font-semibold text-slate-400">{career.category}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {career.shortDescription}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: EXISTING SKILLS */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900">What skills do you already know?</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select the technologies and tools you have worked with or learned previously.
                  </p>
                </div>

                {/* Add Custom Skill */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSkillName}
                    onChange={(e) => setCustomSkillName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomSkill(); } }}
                    placeholder="Add custom skill (e.g. GraphQL, Figma, Spring Boot)..."
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomSkill}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>

                {/* Categorized Skills Picker */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {SKILL_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        {cat.name}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => {
                          const isSelected = selectedSkills.some((s) => s.id === skill.id);
                          return (
                            <button
                              key={skill.id}
                              type="button"
                              onClick={() => toggleSkill(skill.id, skill.name, cat.name)}
                              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              {skill.name} {isSelected && '✓'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: SKILL PROFICIENCY (Self-Reported) */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-extrabold text-slate-900">What is your current level?</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                      Self-Reported
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Be honest about your comfort level. You can verify your skills later through standardized assessments.
                  </p>
                </div>

                {selectedSkills.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <p className="text-xs text-slate-500">No skills selected in previous step.</p>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="mt-2 text-xs font-bold text-brand-600 hover:underline"
                    >
                      Go back and select skills
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {selectedSkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
                      >
                        <div>
                          <span className="font-bold text-xs text-slate-900 block">{skill.name}</span>
                          <span className="text-[10px] text-slate-400">{skill.category}</span>
                        </div>

                        {/* Level Picker */}
                        <div className="flex items-center gap-1.5">
                          {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => updateSkillLevel(skill.id, lvl)}
                              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                                skill.level === lvl
                                  ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: PRACTICAL EXPERIENCE */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900">Practical Experience & Projects</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Employers look for applied projects, internships, or certifications. (Optional)
                  </p>
                </div>

                {/* Projects Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800">Projects ({projects.length})</h4>
                    <button
                      type="button"
                      onClick={() => setShowAddProject(!showAddProject)}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  {showAddProject && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        placeholder="Project Title (e.g. Sales Analysis Dashboard)"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                      />
                      <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        placeholder="Brief description of what you built and key findings..."
                        rows={2}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                      />
                      <input
                        type="text"
                        value={newProject.technologies}
                        onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                        placeholder="Technologies Used (comma-separated: SQL, Python, Power BI)"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="url"
                          value={newProject.githubUrl}
                          onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                          placeholder="GitHub URL (optional)"
                          className="px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                        />
                        <input
                          type="url"
                          value={newProject.demoUrl}
                          onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                          placeholder="Live Demo URL (optional)"
                          className="px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddProject(false)}
                          className="px-3 py-1.5 text-slate-500 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddProject}
                          className="px-4 py-1.5 bg-brand-600 text-white font-bold rounded-lg"
                        >
                          Save Project
                        </button>
                      </div>
                    </div>
                  )}

                  {projects.length > 0 && (
                    <div className="space-y-2">
                      {projects.map((p) => (
                        <div key={p.id} className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-900 block">{p.title}</span>
                            <span className="text-[11px] text-slate-500">{p.technologies.join(', ')}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setProjects(projects.filter((x) => x.id !== p.id))}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Internships Toggle */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">Internship Experience ({internships.length})</h4>
                  <button
                    type="button"
                    onClick={() => setShowAddInternship(!showAddInternship)}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Internship
                  </button>
                </div>

                {showAddInternship && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                    <input
                      type="text"
                      value={newInternship.company}
                      onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })}
                      placeholder="Company Name"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                    />
                    <input
                      type="text"
                      value={newInternship.role}
                      onChange={(e) => setNewInternship({ ...newInternship, role: e.target.value })}
                      placeholder="Role / Title (e.g. Data Intern)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                    />
                    <input
                      type="text"
                      value={newInternship.duration}
                      onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })}
                      placeholder="Duration (e.g. Jun 2025 - Aug 2025)"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none bg-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddInternship(false)} className="px-3 py-1.5 text-slate-500 font-semibold">Cancel</button>
                      <button type="button" onClick={handleAddInternship} className="px-4 py-1.5 bg-brand-600 text-white font-bold rounded-lg">Save Internship</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: INTERESTS */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900">What areas are you interested in?</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We use your interest profile to recommend complementary projects and elective modules.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {interestOptions.map((item) => {
                    const isSelected = interests.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setInterests((prev) =>
                            prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
                          )
                        }
                        className={`p-3 text-left rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-brand-50 border-brand-600 text-brand-900 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {item} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 7: LEARNING PREFERENCES */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900">Learning Preferences & Schedule</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    We calibrate your weekly timeline and resource recommendations to fit your real routine.
                  </p>
                </div>

                {/* Daily Time Commitment */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    How much time can you spend learning per day?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {['30 minutes per day', '1 hour per day', '2 hours per day', 'Weekends only'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setDailyTime(opt)}
                        className={`p-2.5 text-center font-bold rounded-xl border transition-all ${
                          dailyTime === opt
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Format */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    How do you prefer to learn?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    {[
                      { id: 'interactive', label: 'Interactive' },
                      { id: 'video', label: 'Video' },
                      { id: 'reading', label: 'Reading' },
                      { id: 'projects', label: 'Projects' },
                      { id: 'mixed', label: 'Mixed' }
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setLearningStyle(style.id as any)}
                        className={`p-2.5 text-center font-bold rounded-xl border capitalize transition-all ${
                          learningStyle === style.id
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cost Preference */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    What type of resources do you prefer?
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setResourcePref('free')}
                      className={`p-3 text-left font-bold rounded-xl border transition-all ${
                        resourcePref === 'free'
                          ? 'bg-brand-50 border-brand-600 text-brand-900'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>Free Only</div>
                      <div className="text-[10px] text-slate-500 font-normal">Prioritize open-source, Kaggle, freeCodeCamp, docs</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setResourcePref('all')}
                      className={`p-3 text-left font-bold rounded-xl border transition-all ${
                        resourcePref === 'all'
                          ? 'bg-brand-50 border-brand-600 text-brand-900'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>Free + Paid / Any</div>
                      <div className="text-[10px] text-slate-500 font-normal">Include accredited certificate platforms & official courses</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: RESUME UPLOAD (OPTIONAL) */}
            {currentStep === 8 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-extrabold text-slate-900">Upload Your Resume (Optional)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Upload your resume in PDF or DOCX format to automatically extract relevant skills and projects.
                  </p>
                </div>

                <div className="p-8 border-2 border-dashed border-slate-300 hover:border-brand-400 rounded-2xl text-center bg-slate-50/50 transition-colors">
                  <input
                    type="file"
                    id="resume-file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleResumeSimulatedUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume-file" className="cursor-pointer space-y-3 block">
                    <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto shadow-sm">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-600 hover:underline">
                        Click to browse file
                      </span>
                      <span className="text-xs text-slate-500 block mt-0.5">PDF or DOCX (Max 5MB)</span>
                    </div>
                  </label>
                </div>

                {resumeUploaded && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-900">Resume uploaded & parsed successfully</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowParsedReviewModal(true)}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      Review Extracted Data
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Stepper Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {currentStep === 8 && (
                  <button
                    type="button"
                    onClick={() => setIsReviewing(true)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Skip Resume
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (currentStep < totalSteps) {
                      setCurrentStep((prev) => prev + 1);
                    } else {
                      setIsReviewing(true);
                    }
                  }}
                  className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
                >
                  <span>{currentStep === totalSteps ? 'Review Profile' : 'Next Step'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Career Discovery Modal */}
        <CareerDiscoveryModal
          isOpen={isDiscoveryOpen}
          onClose={() => setIsDiscoveryOpen(false)}
          onSelectCareer={(id) => {
            setTargetCareerId(id);
            setIsDiscoveryOpen(false);
          }}
        />

        {/* Parsed Resume Review Modal (Requirement #16 - "We Found These Details") */}
        {showParsedReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-slide-up">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" />
                <h4 className="text-base font-extrabold text-slate-900">We Found These Details</h4>
              </div>
              <p className="text-xs text-slate-500">
                We detected the following skills from your resume. Review and accept to add them to your profile:
              </p>

              <div className="space-y-2">
                {parsedSkillsReview.map((skill) => (
                  <div key={skill} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{skill}</span>
                    <span className="text-[10px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded font-semibold">Found</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowParsedReviewModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600"
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  onClick={acceptParsedSkills}
                  className="px-4 py-1.5 bg-brand-600 text-white font-bold text-xs rounded-xl"
                >
                  Accept & Add to Skills
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

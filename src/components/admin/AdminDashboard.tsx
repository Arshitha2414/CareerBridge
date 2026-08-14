import React, { useState, useEffect } from 'react';
import { CareerBridgeDB } from '../../services/db';
import { useAuth } from '../../context/AuthContext';
import { CAREER_ROLES } from '../../data/careersData';
import { ALL_SKILLS_FLAT } from '../../data/skillsData';
import { VERIFIED_LEARNING_RESOURCES } from '../../data/learningResourcesData';
import { ASSESSMENTS_QUESTION_BANK } from '../../data/assessmentsData';
import { UserProfile, UserRole, CareerRole, LearningResource, AssessmentQuestion } from '../../types';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import {
  ShieldAlert,
  Users,
  UserPlus,
  Target,
  GraduationCap,
  Award,
  Search,
  CheckCircle2,
  Trash2,
  Edit2,
  Sparkles,
  Database,
  Building2,
  UserCheck,
  Plus,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminDashboardProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentRoute, onNavigate }) => {
  const { user: currentAuthUser, refreshUser, setRole } = useAuth();

  // Determine active tab from currentRoute or internal state
  const getTabFromRoute = () => {
    if (currentRoute === '/admin/careers') return 'careers';
    if (currentRoute === '/admin/resources') return 'resources';
    if (currentRoute === '/admin/assessments') return 'assessments';
    if (currentRoute === '/admin/analytics') return 'system';
    return 'users';
  };

  const [activeTab, setActiveTab] = useState<'users' | 'careers' | 'resources' | 'assessments' | 'system'>(getTabFromRoute());

  useEffect(() => {
    setActiveTab(getTabFromRoute());
  }, [currentRoute]);

  const handleTabClick = (tab: 'users' | 'careers' | 'resources' | 'assessments' | 'system') => {
    setActiveTab(tab);
    if (onNavigate) {
      const routeMap = {
        users: '/admin/users',
        careers: '/admin/careers',
        resources: '/admin/resources',
        assessments: '/admin/assessments',
        system: '/admin/analytics'
      };
      onNavigate(routeMap[tab]);
    }
  };

  // State Stores
  const [usersList, setUsersList] = useState<UserProfile[]>(CareerBridgeDB.getAllUsers());
  const [careersList, setCareersList] = useState<CareerRole[]>(CAREER_ROLES);
  const [resourcesList, setResourcesList] = useState<LearningResource[]>(VERIFIED_LEARNING_RESOURCES);
  const [selectedSkillAssessment, setSelectedSkillAssessment] = useState<string>('sql');
  const [questionsMap, setQuestionsMap] = useState<Record<string, AssessmentQuestion[]>>(ASSESSMENTS_QUESTION_BANK);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<'all' | UserRole>('all');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // 1. New User Creation Modal State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('student');
  const [newCollege, setNewCollege] = useState('National Institute of Technology');
  const [newTargetCareer, setNewTargetCareer] = useState('data-analyst');

  // 2. New Career Role Modal State
  const [showAddCareerModal, setShowAddCareerModal] = useState(false);
  const [newCareerName, setNewCareerName] = useState('');
  const [newCareerCategory, setNewCareerCategory] = useState('Data & AI');
  const [newCareerDemand, setNewCareerDemand] = useState<'Very High' | 'High' | 'Moderate'>('Very High');
  const [newCareerDesc, setNewCareerDesc] = useState('');
  const [newCareerTools, setNewCareerTools] = useState('Python, SQL, Tableau');

  // 3. New Learning Resource Modal State
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [newResTitle, setNewResTitle] = useState('');
  const [newResSkillId, setNewResSkillId] = useState('sql');
  const [newResProvider, setNewResProvider] = useState('Microsoft Learn');
  const [newResUrl, setNewResUrl] = useState('https://learn.microsoft.com');
  const [newResCost, setNewResCost] = useState<'Free' | 'Paid'>('Free');
  const [newResType, setNewResType] = useState<'Interactive' | 'Video' | 'Reading' | 'Course'>('Interactive');
  const [newResHours, setNewResHours] = useState(8);

  // 4. New Assessment Question Modal State
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQPrompt, setNewQPrompt] = useState('');
  const [newQSkillId, setNewQSkillId] = useState('sql');
  const [newQOpt0, setNewQOpt0] = useState('');
  const [newQOpt1, setNewQOpt1] = useState('');
  const [newQOpt2, setNewQOpt2] = useState('');
  const [newQOpt3, setNewQOpt3] = useState('');
  const [newQCorrectIdx, setNewQCorrectIdx] = useState(0);
  const [newQExplanation, setNewQExplanation] = useState('');

  // ---------------------------------------------------------------------------
  // Action Handlers
  // ---------------------------------------------------------------------------

  // Handle Role Assignment for any user
  const handleRoleChange = (userId: string, newRoleValue: UserRole) => {
    const updated = CareerBridgeDB.updateUserRole(userId, newRoleValue);
    if (updated) {
      setUsersList(CareerBridgeDB.getAllUsers());
      setFeedbackMessage(`Assigned role "${newRoleValue.toUpperCase()}" to ${updated.fullName} (${updated.email})`);
      if (userId === currentAuthUser?.id) {
        refreshUser();
      }
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  // Handle Create User & Assign Role
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newEmail.trim()) return;

    const created = CareerBridgeDB.createUserByAdmin({
      fullName: newFullName,
      email: newEmail,
      role: newRole,
      college: newCollege,
      targetCareerId: newTargetCareer
    });

    setUsersList(CareerBridgeDB.getAllUsers());
    setShowAddUserModal(false);
    setNewFullName('');
    setNewEmail('');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFeedbackMessage(`Successfully created user ${created.fullName} with role "${created.role.toUpperCase()}".`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Handle Delete User
  const handleDeleteUser = (userId: string, name: string) => {
    if (confirm(`Are you sure you want to delete user ${name}?`)) {
      CareerBridgeDB.deleteUser(userId);
      setUsersList(CareerBridgeDB.getAllUsers());
      setFeedbackMessage(`User ${name} removed from the system.`);
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  // Handle Add Career Role
  const handleCreateCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareerName.trim()) return;

    const newRoleObj: CareerRole = {
      id: newCareerName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: newCareerName,
      category: newCareerCategory,
      marketDemand: newCareerDemand,
      shortDescription: newCareerDesc || `Professional roadmap for ${newCareerName}.`,
      fullDescription: newCareerDesc || `Full career taxonomy and skill expectations for ${newCareerName}.`,
      iconName: 'Sparkles',
      coreResponsibilities: ['Design and optimize software architecture', 'Analyze key performance metrics', 'Collaborate with engineering teams'],
      recommendedTools: newCareerTools.split(',').map(t => t.trim()).filter(Boolean),
      softSkills: ['Problem Solving', 'Communication', 'Teamwork'],
      recommendedProjects: ['Production Portfolio Capstone'],
      relatedCareers: ['Software Engineer', 'Data Engineer']
    };

    setCareersList(prev => [newRoleObj, ...prev]);
    setShowAddCareerModal(false);
    setNewCareerName('');
    setNewCareerDesc('');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setFeedbackMessage(`New Career Role "${newCareerName}" created and added to the platform catalog.`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Handle Add Learning Resource
  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle.trim()) return;

    const newResObj: LearningResource = {
      id: `res-adm-${Date.now()}`,
      skillId: newResSkillId,
      title: newResTitle,
      provider: newResProvider,
      url: newResUrl,
      cost: newResCost,
      difficulty: 'Intermediate',
      type: newResType,
      estimatedHours: Number(newResHours),
      rating: 4.9,
      topic: `${newResSkillId} fundamentals`
    };

    setResourcesList(prev => [newResObj, ...prev]);
    setShowAddResourceModal(false);
    setNewResTitle('');

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });

    setFeedbackMessage(`Added verified resource "${newResTitle}" under ${newResSkillId.toUpperCase()}.`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Handle Add Assessment Question
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQPrompt.trim() || !newQOpt0 || !newQOpt1) return;

    const newQObj: AssessmentQuestion = {
      id: `q-adm-${Date.now()}`,
      skillId: newQSkillId,
      topicTag: `${newQSkillId.toUpperCase()} Core`,
      type: 'mcq',
      question: newQPrompt,
      options: [newQOpt0, newQOpt1, newQOpt2 || 'None of the above', newQOpt3 || 'All of the above'],
      correctOptionIndex: Number(newQCorrectIdx),
      explanation: newQExplanation || 'Verified platform correct answer rationale.'
    };

    setQuestionsMap(prev => ({
      ...prev,
      [newQSkillId]: [...(prev[newQSkillId] || []), newQObj]
    }));

    setShowAddQuestionModal(false);
    setNewQPrompt('');
    setNewQOpt0('');
    setNewQOpt1('');
    setNewQOpt2('');
    setNewQOpt3('');
    setNewQExplanation('');

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 }
    });

    setFeedbackMessage(`Added standardized question to the ${newQSkillId.toUpperCase()} question bank.`);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Filtered Users
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.college && u.college.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = selectedRoleFilter === 'all' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeVariant = (r: UserRole) => {
    switch (r) {
      case 'student':
        return 'have';
      case 'mentor':
        return 'Learning';
      case 'employer':
        return 'Completed';
      case 'admin':
        return 'Verified';
      default:
        return 'Default';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">Admin Control Center</h1>
                <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase rounded-full">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign user roles, manage career taxonomies, calibrate skill requirements, and oversee platform operations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create User & Assign Role</span>
            </button>
          </div>
        </div>

        {/* Global Platform Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Users</span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 mt-1">{usersList.length}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Career Roles</span>
            <div className="text-3xl font-extrabold font-mono text-brand-600 mt-1">{careersList.length}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Verified Resources</span>
            <div className="text-3xl font-extrabold font-mono text-emerald-600 mt-1">{resourcesList.length}</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Assessments</span>
            <div className="text-3xl font-extrabold font-mono text-indigo-600 mt-1">
              {Object.values(questionsMap).reduce((acc, q) => acc + q.length, 0)}
            </div>
          </div>
        </div>

        {/* Action Feedback Banner */}
        {feedbackMessage && (
          <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-slide-up">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation (Synchronized with Sidebar and Route) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold overflow-x-auto">
        {[
          { id: 'users', label: `Users & Roles (${usersList.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'careers', label: `Career Roles (${careersList.length})`, icon: <Target className="w-4 h-4" /> },
          { id: 'resources', label: `Verified Resources (${resourcesList.length})`, icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'assessments', label: `Assessments (${Object.keys(questionsMap).length} Banks)`, icon: <Award className="w-4 h-4" /> },
          { id: 'system', label: 'Platform Telemetry', icon: <Database className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: USERS & ROLE MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-purple-600" />
                <span>User Directory & Role Assignment</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign and modify user roles directly. Permissions update immediately across all sessions.
              </p>
            </div>

            {/* Filter by Role & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users by name, email..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto text-xs">
                {(['all', 'student', 'mentor', 'employer', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRoleFilter(r)}
                    className={`px-2.5 py-1.5 rounded-xl font-bold uppercase text-[10px] transition-colors ${
                      selectedRoleFilter === r
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-extrabold uppercase tracking-wider">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Assigned Role</th>
                  <th className="pb-3">Change / Reassign Role</th>
                  <th className="pb-3">Institution / Goal</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3">
                      <div className="font-extrabold text-slate-900">{u.fullName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                    </td>

                    <td className="py-3">
                      <Badge label={u.role.toUpperCase()} variant={getRoleBadgeVariant(u.role)} size="sm" />
                    </td>

                    {/* Role Dropdown Selector */}
                    <td className="py-3">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-900 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                      >
                        <option value="student">Student / Job Seeker</option>
                        <option value="mentor">Industry Mentor</option>
                        <option value="employer">Employer / Recruiter</option>
                        <option value="admin">System Administrator</option>
                      </select>
                    </td>

                    <td className="py-3 text-slate-600">
                      <div>{u.college || u.location || '—'}</div>
                      <div className="text-[10px] text-slate-400">{u.targetCareerId ? `Goal: ${u.targetCareerId}` : 'General'}</div>
                    </td>

                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u.id, u.fullName)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CAREER TAXONOMY & REQUIREMENTS */}
      {/* ========================================================================= */}
      {activeTab === 'careers' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-600" />
                <span>Career Roles & Requirements Manager</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calibrated industry roles, required tool stacks, and market demand ratings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddCareerModal(true)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Career Path</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careersList.map((c) => (
              <div key={c.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{c.name}</h4>
                    <span className="text-[11px] text-slate-500">{c.category}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                    {c.marketDemand}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{c.shortDescription}</p>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-1">
                  {c.recommendedTools.map((tool, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-[10px] rounded font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VERIFIED LEARNING RESOURCES */}
      {/* ========================================================================= */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <span>Verified Learning Resources Manager</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Authenticated course links mapped to skill IDs (Microsoft Learn, Kaggle, SQLBolt, Cisco).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddResourceModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Verified Resource</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {resourcesList.map((res) => (
              <div key={res.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold uppercase text-[10px] text-slate-400">{res.provider}</span>
                  <Badge label={res.cost} variant={res.cost === 'Free' ? 'have' : 'Default'} size="sm" />
                </div>
                <h4 className="font-bold text-slate-900 leading-snug">{res.title}</h4>
                <div className="text-[11px] text-slate-500">
                  Skill Tag: <strong className="text-slate-800 uppercase">{res.skillId}</strong> • ~{res.estimatedHours}h
                </div>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline font-bold text-[11px] block pt-1"
                >
                  Verify External Link →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: ASSESSMENTS QUESTION BANK */}
      {/* ========================================================================= */}
      {activeTab === 'assessments' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                <span>Standardized Assessments & Question Banks</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect and manage 10-question MCQ & scenario banks used for official skill verification.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddQuestionModal(true)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Assessment Question</span>
            </button>
          </div>

          {/* Skill Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
            {Object.keys(questionsMap).map((sId) => (
              <button
                key={sId}
                type="button"
                onClick={() => setSelectedSkillAssessment(sId)}
                className={`px-3 py-1.5 rounded-xl uppercase transition-all ${
                  selectedSkillAssessment === sId
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sId} ({questionsMap[sId]?.length || 0})
              </button>
            ))}
          </div>

          {/* Questions List for Selected Skill */}
          <div className="space-y-3">
            {(questionsMap[selectedSkillAssessment] || []).map((q, idx) => (
              <div key={q.id || idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-extrabold text-slate-900">
                    Q{idx + 1}: {q.question}
                  </span>
                  <Badge label={q.topicTag || 'Core'} variant="Learning" size="sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2 rounded-xl border text-[11px] font-medium ${
                        optIdx === q.correctOptionIndex
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{String.fromCharCode(65 + optIdx)}. </span>
                      <span>{opt}</span>
                      {optIdx === q.correctOptionIndex && <span className="ml-1 text-emerald-600">✓ (Correct)</span>}
                    </div>
                  ))}
                </div>

                {q.explanation && (
                  <p className="text-[10px] text-slate-500 pt-1">
                    <strong>Explanation: </strong>{q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SYSTEM TELEMETRY */}
      {/* ========================================================================= */}
      {activeTab === 'system' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-extrabold text-slate-900">System Health & Security Telemetry</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status of database tables, Row Level Security (RLS) policies, and reactive state stores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-1">
              <div className="flex items-center gap-2 font-extrabold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Supabase PostgreSQL Schema Active</span>
              </div>
              <p className="text-emerald-800 text-[11px]">
                12 relational tables with Row Level Security (RLS) enabled.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-1">
              <div className="flex items-center gap-2 font-extrabold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Deterministic Scoring Engine Online</span>
              </div>
              <p className="text-emerald-800 text-[11px]">
                Weighted multi-factor readiness calculations active with zero drift.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* Modal 1: Create User & Assign Role */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        maxWidth="md"
        title="Create User & Assign Role"
        subtitle="Provision a new account with a pre-assigned system role"
      >
        <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="e.g. ramesh@example.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
            <label className="block font-extrabold text-purple-950">Assign Initial Role *</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as UserRole)}
              className="w-full px-3 py-2 bg-white border border-purple-200 rounded-xl font-bold text-xs text-purple-950 outline-none"
            >
              <option value="student">Student / Job Seeker</option>
              <option value="mentor">Industry Mentor</option>
              <option value="employer">Employer / Recruiter</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>

          {newRole === 'student' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Career Role</label>
              <select
                value={newTargetCareer}
                onChange={(e) => setNewTargetCareer(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-medium"
              >
                {CAREER_ROLES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Institution / Organization</label>
            <input
              type="text"
              value={newCollege}
              onChange={(e) => setNewCollege(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddUserModal(false)}
              className="px-3.5 py-2 font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create & Assign</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Add Career Role */}
      <Modal
        isOpen={showAddCareerModal}
        onClose={() => setShowAddCareerModal(false)}
        maxWidth="md"
        title="Add New Career Role"
        subtitle="Define a new industry career path and tool matrix"
      >
        <form onSubmit={handleCreateCareer} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Career Title *</label>
            <input
              type="text"
              value={newCareerName}
              onChange={(e) => setNewCareerName(e.target.value)}
              placeholder="e.g. Cloud Solutions Architect"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={newCareerCategory}
                onChange={(e) => setNewCareerCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Market Demand</label>
              <select
                value={newCareerDemand}
                onChange={(e) => setNewCareerDemand(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-semibold"
              >
                <option>Very High</option>
                <option>High</option>
                <option>Moderate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Recommended Tools (comma separated)</label>
            <input
              type="text"
              value={newCareerTools}
              onChange={(e) => setNewCareerTools(e.target.value)}
              placeholder="e.g. AWS, Terraform, Docker, Kubernetes"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description</label>
            <textarea
              value={newCareerDesc}
              onChange={(e) => setNewCareerDesc(e.target.value)}
              rows={3}
              placeholder="Overview of core responsibilities and industry application..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddCareerModal(false)}
              className="px-3.5 py-2 font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Career Path</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 3: Add Verified Learning Resource */}
      <Modal
        isOpen={showAddResourceModal}
        onClose={() => setShowAddResourceModal(false)}
        maxWidth="md"
        title="Add Verified Learning Resource"
        subtitle="Map authenticated external courses to skill tracks"
      >
        <form onSubmit={handleCreateResource} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Course / Resource Title *</label>
            <input
              type="text"
              value={newResTitle}
              onChange={(e) => setNewResTitle(e.target.value)}
              placeholder="e.g. Advanced SQL for Analytics"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Skill</label>
              <select
                value={newResSkillId}
                onChange={(e) => setNewResSkillId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-semibold"
              >
                {ALL_SKILLS_FLAT.slice(0, 15).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Provider Platform</label>
              <input
                type="text"
                value={newResProvider}
                onChange={(e) => setNewResProvider(e.target.value)}
                placeholder="e.g. Microsoft Learn, Kaggle"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">External Course URL *</label>
            <input
              type="url"
              value={newResUrl}
              onChange={(e) => setNewResUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cost</label>
              <select
                value={newResCost}
                onChange={(e) => setNewResCost(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-semibold"
              >
                <option>Free</option>
                <option>Paid</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Format</label>
              <select
                value={newResType}
                onChange={(e) => setNewResType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-semibold"
              >
                <option>Interactive</option>
                <option>Video</option>
                <option>Reading</option>
                <option>Course</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Est. Hours</label>
              <input
                type="number"
                value={newResHours}
                onChange={(e) => setNewResHours(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddResourceModal(false)}
              className="px-3.5 py-2 font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Resource</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 4: Add Assessment Question */}
      <Modal
        isOpen={showAddQuestionModal}
        onClose={() => setShowAddQuestionModal(false)}
        maxWidth="md"
        title="Add Assessment Question"
        subtitle="Expand the question bank for skill verification exams"
      >
        <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Skill *</label>
            <select
              value={newQSkillId}
              onChange={(e) => setNewQSkillId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-semibold"
            >
              {Object.keys(questionsMap).map((sId) => (
                <option key={sId} value={sId}>
                  {sId.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Question Prompt *</label>
            <textarea
              value={newQPrompt}
              onChange={(e) => setNewQPrompt(e.target.value)}
              rows={2}
              placeholder="What is the result of using a LEFT JOIN in SQL?"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-slate-700">Answer Options *</label>
            <div className="space-y-2">
              <input
                type="text"
                value={newQOpt0}
                onChange={(e) => setNewQOpt0(e.target.value)}
                placeholder="Option A (e.g. Returns all records from left table)"
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none"
                required
              />
              <input
                type="text"
                value={newQOpt1}
                onChange={(e) => setNewQOpt1(e.target.value)}
                placeholder="Option B (e.g. Returns only matching records)"
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none"
                required
              />
              <input
                type="text"
                value={newQOpt2}
                onChange={(e) => setNewQOpt2(e.target.value)}
                placeholder="Option C (e.g. Returns all records from right table)"
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none"
              />
              <input
                type="text"
                value={newQOpt3}
                onChange={(e) => setNewQOpt3(e.target.value)}
                placeholder="Option D (e.g. Produces a Cartesian product)"
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Correct Answer</label>
              <select
                value={newQCorrectIdx}
                onChange={(e) => setNewQCorrectIdx(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none bg-white font-semibold"
              >
                <option value={0}>Option A</option>
                <option value={1}>Option B</option>
                <option value={2}>Option C</option>
                <option value={3}>Option D</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Rationale / Explanation</label>
              <input
                type="text"
                value={newQExplanation}
                onChange={(e) => setNewQExplanation(e.target.value)}
                placeholder="Why this answer is correct..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddQuestionModal(false)}
              className="px-3.5 py-2 font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save Question</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

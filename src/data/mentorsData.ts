import { MentorProfile, MentorFeedbackItem } from '../types';

export const MENTOR_PROFILES: MentorProfile[] = [
  {
    id: 'm-1',
    name: 'Priya Sharma',
    title: 'Lead Data Analyst',
    company: 'Fintech Solutions Global',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    expertiseCareers: ['data-analyst', 'business-analyst'],
    skills: ['SQL', 'Power BI', 'Statistics', 'Data Storytelling', 'Excel'],
    experienceYears: 8,
    bio: 'Senior Data Lead with 8+ years guiding business intelligence initiatives at global fintech organizations. Passionate about helping students transition into high-impact analytics roles.',
    availability: 'Available (Next: Thursday 4:00 PM)',
    rating: 4.95,
    studentsCount: 38
  },
  {
    id: 'm-2',
    name: 'Rahul Verma',
    title: 'Staff Full Stack Engineer',
    company: 'CloudScale Technologies',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    expertiseCareers: ['full-stack-developer', 'frontend-developer', 'backend-developer'],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'System Design'],
    experienceYears: 10,
    bio: 'Ex-MNC engineering lead mentoring aspiring web developers on code review best practices, modern TypeScript architecture, and cracking technical interviews.',
    availability: 'Available (Next: Saturday 11:00 AM)',
    rating: 4.98,
    studentsCount: 52
  },
  {
    id: 'm-3',
    name: 'Dr. Ananya Roy',
    title: 'Senior AI Research Scientist',
    company: 'NeuroVision Labs',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    expertiseCareers: ['ai-engineer', 'data-scientist'],
    skills: ['Python', 'PyTorch', 'Machine Learning', 'NLP', 'Computer Vision'],
    experienceYears: 7,
    bio: 'PhD in Computer Science with published research in deep learning and NLP. Guiding students in building verified ML portfolios and reading research papers.',
    availability: 'Available (Next: Monday 6:00 PM)',
    rating: 4.92,
    studentsCount: 29
  },
  {
    id: 'm-4',
    name: 'Vikram Mehta',
    title: 'Security Operations Lead (SOC)',
    company: 'CyberShield Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    expertiseCareers: ['cybersecurity-analyst'],
    skills: ['Networking', 'SIEM', 'Linux', 'Incident Response', 'Vulnerability Assessment'],
    experienceYears: 9,
    bio: 'Certified CISSP and SOC leader mentoring candidates on defensive security operations, threat hunting, and blue team certifications.',
    availability: 'Available (Next: Wednesday 5:30 PM)',
    rating: 4.94,
    studentsCount: 34
  }
];

export const INITIAL_MENTOR_FEEDBACK: MentorFeedbackItem[] = [
  {
    id: 'mf-1',
    mentorId: 'm-1',
    mentorName: 'Priya Sharma',
    studentId: 'demo-student',
    date: 'Yesterday, 3:45 PM',
    category: 'Career Advice',
    message: 'Great progress on your Python and Excel fundamentals! To unlock interview opportunities for Data Analyst roles, focus heavily on SQL window functions and building an end-to-end Power BI sales dashboard.',
    actionableSteps: [
      'Practice GROUP BY with HAVING and multi-table LEFT JOINs in SQL',
      'Learn DAX CALCULATE and build an interactive 3-page Power BI dashboard',
      'Take the CareerBridge SQL Assessment to get your verified badge'
    ]
  }
];

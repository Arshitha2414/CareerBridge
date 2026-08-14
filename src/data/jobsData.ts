import { JobOpportunity } from '../types';

export const DEMO_JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'job-da-1',
    title: 'Junior Data Analyst (Product & Growth)',
    company: 'Apex Analytics Corp',
    location: 'Bangalore, India (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Entry-Level',
    careerRole: 'data-analyst',
    requiredSkills: [
      { skillName: 'SQL', level: 'Intermediate', priority: 'Critical' },
      { skillName: 'Power BI', level: 'Intermediate', priority: 'High' },
      { skillName: 'Excel', level: 'Intermediate', priority: 'High' },
      { skillName: 'Statistics', level: 'Beginner', priority: 'Medium' }
    ],
    description: 'We are looking for a high-energy Junior Data Analyst to partner with product managers, analyze user funnel telemetry, build automated Power BI dashboards, and query relational databases with SQL.',
    isDemoJob: true,
    postedDate: '3 days ago'
  },
  {
    id: 'job-da-2',
    title: 'Associate Business Intelligence Analyst',
    company: 'Finora Technologies',
    location: 'Hyderabad, India (Remote)',
    type: 'Full-time',
    experienceLevel: 'Junior',
    careerRole: 'data-analyst',
    requiredSkills: [
      { skillName: 'SQL', level: 'Intermediate', priority: 'Critical' },
      { skillName: 'Power BI', level: 'Intermediate', priority: 'Critical' },
      { skillName: 'Data Cleaning', level: 'Intermediate', priority: 'High' },
      { skillName: 'Communication & Data Storytelling', level: 'Intermediate', priority: 'High' }
    ],
    description: 'Help build the next generation of financial intelligence dashboards. You will write complex SQL transformations, model star schemas in Power BI, and present monthly KPI reviews to leadership.',
    isDemoJob: true,
    postedDate: '5 days ago'
  },
  {
    id: 'job-fs-1',
    title: 'Graduate Full Stack Developer',
    company: 'NexGen Cloud Systems',
    location: 'Pune, India (On-site)',
    type: 'Full-time',
    experienceLevel: 'Entry-Level',
    careerRole: 'full-stack-developer',
    requiredSkills: [
      { skillName: 'React', level: 'Intermediate', priority: 'Critical' },
      { skillName: 'TypeScript', level: 'Intermediate', priority: 'High' },
      { skillName: 'Node.js & Express', level: 'Intermediate', priority: 'Critical' },
      { skillName: 'SQL', level: 'Beginner', priority: 'Medium' },
      { skillName: 'Git', level: 'Intermediate', priority: 'High' }
    ],
    description: 'Join our product engineering squad building scalable B2B web applications. You will write clean TypeScript on both frontend React and backend Node.js microservices.',
    isDemoJob: true,
    postedDate: '1 week ago'
  },
  {
    id: 'job-ai-1',
    title: 'Junior Machine Learning Engineer',
    company: 'Cognitive AI Labs',
    location: 'Bangalore, India (Remote)',
    type: 'Full-time',
    experienceLevel: 'Entry-Level',
    careerRole: 'ai-engineer',
    requiredSkills: [
      { skillName: 'Python', level: 'Advanced', priority: 'Critical' },
      { skillName: 'Machine Learning', level: 'Intermediate', priority: 'Critical' },
      { skillName: 'PyTorch', level: 'Intermediate', priority: 'High' },
      { skillName: 'Docker', level: 'Beginner', priority: 'Medium' }
    ],
    description: 'Work with our research engineers to train, evaluate, and deploy NLP models and computer vision pipelines into production API services.',
    isDemoJob: true,
    postedDate: '2 days ago'
  }
];

import { LearningResource } from '../types';

export const VERIFIED_LEARNING_RESOURCES: LearningResource[] = [
  // -------------------------------------------------------------
  // SQL Resources
  // -------------------------------------------------------------
  {
    id: 'res-sql-1',
    skillId: 'sql',
    topic: 'Interactive SQL Practice & Fundamentals',
    title: 'SQLBolt – Interactive SQL Lessons & In-Browser Exercises',
    provider: 'SQLBolt',
    url: 'https://sqlbolt.com/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Interactive',
    estimatedHours: 6,
    isPrimary: true,
    rating: 4.9
  },
  {
    id: 'res-sql-2',
    skillId: 'sql',
    topic: 'Relational Database Fundamentals',
    title: 'W3Schools SQL Tutorial & Practice Editor',
    provider: 'W3Schools',
    url: 'https://www.w3schools.com/sql/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Reading',
    estimatedHours: 8,
    isPrimary: false,
    rating: 4.7
  },
  {
    id: 'res-sql-3',
    skillId: 'sql',
    topic: 'Advanced SQL & Window Functions',
    title: 'PostgreSQL Official Documentation & Tutorial',
    provider: 'PostgreSQL Org',
    url: 'https://www.postgresql.org/docs/current/tutorial.html',
    difficulty: 'Intermediate',
    cost: 'Free',
    type: 'Documentation',
    estimatedHours: 12,
    isPrimary: false,
    rating: 4.8
  },
  {
    id: 'res-sql-4',
    skillId: 'sql',
    topic: 'Full SQL Database Course',
    title: 'SQL for Beginners: Learn SQL in 4 Hours',
    provider: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/sql-and-databases-full-course/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Video',
    estimatedHours: 4,
    isPrimary: false,
    rating: 4.8
  },

  // -------------------------------------------------------------
  // Power BI Resources
  // -------------------------------------------------------------
  {
    id: 'res-pbi-1',
    skillId: 'power-bi',
    topic: 'Get Started with Microsoft Data Analytics & Power BI',
    title: 'Microsoft Learn – Model, Visualize and Publish in Power BI',
    provider: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/paths/model-power-bi/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Interactive',
    estimatedHours: 10,
    isPrimary: true,
    rating: 4.9
  },
  {
    id: 'res-pbi-2',
    skillId: 'power-bi',
    topic: 'DAX & Data Modeling in Power BI',
    title: 'Microsoft Learn – Create DAX Calculations in Power BI Desktop',
    provider: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/modules/dax-power-bi-models/',
    difficulty: 'Intermediate',
    cost: 'Free',
    type: 'Course',
    estimatedHours: 6,
    isPrimary: false,
    rating: 4.8
  },
  {
    id: 'res-pbi-3',
    skillId: 'power-bi',
    topic: 'Full Power BI End-to-End Dashboard Tutorial',
    title: 'Power BI Beginner to Pro Tutorial Course',
    provider: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/learn-power-bi/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Video',
    estimatedHours: 5,
    isPrimary: false,
    rating: 4.7
  },

  // -------------------------------------------------------------
  // Statistics Resources
  // -------------------------------------------------------------
  {
    id: 'res-stat-1',
    skillId: 'statistics',
    topic: 'Probability & Descriptive Statistics for Data Science',
    title: 'Khan Academy – High School Statistics & Probability',
    provider: 'Khan Academy',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Interactive',
    estimatedHours: 14,
    isPrimary: true,
    rating: 4.9
  },
  {
    id: 'res-stat-2',
    skillId: 'statistics',
    topic: 'Hypothesis Testing & Statistical Inference',
    title: 'Penn State STAT 500 – Applied Statistics Course Notes',
    provider: 'Penn State Online',
    url: 'https://online.stat.psu.edu/stat500/',
    difficulty: 'Intermediate',
    cost: 'Free',
    type: 'Reading',
    estimatedHours: 16,
    isPrimary: false,
    rating: 4.8
  },

  // -------------------------------------------------------------
  // Python Resources
  // -------------------------------------------------------------
  {
    id: 'res-py-1',
    skillId: 'python',
    topic: 'Micro-Course: Python Core for Data Science',
    title: 'Kaggle Learn – Python Hands-on Micro-Course',
    provider: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn/python',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Interactive',
    estimatedHours: 5,
    isPrimary: true,
    rating: 4.9
  },
  {
    id: 'res-py-2',
    skillId: 'python',
    topic: 'Pandas Data Manipulation',
    title: 'Kaggle Learn – Pandas Micro-Course',
    provider: 'Kaggle Learn',
    url: 'https://www.kaggle.com/learn/pandas',
    difficulty: 'Intermediate',
    cost: 'Free',
    type: 'Interactive',
    estimatedHours: 4,
    isPrimary: false,
    rating: 4.8
  },
  {
    id: 'res-py-3',
    skillId: 'python',
    topic: 'Official Python Tutorial',
    title: 'Python 3 Official Documentation & Tutorial',
    provider: 'Python Software Foundation',
    url: 'https://docs.python.org/3/tutorial/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Documentation',
    estimatedHours: 10,
    isPrimary: false,
    rating: 4.7
  },

  // -------------------------------------------------------------
  // Excel Resources
  // -------------------------------------------------------------
  {
    id: 'res-xl-1',
    skillId: 'excel',
    topic: 'Formulas, Pivot Tables & XLOOKUP',
    title: 'Microsoft Support – Excel Video Training & Practice Workbooks',
    provider: 'Microsoft Learn',
    url: 'https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Video',
    estimatedHours: 6,
    isPrimary: true,
    rating: 4.8
  },

  // -------------------------------------------------------------
  // React Resources
  // -------------------------------------------------------------
  {
    id: 'res-react-1',
    skillId: 'react',
    topic: 'Modern React Component Model & Hooks',
    title: 'React.dev – Official Interactive React Documentation',
    provider: 'React Core Team',
    url: 'https://react.dev/learn',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Interactive',
    estimatedHours: 12,
    isPrimary: true,
    rating: 5.0
  },
  {
    id: 'res-react-2',
    skillId: 'react',
    topic: 'Full Modern React Course',
    title: 'freeCodeCamp – Full React Course with Projects',
    provider: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/learn-react-course/',
    difficulty: 'Intermediate',
    cost: 'Free',
    type: 'Video',
    estimatedHours: 8,
    isPrimary: false,
    rating: 4.9
  },

  // -------------------------------------------------------------
  // Git / GitHub Resources
  // -------------------------------------------------------------
  {
    id: 'res-git-1',
    skillId: 'git',
    topic: 'Interactive Git Branching & Version Control',
    title: 'Learn Git Branching – Visual & Interactive Sandbox',
    provider: 'Learn Git Branching',
    url: 'https://learngitbranching.js.org/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Interactive',
    estimatedHours: 4,
    isPrimary: true,
    rating: 5.0
  },
  {
    id: 'res-git-2',
    skillId: 'git',
    topic: 'Git Book & Pro Reference',
    title: 'Pro Git Book (Complete Official Reference)',
    provider: 'Git SCM',
    url: 'https://git-scm.com/book/en/v2',
    difficulty: 'Intermediate',
    cost: 'Free',
    type: 'Reading',
    estimatedHours: 10,
    isPrimary: false,
    rating: 4.8
  },

  // -------------------------------------------------------------
  // Docker Resources
  // -------------------------------------------------------------
  {
    id: 'res-docker-1',
    skillId: 'docker',
    topic: 'Container Fundamentals & Dockerfile',
    title: 'Docker Getting Started Guide & Official Tutorial',
    provider: 'Docker Inc.',
    url: 'https://docs.docker.com/get-started/',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Documentation',
    estimatedHours: 6,
    isPrimary: true,
    rating: 4.8
  },

  // -------------------------------------------------------------
  // Cybersecurity Fundamentals & Networking
  // -------------------------------------------------------------
  {
    id: 'res-sec-1',
    skillId: 'cybersecurity-fundamentals',
    topic: 'Cybersecurity Fundamentals & Threat Landscapes',
    title: 'Cisco Skills for All – Introduction to Cybersecurity',
    provider: 'Cisco Skills for All',
    url: 'https://skillsforall.com/course/introduction-to-cybersecurity',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Course',
    estimatedHours: 15,
    isPrimary: true,
    rating: 4.9
  },
  {
    id: 'res-net-1',
    skillId: 'networking',
    topic: 'Networking Basics for Cyber & Cloud',
    title: 'Cisco Skills for All – Networking Basics',
    provider: 'Cisco Skills for All',
    url: 'https://skillsforall.com/course/networking-basics',
    difficulty: 'Beginner',
    cost: 'Free',
    type: 'Course',
    estimatedHours: 20,
    isPrimary: true,
    rating: 4.9
  }
];

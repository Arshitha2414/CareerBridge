export interface SkillCategoryGroup {
  id: string;
  name: string;
  skills: {
    id: string;
    name: string;
    description: string;
    popularCareers: string[];
  }[];
}

export const SKILL_CATEGORIES: SkillCategoryGroup[] = [
  {
    id: 'programming',
    name: 'Programming Languages',
    skills: [
      { id: 'python', name: 'Python', description: 'Versatile language for data science, backend APIs, and automation.', popularCareers: ['Data Analyst', 'Data Scientist', 'AI / ML Engineer', 'Backend Developer'] },
      { id: 'javascript', name: 'JavaScript', description: 'Standard language for web interactivity and modern full-stack development.', popularCareers: ['Frontend Developer', 'Full Stack Developer', 'Backend Developer'] },
      { id: 'typescript', name: 'TypeScript', description: 'Typed superset of JavaScript enhancing maintainability in enterprise apps.', popularCareers: ['Frontend Developer', 'Full Stack Developer', 'Backend Developer'] },
      { id: 'java', name: 'Java', description: 'Object-oriented language for enterprise backends and Android systems.', popularCareers: ['Backend Developer', 'Software Developer', 'QA Engineer'] },
      { id: 'cpp', name: 'C++', description: 'High-performance compiled language for systems and game engines.', popularCareers: ['Software Developer', 'AI / ML Engineer', 'Systems Engineer'] },
      { id: 'c', name: 'C', description: 'Foundational procedural language for low-level systems and embedded devices.', popularCareers: ['Software Developer', 'Security Researcher'] },
      { id: 'csharp', name: 'C#', description: 'Microsoft modern language for .NET backends, enterprise apps, and Unity.', popularCareers: ['Backend Developer', 'Full Stack Developer'] },
      { id: 'r', name: 'R', description: 'Statistical programming language widely used in academia and bio-statistics.', popularCareers: ['Data Scientist', 'Statistician'] },
      { id: 'kotlin', name: 'Kotlin', description: 'Modern concise language for native Android mobile applications.', popularCareers: ['Mobile App Developer'] },
      { id: 'swift', name: 'Swift', description: 'Apple official modern language for iOS and macOS applications.', popularCareers: ['Mobile App Developer'] },
    ]
  },
  {
    id: 'data',
    name: 'Data & Databases',
    skills: [
      { id: 'sql', name: 'SQL', description: 'Structured Query Language for querying and managing relational databases.', popularCareers: ['Data Analyst', 'Data Scientist', 'Full Stack Developer', 'Backend Developer', 'Business Analyst'] },
      { id: 'excel', name: 'Excel (Advanced)', description: 'Spreadsheets, formulas, pivot tables, and financial analysis.', popularCareers: ['Data Analyst', 'Business Analyst', 'Product Manager'] },
      { id: 'power-bi', name: 'Power BI', description: 'Microsoft business intelligence platform for interactive dashboards & DAX.', popularCareers: ['Data Analyst', 'Business Analyst', 'BI Developer'] },
      { id: 'tableau', name: 'Tableau', description: 'Leading data visualization software for enterprise reporting.', popularCareers: ['Data Analyst', 'BI Specialist'] },
      { id: 'statistics', name: 'Statistics & Probability', description: 'Hypothesis testing, distributions, regression, and sampling theory.', popularCareers: ['Data Analyst', 'Data Scientist', 'AI / ML Engineer'] },
      { id: 'pandas', name: 'Pandas', description: 'High-performance Python library for data manipulation and analysis.', popularCareers: ['Data Analyst', 'Data Scientist', 'AI / ML Engineer'] },
      { id: 'numpy', name: 'NumPy', description: 'Core library for array computing and mathematical calculations in Python.', popularCareers: ['Data Scientist', 'AI / ML Engineer'] },
      { id: 'data-cleaning', name: 'Data Cleaning & Preprocessing', description: 'Standardizing dirty datasets, handling missing values, and type conversions.', popularCareers: ['Data Analyst', 'Data Scientist'] },
      { id: 'data-visualization', name: 'Data Visualization & Storytelling', description: 'Visual communication of data trends through charts and presentations.', popularCareers: ['Data Analyst', 'Business Analyst'] },
      { id: 'data-modeling', name: 'Data Modeling & Warehousing', description: 'Star schema, snowflake schema, and relational database normalization.', popularCareers: ['Data Engineer', 'Data Analyst'] },
    ]
  },
  {
    id: 'web',
    name: 'Web Development',
    skills: [
      { id: 'html', name: 'HTML5', description: 'Semantic markup for web structure and accessibility.', popularCareers: ['Frontend Developer', 'Full Stack Developer', 'UI/UX Designer'] },
      { id: 'css', name: 'CSS3 / Tailwind', description: 'Modern styling, responsive layouts, flexbox, and grid.', popularCareers: ['Frontend Developer', 'Full Stack Developer', 'UI/UX Designer'] },
      { id: 'react', name: 'React', description: 'Declarative component-based frontend library for single-page web apps.', popularCareers: ['Frontend Developer', 'Full Stack Developer'] },
      { id: 'node-js', name: 'Node.js & Express', description: 'JavaScript runtime for building scalable server-side applications and APIs.', popularCareers: ['Backend Developer', 'Full Stack Developer'] },
      { id: 'rest-apis', name: 'REST APIs & Web Security', description: 'Designing, consuming, and securing HTTP APIs with JSON.', popularCareers: ['Backend Developer', 'Full Stack Developer', 'QA Engineer'] },
      { id: 'nextjs', name: 'Next.js', description: 'Production React framework with SSR, static site generation, and server actions.', popularCareers: ['Frontend Developer', 'Full Stack Developer'] },
      { id: 'vue', name: 'Vue.js', description: 'Progressive JavaScript framework for building user interfaces.', popularCareers: ['Frontend Developer', 'Full Stack Developer'] },
    ]
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    skills: [
      { id: 'machine-learning', name: 'Machine Learning Fundamentals', description: 'Supervised, unsupervised algorithms, cross-validation, and metrics.', popularCareers: ['Data Scientist', 'AI / ML Engineer'] },
      { id: 'scikit-learn', name: 'Scikit-learn', description: 'Python machine learning library for regression, clustering, and classifiers.', popularCareers: ['Data Scientist', 'AI / ML Engineer'] },
      { id: 'pytorch', name: 'PyTorch / Deep Learning', description: 'Deep learning framework for training neural networks and vision/NLP models.', popularCareers: ['AI / ML Engineer', 'Data Scientist'] },
      { id: 'nlp', name: 'NLP & LLM Applications', description: 'Natural language processing, embeddings, RAG, and generative AI.', popularCareers: ['AI / ML Engineer', 'Data Scientist'] },
      { id: 'computer-vision', name: 'Computer Vision', description: 'Image processing, object detection, and CNN architectures.', popularCareers: ['AI / ML Engineer'] },
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps Tools',
    skills: [
      { id: 'git', name: 'Git & GitHub', description: 'Distributed version control, pull requests, branches, and code collaboration.', popularCareers: ['All Developers', 'Data Analysts', 'DevOps Engineers'] },
      { id: 'docker', name: 'Docker & Containers', description: 'Packaging applications with dependencies into isolated reproducible containers.', popularCareers: ['DevOps Engineer', 'Full Stack Developer', 'Backend Developer'] },
      { id: 'linux', name: 'Linux & Shell Scripting', description: 'Command-line navigation, file permissions, cron jobs, and bash scripts.', popularCareers: ['Cybersecurity Analyst', 'DevOps Engineer', 'Backend Developer'] },
      { id: 'aws', name: 'AWS Cloud Fundamentals', description: 'Amazon Web Services: EC2, S3, RDS, Lambda, and IAM security.', popularCareers: ['Cloud Engineer', 'DevOps Engineer', 'Full Stack Developer'] },
      { id: 'azure', name: 'Azure Cloud', description: 'Microsoft cloud infrastructure, app services, and enterprise identity.', popularCareers: ['Cloud Engineer', 'DevOps Engineer'] },
      { id: 'kubernetes', name: 'Kubernetes', description: 'Container orchestration, scaling, service discovery, and rolling updates.', popularCareers: ['DevOps Engineer', 'Cloud Architect'] },
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Networks',
    skills: [
      { id: 'networking', name: 'Computer Networking', description: 'TCP/IP protocol stack, DNS, subnetting, routing, and HTTP/HTTPS.', popularCareers: ['Cybersecurity Analyst', 'Network Engineer', 'DevOps Engineer'] },
      { id: 'cybersecurity-fundamentals', name: 'Cybersecurity Fundamentals', description: 'Threat landscape, CIA triad, cryptography, and access control.', popularCareers: ['Cybersecurity Analyst', 'SOC Analyst'] },
      { id: 'siem', name: 'SIEM & Log Analysis', description: 'Security information and event management (Splunk, Elastic, Sysmon).', popularCareers: ['Cybersecurity Analyst', 'SOC Analyst'] },
      { id: 'ethical-hacking', name: 'Vulnerability Assessment & Pen Testing', description: 'Scanning, OWASP Top 10 vulnerabilities, and security auditing.', popularCareers: ['Penetration Tester', 'Cybersecurity Analyst'] },
    ]
  },
  {
    id: 'soft-skills',
    name: 'Professional & Soft Skills',
    skills: [
      { id: 'communication', name: 'Communication & Storytelling', description: 'Presenting technical findings clearly to non-technical stakeholders.', popularCareers: ['All Roles', 'Data Analyst', 'Product Manager'] },
      { id: 'problem-solving', name: 'Analytical Problem Solving', description: 'Breaking down complex ambiguous problems into testable hypotheses.', popularCareers: ['All Roles'] },
      { id: 'teamwork', name: 'Agile & Team Collaboration', description: 'Working in cross-functional agile teams and sprint cadences.', popularCareers: ['All Roles'] },
      { id: 'leadership', name: 'Initiative & Project Leadership', description: 'Taking ownership of deliverables and driving team outcomes.', popularCareers: ['Product Manager', 'Team Lead'] },
    ]
  }
];

export const ALL_SKILLS_FLAT = SKILL_CATEGORIES.flatMap(cat => cat.skills.map(s => ({ ...s, category: cat.name })));

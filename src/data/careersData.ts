import { CareerRole, CareerSkillRequirement } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Data & Analytics',
    shortDescription: 'Collect, clean, and interpret data sets to answer business questions and guide strategic decisions.',
    fullDescription: 'Data Analysts bridge the gap between raw data and actionable business strategy. They write complex SQL queries, build dynamic Power BI / Tableau dashboards, conduct statistical analysis, and present findings to cross-functional stakeholders.',
    iconName: 'BarChart3',
    coreResponsibilities: [
      'Query databases using SQL to extract and transform large business datasets',
      'Design and deploy interactive executive dashboards in Power BI or Tableau',
      'Perform exploratory data analysis and data cleansing with Python or Excel',
      'Identify trends, anomalies, and KPIs to support revenue and operational growth',
      'Translate technical analytical findings into clear business recommendations'
    ],
    recommendedTools: ['Excel', 'SQL Server / PostgreSQL', 'Power BI', 'Tableau', 'Jupyter Notebooks', 'Git'],
    softSkills: ['Analytical Thinking', 'Data Storytelling', 'Cross-functional Communication', 'Business Acumen', 'Problem Solving'],
    recommendedProjects: [
      'E-commerce Sales & Revenue Performance Dashboard',
      'Customer Churn & Retention Cohort Analysis',
      'Supply Chain Inventory Optimization SQL Database'
    ],
    relatedCareers: ['Business Analyst', 'Data Scientist', 'BI Developer', 'Digital Marketing Analyst'],
    marketDemand: 'Very High'
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    category: 'Data & Analytics',
    shortDescription: 'Build predictive machine learning models, statistical experiments, and algorithms from complex data.',
    fullDescription: 'Data Scientists utilize advanced statistics, machine learning, and programming in Python and R to extract deeper predictive insights, forecast trends, and automate high-value decision-making systems.',
    iconName: 'Binary',
    coreResponsibilities: [
      'Develop supervised and unsupervised machine learning models with Scikit-learn',
      'Perform deep statistical inference, hypothesis testing, and A/B experimentation',
      'Cleanse, engineer features, and preprocess structured and unstructured data',
      'Deploy predictive model APIs and monitor model drift in production',
      'Communicate machine learning findings to technical and business leadership'
    ],
    recommendedTools: ['Python', 'Pandas & NumPy', 'Scikit-learn', 'SQL', 'TensorFlow / PyTorch', 'MLflow'],
    softSkills: ['Scientific Rigor', 'Mathematical Intuition', 'Curiosity', 'Communication', 'Structured Problem Solving'],
    recommendedProjects: [
      'Customer Lifetime Value & Churn Prediction Model',
      'Housing Price Multivariable Regression & Feature Engineering Engine',
      'Sentiment Analysis on Consumer Reviews using NLP'
    ],
    relatedCareers: ['Data Analyst', 'Machine Learning Engineer', 'AI Engineer', 'Quantitative Analyst'],
    marketDemand: 'Very High'
  },
  {
    id: 'full-stack-developer',
    name: 'Full Stack Developer',
    category: 'Software Engineering',
    shortDescription: 'Build complete web applications spanning responsive frontend user interfaces and robust backend architectures.',
    fullDescription: 'Full Stack Developers build end-to-end web products. They master responsive client-side development with React and TypeScript, secure server-side REST/GraphQL APIs with Node.js, and reliable database architectures with PostgreSQL or MongoDB.',
    iconName: 'Layers',
    coreResponsibilities: [
      'Build responsive, accessible user interfaces using React, TypeScript, and modern CSS',
      'Design and implement secure RESTful and GraphQL APIs using Node.js / Express',
      'Architect relational and NoSQL database schemas with automated migrations',
      'Implement JWT/OAuth authentication, role-based access control, and security best practices',
      'Deploy and maintain containerized applications with CI/CD automation'
    ],
    recommendedTools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git/GitHub', 'Docker', 'Postman'],
    softSkills: ['Systems Thinking', 'Attention to Detail', 'Collaborative Coding', 'Time Management', 'Continuous Learning'],
    recommendedProjects: [
      'Full-Stack Collaborative Project Management App (React + Node + Postgres)',
      'E-commerce Platform with Stripe Payment Integration and Webhooks',
      'Real-time Chat & Team Collaboration Platform with WebSockets'
    ],
    relatedCareers: ['Frontend Developer', 'Backend Developer', 'Software Developer', 'DevOps Engineer'],
    marketDemand: 'Very High'
  },
  {
    id: 'frontend-developer',
    name: 'Frontend Developer',
    category: 'Software Engineering',
    shortDescription: 'Craft intuitive, highly responsive, performant user interfaces and dynamic client web experiences.',
    fullDescription: 'Frontend Developers specialize in the visual and interactive parts of digital applications. They transform UI/UX designs into pixel-perfect, accessible, stateful web applications using React, modern JavaScript/TypeScript, and CSS frameworks.',
    iconName: 'Layout',
    coreResponsibilities: [
      'Develop modern component-driven user interfaces in React and TypeScript',
      'Ensure high performance, web accessibility (WCAG), and responsive cross-browser layouts',
      'Integrate with backend REST/GraphQL APIs with robust error handling and loading states',
      'Manage complex client state using React Context, Redux Toolkit, or TanStack Query',
      'Collaborate closely with UI/UX designers and write automated frontend tests'
    ],
    recommendedTools: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vite', 'Figma', 'Chrome DevTools'],
    softSkills: ['Visual Aesthetics', 'User Empathy', 'Collaboration', 'Problem Solving', 'Communication'],
    recommendedProjects: [
      'SaaS Analytics Dashboard with Interactive Charts and Dark/Light Mode',
      'Interactive Kanban Board with Drag-and-Drop and Local Persistence',
      'High-Performance E-commerce Product Catalog with Instant Search & Filtering'
    ],
    relatedCareers: ['Full Stack Developer', 'UI/UX Designer', 'Mobile App Developer'],
    marketDemand: 'High'
  },
  {
    id: 'backend-developer',
    name: 'Backend Developer',
    category: 'Software Engineering',
    shortDescription: 'Engineer resilient server-side applications, microservices, databases, and high-throughput APIs.',
    fullDescription: 'Backend Developers power the core logic of applications behind the scenes. They engineer scalable microservices, manage database transactions and concurrency, optimize API latency, and ensure rock-solid data integrity and system security.',
    iconName: 'Server',
    coreResponsibilities: [
      'Architect robust REST and gRPC API endpoints with clean separation of concerns',
      'Design normalized relational database schemas, indexes, and query optimizations',
      'Implement authentication, authorization, rate limiting, and data encryption',
      'Manage message queues and asynchronous event handling (RabbitMQ / Kafka / Redis)',
      'Write comprehensive unit and integration test suites'
    ],
    recommendedTools: ['Node.js / Express', 'PostgreSQL', 'Redis', 'Docker', 'Git', 'Postman', 'Linux'],
    softSkills: ['Architectural Thinking', 'Reliability Mindset', 'Debugging Acumen', 'Security Awareness'],
    recommendedProjects: [
      'Scalable Multi-tenant SaaS Backend API with Role-Based Access Control',
      'High-throughput Booking & Reservation Engine with Redis Caching and Concurrency Locks',
      'Microservices Event-Driven Notification System with RabbitMQ'
    ],
    relatedCareers: ['Full Stack Developer', 'DevOps Engineer', 'Cloud Engineer', 'Database Administrator'],
    marketDemand: 'High'
  },
  {
    id: 'ai-engineer',
    name: 'AI / Machine Learning Engineer',
    category: 'Artificial Intelligence',
    shortDescription: 'Build, fine-tune, deploy, and scale state-of-the-art AI systems and Machine Learning pipelines.',
    fullDescription: 'AI and ML Engineers take algorithms from experimental research into production-grade systems. They build training pipelines, leverage LLMs and vector databases, optimize neural networks, and deploy low-latency inference endpoints.',
    iconName: 'Cpu',
    coreResponsibilities: [
      'Design, train, and fine-tune machine learning and deep learning models with PyTorch',
      'Build LLM applications using RAG (Retrieval-Augmented Generation) and Vector Databases',
      'Preprocess large unstructured text, vision, and tabular training corpora',
      'Deploy scalable model inference servers with FastAPI and Docker',
      'Monitor model latency, drift, cost, and hallucination metrics in production'
    ],
    recommendedTools: ['Python', 'PyTorch', 'Hugging Face', 'LangChain / LlamaIndex', 'FastAPI', 'Docker', 'ChromaDB'],
    softSkills: ['Mathematical Intuition', 'Rapid Prototyping', 'Scientific Reasoning', 'Problem Solving'],
    recommendedProjects: [
      'Enterprise RAG Knowledge Assistant with Hybrid Semantic Search and Source Citations',
      'Computer Vision Defect Detection Pipeline with PyTorch and FastAPI',
      'Fine-tuned Domain-Specific LLM for Code Review & Vulnerability Detection'
    ],
    relatedCareers: ['Data Scientist', 'Backend Developer', 'Research Engineer', 'MLOps Engineer'],
    marketDemand: 'Very High'
  },
  {
    id: 'cybersecurity-analyst',
    name: 'Cybersecurity Analyst',
    category: 'Security & Infrastructure',
    shortDescription: 'Protect organizational networks, cloud systems, and data assets from cyber threats and intrusions.',
    fullDescription: 'Cybersecurity Analysts are the frontline defense against digital threats. They monitor network traffic, investigate SIEM security alerts, identify system vulnerabilities, conduct incident response, and enforce security compliance policies.',
    iconName: 'ShieldCheck',
    coreResponsibilities: [
      'Monitor SIEM consoles (e.g. Splunk, Elastic) for indicators of compromise (IOCs)',
      'Conduct vulnerability assessments and configure firewall/endpoint protection rules',
      'Perform threat analysis, triage malware incidents, and document incident response',
      'Audit access controls, network configurations, and cloud security postures',
      'Educate staff and enforce organizational cybersecurity policies and compliance'
    ],
    recommendedTools: ['Wireshark', 'Splunk / SIEM', 'Linux / Bash', 'Nmap', 'Metasploit', 'Burp Suite'],
    softSkills: ['Vigilance', 'Investigation Instinct', 'Calm under Pressure', 'Ethical Judgment', 'Clear Documentation'],
    recommendedProjects: [
      'Home Lab Threat Detection & SIEM Setup with Elastic Security and Sysmon',
      'Vulnerability Assessment and Hardening Report for a Multi-Tier Linux Web App',
      'Network Traffic Packet Analysis & Intrusion Detection Lab using Wireshark and Snort'
    ],
    relatedCareers: ['SOC Analyst', 'Cloud Security Engineer', 'Penetration Tester', 'Network Engineer'],
    marketDemand: 'Very High'
  },
  {
    id: 'cloud-devops-engineer',
    name: 'Cloud & DevOps Engineer',
    category: 'Security & Infrastructure',
    shortDescription: 'Automate software delivery pipelines, manage cloud infrastructure, and ensure 99.99% uptime.',
    fullDescription: 'Cloud & DevOps Engineers bridge development and operations. They architect scalable cloud infrastructure (AWS/Azure/GCP) using Infrastructure as Code (Terraform), automate CI/CD delivery pipelines, and manage containerized Kubernetes clusters.',
    iconName: 'Cloud',
    coreResponsibilities: [
      'Automate CI/CD build, test, and release pipelines using GitHub Actions / GitLab CI',
      'Provision scalable and secure cloud infrastructure using Terraform (IaC)',
      'Containerize applications with Docker and orchestrate with Kubernetes',
      'Implement central logging, metrics monitoring, and automated alerting (Prometheus/Grafana)',
      'Ensure high availability, disaster recovery, and cloud cost optimization'
    ],
    recommendedTools: ['AWS / Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux', 'Grafana'],
    softSkills: ['Automation Focus', 'System Resilience Thinking', 'Troubleshooting', 'Collaboration'],
    recommendedProjects: [
      'Complete Automated GitOps CI/CD Pipeline deploying microservices to AWS EKS with Terraform',
      'Zero-Downtime Blue/Green Deployment Architecture on Docker Swarm / Kubernetes',
      'Enterprise Observability Stack with Prometheus, Loki, and Custom Grafana Dashboards'
    ],
    relatedCareers: ['Backend Developer', 'Site Reliability Engineer', 'Cloud Architect', 'Linux Sysadmin'],
    marketDemand: 'Very High'
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    category: 'Business & Management',
    shortDescription: 'Analyze business processes, elicit requirements, and bridge technical teams with executive strategy.',
    fullDescription: 'Business Analysts understand business needs, formulate requirements, model workflows, and analyze data to improve organizational efficiency, software delivery, and profitability.',
    iconName: 'Briefcase',
    coreResponsibilities: [
      'Conduct stakeholder interviews and translate business requirements into user stories',
      'Model current state (As-Is) and future state (To-Be) business processes in BPMN',
      'Perform cost-benefit analyses, market research, and financial feasibility studies',
      'Create functional specification documents, wireframes, and acceptance criteria',
      'Collaborate with development teams during agile sprints to ensure delivery accuracy'
    ],
    recommendedTools: ['Excel', 'Jira & Confluence', 'Visio / Lucidchart', 'SQL', 'Power BI', 'Figma'],
    softSkills: ['Stakeholder Management', 'Elicitation', 'Negotiation', 'Structured Communication', 'Critical Thinking'],
    recommendedProjects: [
      'End-to-End Business Requirement Document (BRD) & Workflow Overhaul for Fintech Onboarding',
      'Customer Journey Mapping & Process Optimization Case Study for E-commerce Returns',
      'Agile Sprint Backlog & User Story Mapping Project in Jira'
    ],
    relatedCareers: ['Product Manager', 'Data Analyst', 'Project Manager', 'Scrum Master'],
    marketDemand: 'High'
  },
  {
    id: 'ui-ux-designer',
    name: 'UI/UX Designer',
    category: 'Design',
    shortDescription: 'Design intuitive, engaging, and accessible digital product experiences and comprehensive design systems.',
    fullDescription: 'UI/UX Designers combine user research, interaction design, information architecture, and visual aesthetics to craft seamless digital experiences that solve real user problems and drive business growth.',
    iconName: 'Palette',
    coreResponsibilities: [
      'Conduct user interviews, usability testing, and persona research',
      'Design wireframes, high-fidelity mockups, and interactive prototypes in Figma',
      'Build and maintain scalable design systems with atomic design principles',
      'Ensure accessibility (WCAG 2.1 AA) and responsive component usability across devices',
      'Handoff design assets and specifications cleanly to frontend engineering teams'
    ],
    recommendedTools: ['Figma', 'FigJam', 'Adobe Creative Cloud', 'Miro', 'Notion', 'HTML/CSS Basics'],
    softSkills: ['Empathy', 'Visual Hierarchy', 'Storytelling', 'Constructive Feedback', 'Design Thinking'],
    recommendedProjects: [
      'Complete Mobile Banking App Redesign with Usability Testing & Interactive Prototype',
      'B2B SaaS Multi-tenant Design System with Component Library in Figma',
      'Accessible Travel Booking Web App with User Journey Research and WCAG Audit'
    ],
    relatedCareers: ['Frontend Developer', 'Product Designer', 'Design System Lead', 'UX Researcher'],
    marketDemand: 'High'
  },
  {
    id: 'product-manager',
    name: 'Product Manager',
    category: 'Business & Management',
    shortDescription: 'Define product vision, prioritize roadmap features, and guide products from discovery to launch.',
    fullDescription: 'Product Managers sit at the intersection of business, technology, and user experience. They discover customer problems, define strategic product roadmaps, lead agile teams, and drive key product metrics.',
    iconName: 'Compass',
    coreResponsibilities: [
      'Define product vision, strategy, and outcome-oriented roadmaps',
      'Conduct user discovery, qualitative research, and product analytics tracking',
      'Prioritize product backlog and write clear PRDs (Product Requirement Documents)',
      'Lead cross-functional sprints with engineers, designers, and marketers',
      'Track north star metrics, retention, conversion, and user satisfaction'
    ],
    recommendedTools: ['Jira / Linear', 'Mixpanel / Amplitude', 'Figma', 'Notion', 'SQL Basics', 'Google Analytics'],
    softSkills: ['Strategic Vision', 'Cross-Functional Leadership', 'Prioritization', 'Customer Empathy', 'Decisiveness'],
    recommendedProjects: [
      'Comprehensive Product Requirement Document (PRD) & Go-To-Market Plan for a HealthTech App',
      'Feature Prioritization & Retention Metric Analysis Case Study',
      'User Onboarding Funnel Optimization & A/B Testing Strategy'
    ],
    relatedCareers: ['Business Analyst', 'UI/UX Designer', 'Scrum Master', 'Growth Manager'],
    marketDemand: 'High'
  },
  {
    id: 'qa-engineer',
    name: 'QA & Automation Engineer',
    category: 'Software Engineering',
    shortDescription: 'Ensure software quality, test reliability, and prevent defects with automated test suites.',
    fullDescription: 'QA Automation Engineers design automated test suites, execute performance and regression tests, and integrate automated verification directly into CI/CD pipelines to ensure flawless software releases.',
    iconName: 'CheckCircle2',
    coreResponsibilities: [
      'Write end-to-end automated UI tests using Cypress, Playwright, or Selenium',
      'Develop automated backend API integration test suites with Postman / REST Assured',
      'Design comprehensive test plans, edge cases, and test matrices from acceptance criteria',
      'Integrate test suites into CI/CD pipelines to block regressive deployments',
      'Log, track, and verify software defect resolutions in Jira'
    ],
    recommendedTools: ['Playwright / Cypress', 'JavaScript / TypeScript / Python', 'Postman', 'Git', 'Jira', 'GitHub Actions'],
    softSkills: ['Methodical Mindset', 'Attention to Edge Cases', 'Advocacy for Quality', 'Communication'],
    recommendedProjects: [
      'Automated E2E Test Suite for an E-commerce Store using Playwright & TypeScript',
      'Comprehensive REST API Automated Regression Suite in Postman with Newman CLI in CI/CD',
      'Performance and Load Testing Report for a Microservices Gateway using k6'
    ],
    relatedCareers: ['Backend Developer', 'Frontend Developer', 'DevOps Engineer', 'Software Developer'],
    marketDemand: 'Moderate'
  }
];

export const CAREER_SKILL_REQUIREMENTS: CareerSkillRequirement[] = [
  // -------------------------------------------------------------
  // Data Analyst Requirements
  // -------------------------------------------------------------
  {
    id: 'da-sql',
    careerId: 'data-analyst',
    skillId: 'sql',
    skillName: 'SQL',
    category: 'Data & Databases',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'SQL is the industry-standard language used to query, join, aggregate, and transform raw relational business records into clean analytical datasets.',
    workplaceApplications: ['Extracting transaction data', 'Aggregating revenue by region', 'Joining user & order tables', 'Automating daily reporting queries']
  },
  {
    id: 'da-excel',
    careerId: 'data-analyst',
    skillId: 'excel',
    skillName: 'Excel',
    category: 'Data & Analytics',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 15,
    whyNeeded: 'Excel is universally used across management teams for rapid data exploration, VLOOKUP/XLOOKUP modeling, pivot tables, and financial ad-hoc summaries.',
    workplaceApplications: ['Pivot tables for sales breakdown', 'XLOOKUP reconciliation', 'What-If scenario modeling', 'Quick stakeholder data review']
  },
  {
    id: 'da-powerbi',
    careerId: 'data-analyst',
    skillId: 'power-bi',
    skillName: 'Power BI',
    category: 'Data & Analytics',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 15,
    whyNeeded: 'Power BI allows analysts to transform tabular data into interactive, real-time executive dashboards with DAX measures and automated data refresh.',
    workplaceApplications: ['Executive KPI monitoring', 'Sales territory mapping', 'Financial trend reporting', 'Interactive customer retention views']
  },
  {
    id: 'da-statistics',
    careerId: 'data-analyst',
    skillId: 'statistics',
    skillName: 'Statistics',
    category: 'Data & Analytics',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 15,
    whyNeeded: 'Statistical knowledge prevents flawed interpretations by ensuring sound sampling, correlation analysis, standard deviation benchmarking, and hypothesis testing.',
    workplaceApplications: ['A/B test significance testing', 'Outlier detection', 'Confidence interval estimation', 'Correlation vs causation analysis']
  },
  {
    id: 'da-datacleaning',
    careerId: 'data-analyst',
    skillId: 'data-cleaning',
    skillName: 'Data Cleaning',
    category: 'Data & Analytics',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 10,
    whyNeeded: 'Real-world data is messy, incomplete, and noisy. Analysts spend over 60% of their time handling nulls, formatting dates, and standardizing schemas.',
    workplaceApplications: ['Deduplication of customer records', 'Handling missing transaction values', 'Parsing messy date formats', 'Data validation checks']
  },
  {
    id: 'da-python',
    careerId: 'data-analyst',
    skillId: 'python',
    skillName: 'Python',
    category: 'Programming',
    requiredLevel: 'Beginner',
    priority: 'High',
    weight: 10,
    whyNeeded: 'Python enables automation of repetitive reporting workflows, web scraping of competitive data, and advanced data processing beyond Excel limits.',
    workplaceApplications: ['Automating weekly email reports', 'Scraping external price data', 'Batch processing large CSV archives', 'Custom statistical scripts']
  },
  {
    id: 'da-pandas',
    careerId: 'data-analyst',
    skillId: 'pandas',
    skillName: 'Pandas',
    category: 'Data & Analytics',
    requiredLevel: 'Beginner',
    priority: 'Medium',
    weight: 5,
    whyNeeded: 'Pandas is Python\'s premier tabular manipulation library, providing high-performance DataFrames for grouping, filtering, and reshaping data.',
    workplaceApplications: ['DataFrame grouping and rolling averages', 'Merging multi-source CSV files', 'Reshaping wide datasets to long format']
  },
  {
    id: 'da-comm',
    careerId: 'data-analyst',
    skillId: 'communication',
    skillName: 'Communication & Data Storytelling',
    category: 'Soft Skills',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 10,
    whyNeeded: 'Insights are useless if executives cannot understand them. Analysts must translate numbers into clear business recommendations and visual stories.',
    workplaceApplications: ['Presenting quarterly insights to VP of Sales', 'Writing concise executive summaries', 'Leading stakeholder discovery meetings']
  },

  // -------------------------------------------------------------
  // Full Stack Developer Requirements
  // -------------------------------------------------------------
  {
    id: 'fs-react',
    careerId: 'full-stack-developer',
    skillId: 'react',
    skillName: 'React',
    category: 'Web Development',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'React is the standard frontend component library for building modern, responsive, high-performance single page web applications.',
    workplaceApplications: ['Building dynamic UI components', 'Managing complex client state', 'Connecting forms and user interactions to APIs']
  },
  {
    id: 'fs-typescript',
    careerId: 'full-stack-developer',
    skillId: 'typescript',
    skillName: 'TypeScript',
    category: 'Programming',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 15,
    whyNeeded: 'TypeScript eliminates whole classes of runtime bugs through static typing, improving code maintainability across large frontend and backend codebases.',
    workplaceApplications: ['Defining shared API contract interfaces', 'Ensuring type safety in data handling', 'Refactoring large codebases confidently']
  },
  {
    id: 'fs-nodejs',
    careerId: 'full-stack-developer',
    skillId: 'node-js',
    skillName: 'Node.js & Express',
    category: 'Web Development',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'Node.js powers fast, asynchronous backend servers and RESTful microservices using the same JavaScript/TypeScript ecosystem as the frontend.',
    workplaceApplications: ['Building RESTful endpoints', 'Implementing auth middleware with JWT', 'Interfacing with databases and external third-party APIs']
  },
  {
    id: 'fs-sql',
    careerId: 'full-stack-developer',
    skillId: 'sql',
    skillName: 'SQL & Relational Databases',
    category: 'Data & Databases',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 15,
    whyNeeded: 'Full stack engineers must design normalized database schemas, write efficient queries, handle transactions, and manage migrations.',
    workplaceApplications: ['PostgreSQL schema design', 'Query optimization with indexes', 'Database transaction rollback handling']
  },
  {
    id: 'fs-git',
    careerId: 'full-stack-developer',
    skillId: 'git',
    skillName: 'Git & GitHub',
    category: 'Development Tools',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 10,
    whyNeeded: 'Version control is mandatory for collaborating in professional engineering teams, resolving merge conflicts, and conducting peer code reviews.',
    workplaceApplications: ['Feature branching workflows', 'Pull request code reviews', 'Resolving merge conflicts', 'Tagging semantic release versions']
  },
  {
    id: 'fs-docker',
    careerId: 'full-stack-developer',
    skillId: 'docker',
    skillName: 'Docker',
    category: 'Development Tools',
    requiredLevel: 'Beginner',
    priority: 'Medium',
    weight: 10,
    whyNeeded: 'Docker containers ensure applications run consistently across local development environments, staging servers, and cloud production environments.',
    workplaceApplications: ['Containerizing full stack apps', 'Running multi-container setups with Docker Compose (app + Postgres + Redis)']
  },
  {
    id: 'fs-rest',
    careerId: 'full-stack-developer',
    skillId: 'rest-apis',
    skillName: 'REST APIs & Security',
    category: 'Web Development',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 10,
    whyNeeded: 'Designing robust API contracts, status codes, CORS headers, rate limiting, and input validation is critical for stable software.',
    workplaceApplications: ['Designing REST resources and endpoints', 'Validating payload schemas', 'Securing endpoints against injection & CSRF']
  },

  // -------------------------------------------------------------
  // AI / Machine Learning Engineer Requirements
  // -------------------------------------------------------------
  {
    id: 'ai-python',
    careerId: 'ai-engineer',
    skillId: 'python',
    skillName: 'Python (Advanced)',
    category: 'Programming',
    requiredLevel: 'Advanced',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'Python is the backbone of modern AI research and engineering, powering NumPy vectorization, PyTorch deep learning, and asynchronous model serving.',
    workplaceApplications: ['Building model architectures', 'Vectorized tensor operations', 'Asynchronous inference servers with FastAPI']
  },
  {
    id: 'ai-ml',
    careerId: 'ai-engineer',
    skillId: 'machine-learning',
    skillName: 'Machine Learning Fundamentals',
    category: 'AI / ML',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'Mastery of supervised/unsupervised learning, loss functions, gradient descent, overfitting regularization, and cross-validation is essential.',
    workplaceApplications: ['Selecting optimal model algorithms', 'Tuning hyperparameters', 'Preventing data leakage and overfitting']
  },
  {
    id: 'ai-pytorch',
    careerId: 'ai-engineer',
    skillId: 'pytorch',
    skillName: 'PyTorch / Deep Learning',
    category: 'AI / ML',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'PyTorch is the premier deep learning framework used across industry and research to build custom neural networks, Transformers, and vision models.',
    workplaceApplications: ['Custom training loops & loss functions', 'Fine-tuning pre-trained Transformer models', 'Exporting models to ONNX for production']
  },
  {
    id: 'ai-nlp',
    careerId: 'ai-engineer',
    skillId: 'nlp',
    skillName: 'NLP & Large Language Models',
    category: 'AI / ML',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 15,
    whyNeeded: 'LLMs, embeddings, RAG pipelines, and prompt engineering represent the fastest-growing category of modern AI applications.',
    workplaceApplications: ['Building RAG pipelines with vector databases', 'Prompt engineering & output structured parsing', 'Fine-tuning domain models']
  },
  {
    id: 'ai-docker',
    careerId: 'ai-engineer',
    skillId: 'docker',
    skillName: 'Docker & Model Deployment',
    category: 'Development Tools',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 15,
    whyNeeded: 'Models must be containerized and served via fast REST/gRPC endpoints with GPU acceleration and resource isolation.',
    workplaceApplications: ['Deploying PyTorch models with FastAPI in Docker', 'Managing CUDA driver dependencies in containers']
  },
  {
    id: 'ai-stats',
    careerId: 'ai-engineer',
    skillId: 'statistics',
    skillName: 'Probability & Linear Algebra',
    category: 'Data & Analytics',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 10,
    whyNeeded: 'Understanding matrix multiplications, eigenvalues, probability distributions, and calculus allows debugging why models fail or diverge.',
    workplaceApplications: ['Understanding attention matrix operations', 'Interpreting model uncertainty and loss landscapes']
  },

  // -------------------------------------------------------------
  // Cybersecurity Analyst Requirements
  // -------------------------------------------------------------
  {
    id: 'sec-net',
    careerId: 'cybersecurity-analyst',
    skillId: 'networking',
    skillName: 'Computer Networking (TCP/IP, DNS, OSI)',
    category: 'Cybersecurity',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 25,
    whyNeeded: 'You cannot defend what you do not understand. Deep knowledge of packets, ports, routing, subnets, and protocols is essential for investigating intrusions.',
    workplaceApplications: ['Analyzing packet captures in Wireshark', 'Configuring firewall ACLs and IDS rules', 'Detecting ARP spoofing and DNS tunneling']
  },
  {
    id: 'sec-fund',
    careerId: 'cybersecurity-analyst',
    skillId: 'cybersecurity-fundamentals',
    skillName: 'Cybersecurity Fundamentals & Threat Modeling',
    category: 'Cybersecurity',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'Understanding the CIA triad, threat vectors (phishing, ransomware, SQLi, XSS), MITRE ATT&CK framework, and defence-in-depth is core.',
    workplaceApplications: ['Mapping attack indicators to MITRE ATT&CK', 'Conducting vulnerability assessments', 'Implementing principle of least privilege']
  },
  {
    id: 'sec-linux',
    careerId: 'cybersecurity-analyst',
    skillId: 'linux',
    skillName: 'Linux & Command Line',
    category: 'Development Tools',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 20,
    whyNeeded: 'Most servers and security appliances run Linux. Analysts must navigate file systems, inspect auth logs, analyze process trees, and write bash scripts.',
    workplaceApplications: ['Inspecting /var/log/auth.log for brute force', 'Managing file permissions and sudoers', 'Automating log searches with grep/awk/sed']
  },
  {
    id: 'sec-siem',
    careerId: 'cybersecurity-analyst',
    skillId: 'siem',
    skillName: 'SIEM & Log Analysis (Splunk/Elastic)',
    category: 'Cybersecurity',
    requiredLevel: 'Intermediate',
    priority: 'Critical',
    weight: 20,
    whyNeeded: 'SIEM platforms centralize billions of security logs. Analysts query alerts, correlate events, and detect active security breaches in real-time.',
    workplaceApplications: ['Querying correlated authentication failures', 'Building threat hunting dashboards', 'Configuring automated incident alert triggers']
  },
  {
    id: 'sec-comm',
    careerId: 'cybersecurity-analyst',
    skillId: 'communication',
    skillName: 'Incident Reporting & Communication',
    category: 'Soft Skills',
    requiredLevel: 'Intermediate',
    priority: 'High',
    weight: 15,
    whyNeeded: 'Security analysts must write clear, objective incident reports for executives, legal teams, and system administrators during critical breaches.',
    workplaceApplications: ['Drafting post-incident root cause reports', 'Coordinating with sysadmins during live malware containment']
  }
];

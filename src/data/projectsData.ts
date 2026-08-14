import { ProjectTemplate } from '../types';

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'proj-ecommerce-sql',
    skillIds: ['sql', 'data-cleaning'],
    careerId: 'data-analyst',
    title: 'E-commerce Revenue & Retention SQL Analysis',
    difficulty: 'Beginner → Intermediate',
    estimatedTime: '4 – 6 Hours',
    overview: 'Design a suite of production-grade SQL scripts to analyze an online retail database containing 50,000+ orders. Uncover seasonal revenue patterns, calculate repeat purchase rates, and identify top spending customer cohorts.',
    requirements: [
      'Write queries calculating Total Revenue, Total Orders, and Average Order Value (AOV) by Month',
      'Identify top 5 selling product categories and their profit contribution percentages',
      'Compute customer retention cohorts by tracking monthly repeat purchases with CTEs and window functions',
      'Handle NULL values, format date outputs, and document query execution assumptions in a README'
    ],
    skillsDemonstrated: ['Complex SELECT queries', 'GROUP BY & Aggregations', 'Multi-table INNER and LEFT JOINs', 'Common Table Expressions (CTEs)', 'Window Functions (LAG, RANK)'],
    deliverables: ['SQL Queries File (.sql)', 'Executive Summary Findings Report (Markdown/PDF)', 'GitHub Repository Link'],
    sampleDatasetUrl: 'https://raw.githubusercontent.com/datasets/ecommerce-transactions/master/data.csv'
  },
  {
    id: 'proj-powerbi-sales',
    skillIds: ['power-bi', 'sql', 'data-visualization'],
    careerId: 'data-analyst',
    title: 'Executive Sales & Profitability Power BI Dashboard',
    difficulty: 'Intermediate',
    estimatedTime: '6 – 8 Hours',
    overview: 'Transform multi-source retail CSVs into an interactive, published Power BI executive report. Implement a clean star schema, write custom DAX time-intelligence measures, and design responsive drill-through visuals.',
    requirements: [
      'Build a Star Schema with 1 Fact table (Sales) and 4 Dimension tables (Customer, Product, Region, Date)',
      'Create 8+ DAX Measures including Total Sales, YoY Sales Growth %, and 30-Day Moving Average',
      'Implement interactive slicers, drill-through page for regional breakdown, and custom KPI cards',
      'Maintain an accessible high-contrast design palette with clear typographic hierarchy'
    ],
    skillsDemonstrated: ['Power Query ETL', 'Dimensional Data Modeling', 'DAX Formulas & CALCULATE', 'Interactive UI Design in Power BI'],
    deliverables: ['Power BI File (.pbix)', 'Dashboard Screenshots / Live Web Link', 'GitHub Repository']
  },
  {
    id: 'proj-multi-retail-analytics',
    skillIds: ['sql', 'power-bi', 'data-cleaning', 'statistics'],
    careerId: 'data-analyst',
    title: 'End-to-End Retail Intelligence & Customer Churn Suite',
    difficulty: 'Intermediate → Advanced',
    estimatedTime: '10 – 14 Hours',
    overview: 'A complete multi-skill capstone project covering the entire analyst pipeline: cleaning raw CSV data in Python, loading into PostgreSQL, running statistical cohort queries, and presenting insights in an interactive Power BI dashboard.',
    requirements: [
      'Cleanse messy transaction logs and engineer RFM (Recency, Frequency, Monetary) metrics',
      'Execute statistical hypothesis test comparing churn rates between promotional discount users and organic users',
      'Deploy an executive Power BI dashboard displaying RFM customer segmentation',
      'Record a 3-minute video presentation walking through actionable business recommendations'
    ],
    skillsDemonstrated: ['Python Data Cleaning', 'SQL Cohort Analysis', 'A/B & Hypothesis Statistics', 'Power BI Dashboarding', 'Executive Presentation'],
    deliverables: ['GitHub Repository with Python Notebook and SQL Scripts', 'Power BI Dashboard', 'Executive Presentation Deck']
  },
  {
    id: 'proj-fullstack-kanban',
    skillIds: ['react', 'typescript', 'node-js', 'sql', 'git'],
    careerId: 'full-stack-developer',
    title: 'Collaborative Project Management Kanban Board',
    difficulty: 'Intermediate',
    estimatedTime: '12 – 16 Hours',
    overview: 'Build an end-to-end full-stack web application featuring drag-and-drop task boards, JWT authentication, PostgreSQL relational persistence, and RESTful CRUD endpoints.',
    requirements: [
      'Frontend built with React, TypeScript, Tailwind CSS, and drag-and-drop support',
      'Backend REST API with Node.js, Express, and PostgreSQL relational database',
      'JWT Authentication with password hashing and role-based permissions',
      'Automated GitHub Actions CI pipeline and deployment on Vercel/Render'
    ],
    skillsDemonstrated: ['React & Custom Hooks', 'TypeScript Type Safety', 'Node.js & Express REST APIs', 'PostgreSQL Schema & Foreign Keys', 'Git & CI/CD'],
    deliverables: ['GitHub Repo (Frontend + Backend)', 'Live Deployed Web Application URL']
  }
];

import { LearningTopic, LearningScheduleWeek } from '../types';

export interface SkillLearningDetail {
  skillId: string;
  skillName: string;
  defaultTimeWeeks: number;
  whatIsThis: string;
  whyNeededByCareer: Record<string, {
    whyNeeded: string;
    useCases: string[];
    topicsOverride?: LearningTopic[];
  }>;
  generalWhyNeeded: string;
  generalUseCases: string[];
  stages: LearningTopic[];
  schedulesByHours: Record<string, LearningScheduleWeek[]>; // '30m', '1h', '2h'
}

export const SKILL_LEARNING_DETAILS: Record<string, SkillLearningDetail> = {
  sql: {
    skillId: 'sql',
    skillName: 'SQL',
    defaultTimeWeeks: 3,
    whatIsThis: 'SQL (Structured Query Language) is the universally adopted standard language used to interact with, query, filter, join, and manipulate relational databases.',
    whyNeededByCareer: {
      'data-analyst': {
        whyNeeded: 'For a Data Analyst, SQL is the foundation of day-to-day work. Over 90% of business transaction data resides in relational databases like PostgreSQL, MySQL, Snowflake, and BigQuery. You need SQL to extract raw data, join customer records with sales metrics, aggregate KPIs, and prepare data feeds for Power BI or Tableau dashboards.',
        useCases: [
          'Monthly & Quarterly Sales Revenue aggregation',
          'Customer churn cohort calculations and retention tracking',
          'Joining multi-table transactional schemas (Orders, Products, Customers)',
          'Building automated recurring views for executive dashboards'
        ]
      },
      'full-stack-developer': {
        whyNeeded: 'Full Stack Developers use SQL to design normalized database schemas, write efficient backend repository queries, handle ACID transactions safely, and optimize indexed queries to keep API response times under 50ms.',
        useCases: [
          'Writing parameterized backend repository queries in Node.js / PostgreSQL',
          'Designing schema migrations and foreign key constraints',
          'Preventing SQL injection attacks through prepared statements',
          'Database transaction rollback on failed payment checkouts'
        ]
      }
    },
    generalWhyNeeded: 'SQL is essential for storing, querying, and managing structured data across modern software applications and analytical workflows.',
    generalUseCases: ['Extracting and filtering data', 'Aggregating metrics across dimensions', 'Joining related datasets'],
    stages: [
      {
        id: 'sql-s1',
        stageNumber: 1,
        stageTitle: 'Stage 1 – SQL Foundations & Data Retrieval',
        topics: [
          'Relational database concepts (Tables, Rows, Columns, Primary Keys)',
          'SELECT and FROM fundamentals',
          'DISTINCT and column aliasing with AS',
          'LIMIT, TOP, and OFFSET pagination',
          'ORDER BY sorting (ASC, DESC, multi-column)'
        ]
      },
      {
        id: 'sql-s2',
        stageNumber: 2,
        stageTitle: 'Stage 2 – Precise Filtering & Conditional Logic',
        topics: [
          'WHERE clause with comparison operators (=, !=, <, >)',
          'Logical operators: AND, OR, NOT',
          'Pattern matching with LIKE, ILIKE, and wildcards (% and _)',
          'Set inclusion with IN and NOT IN',
          'Range filtering with BETWEEN and checking NULL values (IS NULL)'
        ]
      },
      {
        id: 'sql-s3',
        stageNumber: 3,
        stageTitle: 'Stage 3 – Aggregations & Grouping Metrics',
        topics: [
          'Aggregate functions: COUNT(), SUM(), AVG(), MIN(), MAX()',
          'GROUP BY clause for dimensional rollups',
          'HAVING clause for post-aggregation filtering vs WHERE',
          'Handling NULLs in aggregate calculations (COALESCE)'
        ]
      },
      {
        id: 'sql-s4',
        stageNumber: 4,
        stageTitle: 'Stage 4 – Multi-Table Relational JOINs',
        topics: [
          'Relational integrity and Foreign Key relationships',
          'INNER JOIN (matching rows only)',
          'LEFT JOIN (handling unmatched left-side records)',
          'RIGHT JOIN and FULL OUTER JOIN',
          'Self JOINs and CROSS JOINs'
        ]
      },
      {
        id: 'sql-s5',
        stageNumber: 5,
        stageTitle: 'Stage 5 – Advanced Queries, Subqueries & CTEs',
        topics: [
          'Scalar and correlated subqueries in WHERE and SELECT',
          'Common Table Expressions (WITH clauses) for readable modular queries',
          'CASE WHEN conditional statements for column transformations',
          'Basic Window Functions (ROW_NUMBER, RANK, DENSE_RANK, OVER PARTITION BY)'
        ]
      },
      {
        id: 'sql-s6',
        stageNumber: 6,
        stageTitle: 'Stage 6 – Real-World Hands-on Practice',
        topics: [
          'Analyze an e-commerce transactional database with 50,000+ orders',
          'Identify top 10% repeat customers and calculate average order value (AOV)',
          'Track month-over-month revenue growth using CTEs'
        ]
      },
      {
        id: 'sql-s7',
        stageNumber: 7,
        stageTitle: 'Stage 7 – Capstone Project & Skill Assessment',
        topics: [
          'Build end-to-end SQL reporting suite for an online retail business',
          'Submit GitHub repository with queries and business findings write-up',
          'Complete verified SQL Skill Assessment to earn credentials'
        ]
      }
    ],
    schedulesByHours: {
      '1h': [
        {
          weekNumber: 1,
          theme: 'SQL Foundations & Filtering',
          topics: ['Relational Concepts', 'SELECT, FROM, DISTINCT', 'WHERE, AND, OR', 'IN, BETWEEN, LIKE', 'ORDER BY & LIMIT'],
          estimatedHours: 7,
          suggestedTasks: ['Complete SQLBolt lessons 1-8', 'Solve 10 HackerRank Basic Select problems']
        },
        {
          weekNumber: 2,
          theme: 'Aggregations & Table JOINs',
          topics: ['COUNT, SUM, AVG, MIN, MAX', 'GROUP BY & HAVING', 'INNER JOIN & LEFT JOIN', 'Multi-table queries'],
          estimatedHours: 7,
          suggestedTasks: ['Complete SQLBolt JOIN exercises', 'Perform customer sales breakdown queries']
        },
        {
          weekNumber: 3,
          theme: 'Advanced CTEs, Window Functions & Project',
          topics: ['Common Table Expressions (WITH)', 'CASE WHEN logic', 'ROW_NUMBER & RANK', 'E-commerce Capstone Project'],
          estimatedHours: 7,
          suggestedTasks: ['Build E-commerce Sales Analysis queries', 'Take CareerBridge Verified SQL Assessment']
        }
      ],
      '30m': [
        {
          weekNumber: 1,
          theme: 'Basic Data Retrieval',
          topics: ['SELECT, FROM, DISTINCT, ORDER BY, LIMIT'],
          estimatedHours: 3.5,
          suggestedTasks: ['SQLBolt lessons 1-5']
        },
        {
          weekNumber: 2,
          theme: 'Filtering & Operators',
          topics: ['WHERE, AND, OR, IN, LIKE, IS NULL'],
          estimatedHours: 3.5,
          suggestedTasks: ['SQLBolt lessons 6-8']
        },
        {
          weekNumber: 3,
          theme: 'Aggregations',
          topics: ['COUNT, SUM, AVG, GROUP BY, HAVING'],
          estimatedHours: 3.5,
          suggestedTasks: ['SQLBolt lessons 9-12']
        },
        {
          weekNumber: 4,
          theme: 'JOINs & Relational Data',
          topics: ['INNER JOIN, LEFT JOIN, Foreign Keys'],
          estimatedHours: 3.5,
          suggestedTasks: ['SQLBolt lessons 13-16']
        },
        {
          weekNumber: 5,
          theme: 'CTEs & Capstone Project',
          topics: ['WITH CTEs, CASE statements, Capstone Project'],
          estimatedHours: 3.5,
          suggestedTasks: ['Submit Capstone Project and take Assessment']
        }
      ],
      '2h': [
        {
          weekNumber: 1,
          theme: 'Rapid Foundations to Advanced JOINs',
          topics: ['SELECT, WHERE, Aggregations, GROUP BY, HAVING, INNER/LEFT/FULL JOINs'],
          estimatedHours: 14,
          suggestedTasks: ['Complete entire SQLBolt interactive curriculum', 'Solve 20 intermediate LeetCode/HackerRank SQL problems']
        },
        {
          weekNumber: 2,
          theme: 'Advanced CTEs, Window Functions & Capstone',
          topics: ['CTEs, Window Functions (OVER, PARTITION BY), E-commerce Analysis Project, Verification Assessment'],
          estimatedHours: 14,
          suggestedTasks: ['Build and push Capstone project to GitHub', 'Take Verified Skill Assessment']
        }
      ]
    }
  },

  'power-bi': {
    skillId: 'power-bi',
    skillName: 'Power BI',
    defaultTimeWeeks: 3,
    whatIsThis: 'Power BI is Microsoft\'s industry-leading business intelligence and data visualization platform that connects disparate data sources into coherent, interactive executive dashboards.',
    whyNeededByCareer: {
      'data-analyst': {
        whyNeeded: 'Power BI allows Data Analysts to present data visually so decision-makers can monitor company health in real time without writing code. You will build automated dashboards, calculate custom business metrics using DAX, and model star schemas.',
        useCases: [
          'Creating Executive C-Suite KPI summary scorecards',
          'Interactive geographical sales territory mapping',
          'Customer churn and cohort retention dashboards',
          'Automated data ingestion with Power Query ETL'
        ]
      },
      'business-analyst': {
        whyNeeded: 'Business Analysts use Power BI to monitor operational workflows, track agile sprint velocity, model financial forecasting scenarios, and visually demonstrate bottlenecks to department heads.',
        useCases: [
          'Departmental budget vs actual expense tracking',
          'Supply chain delivery bottleneck heatmaps',
          'User onboarding funnel conversion dashboards'
        ]
      }
    },
    generalWhyNeeded: 'Power BI translates complex datasets into clear visual dashboards, enabling teams to make rapid data-driven business decisions.',
    generalUseCases: ['Interactive dashboards', 'Automated ETL transformations with Power Query', 'DAX KPI calculations'],
    stages: [
      {
        id: 'pbi-s1',
        stageNumber: 1,
        stageTitle: 'Stage 1 – Power BI Desktop & Data Ingestion',
        topics: [
          'Power BI Architecture and Desktop Interface',
          'Connecting to data sources (Excel, CSV, SQL databases)',
          'Power Query Editor: Transformations, cleaning, and unpivoting columns',
          'Data types, replacing values, and removing duplicates'
        ]
      },
      {
        id: 'pbi-s2',
        stageNumber: 2,
        stageTitle: 'Stage 2 – Data Modeling & Relationships',
        topics: [
          'Star Schema vs Snowflake Schema concepts',
          'Fact tables vs Dimension tables',
          'Configuring 1-to-Many relationships and cross-filter direction',
          'Creating Date/Calendar tables'
        ]
      },
      {
        id: 'pbi-s3',
        stageNumber: 3,
        stageTitle: 'Stage 3 – DAX (Data Analysis Expressions) Core',
        topics: [
          'Calculated Columns vs DAX Measures (and when to use each)',
          'Essential DAX functions: SUM, COUNTROWS, DISTINCTCOUNT, DIVIDE',
          'CALCULATE function and filter context modification',
          'Time Intelligence DAX: YTD, MTD, SamePeriodLastYear'
        ]
      },
      {
        id: 'pbi-s4',
        stageNumber: 4,
        stageTitle: 'Stage 4 – Visualization Design & Interactivity',
        topics: [
          'Choosing the right chart (Bar, Line, Donut, Matrix, Scatter)',
          'Visual formatting, custom color palettes, and accessible typography',
          'Interactive slicers, drill-through pages, and bookmarks',
          'Tooltip pages and custom KPI card indicators'
        ]
      },
      {
        id: 'pbi-s5',
        stageNumber: 5,
        stageTitle: 'Stage 5 – Capstone Dashboard & Assessment',
        topics: [
          'End-to-end Executive Sales & Profitability Dashboard',
          'Publishing and report optimization',
          'Verified Power BI Skill Assessment'
        ]
      }
    ],
    schedulesByHours: {
      '1h': [
        {
          weekNumber: 1,
          theme: 'Data Ingestion & Power Query',
          topics: ['Desktop setup', 'Connecting CSV/SQL', 'Power Query cleaning and unpivoting', 'Building first simple visual charts'],
          estimatedHours: 7,
          suggestedTasks: ['Complete Microsoft Learn Power BI Module 1 & 2', 'Clean dirty sales dataset in Power Query']
        },
        {
          weekNumber: 2,
          theme: 'Data Modeling & DAX Measures',
          topics: ['Star schema design', 'Date tables', 'Basic DAX (SUM, DIVIDE)', 'CALCULATE & Time Intelligence'],
          estimatedHours: 7,
          suggestedTasks: ['Build 10 core DAX measures', 'Configure star schema with 3 dimension tables']
        },
        {
          weekNumber: 3,
          theme: 'Interactive Dashboard & Certification',
          topics: ['Drill-through & bookmarks', 'Executive layout design', 'Capstone Dashboard', 'Skill Assessment'],
          estimatedHours: 7,
          suggestedTasks: ['Publish Sales Dashboard to GitHub/Portfolio', 'Take CareerBridge Verified Power BI Assessment']
        }
      ]
    }
  },

  statistics: {
    skillId: 'statistics',
    skillName: 'Statistics & Probability',
    defaultTimeWeeks: 3,
    whatIsThis: 'Statistics is the mathematical discipline concerned with collecting, analyzing, interpreting, and presenting empirical numerical data to make reliable inferences.',
    whyNeededByCareer: {
      'data-analyst': {
        whyNeeded: 'Statistics protects Data Analysts from drawing false conclusions. When analyzing whether a new website layout increased purchases or if sales dipped randomly, statistical hypothesis testing (A/B testing) and standard deviation prevent costly business blunders.',
        useCases: [
          'A/B testing marketing campaign conversion rates with p-values',
          'Detecting fraudulent transactions via standard score (Z-score) outliers',
          'Calculating confidence intervals for survey response accuracy',
          'Regression modeling to forecast sales based on advertising spend'
        ]
      },
      'data-scientist': {
        whyNeeded: 'Data Scientists need deep statistics for probability distributions, loss function minimization, feature selection, Bayesian inference, and model evaluation metrics.',
        useCases: [
          'Bayesian probability modeling for risk estimation',
          'Hypothesis testing in experimental feature rollouts',
          'Multicollinearity detection and variance inflation factors (VIF)'
        ]
      }
    },
    generalWhyNeeded: 'Statistics provides the mathematical framework to validate patterns and quantify certainty in data.',
    generalUseCases: ['Hypothesis testing', 'A/B experimentation', 'Outlier detection', 'Correlation & regression'],
    stages: [
      {
        id: 'stat-s1',
        stageNumber: 1,
        stageTitle: 'Stage 1 – Descriptive Statistics & Summaries',
        topics: [
          'Measures of central tendency: Mean, Median, Mode (and when mean misleads)',
          'Measures of dispersion: Range, Variance, Standard Deviation, IQR',
          'Skewness, Kurtosis, and Normal Distribution (68-95-99.7 Rule)',
          'Z-scores and identifying statistical outliers'
        ]
      },
      {
        id: 'stat-s2',
        stageNumber: 2,
        stageTitle: 'Stage 2 – Probability & Sampling Theory',
        topics: [
          'Probability rules (Addition, Multiplication, Conditional Probability)',
          'Bayes\' Theorem fundamentals',
          'Probability distributions (Binomial, Poisson, Normal, Uniform)',
          'Central Limit Theorem and sampling distributions'
        ]
      },
      {
        id: 'stat-s3',
        stageNumber: 3,
        stageTitle: 'Stage 3 – Inferential Statistics & Hypothesis Testing',
        topics: [
          'Null Hypothesis ($H_0$) vs Alternative Hypothesis ($H_1$)',
          'Type I errors (False Positive) and Type II errors (False Negative)',
          'p-values and significance levels (alpha = 0.05)',
          'Z-test, One-Sample and Two-Sample t-tests, and Chi-Square tests'
        ]
      },
      {
        id: 'stat-s4',
        stageNumber: 4,
        stageTitle: 'Stage 4 – Correlation, Regression & A/B Testing in Practice',
        topics: [
          'Pearson and Spearman correlation coefficients (Correlation != Causation)',
          'Simple and Multiple Linear Regression fundamentals ($R^2$, residuals)',
          'Designing and evaluating an industry A/B test experiment',
          'Practical case studies and Verified Skill Assessment'
        ]
      }
    ],
    schedulesByHours: {
      '1h': [
        {
          weekNumber: 1,
          theme: 'Descriptive Statistics & Outliers',
          topics: ['Mean, Median, Mode', 'Variance & Standard Deviation', 'Normal Distribution & Z-scores'],
          estimatedHours: 7,
          suggestedTasks: ['Analyze distribution of customer purchase amounts in Excel/Python', 'Calculate Z-scores to flag anomaly transactions']
        },
        {
          weekNumber: 2,
          theme: 'Probability & Sampling',
          topics: ['Probability Rules', 'Bayes Theorem', 'Central Limit Theorem', 'Confidence Intervals'],
          estimatedHours: 7,
          suggestedTasks: ['Simulate Central Limit Theorem with dice rolls/Python', 'Calculate 95% confidence intervals on survey data']
        },
        {
          weekNumber: 3,
          theme: 'Hypothesis Testing & A/B Tests',
          topics: ['Null Hypothesis', 'p-values & t-tests', 'A/B Test Design', 'Linear Regression Basics', 'Skill Assessment'],
          estimatedHours: 7,
          suggestedTasks: ['Evaluate real-world A/B test dataset', 'Complete CareerBridge Statistics Skill Assessment']
        }
      ]
    }
  },

  python: {
    skillId: 'python',
    skillName: 'Python',
    defaultTimeWeeks: 4,
    whatIsThis: 'Python is a high-level, human-readable programming language with an enormous ecosystem of libraries for data processing, web backends, and machine learning.',
    whyNeededByCareer: {
      'data-analyst': {
        whyNeeded: 'For Data Analysts, Python takes you beyond the row limits of spreadsheets. With Python, you can automate repetitive weekly report generations, scrape product pricing from web pages, clean dirty CSV files with Pandas, and create customized statistical visualizations.',
        useCases: [
          'Automating daily data ETL scripts and email reports',
          'Cleaning multi-million row datasets with Pandas',
          'Web scraping market competitor data with BeautifulSoup',
          'Custom exploratory data visualisations with Seaborn & Matplotlib'
        ]
      },
      'ai-engineer': {
        whyNeeded: 'For AI Engineers, Python is non-negotiable. It is the language of PyTorch, TensorFlow, Hugging Face, NumPy vectorization, and model serving microservices.',
        useCases: [
          'Training deep neural networks in PyTorch',
          'Building vector search and LLM pipelines with LangChain',
          'Serving low-latency inference REST APIs with FastAPI'
        ]
      }
    },
    generalWhyNeeded: 'Python is the leading language for data manipulation, automation, backend development, and artificial intelligence.',
    generalUseCases: ['Data analysis and visualization', 'Automation scripts', 'Backend APIs', 'Machine learning modeling'],
    stages: [
      {
        id: 'py-s1',
        stageNumber: 1,
        stageTitle: 'Stage 1 – Python Core Syntax & Data Structures',
        topics: [
          'Variables, basic data types (int, float, str, bool)',
          'Conditionals (if, elif, else) and loops (for, while)',
          'Core data structures: Lists, Tuples, Dictionaries, Sets',
          'List comprehensions and dictionary manipulation'
        ]
      },
      {
        id: 'py-s2',
        stageNumber: 2,
        stageTitle: 'Stage 2 – Functions, Modules & Error Handling',
        topics: [
          'Function definitions, arguments (*args, **kwargs), return values',
          'Lambda anonymous functions, map, and filter',
          'File I/O (reading and writing text and CSV files)',
          'Exception handling (try, except, finally)'
        ]
      },
      {
        id: 'py-s3',
        stageNumber: 3,
        stageTitle: 'Stage 3 – Data Analysis with NumPy & Pandas',
        topics: [
          'NumPy ndarrays, vectorization, and mathematical operations',
          'Pandas Series and DataFrames fundamentals',
          'Reading CSVs, indexing, filtering, and column transformations',
          'Handling missing values, duplicates, and groupby operations'
        ]
      },
      {
        id: 'py-s4',
        stageNumber: 4,
        stageTitle: 'Stage 4 – Visualization & Capstone Project',
        topics: [
          'Plotting with Matplotlib and Seaborn (histograms, scatter, boxplots)',
          'End-to-end Exploratory Data Analysis (EDA) project',
          'Verified Python Skill Assessment'
        ]
      }
    ],
    schedulesByHours: {
      '1h': [
        {
          weekNumber: 1,
          theme: 'Python Syntax & Data Structures',
          topics: ['Data types', 'Conditionals', 'Loops', 'Lists & Dictionaries'],
          estimatedHours: 7,
          suggestedTasks: ['Complete Kaggle Python course lessons 1-4', 'Solve 10 HackerRank Python exercises']
        },
        {
          weekNumber: 2,
          theme: 'Functions, File Handling & Modules',
          topics: ['Functions', 'Lambda & List Comprehensions', 'Reading/Writing CSVs', 'Error Handling'],
          estimatedHours: 7,
          suggestedTasks: ['Write a script that parses and summarizes a local CSV file']
        },
        {
          weekNumber: 3,
          theme: 'NumPy & Pandas Data Manipulation',
          topics: ['NumPy arrays', 'Pandas DataFrames', 'Filtering & Grouping', 'Data Cleaning'],
          estimatedHours: 7,
          suggestedTasks: ['Clean and aggregate an open Kaggle dataset with Pandas']
        },
        {
          weekNumber: 4,
          theme: 'Data Visualization & Assessment',
          topics: ['Matplotlib & Seaborn', 'EDA Capstone Project', 'Verified Python Assessment'],
          estimatedHours: 7,
          suggestedTasks: ['Publish Jupyter notebook to GitHub', 'Take CareerBridge Verified Python Assessment']
        }
      ]
    }
  },

  react: {
    skillId: 'react',
    skillName: 'React',
    defaultTimeWeeks: 4,
    whatIsThis: 'React is the world\'s most widely adopted declarative, component-based JavaScript frontend library developed by Meta for building dynamic user interfaces.',
    whyNeededByCareer: {
      'full-stack-developer': {
        whyNeeded: 'Full Stack Developers use React to construct responsive, stateful web frontends that integrate smoothly with backend REST/GraphQL APIs and deliver seamless user experiences.',
        useCases: [
          'Building component libraries and design system primitives',
          'Managing interactive application state across views',
          'Optimizing web rendering performance and re-render cycles'
        ]
      },
      'frontend-developer': {
        whyNeeded: 'Frontend Developers specialize in React to create accessible, responsive, interactive single-page applications with smooth micro-animations and seamless API synchronization.',
        useCases: [
          'Complex form handling and client-side validation',
          'Dynamic charting dashboards and kanban boards',
          'Responsive navigation and mobile-first layouts'
        ]
      }
    },
    generalWhyNeeded: 'React is the industry benchmark for creating modular, reusable, and testable frontend web interfaces.',
    generalUseCases: ['Single page web applications', 'Interactive dashboards', 'Reusable component libraries'],
    stages: [
      {
        id: 'react-s1',
        stageNumber: 1,
        stageTitle: 'Stage 1 – React Core & JSX',
        topics: ['JSX syntax rules', 'Functional components', 'Props and unidirectional data flow', 'Conditional rendering and rendering lists with keys']
      },
      {
        id: 'react-s2',
        stageNumber: 2,
        stageTitle: 'Stage 2 – Hooks & State Management',
        topics: ['useState for local state', 'useEffect for side effects and data fetching', 'Custom hooks for reusable logic', 'useRef and uncontrolled inputs']
      },
      {
        id: 'react-s3',
        stageNumber: 3,
        stageTitle: 'Stage 3 – Global State & Routing',
        topics: ['Context API and useReducer', 'React Router navigation and route parameters', 'Form handling with react-hook-form', 'Error boundaries']
      },
      {
        id: 'react-s4',
        stageNumber: 4,
        stageTitle: 'Stage 4 – Performance & Capstone Project',
        topics: ['useMemo, useCallback, and React.memo', 'Building an interactive SaaS Dashboard project', 'Verified React Skill Assessment']
      }
    ],
    schedulesByHours: {
      '1h': [
        {
          weekNumber: 1,
          theme: 'React Basics & JSX',
          topics: ['Components', 'Props', 'JSX', 'Event Handling'],
          estimatedHours: 7,
          suggestedTasks: ['Build interactive counter, todo list, and theme toggler']
        },
        {
          weekNumber: 2,
          theme: 'Hooks & API Integration',
          topics: ['useState', 'useEffect', 'Fetch data from REST API', 'Loading & error states'],
          estimatedHours: 7,
          suggestedTasks: ['Build a movie search app consuming public API']
        },
        {
          weekNumber: 3,
          theme: 'Context & Routing',
          topics: ['React Context', 'React Router', 'Protected routes', 'Forms'],
          estimatedHours: 7,
          suggestedTasks: ['Build multi-page e-commerce cart prototype']
        },
        {
          weekNumber: 4,
          theme: 'Capstone Project & Assessment',
          topics: ['Optimization', 'Deployment on Vercel', 'Verified Assessment'],
          estimatedHours: 7,
          suggestedTasks: ['Deploy Capstone to GitHub & Vercel', 'Take CareerBridge React Assessment']
        }
      ]
    }
  }
};

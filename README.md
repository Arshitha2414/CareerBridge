# CareerBridge AI

CareerBridge AI is a personalized career readiness and skill gap analysis platform designed to help students understand their current skills, identify missing skills for their target career, and follow a structured path towards becoming job ready.

The platform connects career discovery, skill gap analysis, personalized learning, practice, assessments, projects, career roadmaps, resume preparation, job recommendations and progress tracking within a single application.

## Problem Statement

Students preparing for careers often use different platforms to learn about job roles, required skills, courses, certifications, projects and job opportunities.

Although a large amount of information is available, students may still find it difficult to understand:

- What skills they currently have
- What skills are missing for their target career
- Which skills should be improved first
- What they should learn next
- How ready they are for a particular career

CareerBridge AI addresses this problem by providing a structured and personalized career preparation workflow.

## Core Workflow

Career Goal  
↓  
Student Profile & Existing Skills  
↓  
Career Readiness Analysis  
↓  
Skill Gap Identification  
↓  
Personalized Learning  
↓  
Practice & Projects  
↓  
Skill Assessment & Verification  
↓  
Career Roadmap  
↓  
Resume Preparation  
↓  
Job Recommendations  
↓  
Job Readiness

## Key Features

### Guided Onboarding
Collects academic details, career goals, existing skills, proficiency levels, projects, experience, interests and learning preferences.

### Career Discovery
Helps students explore suitable career options when they are unsure about their target career.

### Career Readiness Score
Calculates a readiness score using multiple factors such as technical skills, tools, projects, assessments, experience and soft skills.

### Skill Gap Analyzer
Compares the student's existing skills with the requirements of the selected career and classifies them as:

- Have
- Needs Improvement
- Missing

### Missing Skill Guidance
Provides structured guidance for missing skills, including what the skill is, why it is required, topics to learn, learning resources, practice activities and project suggestions.

### Learning Center
Provides organized learning resources and supports structured learning based on the student's career requirements.

### Practice and Projects
Allows students to strengthen their skills through practice activities and project-based learning.

### Skill Assessments
Provides assessments to evaluate skill understanding and supports skill verification and readiness updates.

### Personalized Career Roadmap
Creates a structured career preparation path based on the student's target role and current progress.

### Job Readiness Analysis
Identifies remaining areas that may prevent the student from becoming job ready.

### Resume Builder
Supports resume preparation using student skills, projects and academic information.

### Job Recommendations
Connects career preparation with suitable job opportunities and role requirements.

### Mentor Support
Provides mentor-related functionality for student guidance and progress review.

### Employer Module
Supports employer/recruiter functionality related to job requirements and candidate skills.

### Admin Module
Supports management of important platform information such as users, careers, learning resources and assessments.

### Career Assistant
Includes a context-aware career assistant that uses available student profile, target career, readiness and skill-gap information to provide relevant guidance.

The current implementation uses a client-side context-driven approach and can be extended with an external LLM integration in the future.

### Progress Analytics
Tracks career-readiness progress and student achievements.

## Career Readiness Model

The Career Readiness Score considers multiple factors:

- Technical Skills – 40%
- Recommended Tools – 15%
- Portfolio Projects – 15%
- Assessments – 10%
- Experience – 10%
- Soft Skills – 10%

This provides students with a broader view of career preparation instead of measuring readiness using only course completion.

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- PostgreSQL
- React Context
- Git
- GitHub
- Vercel

## Project Structure

```text
CareerBridge/
│
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── ai/
│   │   ├── analytics/
│   │   ├── assessments/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── employer/
│   │   ├── jobreadiness/
│   │   ├── jobs/
│   │   ├── landing/
│   │   ├── learning/
│   │   ├── mentor/
│   │   ├── onboarding/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── resume/
│   │   ├── roadmap/
│   │   └── skillgap/
│   │
│   ├── context/
│   ├── data/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── supabase/
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
````

## Database Design

The project includes database structures for:

* User profiles
* Career roles
* Skills
* Career skill requirements
* User skills
* Learning resources
* Practice tasks
* Project templates
* User projects
* Assessment questions
* Assessment attempts
* Mentor feedback

## Current Project Status

CareerBridge AI is currently at an advanced functional prototype / near-complete development stage.

Most of the planned core modules have been implemented. The current application supports the main student journey from career selection and skill analysis through learning, assessments, roadmap and job-readiness preparation.

The application is publicly deployed using Vercel.

## Planned Enhancements

Two placement-focused modules are planned for the next development stage.

### 1. Personalized Interview Preparation

This module will provide role-based interview preparation including:

* Frequently asked interview questions
* Technical questions
* HR questions
* Scenario-based questions
* Difficulty levels
* Answer guidance
* Important points expected in answers
* Bookmark and revision support
* Interview preparation progress tracking

### 2. Placement Coding Preparation

This module will provide structured coding practice for placement preparation.

Planned categories include:

* Arrays
* Strings
* Searching
* Sorting
* Recursion
* Linked Lists
* Stack
* Queue
* Trees
* Basic Data Structures and Algorithms

The planned learning flow for coding problems is:

Question → Hint → Approach → Solution → Explanation → Dry Run

The module will also support difficulty levels, bookmarks, revision and coding-practice progress tracking.

## Current Limitations

* The Career Assistant currently uses a client-side context-driven approach rather than a default external LLM API.
* Resume processing currently uses structured/text-based processing rather than complete OCR support for every scanned document.
* Personalized Interview Preparation and Placement Coding Preparation are planned enhancements and are not part of the current implementation.

## Deployment

**Live Application:**
[https://careerbridge-ai-kappa.vercel.app](https://careerbridge-ai-kappa.vercel.app)

**Deployment Platform:** Vercel

## Repository

**GitHub Repository:**
[https://github.com/Arshitha2414/CareerBridge](https://github.com/Arshitha2414/CareerBridge)

## Development Status

The project was primarily developed and tested locally during the implementation phase. After the main application modules were integrated, the project source code was uploaded to this public GitHub repository.

Further commits will be added as genuine development changes, testing, documentation improvements and planned placement-preparation features are implemented.

## Developer

**Arshitha Fathima A.**
B.Tech Information Technology
Rathinam Technical Campus

## Project Goal

CareerBridge AI aims to help students clearly understand where they are in their career preparation, what skills they are missing, what they should learn next, and how they can progress step by step towards becoming job ready.




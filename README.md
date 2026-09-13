# CareerBridge AI

CareerBridge AI is a personalized career readiness and skill gap analysis platform designed to help students understand their current skills, identify missing skills for their target career, and follow a structured path towards becoming job ready.

The platform connects career discovery, skill gap analysis, personalized learning, practice, assessments, projects, career roadmaps, resume preparation, job recommendations and progress tracking within a single application.

## Project Pathway

**Pathway A – Continuation Track**

This project continues the problem identified during the previous AI Immersion task, progressing from the existing foundation toward prototype refinement and validation.

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

Includes a context-aware Career Assistant that uses available student profile, target career, readiness and skill-gap information to provide relevant guidance.

The current implementation uses a client-side context-driven approach and provides scope for future integration with external LLM services to further enhance conversational capabilities.

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

## Project Structure

CareerBridge follows a modular project structure:

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

## Database Design

The project includes database structures for:

- User profiles
- Career roles
- Skills
- Career skill requirements
- User skills
- Learning resources
- Practice tasks
- Project templates
- User projects
- Assessment questions
- Assessment attempts
- Mentor feedback

## Current Project Status

CareerBridge AI is currently at an advanced functional prototype / near-complete development stage.

Most of the planned core modules have been implemented. The current application supports the main student journey from career selection and skill analysis through learning, assessments, roadmap and job-readiness preparation.

The remaining development work mainly focuses on placement-oriented enhancements, testing and further refinement.

## Planned Enhancements

Two placement-focused modules are planned for the next development stage.

### 1. Personalized Interview Preparation

This module will provide role-based interview preparation including:

- Frequently asked interview questions
- Technical questions
- HR questions
- Scenario-based questions
- Easy, medium and advanced difficulty levels
- Answer guidance
- Important points expected in good answers
- Bookmark and revision support
- Interview preparation progress tracking
- Identification of areas requiring more preparation

A later refinement can allow students to enter their own answers and receive structured feedback on missing points and possible improvements.

### 2. Placement Coding Preparation

This module will provide structured coding practice for placement preparation.

Planned categories include:

- Arrays
- Strings
- Searching
- Sorting
- Recursion
- Linked Lists
- Stack
- Queue
- Trees
- Basic Data Structures and Algorithms
- General problem-solving patterns

Questions will be organized by difficulty:

**Easy → Medium → Hard**

The planned learning flow for each coding problem is:

**Question → Hint → Approach → Solution → Explanation → Dry Run**

The module will also support:

- Topic-wise coding questions
- Difficulty-based filtering
- Hints before solutions
- Step-by-step approaches
- Code solutions
- Simple explanations
- Dry-run examples
- Completed-question tracking
- Need More Practice tracking
- Bookmark and revision support
- Progress tracking by coding topic

## Areas for Further Enhancement

CareerBridge AI currently provides a context-aware Career Assistant using the student's profile, target career, readiness information and identified skill gaps. The architecture also provides scope for future integration with external LLM services to further enhance conversational capabilities.

Resume processing currently supports structured and text-based information. Future enhancement can extend this capability to support advanced document processing for a wider range of resume formats.

The next development phase will introduce the planned Personalized Interview Preparation and Placement Coding Preparation modules, further extending the platform from career readiness to placement preparation.

These enhancements build on the existing functional CareerBridge AI platform and provide clear opportunities for continued development.

## Repository

**GitHub Repository:**  
https://github.com/Arshitha2414/CareerBridge

**Repository Visibility:** Public

## Development Status

The repository contains the current CareerBridge AI source code, feature-based components, application data, service files, configuration files and Supabase-related files.

Further commits will be added when genuine development changes, testing, bug fixes, documentation improvements or planned feature implementations are completed.

## Developer

**Arshitha Fathima A.**  
B.Tech Information Technology  
Rathinam Technical Campus

## Project Goal

CareerBridge AI aims to help students clearly understand where they are in their career preparation, what skills they are missing, what they should learn next, and how they can progress step by step towards becoming job ready.

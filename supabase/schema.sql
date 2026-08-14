-- ==============================================================================
-- CareerBridge AI – Full Relational Database Schema & RLS Policies (Supabase)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'employer', 'admin')),
    avatar_url TEXT,
    college TEXT,
    degree TEXT,
    department TEXT,
    current_year TEXT,
    graduation_year TEXT,
    location TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    target_career_id TEXT,
    daily_learning_time TEXT DEFAULT '1 hour per day',
    learning_style TEXT DEFAULT 'mixed',
    resource_preference TEXT DEFAULT 'all',
    interests TEXT[] DEFAULT '{}',
    is_onboarding_completed BOOLEAN DEFAULT FALSE,
    is_analyzed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Career Roles Table
CREATE TABLE IF NOT EXISTS public.career_roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    core_responsibilities TEXT[] NOT NULL DEFAULT '{}',
    recommended_tools TEXT[] NOT NULL DEFAULT '{}',
    soft_skills TEXT[] NOT NULL DEFAULT '{}',
    recommended_projects TEXT[] NOT NULL DEFAULT '{}',
    related_careers TEXT[] NOT NULL DEFAULT '{}',
    market_demand TEXT NOT NULL DEFAULT 'High',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT,
    popular_careers TEXT[] DEFAULT '{}'
);

-- 4. Career Skill Requirements Table
CREATE TABLE IF NOT EXISTS public.career_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_id TEXT NOT NULL REFERENCES public.career_roles(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    required_level TEXT NOT NULL CHECK (required_level IN ('Beginner', 'Intermediate', 'Advanced')),
    priority TEXT NOT NULL CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
    weight NUMERIC NOT NULL CHECK (weight > 0 AND weight <= 100),
    why_needed TEXT NOT NULL,
    workplace_applications TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User Skills Table
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    verification_status TEXT NOT NULL DEFAULT 'Self-Reported' CHECK (verification_status IN ('Self-Reported', 'Verified', 'Project-Demonstrated')),
    assessment_score NUMERIC,
    assessment_date TIMESTAMPTZ,
    verified_date TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, skill_id)
);

-- 6. Learning Resources Table
CREATE TABLE IF NOT EXISTS public.learning_resources (
    id TEXT PRIMARY KEY,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    topic TEXT,
    title TEXT NOT NULL,
    provider TEXT NOT NULL,
    url TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    cost TEXT NOT NULL CHECK (cost IN ('Free', 'Freemium', 'Paid')),
    type TEXT NOT NULL CHECK (type IN ('Video', 'Reading', 'Interactive', 'Course', 'Project', 'Documentation')),
    estimated_hours NUMERIC NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    rating NUMERIC DEFAULT 4.5
);

-- 7. User Learning Progress Table
CREATE TABLE IF NOT EXISTS public.learning_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    completed_topics TEXT[] DEFAULT '{}',
    current_stage_number INT DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'Learning', 'Completed')),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, skill_id)
);

-- 8. Practice Tasks & User Practice Progress Table
CREATE TABLE IF NOT EXISTS public.practice_tasks (
    id TEXT PRIMARY KEY,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    dataset_name TEXT NOT NULL,
    dataset_description TEXT NOT NULL,
    tasks JSONB NOT NULL,
    skills_practiced TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.user_practice_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_id TEXT NOT NULL REFERENCES public.practice_tasks(id) ON DELETE CASCADE,
    completed_subtasks TEXT[] DEFAULT '{}',
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    UNIQUE (user_id, task_id)
);

-- 9. Projects & User Submissions Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    career_id TEXT REFERENCES public.career_roles(id) ON DELETE SET NULL,
    skill_ids TEXT[] NOT NULL DEFAULT '{}',
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    estimated_time TEXT NOT NULL,
    overview TEXT NOT NULL,
    requirements TEXT[] NOT NULL DEFAULT '{}',
    skills_demonstrated TEXT[] NOT NULL DEFAULT '{}',
    deliverables TEXT[] NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS public.user_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    project_template_id TEXT REFERENCES public.projects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    technologies TEXT[] DEFAULT '{}',
    github_url TEXT,
    demo_url TEXT,
    skills_demonstrated TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'in-progress' CHECK (status IN ('planning', 'in-progress', 'completed')),
    feedback TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Assessments & Attempts Table
CREATE TABLE IF NOT EXISTS public.assessment_questions (
    id TEXT PRIMARY KEY,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    type TEXT NOT NULL,
    code_snippet TEXT,
    options TEXT[] NOT NULL,
    correct_option_index INT NOT NULL,
    topic_tag TEXT NOT NULL,
    explanation TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.assessment_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    skill_id TEXT NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    score NUMERIC NOT NULL,
    total_questions INT NOT NULL,
    correct_count INT NOT NULL,
    passed_level TEXT NOT NULL,
    strong_areas TEXT[] DEFAULT '{}',
    weak_areas TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Mentor Profiles & Feedback Table
CREATE TABLE IF NOT EXISTS public.mentor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    avatar_url TEXT,
    expertise_careers TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    experience_years NUMERIC NOT NULL,
    bio TEXT NOT NULL,
    availability TEXT NOT NULL,
    rating NUMERIC DEFAULT 4.9,
    students_count INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.mentor_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID NOT NULL,
    mentor_name TEXT NOT NULL,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    message TEXT NOT NULL,
    actionable_steps TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Employer Profiles & Opportunities Table
CREATE TABLE IF NOT EXISTS public.employer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    website_url TEXT,
    logo_url TEXT
);

CREATE TABLE IF NOT EXISTS public.job_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES public.employer_profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    experience_level TEXT NOT NULL,
    career_role TEXT NOT NULL,
    required_skills JSONB NOT NULL DEFAULT '[]',
    description TEXT NOT NULL,
    is_demo_job BOOLEAN DEFAULT FALSE,
    posted_date TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Achievements & Notifications Table
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_practice_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view & update their own profile; Mentors/Employers can view basic candidate info
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User Skills: Private to user, viewable by authorized mentors
CREATE POLICY "Users can manage own skills" ON public.user_skills FOR ALL USING (auth.uid() = user_id);

-- Learning Progress: Private to user
CREATE POLICY "Users can manage own learning progress" ON public.learning_progress FOR ALL USING (auth.uid() = user_id);

-- Projects: Private to user, viewable by mentor/employer when submitted
CREATE POLICY "Users can manage own projects" ON public.user_projects FOR ALL USING (auth.uid() = user_id);

-- Assessments: Private to user
CREATE POLICY "Users can manage own assessments" ON public.assessment_attempts FOR ALL USING (auth.uid() = user_id);

-- Notifications: Private to user
CREATE POLICY "Users can read/update own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

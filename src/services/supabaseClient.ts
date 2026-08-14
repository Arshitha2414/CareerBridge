import { createClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};

const supabaseUrl = metaEnv.VITE_SUPABASE_URL || 'https://mock-careerbridge.supabase.co';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || 'mock-anon-key-careerbridge';

export const isSupabaseConfigured = Boolean(
  metaEnv.VITE_SUPABASE_URL && metaEnv.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


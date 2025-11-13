-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create site config table
CREATE TABLE IF NOT EXISTS public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for skills, projects, and site_config
CREATE POLICY "Public can view skills"
  ON public.skills FOR SELECT
  USING (true);

CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  USING (true);

CREATE POLICY "Public can view site config"
  ON public.site_config FOR SELECT
  USING (true);

-- Public can submit messages
CREATE POLICY "Public can insert messages"
  ON public.messages FOR INSERT
  WITH CHECK (true);

-- Admin policies (authenticated users who are in admin_users table)
CREATE POLICY "Authenticated can manage skills"
  ON public.skills FOR ALL
  USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN (SELECT email FROM public.admin_users))
  );

CREATE POLICY "Authenticated can manage projects"
  ON public.projects FOR ALL
  USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN (SELECT email FROM public.admin_users))
  );

CREATE POLICY "Authenticated can view messages"
  ON public.messages FOR SELECT
  USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN (SELECT email FROM public.admin_users))
  );

CREATE POLICY "Authenticated can update messages"
  ON public.messages FOR UPDATE
  USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN (SELECT email FROM public.admin_users))
  );

CREATE POLICY "Authenticated can manage site config"
  ON public.site_config FOR ALL
  USING (
    auth.uid() IN (SELECT id FROM auth.users WHERE email IN (SELECT email FROM public.admin_users))
  );

-- Insert initial site config
INSERT INTO public.site_config (key, value) VALUES
  ('resume_url', '/Christin_Thomas_Resume.pdf'),
  ('github_url', 'https://github.com/Crizt1n'),
  ('linkedin_url', 'https://www.linkedin.com/in/christin-thomas-48919421b/'),
  ('email', 'christin38thomas@gmail.com'),
  ('phone', '+91 9061127341'),
  ('location', 'Pathanamthitta, Kerala, India')
ON CONFLICT (key) DO NOTHING;

-- Insert initial skills
INSERT INTO public.skills (name, category, proficiency, order_index) VALUES
  ('React', 'Frontend', 95, 1),
  ('Angular', 'Frontend', 90, 2),
  ('Vue.js', 'Frontend', 85, 3),
  ('Astro', 'Frontend', 80, 4),
  ('Node.js', 'Backend', 90, 5),
  ('Python', 'Backend', 85, 6),
  ('MongoDB', 'Database', 85, 7),
  ('PostgreSQL', 'Database', 90, 8),
  ('React Native', 'Mobile', 90, 9),
  ('Jest', 'Testing', 85, 10),
  ('Git', 'Tools', 95, 11);

-- Insert initial projects from resume
INSERT INTO public.projects (title, description, tech_stack, tags, featured, order_index) VALUES
  ('RxHome', 'Integrated QuickBooks for streamlined financial operations in a U.S Healthcare project, improving billing efficiency and financial tracking.', ARRAY['React', 'Node.js', 'QuickBooks API'], ARRAY['Healthcare', 'Finance', 'Integration'], true, 1),
  ('HDFC Vyapar', 'Enhanced HDFC Bank''s merchant billing app with comprehensive features for invoicing, sales tracking, and payment processing.', ARRAY['React Native', 'Node.js', 'MongoDB'], ARRAY['Finance', 'Mobile', 'Banking'], true, 2),
  ('Easyroot (Auburn Engineering)', 'Built robust accounting modules and Tools Modules for a Qatar ACMV industry leader, streamlining operations and financial management.', ARRAY['Angular', 'Node.js', 'PostgreSQL'], ARRAY['Engineering', 'Enterprise', 'Finance'], true, 3),
  ('Rate My Manager', 'Designed and developed a full-stack feedback application from scratch for U.S Users, enabling anonymous manager reviews and insights.', ARRAY['React', 'Node.js', 'MongoDB'], ARRAY['Feedback', 'Full-Stack', 'Social'], true, 4),
  ('Code For Fun', 'Implemented 100+ Jest test cases with automated testing pipeline, improving reliability for a U.S Nonprofit''s educational platform.', ARRAY['React', 'Jest', 'CI/CD'], ARRAY['Education', 'Testing', 'Nonprofit'], false, 5),
  ('Independa', 'Developed Android and iOS APKs for a U.S Healthcare project, enabling seamless user experience across mobile platforms.', ARRAY['React Native', 'Firebase'], ARRAY['Healthcare', 'Mobile', 'Cross-Platform'], false, 6);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at
  BEFORE UPDATE ON public.site_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
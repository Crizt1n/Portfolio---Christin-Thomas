import { Github, Linkedin, Mail, ArrowUp, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const RESUME_URL = "https://drive.google.com/file/d/16NEAS5dHADEGLNV_liusbxEOyduxrxAr/view?usp=sharing";

export const Footer = () => {
  const [config, setConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await supabase.from("site_config").select("*");
        if (data && data.length > 0) {
          const configObj = data.reduce((acc: Record<string, string>, item: any) => {
            acc[item.key] = item.value;
            return acc;
          }, {});
          setConfig(configObj);
        }
      } catch (err) {
        console.warn("Failed to fetch site_config", err);
      }
    };
    fetchConfig();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const githubUrl = config.github_url || "https://github.com/Crizt1n";
  const linkedinUrl = config.linkedin_url || "https://www.linkedin.com/in/christin-thomas-48919421b/";
  const emailAddress = config.email || "christin38thomas@gmail.com";
  const resumeUrl = config.resume_url && !config.resume_url.includes("Christin_Thomas_Resume.pdf")
    ? config.resume_url
    : RESUME_URL;

  return (
    <footer className="pt-12 pb-28 sm:pb-14 px-4 border-t border-border/50 relative bg-background/50">
      <div className="container max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          
          {/* Logo & Tagline */}
          <div className="text-center sm:text-left space-y-1">
            <p className="text-xl sm:text-2xl font-black text-gradient">Christin Thomas</p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Software Engineer • Full-Stack & Mobile Development
            </p>
          </div>

          {/* Social Links & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl glass border border-border/70 flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl glass border border-border/70 flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${emailAddress}`}
              aria-label="Email Me"
              className="w-10 h-10 rounded-xl glass border border-border/70 flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95"
            >
              <Mail className="h-4 w-4" />
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume Google Drive"
              className="w-10 h-10 rounded-xl glass border border-border/70 flex items-center justify-center text-muted-foreground hover:text-primary transition-all active:scale-95"
            >
              <FileText className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-all active:scale-95 ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-2 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Christin Thomas. All rights reserved.</p>
          <p>Powered by React, Vite, Tailwind CSS & Supabase</p>
        </div>
      </div>
    </footer>
  );
};

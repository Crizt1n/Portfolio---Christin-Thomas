import { Button } from "@/components/ui/button";
import { ArrowDown, FileText, Github, Linkedin, Mail, Sparkles, ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const RESUME_URL = "https://drive.google.com/file/d/16NEAS5dHADEGLNV_liusbxEOyduxrxAr/view?usp=sharing";

export const Hero = () => {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const resumeUrl = config.resume_url && !config.resume_url.includes("Christin_Thomas_Resume.pdf")
    ? config.resume_url
    : RESUME_URL;

  const githubUrl = config.github_url || "https://github.com/Crizt1n";
  const linkedinUrl = config.linkedin_url || "https://www.linkedin.com/in/christin-thomas-48919421b/";
  const emailAddress = config.email || "christin38thomas@gmail.com";

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-28 sm:pt-36 pb-20 sm:pb-24 scroll-mt-24"
    >
      {/* Ambient background glows safely clipped */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-primary/20 via-sky-500/10 to-indigo-500/15 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-6 sm:space-y-8 animate-fade-in">
          
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/30 text-xs sm:text-sm font-medium shadow-lg shadow-primary/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-primary font-semibold">Christin Thomas</span>
            <span className="text-muted-foreground">• Full-Stack, TV & Mobile</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-primary/15 text-primary border border-primary/25 font-semibold">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span>HIPAA Certified</span>
            </span>
          </div>

          {/* Headline with safe vertical breathing room and no clipping */}
          <div className="space-y-2 sm:space-y-4 pt-2">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-tight sm:leading-tight">
              <span className="block text-foreground py-1">Christin Thomas</span>
              <span className="block text-gradient py-1.5 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold">
                Building Digital Excellence
              </span>
            </h1>
          </div>

          {/* Subtitle / Bio */}
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 font-normal pt-1 sm:pt-2">
            Software Developer with 2+ years of experience engineering scalable web, TV, and mobile applications across healthcare, banking, and enterprise domains. 
            Specializing in <span className="text-foreground font-medium">React.js</span>, <span className="text-foreground font-medium">Vue.js</span>, <span className="text-foreground font-medium">React Native</span>, <span className="text-foreground font-medium">Node.js</span>, and <span className="text-foreground font-medium">Python</span>.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-xl mx-auto pt-2 pb-2">
            <div className="p-3 sm:p-4 rounded-2xl glass border border-border/60 hover:border-primary/40 transition-all text-center">
              <p className="text-xl sm:text-3xl font-extrabold text-primary">2+ Yrs</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Experience</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl glass border border-border/60 hover:border-primary/40 transition-all text-center">
              <p className="text-xl sm:text-3xl font-extrabold text-primary">8+ Apps</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Shipped</p>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl glass border border-border/60 hover:border-primary/40 transition-all text-center">
              <p className="text-xl sm:text-3xl font-extrabold text-primary">HIPAA</p>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">Compliance</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 max-w-md sm:max-w-none mx-auto w-full px-2">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto min-h-[48px] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98] group flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>Get In Touch</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-8 rounded-xl border border-primary/30 hover:border-primary bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all active:scale-[0.98] group"
            >
              <FileText className="h-4 w-4 group-hover:rotate-6 transition-transform" />
              <span>View Latest Resume</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>
          </div>

          {/* Social Links Row */}
          <div className="flex gap-4 justify-center items-center pt-4 sm:pt-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-11 h-11 rounded-xl glass border border-border/70 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-95 shadow-sm"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-11 h-11 rounded-xl glass border border-border/70 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-95 shadow-sm"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${emailAddress}`}
              aria-label="Send Email"
              className="w-11 h-11 rounded-xl glass border border-border/70 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all active:scale-95 shadow-sm"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-primary animate-bounce cursor-pointer hover:text-primary/80 transition-colors"
        aria-label="Scroll down to About"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
};

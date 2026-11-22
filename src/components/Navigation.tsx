import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  FileText, 
  ExternalLink, 
  Home, 
  User, 
  Briefcase, 
  Code2, 
  Sparkles, 
  Mail,
  ChevronRight,
  Github,
  Linkedin
} from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/16NEAS5dHADEGLNV_liusbxEOyduxrxAr/view?usp=sharing";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section tracker for active dock & nav highlighting
      const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        if (id === "hero") {
          if (window.scrollY < 400) {
            setActiveSection("hero");
            break;
          }
        } else {
          const element = document.getElementById(id);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -75;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "About", id: "about", icon: User, desc: "Background & Bio" },
    { label: "Experience", id: "experience", icon: Briefcase, desc: "Career & Roles" },
    { label: "Projects", id: "projects", icon: Code2, desc: "Featured Works" },
    { label: "Skills", id: "skills", icon: Sparkles, desc: "Tech Stack & Tools" },
    { label: "Contact", id: "contact", icon: Mail, desc: "Get In Touch" },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/20"
            : "bg-transparent py-2"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo & Available badge */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 hover:border-primary text-primary font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-sm shadow-primary/20"
                aria-label="Christin Thomas Home"
              >
                <span className="text-gradient font-black">CT</span>
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for hire</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-2.5">
              {/* Direct Resume Link Button */}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary transition-all active:scale-95 group"
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-6 transition-transform" />
                <span>Resume</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              {/* Mobile Menu Trigger */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl glass border border-border/80 text-foreground hover:text-primary active:scale-90 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-primary" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[65px] bg-background/95 backdrop-blur-2xl border-b border-border/80 shadow-2xl animate-accordion-down overflow-hidden z-40 max-h-[calc(100vh-70px)] overflow-y-auto">
            <div className="container max-w-6xl mx-auto px-4 py-5 space-y-3">
              {/* Status pill in mobile drawer */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium w-fit mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Full-time & Contract Roles</span>
              </div>

              {/* Navigation list */}
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary/15 text-primary border border-primary/30 font-semibold"
                          : "text-foreground hover:bg-secondary/40 active:bg-secondary/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isActive ? "bg-primary text-background" : "bg-secondary text-primary"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>

              {/* Action buttons inside mobile drawer */}
              <div className="pt-3 border-t border-border/60 space-y-2.5">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open Full Resume (Google Drive)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                {/* Social Quick-Links in Drawer */}
                <div className="flex justify-center items-center gap-4 pt-2">
                  <a
                    href="https://github.com/Crizt1n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl glass border border-border/80 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/christin-thomas-48919421b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl glass border border-border/80 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:christin38thomas@gmail.com"
                    className="p-2.5 rounded-xl glass border border-border/80 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Floating Bottom Navigation Dock for Mobile (iOS / Android App feel) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[calc(100%-2rem)] max-w-sm pointer-events-auto">
        <div className="glass backdrop-blur-2xl bg-card/90 border border-primary/25 shadow-2xl shadow-primary/10 rounded-full px-3 py-2 flex items-center justify-around">
          <button
            onClick={() => scrollToSection("hero")}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeSection === "hero"
                ? "bg-primary text-background shadow-md shadow-primary/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeSection === "about"
                ? "bg-primary text-background shadow-md shadow-primary/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="About"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("experience")}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeSection === "experience"
                ? "bg-primary text-background shadow-md shadow-primary/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Experience"
          >
            <Briefcase className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeSection === "projects"
                ? "bg-primary text-background shadow-md shadow-primary/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Projects"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("skills")}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeSection === "skills"
                ? "bg-primary text-background shadow-md shadow-primary/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Skills"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              activeSection === "contact"
                ? "bg-primary text-background shadow-md shadow-primary/40"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Contact"
          >
            <Mail className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

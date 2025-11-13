import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Hero = () => {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    const fetchConfig = async () => {
      const { data } = await supabase.from("site_config").select("*");
      const configObj = data?.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      setConfig(configObj || {});
    };
    fetchConfig();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <p className="text-primary text-sm md:text-base font-medium tracking-wider uppercase animate-slide-in-left">
              Software Engineer
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="block">Christin Thomas</span>
              <span className="block text-gradient mt-2">Building Digital Excellence</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-in-right">
            Full-stack developer crafting innovative solutions across healthcare, finance, and enterprise domains. 
            Specializing in React, Node.js, and mobile development with a passion for clean code and user experience.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center animate-scale-in">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("contact")}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg hover:shadow-primary/50 transition-all"
            >
              <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Get In Touch
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open(config.resume_url, "_blank")}
              className="group border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>
          </div>

          <div className="flex gap-6 justify-center pt-8 animate-fade-in [animation-delay:400ms]">
            <a
              href={config.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={config.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${config.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary animate-bounce cursor-pointer hover:text-primary/80 transition-colors"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  );
};
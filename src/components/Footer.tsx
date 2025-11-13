import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Footer = () => {
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

  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-gradient mb-2">Christin Thomas</p>
            <p className="text-muted-foreground">
              Building the future, one line of code at a time
            </p>
          </div>

          <div className="flex gap-6">
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

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Christin Thomas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
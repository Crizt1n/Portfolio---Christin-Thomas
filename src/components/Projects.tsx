import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  tags: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (data) {
        setProjects(data);
        const tags = new Set<string>();
        data.forEach(project => {
          project.tags?.forEach(tag => tags.add(tag));
        });
        setAllTags(["all", ...Array.from(tags)]);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = selectedTag === "all" 
    ? projects 
    : projects.filter(p => p.tags?.includes(selectedTag));

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Innovative solutions that make a difference
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={selectedTag === tag ? "bg-primary" : "border-primary/30 hover:border-primary"}
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className="group overflow-hidden glass border-border/50 hover:border-primary/30 transition-all animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags?.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs border-primary/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  {project.live_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.live_url!, "_blank")}
                      className="flex-1 group/btn"
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                      Live Demo
                    </Button>
                  )}
                  {project.github_url && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.github_url!, "_blank")}
                      className="flex-1 group/btn"
                    >
                      <Github className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
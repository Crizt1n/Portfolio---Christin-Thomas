import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Sparkles, FolderGit2 } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [allTags, setAllTags] = useState<string[]>(["all"]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) {
          console.error("Error fetching projects:", error);
        }

        if (data) {
          setProjects(data);
          const tags = new Set<string>();
          data.forEach((project) => {
            project.tags?.forEach((tag) => tags.add(tag));
          });
          setAllTags(["all", ...Array.from(tags)]);
        }
      } catch (err) {
        console.error("Projects query error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedTag === "all" 
    ? projects 
    : projects.filter((p) => p.tags?.includes(selectedTag));

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 relative scroll-mt-24">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Real-world applications engineered for scale, usability, and impact
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-8 sm:mb-12 px-2">
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25"
                    : "glass border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {tag === "all" ? "All" : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((n) => (
              <Card key={n} className="p-6 glass border-border/50 rounded-2xl animate-pulse space-y-4">
                <div className="h-6 bg-secondary/80 rounded-md w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-secondary/60 rounded w-full" />
                  <div className="h-4 bg-secondary/60 rounded w-5/6" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-secondary/70 rounded-full" />
                  <div className="h-6 w-16 bg-secondary/70 rounded-full" />
                </div>
                <div className="h-10 bg-secondary/50 rounded-xl pt-2" />
              </Card>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className="group flex flex-col justify-between h-full glass border-border/60 hover:border-primary/50 transition-all rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors text-foreground leading-snug">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <div className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full mt-0.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech_stack?.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-0.5 text-[11px] rounded-md font-medium bg-secondary text-primary border border-border/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 text-[10px] rounded-full font-medium text-muted-foreground border border-border/60"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile & Desktop Action Buttons */}
                <div className="flex gap-2.5 pt-6 mt-4 border-t border-border/50">
                  {project.live_url ? (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.live_url!, "_blank")}
                      className="flex-1 min-h-[40px] rounded-xl text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group/btn active:scale-95"
                    >
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5 group-hover/btn:rotate-12 transition-transform" />
                      Live Demo
                    </Button>
                  ) : null}

                  {project.github_url ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(project.github_url!, "_blank")}
                      className="flex-1 min-h-[40px] rounded-xl text-xs sm:text-sm font-medium border-border/80 hover:border-primary glass active:scale-95"
                    >
                      <Github className="mr-1.5 h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                      Code
                    </Button>
                  ) : (
                    !project.live_url && (
                      <div className="w-full text-center text-xs text-muted-foreground py-1">
                        Enterprise Internal Project
                      </div>
                    )
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Empty state if no projects returned */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-12 glass border border-border/60 rounded-2xl p-8 max-w-md mx-auto space-y-3">
            <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-lg">No projects found</h3>
            <p className="text-xs text-muted-foreground">
              Try selecting another category filter above.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

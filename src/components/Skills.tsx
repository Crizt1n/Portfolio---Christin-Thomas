import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Code2, 
  Server, 
  Database, 
  Smartphone, 
  Layers, 
  Sparkles, 
  Award, 
  ShieldCheck,
  Languages as LanguagesIcon 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
}

export const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) {
          console.error("Error fetching skills:", error);
        }

        if (data && data.length > 0) {
          setSkills(data);
          const cats = Array.from(new Set(data.map((s) => s.category)));
          setCategories(cats);
        }
      } catch (err) {
        console.error("Skills query error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getSkillsByCategory = (category: string) => {
    return skills.filter((s) => s.category === category);
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("front") || cat.includes("mobil")) return Smartphone;
    if (cat.includes("back") || cat.includes("arch")) return Server;
    if (cat.includes("data")) return Database;
    if (cat.includes("integr") || cat.includes("api")) return Layers;
    if (cat.includes("ai") || cat.includes("tool")) return Sparkles;
    return Code2;
  };

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-card/30 to-background relative scroll-mt-24">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Proficiencies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Key Domain & <span className="text-gradient">Technical Skills</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Languages, frameworks, cloud architecture, and AI-accelerated workflows
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <Card key={n} className="p-6 glass border-border/50 rounded-2xl animate-pulse space-y-4">
                <div className="h-6 bg-secondary/80 rounded w-1/3" />
                <div className="space-y-3">
                  <div className="h-4 bg-secondary/60 rounded" />
                  <div className="h-4 bg-secondary/60 rounded" />
                  <div className="h-4 bg-secondary/60 rounded" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Skills Cards Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              const categorySkills = getSkillsByCategory(category);

              return (
                <Card 
                  key={category}
                  className="p-5 sm:p-6 glass border-border/60 hover:border-primary/40 transition-all rounded-2xl space-y-5 h-full flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">{category}</h3>
                  </div>

                  <div className="space-y-3.5">
                    {categorySkills.map((skill) => (
                      <div key={skill.id} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-xs font-semibold text-primary">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary/80 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Certifications & Spoken Languages */}
        <div className="mt-10 sm:mt-14 grid md:grid-cols-2 gap-5 sm:gap-6">
          <Card className="p-5 sm:p-7 glass border-border/60 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Certifications & Standards</h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5 text-foreground font-medium">
                <ShieldCheck className="text-primary h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>HIPAA Compliance Certification (U.S. Healthcare Standards)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">▹</span>
                <span>User Experience Design – Georgia Tech (12/2024)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">▹</span>
                <span>National Council for Technology and Training Certification, A Grade (09/2023)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">▹</span>
                <span>Programming in HTML5 with JavaScript and CSS3 (11/2023)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-primary font-bold mt-0.5">▹</span>
                <span>ChatGPT and AI Tools (Prompting) (12/2023)</span>
              </li>
            </ul>
          </Card>

          <Card className="p-5 sm:p-7 glass border-border/60 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <LanguagesIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">Spoken Languages</h3>
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
                <p className="font-semibold text-xs sm:text-sm text-foreground">English</p>
                <p className="text-[11px] text-primary">Bilingual / Proficient (C2)</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
                <p className="font-semibold text-xs sm:text-sm text-foreground">Malayalam</p>
                <p className="text-[11px] text-primary">Bilingual / Proficient (C2)</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
                <p className="font-semibold text-xs sm:text-sm text-foreground">Hindi</p>
                <p className="text-[11px] text-primary">Advanced (C1)</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
                <p className="font-semibold text-xs sm:text-sm text-foreground">Tamil</p>
                <p className="text-[11px] text-primary">Upper Intermediate (B2)</p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};

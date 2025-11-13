import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
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

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase
        .from("skills")
        .select("*")
        .order("order_index", { ascending: true });
      
      if (data) {
        setSkills(data);
        const cats = Array.from(new Set(data.map(s => s.category)));
        setCategories(cats);
      }
    };
    fetchSkills();
  }, []);

  const getSkillsByCategory = (category: string) => {
    return skills.filter(s => s.category === category);
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-b from-card/20 to-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Modern technologies and frameworks I work with
          </p>
        </div>

        <div className="grid gap-8">
          {categories.map((category, catIndex) => (
            <Card 
              key={category}
              className="p-8 glass border-border/50 animate-fade-in"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">{category}</h3>
              <div className="grid gap-6">
                {getSkillsByCategory(category).map((skill, index) => (
                  <div 
                    key={skill.id} 
                    className="space-y-2 animate-slide-in-left"
                    style={{ animationDelay: `${(catIndex * 100) + (index * 50)}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out animate-glow"
                        style={{ 
                          width: `${skill.proficiency}%`,
                          animationDelay: `${(catIndex * 100) + (index * 50)}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6 glass border-border/50">
            <h3 className="text-xl font-bold mb-4 text-primary">Certifications</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <span>National Council for Technology and Training Certification with A Grade (Sept 2023)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <span>User Experience Design from Georgia Tech (Dec 2024)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <span>Programming in HTML5 with JavaScript and CSS3 (Nov 2023)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">▹</span>
                <span>ChatGPT and AI Tools (Prompting) (Dec 2023)</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 glass border-border/50">
            <h3 className="text-xl font-bold mb-4 text-primary">Languages</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex justify-between items-center">
                <span>English</span>
                <span className="text-sm">Proficient (C2)</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Malayalam</span>
                <span className="text-sm">Native (C2)</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Hindi</span>
                <span className="text-sm">Proficient (C2)</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Tamil</span>
                <span className="text-sm">Advanced (C1)</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};
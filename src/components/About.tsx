import { Card } from "@/components/ui/card";
import { Code2, Rocket, Users } from "lucide-react";

export const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Expertise",
      description: "Proficient in modern web technologies including React, Angular, Vue, Node.js, and mobile development with React Native."
    },
    {
      icon: Rocket,
      title: "Innovation Driven",
      description: "Delivered high-impact projects across healthcare, finance, and engineering sectors with a focus on quality and performance."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Experienced in cross-functional teams, code reviews, and mentoring, ensuring best practices and knowledge sharing."
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about creating elegant solutions to complex problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-slide-in-left">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a dedicated Software Engineer with a strong foundation in web and mobile development. 
                Currently at <span className="text-primary font-semibold">Conscious Technologies</span>, I collaborate with 
                cross-functional teams to deliver innovative solutions that make a real impact.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                My journey in tech has taken me through diverse domains - from integrating QuickBooks in healthcare 
                systems to enhancing merchant billing apps for HDFC Bank, and building accounting modules for 
                industrial leaders. Each project has sharpened my skills and deepened my commitment to excellence.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I believe in writing clean, maintainable code and staying current with the latest technologies. 
                When I'm not coding, I'm learning new frameworks, contributing to open source, or mentoring aspiring developers.
              </p>
            </div>
          </div>

          <div className="space-y-4 animate-slide-in-right">
            {highlights.map((item, index) => (
              <Card key={index} className="p-6 glass border-border/50 hover:border-primary/50 transition-all group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
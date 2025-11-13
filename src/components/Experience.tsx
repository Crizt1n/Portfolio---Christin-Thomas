import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "Software Development Engineer",
      company: "Conscious Technologies",
      location: "Bengaluru, India",
      period: "Feb 2024 - Present",
      description: "Collaborating with cross-functional teams to deliver innovative, high-quality software solutions in various domains, including healthcare, finance, education, and engineering.",
      highlights: [
        "RxHome: Integrated QuickBooks for streamlined financial operations in U.S Healthcare project",
        "HDFC Vyapar: Enhanced HDFC Bank's merchant billing app with invoicing, sales tracking, and payments",
        "Easyroot (Auburn Engineering): Built accounting modules for Qatar ACMV industry leader",
        "Rate My Manager: Designed and developed full-stack feedback app for U.S Users",
        "Code For Fun: Implemented 100+ Jest test cases, improving reliability for U.S Nonprofit's educational platform",
        "Independa: Developed Android and iOS APKs for U.S Healthcare project"
      ]
    },
    {
      title: "Full Stack Developer Intern",
      company: "Luminar Technolab",
      location: "Kochi, India",
      period: "Jul 2023 - Feb 2024",
      description: "Gained hands-on experience in full-stack development, working closely with senior developers to build and optimize web applications.",
      highlights: [
        "Collaborated with cross-functional teams to gather requirements and translate them into technical specs",
        "Participated in code reviews, debugging, and testing to enhance software quality",
        "Improved front-end application performance by at least 20%, ensuring optimal website speed and responsiveness"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-gradient-to-b from-background to-card/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Building impactful solutions across diverse industries
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="p-8 glass border-border/50 hover:border-primary/30 transition-all animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-primary">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-semibold">{exp.company}</span>
                      <span className="text-muted-foreground">• {exp.location}</span>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="flex items-center gap-2 w-fit">
                    <Calendar className="h-3 w-3" />
                    {exp.period}
                  </Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm uppercase tracking-wide text-primary">
                    Key Contributions
                  </h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-3 text-muted-foreground">
                        <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 glass border border-border/50 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Education</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">Bachelor of Commerce: Computer Applications Development</h4>
              <p className="text-muted-foreground">Mahatma Gandhi University • 2020 - 2023 • A Grade</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Diploma: Logistics and Supply Chain Management</h4>
              <p className="text-muted-foreground">Co-operative Educational Society • 2022 - 2023 • A Grade</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import { Card } from "@/components/ui/card";
import { Code2, Rocket, Users, ShieldCheck, Sparkles, Cpu, Layers } from "lucide-react";

export const About = () => {
  const highlights = [
    {
      icon: Layers,
      title: "Multi-Platform Architecture",
      description: "Proven experience building shared architectures connecting Web portals, Smart TV apps (Vue.js for LG/Sony/DISH), and Mobile apps (React Native) to unified Node.js backends."
    },
    {
      icon: ShieldCheck,
      title: "HIPAA-Certified Healthcare",
      description: "HIPAA compliance certified developer experienced in telehealth, cognitive screening (DANA), Zoom SDK video calls, and encrypted patient data handling."
    },
    {
      icon: Rocket,
      title: "FinTech & Payment Solutions",
      description: "Engineered merchant billing workflows for HDFC Bank, automated reconciliation with QuickBooks Online, and integrated Stripe & Razorpay webhook payment pipelines."
    },
    {
      icon: Cpu,
      title: "AI-Assisted Modern Engineering",
      description: "Leveraging modern AI tooling (Claude, Cursor, Antigravity, Codex, GitHub Copilot) to accelerate production-grade implementation, refactoring, and test coverage."
    }
  ];

  const coreSkills = [
    "React.js", "Vue.js", "React Native", "Node.js", "Python", 
    "TypeScript", "PostgreSQL", "MongoDB", "Firebase", 
    "QuickBooks API", "Stripe & Razorpay", "Zoom SDK", "Jest", "Git & CI/CD"
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4 relative scroll-mt-24">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Overview</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Full-stack engineer building resilient multi-platform systems across healthcare, banking, and enterprise
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Bio Card */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="p-6 sm:p-8 glass border-border/60 shadow-xl rounded-2xl space-y-5">
              <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>
                  I'm a <span className="text-foreground font-semibold">Software Development Engineer</span> with 2+ years of production experience in designing and developing scalable full-stack web, TV, and mobile applications. Currently at <span className="text-primary font-semibold">Conscious Technologies</span>.
                </p>
                <p>
                  My engineering background centers on delivering high-reliability solutions: building <span className="text-foreground font-medium">U.S. healthcare & senior-care platforms (Independa, Everthrive)</span> with real-time Zoom video visits and cognitive screening, automating accounting operations via <span className="text-foreground font-medium">QuickBooks</span>, enhancing <span className="text-foreground font-medium">HDFC Bank's merchant billing mobile app</span>, and architecting internal ERP modules for Qatar's ACMV industry.
                </p>
                <p>
                  I am <span className="text-primary font-medium">HIPAA Compliance certified</span>, deeply versed in relational and NoSQL database modeling, RESTful API design, automated testing with Jest (100+ tests written), and cross-platform consistency.
                </p>
              </div>

              {/* Core Skill Pills */}
              <div className="pt-4 border-t border-border/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">Core Stack & Integrations</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {coreSkills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-secondary/70 border border-border/80 text-xs text-foreground font-medium hover:border-primary/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Highlight Cards */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {highlights.map((item, index) => (
              <Card 
                key={index} 
                className="p-5 sm:p-6 glass border-border/60 hover:border-primary/40 transition-all rounded-2xl group active:scale-[0.99]"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
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

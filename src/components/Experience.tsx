import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin, GraduationCap, Sparkles, ShieldCheck } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "Software Development Engineer",
      company: "Conscious Technologies",
      location: "Bengaluru, India",
      period: "Feb 2024 - Present",
      techStack: "React.js, Vue.js, React Native, Node.js, Python, PostgreSQL, MongoDB, Firebase, Jest",
      description: "Engineering scalable multi-platform web, TV, and mobile applications across healthcare, finance, education, and engineering domains.",
      highlights: [
        "Built and shipped Android & iOS apps using React Native for U.S. healthcare and senior care platforms (Independa, Everthrive), featuring in-app Zoom video calling, push notifications (FCM), and DANA cognitive assessment workflows.",
        "Developed Vue.js TV applications (for LG, Sony, DISH smart TVs) and web portals that share a single Node.js & PostgreSQL backend with mobile apps, ensuring unified business logic across every device.",
        "Built enterprise REST APIs and integrated third-party platforms including QuickBooks Online, Stripe, Razorpay, Zoom SDK, Firebase Cloud Messaging, and banking systems.",
        "HIPAA Compliance certified, with extensive experience handling sensitive electronic health data, audit logging, and telehealth security.",
        "Implemented automated testing with Jest (100+ test cases written) and established robust CI/CD and version control pipelines using Git, GitHub, and GitLab.",
        "AI-assisted developer actively utilizing Claude, Cursor, Antigravity, Codex, and GitHub Copilot to accelerate feature delivery, refactoring, and test coverage."
      ]
    },
    {
      title: "Full Stack Developer Intern",
      company: "Luminar Technolab",
      location: "Kochi, India",
      period: "Jul 2023 - Feb 2024",
      techStack: "JavaScript, React.js, Node.js, SQL",
      description: "Hands-on full-stack development building and maintaining modern client-facing web applications alongside senior engineering teams.",
      highlights: [
        "Collaborated with cross-functional teams to gather project requirements and translate them into clear technical specifications.",
        "Participated in code reviews, debugging, and testing cycles to improve overall quality and software maintainability.",
        "Improved front-end performance by at least 20% through asset optimization, code splitting, and rendering improvements.",
        "Built full-stack features across the React.js front end and Node.js back end across the complete software development lifecycle."
      ]
    }
  ];

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Dayananda Sagar University – Bengaluru",
      period: "09/2026 - 09/2028 (Expected)",
      grade: "Enrolled"
    },
    {
      degree: "Bachelor of Commerce: Computer Applications Development",
      institution: "Mahatma Gandhi University – Pathanamthitta",
      period: "06/2020 - 07/2023",
      grade: "Grade: A"
    },
    {
      degree: "Diploma: Logistics and Supply Chain Management",
      institution: "Co-operative Educational Society – Pathanamthitta",
      period: "07/2022 - 06/2023",
      grade: "Grade: A"
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-background to-card/30 relative scroll-mt-24">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Delivering production-grade applications for global clients
          </p>
        </div>

        {/* Work Timeline */}
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="p-5 sm:p-8 glass border-border/60 hover:border-primary/40 transition-all rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-transparent opacity-60" />

              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-primary">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Briefcase className="h-3.5 w-3.5" />
                        <span>{exp.company}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    <Calendar className="h-3 w-3" />
                    <span>{exp.period}</span>
                  </Badge>
                </div>

                <div className="text-xs text-primary/90 font-medium bg-primary/5 border border-primary/15 px-3 py-1.5 rounded-lg w-fit">
                  <span className="text-muted-foreground">Tech Stack: </span>
                  <span>{exp.techStack}</span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-border/50">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-primary">
                    Key Achievements & Contributions
                  </h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary font-bold mt-0.5 flex-shrink-0">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Education Section from Resume */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 glass border border-border/60 rounded-2xl space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">Education</h3>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {education.map((edu, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-border/60 space-y-1.5 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {edu.period}
                  </p>
                </div>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                  {edu.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

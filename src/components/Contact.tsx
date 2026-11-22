import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

export const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("messages")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you shortly!",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Unable to send your message at this moment. Please email directly at christin38thomas@gmail.com",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 pb-28 sm:pb-28 px-4 bg-gradient-to-b from-background to-card/20 relative scroll-mt-24">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            Have a project in mind, a question, or an exciting opportunity? Let's connect!
          </p>
        </div>

        {/* Quick Tap Actions on Mobile */}
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <a
            href="mailto:christin38thomas@gmail.com"
            className="p-4 rounded-2xl glass border border-border/70 hover:border-primary/50 flex items-center gap-3.5 transition-all active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground">Direct Email</p>
              <p className="text-xs sm:text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">
                christin38thomas@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:+919061127341"
            className="p-4 rounded-2xl glass border border-border/70 hover:border-primary/50 flex items-center gap-3.5 transition-all active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-background transition-colors">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone / WhatsApp</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                +91 9061127341
              </p>
            </div>
          </a>

          <div className="p-4 rounded-2xl glass border border-border/70 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground">
                Kerala, India
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <Card className="p-6 sm:p-8 glass border-border/60 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Your Name *</label>
                <Input
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 bg-background/60 rounded-xl border-border/80 focus:border-primary text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Your Email *</label>
                <Input
                  type="email"
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 bg-background/60 rounded-xl border-border/80 focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Subject</label>
              <Input
                placeholder="Project Inquiry, Job Opportunity, etc."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="h-12 bg-background/60 rounded-xl border-border/80 focus:border-primary text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Message *</label>
              <Textarea
                placeholder="Tell me about your project, goals, or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="min-h-[140px] bg-background/60 rounded-xl border-border/80 focus:border-primary text-sm resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full min-h-[48px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Send className="h-4 w-4" />
              <span>{loading ? "Sending Message..." : "Send Message"}</span>
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

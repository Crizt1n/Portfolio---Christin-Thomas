import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export const ConfigManager = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    const { data } = await supabase.from("site_config").select("*");
    if (data) {
      const configObj = data.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});
      setConfig(configObj);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (const [key, value] of Object.entries(config)) {
        const { error } = await supabase
          .from("site_config")
          .update({ value: value as string })
          .eq("key", key);

        if (error) throw error;
      }

      toast({ title: "Configuration updated successfully" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 glass border-border/50">
      <h2 className="text-2xl font-bold mb-6">Site Configuration</h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <Label>Resume URL</Label>
          <Input
            value={config.resume_url || ""}
            onChange={(e) => setConfig({ ...config, resume_url: e.target.value })}
            placeholder="/path/to/resume.pdf"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Path to your resume file (should be in /public folder)
          </p>
        </div>

        <div>
          <Label>GitHub URL</Label>
          <Input
            value={config.github_url || ""}
            onChange={(e) => setConfig({ ...config, github_url: e.target.value })}
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <Label>LinkedIn URL</Label>
          <Input
            value={config.linkedin_url || ""}
            onChange={(e) => setConfig({ ...config, linkedin_url: e.target.value })}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={config.email || ""}
            onChange={(e) => setConfig({ ...config, email: e.target.value })}
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            value={config.phone || ""}
            onChange={(e) => setConfig({ ...config, phone: e.target.value })}
            placeholder="+1 234 567 8900"
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            value={config.location || ""}
            onChange={(e) => setConfig({ ...config, location: e.target.value })}
            placeholder="City, Country"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Configuration"}
        </Button>
      </form>
    </Card>
  );
};
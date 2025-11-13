import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminReset = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(!!session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters." });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords do not match", description: "Please confirm your new password." });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Password updated", description: "You can now access the admin dashboard." });
      navigate("/admin");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 glass border-border/50">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
        {!hasSession ? (
          <p className="text-muted-foreground">
            This page must be opened from the password reset link sent to your email. Please go back to the login page and click "Forgot password?" to receive a new link.
          </p>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/admin/login")}>
              Back to Login
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default AdminReset;

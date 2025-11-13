import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        navigate("/admin");
      }
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

  const handleReset = async () => {
    if (!email) {
      toast({
        title: "Enter your email",
        description: "Please enter your email to reset your password.",
      });
      return;
    }
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset`,
      });
      if (error) throw error;
      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link.",
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 glass border-border/50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Admin Access</h1>
          <p className="text-muted-foreground mt-2">
            {isSignup ? "Create admin account" : "Sign in to manage your portfolio"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Button
            type="button"
            variant="link"
            className="w-full text-sm"
            onClick={handleReset}
            disabled={resetLoading}
          >
            {resetLoading ? "Sending reset link..." : "Forgot password?"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            After signing up, add your email to the admin_users table to get admin access.
          </p>
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Portfolio
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
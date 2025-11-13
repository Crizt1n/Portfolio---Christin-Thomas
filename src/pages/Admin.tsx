import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { SkillsManager } from "@/components/admin/SkillsManager";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { MessagesManager } from "@/components/admin/MessagesManager";
import { ConfigManager } from "@/components/admin/ConfigManager";

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const email = session?.user?.email ?? null;
      if (email) {
        setTimeout(() => verifyAdmin(email), 0);
      } else {
        setIsAdmin(false);
        setLoading(false);
        navigate("/admin/login");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      const email = session?.user?.email ?? null;
      if (email) {
        verifyAdmin(email);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const verifyAdmin = async (email: string) => {
    console.log("Verifying admin for email:", email);
    const cleanedEmail = email.trim().toLowerCase();
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", cleanedEmail)
      .maybeSingle();
    console.log("Admin data retrieved:", adminData, "Error:", error);
    if (adminData) {
      setIsAdmin(true);
      setLoading(false);
    } else {
      setIsAdmin(false);
      setLoading(false);
      navigate("/admin/login");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gradient">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your portfolio content
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="config">Config</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>

          <TabsContent value="config">
            <ConfigManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

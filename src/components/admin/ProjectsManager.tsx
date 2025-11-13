import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const ProjectsManager = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    tags: "",
    image_url: "",
    live_url: "",
    github_url: "",
    featured: false,
    order_index: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });
    if (data) setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      tech_stack: formData.tech_stack.split(",").map((s) => s.trim()),
      tags: formData.tags.split(",").map((s) => s.trim()),
    };

    try {
      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingProject.id);
        if (error) throw error;
        toast({ title: "Project updated successfully" });
      } else {
        const { error } = await supabase.from("projects").insert([projectData]);
        if (error) throw error;
        toast({ title: "Project added successfully" });
      }

      setFormData({
        title: "",
        description: "",
        tech_stack: "",
        tags: "",
        image_url: "",
        live_url: "",
        github_url: "",
        featured: false,
        order_index: 0,
      });
      setEditingProject(null);
      setIsDialogOpen(false);
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Project deleted successfully" });
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack?.join(", ") || "",
      tags: project.tags?.join(", ") || "",
      image_url: project.image_url || "",
      live_url: project.live_url || "",
      github_url: project.github_url || "",
      featured: project.featured,
      order_index: project.order_index,
    });
    setIsDialogOpen(true);
  };

  return (
    <Card className="p-6 glass border-border/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingProject(null); setFormData({ title: "", description: "", tech_stack: "", tags: "", image_url: "", live_url: "", github_url: "", featured: false, order_index: 0 }); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Tech Stack (comma-separated)</Label>
                <Input
                  value={formData.tech_stack}
                  onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Healthcare, Finance"
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
              <div>
                <Label>Live URL</Label>
                <Input
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                />
              </div>
              <div>
                <Label>GitHub URL</Label>
                <Input
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked as boolean })
                  }
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
              <div>
                <Label>Order Index</Label>
                <Input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingProject ? "Update" : "Add"} Project
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2 mt-2">
                  {project.featured && (
                    <span className="text-xs px-2 py-1 bg-primary/20 rounded">Featured</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
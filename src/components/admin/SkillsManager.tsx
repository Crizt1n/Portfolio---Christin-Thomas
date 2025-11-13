import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export const SkillsManager = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    proficiency: 50,
    order_index: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("order_index", { ascending: true });
    if (data) setSkills(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingSkill) {
        const { error } = await supabase
          .from("skills")
          .update(formData)
          .eq("id", editingSkill.id);
        if (error) throw error;
        toast({ title: "Skill updated successfully" });
      } else {
        const { error } = await supabase.from("skills").insert([formData]);
        if (error) throw error;
        toast({ title: "Skill added successfully" });
      }

      setFormData({ name: "", category: "", proficiency: 50, order_index: 0 });
      setEditingSkill(null);
      setIsDialogOpen(false);
      fetchSkills();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Skill deleted successfully" });
      fetchSkills();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      order_index: skill.order_index,
    });
    setIsDialogOpen(true);
  };

  return (
    <Card className="p-6 glass border-border/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skills Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingSkill(null); setFormData({ name: "", category: "", proficiency: 50, order_index: 0 }); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Proficiency (0-100)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
                  required
                />
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
                {editingSkill ? "Update" : "Add"} Skill
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">
                {skill.category} • {skill.proficiency}%
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(skill.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};
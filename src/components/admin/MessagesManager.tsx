import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const MessagesManager = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setMessages(data);
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast({ title: currentStatus ? "Marked as unread" : "Marked as read" });
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Message deleted successfully" });
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 glass border-border/50">
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No messages yet</p>
        ) : (
          messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 ${message.read ? "bg-muted/20" : "bg-primary/5"}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{message.name}</h3>
                    {!message.read && <Badge variant="default">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                  {message.subject && (
                    <p className="text-sm font-medium">Subject: {message.subject}</p>
                  )}
                  <p className="text-sm mt-2 whitespace-pre-wrap">{message.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleRead(message.id, message.read)}
                  >
                    {message.read ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <MailOpen className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(message.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Card>
  );
};
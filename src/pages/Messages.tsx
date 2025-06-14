
// View conversations/messages for the logged in user
import { useEffect, useState } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare } from "lucide-react";

export default function Messages() {
  const { user } = useSupabaseAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMsgs();
    // eslint-disable-next-line
  }, [user]);

  async function fetchMsgs() {
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*, properties(title), profiles:receiver_id(name)")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center py-20">
        <MessageSquare size={40} className="mb-6 text-blue-600" />
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Please sign in to view messages.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-xl mx-auto flex flex-col items-center justify-center text-center py-20">
      <MessageSquare size={40} className="mb-6 text-blue-600" />
      <h1 className="text-3xl font-bold mb-2">Messages</h1>
      {loading ? (
        <div>Loading your messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-muted-foreground">No messages yet.</div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {messages.map((m) => (
            <div key={m.id} className="bg-white/80 shadow p-4 rounded-lg text-left">
              <div className="text-sm text-gray-800">
                <span className="font-bold">{m.properties?.title || "Property"}</span>
                <span className="ml-2">on {new Date(m.created_at).toLocaleString()}</span>
              </div>
              <div className="mt-2">{m.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

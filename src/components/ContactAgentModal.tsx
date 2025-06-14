
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

type Props = {
  propertyId: string;
  ownerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ContactAgentModal({ propertyId, ownerId, open, onOpenChange }: Props) {
  const { user } = useSupabaseAuth();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!user) {
      setError("You must be signed in to send messages.");
      setLoading(false);
      return;
    }
    if (!body) {
      setError("Message can't be empty.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("messages").insert([{
      property_id: propertyId,
      sender_id: user.id,
      receiver_id: ownerId,
      body,
    }]);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setBody("");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Agent</DialogTitle>
        </DialogHeader>
        {success ? (
          <div className="py-6 text-green-600 text-center">
            Message sent! The agent will reply soon.
            <Button className="mt-4 w-full" onClick={() => { setSuccess(false); onOpenChange(false); }}>Close</Button>
          </div>
        ) : (
          <form onSubmit={sendMessage} className="flex flex-col gap-4">
            <textarea
              className="border rounded p-2"
              placeholder="Write your message here..."
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={4}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

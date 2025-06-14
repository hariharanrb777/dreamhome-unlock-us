
import { MessageSquare } from "lucide-react";

export default function Messages() {
  return (
    <div className="min-h-screen max-w-xl mx-auto flex flex-col items-center justify-center text-center py-20">
      <MessageSquare size={40} className="mb-6 text-blue-600" />
      <h1 className="text-3xl font-bold mb-2">Messages</h1>
      <p className="text-gray-600 mb-6">
        Messaging lets you connect with buyers, sellers, and agents—coming soon!
      </p>
      <p className="text-muted-foreground text-sm">
        This feature is under active development.
      </p>
    </div>
  );
}

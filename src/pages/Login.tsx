
// Login page using Supabase Auth
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setErr(error.message);
    } else {
      nav("/");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-20">
      <div className="bg-white/90 p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            className="border rounded p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            className="border rounded p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <div className="text-red-500 text-sm">{err}</div>}
          <Button className="w-full mt-2" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign in"}
          </Button>
        </form>
        <Button variant="link" className="w-full mt-4" onClick={() => nav("/register")}>
          Don't have an account? Register
        </Button>
      </div>
    </div>
  );
}

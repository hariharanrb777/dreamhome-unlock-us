
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// NOTE: To be replaced with Supabase Auth integration!

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In real impl: register using Supabase Auth
    nav("/");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-20">
      <div className="bg-white/90 p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
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
          <Button className="w-full mt-2" type="submit">
            Register
          </Button>
        </form>
        <Button variant="link" className="w-full mt-4" onClick={() => nav("/login")}>
          Already have an account? Sign in
        </Button>
      </div>
    </div>
  );
}

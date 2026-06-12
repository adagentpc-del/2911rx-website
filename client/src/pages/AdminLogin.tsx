import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2, Lock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button, Input, Label, Card } from "@/components/ui";
import { Logo } from "@/components/Layout";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("POST", "/api/admin/login", { username, password });
      navigate("/admin/inquiries");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-surface relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <Card className="relative w-full max-w-sm p-8 shadow-[0_30px_80px_-30px_hsl(214_60%_4%/0.6)]">
        <div className="mb-7 flex flex-col items-center gap-3">
          <Logo />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Admin Access
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}

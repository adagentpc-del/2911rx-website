import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, ShieldCheck } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Button, Input, Label, Card } from "@/components/ui";
import { Logo } from "@/components/Layout";

export default function AdminSetup() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If an owner already exists, this page is disabled.
  useEffect(() => {
    fetch("/api/admin/setup-status", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.needsSetup) navigate("/admin");
      })
      .catch(() => {});
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await apiRequest("POST", "/api/admin/setup", { email, password });
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-surface relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <Card className="relative w-full max-w-sm p-8 shadow-[0_30px_80px_-30px_hsl(214_60%_4%/0.6)]">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Logo />
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-teal-dark" /> Create super admin account
          </div>
          <p className="text-xs text-muted-foreground">
            This one-time setup creates the super admin — the top-level login with full control.
            You can add the company owners as admins afterward. It locks automatically once created.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Create account
          </Button>
        </form>
      </Card>
    </div>
  );
}

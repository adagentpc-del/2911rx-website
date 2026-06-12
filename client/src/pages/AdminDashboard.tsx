import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Inbox, LogOut, Trash2, Loader2 } from "lucide-react";
import type { Inquiry } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button, Card, Select } from "@/components/ui";
import { Logo } from "@/components/Layout";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-teal/10 text-teal-dark border-teal/30",
  contacted: "bg-sky-50 text-sky-700 border-sky-200",
  qualified: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function AdminDashboard() {
  const [, navigate] = useLocation();

  const { data: me, isLoading: meLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/me"],
  });

  useEffect(() => {
    if (!meLoading && me && !me.isAdmin) navigate("/admin");
  }, [me, meLoading, navigate]);

  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/admin/inquiries"],
    enabled: !!me?.isAdmin,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiRequest("PATCH", `/api/admin/inquiries/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/inquiries/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] }),
  });

  const logout = async () => {
    await apiRequest("POST", "/api/admin/logout");
    navigate("/admin");
  };

  if (meLoading || !me?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const list = inquiries ?? [];
  const stats = [
    { label: "Total", value: list.length },
    { label: "New", value: list.filter((i) => i.status === "new").length },
    { label: "Qualified", value: list.filter((i) => i.status === "qualified").length },
  ];

  return (
    <div className="min-h-screen bg-muted">
      <header className="hero-surface text-white">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo dark />
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
              Admin
            </span>
          </div>
          <Button variant="light" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl tracking-tight">Partnership Inquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Leads submitted through the website, newest first.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-1.5 font-display text-3xl font-semibold text-navy">{s.value}</p>
            </Card>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !list.length ? (
          <Card className="flex flex-col items-center py-16 text-center">
            <span className="icon-tile mb-4">
              <Inbox className="h-6 w-6 text-teal-dark" />
            </span>
            <h2 className="font-display text-lg font-semibold">No inquiries yet</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              New partnership inquiries from the website will appear here automatically.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {list.map((inq) => (
              <Card key={inq.id} className="p-6 transition-shadow hover:shadow-md">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-semibold">{inq.name}</h3>
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
                          STATUS_STYLES[inq.status] ?? STATUS_STYLES.new,
                        )}
                      >
                        {inq.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-foreground/80">
                      {inq.organization} &middot; {inq.practiceType}
                      {inq.state ? ` · ${inq.state}` : ""}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      <a href={`mailto:${inq.email}`} className="text-teal-dark hover:underline">
                        {inq.email}
                      </a>
                      {inq.phone ? ` · ${inq.phone}` : ""}
                    </p>
                    <p className="mt-2.5 text-sm">
                      <span className="font-medium">Interest:</span> {inq.interest}
                    </p>
                    {inq.message && (
                      <p className="mt-2.5 rounded-lg border border-border/70 bg-muted/60 p-3 text-sm leading-relaxed text-muted-foreground">
                        {inq.message}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Select
                      className="h-9 w-36 text-xs"
                      value={inq.status}
                      onChange={(e) => statusMutation.mutate({ id: inq.id, status: e.target.value })}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Delete inquiry from ${inq.name}`}
                      onClick={() => {
                        if (confirm(`Delete inquiry from ${inq.name}?`)) deleteMutation.mutate(inq.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

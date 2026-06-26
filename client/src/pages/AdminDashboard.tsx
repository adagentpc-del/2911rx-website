import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Inbox, LogOut, Trash2, Loader2, BarChart3, Settings as SettingsIcon,
  Users as UsersIcon, Eye, Mail, CalendarClock, Download, KeyRound, ShieldCheck, CreditCard,
} from "lucide-react";
import type { Inquiry } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button, Card, Select, Input, Label } from "@/components/ui";
import { Logo } from "@/components/Layout";
import { cn } from "@/lib/utils";

type Tab = "leads" | "analytics" | "billing" | "settings" | "team";
type Me = { isAdmin: boolean; email: string | null; role: string | null; id: number | null };
const SUPER = "superadmin";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-teal/10 text-teal-dark border-teal/30",
  contacted: "bg-sky-50 text-sky-700 border-sky-200",
  qualified: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-slate-100 text-slate-500 border-slate-200",
};
const SOURCE_LABELS: Record<string, string> = {
  "contact-form": "Contact form",
  consult: "Consult popup",
  "lead-magnet": "Lead magnet",
};

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <p className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</p>
      </div>
      <p className="mt-1.5 font-display text-3xl font-semibold text-navy">{value}</p>
    </Card>
  );
}

/* ------------------------------- Leads ------------------------------- */
function LeadsView() {
  const [source, setSource] = useState("all");
  const { data: inquiries, isLoading } = useQuery<Inquiry[]>({ queryKey: ["/api/admin/inquiries"] });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiRequest("PATCH", `/api/admin/inquiries/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] }),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/inquiries/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/inquiries"] }),
  });

  const all = inquiries ?? [];
  const list = source === "all" ? all : all.filter((i) => (i.source ?? "contact-form") === source);

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Inbox} label="Total" value={all.length} />
        <StatCard icon={Mail} label="Contact form" value={all.filter((i) => (i.source ?? "contact-form") === "contact-form").length} />
        <StatCard icon={CalendarClock} label="Consult" value={all.filter((i) => i.source === "consult").length} />
        <StatCard icon={Download} label="Lead magnet" value={all.filter((i) => i.source === "lead-magnet").length} />
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold">Leads</h2>
        <Select className="h-9 w-44 text-xs" value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="all">All sources</option>
          <option value="contact-form">Contact form</option>
          <option value="consult">Consult popup</option>
          <option value="lead-magnet">Lead magnet</option>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : !list.length ? (
        <Card className="flex flex-col items-center py-16 text-center">
          <span className="icon-tile mb-4"><Inbox className="h-6 w-6 text-teal-dark" /></span>
          <h3 className="font-display text-lg font-semibold">No leads yet</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">New leads from the website appear here automatically.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {list.map((inq) => (
            <Card key={inq.id} className="p-6 transition-shadow hover:shadow-md">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-lg font-semibold">{inq.name}</h3>
                    <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_STYLES[inq.status] ?? STATUS_STYLES.new)}>{inq.status}</span>
                    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{SOURCE_LABELS[inq.source ?? "contact-form"] ?? inq.source}</span>
                    <span className="text-xs text-muted-foreground">{new Date(inq.createdAt).toLocaleString()}</span>
                  </div>
                  {(inq.organization || inq.practiceType) && (
                    <p className="mt-1.5 text-sm font-medium text-foreground/80">
                      {inq.organization}{inq.practiceType ? ` · ${inq.practiceType}` : ""}{inq.state ? ` · ${inq.state}` : ""}
                    </p>
                  )}
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    <a href={`mailto:${inq.email}`} className="text-teal-dark hover:underline">{inq.email}</a>
                    {inq.phone ? ` · ${inq.phone}` : ""}
                  </p>
                  {inq.interest && <p className="mt-2.5 text-sm"><span className="font-medium">Interest:</span> {inq.interest}</p>}
                  {inq.message && <p className="mt-2.5 rounded-lg border border-border/70 bg-muted/60 p-3 text-sm leading-relaxed text-muted-foreground">{inq.message}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Select className="h-9 w-36 text-xs" value={inq.status} onChange={(e) => statusMutation.mutate({ id: inq.id, status: e.target.value })}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="closed">Closed</option>
                  </Select>
                  <Button variant="ghost" size="sm" aria-label={`Delete lead from ${inq.name}`} onClick={() => { if (confirm(`Delete lead from ${inq.name}?`)) deleteMutation.mutate(inq.id); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

/* ----------------------------- Analytics ----------------------------- */
type Stats = {
  totals: { pageViews: number; leads: number; consults: number; downloads: number };
  viewsByPath: { path: string; count: number }[];
  recentDays: { date: string; views: number }[];
};
function AnalyticsView() {
  const { data, isLoading } = useQuery<Stats>({ queryKey: ["/api/admin/stats"] });
  if (isLoading || !data) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  const maxV = Math.max(1, ...data.recentDays.map((d) => d.views));
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Eye} label="Page views" value={data.totals.pageViews} />
        <StatCard icon={Inbox} label="Leads" value={data.totals.leads} />
        <StatCard icon={CalendarClock} label="Consult requests" value={data.totals.consults} />
        <StatCard icon={Download} label="Downloads" value={data.totals.downloads} />
      </div>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Page views, last 14 days</h3>
        <div className="flex h-40 items-end gap-1.5">
          {data.recentDays.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1.5" title={`${d.date}: ${d.views} views`}>
              <div className="flex w-full flex-1 items-end">
                <div className="w-full rounded-t bg-teal/70" style={{ height: `${(d.views / maxV) * 100}%`, minHeight: d.views ? 4 : 0 }} />
              </div>
              <span className="text-[10px] text-muted-foreground">{d.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Top pages</h3>
        {!data.viewsByPath.length ? (
          <p className="text-sm text-muted-foreground">No page views recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {data.viewsByPath.map((p) => (
              <div key={p.path} className="flex items-center justify-between border-b border-border/60 pb-2 text-sm last:border-0">
                <span className="font-medium text-foreground/80">{p.path || "/"}</span>
                <span className="tabular-nums text-muted-foreground">{p.count}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ----------------------------- Settings ------------------------------ */
const SETTING_FIELDS: { key: string; label: string; hint: string; type?: string; superOnly?: boolean }[] = [
  { key: "notify_email", label: "Inquiry alert email", hint: "Where new-lead email alerts are sent." },
  { key: "contact_email", label: "Public contact email", hint: "Shown in the website footer (leave blank to hide)." },
  { key: "contact_phone", label: "Public contact phone", hint: "Shown in the footer (leave blank to hide)." },
  { key: "calendar_url", label: "Consult booking link", hint: "Calendly/Google link the consult 'Book' button opens." },
  { key: "resend_from", label: "Alert 'from' address", hint: "Optional. Defaults to onboarding@resend.dev until you verify a domain." },
  { key: "resend_api_key", label: "Resend API key", hint: "Super admin only. Required to send email alerts. Get a free key at resend.com.", type: "password", superOnly: true },
  { key: "pay_url_monthly", label: "Monthly pay link ($99/mo)", hint: "Paste your PayPal or Stripe payment link for the monthly plan. It powers the Pay button on the Billing tab." },
  { key: "pay_url_annual", label: "Annual pay link ($990/yr)", hint: "Paste your PayPal or Stripe payment link for the annual plan ($990, 2 months free)." },
];
function SettingsView({ me }: { me: Me }) {
  const iAmSuper = me.role === SUPER;
  const fields = SETTING_FIELDS.filter((f) => !f.superOnly || iAmSuper);
  const { data, isLoading } = useQuery<Record<string, string>>({ queryKey: ["/api/admin/settings"] });
  const [form, setForm] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: () => apiRequest("PUT", "/api/admin/settings", form),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/settings/public"] });
    },
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  return (
    <Card className="max-w-xl p-7">
      <h2 className="font-display text-xl font-semibold">Site settings</h2>
      <p className="mt-1 text-sm text-muted-foreground">Change these anytime. Updates go live immediately.</p>
      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => { e.preventDefault(); save.mutate(); }}
      >
        {fields.map((f) => (
          <div key={f.key}>
            <Label htmlFor={f.key}>{f.label}</Label>
            <Input
              id={f.key}
              type={f.type ?? "text"}
              value={form[f.key] ?? ""}
              onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
            />
            <p className="mt-1 text-xs text-muted-foreground">{f.hint}</p>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save settings
          </Button>
          {saved && <span className="text-sm text-teal-dark">Saved.</span>}
          {save.isError && <span className="text-sm text-destructive">Save failed.</span>}
        </div>
      </form>
    </Card>
  );
}

/* ------------------------------ Billing ------------------------------ */
function BillingView() {
  const { data, isLoading } = useQuery<Record<string, string>>({ queryKey: ["/api/admin/settings"] });
  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  const monthly = data?.pay_url_monthly?.trim();
  const annual = data?.pay_url_annual?.trim();
  const configured = monthly || annual;
  return (
    <div className="max-w-xl space-y-6">
      <Card className="overflow-hidden p-0">
        <div className="hero-surface px-7 py-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">Managed Hosting &amp; Maintenance</p>
          <p className="mt-2 font-display text-3xl font-semibold">
            $99 <span className="text-lg font-normal text-white/70">/ month</span>
          </p>
          <p className="mt-1 text-sm text-white/70">or $990 / year paid upfront — 2 months free</p>
        </div>
        <div className="space-y-4 p-7">
          <p className="text-sm text-muted-foreground">
            Secure hosting, uptime monitoring, security updates, backups, and ongoing support for the 2911Rx website.
          </p>
          {configured ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {monthly && (
                <a href={monthly} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="lg" className="w-full"><CreditCard className="h-4 w-4" /> Pay $99 / month</Button>
                </a>
              )}
              {annual && (
                <a href={annual} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full"><CreditCard className="h-4 w-4" /> Pay $990 / year</Button>
                </a>
              )}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">
              No payment link is set yet. Add your monthly and/or annual pay link in the{" "}
              <span className="font-medium text-foreground">Settings</span> tab to turn on the buttons here.
            </p>
          )}
          <p className="text-xs text-muted-foreground">Payments are processed securely on the provider's site. You'll get a receipt by email.</p>
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------- Team -------------------------------- */
type AdminRow = { id: number; email: string; role: string; createdAt: string };

function RoleBadge({ role }: { role: string }) {
  const sup = role === SUPER;
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
      sup ? "border-teal/30 bg-teal/10 text-teal-dark" : "border-border bg-muted text-muted-foreground",
    )}>
      {sup && <ShieldCheck className="h-3 w-3" />}{sup ? "Super Admin" : "Admin"}
    </span>
  );
}

function TeamView({ me }: { me: Me }) {
  const iAmSuper = me.role === SUPER;
  const { data: users, isLoading } = useQuery<AdminRow[]>({ queryKey: ["/api/admin/users"] });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newRole, setNewRole] = useState("admin");
  const [error, setError] = useState("");

  const addUser = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/users", { email, password, role: newRole }),
    onSuccess: () => {
      setEmail(""); setPassword(""); setNewRole("admin"); setError("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: (e: any) => setError(e?.message || "Could not add user"),
  });
  const delUser = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/admin/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] }),
    onError: (e: any) => alert(e?.message || "Could not delete user"),
  });
  const setRole = useMutation({
    mutationFn: ({ id, role }: { id: number; role: string }) => apiRequest("PATCH", `/api/admin/users/${id}/role`, { role }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] }),
    onError: (e: any) => alert(e?.message || "Could not change role"),
  });
  const changePw = async (id: number, label: string) => {
    const pw = prompt(`New password for ${label} (min 8 chars):`);
    if (!pw) return;
    try { await apiRequest("PATCH", `/api/admin/users/${id}/password`, { password: pw }); alert("Password updated."); }
    catch (e: any) { alert(e?.message || "Could not update password"); }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <Card className="p-7">
        <h2 className="font-display text-xl font-semibold">Admin users</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          People who can log in to this dashboard. Super admins have full control and cannot be removed by regular admins.
        </p>
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="mt-5 space-y-2">
            {(users ?? []).map((u) => {
              const isSelf = u.id === me.id;
              const targetSuper = u.role === SUPER;
              // A regular admin can't reset/remove a super admin (but anyone can manage their own password).
              const canManage = iAmSuper || !targetSuper || isSelf;
              const canRemove = !isSelf && (iAmSuper || !targetSuper);
              return (
                <div key={u.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/70 px-4 py-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 truncate text-sm font-medium">
                      {u.email}
                      {isSelf && <span className="text-xs font-normal text-muted-foreground">(you)</span>}
                    </p>
                    <div className="mt-1"><RoleBadge role={u.role} /></div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {iAmSuper && !isSelf && (
                      <Select
                        className="h-9 w-32 text-xs"
                        value={targetSuper ? SUPER : "admin"}
                        onChange={(e) => setRole.mutate({ id: u.id, role: e.target.value })}
                        aria-label={`Role for ${u.email}`}
                      >
                        <option value="admin">Admin</option>
                        <option value={SUPER}>Super Admin</option>
                      </Select>
                    )}
                    {canManage && (
                      <Button variant="outline" size="sm" onClick={() => changePw(u.id, u.email)}>
                        <KeyRound className="h-3.5 w-3.5" /> Password
                      </Button>
                    )}
                    {canRemove && (
                      <Button variant="ghost" size="sm" aria-label={`Remove ${u.email}`} onClick={() => { if (confirm(`Remove ${u.email}?`)) delUser.mutate(u.id); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Card className="p-7">
        <h3 className="font-display text-lg font-semibold">Add an admin</h3>
        <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); addUser.mutate(); }}>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password (min 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} />
          {iAmSuper && (
            <div>
              <Label htmlFor="new-role">Role</Label>
              <Select id="new-role" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
                <option value="admin">Admin — company owner access</option>
                <option value={SUPER}>Super Admin — full control</option>
              </Select>
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={addUser.isPending}>
            {addUser.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Add {newRole === SUPER ? "super admin" : "admin"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

/* ------------------------------ Shell -------------------------------- */
const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "leads", label: "Leads", icon: Inbox },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: SettingsIcon },
  { id: "team", label: "Team", icon: UsersIcon },
];

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("leads");
  const { data: me, isLoading: meLoading } = useQuery<Me>({ queryKey: ["/api/admin/me"] });

  useEffect(() => {
    if (!meLoading && me && !me.isAdmin) navigate("/admin");
  }, [me, meLoading, navigate]);

  const logout = async () => { await apiRequest("POST", "/api/admin/logout"); navigate("/admin"); };

  if (meLoading || !me?.isAdmin) {
    return <div className="flex min-h-screen items-center justify-center bg-muted"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="hero-surface text-white">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo dark />
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
              {me.role === SUPER ? "Super Admin" : "Admin"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {me.email && <span className="hidden text-sm text-white/60 sm:inline">{me.email}</span>}
            <Button variant="light" size="sm" onClick={logout}><LogOut className="h-4 w-4" /> Sign Out</Button>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <nav className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  tab === t.id ? "border-teal-light text-white" : "border-transparent text-white/55 hover:text-white/85",
                )}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        {tab === "leads" && <LeadsView />}
        {tab === "analytics" && <AnalyticsView />}
        {tab === "billing" && <BillingView />}
        {tab === "settings" && <SettingsView me={me} />}
        {tab === "team" && <TeamView me={me} />}
      </main>
    </div>
  );
}

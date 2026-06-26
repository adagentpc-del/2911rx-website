import {
  type Inquiry,
  type InsertInquiry,
  type InsertLead,
  type AdminUser,
  inquiries,
  adminUsers,
  settings,
  events,
} from "@shared/schema";

export type AdminSummary = Pick<AdminUser, "id" | "email" | "role" | "createdAt">;

export type EventStats = {
  totals: { pageViews: number; leads: number; consults: number; downloads: number };
  viewsByPath: { path: string; count: number }[];
  recentDays: { date: string; views: number }[];
};

export interface IStorage {
  // leads
  createInquiry(data: InsertInquiry): Promise<Inquiry>;
  createLead(data: InsertLead): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
  deleteInquiry(id: number): Promise<boolean>;
  // admin users
  countAdmins(): Promise<number>;
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdmin(email: string, passwordHash: string, role: string): Promise<AdminSummary>;
  listAdmins(): Promise<AdminSummary[]>;
  getAdminById(id: number): Promise<AdminSummary | undefined>;
  updateAdminPassword(id: number, passwordHash: string): Promise<boolean>;
  updateAdminRole(id: number, role: string): Promise<boolean>;
  deleteAdmin(id: number): Promise<boolean>;
  // settings
  getSettings(): Promise<Record<string, string>>;
  setSetting(key: string, value: string): Promise<void>;
  // events
  logEvent(type: string, path?: string | null): Promise<void>;
  getEventStats(): Promise<EventStats>;
}

function buildStats(rows: { type: string; path: string | null; createdAt: Date }[]): EventStats {
  const totals = { pageViews: 0, leads: 0, consults: 0, downloads: 0 };
  const byPath = new Map<string, number>();
  const byDay = new Map<string, number>();
  for (const r of rows) {
    if (r.type === "page_view") {
      totals.pageViews++;
      if (r.path) byPath.set(r.path, (byPath.get(r.path) ?? 0) + 1);
      const d = new Date(r.createdAt).toISOString().slice(0, 10);
      byDay.set(d, (byDay.get(d) ?? 0) + 1);
    } else if (r.type === "lead") totals.leads++;
    else if (r.type === "consult") totals.consults++;
    else if (r.type === "download") totals.downloads++;
  }
  const viewsByPath = Array.from(byPath.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
  const recentDays: { date: string; views: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    recentDays.push({ date: key, views: byDay.get(key) ?? 0 });
  }
  return { totals, viewsByPath, recentDays };
}

/** In-memory storage, used automatically when DATABASE_URL is not set. */
class MemStorage implements IStorage {
  private items: Inquiry[] = [];
  private admins: AdminUser[] = [];
  private settingsMap = new Map<string, string>();
  private eventRows: { type: string; path: string | null; createdAt: Date }[] = [];
  private nextId = 1;
  private nextAdminId = 1;

  private makeInquiry(d: Partial<Inquiry> & { name: string; email: string; source: string }): Inquiry {
    const inquiry: Inquiry = {
      id: this.nextId++,
      name: d.name,
      email: d.email,
      phone: d.phone ?? null,
      organization: d.organization ?? null,
      practiceType: d.practiceType ?? null,
      state: d.state ?? null,
      interest: d.interest ?? null,
      message: d.message ?? null,
      source: d.source,
      status: "new",
      createdAt: new Date(),
    };
    this.items.unshift(inquiry);
    return inquiry;
  }

  async createInquiry(data: InsertInquiry): Promise<Inquiry> {
    return this.makeInquiry({ ...data, source: "contact-form" });
  }
  async createLead(data: InsertLead): Promise<Inquiry> {
    return this.makeInquiry({ ...data });
  }
  async getInquiries(): Promise<Inquiry[]> {
    return [...this.items];
  }
  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const item = this.items.find((i) => i.id === id);
    if (item) item.status = status;
    return item;
  }
  async deleteInquiry(id: number): Promise<boolean> {
    const before = this.items.length;
    this.items = this.items.filter((i) => i.id !== id);
    return this.items.length < before;
  }

  async countAdmins(): Promise<number> {
    return this.admins.length;
  }
  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    return this.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  }
  async createAdmin(email: string, passwordHash: string, role: string): Promise<AdminSummary> {
    const a: AdminUser = { id: this.nextAdminId++, email, passwordHash, role, createdAt: new Date() };
    this.admins.push(a);
    return { id: a.id, email: a.email, role: a.role, createdAt: a.createdAt };
  }
  async listAdmins(): Promise<AdminSummary[]> {
    return this.admins.map((a) => ({ id: a.id, email: a.email, role: a.role, createdAt: a.createdAt }));
  }
  async getAdminById(id: number): Promise<AdminSummary | undefined> {
    const a = this.admins.find((x) => x.id === id);
    return a ? { id: a.id, email: a.email, role: a.role, createdAt: a.createdAt } : undefined;
  }
  async updateAdminPassword(id: number, passwordHash: string): Promise<boolean> {
    const a = this.admins.find((x) => x.id === id);
    if (a) a.passwordHash = passwordHash;
    return !!a;
  }
  async updateAdminRole(id: number, role: string): Promise<boolean> {
    const a = this.admins.find((x) => x.id === id);
    if (a) a.role = role;
    return !!a;
  }
  async deleteAdmin(id: number): Promise<boolean> {
    const before = this.admins.length;
    this.admins = this.admins.filter((a) => a.id !== id);
    return this.admins.length < before;
  }

  async getSettings(): Promise<Record<string, string>> {
    return Object.fromEntries(this.settingsMap);
  }
  async setSetting(key: string, value: string): Promise<void> {
    this.settingsMap.set(key, value);
  }

  async logEvent(type: string, path?: string | null): Promise<void> {
    this.eventRows.push({ type, path: path ?? null, createdAt: new Date() });
  }
  async getEventStats(): Promise<EventStats> {
    return buildStats(this.eventRows);
  }
}

/** PostgreSQL storage via Drizzle, used when DATABASE_URL is set. */
class DatabaseStorage implements IStorage {
  private dbPromise: Promise<any>;

  constructor(databaseUrl: string) {
    this.dbPromise = (async () => {
      const { drizzle } = await import("drizzle-orm/node-postgres");
      const pgMod = await import("pg");
      const Pool = pgMod.default?.Pool ?? (pgMod as any).Pool;
      const pool = new Pool({ connectionString: databaseUrl });
      return drizzle(pool);
    })();
  }

  async createInquiry(data: InsertInquiry): Promise<Inquiry> {
    const db = await this.dbPromise;
    const [row] = await db.insert(inquiries).values({ ...data, source: "contact-form" }).returning();
    return row;
  }
  async createLead(data: InsertLead): Promise<Inquiry> {
    const db = await this.dbPromise;
    const [row] = await db.insert(inquiries).values(data).returning();
    return row;
  }
  async getInquiries(): Promise<Inquiry[]> {
    const db = await this.dbPromise;
    const { desc } = await import("drizzle-orm");
    return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }
  async updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined> {
    const db = await this.dbPromise;
    const { eq } = await import("drizzle-orm");
    const [row] = await db.update(inquiries).set({ status }).where(eq(inquiries.id, id)).returning();
    return row;
  }
  async deleteInquiry(id: number): Promise<boolean> {
    const db = await this.dbPromise;
    const { eq } = await import("drizzle-orm");
    const rows = await db.delete(inquiries).where(eq(inquiries.id, id)).returning();
    return rows.length > 0;
  }

  async countAdmins(): Promise<number> {
    const db = await this.dbPromise;
    const rows = await db.select({ id: adminUsers.id }).from(adminUsers);
    return rows.length;
  }
  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const db = await this.dbPromise;
    const { eq, sql } = await import("drizzle-orm");
    const [row] = await db
      .select()
      .from(adminUsers)
      .where(eq(sql`lower(${adminUsers.email})`, email.toLowerCase()));
    return row;
  }
  async createAdmin(email: string, passwordHash: string, role: string): Promise<AdminSummary> {
    const db = await this.dbPromise;
    const [row] = await db
      .insert(adminUsers)
      .values({ email, passwordHash, role })
      .returning({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role, createdAt: adminUsers.createdAt });
    return row;
  }
  async listAdmins(): Promise<AdminSummary[]> {
    const db = await this.dbPromise;
    const { desc } = await import("drizzle-orm");
    return db
      .select({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role, createdAt: adminUsers.createdAt })
      .from(adminUsers)
      .orderBy(desc(adminUsers.createdAt));
  }
  async getAdminById(id: number): Promise<AdminSummary | undefined> {
    const db = await this.dbPromise;
    const { eq } = await import("drizzle-orm");
    const [row] = await db
      .select({ id: adminUsers.id, email: adminUsers.email, role: adminUsers.role, createdAt: adminUsers.createdAt })
      .from(adminUsers)
      .where(eq(adminUsers.id, id));
    return row;
  }
  async updateAdminPassword(id: number, passwordHash: string): Promise<boolean> {
    const db = await this.dbPromise;
    const { eq } = await import("drizzle-orm");
    const rows = await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, id)).returning();
    return rows.length > 0;
  }
  async updateAdminRole(id: number, role: string): Promise<boolean> {
    const db = await this.dbPromise;
    const { eq } = await import("drizzle-orm");
    const rows = await db.update(adminUsers).set({ role }).where(eq(adminUsers.id, id)).returning();
    return rows.length > 0;
  }
  async deleteAdmin(id: number): Promise<boolean> {
    const db = await this.dbPromise;
    const { eq } = await import("drizzle-orm");
    const rows = await db.delete(adminUsers).where(eq(adminUsers.id, id)).returning();
    return rows.length > 0;
  }

  async getSettings(): Promise<Record<string, string>> {
    const db = await this.dbPromise;
    const rows = await db.select().from(settings);
    const out: Record<string, string> = {};
    for (const r of rows) if (r.value != null) out[r.key] = r.value;
    return out;
  }
  async setSetting(key: string, value: string): Promise<void> {
    const db = await this.dbPromise;
    const { sql } = await import("drizzle-orm");
    await db
      .insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value: sql`excluded.value` } });
  }

  async logEvent(type: string, path?: string | null): Promise<void> {
    const db = await this.dbPromise;
    await db.insert(events).values({ type, path: path ?? null });
  }
  async getEventStats(): Promise<EventStats> {
    const db = await this.dbPromise;
    const { desc } = await import("drizzle-orm");
    const rows = await db
      .select({ type: events.type, path: events.path, createdAt: events.createdAt })
      .from(events)
      .orderBy(desc(events.createdAt))
      .limit(20000);
    return buildStats(rows);
  }
}

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage(process.env.DATABASE_URL)
  : new MemStorage();

if (!process.env.DATABASE_URL) {
  console.log("[storage] DATABASE_URL not set, using in-memory storage (data resets on restart)");
}

import { type Inquiry, type InsertInquiry, inquiries } from "@shared/schema";

export interface IStorage {
  createInquiry(data: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  updateInquiryStatus(id: number, status: string): Promise<Inquiry | undefined>;
  deleteInquiry(id: number): Promise<boolean>;
}

/** In-memory storage — used automatically when DATABASE_URL is not set. */
class MemStorage implements IStorage {
  private items: Inquiry[] = [];
  private nextId = 1;

  async createInquiry(data: InsertInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: this.nextId++,
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      organization: data.organization,
      practiceType: data.practiceType,
      state: data.state ?? null,
      interest: data.interest,
      message: data.message ?? null,
      status: "new",
      createdAt: new Date(),
    };
    this.items.unshift(inquiry);
    return inquiry;
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
}

/** PostgreSQL storage via Drizzle — used when DATABASE_URL is set. */
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
    const [row] = await db
      .update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, id))
      .returning();
    return row;
  }

  async deleteInquiry(id: number): Promise<boolean> {
    const db = await this.dbPromise;
    const { eq } = await import("drizzle-orm");
    const rows = await db.delete(inquiries).where(eq(inquiries.id, id)).returning();
    return rows.length > 0;
  }
}

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage(process.env.DATABASE_URL)
  : new MemStorage();

if (!process.env.DATABASE_URL) {
  console.log("[storage] DATABASE_URL not set — using in-memory storage (inquiries reset on restart)");
}

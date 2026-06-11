import express from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes } from "./routes";

// Works in both dev (ESM via tsx) and production (CJS bundle via esbuild)
const currentDir =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));
const app = express();
const MemoryStore = createMemoryStore(session);

app.use(express.json());
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "2911rx-dev-secret",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({ checkPeriod: 86400000 }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8,
    },
  }),
);

registerRoutes(app);

const port = Number(process.env.PORT) || 5000;

async function start() {
  if (process.env.NODE_ENV === "production") {
    // Serve built client
    const publicDir = path.resolve(currentDir, "public");
    app.use(express.static(publicDir));
    app.use((_req, res) => res.sendFile(path.join(publicDir, "index.html")));
  } else {
    // Vite dev middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`2911Rx serving on http://0.0.0.0:${port}`);
  });
}

start();

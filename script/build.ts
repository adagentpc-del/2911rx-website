import { build as viteBuild } from "vite";
import { build as esbuildBuild } from "esbuild";

async function main() {
  // 1. Build client
  await viteBuild();

  // 2. Bundle server
  await esbuildBuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    external: ["pg-native", "bufferutil", "utf-8-validate", "lightningcss", "vite", "@vitejs/*", "@replit/*"],
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "info",
  });

  console.log("Build complete: dist/public (client) + dist/index.cjs (server)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

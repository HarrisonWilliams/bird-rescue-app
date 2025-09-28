#!/usr/bin/env node
import { spawn } from "node:child_process";
import { rm, mkdir, readdir, stat, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function run(command, args, options = {}) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function copyDirectory(src, dest) {
  if (!(await exists(src))) {
    return;
  }
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else if (entry.isFile()) {
        await mkdir(path.dirname(destPath), { recursive: true });
        await copyFile(srcPath, destPath);
      }
    }),
  );
}

function sanitizeSegments(relativePath) {
  return relativePath
    .split("/")
    .filter((segment) => segment && !segment.startsWith("(") && !segment.startsWith("@"))
    .join("/");
}

function htmlDestination(relativePath) {
  const cleaned = sanitizeSegments(relativePath.replace(/\\/g, "/"));
  if (cleaned === "index.html" || cleaned === "page.html") {
    return "index.html";
  }
  if (cleaned === "_not-found.html" || cleaned === "_not-found/page.html") {
    return "404.html";
  }
  if (cleaned.endsWith("/_not-found.html")) {
    return cleaned.replace(/\/_not-found\.html$/, "/404.html");
  }
  if (cleaned.endsWith(".html")) {
    const base = cleaned.slice(0, -".html".length);
    return base.length > 0 ? `${base}/index.html` : "index.html";
  }
  return cleaned;
}

async function copyAppHtml(staticDir) {
  const appDir = path.join(process.cwd(), ".next", "server", "app");
  if (!(await exists(appDir))) {
    return;
  }
  async function walk(currentDir) {
    const dirEntries = await readdir(currentDir, { withFileTypes: true });
    await Promise.all(
      dirEntries.map(async (entry) => {
        const entryPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walk(entryPath);
        } else if (entry.isFile() && entry.name.endsWith(".html")) {
          const relative = path.relative(appDir, entryPath).replace(/\\/g, "/");
          const destRelative = htmlDestination(relative);
          const destination = path.join(staticDir, destRelative);
          await mkdir(path.dirname(destination), { recursive: true });
          await copyFile(entryPath, destination);
        }
      }),
    );
  }
  await walk(appDir);
}

async function writeConfig(outputRoot) {
  const configPath = path.join(outputRoot, "config.json");
  const config = {
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/.*", dest: "/404.html", status: 404 },
    ],
  };
  await mkdir(path.dirname(configPath), { recursive: true });
  await writeFile(configPath, JSON.stringify(config, null, 2));
}

async function main() {
  const root = process.cwd();
  const nextBin = process.platform === "win32"
    ? path.join(root, "node_modules", ".bin", "next.cmd")
    : path.join(root, "node_modules", ".bin", "next");

  await run(nextBin, ["build"], { env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" } });

  const outputRoot = path.join(root, ".vercel", "output");
  const staticDir = path.join(outputRoot, "static");
  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(staticDir, { recursive: true });

  await copyDirectory(path.join(root, "public"), staticDir);
  await copyDirectory(path.join(root, ".next", "static"), path.join(staticDir, "_next", "static"));
  await copyAppHtml(staticDir);
  await writeConfig(outputRoot);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { spawnSync } from "node:child_process";

const isWindows = process.platform === "win32";
const npxCommand = isWindows ? "npx.cmd" : "npx";

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env,
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (typeof result.status === "number") {
    process.exit(result.status);
  }

  process.exit(0);
}

if (process.env.NEXT_ON_PAGES_BUILD === "1") {
  run(npxCommand, ["next", "build"]);
} else {
  run(npxCommand, ["@cloudflare/next-on-pages@1"], {
    ...process.env,
    NEXT_ON_PAGES_BUILD: "1",
  });
}

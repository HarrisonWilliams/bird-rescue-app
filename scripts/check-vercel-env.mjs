#!/usr/bin/env node
import process from "node:process";

const token = process.env.VERCEL_TOKEN ?? "";
if (!token.trim()) {
  console.error("\nCloudflare Pages build requires the Vercel CLI to authenticate in order to run `vercel build`.\n" +
    "Set the VERCEL_TOKEN environment variable with a valid token or switch to an OpenNext-based build.\n" +
    "Docs: https://vercel.com/docs/cli/configuration#tokens\n");
  process.exit(1);
}

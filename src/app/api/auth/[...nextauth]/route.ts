

import { NextResponse } from "next/server";

export const runtime = "edge";

function notConfigured(method: string) {
  return NextResponse.json(
    {
      error: "NextAuth is not configured",
      message: `Received ${method} request but no auth providers are set up yet.`,
    },
    { status: 501 }
  );
}

export async function GET() {
  return notConfigured("GET");
}

export async function POST() {
  return notConfigured("POST");
}


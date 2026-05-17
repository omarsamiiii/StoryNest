import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { persistenceHealthService } from "@/lib/persistence/persistence-health";

export async function GET() {
  await requireUser();
  return NextResponse.json(await persistenceHealthService.check());
}


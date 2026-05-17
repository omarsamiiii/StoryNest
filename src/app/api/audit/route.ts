import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await repositories.auditLogs.timeline(user.id));
}

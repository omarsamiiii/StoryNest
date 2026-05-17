import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { usageService } from "@/lib/services/usage-service";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await usageService.summary(user.id));
}

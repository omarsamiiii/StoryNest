import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { readingInsightsService } from "@/lib/analytics/reading-insights-service";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await readingInsightsService.report(user.id));
}

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { milestoneService } from "@/lib/milestones/milestone-service";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await milestoneService.report(user.id));
}


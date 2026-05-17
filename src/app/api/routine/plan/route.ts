import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { routinePlannerService } from "@/lib/services/routine-planner-service";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await routinePlannerService.plan(user.id));
}

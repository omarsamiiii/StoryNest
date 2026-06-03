import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { moodCheckInService } from "@/lib/wellbeing/mood-checkin-service";
import { moodCheckInInputSchema } from "@/validation/wellbeing";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await moodCheckInService.dashboard(user.id));
}

export async function POST(request: Request) {
  const user = await requireUser();
  const input = moodCheckInInputSchema.parse(await request.json());
  return NextResponse.json(await moodCheckInService.create(user.id, input), { status: 201 });
}


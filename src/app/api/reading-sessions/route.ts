import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { readingSessionService } from "@/lib/wellbeing/reading-session-service";
import { readingSessionInputSchema } from "@/validation/wellbeing";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await readingSessionService.summary(user.id));
}

export async function POST(request: Request) {
  const user = await requireUser();
  const input = readingSessionInputSchema.parse(await request.json());
  return NextResponse.json(await readingSessionService.record(user.id, input), { status: 201 });
}


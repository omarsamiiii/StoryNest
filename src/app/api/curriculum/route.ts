import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { curriculumService } from "@/lib/curriculum/curriculum-service";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json({
    plan: await curriculumService.buildPlan(user.id),
    tracks: curriculumService.listTracks(),
    lessons: curriculumService.listLessons()
  });
}


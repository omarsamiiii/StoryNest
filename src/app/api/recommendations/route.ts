import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { storyRecommendationService } from "@/lib/recommendations/story-recommendation-service";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await storyRecommendationService.board(user.id));
}


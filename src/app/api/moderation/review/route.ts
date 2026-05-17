import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { storyReviewService } from "@/lib/moderation/story-review-service";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = (await request.json()) as { storyId: string };
  const review = await storyReviewService.reviewStory(user.id, body.storyId);
  return NextResponse.json(review, { status: 201 });
}

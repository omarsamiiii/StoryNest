import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { storyGenerationService } from "@/lib/services/story-generation-service";
import { storyGenerationInputSchema } from "@/validation/story";

export async function POST(request: Request) {
  const user = await requireUser();
  const input = storyGenerationInputSchema.parse(await request.json());
  const story = await storyGenerationService.generate({ ...input, userId: user.id });
  return NextResponse.json(story, { status: 201 });
}

"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { storyGenerationService } from "@/lib/services/story-generation-service";
import { storyGenerationInputSchema } from "@/validation/story";

export async function generateStoryAction(formData: FormData) {
  const user = await requireUser();
  const input = storyGenerationInputSchema.parse({
    childProfileId: formData.get("childProfileId"),
    theme: formData.get("theme"),
    lesson: formData.get("lesson"),
    length: formData.get("length"),
    tone: formData.get("tone"),
    bedtimeSafe: formData.get("bedtimeSafe") === "on",
    extraInstructions: formData.get("extraInstructions")
  });
  const story = await storyGenerationService.generate({ ...input, userId: user.id });
  redirect(`/app/stories/${story.id}`);
}

export async function favoriteStoryAction(formData: FormData) {
  const user = await requireUser();
  const storyId = String(formData.get("storyId"));
  const favorite = formData.get("favorite") === "true";
  await repositories.stories.setFavorite(user.id, storyId, favorite);
  redirect(`/app/stories/${storyId}`);
}

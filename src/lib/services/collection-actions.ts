"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { storyCollectionService } from "@/lib/services/story-collection-service";
import { collectionInputSchema, collectionStoryInputSchema } from "@/validation/collections";

export async function createCollectionAction(formData: FormData) {
  const user = await requireUser();
  const input = collectionInputSchema.parse({
    name: formData.get("name"),
    description: formData.get("description")
  });
  await storyCollectionService.create(user.id, input);
  redirect("/app/collections");
}

export async function addStoryToCollectionAction(formData: FormData) {
  const user = await requireUser();
  const input = collectionStoryInputSchema.parse({
    collectionId: formData.get("collectionId"),
    storyId: formData.get("storyId")
  });
  await storyCollectionService.addStory(user.id, input.collectionId, input.storyId);
  redirect(`/app/collections/${input.collectionId}`);
}

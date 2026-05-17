"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { coloringPageService } from "@/lib/services/coloring-page-service";

export async function generateColoringPagesAction(formData: FormData) {
  const user = await requireUser();
  const storyId = String(formData.get("storyId"));
  await coloringPageService.generateForStory(user.id, storyId, 3);
  redirect(`/app/stories/${storyId}/coloring`);
}

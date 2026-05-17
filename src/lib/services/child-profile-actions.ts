"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { PLAN_LIMITS } from "@/constants/plans";
import { repositories } from "@/lib/repositories";
import { childProfileInputSchema } from "@/validation/children";

function interestsFromForm(formData: FormData) {
  return formData.getAll("interests").map(String);
}

export async function createChildProfileAction(formData: FormData) {
  const user = await requireUser();
  const subscription = await repositories.subscriptions.ensureForUser(user.id);
  const existing = await repositories.children.listByUser(user.id);
  if (existing.length >= PLAN_LIMITS[subscription.planId].childProfiles) {
    throw new Error("Your current plan has reached its child profile limit.");
  }

  const input = childProfileInputSchema.parse({
    nickname: formData.get("nickname"),
    ageRange: formData.get("ageRange"),
    interests: interestsFromForm(formData),
    preferredTone: formData.get("preferredTone"),
    bedtimeSafeDefault: formData.get("bedtimeSafeDefault") === "on"
  });
  await repositories.children.create(user.id, input);
  redirect("/app/children");
}

export async function updateChildProfileAction(id: string, formData: FormData) {
  const user = await requireUser();
  const input = childProfileInputSchema.parse({
    nickname: formData.get("nickname"),
    ageRange: formData.get("ageRange"),
    interests: interestsFromForm(formData),
    preferredTone: formData.get("preferredTone"),
    bedtimeSafeDefault: formData.get("bedtimeSafeDefault") === "on"
  });
  await repositories.children.update(user.id, id, input);
  redirect("/app/children");
}

export async function deleteChildProfileAction(formData: FormData) {
  const user = await requireUser();
  await repositories.children.delete(user.id, String(formData.get("id")));
  redirect("/app/children");
}

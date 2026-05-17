"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { routinePreferencesInputSchema } from "@/validation/routine";

export async function saveRoutinePreferencesAction(formData: FormData) {
  const user = await requireUser();
  const input = routinePreferencesInputSchema.parse({
    childProfileId: formData.get("childProfileId"),
    cadence: formData.get("cadence"),
    preferredMinutes: formData.get("preferredMinutes"),
    preferredTone: formData.get("preferredTone"),
    includeColoring: formData.get("includeColoring") === "on",
    quietStartMinutes: formData.get("quietStartMinutes"),
    lightsOutReminder: formData.get("lightsOutReminder") === "on"
  });
  await repositories.routinePreferences.upsert(user.id, input);
  redirect("/app/routine");
}

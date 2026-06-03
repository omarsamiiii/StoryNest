"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { moodCheckInService } from "@/lib/wellbeing/mood-checkin-service";
import { readingSessionService } from "@/lib/wellbeing/reading-session-service";
import { moodCheckInInputSchema, readingSessionInputSchema } from "@/validation/wellbeing";

export async function createMoodCheckInAction(formData: FormData) {
  const user = await requireUser();
  const input = moodCheckInInputSchema.parse(Object.fromEntries(formData.entries()));
  await moodCheckInService.create(user.id, input);
  revalidatePath("/app/check-ins");
  redirect("/app/check-ins");
}

export async function createReadingSessionAction(formData: FormData) {
  const user = await requireUser();
  const input = readingSessionInputSchema.parse(Object.fromEntries(formData.entries()));
  await readingSessionService.record(user.id, input);
  revalidatePath("/app/reading-log");
  redirect("/app/reading-log");
}


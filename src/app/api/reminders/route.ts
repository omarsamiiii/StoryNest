import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { reminderService } from "@/lib/notifications/reminder-service";
import { repositories } from "@/lib/repositories";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json({
    previews: await reminderService.preview(user.id),
    reminders: await repositories.bedtimeReminders.listByUser(user.id)
  });
}

export async function POST() {
  const user = await requireUser();
  const reminders = await reminderService.scheduleWeekly(user.id);
  return NextResponse.json(reminders, { status: 201 });
}

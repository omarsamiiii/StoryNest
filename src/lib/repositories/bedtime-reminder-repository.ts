import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { BedtimeReminder, ReminderChannel, ReminderStatus } from "@/types/notifications";

export class BedtimeReminderRepository {
  async schedule(input: {
    userId: string;
    childProfileId: string;
    channel: ReminderChannel;
    localTime: string;
    message: string;
    scheduledForDay: string;
  }): Promise<BedtimeReminder> {
    const timestamp = nowIso();
    const reminder: BedtimeReminder = {
      id: createId("reminder"),
      userId: input.userId,
      childProfileId: input.childProfileId,
      channel: input.channel,
      status: "scheduled",
      localTime: input.localTime,
      message: input.message,
      scheduledForDay: input.scheduledForDay,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    getLocalStore().bedtimeReminders.push(reminder);
    return reminder;
  }

  async listByUser(userId: string) {
    return getLocalStore()
      .bedtimeReminders.filter((reminder) => reminder.userId === userId)
      .sort((a, b) => a.scheduledForDay.localeCompare(b.scheduledForDay));
  }

  async updateStatus(userId: string, id: string, status: ReminderStatus) {
    const reminder =
      getLocalStore().bedtimeReminders.find(
        (item) => item.userId === userId && item.id === id
      ) ?? null;
    if (!reminder) return null;
    reminder.status = status;
    reminder.updatedAt = nowIso();
    return reminder;
  }
}

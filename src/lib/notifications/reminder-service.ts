import { ROUTINE_DAYS, WIND_DOWN_LIBRARY } from "@/constants/routine";
import { repositories } from "@/lib/repositories";
import type { ReminderPreview } from "@/types/notifications";

export class ReminderService {
  async preview(userId: string): Promise<ReminderPreview[]> {
    const [children, preferences] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.routinePreferences.listByUser(userId)
    ]);
    return children.map((child, index) => {
      const preference = preferences.find((item) => item.childProfileId === child.id);
      const localTime = preference?.preferredMinutes && preference.preferredMinutes > 10 ? "19:15" : "19:30";
      return {
        childNickname: child.nickname,
        localTime,
        message: `Tonight's StoryNest wind-down for ${child.nickname} starts at ${localTime}.`,
        windDownSuggestion: WIND_DOWN_LIBRARY[index % WIND_DOWN_LIBRARY.length]
      };
    });
  }

  async scheduleWeekly(userId: string) {
    const previews = await this.preview(userId);
    const children = await repositories.children.listByUser(userId);
    const reminders = [];
    for (const day of ROUTINE_DAYS) {
      for (const preview of previews) {
        const child = children.find((profile) => profile.nickname === preview.childNickname);
        if (!child) continue;
        reminders.push(
          await repositories.bedtimeReminders.schedule({
            userId,
            childProfileId: child.id,
            channel: "in_app",
            localTime: preview.localTime,
            scheduledForDay: day,
            message: `${day}: ${preview.message} ${preview.windDownSuggestion}`
          })
        );
      }
    }
    await repositories.auditLogs.record({
      userId,
      action: "reminder.schedule",
      entityType: "bedtime_reminder",
      metadata: { count: reminders.length }
    });
    return reminders;
  }
}

export const reminderService = new ReminderService();

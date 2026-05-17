import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { reminderService } from "@/lib/notifications/reminder-service";
import { repositories } from "@/lib/repositories";

describe("ReminderService", () => {
  beforeEach(() => resetLocalStore());

  it("previews and schedules weekly parent reminders", async () => {
    await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["space"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });

    const previews = await reminderService.preview("user_1");
    const reminders = await reminderService.scheduleWeekly("user_1");

    expect(previews).toHaveLength(1);
    expect(reminders).toHaveLength(7);
    expect(reminders[0]?.message).toContain("Mira");
  });
});

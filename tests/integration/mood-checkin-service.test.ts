import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { moodCheckInService } from "@/lib/wellbeing/mood-checkin-service";
import { repositories } from "@/lib/repositories";

describe("MoodCheckInService", () => {
  beforeEach(() => resetLocalStore());

  it("saves mood check-ins with story suggestions and audit history", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["magic"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });

    const checkIn = await moodCheckInService.create("user_1", {
      childProfileId: child.id,
      mood: "worried",
      energyLevel: 4,
      parentNote: "Needed reassurance."
    });
    const audits = await repositories.auditLogs.listByUser("user_1");

    expect(checkIn).toMatchObject({
      mood: "worried",
      suggestedTone: "calm",
      suggestedTheme: "brave-small cloud castle"
    });
    expect(audits[0]).toMatchObject({ action: "mood.checkin", entityId: checkIn.id });
  });
});


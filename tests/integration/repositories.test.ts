import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";

describe("repositories", () => {
  beforeEach(() => resetLocalStore());

  it("creates and updates child profiles for one user", async () => {
    const profile = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["space"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });

    await repositories.children.update("user_1", profile.id, {
      nickname: "Mo",
      ageRange: "5-6",
      interests: ["space", "magic"],
      preferredTone: "magical",
      bedtimeSafeDefault: true
    });

    const profiles = await repositories.children.listByUser("user_1");
    expect(profiles).toHaveLength(1);
    expect(profiles[0]?.nickname).toBe("Mo");
  });
});

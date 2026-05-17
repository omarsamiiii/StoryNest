import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";

const profileInput = {
  nickname: "Mira",
  ageRange: "5-6" as const,
  interests: ["space" as const],
  preferredTone: "calm" as const,
  bedtimeSafeDefault: true
};

describe("ChildProfileRepository isolation", () => {
  beforeEach(() => resetLocalStore());

  it("does not expose one parent's child profiles to another parent", async () => {
    const first = await repositories.children.create("user_1", profileInput);
    await repositories.children.create("user_2", { ...profileInput, nickname: "Nora" });

    await expect(repositories.children.listByUser("user_1")).resolves.toEqual([first]);
  });

  it("does not update a profile owned by a different parent", async () => {
    const profile = await repositories.children.create("user_1", profileInput);

    const updated = await repositories.children.update("user_2", profile.id, {
      ...profileInput,
      nickname: "Changed"
    });

    expect(updated).toBeNull();
    await expect(repositories.children.findById("user_1", profile.id)).resolves.toMatchObject({
      nickname: "Mira"
    });
  });

  it("returns whether deletion actually removed a profile", async () => {
    const profile = await repositories.children.create("user_1", profileInput);

    await expect(repositories.children.delete("user_2", profile.id)).resolves.toBe(false);
    await expect(repositories.children.delete("user_1", profile.id)).resolves.toBe(true);
    await expect(repositories.children.listByUser("user_1")).resolves.toEqual([]);
  });
});

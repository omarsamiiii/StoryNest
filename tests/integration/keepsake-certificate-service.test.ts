import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { keepsakeCertificateService } from "@/lib/wellbeing/keepsake-certificate-service";
import { readingSessionService } from "@/lib/wellbeing/reading-session-service";
import { repositories } from "@/lib/repositories";
import { fixtureStory } from "../fixtures/story";

describe("KeepsakeCertificateService", () => {
  beforeEach(() => resetLocalStore());

  it("creates private printable certificates from story and session activity", async () => {
    const child = await repositories.children.create("user_1", {
      nickname: "Mira",
      ageRange: "5-6",
      interests: ["magic", "nature"],
      preferredTone: "calm",
      bedtimeSafeDefault: true
    });
    const story = await repositories.stories.save(
      fixtureStory({
        id: "story_1",
        userId: "user_1",
        childProfileId: child.id,
        favorite: true
      })
    );
    await readingSessionService.record("user_1", {
      childProfileId: child.id,
      storyId: story.id,
      reaction: "sleepy",
      minutesRead: 7,
      parentNote: "",
      favoriteMoment: "The glowing lantern"
    });

    const certificates = await keepsakeCertificateService.certificates("user_1");

    expect(certificates).toHaveLength(1);
    expect(certificates[0]).toMatchObject({
      childNickname: "Mira",
      title: "Mira's StoryNest Star",
      achievement: "1 saved stories and 7 reading minutes"
    });
    expect(certificates[0]?.detailLines).toContain("Favorite stories saved: 1");
  });
});


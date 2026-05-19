import { describe, expect, it } from "vitest";
import { MilestoneService } from "@/lib/milestones/milestone-service";
import type { ChildProfile } from "@/types/children";
import { fixtureStory } from "../fixtures/story";

const child: ChildProfile = {
  id: "child_1",
  userId: "user_1",
  nickname: "Mira",
  ageRange: "5-6",
  interests: ["magic", "nature"],
  preferredTone: "calm",
  bedtimeSafeDefault: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};

describe("MilestoneService", () => {
  it("builds child boards with achieved milestone progress", () => {
    const service = new MilestoneService();
    const stories = [
      fixtureStory({
        id: "story_1",
        childProfileId: child.id,
        favorite: true,
        theme: "moon garden",
        vocabularyWords: ["lantern", "gentle"],
        discussionQuestions: ["What felt kind?"]
      }),
      fixtureStory({
        id: "story_2",
        childProfileId: child.id,
        favorite: true,
        theme: "ocean breathing",
        vocabularyWords: ["tide", "settle"],
        discussionQuestions: ["When can we breathe slowly?"]
      })
    ];

    const board = service.buildChildBoard(child, stories);
    const firstStory = board.milestones.find((milestone) => milestone.rule.id === "first-story");
    const favoriteFinder = board.milestones.find((milestone) => milestone.rule.id === "favorite-finder");

    expect(board.storyCount).toBe(2);
    expect(board.favoriteCount).toBe(2);
    expect(board.themeCount).toBe(2);
    expect(firstStory).toMatchObject({ achieved: true, percent: 100 });
    expect(favoriteFinder).toMatchObject({ achieved: true, progress: 2, percent: 100 });
  });

  it("selects the closest unfinished milestone as the next milestone", () => {
    const service = new MilestoneService();
    const stories = Array.from({ length: 4 }, (_, index) =>
      fixtureStory({
        id: `story_${index}`,
        childProfileId: child.id,
        theme: `theme ${index}`
      })
    );

    const board = service.buildChildBoard(child, stories);

    expect(board.nextMilestone).toMatchObject({
      rule: expect.objectContaining({ id: "calm-streak" }),
      progress: 4,
      target: 5,
      percent: 80
    });
  });

  it("keeps empty child boards actionable without unlocking milestones", () => {
    const service = new MilestoneService();

    const board = service.buildChildBoard(child, []);

    expect(board.storyCount).toBe(0);
    expect(board.milestones.every((milestone) => !milestone.achieved)).toBe(true);
    expect(board.nextMilestone?.rule.id).toBe("calm-streak");
  });
});

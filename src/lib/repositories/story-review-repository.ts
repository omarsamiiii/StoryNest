import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { ModerationResult, StoryReviewRecord } from "@/types/moderation";

export class StoryReviewRepository {
  async save(input: {
    userId: string;
    storyId: string;
    result: ModerationResult;
    reviewer?: "system" | "parent";
    parentApproved?: boolean;
  }): Promise<StoryReviewRecord> {
    const review: StoryReviewRecord = {
      id: createId("review"),
      userId: input.userId,
      storyId: input.storyId,
      result: input.result,
      reviewer: input.reviewer ?? "system",
      parentApproved: input.parentApproved ?? input.result.allowed,
      createdAt: nowIso()
    };
    getLocalStore().storyReviews.push(review);
    return review;
  }

  async latestForStory(userId: string, storyId: string) {
    return (
      getLocalStore()
        .storyReviews.filter((review) => review.userId === userId && review.storyId === storyId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null
    );
  }

  async listFlagged(userId: string) {
    return getLocalStore()
      .storyReviews.filter(
        (review) =>
          review.userId === userId &&
          (!review.result.allowed || review.result.findings.some((finding) => finding.severity !== "info"))
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

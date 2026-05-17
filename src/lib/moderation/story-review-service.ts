import { contentPolicyEngine } from "@/lib/moderation/content-policy-engine";
import { repositories } from "@/lib/repositories";
import type { ModerationResult } from "@/types/moderation";
import type { Story } from "@/types/story";

function storyText(story: Story) {
  return [
    story.title,
    story.summary,
    story.moral,
    story.vocabularyWords.join(" "),
    story.discussionQuestions.join(" "),
    ...story.pages.map((page) => `${page.title} ${page.body}`)
  ].join("\n");
}

export class StoryReviewService {
  async reviewStory(userId: string, storyId: string) {
    const story = await repositories.stories.findById(userId, storyId);
    if (!story) throw new Error("Story not found.");

    const child = await repositories.children.findById(userId, story.childProfileId);
    const result = contentPolicyEngine.evaluate(storyText(story), {
      bedtimeSafe: story.safetyMetadata.bedtimeSafe,
      ageRange: child?.ageRange,
      requireStructuredStory: true
    });
    const review = await repositories.storyReviews.save({ userId, storyId, result });
    await repositories.auditLogs.record({
      userId,
      action: "moderation.review",
      entityType: "story",
      entityId: storyId,
      metadata: {
        allowed: result.allowed,
        score: result.score,
        findingCount: result.findings.length
      }
    });
    return review;
  }

  async reviewDraft(input: {
    userId: string;
    storyId: string;
    text: string;
    bedtimeSafe: boolean;
    ageRange?: string;
  }): Promise<ModerationResult> {
    const result = contentPolicyEngine.evaluate(input.text, {
      bedtimeSafe: input.bedtimeSafe,
      ageRange: input.ageRange,
      requireStructuredStory: false
    });
    await repositories.storyReviews.save({
      userId: input.userId,
      storyId: input.storyId,
      result,
      reviewer: "system",
      parentApproved: false
    });
    return result;
  }
}

export const storyReviewService = new StoryReviewService();

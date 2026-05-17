import { PLAN_LIMITS } from "@/constants/plans";
import { repositories } from "@/lib/repositories";
import type { UsageSummary } from "@/types/billing";

export class UsageService {
  async summary(userId: string): Promise<UsageSummary> {
    const subscription = await repositories.subscriptions.ensureForUser(userId);
    const usage = await repositories.usage.get(userId);
    const storyLimit = PLAN_LIMITS[subscription.planId].storiesPerMonth;

    return {
      userId,
      month: usage.month,
      generatedStories: usage.generatedStories,
      storyLimit,
      remainingStories: Math.max(0, storyLimit - usage.generatedStories),
      planId: subscription.planId
    };
  }

  async canGenerateStory(userId: string) {
    const summary = await this.summary(userId);
    return summary.generatedStories < summary.storyLimit;
  }

  async assertCanGenerateStory(userId: string) {
    const summary = await this.summary(userId);
    if (summary.generatedStories >= summary.storyLimit) {
      throw new Error("You have reached your monthly story limit for this plan.");
    }
    return summary;
  }

  async recordStoryGeneration(userId: string) {
    await repositories.usage.incrementStories(userId);
    return this.summary(userId);
  }
}

export const usageService = new UsageService();

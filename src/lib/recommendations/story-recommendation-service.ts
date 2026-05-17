import { storyTemplateEngine } from "@/lib/templates/story-template-engine";
import { repositories } from "@/lib/repositories";
import type { TemplateRecommendation } from "@/types/templates";

export interface StoryRecommendationBoard {
  userId: string;
  generatedAt: string;
  recommendationsByChild: Array<{
    childProfileId: string;
    childNickname: string;
    templates: TemplateRecommendation[];
    nextBestTheme: string;
    reason: string;
  }>;
}

export class StoryRecommendationService {
  async board(userId: string): Promise<StoryRecommendationBoard> {
    const [children, stories] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.stories.listByUser(userId)
    ]);

    return {
      userId,
      generatedAt: new Date().toISOString(),
      recommendationsByChild: children.map((child) => {
        const childStories = stories.filter((story) => story.childProfileId === child.id);
        const usedThemes = new Set(childStories.map((story) => story.theme));
        const templates = storyTemplateEngine.recommend(child, 5);
        const freshTemplate =
          templates.find((recommendation) => !usedThemes.has(recommendation.template.themeSeed)) ??
          templates[0];

        return {
          childProfileId: child.id,
          childNickname: child.nickname,
          templates,
          nextBestTheme: freshTemplate?.template.themeSeed ?? "calm bedtime adventure",
          reason: freshTemplate
            ? freshTemplate.reasons.join(", ")
            : "No profile-specific recommendation was available."
        };
      })
    };
  }
}

export const storyRecommendationService = new StoryRecommendationService();

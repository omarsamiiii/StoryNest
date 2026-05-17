import { buildStoryPrompt } from "@/lib/ai/prompt-builder";
import { MockAIProvider } from "@/lib/ai/mock-ai-provider";
import { assertStoryIsSafe } from "@/lib/ai/story-safety";
import { createId, nowIso } from "@/lib/db/id";
import { repositories } from "@/lib/repositories";
import { usageService } from "@/lib/services/usage-service";
import type { StoryGenerationRequest } from "@/types/story";

export class StoryGenerationService {
  constructor(private readonly aiProvider = new MockAIProvider()) {}

  async generate(input: StoryGenerationRequest) {
    await usageService.assertCanGenerateStory(input.userId);

    const child = await repositories.children.findById(input.userId, input.childProfileId);
    if (!child) throw new Error("Choose a child profile before generating a story.");

    const prompt = buildStoryPrompt(child, input);
    const generated = await this.aiProvider.generateStory({
      prompt,
      userId: input.userId,
      childProfileId: input.childProfileId
    });

    const safeMetadata = assertStoryIsSafe(
      [generated.title, generated.summary, ...generated.pages.map((page) => page.body)].join(" "),
      input.bedtimeSafe
    );
    const timestamp = nowIso();

    const story = await repositories.stories.save({
      ...generated,
      safetyMetadata: safeMetadata,
      id: createId("story"),
      createdAt: timestamp,
      updatedAt: timestamp
    });

    await usageService.recordStoryGeneration(input.userId);
    return story;
  }
}

export const storyGenerationService = new StoryGenerationService();

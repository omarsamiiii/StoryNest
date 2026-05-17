import type { AIProvider, StoryPromptPayload } from "@/lib/ai/ai-provider";
import { analyzeStorySafety } from "@/lib/ai/story-safety";
import type { Story, StoryLength } from "@/types/story";
import type { StoryTone } from "@/types/children";

function extract(prompt: string, label: string, fallback: string) {
  const line = prompt.split("\n").find((item) => item.startsWith(`${label}:`));
  return line?.replace(`${label}:`, "").replace(/\.$/, "").trim() || fallback;
}

function sectionCount(length: StoryLength) {
  if (length === "long") return 5;
  if (length === "medium") return 4;
  return 3;
}

export class MockAIProvider implements AIProvider {
  async generateStory(payload: StoryPromptPayload): Promise<Omit<Story, "id" | "createdAt" | "updatedAt">> {
    const childName = extract(payload.prompt, "Child nickname", "Little Star");
    const ageRange = extract(payload.prompt, "Age range", "5-6");
    const theme = extract(payload.prompt, "Theme", "moonlit garden");
    const lesson = extract(payload.prompt, "Lesson or moral", "kindness grows when shared");
    const tone = extract(payload.prompt, "Tone", "calm") as StoryTone;
    const length = extract(payload.prompt, "Length", "short") as StoryLength;
    const bedtimeSafe = payload.prompt.includes("bedtime-safe constraints");
    const count = sectionCount(length);

    const pages = Array.from({ length: count }, (_, index) => ({
      title: `Part ${index + 1}: ${index === count - 1 ? "A Gentle Goodnight" : "A Soft Discovery"}`,
      body:
        `${childName} followed a trail of tiny lantern lights through a ${theme}. ` +
        `Every step brought a small choice about ${lesson}, and every choice made the path warmer. ` +
        `By the end of this part, ${childName} noticed that brave can also mean quiet, patient, and kind.`
    }));

    const title = `${childName} and the ${theme.replace(/\b\w/g, (letter) => letter.toUpperCase())}`;
    const fullText = [title, ...pages.map((page) => page.body), lesson].join(" ");

    return {
      userId: payload.userId,
      childProfileId: payload.childProfileId,
      title,
      summary: `${childName} explores ${theme} and learns that ${lesson}.`,
      recommendedAge: ageRange,
      estimatedReadingTime: length === "long" ? "9 minutes" : length === "medium" ? "6 minutes" : "4 minutes",
      theme,
      tone,
      length,
      pages,
      moral: lesson,
      vocabularyWords: ["lantern", "patient", "gentle", "wonder"],
      discussionQuestions: [
        `What helped ${childName} make a kind choice?`,
        "When did the story feel most peaceful?",
        `How could we practice ${lesson} tomorrow?`
      ],
      safetyMetadata: analyzeStorySafety(fullText, bedtimeSafe),
      favorite: false
    };
  }
}

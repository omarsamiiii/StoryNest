import type { ChildProfile } from "@/types/children";
import type { StoryGenerationInput } from "@/validation/story";

export function buildStoryPrompt(child: ChildProfile, input: StoryGenerationInput) {
  const interests = child.interests.join(", ");
  const bedtimeSafety = input.bedtimeSafe
    ? "Use bedtime-safe constraints: gentle stakes, no scary imagery, no violence, no cliffhanger ending, soothing close."
    : "Keep the story child-appropriate, warm, and parent-reviewed.";

  return [
    "Create a personalized bedtime story for a parent to read aloud.",
    `Child nickname: ${child.nickname}.`,
    `Age range: ${child.ageRange}.`,
    `Interests: ${interests}.`,
    `Theme: ${input.theme}.`,
    `Lesson or moral: ${input.lesson}.`,
    `Tone: ${input.tone}.`,
    `Length: ${input.length}.`,
    bedtimeSafety,
    "Return structured content with title, summary, reading time, sections, moral, vocabulary words, discussion questions, and safety metadata.",
    input.extraInstructions ? `Parent instruction: ${input.extraInstructions}.` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

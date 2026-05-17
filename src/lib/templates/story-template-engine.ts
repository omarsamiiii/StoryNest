import { STORY_TEMPLATES } from "@/constants/story-templates";
import type { ChildProfile } from "@/types/children";
import type { StoryGenerationInput } from "@/validation/story";
import type { StoryTemplate, TemplateRecommendation } from "@/types/templates";

function overlap<T>(left: T[], right: T[]) {
  return left.filter((item) => right.includes(item)).length;
}

export class StoryTemplateEngine {
  constructor(private readonly templates: StoryTemplate[] = STORY_TEMPLATES) {}

  list() {
    return [...this.templates].sort((a, b) => a.name.localeCompare(b.name));
  }

  findById(id: string) {
    return this.templates.find((template) => template.id === id) ?? null;
  }

  recommend(child: ChildProfile, limit = 3): TemplateRecommendation[] {
    return this.templates
      .map((template) => {
        const reasons: string[] = [];
        let score = 0;

        if (template.recommendedAgeRanges.includes(child.ageRange)) {
          score += 30;
          reasons.push(`Fits ages ${child.ageRange}`);
        }

        const interestMatches = overlap(template.interests, child.interests);
        if (interestMatches) {
          score += interestMatches * 20;
          reasons.push(`Matches ${interestMatches} interest${interestMatches === 1 ? "" : "s"}`);
        }

        if (template.tone === child.preferredTone) {
          score += 20;
          reasons.push(`Uses ${child.preferredTone} tone`);
        }

        if (child.bedtimeSafeDefault && template.bedtimeSafe) {
          score += 10;
          reasons.push("Bedtime-safe by default");
        }

        return { template, score, reasons };
      })
      .sort((a, b) => b.score - a.score || a.template.name.localeCompare(b.template.name))
      .slice(0, limit);
  }

  toStoryInput(child: ChildProfile, templateId: string): StoryGenerationInput {
    const template = this.findById(templateId);
    if (!template) throw new Error("Story template not found.");

    return {
      childProfileId: child.id,
      theme: template.themeSeed,
      lesson: template.lessonSeed,
      length: template.length,
      tone: template.tone,
      bedtimeSafe: child.bedtimeSafeDefault && template.bedtimeSafe,
      extraInstructions: template.parentInstructionSeed
    };
  }
}

export const storyTemplateEngine = new StoryTemplateEngine();

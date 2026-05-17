import { CURRICULUM_LESSONS, CURRICULUM_TRACKS } from "@/constants/curriculum";
import { repositories } from "@/lib/repositories";
import type { ChildProfile } from "@/types/children";
import type { CurriculumDomain, CurriculumLesson, CurriculumPlan, CurriculumRecommendation, CurriculumTrack } from "@/types/curriculum";
import type { Story } from "@/types/story";

function countMatches<T>(left: T[], right: T[]) {
  return left.reduce((count, value) => count + (right.includes(value) ? 1 : 0), 0);
}

function storyCoversLesson(story: Story, lesson: CurriculumLesson) {
  const haystack = [story.theme, story.moral, story.summary, story.title, ...story.vocabularyWords].join(" ").toLowerCase();
  const lessonTerms = [lesson.moralSeed, ...lesson.themeSeeds, ...lesson.vocabularyTargets].map((value) => value.toLowerCase());
  return lessonTerms.some((term) => haystack.includes(term));
}

function domainCounts(stories: Story[]) {
  const counts = new Map<CurriculumDomain, number>();
  for (const story of stories) {
    const haystack = [story.theme, story.moral, story.summary, story.title].join(" ").toLowerCase();
    for (const lesson of CURRICULUM_LESSONS) {
      if (storyCoversLesson(story, lesson) || lesson.themeSeeds.some((seed) => haystack.includes(seed))) {
        counts.set(lesson.domain, (counts.get(lesson.domain) ?? 0) + 1);
      }
    }
  }
  return Array.from(counts.entries())
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain));
}

export class CurriculumService {
  listLessons() {
    return [...CURRICULUM_LESSONS].sort((a, b) => a.title.localeCompare(b.title));
  }

  listTracks() {
    return [...CURRICULUM_TRACKS].sort((a, b) => a.title.localeCompare(b.title));
  }

  findLesson(id: string) {
    return CURRICULUM_LESSONS.find((lesson) => lesson.id === id) ?? null;
  }

  recommendLessons(child: ChildProfile, stories: Story[], limit = 4): CurriculumRecommendation[] {
    return CURRICULUM_LESSONS.map((lesson) => {
      const reasons: string[] = [];
      let score = 0;

      if (lesson.recommendedAgeRanges.includes(child.ageRange)) {
        score += 25;
        reasons.push(`Fits age range ${child.ageRange}`);
      }

      const interestMatches = countMatches(lesson.interests, child.interests);
      if (interestMatches > 0) {
        score += interestMatches * 18;
        reasons.push(`Matches ${interestMatches} profile interest${interestMatches === 1 ? "" : "s"}`);
      }

      if (lesson.tone === child.preferredTone) {
        score += 18;
        reasons.push(`Uses ${child.preferredTone} tone`);
      }

      if (child.bedtimeSafeDefault) {
        score += 8;
        reasons.push("Works with bedtime-safe defaults");
      }

      const alreadyCovered = stories.some((story) => storyCoversLesson(story, lesson));
      if (alreadyCovered) {
        score -= 20;
        reasons.push("Similar lesson already appears in the library");
      }

      if (lesson.difficulty === "starter" && child.ageRange === "3-4") score += 10;
      if (lesson.difficulty === "stretch" && child.ageRange === "9-10") score += 10;

      return { lesson, score, reasons, alreadyCovered };
    })
      .sort((a, b) => b.score - a.score || a.lesson.title.localeCompare(b.lesson.title))
      .slice(0, limit);
  }

  recommendTrack(recommendations: CurriculumRecommendation[]): CurriculumTrack {
    const domainScores = new Map<CurriculumDomain, number>();
    for (const recommendation of recommendations) {
      domainScores.set(
        recommendation.lesson.domain,
        (domainScores.get(recommendation.lesson.domain) ?? 0) + recommendation.score
      );
    }

    const [bestDomain] =
      Array.from(domainScores.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0] ?? [];
    return (
      CURRICULUM_TRACKS.find((track) => track.domain === bestDomain) ??
      CURRICULUM_TRACKS.find((track) => track.id === "calm-bedtime-foundations") ??
      CURRICULUM_TRACKS[0]
    );
  }

  async buildPlan(userId: string): Promise<CurriculumPlan> {
    const [children, stories] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.stories.listByUser(userId)
    ]);

    return {
      userId,
      generatedAt: new Date().toISOString(),
      childPlans: children.map((child) => {
        const childStories = stories.filter((story) => story.childProfileId === child.id);
        const nextLessons = this.recommendLessons(child, childStories, 5);
        const recommendedTrack = this.recommendTrack(nextLessons);

        return {
          childProfileId: child.id,
          childNickname: child.nickname,
          recommendedTrack,
          nextLessons,
          coveredDomains: domainCounts(childStories),
          parentGuidance: [
            `Start with "${nextLessons[0]?.lesson.title ?? recommendedTrack.title}" for the next bedtime story.`,
            "Keep one discussion prompt and one follow-up activity; save the rest for another night.",
            "Use the child's nickname and interests, but avoid sensitive identifiers or exact locations."
          ]
        };
      })
    };
  }

  toStorySeed(lessonId: string) {
    const lesson = this.findLesson(lessonId);
    if (!lesson) throw new Error("Curriculum lesson not found.");

    return {
      theme: lesson.themeSeeds[0],
      lesson: lesson.moralSeed,
      length: lesson.length,
      tone: lesson.tone,
      extraInstructions: [
        `Parent goal: ${lesson.parentGoal}`,
        `Child-facing goal: ${lesson.childFacingGoal}`,
        `Include vocabulary words: ${lesson.vocabularyTargets.join(", ")}`,
        `Discussion prompts to inspire: ${lesson.discussionPrompts.join(" | ")}`,
        `Bedtime safety notes: ${lesson.bedtimeSafetyNotes.join(" ")}`
      ].join("\n")
    };
  }
}

export const curriculumService = new CurriculumService();


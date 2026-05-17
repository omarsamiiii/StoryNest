import { repositories } from "@/lib/repositories";
import type { ChildReadingProfile, ParentInsightReport, ReadingInsight } from "@/types/insights";
import type { Story } from "@/types/story";

function readingMinutes(story: Story) {
  const match = story.estimatedReadingTime.match(/\d+/);
  return match ? Number(match[0]) : 5;
}

function topValues(values: string[], limit = 3) {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value]) => value);
}

function bedtimeSafeRatio(stories: Story[]) {
  if (!stories.length) return 0;
  const safe = stories.filter((story) => story.safetyMetadata.bedtimeSafe).length;
  return Math.round((safe / stories.length) * 100);
}

export class ReadingInsightsService {
  async report(userId: string): Promise<ParentInsightReport> {
    const [children, stories] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.stories.listByUser(userId)
    ]);
    const childProfiles: ChildReadingProfile[] = children.map((child) => {
      const childStories = stories.filter((story) => story.childProfileId === child.id);
      return {
        childProfileId: child.id,
        childNickname: child.nickname,
        storyCount: childStories.length,
        favoriteThemes: topValues(childStories.map((story) => story.theme)),
        commonVocabulary: topValues(childStories.flatMap((story) => story.vocabularyWords), 5),
        averageReadingMinutes: childStories.length
          ? Math.round(
              childStories.reduce((total, story) => total + readingMinutes(story), 0) /
                childStories.length
            )
          : 0,
        bedtimeSafeRatio: bedtimeSafeRatio(childStories)
      };
    });

    const totalMinutes = stories.reduce((total, story) => total + readingMinutes(story), 0);
    const favoriteCount = stories.filter((story) => story.favorite).length;
    const insights = this.buildInsights(stories, childProfiles, totalMinutes, favoriteCount);

    return {
      userId,
      generatedAt: new Date().toISOString(),
      totalStories: stories.length,
      favoriteCount,
      estimatedReadingMinutes: totalMinutes,
      mostUsedThemes: topValues(stories.map((story) => story.theme), 5),
      childProfiles,
      insights
    };
  }

  private buildInsights(
    stories: Story[],
    childProfiles: ChildReadingProfile[],
    totalMinutes: number,
    favoriteCount: number
  ): ReadingInsight[] {
    const insights: ReadingInsight[] = [
      {
        id: "total-reading-time",
        label: "Estimated reading time",
        value: `${totalMinutes} minutes`,
        detail: "Total read-aloud time represented by the saved story library.",
        tone: totalMinutes > 60 ? "positive" : "neutral"
      },
      {
        id: "favorite-density",
        label: "Favorite density",
        value: stories.length ? `${Math.round((favoriteCount / stories.length) * 100)}%` : "0%",
        detail: "A high favorite ratio means the library is converging on stories that work.",
        tone: favoriteCount > 0 ? "positive" : "neutral"
      }
    ];

    const lowSafety = childProfiles.find((profile) => profile.storyCount > 0 && profile.bedtimeSafeRatio < 80);
    if (lowSafety) {
      insights.push({
        id: "bedtime-safe-ratio",
        label: "Bedtime-safe ratio",
        value: `${lowSafety.bedtimeSafeRatio}%`,
        detail: `${lowSafety.childNickname}'s library has several stories outside bedtime-safe mode.`,
        tone: "warning"
      });
    }

    const sparseProfile = childProfiles.find((profile) => profile.storyCount === 0);
    if (sparseProfile) {
      insights.push({
        id: "profile-without-stories",
        label: "Profile needs stories",
        value: sparseProfile.childNickname,
        detail: "Create at least one story so recommendations and routines can personalize better.",
        tone: "neutral"
      });
    }

    return insights;
  }
}

export const readingInsightsService = new ReadingInsightsService();

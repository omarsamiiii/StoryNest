import { ROUTINE_DAYS, ROUTINE_THEMES, WIND_DOWN_LIBRARY } from "@/constants/routine";
import { repositories } from "@/lib/repositories";
import type { RoutineNightPlan, RoutinePlan, RoutinePreferences } from "@/types/routine";

function stepsForNight(preferences: RoutinePreferences, index: number) {
  const base = [
    `${preferences.quietStartMinutes} minutes of quiet transition time.`,
    WIND_DOWN_LIBRARY[index % WIND_DOWN_LIBRARY.length],
    WIND_DOWN_LIBRARY[(index + 2) % WIND_DOWN_LIBRARY.length]
  ];
  if (preferences.includeColoring) {
    base.push("Offer a coloring page for tomorrow, not after lights out.");
  }
  if (preferences.lightsOutReminder) {
    base.push("End with a consistent lights-out reminder.");
  }
  return base;
}

export class RoutinePlannerService {
  async plan(userId: string): Promise<RoutinePlan> {
    const [children, preferences, stories] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.routinePreferences.listByUser(userId),
      repositories.stories.listByUser(userId)
    ]);

    const activePreferences =
      preferences.length > 0
        ? preferences
        : children.map((child) => ({
            id: `virtual_${child.id}`,
            userId,
            childProfileId: child.id,
            cadence: "daily" as const,
            preferredMinutes: child.ageRange === "3-4" ? 5 : 8,
            preferredTone: child.preferredTone,
            includeColoring: false,
            quietStartMinutes: 5,
            lightsOutReminder: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));

    const nights: RoutineNightPlan[] = ROUTINE_DAYS.map((day, index) => {
      const preference = activePreferences[index % Math.max(1, activePreferences.length)];
      const child = children.find((profile) => profile.id === preference?.childProfileId);
      const matchedStory = stories.find(
        (story) =>
          story.childProfileId === child?.id &&
          story.tone === preference?.preferredTone &&
          story.safetyMetadata.bedtimeSafe
      );
      return {
        day,
        childProfileId: child?.id ?? "unassigned",
        childNickname: child?.nickname ?? "Your child",
        theme: matchedStory?.theme ?? ROUTINE_THEMES[index % ROUTINE_THEMES.length],
        tone: preference?.preferredTone ?? "calm",
        readingMinutes: preference?.preferredMinutes ?? 8,
        suggestedStoryId: matchedStory?.id,
        suggestedStoryTitle: matchedStory?.title,
        parentPrompt: matchedStory
          ? `Re-read ${matchedStory.title} and ask one gentle follow-up question.`
          : "Generate a new bedtime-safe story for this theme before bedtime.",
        windDownSteps: preference ? stepsForNight(preference, index) : ["Read calmly together."]
      };
    });

    return {
      userId,
      generatedAt: new Date().toISOString(),
      nights,
      safetyNotes: [
        "Routine plans are private to the parent account.",
        "Plans use nickname profiles and saved story metadata only.",
        "Coloring is scheduled away from lights-out to protect sleep rhythm."
      ]
    };
  }
}

export const routinePlannerService = new RoutinePlannerService();

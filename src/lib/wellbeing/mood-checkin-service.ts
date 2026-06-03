import { repositories } from "@/lib/repositories";
import type { BedtimeMood, MoodCheckIn } from "@/types/wellbeing";
import type { MoodCheckInInput } from "@/validation/wellbeing";

const moodSuggestions: Record<
  BedtimeMood,
  Pick<MoodCheckIn, "suggestedTone" | "suggestedTheme" | "calmingPrompt">
> = {
  peaceful: {
    suggestedTone: "calm",
    suggestedTheme: "quiet moon garden",
    calmingPrompt: "Keep the story slow, soft, and full of familiar bedtime images."
  },
  silly: {
    suggestedTone: "funny",
    suggestedTheme: "pajama parade",
    calmingPrompt: "Let the silliness taper into a cozy final routine."
  },
  worried: {
    suggestedTone: "calm",
    suggestedTheme: "brave-small cloud castle",
    calmingPrompt: "Include reassurance, a trusted grown-up nearby, and a gentle breathing cue."
  },
  tired: {
    suggestedTone: "calm",
    suggestedTheme: "sleepy forest lantern",
    calmingPrompt: "Use shorter sentences and a predictable goodnight phrase."
  },
  curious: {
    suggestedTone: "educational",
    suggestedTheme: "sleepy observatory question jar",
    calmingPrompt: "Answer one question, then save the rest for tomorrow."
  },
  restless: {
    suggestedTone: "magical",
    suggestedTheme: "blanket nest adventure",
    calmingPrompt: "Start with movement and end with stillness, breathing, and lights-out imagery."
  }
};

export class MoodCheckInService {
  async create(userId: string, input: MoodCheckInInput) {
    const child = await repositories.children.findById(userId, input.childProfileId);
    if (!child) throw new Error("Child profile not found.");

    const suggestion = moodSuggestions[input.mood];
    const checkIn = await repositories.moodCheckIns.save({
      userId,
      childProfileId: input.childProfileId,
      mood: input.mood,
      energyLevel: input.energyLevel,
      parentNote: input.parentNote,
      ...suggestion
    });

    await repositories.auditLogs.record({
      userId,
      action: "mood.checkin",
      entityType: "mood-check-in",
      entityId: checkIn.id,
      metadata: {
        childProfileId: input.childProfileId,
        mood: input.mood,
        energyLevel: input.energyLevel
      }
    });

    return checkIn;
  }

  async dashboard(userId: string) {
    const [children, checkIns] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.moodCheckIns.listByUser(userId)
    ]);

    return {
      children,
      checkIns,
      latestByChild: children.map((child) => ({
        child,
        checkIn: checkIns.find((item) => item.childProfileId === child.id) ?? null
      }))
    };
  }
}

export const moodCheckInService = new MoodCheckInService();

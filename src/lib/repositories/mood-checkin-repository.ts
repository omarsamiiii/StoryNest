import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { MoodCheckIn } from "@/types/wellbeing";

export class MoodCheckInRepository {
  async save(input: Omit<MoodCheckIn, "id" | "createdAt">): Promise<MoodCheckIn> {
    const checkIn: MoodCheckIn = {
      ...input,
      id: createId("mood"),
      createdAt: nowIso()
    };
    getLocalStore().moodCheckIns.push(checkIn);
    return checkIn;
  }

  async listByUser(userId: string) {
    return getLocalStore()
      .moodCheckIns.filter((checkIn) => checkIn.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async latestForChild(userId: string, childProfileId: string) {
    return (
      getLocalStore()
        .moodCheckIns.filter(
          (checkIn) => checkIn.userId === userId && checkIn.childProfileId === childProfileId
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0] ?? null
    );
  }
}


import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { RoutinePreferences } from "@/types/routine";
import type { RoutinePreferencesInput } from "@/validation/routine";

export class RoutinePreferencesRepository {
  async listByUser(userId: string) {
    return getLocalStore().routinePreferences.filter((preferences) => preferences.userId === userId);
  }

  async findForChild(userId: string, childProfileId: string) {
    return (
      getLocalStore().routinePreferences.find(
        (preferences) =>
          preferences.userId === userId && preferences.childProfileId === childProfileId
      ) ?? null
    );
  }

  async upsert(userId: string, input: RoutinePreferencesInput): Promise<RoutinePreferences> {
    const existing = await this.findForChild(userId, input.childProfileId);
    if (existing) {
      Object.assign(existing, input, { updatedAt: nowIso() });
      return existing;
    }

    const timestamp = nowIso();
    const preferences: RoutinePreferences = {
      id: createId("routine"),
      userId,
      childProfileId: input.childProfileId,
      cadence: input.cadence,
      preferredMinutes: input.preferredMinutes,
      preferredTone: input.preferredTone,
      includeColoring: input.includeColoring,
      quietStartMinutes: input.quietStartMinutes,
      lightsOutReminder: input.lightsOutReminder,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    getLocalStore().routinePreferences.push(preferences);
    return preferences;
  }

  async delete(userId: string, childProfileId: string) {
    const store = getLocalStore();
    const initialLength = store.routinePreferences.length;
    store.routinePreferences = store.routinePreferences.filter(
      (preferences) =>
        !(preferences.userId === userId && preferences.childProfileId === childProfileId)
    );
    return store.routinePreferences.length !== initialLength;
  }
}

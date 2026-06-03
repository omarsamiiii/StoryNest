import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { ReadingSession } from "@/types/wellbeing";

export class ReadingSessionRepository {
  async save(input: Omit<ReadingSession, "id" | "createdAt">): Promise<ReadingSession> {
    const session: ReadingSession = {
      ...input,
      id: createId("session"),
      createdAt: nowIso()
    };
    getLocalStore().readingSessions.push(session);
    return session;
  }

  async listByUser(userId: string) {
    return getLocalStore()
      .readingSessions.filter((session) => session.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async listByChild(userId: string, childProfileId: string) {
    return getLocalStore()
      .readingSessions.filter(
        (session) => session.userId === userId && session.childProfileId === childProfileId
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}


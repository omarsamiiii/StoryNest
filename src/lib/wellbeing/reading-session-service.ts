import { repositories } from "@/lib/repositories";
import type { ReadingSessionInput } from "@/validation/wellbeing";

export class ReadingSessionService {
  async record(userId: string, input: ReadingSessionInput) {
    const [child, story] = await Promise.all([
      repositories.children.findById(userId, input.childProfileId),
      repositories.stories.findById(userId, input.storyId)
    ]);
    if (!child) throw new Error("Child profile not found.");
    if (!story) throw new Error("Story not found.");

    const session = await repositories.readingSessions.save({
      userId,
      childProfileId: input.childProfileId,
      storyId: input.storyId,
      reaction: input.reaction,
      minutesRead: input.minutesRead,
      parentNote: input.parentNote,
      favoriteMoment: input.favoriteMoment
    });

    await repositories.auditLogs.record({
      userId,
      action: "reading.session",
      entityType: "reading-session",
      entityId: session.id,
      metadata: {
        childProfileId: input.childProfileId,
        storyId: input.storyId,
        minutesRead: input.minutesRead,
        reaction: input.reaction
      }
    });

    return session;
  }

  async summary(userId: string) {
    const [children, stories, sessions] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.stories.listByUser(userId),
      repositories.readingSessions.listByUser(userId)
    ]);
    const storyTitles = new Map(stories.map((story) => [story.id, story.title]));

    return {
      children,
      stories,
      sessions,
      totalMinutes: sessions.reduce((total, session) => total + session.minutesRead, 0),
      byChild: children.map((child) => {
        const childSessions = sessions.filter((session) => session.childProfileId === child.id);
        return {
          child,
          sessions: childSessions.map((session) => ({
            ...session,
            storyTitle: storyTitles.get(session.storyId) ?? "Untitled story"
          })),
          totalMinutes: childSessions.reduce((total, session) => total + session.minutesRead, 0)
        };
      })
    };
  }
}

export const readingSessionService = new ReadingSessionService();

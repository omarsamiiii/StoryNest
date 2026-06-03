import { repositories } from "@/lib/repositories";
import type { KeepsakeCertificate } from "@/types/wellbeing";

function certificateId(childProfileId: string) {
  return `certificate_${childProfileId}`;
}

export class KeepsakeCertificateService {
  async certificates(userId: string): Promise<KeepsakeCertificate[]> {
    const [children, stories, sessions] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.stories.listByUser(userId),
      repositories.readingSessions.listByUser(userId)
    ]);

    return children.map((child, index) => {
      const childStories = stories.filter((story) => story.childProfileId === child.id);
      const childSessions = sessions.filter((session) => session.childProfileId === child.id);
      const minutes = childSessions.reduce((total, session) => total + session.minutesRead, 0);
      const favoriteCount = childStories.filter((story) => story.favorite).length;

      return {
        id: certificateId(child.id),
        childProfileId: child.id,
        childNickname: child.nickname,
        title: `${child.nickname}'s StoryNest Star`,
        subtitle: "For cozy reading moments and parent-child imagination",
        achievement:
          childStories.length > 0
            ? `${childStories.length} saved stories and ${minutes} reading minutes`
            : "Ready to begin a cozy story journey",
        detailLines: [
          `Favorite stories saved: ${favoriteCount}`,
          `Reading sessions logged: ${childSessions.length}`,
          `Favorite interests: ${child.interests.join(", ")}`
        ],
        palette: index % 3 === 0 ? "sunrise" : index % 3 === 1 ? "moonlight" : "rainbow",
        generatedAt: new Date().toISOString()
      };
    });
  }
}

export const keepsakeCertificateService = new KeepsakeCertificateService();


import { PageHeader } from "@/components/ui/page-header";
import { ReadingSessionLog } from "@/components/wellbeing/reading-session-log";
import { requireUser } from "@/lib/auth/session";
import { readingSessionService } from "@/lib/wellbeing/reading-session-service";

export default async function ReadingLogPage() {
  const user = await requireUser();
  const summary = await readingSessionService.summary(user.id);
  const sessions = summary.byChild.flatMap((child) => child.sessions);

  return (
    <main className="grid gap-6">
      <PageHeader
        title="Reading log"
        description="Save private parent notes about what helped each bedtime story land."
      />
      <ReadingSessionLog
        children={summary.children}
        stories={summary.stories}
        sessions={sessions}
        totalMinutes={summary.totalMinutes}
      />
    </main>
  );
}


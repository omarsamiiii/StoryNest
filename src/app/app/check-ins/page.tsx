import { PageHeader } from "@/components/ui/page-header";
import { MoodCheckInPanel } from "@/components/wellbeing/mood-checkin-panel";
import { requireUser } from "@/lib/auth/session";
import { moodCheckInService } from "@/lib/wellbeing/mood-checkin-service";

export default async function CheckInsPage() {
  const user = await requireUser();
  const dashboard = await moodCheckInService.dashboard(user.id);

  return (
    <main className="grid gap-6">
      <PageHeader
        title="Mood check-ins"
        description="Capture tonight's bedtime mood and turn it into a calm story direction."
      />
      <MoodCheckInPanel children={dashboard.children} checkIns={dashboard.checkIns} />
    </main>
  );
}


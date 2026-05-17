import { ReminderList } from "@/components/reminders/reminder-list";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { reminderService } from "@/lib/notifications/reminder-service";

export const metadata = { title: "Reminders" };

export default async function RemindersPage() {
  const user = await requireUser();
  const [previews, reminders] = await Promise.all([
    reminderService.preview(user.id),
    repositories.bedtimeReminders.listByUser(user.id)
  ]);
  return (
    <main className="grid gap-6">
      <PageHeader
        title="Bedtime reminders"
        description="Preview local mock reminders for parent-led bedtime routines."
      />
      <ReminderList previews={previews} reminders={reminders} />
    </main>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BedtimeReminder, ReminderPreview } from "@/types/notifications";

export function ReminderList({
  previews,
  reminders
}: Readonly<{ previews: ReminderPreview[]; reminders: BedtimeReminder[] }>) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {previews.map((preview) => (
          <Card key={preview.childNickname}>
            <CardHeader>
              <CardTitle>{preview.childNickname}</CardTitle>
              <p className="text-sm text-muted-foreground">{preview.localTime}</p>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              <p>{preview.message}</p>
              <p>{preview.windDownSuggestion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-2">
        {reminders.slice(0, 10).map((reminder) => (
          <div key={reminder.id} className="rounded-md border border-border bg-white p-3 text-sm">
            {reminder.scheduledForDay} at {reminder.localTime}: {reminder.message}
          </div>
        ))}
      </div>
    </div>
  );
}

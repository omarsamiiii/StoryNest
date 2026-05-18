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
          <Card key={preview.childNickname} className="bg-gradient-to-br from-white to-[#fff0c6]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-2xl bg-accent/35">🌙</span>
                {preview.childNickname}
              </CardTitle>
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
          <div
            key={reminder.id}
            className="storybook-pop rounded-2xl border border-border bg-white/82 p-3 text-sm shadow-soft"
          >
            {reminder.scheduledForDay} at {reminder.localTime}: {reminder.message}
          </div>
        ))}
      </div>
    </div>
  );
}

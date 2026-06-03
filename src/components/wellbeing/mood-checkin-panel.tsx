import { createMoodCheckInAction } from "@/lib/wellbeing/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, inputClasses, textareaClasses } from "@/components/ui/field";
import type { ChildProfile } from "@/types/children";
import type { MoodCheckIn } from "@/types/wellbeing";

const moods = ["peaceful", "silly", "worried", "tired", "curious", "restless"] as const;

export function MoodCheckInPanel({
  children,
  checkIns
}: Readonly<{ children: ChildProfile[]; checkIns: MoodCheckIn[] }>) {
  if (!children.length) {
    return (
      <EmptyState
        title="Create a child profile first"
        description="Mood check-ins use private child profiles to suggest the right story tone."
        actionHref="/app/children/new"
        actionLabel="Create profile"
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Tonight&apos;s mood check-in</CardTitle>
          <p className="text-sm text-muted-foreground">
            Capture the bedtime mood and get a parent-controlled story suggestion.
          </p>
        </CardHeader>
        <CardContent>
          <form action={createMoodCheckInAction} className="grid gap-4">
            <Field label="Child profile">
              <select className={inputClasses} name="childProfileId" required>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.nickname}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mood">
              <select className={inputClasses} name="mood" defaultValue="peaceful">
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Energy level" hint="1 is sleepy, 5 is very wiggly.">
              <input className={inputClasses} name="energyLevel" type="number" min="1" max="5" defaultValue="2" />
            </Field>
            <Field label="Parent note">
              <textarea className={textareaClasses} name="parentNote" placeholder="Anything to remember tonight?" />
            </Field>
            <Button type="submit">Save check-in</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {checkIns.slice(0, 6).map((checkIn) => (
          <Card key={checkIn.id} className="bg-gradient-to-br from-white to-mint/25">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-3 text-lg">
                <span>{checkIn.mood} mood</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs text-muted-foreground">
                  energy {checkIn.energyLevel}/5
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm leading-6 text-muted-foreground">
              <p>
                <strong className="text-foreground">Suggested tone:</strong> {checkIn.suggestedTone}
              </p>
              <p>
                <strong className="text-foreground">Theme:</strong> {checkIn.suggestedTheme}
              </p>
              <p>{checkIn.calmingPrompt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


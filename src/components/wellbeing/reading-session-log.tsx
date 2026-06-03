import { createReadingSessionAction } from "@/lib/wellbeing/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, inputClasses, textareaClasses } from "@/components/ui/field";
import type { ChildProfile } from "@/types/children";
import type { Story } from "@/types/story";
import type { ReadingSession } from "@/types/wellbeing";

const reactions = ["settled", "engaged", "sleepy", "asked-questions", "wanted-repeat"] as const;

export function ReadingSessionLog({
  children,
  stories,
  sessions,
  totalMinutes
}: Readonly<{
  children: ChildProfile[];
  stories: Story[];
  sessions: Array<ReadingSession & { storyTitle?: string }>;
  totalMinutes: number;
}>) {
  if (!children.length || !stories.length) {
    return (
      <EmptyState
        title="Save a story first"
        description="Reading logs appear after you have a child profile and at least one saved story."
        actionHref="/app/stories/new"
        actionLabel="Create story"
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Log a reading session</CardTitle>
          <p className="text-sm text-muted-foreground">Private parent notes for what worked at bedtime.</p>
        </CardHeader>
        <CardContent>
          <form action={createReadingSessionAction} className="grid gap-4">
            <Field label="Child profile">
              <select className={inputClasses} name="childProfileId" required>
                {children.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.nickname}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Story">
              <select className={inputClasses} name="storyId" required>
                {stories.map((story) => (
                  <option key={story.id} value={story.id}>
                    {story.title}
                  </option>
                ))}
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Reaction">
                <select className={inputClasses} name="reaction" defaultValue="settled">
                  {reactions.map((reaction) => (
                    <option key={reaction} value={reaction}>
                      {reaction}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Minutes read">
                <input className={inputClasses} name="minutesRead" type="number" min="1" max="60" defaultValue="8" />
              </Field>
            </div>
            <Field label="Favorite moment">
              <input className={inputClasses} name="favoriteMoment" placeholder="The moon garden page" />
            </Field>
            <Field label="Parent note">
              <textarea className={textareaClasses} name="parentNote" placeholder="What helped bedtime tonight?" />
            </Field>
            <Button type="submit">Save session</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-sky/20">
        <CardHeader>
          <CardTitle>{totalMinutes} reading minutes logged</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {sessions.slice(0, 8).map((session) => (
            <div key={session.id} className="rounded-2xl border border-border bg-white/75 p-3 text-sm shadow-soft">
              <p className="font-semibold">{session.storyTitle ?? "Untitled story"}</p>
              <p className="text-muted-foreground">
                {session.minutesRead} min · {session.reaction}
              </p>
              {session.parentNote ? <p className="mt-2 text-muted-foreground">{session.parentNote}</p> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}


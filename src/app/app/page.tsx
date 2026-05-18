import { BookOpen, Heart, Stars } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { UsageCard } from "@/components/dashboard/usage-card";
import { SafetyNote } from "@/components/dashboard/safety-note";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { usageService } from "@/lib/services/usage-service";

export const metadata = {
  title: "Dashboard"
};

export default async function DashboardPage() {
  const user = await requireUser();
  const [children, stories, usage] = await Promise.all([
    repositories.children.listByUser(user.id),
    repositories.stories.listByUser(user.id),
    usageService.summary(user.id)
  ]);
  const recentStories = stories.slice(0, 3);

  return (
    <main className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
        <Card className="relative overflow-hidden border-white/80 bg-gradient-to-br from-white via-[#fff2c7] to-[#ffe4f1]">
          <div className="absolute right-6 top-6 text-7xl opacity-20">🌙</div>
          <CardHeader>
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-muted-foreground shadow-soft">
              <Stars size={14} className="text-accent" aria-hidden="true" />
              Tonight&apos;s nest
            </p>
            <CardTitle className="text-3xl">Welcome back, {user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Create parent-reviewed bedtime stories, save favorites, and generate printable
              coloring pages when your plan includes them.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/app/stories/new">Create story</LinkButton>
              <LinkButton href="/app/children/new" variant="outline">
                Add child profile
              </LinkButton>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <UsageCard usage={usage} />
          <SafetyNote />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart size={20} className="text-berry" aria-hidden="true" />
              Child profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {children.length ? (
              <ul className="grid gap-3">
                {children.slice(0, 3).map((child) => (
                  <li
                    key={child.id}
                    className="rounded-2xl border border-border bg-gradient-to-r from-white to-mint/25 p-3 text-sm shadow-soft"
                  >
                    <strong>{child.nickname}</strong>
                    <p className="text-muted-foreground">
                      Ages {child.ageRange} · {child.interests.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="No profiles yet"
                description="Add a nickname-based profile to personalize stories without sensitive details."
                actionHref="/app/children/new"
                actionLabel="Create profile"
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen size={20} className="text-primary" aria-hidden="true" />
              Recent stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentStories.length ? (
              <ul className="grid gap-3">
                {recentStories.map((story) => (
                  <li key={story.id}>
                    <a
                      className="block rounded-2xl border border-border bg-white/80 p-3 text-sm shadow-soft transition hover:-translate-y-0.5 hover:bg-muted"
                      href={`/app/stories/${story.id}`}
                    >
                      <strong>{story.title}</strong>
                      <p className="text-muted-foreground">{story.summary}</p>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="No stories yet"
                description="Generate a calm story once you have a child profile."
                actionHref="/app/stories/new"
                actionLabel="Create story"
              />
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

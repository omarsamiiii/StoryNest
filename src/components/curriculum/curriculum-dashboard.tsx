import type { CurriculumPlan } from "@/types/curriculum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CurriculumDashboard({ plan }: Readonly<{ plan: CurriculumPlan }>) {
  if (plan.childPlans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No child profiles yet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>Create a child profile to unlock profile-aware learning paths and story lesson recommendations.</p>
          <a href="/app/children/new" className="block sm:inline-block">
            <Button>Create child profile</Button>
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      {plan.childPlans.map((childPlan) => (
        <Card key={childPlan.childProfileId}>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle>{childPlan.childNickname}&apos;s learning path</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{childPlan.recommendedTrack.description}</p>
              </div>
              <Badge>{childPlan.recommendedTrack.title}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {childPlan.nextLessons.map((recommendation) => (
                <article key={recommendation.lesson.id} className="rounded-md border border-border bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-semibold">{recommendation.lesson.title}</h2>
                    <Badge>{recommendation.score}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{recommendation.lesson.parentGoal}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">{recommendation.lesson.domain}</span>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">{recommendation.lesson.difficulty}</span>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">{recommendation.lesson.tone}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{recommendation.reasons.join(" / ")}</p>
                  <a href={`/app/stories/new?lesson=${recommendation.lesson.id}`} className="mt-4 block">
                    <Button variant="secondary" className="w-full">
                      Create story
                    </Button>
                  </a>
                </article>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-semibold">Covered domains</h3>
                {childPlan.coveredDomains.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {childPlan.coveredDomains.map((domain) => (
                      <li key={domain.domain} className="flex items-center justify-between gap-3">
                        <span>{domain.domain}</span>
                        <span>{domain.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    No curriculum-aligned stories yet. Start with the first recommended lesson.
                  </p>
                )}
              </div>
              <div className="rounded-md bg-muted p-4">
                <h3 className="font-semibold">Parent guidance</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {childPlan.parentGuidance.map((guidance) => (
                    <li key={guidance}>{guidance}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { MILESTONE_TIER_STYLES } from "@/constants/milestones";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { ParentMilestoneReport } from "@/types/milestones";

export function MilestoneBoard({ report }: Readonly<{ report: ParentMilestoneReport }>) {
  if (!report.childBoards.length) {
    return (
      <EmptyState
        title="No milestone board yet"
        description="Create a child profile and save a story to begin tracking gentle reading milestones."
        actionHref="/app/children/new"
        actionLabel="Create profile"
      />
    );
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        {report.familyHighlights.map((highlight, index) => (
          <Card key={highlight} className="bg-gradient-to-br from-white to-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="grid size-10 place-items-center rounded-2xl bg-white shadow-soft">
                  {["🏆", "📚", "🌈"][index]}
                </span>
                Family highlight
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">{highlight}</CardContent>
          </Card>
        ))}
      </section>

      {report.childBoards.map((board) => (
        <Card key={board.childProfileId} className="overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-primary via-berry to-accent" />
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-2xl">{board.childNickname}&apos;s milestone path</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {board.storyCount} stories, {board.favoriteCount} favorites, {board.themeCount} themes
                </p>
              </div>
              <Badge>
                {board.milestones.filter((milestone) => milestone.achieved).length} /{" "}
                {board.milestones.length} unlocked
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {board.nextMilestone ? (
              <div className="rounded-[2rem] border border-border bg-mint/30 p-4">
                <p className="text-sm font-bold text-foreground">Next cozy win</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {board.nextMilestone.rule.title}: {board.nextMilestone.progress} /{" "}
                  {board.nextMilestone.target} {board.nextMilestone.rule.unit}
                </p>
              </div>
            ) : (
              <div className="rounded-[2rem] border border-border bg-accent/25 p-4 text-sm font-semibold">
                Every milestone is unlocked for this child profile.
              </div>
            )}

            <div className="grid gap-4 lg:grid-cols-2">
              {board.milestones.map((milestone) => (
                <article
                  key={milestone.rule.id}
                  className={`rounded-[2rem] border border-border bg-gradient-to-br ${
                    MILESTONE_TIER_STYLES[milestone.rule.tier]
                  } p-4 shadow-soft`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-bold">{milestone.rule.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{milestone.rule.description}</p>
                    </div>
                    <Badge>{milestone.rule.tier}</Badge>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/75">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${milestone.percent}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-muted-foreground">
                    {milestone.progress} / {milestone.target} {milestone.rule.unit}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{milestone.encouragement}</p>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


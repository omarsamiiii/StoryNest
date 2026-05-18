import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StoryReviewRecord } from "@/types/moderation";

export function ModerationPanel({ reviews }: Readonly<{ reviews: StoryReviewRecord[] }>) {
  if (!reviews.length) {
    return (
      <Card className="bg-gradient-to-br from-white to-mint/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-2xl bg-mint/60">✓</span>
            No flagged reviews
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Story reviews that need attention will appear here.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-berry to-accent" />
          <CardHeader>
            <CardTitle className="text-lg">Story review: {review.storyId}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Score {review.result.score} · {review.result.allowed ? "Allowed" : "Needs review"}
            </p>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
            {review.result.findings.map((finding) => (
              <div
                key={`${review.id}-${finding.ruleId}`}
                className="rounded-2xl border border-border bg-muted/45 p-3"
              >
                <strong className="text-foreground">{finding.label}</strong>
                <p>{finding.recommendation}</p>
                {finding.excerpt ? <p className="mt-1">Excerpt: {finding.excerpt}</p> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

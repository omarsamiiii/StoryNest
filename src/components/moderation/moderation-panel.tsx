import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StoryReviewRecord } from "@/types/moderation";

export function ModerationPanel({ reviews }: Readonly<{ reviews: StoryReviewRecord[] }>) {
  if (!reviews.length) {
    return (
      <Card>
        <CardHeader><CardTitle>No flagged reviews</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Story reviews that need attention will appear here.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <CardTitle className="text-lg">Story review: {review.storyId}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Score {review.result.score} · {review.result.allowed ? "Allowed" : "Needs review"}
            </p>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
            {review.result.findings.map((finding) => (
              <div key={`${review.id}-${finding.ruleId}`} className="rounded-md border border-border p-3">
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

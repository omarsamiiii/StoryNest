import { PLAN_LIMITS } from "@/constants/plans";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UsageSummary } from "@/types/billing";

export function UsageCard({ usage }: Readonly<{ usage: UsageSummary }>) {
  const percent = Math.min(100, Math.round((usage.generatedStories / usage.storyLimit) * 100));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly usage</CardTitle>
        <p className="text-sm text-muted-foreground">{PLAN_LIMITS[usage.planId].name} plan</p>
      </CardHeader>
      <CardContent>
        <div className="h-3 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {usage.generatedStories} of {usage.storyLimit} stories used. {usage.remainingStories} remaining.
        </p>
      </CardContent>
    </Card>
  );
}

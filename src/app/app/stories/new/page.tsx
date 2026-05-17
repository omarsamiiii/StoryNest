import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StoryGenerationForm } from "@/components/stories/story-generation-form";
import { UsageCard } from "@/components/dashboard/usage-card";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { usageService } from "@/lib/services/usage-service";

export const metadata = {
  title: "Create story"
};

export default async function NewStoryPage() {
  const user = await requireUser();
  const [children, usage] = await Promise.all([
    repositories.children.listByUser(user.id),
    usageService.summary(user.id)
  ]);

  if (!children.length) {
    return (
      <EmptyState
        title="Create a child profile first"
        description="StoryNest uses nickname-based profiles to personalize stories without collecting sensitive data."
        actionHref="/app/children/new"
        actionLabel="Create profile"
      />
    );
  }

  if (usage.remainingStories < 1) {
    return (
      <EmptyState
        title="Monthly story limit reached"
        description="Upgrade your plan to keep generating bedtime stories this month."
        actionHref="/app/billing"
        actionLabel="View billing"
      />
    );
  }

  return (
    <main className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Create a bedtime story</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose the child profile, theme, moral, tone, and bedtime-safe constraints.
          </p>
        </CardHeader>
        <CardContent>
          <StoryGenerationForm children={children} />
        </CardContent>
      </Card>
      <UsageCard usage={usage} />
    </main>
  );
}

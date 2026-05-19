import { requireUser } from "@/lib/auth/session";
import { milestoneService } from "@/lib/milestones/milestone-service";
import { MilestoneBoard } from "@/components/milestones/milestone-board";

export default async function MilestonesPage() {
  const user = await requireUser();
  const report = await milestoneService.report(user.id);

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Milestones</p>
        <h1 className="text-3xl font-bold tracking-tight">Celebrate cozy reading habits</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Track parent-visible progress across saved stories, favorites, bedtime-safe reading,
          theme variety, vocabulary, and discussion prompts.
        </p>
      </div>
      <MilestoneBoard report={report} />
    </main>
  );
}


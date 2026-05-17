import { requireUser } from "@/lib/auth/session";
import { curriculumService } from "@/lib/curriculum/curriculum-service";
import { CurriculumDashboard } from "@/components/curriculum/curriculum-dashboard";

export default async function CurriculumPage() {
  const user = await requireUser();
  const plan = await curriculumService.buildPlan(user.id);

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Curriculum planner</p>
        <h1 className="text-3xl font-bold tracking-tight">Turn bedtime stories into gentle learning paths</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          StoryNest maps profile interests, age ranges, and saved stories into parent-controlled lesson paths for
          confidence, friendship, curiosity, responsibility, and calm transitions.
        </p>
      </div>
      <CurriculumDashboard plan={plan} />
    </main>
  );
}


import { RoutinePlanView } from "@/components/routine/routine-plan-view";
import { RoutinePreferencesForm } from "@/components/routine/routine-preferences-form";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { routinePlannerService } from "@/lib/services/routine-planner-service";

export const metadata = {
  title: "Bedtime routine"
};

export default async function RoutinePage() {
  const user = await requireUser();
  const children = await repositories.children.listByUser(user.id);
  const plan = await routinePlannerService.plan(user.id);

  return (
    <main className="grid gap-6">
      <PageHeader
        title="Bedtime routine planner"
        description="Generate a private weekly reading rhythm from saved stories and child preferences."
      />
      {children.length ? (
        <>
          <RoutinePreferencesForm children={children} />
          <RoutinePlanView plan={plan} />
        </>
      ) : (
        <EmptyState
          title="Create a child profile first"
          description="Routine planning needs at least one nickname-based child profile."
          actionHref="/app/children/new"
          actionLabel="Create profile"
        />
      )}
    </main>
  );
}

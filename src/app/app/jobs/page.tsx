import { JobDashboard } from "@/components/jobs/job-dashboard";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";

export const metadata = { title: "Jobs" };

export default async function JobsPage() {
  const user = await requireUser();
  const [jobs, summary] = await Promise.all([
    repositories.generationJobs.listByUser(user.id),
    repositories.generationJobs.summary(user.id)
  ]);
  return (
    <main className="grid gap-6">
      <PageHeader
        title="Generation jobs"
        description="Track background story, coloring page, export, and routine jobs."
      />
      <JobDashboard jobs={jobs} summary={summary} />
    </main>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GenerationJob, QueueSummary } from "@/types/jobs";

export function JobDashboard({
  jobs,
  summary
}: Readonly<{ jobs: GenerationJob[]; summary: QueueSummary }>) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-5">
        {Object.entries(summary).map(([status, count]) => (
          <Card key={status}>
            <CardHeader><CardTitle className="capitalize">{status}</CardTitle></CardHeader>
            <CardContent className="text-3xl font-bold">{count}</CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-3">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle className="text-lg">{job.type}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {job.status} · attempts {job.attempts}/{job.maxAttempts}
              </p>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Scheduled: {new Date(job.scheduledAt).toLocaleString()}
              {job.error ? <p className="text-destructive">Error: {job.error}</p> : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

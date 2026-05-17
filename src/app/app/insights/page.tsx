import { InsightReport } from "@/components/insights/insight-report";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { readingInsightsService } from "@/lib/analytics/reading-insights-service";

export const metadata = { title: "Insights" };

export default async function InsightsPage() {
  const user = await requireUser();
  const report = await readingInsightsService.report(user.id);
  return (
    <main className="grid gap-6">
      <PageHeader
        title="Reading insights"
        description="Understand bedtime story patterns across child profiles and saved stories."
      />
      <InsightReport report={report} />
    </main>
  );
}

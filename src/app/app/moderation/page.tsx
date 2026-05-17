import { ModerationPanel } from "@/components/moderation/moderation-panel";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";

export const metadata = { title: "Moderation" };

export default async function ModerationPage() {
  const user = await requireUser();
  const reviews = await repositories.storyReviews.listFlagged(user.id);
  return (
    <main className="grid gap-6">
      <PageHeader
        title="Story review queue"
        description="Review safety findings for generated stories before reuse."
      />
      <ModerationPanel reviews={reviews} />
    </main>
  );
}

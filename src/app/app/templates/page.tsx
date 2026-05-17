import { requireUser } from "@/lib/auth/session";
import { storyRecommendationService } from "@/lib/recommendations/story-recommendation-service";
import { TemplateBoard } from "@/components/templates/template-board";

export default async function TemplatesPage() {
  const user = await requireUser();
  const board = await storyRecommendationService.board(user.id);

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Story templates</p>
        <h1 className="text-3xl font-bold tracking-tight">Guided bedtime story starting points</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Browse reusable story structures and profile-aware recommendations that keep generation consistent,
          privacy-conscious, and bedtime appropriate.
        </p>
      </div>
      <TemplateBoard recommendations={board.recommendationsByChild} />
    </main>
  );
}


import { notFound } from "next/navigation";
import { StoryCard } from "@/components/stories/story-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";

export default async function CollectionDetailPage({
  params
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const user = await requireUser();
  const { id } = await params;
  const collection = await repositories.collections.findById(user.id, id);
  if (!collection) notFound();
  const stories = await repositories.stories.listByUser(user.id);
  const collectionStories = collection.storyIds
    .map((storyId) => stories.find((story) => story.id === storyId))
    .filter(Boolean);

  return (
    <main className="grid gap-6">
      <PageHeader title={collection.name} description={collection.description || "Private story collection"} />
      {collectionStories.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {collectionStories.map((story) => (
            <StoryCard key={story!.id} story={story!} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No stories in this collection"
          description="Open a story reader and add it to this collection."
          actionHref="/app/stories"
          actionLabel="Browse stories"
        />
      )}
    </main>
  );
}

import { EmptyState } from "@/components/ui/empty-state";
import { StoryCard } from "@/components/stories/story-card";
import { StoryLibraryFilters } from "@/components/stories/story-library-filters";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { storyLibraryQuerySchema } from "@/validation/story";

export const metadata = {
  title: "Story library"
};

export default async function StoryLibraryPage({
  searchParams
}: Readonly<{ searchParams: Promise<Record<string, string | string[] | undefined>> }>) {
  const user = await requireUser();
  const raw = await searchParams;
  const query = storyLibraryQuerySchema.parse({
    search: raw.search,
    childProfileId: raw.childProfileId,
    theme: raw.theme,
    favorite: raw.favorite,
    sort: raw.sort
  });
  const [stories, children, themes] = await Promise.all([
    repositories.stories.listByUser(user.id, query),
    repositories.children.listByUser(user.id),
    repositories.stories.distinctThemes(user.id)
  ]);

  return (
    <main className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Story library</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search, filter, favorite, and revisit saved bedtime stories.
        </p>
      </div>
      <StoryLibraryFilters children={children} themes={themes} defaults={query} />
      {stories.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No matching stories"
          description="Generate a story or loosen your filters to see more results."
          actionHref="/app/stories/new"
          actionLabel="Create story"
        />
      )}
    </main>
  );
}

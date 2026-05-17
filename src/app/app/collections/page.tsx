import { CollectionForm } from "@/components/collections/collection-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { storyCollectionService } from "@/lib/services/story-collection-service";

export const metadata = {
  title: "Collections"
};

export default async function CollectionsPage() {
  const user = await requireUser();
  const summaries = await storyCollectionService.summaries(user.id);

  return (
    <main className="grid gap-6">
      <PageHeader
        title="Private story collections"
        description="Group saved stories into parent-controlled bedtime sets."
      />
      <CollectionForm />
      {summaries.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {summaries.map(({ collection, storyCount, latestStoryTitle }) => (
            <a key={collection.id} href={`/app/collections/${collection.id}`}>
              <Card className="h-full hover:border-primary">
                <CardHeader>
                  <CardTitle>{collection.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{storyCount} saved stories</p>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  <p>{collection.description || "No description yet."}</p>
                  {latestStoryTitle ? <p className="mt-2">Latest: {latestStoryTitle}</p> : null}
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No collections yet"
          description="Create collections for school nights, favorites, calm stories, or printable activities."
        />
      )}
    </main>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { generateColoringPagesAction } from "@/lib/services/coloring-actions";

export default async function ColoringPageRoute({
  params
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const user = await requireUser();
  const { id } = await params;
  const story = await repositories.stories.findById(user.id, id);
  if (!story) notFound();
  const pages = await repositories.coloringPages.listByStory(user.id, story.id);

  return (
    <main className="grid gap-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Coloring pages</h1>
          <p className="mt-2 text-sm text-muted-foreground">{story.title}</p>
        </div>
        <form action={generateColoringPagesAction}>
          <input type="hidden" name="storyId" value={story.id} />
          <Button type="submit">Generate pages</Button>
        </form>
      </div>
      {pages.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle className="text-lg">{page.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={page.imageUrl}
                  alt={page.description}
                  width={800}
                  height={1000}
                  className="rounded-md border border-border bg-white"
                  unoptimized
                />
                <p className="mt-3 text-xs leading-5 text-muted-foreground">{page.prompt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No coloring pages yet"
          description="Generate printable line-art ideas from this story."
        />
      )}
    </main>
  );
}

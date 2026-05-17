import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";

export default async function PrintStoryPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const user = await requireUser();
  const { id } = await params;
  const story = await repositories.stories.findById(user.id, id);
  if (!story) notFound();

  return (
    <main className="mx-auto max-w-3xl bg-white p-8 print:p-0">
      <div className="print-hidden mb-6 flex justify-between gap-3">
        <a className="text-sm font-semibold text-primary" href={`/app/stories/${story.id}`}>
          Back to story
        </a>
        <Button onClick={() => globalThis.print()}>Print story</Button>
      </div>
      <article className="print-surface rounded-lg border border-border bg-white p-8 shadow-soft">
        <h1 className="text-4xl font-bold">{story.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{story.summary}</p>
        {story.pages.map((page) => (
          <section key={page.title} className="mt-8 break-inside-avoid">
            <h2 className="text-2xl font-semibold">{page.title}</h2>
            <p className="mt-3 text-lg leading-9">{page.body}</p>
          </section>
        ))}
        <section className="mt-8 border-t border-border pt-5">
          <h2 className="text-xl font-semibold">After the story</h2>
          <p className="mt-2">Moral: {story.moral}</p>
          <p className="mt-2">Vocabulary: {story.vocabularyWords.join(", ")}</p>
        </section>
      </article>
    </main>
  );
}

import { Heart, Moon, Palette, Printer, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { AddToCollectionForm } from "@/components/collections/add-to-collection-form";
import { favoriteStoryAction } from "@/lib/services/story-actions";
import { generateColoringPagesAction } from "@/lib/services/coloring-actions";
import type { Story } from "@/types/story";
import type { StoryCollection } from "@/types/collections";

export function StoryReader({
  story,
  collections = []
}: Readonly<{ story: Story; collections?: StoryCollection[] }>) {
  return (
    <article className="mx-auto grid max-w-4xl gap-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-white via-[#fff4d8] to-[#e4f8ff] p-6 shadow-story">
        <div className="absolute right-6 top-6 text-7xl opacity-20">☾</div>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 text-sm font-semibold text-muted-foreground shadow-soft">
            <Moon size={15} className="text-primary" aria-hidden="true" />
            {story.estimatedReadingTime} · recommended ages {story.recommendedAge}
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight">{story.title}</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{story.summary}</p>
        </div>
        <div className="flex gap-2">
          <form action={favoriteStoryAction}>
            <input type="hidden" name="storyId" value={story.id} />
            <input type="hidden" name="favorite" value={String(!story.favorite)} />
            <Button type="submit" variant="outline" aria-label="Toggle favorite">
              <Heart size={16} className={story.favorite ? "fill-berry text-berry" : ""} />
            </Button>
          </form>
          <LinkButton href={`/app/stories/${story.id}/print`} variant="outline">
            <Printer size={16} aria-hidden="true" />
            Print
          </LinkButton>
        </div>
      </div>
      </div>

      <div className="grid gap-4">
        {story.pages.map((page, index) => (
          <Card key={page.title} className="bg-[#fffdf7]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-2xl bg-accent/30 text-sm">
                  {index + 1}
                </span>
                {page.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-9">{page.body}</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles size={20} className="text-accent" aria-hidden="true" />
            Moral, words, and discussion
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 text-sm leading-6 text-muted-foreground">
          <p>
            <strong className="text-foreground">Moral:</strong> {story.moral}
          </p>
          <p>
            <strong className="text-foreground">Vocabulary:</strong>{" "}
            {story.vocabularyWords.join(", ")}
          </p>
          <ul className="grid gap-2">
            {story.discussionQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
          <form action={generateColoringPagesAction}>
            <input type="hidden" name="storyId" value={story.id} />
            <Button type="submit" variant="secondary">
              <Palette size={16} aria-hidden="true" />
              Generate coloring pages
            </Button>
          </form>
        </CardContent>
      </Card>
      <AddToCollectionForm storyId={story.id} collections={collections} />
    </article>
  );
}

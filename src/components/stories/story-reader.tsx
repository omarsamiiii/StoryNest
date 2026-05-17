import { Heart, Palette, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { favoriteStoryAction } from "@/lib/services/story-actions";
import { generateColoringPagesAction } from "@/lib/services/coloring-actions";
import type { Story } from "@/types/story";

export function StoryReader({ story }: Readonly<{ story: Story }>) {
  return (
    <article className="mx-auto grid max-w-4xl gap-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">
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
              <Heart size={16} className={story.favorite ? "fill-accent text-accent" : ""} />
            </Button>
          </form>
          <LinkButton href={`/app/stories/${story.id}/print`} variant="outline">
            <Printer size={16} aria-hidden="true" />
            Print
          </LinkButton>
        </div>
      </div>

      <div className="grid gap-4">
        {story.pages.map((page) => (
          <Card key={page.title} className="bg-[#fffdf7]">
            <CardHeader>
              <CardTitle>{page.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-9">{page.body}</CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moral, words, and discussion</CardTitle>
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
    </article>
  );
}

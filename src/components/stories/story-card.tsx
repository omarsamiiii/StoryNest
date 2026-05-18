import { BookOpen, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Story } from "@/types/story";

export function StoryCard({ story }: Readonly<{ story: Story }>) {
  return (
    <a href={`/app/stories/${story.id}`} className="block">
      <Card className="h-full overflow-hidden transition hover:-translate-y-1 hover:border-primary">
        <div className="h-2 bg-gradient-to-r from-sky via-storybook to-accent" />
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-primary">
                <BookOpen size={18} aria-hidden="true" />
              </span>
              <CardTitle className="text-lg">{story.title}</CardTitle>
            </div>
            {story.favorite ? <Heart size={18} className="fill-berry text-berry" /> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{story.theme}</Badge>
            <Badge>{story.estimatedReadingTime}</Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-muted-foreground">
          <p>{story.summary}</p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">
            <span className="size-2 rounded-full bg-accent" />
            Open bedtime reader
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Story } from "@/types/story";

export function StoryCard({ story }: Readonly<{ story: Story }>) {
  return (
    <a href={`/app/stories/${story.id}`} className="block">
      <Card className="h-full transition hover:-translate-y-0.5 hover:border-primary">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg">{story.title}</CardTitle>
            {story.favorite ? <Heart size={18} className="fill-accent text-accent" /> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{story.theme}</Badge>
            <Badge>{story.estimatedReadingTime}</Badge>
          </div>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-muted-foreground">{story.summary}</CardContent>
      </Card>
    </a>
  );
}

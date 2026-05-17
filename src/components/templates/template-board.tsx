import { storyTemplateEngine } from "@/lib/templates/story-template-engine";
import type { TemplateRecommendation } from "@/types/templates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TemplateBoardProps {
  recommendations: Array<{
    childProfileId: string;
    childNickname: string;
    templates: TemplateRecommendation[];
    nextBestTheme: string;
    reason: string;
  }>;
}

export function TemplateBoard({ recommendations }: Readonly<TemplateBoardProps>) {
  const templates = storyTemplateEngine.list();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <Badge>{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>{template.description}</p>
              <div className="flex flex-wrap gap-2">
                {template.interests.map((interest) => (
                  <span key={interest} className="rounded-full bg-muted px-2 py-1 text-xs">
                    {interest}
                  </span>
                ))}
              </div>
              <dl className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <dt className="font-semibold text-foreground">Tone</dt>
                  <dd>{template.tone}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Length</dt>
                  <dd>{template.length}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Theme</dt>
                  <dd>{template.themeSeed}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">Safety</dt>
                  <dd>{template.bedtimeSafe ? "Bedtime safe" : "Needs review"}</dd>
                </div>
              </dl>
              <a href={`/app/stories/new?template=${template.id}`} className="block">
                <Button variant="secondary" className="w-full">
                  Use template
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {recommendations.map((child) => (
          <Card key={child.childProfileId}>
            <CardHeader>
              <CardTitle className="text-lg">{child.childNickname}&apos;s next story ideas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Recommended next theme: <span className="font-medium text-foreground">{child.nextBestTheme}</span>
              </p>
              <p className="text-xs text-muted-foreground">{child.reason}</p>
              <div className="space-y-3">
                {child.templates.map((recommendation) => (
                  <div key={recommendation.template.id} className="rounded-md border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{recommendation.template.name}</p>
                      <Badge>{recommendation.score}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{recommendation.reasons.join(" / ")}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

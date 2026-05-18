import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ParentInsightReport } from "@/types/insights";

const statStyles = [
  "from-sky/55 to-white",
  "from-berry/40 to-white",
  "from-mint/60 to-white"
];

export function InsightReport({ report }: Readonly<{ report: ParentInsightReport }>) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Total stories", report.totalStories, "📚"],
          ["Favorites", report.favoriteCount, "💛"],
          ["Reading minutes", report.estimatedReadingMinutes, "🌙"]
        ].map(([label, value, icon], index) => (
          <Card key={label} className={`bg-gradient-to-br ${statStyles[index]}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {label}
                <span className="text-3xl">{icon}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-4xl font-bold">{value}</CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {report.insights.map((insight) => (
          <Card key={insight.id} className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />
            <CardHeader>
              <CardTitle className="text-lg">{insight.label}</CardTitle>
              <p className="text-sm text-muted-foreground">{insight.value}</p>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {insight.detail}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {report.childProfiles.map((profile) => (
          <Card key={profile.childProfileId} className="bg-gradient-to-br from-white to-mint/25">
            <CardHeader>
              <CardTitle>{profile.childNickname}</CardTitle>
              <p className="text-sm text-muted-foreground">{profile.storyCount} stories</p>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm leading-6 text-muted-foreground">
              <p>Favorite themes: {profile.favoriteThemes.join(", ") || "None yet"}</p>
              <p>Vocabulary: {profile.commonVocabulary.join(", ") || "None yet"}</p>
              <p>Bedtime-safe ratio: {profile.bedtimeSafeRatio}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

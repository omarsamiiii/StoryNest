import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ParentInsightReport } from "@/types/insights";

export function InsightReport({ report }: Readonly<{ report: ParentInsightReport }>) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Total stories</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{report.totalStories}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Favorites</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{report.favoriteCount}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Reading minutes</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{report.estimatedReadingMinutes}</CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {report.insights.map((insight) => (
          <Card key={insight.id}>
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
          <Card key={profile.childProfileId}>
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

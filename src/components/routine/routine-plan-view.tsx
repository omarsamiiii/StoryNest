import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RoutinePlan } from "@/types/routine";

export function RoutinePlanView({ plan }: Readonly<{ plan: RoutinePlan }>) {
  return (
    <div className="grid gap-4">
      {plan.nights.map((night) => (
        <Card key={night.day}>
          <CardHeader>
            <CardTitle className="text-lg">
              {night.day}: {night.childNickname}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {night.readingMinutes} minutes · {night.tone} · {night.theme}
            </p>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
            <p>{night.parentPrompt}</p>
            <ul className="grid gap-1">
              {night.windDownSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PrivacyChecklistItem } from "@/types/privacy";

export function PrivacyChecklist({ items }: Readonly<{ items: PrivacyChecklistItem[] }>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-lg">{item.label}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {item.complete ? "Complete" : "Needs attention"}
            </p>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            {item.detail}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

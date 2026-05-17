import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AppLoading() {
  return (
    <main className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
        </CardContent>
      </Card>
    </main>
  );
}

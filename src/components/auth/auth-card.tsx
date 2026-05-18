import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthCard({
  title,
  children
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <main className="storybook-shell grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md overflow-hidden border-white/80">
        <div className="h-3 bg-gradient-to-r from-primary via-berry to-accent" />
        <CardHeader>
          <a href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <span className="grid size-8 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-soft">
              ✦
            </span>
            StoryNest
          </a>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}

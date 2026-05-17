import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">That StoryNest page is not available.</p>
        <LinkButton href="/" className="mt-6">
          Go home
        </LinkButton>
      </div>
    </main>
  );
}

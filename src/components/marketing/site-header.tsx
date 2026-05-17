import { BookOpen } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function SiteHeader() {
  return (
    <header className="print-hidden sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <BookOpen size={18} aria-hidden="true" />
          </span>
          StoryNest
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#how">How it works</a>
          <a href="/#safety">Safety</a>
          <a href="/pricing">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/login" variant="ghost">
            Log in
          </LinkButton>
          <LinkButton href="/signup">Start free</LinkButton>
        </div>
      </div>
    </header>
  );
}

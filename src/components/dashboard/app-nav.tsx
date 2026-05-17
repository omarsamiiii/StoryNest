import { BookOpen, CalendarDays, CreditCard, FolderHeart, Home, Library, Settings, Users } from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

const nav = [
  ["/app", "Dashboard", Home],
  ["/app/children", "Children", Users],
  ["/app/stories", "Library", Library],
  ["/app/collections", "Collections", FolderHeart],
  ["/app/routine", "Routine", CalendarDays],
  ["/app/stories/new", "Create", BookOpen],
  ["/app/billing", "Billing", CreditCard],
  ["/app/account", "Account", Settings]
] as const;

export function AppNav({ parentName }: Readonly<{ parentName: string }>) {
  return (
    <aside className="print-hidden border-b border-border bg-white md:min-h-screen md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:block">
        <a href="/app" className="font-semibold">
          StoryNest
        </a>
        <p className="hidden text-xs text-muted-foreground md:mt-1 md:block">Parent: {parentName}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:grid">
        {nav.map(([href, label, Icon]) => (
          <a
            key={href}
            href={href}
            className="flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
      <form action={logoutAction} className="hidden px-3 md:block">
        <Button type="submit" variant="ghost" className="w-full justify-start">
          Log out
        </Button>
      </form>
    </aside>
  );
}

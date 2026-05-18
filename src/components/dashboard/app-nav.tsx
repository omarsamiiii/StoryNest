import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  FolderHeart,
  Home,
  Library,
  ListChecks,
  LockKeyhole,
  Palette,
  Settings,
  Users
} from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";

const nav = [
  ["/app", "Dashboard", Home],
  ["/app/children", "Children", Users],
  ["/app/stories", "Library", Library],
  ["/app/collections", "Collections", FolderHeart],
  ["/app/templates", "Templates", Palette],
  ["/app/curriculum", "Curriculum", GraduationCap],
  ["/app/routine", "Routine", CalendarDays],
  ["/app/insights", "Insights", BarChart3],
  ["/app/reminders", "Reminders", Bell],
  ["/app/moderation", "Review", ClipboardCheck],
  ["/app/privacy", "Privacy", LockKeyhole],
  ["/app/jobs", "Jobs", ListChecks],
  ["/app/stories/new", "Create", BookOpen],
  ["/app/billing", "Billing", CreditCard],
  ["/app/account", "Account", Settings]
] as const;

export function AppNav({ parentName }: Readonly<{ parentName: string }>) {
  return (
    <aside className="print-hidden relative z-20 border-b border-border/70 bg-white/82 backdrop-blur md:min-h-screen md:border-b-0 md:border-r">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:block">
        <a href="/app" className="flex items-center gap-2 font-bold">
          <span className="grid size-9 place-items-center rounded-2xl bg-accent text-lg shadow-soft">✦</span>
          <span>StoryNest</span>
        </a>
        <p className="hidden text-xs text-muted-foreground md:mt-1 md:block">Parent: {parentName}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:grid">
        {nav.map(([href, label, Icon]) => (
          <a
            key={href}
            href={href}
            className="group flex min-h-10 items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:-translate-y-0.5 hover:bg-accent/30 hover:text-foreground"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-muted transition group-hover:bg-white">
              <Icon size={16} aria-hidden="true" />
            </span>
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

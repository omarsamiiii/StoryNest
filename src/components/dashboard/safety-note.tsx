import { ShieldCheck } from "lucide-react";

export function SafetyNote() {
  return (
    <aside className="rounded-lg border border-border bg-white p-4 text-sm leading-6 text-muted-foreground">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <ShieldCheck size={18} aria-hidden="true" />
        Privacy-conscious by default
      </div>
      <p className="mt-2">
        StoryNest profiles are private to the parent account and use nicknames, age ranges, and
        preferences only.
      </p>
    </aside>
  );
}

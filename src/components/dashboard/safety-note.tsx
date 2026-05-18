import { ShieldCheck } from "lucide-react";

export function SafetyNote() {
  return (
    <aside className="storybook-pop rounded-2xl border border-border bg-white/88 p-4 text-sm leading-6 text-muted-foreground shadow-soft backdrop-blur">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <span className="grid size-9 place-items-center rounded-2xl bg-mint/60">
          <ShieldCheck size={18} aria-hidden="true" />
        </span>
        Privacy-conscious by default
      </div>
      <p className="mt-2">
        StoryNest profiles are private to the parent account and use nicknames, age ranges, and
        preferences only.
      </p>
    </aside>
  );
}

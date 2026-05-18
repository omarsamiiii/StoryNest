import { Badge } from "@/components/ui/badge";

export function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="absolute -left-8 top-8 size-16 rounded-full bg-mint/80 blur-sm sparkle-drift" />
      <div className="absolute -right-4 top-0 size-20 rounded-full bg-accent/70 blur-sm sparkle-drift delay-150" />
      <div className="absolute bottom-6 right-8 size-12 rounded-full bg-berry/50 blur-sm sparkle-drift delay-300" />

      <div className="relative rotate-2 rounded-[2rem] border-4 border-white bg-white p-4 shadow-story">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-[#fff4c8] via-[#ffe2f1] to-[#dff8ff] p-5">
          <div className="mb-4 flex items-center justify-between">
            <Badge>Tonight&apos;s story</Badge>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
              4 min read
            </span>
          </div>
          <div className="grid min-h-44 place-items-center rounded-[1.4rem] bg-white/65 p-4 text-center shadow-soft">
            <div>
              <div className="mx-auto grid size-24 place-items-center rounded-full bg-primary text-5xl text-primary-foreground shadow-glow">
                ✦
              </div>
              <h2 className="mt-4 text-2xl font-bold">Mira and the Moonlit Garden</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A calm story about kindness, curious flowers, and a little lantern that glows
                brighter whenever someone shares.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["🌙", "Gentle bedtime-safe pacing"],
              ["🖍", "Printable coloring page ideas"],
              ["💬", "Parent-child discussion prompts"]
            ].map(([icon, item]) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/78 px-4 py-3 text-sm font-medium shadow-soft"
              >
                <span className="grid size-8 place-items-center rounded-full bg-accent/25">{icon}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

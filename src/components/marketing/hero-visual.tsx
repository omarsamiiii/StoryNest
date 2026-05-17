import { Badge } from "@/components/ui/badge";

export function HeroVisual() {
  return (
    <div className="relative rounded-lg border border-border bg-white p-5 shadow-soft">
      <div className="rounded-md bg-[#f7efe3] p-5">
        <div className="mb-4 flex items-center justify-between">
          <Badge>Tonight's story</Badge>
          <span className="text-xs font-semibold text-muted-foreground">4 min read</span>
        </div>
        <h2 className="text-2xl font-bold">Mira and the Moonlit Garden</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          A calm story about kindness, curious foxgloves, and a little lantern that glows
          brighter whenever someone shares.
        </p>
        <div className="mt-6 grid gap-3">
          {["Gentle bedtime-safe pacing", "Printable story view", "Coloring page ideas"].map(
            (item) => (
              <div key={item} className="rounded-md border border-border bg-white px-4 py-3 text-sm">
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

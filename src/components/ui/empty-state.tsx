import { LinkButton } from "@/components/ui/link-button";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel
}: Readonly<{
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}>) {
  return (
    <div className="rounded-[2rem] border border-dashed border-border bg-white/78 p-8 text-center shadow-soft">
      <div className="mx-auto mb-4 grid size-14 place-items-center rounded-3xl bg-accent/35 text-2xl">✦</div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
      {actionHref && actionLabel ? (
        <LinkButton href={actionHref} className="mt-5">
          {actionLabel}
        </LinkButton>
      ) : null}
    </div>
  );
}

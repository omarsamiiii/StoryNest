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
    <div className="rounded-lg border border-dashed border-border bg-white/75 p-8 text-center">
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

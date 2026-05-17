import { cn } from "@/lib/utils/cn";

export function Badge({
  children,
  className
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

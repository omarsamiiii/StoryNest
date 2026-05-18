import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  children
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return (
    <section
      className={cn(
        "storybook-pop rounded-2xl border border-border/80 bg-white/92 shadow-soft backdrop-blur",
        className
      )}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  className,
  children
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return <div className={cn("space-y-2 p-6 pb-3", className)}>{children}</div>;
}

export function CardTitle({
  className,
  children
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return <h2 className={cn("text-xl font-bold tracking-normal", className)}>{children}</h2>;
}

export function CardDescription({
  className,
  children
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return <p className={cn("text-sm leading-6 text-muted-foreground", className)}>{children}</p>;
}

export function CardContent({
  className,
  children
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return <div className={cn("p-6 pt-3", className)}>{children}</div>;
}

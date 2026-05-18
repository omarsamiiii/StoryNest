import { cn } from "@/lib/utils/cn";

export function Field({
  label,
  hint,
  error,
  children
}: Readonly<{
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}>) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span className="text-foreground">{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
      {error ? <span className="text-xs font-semibold text-destructive">{error}</span> : null}
    </label>
  );
}

export const inputClasses = cn(
  "min-h-11 w-full rounded-2xl border border-border bg-white/90 px-4 py-2 text-sm shadow-sm outline-none transition",
  "hover:border-primary/60 focus:border-primary focus:ring-4 focus:ring-primary/15"
);

export const textareaClasses = cn(inputClasses, "min-h-28 resize-y");

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
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
      {error ? <span className="text-xs font-semibold text-destructive">{error}</span> : null}
    </label>
  );
}

export const inputClasses = cn(
  "min-h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm shadow-sm outline-none transition",
  "focus:border-primary focus:ring-2 focus:ring-primary/15"
);

export const textareaClasses = cn(inputClasses, "min-h-28 resize-y");

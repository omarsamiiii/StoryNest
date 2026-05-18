import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type LinkButtonVariant = "primary" | "secondary" | "ghost" | "outline";

const variantClasses: Record<LinkButtonVariant, string> = {
  primary: "storybook-gradient text-primary-foreground shadow-glow hover:brightness-105",
  secondary: "bg-accent text-accent-foreground shadow-soft hover:bg-accent/90",
  ghost: "bg-transparent hover:bg-muted",
  outline: "border border-border bg-white hover:bg-muted"
};

export function LinkButton({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: LinkButtonVariant;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

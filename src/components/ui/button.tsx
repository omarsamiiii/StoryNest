import * as React from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "storybook-gradient text-primary-foreground shadow-glow hover:brightness-105",
  secondary: "bg-accent text-accent-foreground shadow-soft hover:bg-accent/90",
  ghost: "bg-transparent hover:bg-muted",
  outline: "border border-border bg-white hover:bg-muted",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-55",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";

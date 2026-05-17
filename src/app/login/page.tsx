import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Field, inputClasses } from "@/components/ui/field";
import { loginAction } from "@/lib/auth/actions";

export const metadata = {
  title: "Log in"
};

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back">
      <form action={loginAction} className="grid gap-4">
        <Field label="Email">
          <input className={inputClasses} name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Password">
          <input
            className={inputClasses}
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="current-password"
          />
        </Field>
        <Button type="submit">Log in</Button>
      </form>
      <p className="mt-5 text-sm text-muted-foreground">
        New to StoryNest?{" "}
        <Link href="/signup" className="font-semibold text-primary">
          Create an account
        </Link>
      </p>
    </AuthCard>
  );
}

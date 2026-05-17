import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Field, inputClasses } from "@/components/ui/field";
import { signUpAction } from "@/lib/auth/actions";

export const metadata = {
  title: "Sign up"
};

export default function SignupPage() {
  return (
    <AuthCard title="Create your parent account">
      <form action={signUpAction} className="grid gap-4">
        <Field label="Parent name">
          <input className={inputClasses} name="name" required autoComplete="name" />
        </Field>
        <Field label="Email">
          <input className={inputClasses} name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Password" hint="Use at least 8 characters. Local mock auth only.">
          <input
            className={inputClasses}
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </Field>
        <Button type="submit">Start free</Button>
      </form>
      <p className="mt-5 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Log in
        </Link>
      </p>
    </AuthCard>
  );
}

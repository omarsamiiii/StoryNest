import { PricingCard } from "@/components/billing/pricing-card";
import { UsageCard } from "@/components/dashboard/usage-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlanOptions } from "@/lib/billing/plan-utils";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { upgradePlanAction } from "@/lib/services/billing-actions";
import { usageService } from "@/lib/services/usage-service";

export const metadata = {
  title: "Billing"
};

export default async function BillingPage() {
  const user = await requireUser();
  const [subscription, usage] = await Promise.all([
    repositories.subscriptions.ensureForUser(user.id),
    usageService.summary(user.id)
  ]);

  return (
    <main className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Billing and usage</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mock billing simulates Stripe-style upgrades for local development.
        </p>
      </div>
      <section className="grid gap-4 lg:grid-cols-[340px_1fr]">
        <UsageCard usage={usage} />
        <Card>
          <CardHeader>
            <CardTitle>Subscription status</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            Current plan: <strong className="text-foreground">{subscription.planId}</strong>. Status:{" "}
            <strong className="text-foreground">{subscription.status}</strong>. This MVP does not
            process real payments.
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {getPlanOptions().map((plan) => (
          <PricingCard
            key={plan.id}
            {...plan}
            action={upgradePlanAction}
            currentPlan={subscription.planId}
          />
        ))}
      </section>
    </main>
  );
}

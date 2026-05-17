import { PricingCard } from "@/components/billing/pricing-card";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { getPlanOptions } from "@/lib/billing/plan-utils";

export const metadata = {
  title: "Pricing"
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold">Plans for every family rhythm</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Start free, then upgrade when coloring pages, bigger libraries, and more child profiles
            become part of your bedtime routine.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {getPlanOptions().map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

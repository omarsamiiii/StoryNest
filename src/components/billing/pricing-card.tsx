import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlanId } from "@/types/billing";

export function PricingCard({
  id,
  name,
  priceLabel,
  features,
  action,
  currentPlan
}: Readonly<{
  id: PlanId;
  name: string;
  priceLabel: string;
  features: string[];
  action?: (formData: FormData) => Promise<void>;
  currentPlan?: PlanId;
}>) {
  return (
    <Card className={id === "premium" ? "relative overflow-hidden border-primary shadow-glow" : "overflow-hidden"}>
      <div
        className={
          id === "premium"
            ? "h-3 bg-gradient-to-r from-primary via-berry to-accent"
            : "h-3 bg-gradient-to-r from-mint to-sky"
        }
      />
      {id === "premium" ? (
        <span className="absolute right-4 top-5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-soft">
          Most loved
        </span>
      ) : null}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-3xl font-bold">{priceLabel}</p>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 rounded-2xl bg-muted/55 px-3 py-2">
              <CheckCircle2 size={18} className="shrink-0 text-primary" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {action ? (
          <form action={action} className="mt-6">
            <input type="hidden" name="planId" value={id} />
            <Button type="submit" className="w-full" disabled={currentPlan === id}>
              {currentPlan === id ? "Current plan" : "Simulate upgrade"}
            </Button>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}

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
    <Card className={id === "premium" ? "border-primary" : undefined}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-3xl font-bold">{priceLabel}</p>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <CheckCircle2 size={18} className="text-primary" aria-hidden="true" />
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

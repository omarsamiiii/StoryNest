import type { PlanId, Subscription } from "@/types/billing";

export interface BillingProvider {
  upgrade(userId: string, planId: PlanId): Promise<Subscription>;
  getSubscription(userId: string): Promise<Subscription>;
}

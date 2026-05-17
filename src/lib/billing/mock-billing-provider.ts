import type { PlanId } from "@/types/billing";
import type { BillingProvider } from "@/lib/billing/billing-provider";
import { repositories } from "@/lib/repositories";

export class MockBillingProvider implements BillingProvider {
  async getSubscription(userId: string) {
    return repositories.subscriptions.ensureForUser(userId);
  }

  async upgrade(userId: string, planId: PlanId) {
    return repositories.subscriptions.updatePlan(userId, planId);
  }
}

export const billingProvider = new MockBillingProvider();

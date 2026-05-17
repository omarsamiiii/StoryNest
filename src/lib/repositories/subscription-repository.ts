import type { PlanId, Subscription } from "@/types/billing";
import { getLocalStore } from "@/lib/db/local-store";
import { createId } from "@/lib/db/id";

function period() {
  const start = new Date();
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

export class SubscriptionRepository {
  async ensureForUser(userId: string): Promise<Subscription> {
    const store = getLocalStore();
    const existing = store.subscriptions.find((subscription) => subscription.userId === userId);
    if (existing) return existing;

    const { start, end } = period();
    const subscription: Subscription = {
      id: createId("sub"),
      userId,
      planId: "free",
      status: "active",
      currentPeriodStart: start,
      currentPeriodEnd: end
    };
    store.subscriptions.push(subscription);
    return subscription;
  }

  async updatePlan(userId: string, planId: PlanId) {
    const subscription = await this.ensureForUser(userId);
    subscription.planId = planId;
    subscription.status = "active";
    return subscription;
  }
}

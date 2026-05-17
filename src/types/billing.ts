export type PlanId = "free" | "premium" | "family";

export interface Subscription {
  id: string;
  userId: string;
  planId: PlanId;
  status: "active" | "trialing" | "canceled";
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

export interface UsageSummary {
  userId: string;
  month: string;
  generatedStories: number;
  storyLimit: number;
  remainingStories: number;
  planId: PlanId;
}

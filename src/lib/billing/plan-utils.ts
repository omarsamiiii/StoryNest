import { PLAN_LIMITS } from "@/constants/plans";
import type { PlanId } from "@/types/billing";

export function getPlanLimit(planId: PlanId) {
  return PLAN_LIMITS[planId];
}

export function getPlanOptions() {
  return Object.entries(PLAN_LIMITS).map(([id, plan]) => ({
    id: id as PlanId,
    ...plan
  }));
}

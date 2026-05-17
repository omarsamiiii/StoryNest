"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { billingProvider } from "@/lib/billing/mock-billing-provider";
import { upgradeSchema } from "@/validation/billing";

export async function upgradePlanAction(formData: FormData) {
  const user = await requireUser();
  const input = upgradeSchema.parse({ planId: formData.get("planId") });
  await billingProvider.upgrade(user.id, input.planId);
  redirect("/app/billing");
}

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { billingProvider } from "@/lib/billing/mock-billing-provider";
import { upgradeSchema } from "@/validation/billing";

export async function POST(request: Request) {
  const user = await requireUser();
  const input = upgradeSchema.parse(await request.json());
  const subscription = await billingProvider.upgrade(user.id, input.planId);
  return NextResponse.json(subscription);
}

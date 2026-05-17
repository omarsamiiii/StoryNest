import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { childProfileInputSchema } from "@/validation/children";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await repositories.children.listByUser(user.id));
}

export async function POST(request: Request) {
  const user = await requireUser();
  const input = childProfileInputSchema.parse(await request.json());
  const profile = await repositories.children.create(user.id, input);
  return NextResponse.json(profile, { status: 201 });
}

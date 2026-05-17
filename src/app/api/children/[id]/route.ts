import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { childProfileInputSchema } from "@/validation/children";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const input = childProfileInputSchema.parse(await request.json());
  const profile = await repositories.children.update(user.id, id, input);
  return profile ? NextResponse.json(profile) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const deleted = await repositories.children.delete(user.id, id);
  return NextResponse.json({ deleted });
}

import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { collectionInputSchema } from "@/validation/collections";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await repositories.collections.listByUser(user.id));
}

export async function POST(request: Request) {
  const user = await requireUser();
  const input = collectionInputSchema.parse(await request.json());
  const collection = await repositories.collections.create(user.id, input);
  return NextResponse.json(collection, { status: 201 });
}

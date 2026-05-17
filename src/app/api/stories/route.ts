import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { storyLibraryQuerySchema } from "@/validation/story";

export async function GET(request: Request) {
  const user = await requireUser();
  const url = new URL(request.url);
  const query = storyLibraryQuerySchema.parse(Object.fromEntries(url.searchParams.entries()));
  return NextResponse.json(await repositories.stories.listByUser(user.id, query));
}

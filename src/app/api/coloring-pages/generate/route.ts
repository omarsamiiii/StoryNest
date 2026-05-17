import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { coloringPageService } from "@/lib/services/coloring-page-service";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = (await request.json()) as { storyId: string; count?: number };
  const pages = await coloringPageService.generateForStory(user.id, body.storyId, body.count ?? 3);
  return NextResponse.json(pages, { status: 201 });
}

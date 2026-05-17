import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { exportStory } from "@/lib/export/story-exporter";
import { repositories } from "@/lib/repositories";
import { storyExportQuerySchema } from "@/validation/export";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const story = await repositories.stories.findById(user.id, id);
  if (!story) return NextResponse.json({ error: "Story not found" }, { status: 404 });

  const url = new URL(request.url);
  const query = storyExportQuerySchema.parse(Object.fromEntries(url.searchParams.entries()));
  const result = exportStory(story, query.format);
  return new NextResponse(result.body, {
    headers: {
      "content-type": result.mimeType,
      "content-disposition": `attachment; filename="${result.filename}"`
    }
  });
}

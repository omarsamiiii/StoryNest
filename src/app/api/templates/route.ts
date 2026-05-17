import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { storyTemplateEngine } from "@/lib/templates/story-template-engine";

export async function GET() {
  const user = await requireUser();
  const children = await repositories.children.listByUser(user.id);
  return NextResponse.json({
    templates: storyTemplateEngine.list(),
    recommendations: children.map((child) => ({
      childProfileId: child.id,
      templates: storyTemplateEngine.recommend(child, 5)
    }))
  });
}


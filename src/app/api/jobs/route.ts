import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { jobQueueService } from "@/lib/jobs/job-queue-service";
import { repositories } from "@/lib/repositories";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json({
    jobs: await repositories.generationJobs.listByUser(user.id),
    summary: await repositories.generationJobs.summary(user.id)
  });
}

export async function POST(request: Request) {
  const user = await requireUser();
  const body = (await request.json()) as { type: "story-generation" | "coloring-page" | "story-export" | "routine-plan"; payload?: Record<string, unknown> };
  const job = await jobQueueService.enqueue(user.id, body.type, body.payload ?? {});
  return NextResponse.json(job, { status: 201 });
}

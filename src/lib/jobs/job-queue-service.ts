import { repositories } from "@/lib/repositories";
import { coloringPageService } from "@/lib/services/coloring-page-service";
import { routinePlannerService } from "@/lib/services/routine-planner-service";
import { storyGenerationService } from "@/lib/services/story-generation-service";
import type { GenerationJob, JobType } from "@/types/jobs";

export class JobQueueService {
  async enqueue(userId: string, type: JobType, payload: Record<string, unknown>) {
    const job = await repositories.generationJobs.enqueue({ userId, type, payload });
    await repositories.auditLogs.record({
      userId,
      action: "job.enqueue",
      entityType: "job",
      entityId: job.id,
      metadata: { type }
    });
    return job;
  }

  async runNext(userId: string) {
    const job = await repositories.generationJobs.nextQueued(userId);
    if (!job) return null;
    return this.runJob(job);
  }

  async runJob(job: GenerationJob) {
    await repositories.generationJobs.transition(job.userId, job.id, "running");
    try {
      const result = await this.execute(job);
      const completed = await repositories.generationJobs.transition(job.userId, job.id, "completed", {
        result
      });
      await repositories.auditLogs.record({
        userId: job.userId,
        action: "job.complete",
        entityType: "job",
        entityId: job.id,
        metadata: { type: job.type }
      });
      return completed;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown job failure";
      const failed = await repositories.generationJobs.transition(job.userId, job.id, "failed", {
        error: message
      });
      return failed;
    }
  }

  async retry(userId: string, jobId: string) {
    const job = await repositories.generationJobs.findById(userId, jobId);
    if (!job) throw new Error("Job not found.");
    if (job.attempts >= job.maxAttempts) throw new Error("Job retry limit reached.");
    job.status = "queued";
    job.error = undefined;
    job.completedAt = undefined;
    job.updatedAt = new Date().toISOString();
    await repositories.auditLogs.record({
      userId,
      action: "job.retry",
      entityType: "job",
      entityId: jobId,
      metadata: { attempts: job.attempts }
    });
    return job;
  }

  private async execute(job: GenerationJob): Promise<Record<string, unknown>> {
    if (job.type === "story-generation") {
      const story = await storyGenerationService.generate({
        userId: job.userId,
        childProfileId: String(job.payload.childProfileId),
        theme: String(job.payload.theme),
        lesson: String(job.payload.lesson),
        length: job.payload.length === "long" || job.payload.length === "medium" ? job.payload.length : "short",
        tone:
          job.payload.tone === "funny" ||
          job.payload.tone === "magical" ||
          job.payload.tone === "educational"
            ? job.payload.tone
            : "calm",
        bedtimeSafe: job.payload.bedtimeSafe !== false,
        extraInstructions:
          typeof job.payload.extraInstructions === "string"
            ? job.payload.extraInstructions
            : undefined
      });
      return { storyId: story.id, title: story.title };
    }

    if (job.type === "coloring-page") {
      const pages = await coloringPageService.generateForStory(
        job.userId,
        String(job.payload.storyId),
        Number(job.payload.count ?? 3)
      );
      return { pageIds: pages.map((page) => page.id) };
    }

    if (job.type === "routine-plan") {
      const plan = await routinePlannerService.plan(job.userId);
      return { nights: plan.nights.length };
    }

    return { queued: true, type: job.type };
  }
}

export const jobQueueService = new JobQueueService();

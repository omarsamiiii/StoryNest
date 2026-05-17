import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { jobQueueService } from "@/lib/jobs/job-queue-service";
import { repositories } from "@/lib/repositories";

describe("JobQueueService", () => {
  beforeEach(() => resetLocalStore());

  it("enqueues jobs and records audit entries", async () => {
    const job = await jobQueueService.enqueue("user_1", "routine-plan", {});

    const jobs = await repositories.generationJobs.listByUser("user_1");
    const audits = await repositories.auditLogs.listByUser("user_1");

    expect(jobs).toEqual([job]);
    expect(audits[0]).toMatchObject({ action: "job.enqueue", entityId: job.id });
  });

  it("runs a routine-plan job to completion", async () => {
    const job = await jobQueueService.enqueue("user_1", "routine-plan", {});
    const completed = await jobQueueService.runNext("user_1");

    expect(completed).toMatchObject({
      id: job.id,
      status: "completed",
      result: { nights: 7 }
    });
  });
});

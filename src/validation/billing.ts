import { z } from "zod";

export const upgradeSchema = z.object({
  planId: z.enum(["free", "premium", "family"])
});

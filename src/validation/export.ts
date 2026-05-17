import { z } from "zod";

export const storyExportQuerySchema = z.object({
  format: z.enum(["markdown", "plainText", "json"]).default("markdown")
});

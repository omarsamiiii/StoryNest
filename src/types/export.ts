export type StoryExportFormat = "markdown" | "plainText" | "json";

export interface StoryExportResult {
  filename: string;
  mimeType: string;
  body: string;
}

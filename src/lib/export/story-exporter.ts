import type { StoryExportFormat, StoryExportResult } from "@/types/export";
import type { Story } from "@/types/story";

function filenameFor(story: Story, extension: string) {
  const slug = story.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug || "storynest-story"}.${extension}`;
}

function markdown(story: Story) {
  const sections = story.pages
    .map((page) => `## ${page.title}\n\n${page.body}`)
    .join("\n\n");
  return [
    `# ${story.title}`,
    story.summary,
    `Recommended age: ${story.recommendedAge}`,
    `Reading time: ${story.estimatedReadingTime}`,
    sections,
    `## Moral\n\n${story.moral}`,
    `## Vocabulary\n\n${story.vocabularyWords.map((word) => `- ${word}`).join("\n")}`,
    `## Discussion questions\n\n${story.discussionQuestions.map((question) => `- ${question}`).join("\n")}`
  ].join("\n\n");
}

function plainText(story: Story) {
  return markdown(story)
    .replace(/^# /gm, "")
    .replace(/^## /gm, "")
    .replace(/^- /gm, "");
}

export function exportStory(story: Story, format: StoryExportFormat): StoryExportResult {
  if (format === "json") {
    return {
      filename: filenameFor(story, "json"),
      mimeType: "application/json",
      body: JSON.stringify(story, null, 2)
    };
  }

  if (format === "plainText") {
    return {
      filename: filenameFor(story, "txt"),
      mimeType: "text/plain; charset=utf-8",
      body: plainText(story)
    };
  }

  return {
    filename: filenameFor(story, "md"),
    mimeType: "text/markdown; charset=utf-8",
    body: markdown(story)
  };
}

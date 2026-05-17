import type { ImageProvider } from "@/lib/image/image-provider";
import type { Story } from "@/types/story";

function svgDataUrl(title: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="white"/>
      <path d="M155 735 C215 560 310 470 401 470 C501 470 600 565 650 735" fill="none" stroke="black" stroke-width="10"/>
      <circle cx="400" cy="320" r="115" fill="none" stroke="black" stroke-width="10"/>
      <path d="M315 307 C345 285 365 285 395 307 M445 307 C475 285 495 285 525 307" fill="none" stroke="black" stroke-width="8" stroke-linecap="round"/>
      <path d="M350 377 C390 414 445 414 485 377" fill="none" stroke="black" stroke-width="8" stroke-linecap="round"/>
      <path d="M215 190 C275 120 345 95 405 115 C490 143 555 95 615 140" fill="none" stroke="black" stroke-width="8" stroke-linecap="round"/>
      <text x="400" y="890" text-anchor="middle" font-family="Arial" font-size="38" fill="black">${title}</text>
    </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export class MockImageProvider implements ImageProvider {
  async generateColoringPages(story: Story, count: number) {
    return Array.from({ length: count }, (_, index) => {
      const title = `${story.title} coloring page ${index + 1}`;
      return {
        userId: story.userId,
        storyId: story.id,
        title,
        description: `A simple black-and-white scene inspired by ${story.theme}.`,
        prompt:
          `Black and white printable line-art coloring page for children, ${story.theme}, ` +
          `gentle bedtime story scene, clean outlines, no shading, no text except title.`,
        imageUrl: svgDataUrl(title)
      };
    });
  }
}

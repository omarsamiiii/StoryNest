import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils/cn";

describe("cn", () => {
  it("merges class names and removes falsy inputs", () => {
    const shouldHide = false;

    expect(cn("rounded-md", shouldHide && "hidden", "bg-white")).toBe("rounded-md bg-white");
  });

  it("resolves conflicting tailwind classes with the later value", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });
});

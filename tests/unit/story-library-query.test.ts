import { describe, expect, it } from "vitest";
import { storyLibraryQuerySchema } from "@/validation/story";

describe("storyLibraryQuerySchema", () => {
  it("defaults empty filters to an all-library query", () => {
    const query = storyLibraryQuerySchema.parse({});

    expect(query).toEqual({
      search: "",
      childProfileId: "all",
      theme: "all",
      favorite: "all",
      sort: "newest"
    });
  });
});

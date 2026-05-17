import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "@/components/ui/empty-state";

describe("EmptyState", () => {
  it("renders accessible empty-state copy and action", () => {
    render(
      <EmptyState
        title="No stories yet"
        description="Generate a story once a child profile exists."
        actionHref="/app/stories/new"
        actionLabel="Create story"
      />
    );

    expect(screen.getByRole("heading", { name: "No stories yet" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create story" })).toHaveAttribute(
      "href",
      "/app/stories/new"
    );
  });
});

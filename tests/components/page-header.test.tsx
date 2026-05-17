import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHeader } from "@/components/ui/page-header";

describe("PageHeader", () => {
  it("renders title, description, and optional action", () => {
    render(
      <PageHeader
        title="Story library"
        description="Browse saved stories."
        action={<a href="/app/stories/new">Create story</a>}
      />
    );

    expect(screen.getByRole("heading", { name: "Story library" })).toBeInTheDocument();
    expect(screen.getByText("Browse saved stories.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create story" })).toHaveAttribute(
      "href",
      "/app/stories/new"
    );
  });
});

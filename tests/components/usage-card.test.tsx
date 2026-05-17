import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UsageCard } from "@/components/dashboard/usage-card";

describe("UsageCard", () => {
  it("shows generated story usage", () => {
    render(
      <UsageCard
        usage={{
          userId: "user_1",
          month: "2026-05",
          generatedStories: 2,
          storyLimit: 3,
          remainingStories: 1,
          planId: "free"
        }}
      />
    );

    expect(screen.getByText(/2 of 3 stories used/)).toBeInTheDocument();
  });
});

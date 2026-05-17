import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PricingCard } from "@/components/billing/pricing-card";

describe("PricingCard", () => {
  it("renders a plan and feature list", () => {
    render(
      <PricingCard
        id="premium"
        name="Premium"
        priceLabel="$12/mo"
        features={["50 stories per month", "Coloring pages"]}
      />
    );

    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("Coloring pages")).toBeInTheDocument();
  });
});

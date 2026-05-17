import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChildProfileForm } from "@/components/children/child-profile-form";
import { fixtureChild } from "../fixtures/child";

describe("ChildProfileForm", () => {
  it("renders create profile defaults with bedtime-safe mode enabled", () => {
    render(<ChildProfileForm action={vi.fn()} />);

    expect(screen.getByLabelText("Nickname")).toBeRequired();
    expect(screen.getByLabelText("Bedtime-safe mode by default")).toBeChecked();
    expect(screen.getByRole("button", { name: "Create profile" })).toBeInTheDocument();
  });

  it("renders existing profile values for editing", () => {
    render(<ChildProfileForm action={vi.fn()} profile={fixtureChild} />);

    expect(screen.getByDisplayValue("Mira")).toBeInTheDocument();
    expect(screen.getByLabelText("space")).toBeChecked();
    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
  });
});

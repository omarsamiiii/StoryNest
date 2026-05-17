import type { PlanId } from "@/types/billing";

export const PLAN_LIMITS: Record<
  PlanId,
  {
    name: string;
    priceLabel: string;
    storiesPerMonth: number;
    childProfiles: number;
    coloringPagesPerStory: number;
    features: string[];
  }
> = {
  free: {
    name: "Free",
    priceLabel: "$0",
    storiesPerMonth: 3,
    childProfiles: 1,
    coloringPagesPerStory: 0,
    features: ["3 stories per month", "1 child profile", "Basic bedtime story generation"]
  },
  premium: {
    name: "Premium",
    priceLabel: "$12/mo",
    storiesPerMonth: 50,
    childProfiles: 5,
    coloringPagesPerStory: 3,
    features: ["50 stories per month", "5 child profiles", "Coloring pages", "Printable library"]
  },
  family: {
    name: "Family",
    priceLabel: "$24/mo",
    storiesPerMonth: 150,
    childProfiles: 10,
    coloringPagesPerStory: 5,
    features: ["150 stories per month", "10 child profiles", "More coloring pages", "Priority generation"]
  }
};

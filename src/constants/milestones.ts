import type { MilestoneRule } from "@/types/milestones";

export const MILESTONE_RULES: MilestoneRule[] = [
  {
    id: "first-story",
    title: "First Story Nestled",
    description: "Create the first saved bedtime story for this child profile.",
    category: "story-count",
    tier: "bronze",
    target: 1,
    unit: "story",
    parentTip: "Celebrate by rereading the first story and asking one favorite-scene question."
  },
  {
    id: "storybook-shelf",
    title: "Storybook Shelf",
    description: "Build a small shelf of saved stories for repeat bedtime reading.",
    category: "story-count",
    tier: "silver",
    target: 5,
    unit: "stories",
    parentTip: "Let your child pick from the saved shelf when bedtime needs extra predictability."
  },
  {
    id: "library-lantern",
    title: "Library Lantern",
    description: "Create a rich library of parent-approved stories.",
    category: "story-count",
    tier: "gold",
    target: 15,
    unit: "stories",
    parentTip: "Use collections to group calming stories, funny stories, and learning stories."
  },
  {
    id: "favorite-finder",
    title: "Favorite Finder",
    description: "Mark stories as favorites so the best bedtime repeats are easy to find.",
    category: "favorite-habit",
    tier: "bronze",
    target: 2,
    unit: "favorites",
    parentTip: "Favorite stories that produced calm, connected bedtime conversations."
  },
  {
    id: "calm-streak",
    title: "Calm Story Streak",
    description: "Keep a healthy set of bedtime-safe stories in the library.",
    category: "bedtime-safe",
    tier: "silver",
    target: 5,
    unit: "bedtime-safe stories",
    parentTip: "When a night feels big, pick from stories already marked bedtime-safe."
  },
  {
    id: "rainbow-themes",
    title: "Rainbow of Themes",
    description: "Explore a range of different story themes.",
    category: "variety",
    tier: "gold",
    target: 6,
    unit: "themes",
    parentTip: "Theme variety keeps stories fresh while still respecting your child profile."
  },
  {
    id: "word-spark",
    title: "Word Spark",
    description: "Collect vocabulary words across stories.",
    category: "discussion",
    tier: "silver",
    target: 12,
    unit: "vocabulary words",
    parentTip: "Pick one gentle word per night and use it in a sentence together."
  },
  {
    id: "question-cloud",
    title: "Question Cloud",
    description: "Build a bank of parent-child discussion questions.",
    category: "discussion",
    tier: "rainbow",
    target: 20,
    unit: "discussion questions",
    parentTip: "Use only one question at bedtime; save the rest for breakfast or the next day."
  }
];

export const MILESTONE_TIER_STYLES = {
  bronze: "from-accent/55 to-white",
  silver: "from-sky/55 to-white",
  gold: "from-berry/35 to-white",
  rainbow: "from-primary/25 via-storybook/40 to-accent/35"
} as const;


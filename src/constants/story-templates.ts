import type { StoryTemplate } from "@/types/templates";

export const STORY_TEMPLATES: StoryTemplate[] = [
  {
    id: "moon-garden-kindness",
    name: "Moon Garden Kindness",
    category: "bedtime",
    description: "A soft garden story that closes with a calm goodnight.",
    recommendedAgeRanges: ["3-4", "5-6"],
    interests: ["nature", "magic", "friendship"],
    tone: "calm",
    length: "short",
    themeSeed: "moonlit garden",
    lessonSeed: "kindness grows when shared",
    parentInstructionSeed: "Use a soothing final paragraph with a predictable goodnight phrase.",
    bedtimeSafe: true
  },
  {
    id: "robot-retry-lab",
    name: "Robot Retry Lab",
    category: "confidence",
    description: "A playful robot story about trying again without frustration.",
    recommendedAgeRanges: ["5-6", "7-8"],
    interests: ["robots", "sports"],
    tone: "funny",
    length: "medium",
    themeSeed: "friendly robot workshop",
    lessonSeed: "mistakes help us learn",
    parentInstructionSeed: "Keep the robot silly but never chaotic or loud at the end.",
    bedtimeSafe: true
  },
  {
    id: "ocean-breathing",
    name: "Ocean Breathing",
    category: "transition",
    description: "A gentle ocean story for calming busy evenings.",
    recommendedAgeRanges: ["3-4", "5-6", "7-8"],
    interests: ["ocean", "animals", "nature"],
    tone: "calm",
    length: "short",
    themeSeed: "quiet ocean tide pool",
    lessonSeed: "slow breaths help big feelings pass",
    parentInstructionSeed: "Include a parent-child breathing cue that can be done after reading.",
    bedtimeSafe: true
  },
  {
    id: "dinosaur-sharing-map",
    name: "Dinosaur Sharing Map",
    category: "friendship",
    description: "A warm adventure about sharing discoveries with friends.",
    recommendedAgeRanges: ["5-6", "7-8"],
    interests: ["dinosaurs", "nature", "friendship"],
    tone: "magical",
    length: "medium",
    themeSeed: "dinosaur valley map",
    lessonSeed: "discoveries are brighter when shared",
    parentInstructionSeed: "Avoid chase scenes; make the adventure cooperative.",
    bedtimeSafe: true
  },
  {
    id: "space-question-school",
    name: "Space Questions",
    category: "learning",
    description: "A curious space story with gentle vocabulary learning.",
    recommendedAgeRanges: ["7-8", "9-10"],
    interests: ["space", "robots"],
    tone: "educational",
    length: "long",
    themeSeed: "sleepy observatory",
    lessonSeed: "asking questions helps us understand the world",
    parentInstructionSeed: "Include three simple astronomy vocabulary words with context.",
    bedtimeSafe: true
  }
];

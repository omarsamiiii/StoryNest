import type { User } from "@/types/auth";
import type { Subscription } from "@/types/billing";
import type { ChildProfile } from "@/types/children";
import type { ColoringPage } from "@/types/coloring";
import type { Story } from "@/types/story";

export interface UsageRecord {
  userId: string;
  month: string;
  generatedStories: number;
}

export interface LocalStore {
  users: User[];
  passwordHashes: Record<string, string>;
  children: ChildProfile[];
  stories: Story[];
  coloringPages: ColoringPage[];
  subscriptions: Subscription[];
  usage: UsageRecord[];
}

const globalForStore = globalThis as typeof globalThis & {
  storyNestStore?: LocalStore;
};

export function getLocalStore(): LocalStore {
  if (!globalForStore.storyNestStore) {
    globalForStore.storyNestStore = {
      users: [],
      passwordHashes: {},
      children: [],
      stories: [],
      coloringPages: [],
      subscriptions: [],
      usage: []
    };
  }

  return globalForStore.storyNestStore;
}

export function resetLocalStore() {
  globalForStore.storyNestStore = undefined;
}

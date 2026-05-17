import { ChildProfileRepository } from "@/lib/repositories/child-profile-repository";
import { ColoringPageRepository } from "@/lib/repositories/coloring-page-repository";
import { StoryRepository } from "@/lib/repositories/story-repository";
import { StoryCollectionRepository } from "@/lib/repositories/story-collection-repository";
import { SubscriptionRepository } from "@/lib/repositories/subscription-repository";
import { RoutinePreferencesRepository } from "@/lib/repositories/routine-preferences-repository";
import { UsageRepository } from "@/lib/repositories/usage-repository";
import { UserRepository } from "@/lib/repositories/user-repository";

export const repositories = {
  users: new UserRepository(),
  subscriptions: new SubscriptionRepository(),
  children: new ChildProfileRepository(),
  stories: new StoryRepository(),
  collections: new StoryCollectionRepository(),
  coloringPages: new ColoringPageRepository(),
  routinePreferences: new RoutinePreferencesRepository(),
  usage: new UsageRepository()
};

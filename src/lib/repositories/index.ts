import { ChildProfileRepository } from "@/lib/repositories/child-profile-repository";
import { ColoringPageRepository } from "@/lib/repositories/coloring-page-repository";
import { StoryRepository } from "@/lib/repositories/story-repository";
import { SubscriptionRepository } from "@/lib/repositories/subscription-repository";
import { UsageRepository } from "@/lib/repositories/usage-repository";
import { UserRepository } from "@/lib/repositories/user-repository";

export const repositories = {
  users: new UserRepository(),
  subscriptions: new SubscriptionRepository(),
  children: new ChildProfileRepository(),
  stories: new StoryRepository(),
  coloringPages: new ColoringPageRepository(),
  usage: new UsageRepository()
};

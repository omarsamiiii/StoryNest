export interface StoryCollection {
  id: string;
  userId: string;
  name: string;
  description: string;
  storyIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CollectionStorySummary {
  collection: StoryCollection;
  storyCount: number;
  latestStoryTitle?: string;
}

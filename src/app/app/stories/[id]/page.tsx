import { notFound } from "next/navigation";
import { StoryReader } from "@/components/stories/story-reader";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";

export default async function StoryPage({ params }: Readonly<{ params: Promise<{ id: string }> }>) {
  const user = await requireUser();
  const { id } = await params;
  const [story, collections] = await Promise.all([
    repositories.stories.findById(user.id, id),
    repositories.collections.listByUser(user.id)
  ]);
  if (!story) notFound();

  return <StoryReader story={story} collections={collections} />;
}

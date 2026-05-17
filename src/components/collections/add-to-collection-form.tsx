import { Button } from "@/components/ui/button";
import { inputClasses } from "@/components/ui/field";
import { addStoryToCollectionAction } from "@/lib/services/collection-actions";
import type { StoryCollection } from "@/types/collections";

export function AddToCollectionForm({
  storyId,
  collections
}: Readonly<{ storyId: string; collections: StoryCollection[] }>) {
  if (!collections.length) return null;

  return (
    <form action={addStoryToCollectionAction} className="grid gap-3 rounded-lg border border-border bg-white p-4">
      <input type="hidden" name="storyId" value={storyId} />
      <label className="grid gap-2 text-sm font-medium">
        Add to collection
        <select className={inputClasses} name="collectionId">
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" variant="outline">
        Add story
      </Button>
    </form>
  );
}

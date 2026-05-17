import { STORY_LENGTHS, STORY_TONES } from "@/constants/children";
import { Button } from "@/components/ui/button";
import { Field, inputClasses, textareaClasses } from "@/components/ui/field";
import type { ChildProfile } from "@/types/children";
import { generateStoryAction } from "@/lib/services/story-actions";

export function StoryGenerationForm({ children }: Readonly<{ children: ChildProfile[] }>) {
  return (
    <form action={generateStoryAction} className="grid max-w-3xl gap-5">
      <Field label="Child profile">
        <select className={inputClasses} name="childProfileId" required>
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.nickname} · ages {child.ageRange}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Theme">
          <input className={inputClasses} name="theme" placeholder="Moonlit garden" required />
        </Field>
        <Field label="Lesson or moral">
          <input className={inputClasses} name="lesson" placeholder="Kindness grows when shared" required />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Length">
          <select className={inputClasses} name="length" defaultValue="short">
            {STORY_LENGTHS.map((length) => (
              <option key={length} value={length}>
                {length}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tone">
          <select className={inputClasses} name="tone" defaultValue={children[0]?.preferredTone ?? "calm"}>
            {STORY_TONES.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="bedtimeSafe" defaultChecked />
        Bedtime-safe mode
      </label>
      <Field label="Optional parent instruction">
        <textarea
          className={textareaClasses}
          name="extraInstructions"
          placeholder="Include a gentle reminder about cleaning up toys."
        />
      </Field>
      <Button type="submit">Generate story</Button>
    </form>
  );
}

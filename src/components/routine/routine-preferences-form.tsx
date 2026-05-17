import { STORY_TONES } from "@/constants/children";
import { Button } from "@/components/ui/button";
import { Field, inputClasses } from "@/components/ui/field";
import { saveRoutinePreferencesAction } from "@/lib/services/routine-actions";
import type { ChildProfile } from "@/types/children";

export function RoutinePreferencesForm({ children }: Readonly<{ children: ChildProfile[] }>) {
  if (!children.length) return null;

  return (
    <form action={saveRoutinePreferencesAction} className="grid gap-4 rounded-lg border border-border bg-white p-4">
      <Field label="Child profile">
        <select className={inputClasses} name="childProfileId">
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.nickname}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Cadence">
          <select className={inputClasses} name="cadence" defaultValue="daily">
            <option value="daily">Daily</option>
            <option value="weeknights">Weeknights</option>
            <option value="custom">Custom</option>
          </select>
        </Field>
        <Field label="Reading minutes">
          <input className={inputClasses} name="preferredMinutes" type="number" min={4} max={20} defaultValue={8} />
        </Field>
        <Field label="Quiet start">
          <input className={inputClasses} name="quietStartMinutes" type="number" min={0} max={30} defaultValue={5} />
        </Field>
      </div>
      <Field label="Tone">
        <select className={inputClasses} name="preferredTone" defaultValue="calm">
          {STORY_TONES.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-2">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="includeColoring" />
          Include coloring page prep before bedtime
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input type="checkbox" name="lightsOutReminder" defaultChecked />
          Add lights-out reminder
        </label>
      </div>
      <Button type="submit">Save routine preferences</Button>
    </form>
  );
}

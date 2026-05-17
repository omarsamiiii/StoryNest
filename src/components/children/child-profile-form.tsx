import { AGE_RANGES, INTERESTS, STORY_TONES } from "@/constants/children";
import { Button } from "@/components/ui/button";
import { Field, inputClasses } from "@/components/ui/field";
import type { ChildProfile } from "@/types/children";

export function ChildProfileForm({
  action,
  profile
}: Readonly<{
  action: (formData: FormData) => Promise<void>;
  profile?: ChildProfile;
}>) {
  return (
    <form action={action} className="grid max-w-2xl gap-5">
      <Field label="Nickname" hint="Use a nickname, not a full legal name.">
        <input
          className={inputClasses}
          aria-label="Nickname"
          name="nickname"
          defaultValue={profile?.nickname}
          maxLength={40}
          required
        />
      </Field>
      <Field label="Age range">
        <select
          className={inputClasses}
          aria-label="Age range"
          name="ageRange"
          defaultValue={profile?.ageRange ?? "5-6"}
        >
          {AGE_RANGES.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </Field>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Interests</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {INTERESTS.map((interest) => (
            <label key={interest} className="flex items-center gap-2 rounded-md border border-border p-3 text-sm">
              <input
                type="checkbox"
                name="interests"
                value={interest}
                defaultChecked={profile?.interests.includes(interest)}
              />
              {interest}
            </label>
          ))}
        </div>
      </fieldset>
      <Field label="Preferred tone">
        <select
          className={inputClasses}
          aria-label="Preferred tone"
          name="preferredTone"
          defaultValue={profile?.preferredTone ?? "calm"}
        >
          {STORY_TONES.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
      </Field>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          name="bedtimeSafeDefault"
          defaultChecked={profile?.bedtimeSafeDefault ?? true}
        />
        Bedtime-safe mode by default
      </label>
      <Button type="submit">{profile ? "Save changes" : "Create profile"}</Button>
    </form>
  );
}

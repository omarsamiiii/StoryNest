import { Button } from "@/components/ui/button";
import { Field, inputClasses, textareaClasses } from "@/components/ui/field";
import { createCollectionAction } from "@/lib/services/collection-actions";

export function CollectionForm() {
  return (
    <form action={createCollectionAction} className="grid gap-4 rounded-lg border border-border bg-white p-4">
      <Field label="Collection name">
        <input className={inputClasses} name="name" placeholder="Sleepy favorites" required />
      </Field>
      <Field label="Description">
        <textarea
          className={textareaClasses}
          name="description"
          placeholder="Stories that work best on quiet school nights."
        />
      </Field>
      <Button type="submit">Create collection</Button>
    </form>
  );
}

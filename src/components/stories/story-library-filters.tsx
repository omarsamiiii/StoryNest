import { inputClasses } from "@/components/ui/field";
import type { ChildProfile } from "@/types/children";

export function StoryLibraryFilters({
  children,
  themes,
  defaults
}: Readonly<{
  children: ChildProfile[];
  themes: string[];
  defaults: Record<string, string>;
}>) {
  return (
    <form className="grid gap-3 rounded-lg border border-border bg-white p-4 md:grid-cols-5">
      <input className={inputClasses} name="search" placeholder="Search stories" defaultValue={defaults.search} />
      <select className={inputClasses} name="childProfileId" defaultValue={defaults.childProfileId}>
        <option value="all">All children</option>
        {children.map((child) => (
          <option key={child.id} value={child.id}>
            {child.nickname}
          </option>
        ))}
      </select>
      <select className={inputClasses} name="theme" defaultValue={defaults.theme}>
        <option value="all">All themes</option>
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      <select className={inputClasses} name="favorite" defaultValue={defaults.favorite}>
        <option value="all">All stories</option>
        <option value="favorite">Favorites</option>
      </select>
      <select className={inputClasses} name="sort" defaultValue={defaults.sort}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title</option>
      </select>
      <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:col-span-5">
        Apply filters
      </button>
    </form>
  );
}

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/link-button";
import { PageHeader } from "@/components/ui/page-header";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { deleteChildProfileAction } from "@/lib/services/child-profile-actions";

export const metadata = {
  title: "Child profiles"
};

export default async function ChildrenPage() {
  const user = await requireUser();
  const children = await repositories.children.listByUser(user.id);

  return (
    <main className="grid gap-6">
      <PageHeader
        title="Child profiles"
        description="Use privacy-conscious nickname profiles for story personalization."
        action={<LinkButton href="/app/children/new">Create profile</LinkButton>}
      />

      {children.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle>{child.nickname}</CardTitle>
                <p className="text-sm text-muted-foreground">Ages {child.ageRange}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Interests: {child.interests.join(", ")}
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  Tone: {child.preferredTone}. Bedtime safe: {child.bedtimeSafeDefault ? "yes" : "no"}.
                </p>
                <div className="mt-5 flex gap-2">
                  <LinkButton href={`/app/children/${child.id}`} variant="outline">
                    Edit
                  </LinkButton>
                  <form action={deleteChildProfileAction}>
                    <input type="hidden" name="id" value={child.id} />
                    <Button type="submit" variant="danger" aria-label={`Delete ${child.nickname}`}>
                      <Trash2 size={16} aria-hidden="true" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No child profiles"
          description="Create one nickname-based profile to start generating personalized bedtime stories."
          actionHref="/app/children/new"
          actionLabel="Create profile"
        />
      )}
    </main>
  );
}

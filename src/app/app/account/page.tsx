import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";

export const metadata = {
  title: "Account"
};

export default async function AccountPage() {
  const user = await requireUser();
  const [children, subscription] = await Promise.all([
    repositories.children.listByUser(user.id),
    repositories.subscriptions.ensureForUser(user.id)
  ]);

  return (
    <main className="grid gap-6">
      <h1 className="text-3xl font-bold">Account settings</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Parent account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Local mock user ID: {user.id}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Family privacy</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            You have {children.length} nickname-based child profile{children.length === 1 ? "" : "s"}.
            StoryNest does not create public profiles or child-facing chat in this MVP.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Plan: {subscription.planId}. Billing is mocked for local development.
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

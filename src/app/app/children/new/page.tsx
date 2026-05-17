import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChildProfileForm } from "@/components/children/child-profile-form";
import { createChildProfileAction } from "@/lib/services/child-profile-actions";

export const metadata = {
  title: "New child profile"
};

export default function NewChildProfilePage() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Create child profile</CardTitle>
          <p className="text-sm text-muted-foreground">
            Keep it light: nickname, age range, interests, and bedtime preferences only.
          </p>
        </CardHeader>
        <CardContent>
          <ChildProfileForm action={createChildProfileAction} />
        </CardContent>
      </Card>
    </main>
  );
}

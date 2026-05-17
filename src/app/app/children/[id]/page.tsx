import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChildProfileForm } from "@/components/children/child-profile-form";
import { requireUser } from "@/lib/auth/session";
import { repositories } from "@/lib/repositories";
import { updateChildProfileAction } from "@/lib/services/child-profile-actions";

export const metadata = {
  title: "Edit child profile"
};

export default async function EditChildProfilePage({
  params
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const user = await requireUser();
  const { id } = await params;
  const profile = await repositories.children.findById(user.id, id);
  if (!profile) notFound();

  const action = updateChildProfileAction.bind(null, id);

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Edit child profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ChildProfileForm action={action} profile={profile} />
        </CardContent>
      </Card>
    </main>
  );
}

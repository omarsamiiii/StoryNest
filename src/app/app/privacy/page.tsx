import { PageHeader } from "@/components/ui/page-header";
import { PrivacyChecklist } from "@/components/privacy/privacy-checklist";
import { requireUser } from "@/lib/auth/session";
import { privacyRedactor } from "@/lib/privacy/privacy-redactor";
import { repositories } from "@/lib/repositories";

export const metadata = { title: "Privacy center" };

export default async function PrivacyPage() {
  const user = await requireUser();
  const children = await repositories.children.listByUser(user.id);
  const checklist = privacyRedactor.checklist(children);
  return (
    <main className="grid gap-6">
      <PageHeader
        title="Privacy center"
        description="Review parent-controlled data minimization and profile safety."
      />
      <PrivacyChecklist items={checklist} />
    </main>
  );
}

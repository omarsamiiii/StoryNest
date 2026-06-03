import { PageHeader } from "@/components/ui/page-header";
import { KeepsakeCertificates } from "@/components/wellbeing/keepsake-certificates";
import { requireUser } from "@/lib/auth/session";
import { keepsakeCertificateService } from "@/lib/wellbeing/keepsake-certificate-service";

export default async function KeepsakesPage() {
  const user = await requireUser();
  const certificates = await keepsakeCertificateService.certificates(user.id);

  return (
    <main className="grid gap-6">
      <PageHeader
        title="Keepsake certificates"
        description="Print private celebration cards for reading routines and story moments."
      />
      <KeepsakeCertificates certificates={certificates} />
    </main>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { PrintButton } from "@/components/ui/print-button";
import type { KeepsakeCertificate } from "@/types/wellbeing";

const paletteClass = {
  sunrise: "from-accent/45 to-white",
  moonlight: "from-sky/45 to-white",
  rainbow: "from-primary/20 via-storybook/35 to-accent/30"
} as const;

export function KeepsakeCertificates({
  certificates
}: Readonly<{ certificates: KeepsakeCertificate[] }>) {
  if (!certificates.length) {
    return (
      <EmptyState
        title="No keepsakes yet"
        description="Create a child profile to generate private printable keepsake certificates."
        actionHref="/app/children/new"
        actionLabel="Create profile"
      />
    );
  }

  return (
    <div className="grid gap-6">
      <div className="print-hidden flex justify-end">
        <PrintButton />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {certificates.map((certificate) => (
          <Card
            key={certificate.id}
            className={`print-surface overflow-hidden bg-gradient-to-br ${paletteClass[certificate.palette]}`}
          >
            <CardHeader className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">StoryNest Keepsake</p>
              <CardTitle className="text-3xl">{certificate.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{certificate.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-white text-4xl shadow-soft">
                ✦
              </div>
              <p className="text-lg font-bold">{certificate.achievement}</p>
              <div className="grid gap-2 text-sm text-muted-foreground">
                {certificate.detailLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


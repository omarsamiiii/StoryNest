import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/session";
import { keepsakeCertificateService } from "@/lib/wellbeing/keepsake-certificate-service";

export async function GET() {
  const user = await requireUser();
  return NextResponse.json(await keepsakeCertificateService.certificates(user.id));
}


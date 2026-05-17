import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth/session";
import { privacyRedactor } from "@/lib/privacy/privacy-redactor";

const redactionRequestSchema = z.object({
  text: z.string().min(1).max(5000)
});

export async function POST(request: Request) {
  await requireUser();
  const input = redactionRequestSchema.parse(await request.json());
  return NextResponse.json(privacyRedactor.redact(input.text));
}


import { NextResponse } from "next/server";
import { seedDemoParent } from "@/lib/db/demo-seed";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Disabled in production" }, { status: 403 });
  }

  const user = await seedDemoParent();
  return NextResponse.json({
    user,
    note: "Demo data is stored in the local in-memory development store."
  });
}

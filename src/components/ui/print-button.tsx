"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintButton({ label = "Print" }: Readonly<{ label?: string }>) {
  return (
    <Button onClick={() => window.print()}>
      <Printer size={16} aria-hidden="true" />
      {label}
    </Button>
  );
}

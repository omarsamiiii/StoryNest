export interface PrivacyFinding {
  kind: "name" | "email" | "phone" | "address" | "school" | "date" | "unknown";
  label: string;
  value: string;
  start: number;
  end: number;
}

export interface RedactionResult {
  original: string;
  redacted: string;
  findings: PrivacyFinding[];
  changed: boolean;
}

export interface PrivacyChecklistItem {
  id: string;
  label: string;
  complete: boolean;
  detail: string;
}

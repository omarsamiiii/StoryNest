import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";

vi.mock("@/lib/auth/session", () => ({
  requireUser: vi.fn(async () => ({ id: "user_api", name: "Parent", email: "parent@example.com" }))
}));

describe("children API route", () => {
  beforeEach(() => resetLocalStore());

  it("creates child profiles with validated input", async () => {
    const { POST } = await import("@/app/api/children/route");
    const response = await POST(
      new Request("http://localhost/api/children", {
        method: "POST",
        body: JSON.stringify({
          nickname: "Mira",
          ageRange: "5-6",
          interests: ["space", "magic"],
          preferredTone: "calm",
          bedtimeSafeDefault: true
        })
      })
    );
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body).toMatchObject({
      userId: "user_api",
      nickname: "Mira",
      ageRange: "5-6"
    });
  });

  it("lists profiles for the authenticated parent", async () => {
    const { GET, POST } = await import("@/app/api/children/route");
    await POST(
      new Request("http://localhost/api/children", {
        method: "POST",
        body: JSON.stringify({
          nickname: "Mira",
          ageRange: "5-6",
          interests: ["space"],
          preferredTone: "calm",
          bedtimeSafeDefault: true
        })
      })
    );

    const response = await GET();
    const body = await response.json();

    expect(body).toHaveLength(1);
    expect(body[0].nickname).toBe("Mira");
  });
});

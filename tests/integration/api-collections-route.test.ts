import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";

vi.mock("@/lib/auth/session", () => ({
  requireUser: vi.fn(async () => ({ id: "collection_user", name: "Parent", email: "parent@example.com" }))
}));

describe("collections API route", () => {
  beforeEach(() => resetLocalStore());

  it("creates and lists private collections", async () => {
    const { GET, POST } = await import("@/app/api/collections/route");
    const created = await POST(
      new Request("http://localhost/api/collections", {
        method: "POST",
        body: JSON.stringify({ name: "Favorites", description: "Calm stories" })
      })
    );
    expect(created.status).toBe(201);

    const response = await GET();
    const body = await response.json();

    expect(body).toHaveLength(1);
    expect(body[0]).toMatchObject({ name: "Favorites", userId: "collection_user" });
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { MockAuthProvider } from "@/lib/auth/mock-auth-provider";
import { resetLocalStore } from "@/lib/db/local-store";

describe("MockAuthProvider", () => {
  beforeEach(() => resetLocalStore());

  it("signs up and logs in a local parent account", async () => {
    const auth = new MockAuthProvider();
    const signedUp = await auth.signUp({
      name: "Parent",
      email: "parent@example.com",
      password: "password123"
    });

    const loggedIn = await auth.logIn({
      email: "parent@example.com",
      password: "password123"
    });

    expect(loggedIn.id).toBe(signedUp.id);
  });

  it("rejects invalid passwords", async () => {
    const auth = new MockAuthProvider();
    await auth.signUp({
      name: "Parent",
      email: "parent@example.com",
      password: "password123"
    });

    await expect(
      auth.logIn({ email: "parent@example.com", password: "wrongpassword" })
    ).rejects.toThrow("Invalid");
  });
});

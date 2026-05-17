import { describe, expect, it } from "vitest";
import { loginSchema, signUpSchema } from "@/validation/auth";

describe("auth validation", () => {
  it("normalizes valid signup input", () => {
    const parsed = signUpSchema.parse({
      name: "  Parent User  ",
      email: "PARENT@example.com",
      password: "password123"
    });

    expect(parsed.name).toBe("Parent User");
    expect(parsed.email).toBe("PARENT@example.com");
  });

  it("rejects short passwords", () => {
    expect(() =>
      loginSchema.parse({
        email: "parent@example.com",
        password: "short"
      })
    ).toThrow();
  });
});

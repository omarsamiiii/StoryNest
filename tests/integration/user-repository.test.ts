import { beforeEach, describe, expect, it } from "vitest";
import { resetLocalStore } from "@/lib/db/local-store";
import { repositories } from "@/lib/repositories";

describe("UserRepository", () => {
  beforeEach(() => resetLocalStore());

  it("prevents duplicate email accounts regardless of case", async () => {
    await repositories.users.create({
      name: "Parent",
      email: "parent@example.com",
      passwordHash: "hash"
    });

    await expect(
      repositories.users.create({
        name: "Another Parent",
        email: "PARENT@example.com",
        passwordHash: "hash"
      })
    ).rejects.toThrow("already exists");
  });

  it("looks up users by normalized email", async () => {
    const user = await repositories.users.create({
      name: "Parent",
      email: "PARENT@example.com",
      passwordHash: "hash"
    });

    await expect(repositories.users.findByEmail("parent@example.com")).resolves.toEqual(user);
  });
});

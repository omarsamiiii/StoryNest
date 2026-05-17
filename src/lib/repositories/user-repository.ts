import type { User } from "@/types/auth";
import { getLocalStore } from "@/lib/db/local-store";
import { createId, nowIso } from "@/lib/db/id";

export class UserRepository {
  async create(input: { name: string; email: string; passwordHash: string }): Promise<User> {
    const store = getLocalStore();
    const existing = store.users.find((user) => user.email.toLowerCase() === input.email.toLowerCase());
    if (existing) {
      throw new Error("An account already exists for this email.");
    }

    const user: User = {
      id: createId("user"),
      name: input.name,
      email: input.email.toLowerCase(),
      createdAt: nowIso()
    };

    store.users.push(user);
    store.passwordHashes[user.email] = input.passwordHash;
    return user;
  }

  async findByEmail(email: string) {
    return getLocalStore().users.find((user) => user.email === email.toLowerCase()) ?? null;
  }

  async findById(id: string) {
    return getLocalStore().users.find((user) => user.id === id) ?? null;
  }

  async getPasswordHash(email: string) {
    return getLocalStore().passwordHashes[email.toLowerCase()] ?? null;
  }
}

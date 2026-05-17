import { createHash } from "node:crypto";
import type { AuthCredentials } from "@/types/auth";
import type { SignUpInput } from "@/validation/auth";
import { repositories } from "@/lib/repositories";
import type { AuthProvider } from "@/lib/auth/auth-provider";

function hashPassword(password: string) {
  return createHash("sha256").update(`storynest-local:${password}`).digest("hex");
}

export class MockAuthProvider implements AuthProvider {
  async signUp(input: SignUpInput) {
    const user = await repositories.users.create({
      name: input.name,
      email: input.email,
      passwordHash: hashPassword(input.password)
    });
    await repositories.subscriptions.ensureForUser(user.id);
    return user;
  }

  async logIn(credentials: AuthCredentials) {
    const user = await repositories.users.findByEmail(credentials.email);
    if (!user) throw new Error("Invalid email or password.");

    const passwordHash = await repositories.users.getPasswordHash(credentials.email);
    if (passwordHash !== hashPassword(credentials.password)) {
      throw new Error("Invalid email or password.");
    }

    await repositories.subscriptions.ensureForUser(user.id);
    return user;
  }

  async getSession(userId?: string) {
    if (!userId) return { user: null };
    const user = await repositories.users.findById(userId);
    return { user };
  }
}

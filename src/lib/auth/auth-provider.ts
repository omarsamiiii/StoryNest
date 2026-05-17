import type { AuthCredentials, AuthSession, User } from "@/types/auth";
import type { SignUpInput } from "@/validation/auth";

export interface AuthProvider {
  signUp(input: SignUpInput): Promise<User>;
  logIn(credentials: AuthCredentials): Promise<User>;
  getSession(userId?: string): Promise<AuthSession>;
}

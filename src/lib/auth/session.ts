import { cookies } from "next/headers";
import { MockAuthProvider } from "@/lib/auth/mock-auth-provider";

export const SESSION_COOKIE = "storynest_session";
export const authProvider = new MockAuthProvider();

export async function getCurrentSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(SESSION_COOKIE)?.value;
  return authProvider.getSession(userId);
}

export async function requireUser() {
  const session = await getCurrentSession();
  if (!session.user) {
    throw new Error("Authentication required.");
  }
  return session.user;
}

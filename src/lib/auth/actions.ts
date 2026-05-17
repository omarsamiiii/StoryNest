"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, authProvider } from "@/lib/auth/session";
import { loginSchema, signUpSchema } from "@/validation/auth";

function formValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

export async function signUpAction(formData: FormData) {
  const input = signUpSchema.parse({
    name: formValue(formData, "name"),
    email: formValue(formData, "email"),
    password: formValue(formData, "password")
  });
  const user = await authProvider.signUp(input);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  redirect("/app");
}

export async function loginAction(formData: FormData) {
  const input = loginSchema.parse({
    email: formValue(formData, "email"),
    password: formValue(formData, "password")
  });
  const user = await authProvider.logIn(input);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  redirect("/app");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/");
}

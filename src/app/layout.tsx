import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "StoryNest",
    template: "%s | StoryNest"
  },
  description:
    "Parent-controlled personalized bedtime stories and printable coloring pages for families."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

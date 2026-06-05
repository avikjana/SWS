import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal | Study With Sutirtha",
  description: "Access your study notes and materials securely.",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Study With Sutirtha",
  description: "Manage students, notes, and approvals.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

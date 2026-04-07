import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || (session.user as any).role !== "ORGANIZATION") {
    redirect("/dashboard")
  }

  return <>{children}</>
}

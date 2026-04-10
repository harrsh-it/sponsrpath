import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  // Get source-of-truth role from DB to handle stale sessions
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  if (user?.role !== "ORGANIZATION") {
    redirect("/dashboard")
  }

  return <>{children}</>
}

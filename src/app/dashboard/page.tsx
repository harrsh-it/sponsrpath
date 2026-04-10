import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Fetch fresh role from DB because the session/cookie might be stale
  // after onboarding redirects before the NextAuth session refreshes
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })

  const role = user?.role || (session.user as any).role

  if (role === "ORGANIZATION") {
    redirect("/dashboard/organization")
  } else if (role === "JOB_SEEKER") {
    redirect("/dashboard/job-seeker")
  } else {
    // USER role — hasn't selected a role yet
    redirect("/onboarding/role-select")
  }
}

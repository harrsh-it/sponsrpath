import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const role = (session.user as any).role

  if (role === "ORGANIZATION") {
    redirect("/dashboard/organization")
  } else if (role === "JOB_SEEKER") {
    redirect("/dashboard/job-seeker")
  } else {
    // USER role — hasn't completed onboarding yet
    redirect("/onboarding/role-select")
  }
}

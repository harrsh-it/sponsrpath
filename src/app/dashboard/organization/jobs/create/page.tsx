import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import JobForm from "@/components/jobs/JobForm"

export default async function CreateJobPage() {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect("/login")
  }

  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) {
    redirect("/dashboard/organization")
  }

  return (
    <div className="w-full">
      <JobForm organization={organization} />
    </div>
  )
}

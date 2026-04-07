import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import EditJobClient from "./EditJobClient"

export default async function EditJobPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const { id } = resolvedParams
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) {
    redirect("/dashboard")
  }

  const job = await prisma.jobPost.findUnique({
    where: { id }
  })

  if (!job || job.orgId !== organization.id) {
    redirect("/dashboard/organization")
  }

  return (
    <EditJobClient job={JSON.parse(JSON.stringify(job))} />
  )
}

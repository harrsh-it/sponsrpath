import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import { OutreachForm } from "@/components/talent/OutreachForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function SendOutreachPage({ params }: { params: Promise<{ seekerId: string }> }) {
  const { seekerId } = await params
  const session = await auth()
  if (!session?.user) redirect("/login")

  const org = await prisma.organization.findUnique({ where: { userId: session.user.id } })
  if (!org) redirect("/dashboard/organization")

  const seeker = await prisma.jobSeeker.findFirst({
    where: { id: seekerId, isPublic: true },
    include: { user: { select: { name: true } } }
  })
  if (!seeker) notFound()

  const name =
    seeker.firstName && seeker.lastName
      ? `${seeker.firstName} ${seeker.lastName}`
      : seeker.user.name ?? "Candidate"

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10">
        <Link
          href="/dashboard/organization/talent"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-navy text-sm font-bold mb-6 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Talent Search
        </Link>
        <h1 className="text-3xl font-heading font-black text-navy">Send Outreach</h1>
        <p className="text-slate-500 font-medium mt-2">
          Send a personalized message and optional interview invite to <span className="text-navy font-bold">{name}</span>.
        </p>
      </div>

      <OutreachForm
        jobSeekerId={seeker.id}
        seekerName={name}
        seekerHeadline={seeker.headline}
        avatarUrl={seeker.avatarUrl}
      />
    </div>
  )
}

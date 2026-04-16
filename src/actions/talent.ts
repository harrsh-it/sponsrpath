"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// ─── Job Seeker: Toggle Profile Visibility ────────────────────────────────────
export async function toggleTalentVisibilityAction(isPublic: boolean) {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: session.user.id }
  })
  if (!jobSeeker) return { error: "Profile not found" }

  await prisma.jobSeeker.update({
    where: { id: jobSeeker.id },
    data: { isPublic }
  })

  revalidatePath("/dashboard/job-seeker/profile")
  revalidatePath("/talent")
  return { success: true }
}

// ─── Employer: Search Public Talent ───────────────────────────────────────────
export async function searchTalentAction(filters: {
  skills?: string
  jobType?: string
  location?: string
  availability?: string
  visaSponsorRequired?: boolean
}) {
  const { skills, jobType, location, availability, visaSponsorRequired } = filters

  const preferenceFilters: any = {}
  if (jobType) preferenceFilters.preferredType = jobType
  if (availability) preferenceFilters.availability = availability

  const seekers = await prisma.jobSeeker.findMany({
    where: {
      isPublic: true,
      ...(Object.keys(preferenceFilters).length > 0 ? { jobPreferences: { some: preferenceFilters } } : {}),
      ...(location ? { city: { contains: location } } : {}),
      ...(visaSponsorRequired === true ? { visaSponsorRequired: true } : {}),
    },
    include: {
      skills: true,
      jobPreferences: true,
      user: { select: { name: true, email: true, image: true } }
    },
    orderBy: [
      { firstName: "asc" }
    ]
  })

  // Filter by skills in-memory (comma-separated match)
  if (skills && skills.trim()) {
    const filterSkills = skills.toLowerCase().split(",").map(s => s.trim())
    return seekers.filter(s =>
      s.skills.some(sk => filterSkills.some(fs => sk.name.toLowerCase().includes(fs)))
    )
  }

  return seekers
}

// ─── Employer: Send Outreach / Interview Request ──────────────────────────────
export async function sendOutreachAction(formData: FormData) {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const org = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })
  if (!org) return { error: "Organization profile not found" }

  const jobSeekerId = formData.get("jobSeekerId") as string
  const message = formData.get("message") as string
  const interviewDateStr = formData.get("interviewDate") as string

  if (!jobSeekerId || !message) return { error: "Missing required fields" }

  try {
    await prisma.talentOutreach.upsert({
      where: { orgId_jobSeekerId: { orgId: org.id, jobSeekerId } },
      update: {
        message,
        interviewDate: interviewDateStr ? new Date(interviewDateStr) : null,
        status: "Pending",
        updatedAt: new Date()
      },
      create: {
        orgId: org.id,
        jobSeekerId,
        message,
        interviewDate: interviewDateStr ? new Date(interviewDateStr) : null,
        status: "Pending"
      }
    })
  } catch (e) {
    console.error("Outreach error:", e)
    return { error: "Failed to send outreach" }
  }

  revalidatePath("/dashboard/organization/talent/outreach")
  return { success: true }
}

// ─── Job Seeker: Respond to Outreach ─────────────────────────────────────────
export async function respondToOutreachAction(outreachId: string, status: "Accepted" | "Declined") {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const jobSeeker = await prisma.jobSeeker.findUnique({ where: { userId: session.user.id } })
  if (!jobSeeker) return { error: "Not found" }

  const outreach = await prisma.talentOutreach.findUnique({ where: { id: outreachId } })
  if (!outreach || outreach.jobSeekerId !== jobSeeker.id) return { error: "Unauthorized" }

  await prisma.talentOutreach.update({
    where: { id: outreachId },
    data: { status }
  })

  revalidatePath("/dashboard/job-seeker/outreach")
  return { success: true }
}

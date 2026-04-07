"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function selectRole(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const role = formData.get("role") as string
  
  if (role !== "JOB_SEEKER" && role !== "ORGANIZATION") {
    throw new Error("Invalid role")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    throw new Error("User account not found. Please try signing out and back in.")
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role }
  })
  
  // Create an initial empty profile based on role (using upsert to avoid unique constraint errors)
  if (role === "JOB_SEEKER") {
    await prisma.jobSeeker.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id },
      update: {} // No update needed if exists
    })
    redirect("/onboarding/job-seeker")
  } else {
    // For organization, it requires companyName which isn't optional
    // We'll let the organization onboarding form handle creation instead
    redirect("/onboarding/organization")
  }
}

export async function completeJobSeekerOnboarding(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  const bio = formData.get("bio") as string
  const resumeUrl = formData.get("resumeUrl") as string

  try {
    const result = await prisma.jobSeeker.upsert({
      where: { userId: session.user.id },
      update: { bio, resumeUrl },
      create: {
        userId: session.user.id,
        bio,
        resumeUrl
      }
    })
    revalidatePath("/dashboard/job-seeker")
  } catch (error) {
    console.error("Job seeker onboarding error:", error)
    return { error: "Failed to update profile" }
  }

  redirect("/dashboard/job-seeker")
}

export async function completeOrganizationOnboarding(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  const companyName = formData.get("companyName") as string
  const industry = formData.get("industry") as string
  const website = formData.get("website") as string
  const logoUrl = formData.get("logoUrl") as string

  if (!companyName) return { error: "Company name is required" }

  try {
    // Upsert organization for this user
    await prisma.organization.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        companyName,
        industry,
        website,
        logoUrl
      },
      update: {
        companyName,
        industry,
        website,
        logoUrl
      }
    })
    revalidatePath("/dashboard/organization")
  } catch (error) {
    console.error("Organization onboarding error:", error)
    return { error: "Failed to update organization profile" }
  }

  redirect("/dashboard/organization")
}

export async function updateOrganizationProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  const companyName = formData.get("companyName") as string
  const industry = formData.get("industry") as string
  const website = formData.get("website") as string
  const description = formData.get("description") as string
  const location = formData.get("location") as string
  const contactEmail = formData.get("contactEmail") as string
  const logoUrl = formData.get("logoUrl") as string

  if (!companyName) return { error: "Company name is required" }

  try {
    await prisma.organization.update({
      where: { userId: session.user.id },
      data: {
        companyName,
        industry,
        website,
        description,
        location,
        contactEmail,
        ...(logoUrl ? { logoUrl } : {})
      }
    })
    revalidatePath("/dashboard/organization")
    revalidatePath("/dashboard/organization/profile")
    revalidatePath("/jobs")
    return { success: true }
  } catch (error) {
    console.error("Update organization profile error:", error)
    return { error: "Failed to update profile" }
  }
}

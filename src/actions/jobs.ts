"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createJobAction(formData: FormData) {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) return { error: "Organization profile not found" }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const minSalaryStr = formData.get("minSalary") as string
  const maxSalaryStr = formData.get("maxSalary") as string
  const visaSponsorBadge = formData.get("visaSponsorBadge") as string

  try {
    await prisma.jobPost.create({
      data: {
        orgId: organization.id,
        title,
        description,
        minSalary: minSalaryStr ? parseInt(minSalaryStr) : null,
        maxSalary: maxSalaryStr ? parseInt(maxSalaryStr) : null,
        visaSponsorBadge: visaSponsorBadge || "No Sponsorship Data",
        isActive: true,
      }
    })
  } catch (error) {
    return { error: "Failed to create job post" }
  }

  revalidatePath("/dashboard/organization")
  redirect("/dashboard/organization")
}

export async function editJobAction(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) return { error: "Organization not found" }

  const job = await prisma.jobPost.findUnique({ where: { id } })
  if (!job || job.orgId !== organization.id) return { error: "Unauthorized or not found" }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const minSalaryStr = formData.get("minSalary") as string
  const maxSalaryStr = formData.get("maxSalary") as string
  const visaSponsorBadge = formData.get("visaSponsorBadge") as string
  const isActiveStr = formData.get("isActive") as string

  try {
    await prisma.jobPost.update({
      where: { id },
      data: {
        title,
        description,
        minSalary: minSalaryStr ? parseInt(minSalaryStr) : null,
        maxSalary: maxSalaryStr ? parseInt(maxSalaryStr) : null,
        visaSponsorBadge: visaSponsorBadge || "No Sponsorship Data",
        isActive: isActiveStr === "true",
      }
    })
  } catch (error) {
    return { error: "Failed to update job post" }
  }

  revalidatePath("/dashboard/organization")
  redirect("/dashboard/organization")
}

export async function deleteJobAction(id: string) {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) return { error: "Organization not found" }

  const job = await prisma.jobPost.findUnique({ where: { id } })
  if (!job || job.orgId !== organization.id) return { error: "Unauthorized" }

  try {
    await prisma.jobPost.delete({ where: { id } })
  } catch(error) {
    return { error: "Failed to delete" }
  }

  revalidatePath("/dashboard/organization")
}

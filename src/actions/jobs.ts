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
  const jobType = formData.get("jobType") as string
  const locationType = formData.get("locationType") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const country = formData.get("country") as string
  const currency = formData.get("currency") as string
  const salaryType = formData.get("salaryType") as string
  const benefits = formData.get("benefits") as string
  const equityBonus = formData.get("equityBonus") as string
  const requiredSkills = formData.get("requiredSkills") as string
  const minExperienceStr = formData.get("minExperience") as string
  const maxExperienceStr = formData.get("maxExperience") as string
  const education = formData.get("education") as string
  const certifications = formData.get("certifications") as string
  const responsibilities = formData.get("responsibilities") as string
  const openingsStr = formData.get("openings") as string
  const howToApply = formData.get("howToApply") as string
  const externalUrl = formData.get("externalUrl") as string
  const contactEmail = formData.get("contactEmail") as string
  const closingDateStr = formData.get("closingDate") as string
  
  // Company Info Override
  const companyName = formData.get("companyName") as string
  const companyDescription = formData.get("companyDescription") as string
  const websiteUrl = formData.get("websiteUrl") as string
  const industry = formData.get("industry") as string
  const logoUrl = organization.logoUrl // Currently no upload in this form, using org logo

  try {
    await prisma.jobPost.create({
      data: {
        orgId: organization.id,
        title,
        description,
        minSalary: minSalaryStr ? parseInt(minSalaryStr) : null,
        maxSalary: maxSalaryStr ? parseInt(maxSalaryStr) : null,
        visaSponsorBadge: visaSponsorBadge || "No Sponsorship Data",
        jobType: jobType || "FULL_TIME",
        locationType: locationType || "ONSITE",
        city,
        state,
        country: country || "United Kingdom",
        currency: currency || "GBP",
        salaryType: salaryType || "YEARLY",
        benefits,
        equityBonus,
        requiredSkills,
        minExperience: minExperienceStr ? parseInt(minExperienceStr) : null,
        maxExperience: maxExperienceStr ? parseInt(maxExperienceStr) : null,
        education,
        certifications,
        responsibilities,
        openings: openingsStr ? parseInt(openingsStr) : 1,
        howToApply: howToApply || "INTERNAL",
        externalUrl,
        contactEmail,
        closingDate: closingDateStr ? new Date(closingDateStr) : null,
        companyName: companyName || organization.companyName,
        companyDescription: companyDescription || organization.description,
        websiteUrl: websiteUrl || organization.website,
        industry: industry || organization.industry,
        logoUrl,
        isActive: true,
      }
    })
  } catch (error) {
    console.error("Create Job Error:", error)
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
  const jobType = formData.get("jobType") as string
  const locationType = formData.get("locationType") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const country = formData.get("country") as string
  const currency = formData.get("currency") as string
  const salaryType = formData.get("salaryType") as string
  const benefits = formData.get("benefits") as string
  const equityBonus = formData.get("equityBonus") as string
  const requiredSkills = formData.get("requiredSkills") as string
  const minExperienceStr = formData.get("minExperience") as string
  const maxExperienceStr = formData.get("maxExperience") as string
  const education = formData.get("education") as string
  const certifications = formData.get("certifications") as string
  const responsibilities = formData.get("responsibilities") as string
  const openingsStr = formData.get("openings") as string
  const howToApply = formData.get("howToApply") as string
  const externalUrl = formData.get("externalUrl") as string
  const contactEmail = formData.get("contactEmail") as string
  const closingDateStr = formData.get("closingDate") as string

  // Company Info Override
  const companyName = formData.get("companyName") as string
  const companyDescription = formData.get("companyDescription") as string
  const websiteUrl = formData.get("websiteUrl") as string
  const industry = formData.get("industry") as string

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
        jobType: jobType || "FULL_TIME",
        locationType: locationType || "ONSITE",
        city,
        state,
        country: country || "United Kingdom",
        currency: currency || "GBP",
        salaryType: salaryType || "YEARLY",
        benefits,
        equityBonus,
        requiredSkills,
        minExperience: minExperienceStr ? parseInt(minExperienceStr) : null,
        maxExperience: maxExperienceStr ? parseInt(maxExperienceStr) : null,
        education,
        certifications,
        responsibilities,
        openings: openingsStr ? parseInt(openingsStr) : 1,
        howToApply: howToApply || "INTERNAL",
        externalUrl,
        contactEmail,
        closingDate: closingDateStr ? new Date(closingDateStr) : null,
        companyName,
        companyDescription,
        websiteUrl,
        industry,
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

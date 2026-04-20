"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateJobSeekerProfile(data: any) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: session.user.id }
  })

  if (!jobSeeker) {
    throw new Error("Profile not found")
  }

  try {
    // Transaction to update base fields and completely replace relation arrays
    await prisma.$transaction([
      // 1. Update flat JobSeeker fields
      prisma.jobSeeker.update({
        where: { id: jobSeeker.id },
        data: {
          firstName: data.firstName || jobSeeker.firstName,
          lastName: data.lastName || jobSeeker.lastName,
          headline: data.headline || jobSeeker.headline,
          phone: data.phone || jobSeeker.phone,
          city: data.city || jobSeeker.city,
          relocatable: data.relocatable || jobSeeker.relocatable,
          bio: data.bio || jobSeeker.bio,
          avatarUrl: data.avatarUrl || jobSeeker.avatarUrl,
          portfolioUrl: data.portfolioUrl || jobSeeker.portfolioUrl,
          githubUrl: data.githubUrl || jobSeeker.githubUrl,
          linkedinUrl: data.linkedinUrl || jobSeeker.linkedinUrl,
          gender: data.gender || jobSeeker.gender,
          dob: data.dob ? new Date(data.dob) : jobSeeker.dob,
          differentlyAbled: data.differentlyAbled || jobSeeker.differentlyAbled,
          veteranStatus: data.veteranStatus || jobSeeker.veteranStatus,
          resumeUrl: data.resumeUrl || jobSeeker.resumeUrl,
          yearsOfExperience: data.yearsOfExperience ? parseFloat(data.yearsOfExperience) : jobSeeker.yearsOfExperience,
        }
      }),
      
      // 2. Clear old relations to prevent duplicates
      prisma.skill.deleteMany({ where: { jobSeekerId: jobSeeker.id } }),
      prisma.experience.deleteMany({ where: { jobSeekerId: jobSeeker.id } }),
      prisma.education.deleteMany({ where: { jobSeekerId: jobSeeker.id } }),
      prisma.certification.deleteMany({ where: { jobSeekerId: jobSeeker.id } }),
      prisma.language.deleteMany({ where: { jobSeekerId: jobSeeker.id } }),
      prisma.jobPreference.deleteMany({ where: { jobSeekerId: jobSeeker.id } }),

      // 3. Insert new relations
      ...(data.skills?.length ? [prisma.skill.createMany({ 
        data: data.skills.map((s: any) => ({ name: s.name, proficiency: s.proficiency, jobSeekerId: jobSeeker.id })) 
      })] : []),
      
      ...(data.experience?.length ? [prisma.experience.createMany({ 
        data: data.experience.map((e: any) => ({ 
          title: e.title,
          company: e.company,
          startDate: new Date(e.startDate),
          endDate: e.endDate ? new Date(e.endDate) : null,
          isCurrent: !!e.isCurrent,
          empType: e.empType,
          location: e.location,
          responsibilities: e.responsibilities,
          jobSeekerId: jobSeeker.id 
        })) 
      })] : []),

      ...(data.education?.length ? [prisma.education.createMany({ 
        data: data.education.map((e: any) => ({ 
          degree: e.degree,
          institution: e.institution,
          yearOfPassing: parseInt(e.yearOfPassing),
          grade: e.grade,
          jobSeekerId: jobSeeker.id 
        })) 
      })] : []),

      ...(data.certifications?.length ? [prisma.certification.createMany({ 
        data: data.certifications.map((c: any) => ({ 
          name: c.name,
          issuer: c.issuer,
          year: parseInt(c.year),
          url: c.url,
          jobSeekerId: jobSeeker.id 
        })) 
      })] : []),

      ...(data.languages?.length ? [prisma.language.createMany({ 
        data: data.languages.map((l: any) => ({ 
          name: l.name,
          proficiency: l.proficiency,
          jobSeekerId: jobSeeker.id 
        })) 
      })] : []),

      ...(data.jobPreferences?.length ? [prisma.jobPreference.createMany({ 
        data: data.jobPreferences.map((p: any) => ({ 
          preferredRole: p.preferredRole,
          preferredType: p.preferredType,
          expectedSalaryMin: p.expectedSalaryMin ? parseInt(p.expectedSalaryMin) : null,
          expectedSalaryMax: p.expectedSalaryMax ? parseInt(p.expectedSalaryMax) : null,
          preferredLocation: (p.preferredLocation && p.preferredLocation.length > 0) 
            ? p.preferredLocation.join(', ') 
            : "Worldwide",
          noticePeriod: p.noticePeriod,
          availability: p.availability,
          jobSeekerId: jobSeeker.id 
        })) 
      })] : []),
      
      // 4. Update User name if first/last name provided
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || session.user.name
        }
      })
    ])

    revalidatePath("/dashboard/job-seeker/profile")
    revalidatePath("/dashboard/job-seeker")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to update profile:", error)
    return { success: false, error: "Failed to update profile data." }
  }
}

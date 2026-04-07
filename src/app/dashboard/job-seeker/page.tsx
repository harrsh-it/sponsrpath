import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import JobSeekerDashboardClient from "./JobSeekerDashboardClient"

export default async function JobSeekerDashboard() {
  const session = await auth()

  if (!session?.user) redirect("/login")

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: session.user.id },
    include: {
      skills: true,
      experience: true,
      education: true,
      certifications: true,
      languages: true,
      applications: {
        include: {
          jobPost: {
            include: {
              organization: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      interviews: {
        where: { scheduledAt: { gte: new Date() } },
        include: {
          jobPost: {
            include: {
              organization: true
            }
          }
        },
        orderBy: { scheduledAt: 'asc' },
        take: 3
      }
    }
  })

  if (!jobSeeker) {
    redirect("/onboarding/job-seeker")
  }

  // Fetch Notifications
  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  // Basic Job Recommendation Logic: Find jobs that mention seeker's skills
  const seekerSkillNames = jobSeeker.skills.map((s: { name: string }) => s.name.toLowerCase())
  
  let recommendedJobs: any[] = []
  if (seekerSkillNames.length > 0) {
    recommendedJobs = await prisma.jobPost.findMany({
      where: {
        isActive: true,
        OR: seekerSkillNames.map((skill: string) => ({
          OR: [
            { title: { contains: skill } },
            { description: { contains: skill } }
          ]
        }))
      },
      include: {
        organization: true
      },
      take: 4
    })
  } else {
    // If no skills, just show latest active jobs
    recommendedJobs = await prisma.jobPost.findMany({
      where: { isActive: true },
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
      take: 4
    })
  }

  // Calculate Profile Strength
  const checklist = [
    { label: "Basic info & photo", completed: !!(jobSeeker.firstName && jobSeeker.lastName) },
    { label: "Work experience added", completed: jobSeeker.experience.length > 0 },
    { label: "Skills tagged", completed: jobSeeker.skills.length > 0 },
    { label: "Resume uploaded", completed: !!jobSeeker.resumeUrl },
    { label: "Certifications missing", completed: jobSeeker.certifications.length > 0 },
    { label: "Portfolio link missing", completed: !!jobSeeker.portfolioUrl }
  ]

  const completedCount = checklist.filter(item => item.completed).length
  const profileStrength = Math.round((completedCount / checklist.length) * 100)

  return (
    <JobSeekerDashboardClient 
      user={{ 
        name: session.user.name ?? null, 
        image: session.user.image ?? null 
      }} 
      jobSeeker={{
        bio: jobSeeker.bio,
        resumeUrl: jobSeeker.resumeUrl,
        profileStrength,
        checklist
      }}
      recommendedJobs={recommendedJobs}
      applications={jobSeeker.applications}
      interviews={jobSeeker.interviews}
      notifications={notifications}
    />
  )
}

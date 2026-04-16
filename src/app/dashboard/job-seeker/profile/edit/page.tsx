import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import JobSeekerProfileForm from "@/components/dashboard/JobSeekerProfileForm"

export default async function EditProfilePage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect("/login")
  }

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: session.user.id },
    include: {
      skills: true,
      experience: true,
      education: true,
      certifications: true,
      languages: true
    }
  })

  if (!jobSeeker) {
    redirect("/onboarding/job-seeker")
  }

  return <JobSeekerProfileForm initialData={jobSeeker} />
}

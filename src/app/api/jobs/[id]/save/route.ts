import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: session.user.id }
    })

    if (!jobSeeker) {
      return NextResponse.json({ error: "Job seeker profile not found" }, { status: 404 })
    }

    // Toggle logic
    const existingSave = await prisma.savedJob.findUnique({
      where: {
        jobSeekerId_jobPostId: {
          jobSeekerId: jobSeeker.id,
          jobPostId: jobId
        }
      }
    })

    if (existingSave) {
      await prisma.savedJob.delete({
        where: { id: existingSave.id }
      })
      return NextResponse.json({ saved: false })
    } else {
      await prisma.savedJob.create({
        data: {
          jobSeekerId: jobSeeker.id,
          jobPostId: jobId
        }
      })
      return NextResponse.json({ saved: true })
    }

  } catch (error) {
    console.error("Save job error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

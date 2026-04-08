import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { writeFile, mkdir } from "fs/promises"
import { join, extname } from "path"
import { randomUUID } from "crypto"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file || !file.size) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
    }

    // Validate size (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be under 5 MB" }, { status: 400 })
    }

    const ext = extname(file.name) || ".png"
    const filename = `${randomUUID()}${ext}`
    const uploadDir = join(process.cwd(), "public", "uploads")

    await mkdir(uploadDir, { recursive: true })

    const bytes = await file.arrayBuffer()
    await writeFile(join(uploadDir, filename), Buffer.from(bytes))

    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (err) {
    console.error("Upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

"use client"

import { useState } from "react"
import { Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"

interface SaveJobButtonProps {
  jobId: string
  initialSaved?: boolean
  className?: string
}

export default function SaveJobButton({ jobId, initialSaved = false, className = "" }: SaveJobButtonProps) {
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function toggleSave(e: React.MouseEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/jobs/${jobId}/save`, {
        method: "POST"
      })

      if (res.ok) {
        setSaved(!saved)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to toggle save:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className={`transition-all duration-300 ${saved ? 'text-rose-500 fill-rose-500' : 'text-slate-300 hover:text-rose-500'} ${className}`}
      aria-label={saved ? "Remove from saved" : "Save job"}
    >
      <Bookmark className={`h-full w-full ${saved ? 'fill-current' : ''}`} />
    </button>
  )
}

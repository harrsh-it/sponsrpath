"use client"

import { Trash2 } from "lucide-react"
import { useTransition } from "react"
import { deleteJobAction } from "@/actions/jobs"

export function DeleteJobButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      onClick={() => {
        if (confirm("Are you sure you want to delete this job listing? This action cannot be undone.")) {
          startTransition(() => {
            deleteJobAction(id)
          })
        }
      }}
      disabled={isPending}
      className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50" 
      title="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}

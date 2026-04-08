"use client"

import { toggleTalentVisibilityAction } from "@/actions/talent"
import { useState } from "react"
import { Eye, EyeOff, Globe } from "lucide-react"

export function VisibilityToggle({ isPublic: initialValue, seekerId }: { isPublic: boolean; seekerId: string }) {
  const [isPublic, setIsPublic] = useState(initialValue)
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    setLoading(true)
    const next = !isPublic
    const result = await toggleTalentVisibilityAction(next)
    if (!result?.error) setIsPublic(next)
    setLoading(false)
  }

  return (
    <div className={`p-8 rounded-[2rem] border transition-all ${isPublic ? "bg-emerald/5 border-emerald/20" : "bg-slate-50 border-slate-200"}`}>
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isPublic ? "bg-emerald/20" : "bg-slate-200"}`}>
            {isPublic ? <Globe className="h-6 w-6 text-emerald" /> : <EyeOff className="h-6 w-6 text-slate-400" />}
          </div>
          <div>
            <p className="font-black text-navy uppercase tracking-widest text-sm">
              {isPublic ? "Profile is Public" : "Profile is Private"}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {isPublic
                ? "Employers can discover you on the Talent Showcase."
                : "Hidden from the Talent Showcase. Only you can see it."}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={loading}
          className={`relative w-16 h-8 rounded-full transition-all duration-300 ${isPublic ? "bg-emerald" : "bg-slate-300"} disabled:opacity-60 shrink-0 focus:outline-none focus:ring-4 focus:ring-navy/10`}
          aria-label="Toggle profile visibility"
        >
          {loading ? (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                isPublic ? "left-9" : "left-1"
              }`}
            />
          )}
        </button>
      </div>

      {isPublic && (
        <div className="mt-5 pt-5 border-t border-emerald/10 flex items-center gap-2 text-xs text-emerald font-bold uppercase tracking-widest">
          <Eye className="h-3.5 w-3.5" />
          Visible on <a href="/talent" className="underline hover:text-emerald/80">Talent Showcase</a>
        </div>
      )}
    </div>
  )
}

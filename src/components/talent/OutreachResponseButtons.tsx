"use client"

import { respondToOutreachAction } from "@/actions/talent"
import { useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"

export function OutreachResponseButtons({ outreachId }: { outreachId: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function respond(status: "Accepted" | "Declined") {
    setLoading(status)
    await respondToOutreachAction(outreachId, status)
    setLoading(null)
    setDone(true)
  }

  if (done) {
    return <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Response sent ✓</span>
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => respond("Accepted")}
        disabled={!!loading}
        className="flex items-center gap-2 px-5 py-2.5 bg-emerald text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald/90 transition-all disabled:opacity-50 shadow-lg shadow-emerald/20"
      >
        {loading === "Accepted" ? (
          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <CheckCircle2 className="h-3.5 w-3.5" />
        )}
        Accept
      </button>
      <button
        onClick={() => respond("Declined")}
        disabled={!!loading}
        className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all disabled:opacity-50"
      >
        {loading === "Declined" ? (
          <span className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
        ) : (
          <XCircle className="h-3.5 w-3.5" />
        )}
        Decline
      </button>
    </div>
  )
}

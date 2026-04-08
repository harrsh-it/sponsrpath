"use client"

import { useState } from "react"
import { sendOutreachAction } from "@/actions/talent"
import { useRouter } from "next/navigation"
import { Send, CalendarDays, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react"

interface OutreachFormProps {
  jobSeekerId: string
  seekerName: string
  seekerHeadline: string | null
  avatarUrl: string | null
}

export function OutreachForm({ jobSeekerId, seekerName, seekerHeadline, avatarUrl }: OutreachFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const initials = seekerName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.set("jobSeekerId", jobSeekerId)
    const result = await sendOutreachAction(formData)
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setTimeout(() => router.push("/dashboard/organization/talent"), 2000)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-24 h-24 rounded-[2rem] bg-emerald/10 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 className="h-12 w-12 text-emerald" />
        </div>
        <h2 className="text-3xl font-black text-navy mb-3">Outreach Sent!</h2>
        <p className="text-slate-500 font-medium">Redirecting you back to talent search...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      {/* Candidate preview */}
      <div className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-navy/5">
        <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center text-xl font-black overflow-hidden shrink-0">
          {avatarUrl ? <img src={avatarUrl} alt={seekerName} className="w-full h-full object-cover" /> : initials}
        </div>
        <div>
          <p className="font-black text-navy text-lg">{seekerName}</p>
          <p className="text-sm text-slate-500 font-medium mt-0.5">{seekerHeadline ?? "Open to opportunities"}</p>
        </div>
      </div>

      {error && (
        <div className="p-5 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold border border-rose-100">
          {error}
        </div>
      )}

      {/* Message */}
      <div>
        <label className="flex text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5" /> Your Message *
        </label>
        <textarea
          name="message"
          required
          rows={8}
          placeholder="Introduce yourself and your company, describe the role you have in mind, and explain why you think this candidate could be a great fit..."
          className="block w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-navy placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all text-sm font-semibold leading-relaxed"
        />
      </div>

      {/* Interview date (optional) */}
      <div>
        <label className="flex text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5" /> Proposed Interview Date (Optional)
        </label>
        <input
          type="datetime-local"
          name="interviewDate"
          className="block w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-navy focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all text-sm font-semibold"
        />
        <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Suggest a date — the candidate can accept, decline, or propose a new time.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-10 py-5 rounded-2xl border-2 border-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-navy text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal transition-all shadow-2xl shadow-navy/20 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Sending...</>
          ) : (
            <><Send className="h-4 w-4" /> Send Interview Request</>
          )}
        </button>
      </div>
    </form>
  )
}

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { OutreachResponseButtons } from "@/components/talent/OutreachResponseButtons"
import { Building2, CalendarDays, Clock, Bell, CheckCircle2, XCircle, MessageSquare } from "lucide-react"

export default async function JobSeekerOutreachPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const seeker = await prisma.jobSeeker.findUnique({ where: { userId: session.user.id } })
  if (!seeker) redirect("/dashboard/job-seeker")

  const outreachList = await prisma.talentOutreach.findMany({
    where: { jobSeekerId: seeker.id },
    include: {
      organization: { select: { companyName: true, logoUrl: true, industry: true, website: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  const pending = outreachList.filter(o => o.status === "Pending").length

  const statusConfig = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-emerald/10 text-emerald border-emerald/20"
      case "Declined": return "bg-rose-50 text-rose-500 border-rose-200"
      default: return "bg-amber/10 text-amber border-amber/20"
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center relative">
            <Bell className="h-5 w-5 text-amber" />
            {pending > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber text-navy text-[10px] font-black rounded-full flex items-center justify-center">
                {pending}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-heading font-black text-navy tracking-tight">Employer Outreach</h1>
        </div>
        <p className="text-slate-500 font-medium ml-13">
          {outreachList.length} message{outreachList.length !== 1 ? "s" : ""} from employers.
          {pending > 0 && <span className="text-amber font-bold"> {pending} awaiting your response.</span>}
        </p>
      </div>

      {outreachList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl text-center">
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 flex items-center justify-center mb-6">
            <Bell className="h-8 w-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-navy mb-3">No outreach yet</h3>
          <p className="text-slate-500 font-medium max-w-xs">
            Make your profile public and employers will be able to reach out directly.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {outreachList.map((outreach) => {
            const org = outreach.organization
            const orgInitials = org.companyName.substring(0, 2).toUpperCase()

            return (
              <div
                key={outreach.id}
                className={`bg-white rounded-[2.5rem] border shadow-xl shadow-navy/5 overflow-hidden transition-all hover:shadow-2xl hover:shadow-navy/10 ${
                  outreach.status === "Pending" ? "border-amber/30" : "border-slate-100"
                }`}
              >
                {/* Org header */}
                <div className="px-8 py-6 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center text-base font-black overflow-hidden shrink-0">
                      {org.logoUrl ? <img src={org.logoUrl} alt={org.companyName} className="w-full h-full object-cover" /> : orgInitials}
                    </div>
                    <div>
                      <h3 className="font-black text-navy text-lg">{org.companyName}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-400 font-bold">
                        {org.industry && <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3" />{org.industry}</span>}
                        {org.website && (
                          <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">{org.website.replace("https://", "")}</a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusConfig(outreach.status)}`}>
                      {outreach.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {new Date(outreach.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="px-8 py-7">
                  <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <MessageSquare className="h-3.5 w-3.5" /> Message
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed text-sm whitespace-pre-line">{outreach.message}</p>

                  {/* Interview date if proposed */}
                  {outreach.interviewDate && (
                    <div className="mt-6 flex items-center gap-3 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
                      <CalendarDays className="h-5 w-5 text-indigo-500 shrink-0" />
                      <div>
                        <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">Proposed Interview</p>
                        <p className="text-sm font-bold text-navy mt-0.5">
                          {new Date(outreach.interviewDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {outreach.status === "Pending" && (
                  <div className="px-8 pb-7 pt-0">
                    <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Respond to this outreach:</p>
                      <OutreachResponseButtons outreachId={outreach.id} />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

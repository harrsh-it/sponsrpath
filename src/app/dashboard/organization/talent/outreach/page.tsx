import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { CalendarDays, Building2, Clock, CheckCircle2, XCircle, User, ArrowRight, Send } from "lucide-react"

export default async function OutreachSentPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const org = await prisma.organization.findUnique({ where: { userId: session.user.id } })
  if (!org) redirect("/dashboard/organization")

  const outreachList = await prisma.talentOutreach.findMany({
    where: { orgId: org.id },
    include: {
      jobSeeker: {
        include: { user: { select: { name: true } } }
      }
    },
    orderBy: { createdAt: "desc" }
  })

  const statusConfig = (status: string) => {
    switch (status) {
      case "Accepted": return { color: "bg-emerald/10 text-emerald border-emerald/20", icon: CheckCircle2 }
      case "Declined": return { color: "bg-rose-50 text-rose-500 border-rose-200", icon: XCircle }
      case "Scheduled": return { color: "bg-indigo-50 text-indigo-500 border-indigo-200", icon: CalendarDays }
      default: return { color: "bg-amber/10 text-amber border-amber/20", icon: Clock }
    }
  }

  return (
    <div className="w-full">
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-navy tracking-tight">Outreach Sent</h1>
          <p className="text-slate-500 font-medium mt-2">Track your interview requests and responses.</p>
        </div>
        <Link
          href="/dashboard/organization/talent"
          className="flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-teal transition-all shadow-lg shadow-navy/20"
        >
          <Send className="h-4 w-4" /> Find More Talent
        </Link>
      </div>

      {outreachList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-xl text-center">
          <div className="w-16 h-16 rounded-[1.5rem] bg-slate-100 flex items-center justify-center mb-6">
            <Send className="h-8 w-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-navy mb-3">No outreach sent yet</h3>
          <p className="text-slate-500 font-medium max-w-xs mb-6">Start discovering talent and send your first interview request.</p>
          <Link
            href="/dashboard/organization/talent"
            className="px-8 py-3 bg-navy text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-teal transition-all"
          >
            Explore Talent
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {outreachList.map((outreach) => {
            const seeker = outreach.jobSeeker
            const name = seeker.firstName && seeker.lastName
              ? `${seeker.firstName} ${seeker.lastName}`
              : seeker.user.name ?? "Candidate"
            const { color, icon: StatusIcon } = statusConfig(outreach.status)

            return (
              <div
                key={outreach.id}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-navy/5 p-7 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-xl hover:shadow-navy/10 transition-all"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-navy text-white flex items-center justify-center text-base font-black shrink-0">
                  {seeker.avatarUrl ? (
                    <img src={seeker.avatarUrl} alt={name} className="w-full h-full object-cover rounded-2xl" />
                  ) : name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-black text-navy text-base">{name}</h3>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${color}`}>
                      <StatusIcon className="h-3 w-3" /> {outreach.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2">{outreach.message}</p>
                  <div className="flex flex-wrap items-center gap-5 mt-3 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> Sent {new Date(outreach.createdAt).toLocaleDateString()}
                    </span>
                    {outreach.interviewDate && (
                      <span className="flex items-center gap-1.5 text-indigo-500">
                        <CalendarDays className="h-3 w-3" /> Interview: {new Date(outreach.interviewDate).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/talent/${seeker.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 hover:border-navy/20 hover:text-navy transition-all shrink-0"
                >
                  <User className="h-4 w-4" /> View Profile
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

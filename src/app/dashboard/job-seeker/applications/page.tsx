import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Clock, Phone, Users, CheckCircle, XCircle, Briefcase, FileText, Globe } from "lucide-react"

export const metadata = {
  title: "Applications | Job Seeker Dashboard",
}

const STAGES = [
  { name: "Applied", icon: FileText, color: "text-slate-500", bg: "bg-slate-100", border: "border-slate-200" },
  { name: "Phone Screen", icon: Phone, color: "text-amber", bg: "bg-amber/10", border: "border-amber/20" },
  { name: "Interview", icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { name: "Offer", icon: CheckCircle, color: "text-emerald", bg: "bg-emerald/10", border: "border-emerald/20" },
  { name: "Rejected", icon: XCircle, color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" }
]

export default async function ApplicationsPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: session.user.id },
    include: {
      applications: {
        include: {
          jobPost: {
            include: { organization: true }
          }
        },
        orderBy: { updatedAt: 'desc' }
      }
    }
  })

  if (!jobSeeker) {
    redirect("/onboarding/job-seeker")
  }

  const applications = jobSeeker.applications || []

  // Stats for Summary Dashboard
  const sponsoredApps = applications.filter(a => a.jobPost.visaSponsorBadge !== "No Sponsorship")
  const nonSponsoredApps = applications.filter(a => a.jobPost.visaSponsorBadge === "No Sponsorship")
  
  const total = applications.length
  const sponsoredPercentage = total > 0 ? Math.round((sponsoredApps.length / total) * 100) : 0
  const nonSponsoredPercentage = total > 0 ? 100 - sponsoredPercentage : 0

  return (
    <div className="max-w-[1400px] mx-auto pb-10">
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-black text-navy tracking-tight flex items-center gap-4">
          <Briefcase className="h-10 w-10 text-teal fill-teal/20" />
          Application Tracking
        </h1>
        <p className="text-slate-500 font-bold mt-1">
          Monitor your job search pipeline and track your visa sponsorship strategy.
        </p>
      </div>

      {/* Summary Dashboard: Sponsored vs Non-Sponsored */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Applications</h3>
            <div className="p-2 bg-navy/5 text-navy rounded-xl"><Briefcase className="h-5 w-5" /></div>
          </div>
          <p className="text-4xl font-heading font-black text-navy relative z-10">{total}</p>
        </div>

        <div className="bg-linear-to-br from-emerald to-teal rounded-3xl p-8 border border-emerald/20 shadow-lg shadow-emerald/10 relative overflow-hidden text-white">
          <div className="absolute -right-8 -top-8 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-[10px] font-black text-white/70 uppercase tracking-widest">Sponsored Roles</h3>
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Globe className="h-5 w-5" /></div>
          </div>
          <div className="flex items-baseline gap-3 relative z-10">
            <p className="text-4xl font-heading font-black">{sponsoredApps.length}</p>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded-lg">{sponsoredPercentage}%</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Non-Sponsored Roles</h3>
            <span className="text-2xl font-heading font-black text-slate-700">{nonSponsoredApps.length}</span>
          </div>
          <div className="mt-4">
             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                 <span className="text-teal">Sponsored Strategy</span>
                 <span className="text-slate-400">Non-Sponsored</span>
             </div>
             <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
               <div className="bg-teal transition-all h-full" style={{ width: `${sponsoredPercentage}%` }}></div>
               <div className="bg-slate-300 transition-all h-full" style={{ width: `${nonSponsoredPercentage}%` }}></div>
             </div>
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      <h2 className="text-2xl font-heading font-black text-navy mb-6">Your Pipeline</h2>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {STAGES.map((stage) => {
          const stageApps = applications.filter(a => a.status === stage.name)
          
          return (
            <div key={stage.name} className="flex flex-col h-full">
              <div className="mb-4 flex items-center justify-between border-b-2 border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <stage.icon className={`h-4 w-4 ${stage.color}`} />
                  <h3 className="font-black text-navy uppercase tracking-widest text-xs">{stage.name}</h3>
                </div>
                <span className="bg-slate-100 text-slate-400 text-[10px] font-black px-2 py-0.5 rounded-lg tabular-nums">
                  {stageApps.length}
                </span>
              </div>
              
              <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-200/50 flex flex-col gap-4 min-h-[300px]">
                {stageApps.map(app => (
                  <div key={app.id} className={`bg-white p-4 rounded-xl shadow-sm border ${stage.border} hover:shadow-md transition-shadow cursor-pointer`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-black text-navy text-sm leading-tight line-clamp-2">{app.jobPost.title}</h4>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {app.jobPost.organization.companyName}
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                        {new Date(app.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                      {app.jobPost.visaSponsorBadge !== "No Sponsorship" && (
                        <span className="bg-emerald/10 text-emerald text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Globe className="h-2.5 w-2.5" /> Sponsor
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                
                {stageApps.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                     <Clock className="h-6 w-6 text-slate-300 mb-2" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No applications yet</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Bookmark, Building2, MapPin, Clock, Globe, ArrowRight } from "lucide-react"
import { VisaBadge, SponsorStatus } from "@/components/ui/VisaBadge"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import SaveJobButton from "@/components/jobs/SaveJobButton"

export const metadata = {
  title: "Favorites | Job Seeker Dashboard",
}

export default async function FavoritesPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: session.user.id },
    include: {
      savedJobs: {
        include: {
          jobPost: {
            include: {
              organization: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!jobSeeker) {
    redirect("/onboarding/job-seeker")
  }

  const savedJobs = jobSeeker.savedJobs.map(sj => sj.jobPost)
  const savedJobIds = savedJobs.map(j => j.id)

  return (
    <div className="max-w-[1400px] mx-auto pb-10">
      <div className="mb-10">
        <h1 className="text-4xl font-heading font-black text-navy tracking-tight flex items-center gap-4">
          <Bookmark className="h-10 w-10 text-rose-500 fill-rose-500/20" />
          Saved Jobs
        </h1>
        <p className="text-slate-500 font-bold mt-1">
          You have <span className="text-rose-500 font-black">{savedJobs.length}</span> bookmarked role{savedJobs.length !== 1 && 's'}.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-navy/5 p-16 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Bookmark className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-navy mb-3 uppercase tracking-tight">No saved jobs</h3>
            <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed font-medium">
              You haven't bookmarked any jobs yet. Browse available jobs and save the ones you like.
            </p>
            <Link 
              href="/jobs"
              className="inline-block mt-8 text-xs font-black text-white bg-navy px-8 py-4 rounded-2xl hover:bg-teal transition-all uppercase tracking-widest shadow-xl shadow-navy/10"
            >
              Browse Jobs
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 hover:shadow-2xl hover:shadow-navy/5 hover:border-teal/30 transition-all group relative overflow-hidden"
            >
              {job.visaSponsorBadge === "Can Sponsor Now" && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-emerald/10 text-emerald text-[10px] font-black uppercase tracking-widest rounded-bl-2xl border-l border-b border-emerald/10">
                  Priority Match
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-6 flex-1 min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-navy/5 border border-slate-100 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-teal/5 transition-all duration-300 overflow-hidden">
                    <CompanyLogo
                      logoUrl={job.organization.logoUrl}
                      companyName={job.organization.companyName}
                      textClassName="text-xl"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-black text-navy group-hover:text-teal transition-colors tracking-tight">
                        {job.title}
                      </h2>
                    </div>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">{job.organization.companyName}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-6">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-widest">
                        <Building2 className="h-4 w-4 text-teal" /> {job.organization.industry || "General"}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-widest">
                        <MapPin className="h-4 w-4 text-teal" /> {[job.city, job.country].filter(Boolean).join(", ") || job.locationName || "United Kingdom"} ({job.locationType?.toLowerCase() || "n/a"})
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-widest">
                        <Clock className="h-4 w-4 text-teal" /> {job.jobType?.replace("_", " ").toLowerCase() || "n/a"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <VisaBadge status={job.visaSponsorBadge as SponsorStatus} />
                  {job.minSalary && (
                    <span className="text-sm font-black text-navy bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                      £{(job.minSalary / 1000).toFixed(0)}k – £{(job.maxSalary! / 1000).toFixed(0)}k
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Globe className="h-3 w-3" /> Tier 2 Sponsored
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Posted {new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <SaveJobButton jobId={job.id} initialSaved={savedJobIds.includes(job.id)} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-rose-100" />
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="bg-navy text-white font-black text-xs uppercase tracking-widest px-8 py-3 rounded-2xl hover:bg-teal transition-all shadow-xl shadow-navy/10 active:scale-95"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { prisma } from "@/lib/prisma"
import { VisaBadge, SponsorStatus } from "@/components/ui/VisaBadge"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import { Search, MapPin, Briefcase, Building2, Globe, Clock, SlidersHorizontal } from "lucide-react"
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import FilterSidebar from "@/components/jobs/FilterSidebar"
import Link from "next/link"
import { auth } from "@/auth"
import SaveJobButton from "@/components/jobs/SaveJobButton"

export const metadata = {
  title: "Browse Jobs | SponsorPath",
  description: "Find UK jobs with Tier 2 visa sponsorship from verified employers.",
}

const statusMap: Record<string, string> = {
  now: "Can Sponsor Now",
  later: "Can Sponsor After 12 Months",
  none: "No Sponsorship",
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    q?: string, 
    sponsorship?: string, 
    type?: string, 
    location?: string, 
    industry?: string,
    salary?: string 
  }>
}) {
  const { q, sponsorship, type, location, industry, salary } = await searchParams

  const session = await auth()
  let savedJobIds: string[] = []
  if (session?.user?.id) {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: session.user.id },
      include: { savedJobs: { select: { jobPostId: true } } }
    })
    if (jobSeeker) {
      savedJobIds = jobSeeker.savedJobs.map((sj: { jobPostId: string }) => sj.jobPostId)
    }
  }

  // Build the where clause
  const where: any = {
    isActive: true,
  }

  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
      { organization: { companyName: { contains: q } } }
    ]
  }

  if (sponsorship && statusMap[sponsorship]) {
    where.visaSponsorBadge = statusMap[sponsorship]
  }

  if (type) {
    where.jobType = type
  }

  if (location) {
    where.locationType = location
  }

  if (industry) {
    where.organization = { ...where.organization, industry: industry }
  }

  if (salary) {
    const minVal = parseInt(salary) * 1000
    where.minSalary = { gte: minVal }
  }

  // Get unique industries for the filter
  const organizations = await prisma.organization.findMany({
    select: { industry: true },
    where: { industry: { not: null } },
    distinct: ['industry']
  })
  const industries = organizations.map(org => org.industry as string).sort()

  const jobs = await prisma.jobPost.findMany({
    where,
    include: {
      organization: {
        select: { companyName: true, industry: true, logoUrl: true, sponsorStatus: true }
      }
    },
    // Simple prioritization: Sponsored jobs first (alphabetical "Can Sponsor Now" happens to be first, 
    // but better to use multiple order layers if needed)
    orderBy: [
      { visaSponsorBadge: "asc" }, // "Can Sponsor Now" < "Can Sponsor After..." < "No Sponsorship" alphabetically
      { createdAt: "desc" }
    ],
    take: 50,
  })

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <div className="bg-navy pt-20 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8">
              <div className="max-w-2xl">
                
                <h1 className="text-4xl md:text-6xl font-heading font-black text-white leading-tight">
                  Find your <span className="text-amber">Visa-Sponsored</span> future.
                </h1>
                <p className="text-white/60 text-lg mt-6 font-medium max-w-xl">
                  Filter by sponsorship status, job type, and location to find the perfect role that values your global talent.
                </p>
              </div>
              
              <form method="GET" action="/jobs" className="w-full max-w-md flex flex-col gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Search by job title or company..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber focus:bg-white focus:text-navy transition-all shadow-2xl backdrop-blur-md"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Search Layout */}
        <div className="max-w-7xl mx-auto px-6 -mt-16 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Filter */}
            <aside className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-xl shadow-navy/5 border border-slate-100 h-fit sticky top-24">
              <FilterSidebar industries={industries} />
            </aside>

            {/* Results List */}
            <main className="lg:col-span-9 space-y-6">
              <div className="flex items-center justify-between bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100 mb-2">
                <p className="text-slate-500 text-sm font-medium">
                  Showing <span className="text-navy font-black">{jobs.length}</span> results
                  {q && <span> for <span className="text-teal font-black">"{q}"</span></span>}
                </p>
                <div className="flex gap-2">
                   {/* Selected filter tags could go here */}
                </div>
              </div>

              {jobs.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-navy/5">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                    <Briefcase className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-navy mb-3 uppercase tracking-tight">No matching jobs</h3>
                  <p className="text-slate-500 max-w-xs mx-auto text-sm leading-relaxed font-medium">We couldn't find any listings matching your current filters. Try broadening your search.</p>
                  <Link 
                    href="/jobs"
                    className="inline-block mt-8 text-xs font-black text-white bg-navy px-8 py-4 rounded-2xl hover:bg-teal transition-all uppercase tracking-widest shadow-xl shadow-navy/10"
                  >
                    Clear all filters
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8 hover:shadow-2xl hover:shadow-navy/5 hover:border-teal/30 transition-all group relative overflow-hidden"
                    >
                      {/* Priority Highlight for Sponsored Jobs */}
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
                                <MapPin className="h-4 w-4 text-teal" /> {job.locationName || "United Kingdom"} ({job.locationType?.toLowerCase() || "n/a"})
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
                          {session?.user && (
                            <SaveJobButton jobId={job.id} initialSaved={savedJobIds.includes(job.id)} className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-rose-100" />
                          )}
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
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


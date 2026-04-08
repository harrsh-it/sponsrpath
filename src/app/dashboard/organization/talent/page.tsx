import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { TalentCard } from "@/components/talent/TalentCard"
import { TalentFilters } from "@/components/talent/TalentFilters"
import { Suspense } from "react"
import { Users, Sparkles, Search } from "lucide-react"

interface SearchParams {
  skills?: string
  jobType?: string
  location?: string
  availability?: string
  visaOnly?: string
  page?: string
}

export default async function EmployerTalentSearchPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })
  if (!org) redirect("/dashboard/organization")

  // Fetch sent outreach IDs so we can highlight them
  const sentOutreach = await prisma.talentOutreach.findMany({
    where: { orgId: org.id },
    select: { jobSeekerId: true, status: true }
  })
  const outreachMap = new Map(sentOutreach.map(o => [o.jobSeekerId, o.status]))

  const where: any = { isPublic: true }
  if (searchParams.jobType) where.preferredType = searchParams.jobType
  if (searchParams.location) where.city = { contains: searchParams.location }
  if (searchParams.availability) where.availability = searchParams.availability
  if (searchParams.visaOnly === "true") where.visaSponsorRequired = true

  const seekers = await prisma.jobSeeker.findMany({
    where,
    include: {
      skills: true,
      user: { select: { name: true, image: true } }
    },
    orderBy: [{ availability: "asc" }, { firstName: "asc" }],
    take: 50
  })

  // In-memory skills filter
  const filteredSeekers = searchParams.skills
    ? seekers.filter(s =>
        s.skills.some(sk =>
          searchParams.skills!.toLowerCase().split(",").some(fs =>
            sk.name.toLowerCase().includes(fs.trim())
          )
        )
      )
    : seekers

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-navy" />
          </div>
          <h1 className="text-3xl font-heading font-black text-navy tracking-tight">Find Talent</h1>
        </div>
        <p className="text-slate-500 font-medium ml-13">
          Search {filteredSeekers.length} publicly available candidates and reach out directly.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Active Profiles", value: filteredSeekers.length, color: "text-navy" },
          { label: "Outreach Sent", value: sentOutreach.length, color: "text-teal" },
          { label: "Accepted", value: sentOutreach.filter(o => o.status === "Accepted").length, color: "text-emerald" },
          { label: "Pending Replies", value: sentOutreach.filter(o => o.status === "Pending").length, color: "text-amber" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 px-6 py-5 shadow-sm">
            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <aside className="w-full lg:w-72 shrink-0">
          <Suspense>
            <TalentFilters />
          </Suspense>
        </aside>

        {/* Results */}
        <main className="flex-1">
          {filteredSeekers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 bg-white rounded-[3rem] border border-slate-100 shadow-xl text-center">
              <div className="w-20 h-20 rounded-[2rem] bg-slate-100 flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-navy mb-3">No candidates found</h3>
              <p className="text-slate-500 font-medium max-w-xs">Adjust your filters to broaden the search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSeekers.map((seeker) => (
                <div key={seeker.id} className="relative">
                  {outreachMap.has(seeker.id) && (
                    <div className="absolute -top-3 left-6 z-10">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg ${
                        outreachMap.get(seeker.id) === "Accepted"
                          ? "bg-emerald text-white"
                          : outreachMap.get(seeker.id) === "Declined"
                          ? "bg-rose-500 text-white"
                          : "bg-amber text-navy"
                      }`}>
                        {outreachMap.get(seeker.id)}
                      </span>
                    </div>
                  )}
                  <TalentCard seeker={seeker as any} showOutreachButton />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

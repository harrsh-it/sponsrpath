import { prisma } from "@/lib/prisma"
import { TalentCard } from "@/components/talent/TalentCard"
import { TalentFilters } from "@/components/talent/TalentFilters"
import { Suspense } from "react"
import { Users, Sparkles } from "lucide-react"

const PAGE_SIZE = 12

interface SearchParams {
  skills?: string
  jobType?: string
  location?: string
  availability?: string
  visaOnly?: string
  page?: string
}

export const metadata = {
  title: "Find Talent | Sponsrpath",
  description: "Browse publicly available job seeker profiles and find your next hire."
}

export default async function TalentShowcasePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const page = parseInt(searchParams.page ?? "1")
  const skip = (page - 1) * PAGE_SIZE

  // Build Prisma where clause
  const where: any = { isPublic: true }
  if (searchParams.jobType) where.preferredType = searchParams.jobType
  if (searchParams.location) where.city = { contains: searchParams.location }
  if (searchParams.availability) where.availability = searchParams.availability
  if (searchParams.visaOnly === "true") where.visaSponsorRequired = true

  const [seekers, total] = await Promise.all([
    prisma.jobSeeker.findMany({
      where,
      include: {
        skills: true,
        user: { select: { name: true, image: true } }
      },
      orderBy: [{ availability: "asc" }, { firstName: "asc" }],
      skip,
      take: PAGE_SIZE
    }),
    prisma.jobSeeker.count({ where })
  ])

  // Skills filter — in-memory
  const filteredSeekers = searchParams.skills
    ? seekers.filter(s =>
        s.skills.some(sk =>
          searchParams.skills!.toLowerCase().split(",").some(fs =>
            sk.name.toLowerCase().includes(fs.trim())
          )
        )
      )
    : seekers

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero banner */}
      <div className="bg-navy px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,127,138,0.3)_0%,transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-amber" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Talent Showcase</span>
          </div>
          <h1 className="text-5xl font-heading font-black text-white tracking-tight mb-5">
            Find Your Next <span className="text-amber">Hire</span>
          </h1>
          <p className="text-lg text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
            Browse verified candidates actively looking for opportunities. 
            Filter by skills, location, availability, and visa sponsorship needs.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-2xl border border-white/20">
              <Users className="h-4 w-4 text-teal" />
              <span className="text-white font-bold text-sm">{total} candidates available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-6">
              <Suspense>
                <TalentFilters />
              </Suspense>
            </div>
          </aside>

          {/* Results grid */}
          <main className="flex-1">
            {filteredSeekers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[3rem] border border-slate-100 shadow-xl">
                <div className="w-20 h-20 rounded-[2rem] bg-slate-100 flex items-center justify-center mb-6">
                  <Users className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-navy mb-3">No talent found</h3>
                <p className="text-slate-500 font-medium max-w-sm">
                  No public profiles match your current filters. Try broadening your search.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <p className="text-sm font-bold text-slate-500">
                    Showing <span className="text-navy">{filteredSeekers.length}</span> of {total} candidates
                  </p>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    Sorted by availability
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredSeekers.map((seeker) => (
                    <TalentCard key={seeker.id} seeker={seeker as any} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-14">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <a
                        key={p}
                        href={`?page=${p}${searchParams.skills ? `&skills=${searchParams.skills}` : ""}${searchParams.jobType ? `&jobType=${searchParams.jobType}` : ""}`}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${
                          p === page
                            ? "bg-navy text-white shadow-xl shadow-navy/20"
                            : "bg-white border border-slate-200 text-slate-500 hover:border-navy/30 hover:text-navy"
                        }`}
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

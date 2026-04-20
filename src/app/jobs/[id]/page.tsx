import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { VisaBadge, SponsorStatus } from "@/components/ui/VisaBadge"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { auth } from "@/auth"
import SaveJobButton from "@/components/jobs/SaveJobButton"
import {
  MapPin,
  Briefcase,
  Building2,
  Globe,
  Clock,
  ArrowLeft,
  ExternalLink,
  Mail,
  DollarSign,
  Users,
  CalendarDays,
  CheckCircle2,
  BookOpen,
  Award,
  Layers,
} from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await prisma.jobPost.findUnique({
    where: { id },
    include: { organization: { select: { companyName: true } } },
  })
  if (!job) return { title: "Job Not Found | SponsorPath" }
  const displayCompanyName = job.companyName || job.organization.companyName;
  return {
    title: `${job.title} at ${displayCompanyName} | SponsorPath`,
    description: job.description?.slice(0, 160),
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const job = await prisma.jobPost.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      minSalary: true,
      maxSalary: true,
      visaSponsorBadge: true,
      jobType: true,
      locationType: true,
      locationName: true,
      city: true,
      state: true,
      country: true,
      currency: true,
      salaryType: true,
      benefits: true,
      equityBonus: true,
      requiredSkills: true,
      minExperience: true,
      maxExperience: true,
      education: true,
      certifications: true,
      responsibilities: true,
      openings: true,
      howToApply: true,
      externalUrl: true,
      contactEmail: true,
      companyName: true,
      companyDescription: true,
      websiteUrl: true,
      industry: true,
      logoUrl: true,
      createdAt: true,
      closingDate: true,
      organization: {
        select: {
          companyName: true,
          industry: true,
          logoUrl: true,
          sponsorStatus: true,
          website: true,
          description: true,
          location: true,
          companySize: true,
        },
      },
    },
  })

  if (!job) notFound()

  const session = await auth()
  let isSaved = false
  if (session?.user?.id) {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: session.user.id },
      include: { savedJobs: { where: { jobPostId: id }, select: { id: true } } },
    })
    isSaved = (jobSeeker?.savedJobs?.length ?? 0) > 0
  }

  // Parse responsibilities (stored as stringified JSON array or plain text)
  let responsibilities: string[] = []
  if (job.responsibilities) {
    try {
      const parsed = JSON.parse(job.responsibilities)
      responsibilities = Array.isArray(parsed) ? parsed : [job.responsibilities]
    } catch {
      responsibilities = job.responsibilities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }

  const skills = job.requiredSkills
    ? job.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  const isExternal = job.howToApply === "EXTERNAL"
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const closingDate = job.closingDate
    ? new Date(job.closingDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null

  // Snapshot fallbacks
  const displayCompanyName = job.companyName || job.organization.companyName
  const displayCompanyLogo = job.logoUrl || job.organization.logoUrl
  const displayIndustry = job.industry || job.organization.industry
  const displayWebsite = job.websiteUrl || job.organization.website
  const displayDescription = job.companyDescription || job.organization.description
  const locationSummary = [job.city, job.state, job.country].filter(Boolean).join(", ") || job.locationName || "United Kingdom"

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Header */}
        <div className="bg-navy pt-20 pb-32 px-6">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-black uppercase tracking-widest mb-10 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Jobs
            </Link>

            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-2xl">
                <CompanyLogo
                  logoUrl={displayCompanyLogo}
                  companyName={displayCompanyName}
                  textClassName="text-2xl text-white"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <VisaBadge status={job.visaSponsorBadge as SponsorStatus} />
                  {job.visaSponsorBadge === "Can Sponsor Now" && (
                    <span className="text-[10px] font-black text-amber uppercase tracking-widest bg-amber/10 border border-amber/20 px-3 py-1 rounded-full">
                      Priority Match
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight tracking-tight mt-3">
                  {job.title}
                </h1>
                <p className="text-white/60 font-bold text-lg mt-2 uppercase tracking-wider">
                  {displayCompanyName}
                </p>

                <div className="flex flex-wrap items-center gap-5 mt-6">
                  <span className="flex items-center gap-1.5 text-xs font-black text-white/50 uppercase tracking-widest">
                    <Building2 className="h-4 w-4 text-teal" />
                    {displayIndustry || "General"}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-black text-white/50 uppercase tracking-widest">
                    <MapPin className="h-4 w-4 text-teal" />
                    {locationSummary} &middot;{" "}
                    {job.locationType?.toLowerCase() || "onsite"}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-black text-white/50 uppercase tracking-widest">
                    <Clock className="h-4 w-4 text-teal" />
                    {job.jobType?.replace("_", " ").toLowerCase() || "full time"}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-black text-white/50 uppercase tracking-widest">
                    <CalendarDays className="h-4 w-4 text-teal" />
                    Posted {postedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 -mt-16 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column – Description */}
            <div className="lg:col-span-8 space-y-6">

              {/* Apply Card (mobile only) */}
              <div className="lg:hidden bg-white rounded-3xl p-6 shadow-xl shadow-navy/5 border border-slate-100">
                <ApplySection
                  isExternal={isExternal}
                  externalUrl={job.externalUrl}
                  contactEmail={job.contactEmail}
                  jobId={job.id}
                  session={session}
                  isSaved={isSaved}
                  closingDate={closingDate}
                  openings={job.openings}
                />
              </div>

              {/* Description */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-black text-navy uppercase tracking-tight mb-6 flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-teal" />
                  Job Description
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </div>

              {/* Responsibilities */}
              {responsibilities.length > 0 && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                  <h2 className="text-xl font-black text-navy uppercase tracking-tight mb-6 flex items-center gap-3">
                    <Layers className="h-5 w-5 text-teal" />
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-teal shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Skills */}
              {skills.length > 0 && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                  <h2 className="text-xl font-black text-navy uppercase tracking-tight mb-6 flex items-center gap-3">
                    <Award className="h-5 w-5 text-teal" />
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-navy/5 text-navy text-xs font-black uppercase tracking-widest rounded-xl border border-navy/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {(job.education || job.minExperience != null || job.certifications) && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                  <h2 className="text-xl font-black text-navy uppercase tracking-tight mb-6 flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-teal" />
                    Requirements
                  </h2>
                  <dl className="space-y-4">
                    {job.education && (
                      <div className="flex gap-4">
                        <dt className="text-xs font-black text-slate-400 uppercase tracking-widest w-32 shrink-0 pt-0.5">Education</dt>
                        <dd className="text-sm font-medium text-slate-700">{job.education}</dd>
                      </div>
                    )}
                    {job.minExperience != null && (
                      <div className="flex gap-4">
                        <dt className="text-xs font-black text-slate-400 uppercase tracking-widest w-32 shrink-0 pt-0.5">Experience</dt>
                        <dd className="text-sm font-medium text-slate-700">
                          {job.minExperience}
                          {job.maxExperience ? `–${job.maxExperience}` : "+"} years
                        </dd>
                      </div>
                    )}
                    {job.certifications && (
                      <div className="flex gap-4">
                        <dt className="text-xs font-black text-slate-400 uppercase tracking-widest w-32 shrink-0 pt-0.5">Certifications</dt>
                        <dd className="text-sm font-medium text-slate-700">{job.certifications}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                  <h2 className="text-xl font-black text-navy uppercase tracking-tight mb-6 flex items-center gap-3">
                    <Globe className="h-5 w-5 text-teal" />
                    Benefits &amp; Perks
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{job.benefits}</p>
                </div>
              )}
            </div>

            {/* Right Column – Sidebar */}
            <aside className="lg:col-span-4 space-y-6">

              {/* Apply Card (desktop) */}
              <div className="hidden lg:block bg-white rounded-3xl p-8 shadow-xl shadow-navy/5 border border-slate-100 sticky top-24">
                <ApplySection
                  isExternal={isExternal}
                  externalUrl={job.externalUrl}
                  contactEmail={job.contactEmail}
                  jobId={job.id}
                  session={session}
                  isSaved={isSaved}
                  closingDate={closingDate}
                  openings={job.openings}
                />
              </div>

              {/* Job Summary */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-6">Job Summary</h3>
                <dl className="space-y-4">
                  <SummaryRow label="Job Type" value={job.jobType?.replace("_", " ") || "Full Time"} />
                  <SummaryRow label="Location" value={`${locationSummary} (${job.locationType || "Onsite"})`} />
                  {job.minSalary && (
                    <SummaryRow
                      label="Salary"
                      value={`£${(job.minSalary / 1000).toFixed(0)}k – £${((job.maxSalary ?? job.minSalary) / 1000).toFixed(0)}k / ${job.salaryType?.toLowerCase() || "yr"}`}
                    />
                  )}
                  <SummaryRow label="Openings" value={`${job.openings} position${job.openings !== 1 ? "s" : ""}`} />
                  {closingDate && <SummaryRow label="Deadline" value={closingDate} />}
                  {job.equityBonus && <SummaryRow label="Equity / Bonus" value={job.equityBonus} />}
                </dl>
              </div>

              {/* Company Card */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-6">About the Company</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy/5 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <CompanyLogo
                      logoUrl={displayCompanyLogo}
                      companyName={displayCompanyName}
                      textClassName="text-sm"
                    />
                  </div>
                  <div>
                    <p className="font-black text-navy text-sm">{displayCompanyName}</p>
                    <p className="text-xs text-slate-400 font-bold">{displayIndustry || "Technology"}</p>
                  </div>
                </div>
                {displayDescription && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-4">
                    {displayDescription}
                  </p>
                )}
                <dl className="space-y-3 text-xs">
                  {job.organization.location && (
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                      <MapPin className="h-3.5 w-3.5 text-teal shrink-0" />
                      {job.organization.location}
                    </div>
                  )}
                  {job.organization.companySize && (
                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                      <Users className="h-3.5 w-3.5 text-teal shrink-0" />
                      {job.organization.companySize} employees
                    </div>
                  )}
                  {displayWebsite && (
                    <a
                      href={displayWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-teal font-bold hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5 shrink-0" />
                      Visit website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </dl>
              </div>

            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

// ── Small sub-components ──────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <dt className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">{label}</dt>
      <dd className="text-xs font-bold text-navy text-right">{value}</dd>
    </div>
  )
}

type SimpleSession = { user?: { id?: string | null } | null } | null

function ApplySection({
  isExternal,
  externalUrl,
  contactEmail,
  jobId,
  session,
  isSaved,
  closingDate,
  openings,
}: {
  isExternal: boolean
  externalUrl: string | null
  contactEmail: string | null
  jobId: string
  session: SimpleSession
  isSaved: boolean
  closingDate: string | null
  openings: number
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-teal" />
          {openings} opening{openings !== 1 ? "s" : ""}
        </span>
        {closingDate && (
          <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">
            Closes {closingDate}
          </span>
        )}
      </div>

      {isExternal && externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-navy text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-teal transition-all shadow-xl shadow-navy/10 active:scale-95"
        >
          Apply on Company Site
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : contactEmail ? (
        <a
          href={`mailto:${contactEmail}?subject=Application for ${encodeURIComponent("the role")}`}
          className="w-full flex items-center justify-center gap-2 bg-navy text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-teal transition-all shadow-xl shadow-navy/10 active:scale-95"
        >
          Apply via Email
          <Mail className="h-4 w-4" />
        </a>
      ) : (
        <Link
          href={session?.user ? `/dashboard/applications/new?jobId=${jobId}` : `/login?callbackUrl=/jobs/${jobId}`}
          className="w-full flex items-center justify-center gap-2 bg-navy text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-teal transition-all shadow-xl shadow-navy/10 active:scale-95"
        >
          Apply Now
        </Link>
      )}

      {session?.user && (
        <div className="flex items-center gap-2 justify-center pt-1">
          <SaveJobButton
            jobId={jobId}
            initialSaved={isSaved}
            className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-rose-500 px-4 py-2 rounded-xl hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
          />
          <span className="text-xs font-bold text-slate-400">
            {isSaved ? "Saved to your list" : "Save for later"}
          </span>
        </div>
      )}
    </div>
  )
}

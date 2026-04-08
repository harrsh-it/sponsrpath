import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  MapPin, Mail, Globe, Github, Linkedin, Download,
  Briefcase, GraduationCap, Award, Languages, Zap,
  CalendarDays, Clock, ShieldCheck, ExternalLink, ArrowLeft
} from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const seeker = await prisma.jobSeeker.findFirst({
    where: { id, isPublic: true },
    include: { user: { select: { name: true } } }
  })
  if (!seeker) return { title: "Profile Not Found | Sponsrpath" }
  const name = seeker.firstName ? `${seeker.firstName} ${seeker.lastName}` : seeker.user.name
  return {
    title: `${name} — Talent Profile | Sponsrpath`,
    description: seeker.headline ?? `View ${name}'s professional profile on Sponsrpath.`
  }
}

export default async function TalentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()

  const seeker = await prisma.jobSeeker.findFirst({
    where: { id, isPublic: true },
    include: {
      user: { select: { name: true, email: true, image: true } },
      skills: true,
      experience: { orderBy: { startDate: "desc" } },
      education: { orderBy: { yearOfPassing: "desc" } },
      certifications: true,
      languages: true
    }
  })

  if (!seeker) notFound()

  const name =
    seeker.firstName && seeker.lastName
      ? `${seeker.firstName} ${seeker.lastName}`
      : seeker.user.name ?? "Anonymous"

  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)

  const isOrg = (session?.user as any)?.role === "ORGANIZATION"

  const proficiencyColor = (p: string) => {
    switch (p) {
      case "Expert": return "bg-emerald/10 text-emerald border-emerald/20"
      case "Intermediate": return "bg-amber/10 text-amber border-amber/20"
      default: return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,127,138,0.4)_0%,transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-6 pt-8 pb-0">
          <Link
            href="/talent"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold mb-10 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Talent Showcase
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 pb-12">
            {/* Avatar */}
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2rem] bg-white/10 border-4 border-white/20 text-white flex items-center justify-center text-4xl font-black shadow-2xl overflow-hidden shrink-0">
              {seeker.avatarUrl || seeker.user.image ? (
                <img src={seeker.avatarUrl ?? seeker.user.image ?? ""} alt={name} className="w-full h-full object-cover" />
              ) : initials}
            </div>

            <div className="flex-1 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-4xl font-heading font-black tracking-tight">{name}</h1>
                {seeker.visaSponsorRequired && (
                  <span className="flex items-center gap-1.5 px-4 py-1.5 bg-amber/20 border border-amber/30 rounded-full text-amber text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="h-3.5 w-3.5" /> Needs Visa Sponsorship
                  </span>
                )}
              </div>
              <p className="text-xl text-white/80 font-medium mb-4 max-w-2xl">
                {seeker.headline ?? "Open to new opportunities"}
              </p>
              <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm font-bold">
                {seeker.city && (
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{seeker.city}</span>
                )}
                {seeker.availability && (
                  <span className="flex items-center gap-2"><Clock className="h-4 w-4" />Available: {seeker.availability}</span>
                )}
                {seeker.preferredType && (
                  <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" />{seeker.preferredType.replace("_", " ")}</span>
                )}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-5">
                {seeker.linkedinUrl && (
                  <a href={seeker.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {seeker.githubUrl && (
                  <a href={seeker.githubUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {seeker.portfolioUrl && (
                  <a href={seeker.portfolioUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* CTA for employers */}
            {isOrg && (
              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href={`/dashboard/organization/talent/${seeker.id}/outreach`}
                  className="flex items-center gap-3 px-8 py-4 bg-amber text-navy rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber/90 transition-all shadow-2xl shadow-amber/20 whitespace-nowrap"
                >
                  <Mail className="h-5 w-5" />
                  Send Interview Request
                </Link>
                {seeker.resumeUrl && (
                  <a
                    href={seeker.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all whitespace-nowrap"
                  >
                    <Download className="h-5 w-5" />
                    Download CV
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bio */}
            {seeker.bio && (
              <Card title="About" icon={<Globe className="h-5 w-5 text-teal" />}>
                <p className="text-slate-600 font-medium leading-relaxed">{seeker.bio}</p>
              </Card>
            )}

            {/* Experience */}
            {seeker.experience.length > 0 && (
              <Card title="Experience" icon={<Briefcase className="h-5 w-5 text-navy" />}>
                <div className="space-y-8">
                  {seeker.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-slate-100 hover:border-navy/40 transition-colors group">
                      <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-navy transition-colors" />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-black text-navy text-base">{exp.title}</h4>
                          <p className="text-sm font-bold text-teal mt-0.5">{exp.company}</p>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400 font-bold">
                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {new Date(exp.startDate).getFullYear()} — {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : "?"}
                            </span>
                            <span className="px-2.5 py-1 bg-slate-100 rounded-lg uppercase tracking-wider">{exp.empType}</span>
                            <span className="px-2.5 py-1 bg-slate-100 rounded-lg uppercase tracking-wider">{exp.location}</span>
                          </div>
                          {exp.responsibilities && (
                            <p className="mt-3 text-sm text-slate-500 font-medium leading-relaxed">{exp.responsibilities}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Education */}
            {seeker.education.length > 0 && (
              <Card title="Education" icon={<GraduationCap className="h-5 w-5 text-indigo-500" />}>
                <div className="space-y-6">
                  {seeker.education.map((edu) => (
                    <div key={edu.id} className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-black text-navy">{edu.degree}</h4>
                        <p className="text-sm font-bold text-slate-500 mt-0.5">{edu.institution}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 font-bold">
                          <span>Class of {edu.yearOfPassing}</span>
                          {edu.grade && <span className="px-2.5 py-1 bg-slate-100 rounded-lg">Grade: {edu.grade}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Certifications */}
            {seeker.certifications.length > 0 && (
              <Card title="Certifications" icon={<Award className="h-5 w-5 text-amber" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {seeker.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-4 p-4 bg-amber/5 border border-amber/10 rounded-2xl hover:bg-amber/10 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-amber/20 flex items-center justify-center shrink-0">
                        <Award className="h-5 w-5 text-amber" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-navy text-sm truncate">{cert.name}</p>
                        <p className="text-xs text-slate-500 font-bold">{cert.issuer} · {cert.year}</p>
                        {cert.url && (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-teal font-black uppercase tracking-widest hover:underline flex items-center gap-1 mt-0.5">
                            <ExternalLink className="h-3 w-3" /> Verify
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Skills */}
            {seeker.skills.length > 0 && (
              <Card title="Skills" icon={<Zap className="h-5 w-5 text-amber" />}>
                <div className="flex flex-wrap gap-2.5">
                  {seeker.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${proficiencyColor(skill.proficiency)}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Job Preferences */}
            <Card title="Preferences" icon={<Briefcase className="h-5 w-5 text-teal" />}>
              <div className="space-y-4">
                {[
                  { label: "Preferred Role", value: seeker.preferredRole },
                  { label: "Job Type", value: seeker.preferredType?.replace("_", " ") },
                  { label: "Location Pref.", value: seeker.preferredLocation },
                  { label: "Notice Period", value: seeker.noticePeriod },
                  { label: "Availability", value: seeker.availability },
                  { label: "Open to Relocation", value: seeker.relocatable },
                ].map(item =>
                  item.value ? (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-dashed border-slate-100 last:border-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                      <span className="text-xs font-bold text-navy">{item.value}</span>
                    </div>
                  ) : null
                )}
              </div>
            </Card>

            {/* Languages */}
            {seeker.languages.length > 0 && (
              <Card title="Languages" icon={<Languages className="h-5 w-5 text-indigo-500" />}>
                <div className="space-y-3">
                  {seeker.languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className="text-sm font-bold text-navy">{lang.name}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* CV download */}
            {seeker.resumeUrl && (
              <a
                href={seeker.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-navy text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal transition-all shadow-xl shadow-navy/20 group"
              >
                <Download className="h-5 w-5 group-hover:animate-bounce" />
                View / Download CV
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-navy/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-slate-50 flex items-center gap-4 bg-slate-50/50">
        <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-xs font-black text-navy uppercase tracking-widest">{title}</h2>
      </div>
      <div className="p-8">{children}</div>
    </div>
  )
}

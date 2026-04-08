import Link from "next/link"
import { MapPin, Clock, ShieldCheck, Zap, ArrowRight } from "lucide-react"

interface Skill {
  id: string
  name: string
  proficiency: string
}

interface TalentCardProps {
  seeker: {
    id: string
    firstName: string | null
    lastName: string | null
    headline: string | null
    city: string | null
    avatarUrl: string | null
    availability: string | null
    preferredType: string | null
    visaSponsorRequired: boolean
    skills: Skill[]
    user: { name: string | null; image: string | null }
  }
  showOutreachButton?: boolean
}

export function TalentCard({ seeker, showOutreachButton = false }: TalentCardProps) {
  const name =
    seeker.firstName && seeker.lastName
      ? `${seeker.firstName} ${seeker.lastName}`
      : seeker.user.name ?? "Anonymous"

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const topSkills = seeker.skills.slice(0, 4)

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-lg shadow-navy/5 hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="p-8 pb-6 bg-linear-to-br from-navy/5 to-teal/5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center text-lg font-black shadow-xl overflow-hidden shrink-0">
              {seeker.avatarUrl || seeker.user.image ? (
                <img
                  src={seeker.avatarUrl ?? seeker.user.image ?? ""}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div>
              <h3 className="text-base font-black text-navy leading-tight">{name}</h3>
              <p className="text-xs font-bold text-slate-500 mt-1 line-clamp-1">
                {seeker.headline ?? "Open to opportunities"}
              </p>
              {seeker.city && (
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <MapPin className="h-3 w-3" />
                  {seeker.city}
                </div>
              )}
            </div>
          </div>

          {/* Visa badge */}
          {seeker.visaSponsorRequired && (
            <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-amber/10 text-amber border border-amber/20 rounded-full text-[9px] font-black uppercase tracking-widest">
              <ShieldCheck className="h-3 w-3" />
              Visa Needed
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-8 flex-1 flex flex-col gap-6">
        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          {seeker.preferredType && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <Clock className="h-3 w-3 text-teal" />
              {seeker.preferredType.replace("_", " ")}
            </span>
          )}
          {seeker.availability && (
            <span className="px-3 py-1.5 bg-emerald/10 border border-emerald/20 rounded-xl text-[10px] font-black text-emerald uppercase tracking-widest">
              {seeker.availability}
            </span>
          )}
        </div>

        {/* Skills */}
        {topSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <span
                key={skill.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-navy/5 border border-navy/10 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest"
              >
                <Zap className="h-3 w-3 text-amber" />
                {skill.name}
              </span>
            ))}
            {seeker.skills.length > 4 && (
              <span className="px-3 py-1.5 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                +{seeker.skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex gap-3 pt-2">
          <Link
            href={`/talent/${seeker.id}`}
            className="flex-1 text-center py-3 px-6 rounded-2xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 hover:border-navy/20 hover:text-navy transition-all"
          >
            View Profile
          </Link>
          {showOutreachButton && (
            <Link
              href={`/dashboard/organization/talent/${seeker.id}/outreach`}
              className="flex-1 text-center py-3 px-6 rounded-2xl bg-navy text-white text-xs font-black uppercase tracking-widest hover:bg-teal transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/20"
            >
              Reach Out <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

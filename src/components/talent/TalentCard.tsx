
import Link from "next/link"
import { MapPin, Clock, ShieldCheck, Zap, ArrowRight, Briefcase, GraduationCap } from "lucide-react"

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
    noticePeriod: string | null
    visaSponsorRequired: boolean
    yearsOfExperience: number | null
    bio: string | null
    education: {
      degree: string
      institution: string
      yearOfPassing: number
    }[]
    skills: Skill[]
    jobPreferences: {
      preferredRole: string | null
      preferredType: string | null
      expectedSalaryMin: number | null
      expectedSalaryMax: number | null
      preferredLocation: string | null
      noticePeriod: string | null
      availability: string | null
    }[]
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

  const topSkills = seeker.skills.slice(0, 3)

  const primaryPreference = seeker.jobPreferences?.[0] || {}
  const preferredRole = primaryPreference.preferredRole
  const preferredType = primaryPreference.preferredType
  const expectedSalaryMin = primaryPreference.expectedSalaryMin
  const availability = primaryPreference.availability

  const getProficiencyStyle = (p: string) => {
    switch (p) {
      case "Expert": return "text-emerald-600 bg-emerald-50 border-emerald-100"
      case "Intermediate": return "text-amber-600 bg-amber-50 border-amber-100"
      default: return "text-slate-500 bg-slate-50 border-slate-100"
    }
  }

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-lg shadow-navy/5 hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Card Header */}
      <div className="p-8 pb-6 bg-linear-to-br from-navy/5 to-teal/5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-slate-500 text-white flex items-center justify-center text-lg font-black shadow-xl overflow-hidden shrink-0">
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
              <h3 className="text-2xl font-bold text-navy leading-tight">{name}</h3>
              <p className="text-md font-bold text-slate-400 mt-1">
                {seeker.headline || "Open to opportunities"}
              </p>
              <div className="flex items-center gap-2 mt-1.5 overflow-hidden">
                {seeker.city && (
                  <div className="flex items-center gap-1.5 text-md text-slate-400 font-semibold  whitespace-nowrap">
                    <MapPin className="h-3 w-3" />
                    {seeker.city}
                  </div>
                )}
                {expectedSalaryMin && (
                  <div className="text-md text-emerald-600 font-semibold whitespace-nowrap bg-emerald-50 px-2  rounded-md">
                    £{expectedSalaryMin / 1000}k+
                  </div>
                )}
              </div>
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
        
        {/* Bio Preview */}
        {seeker.bio && (
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed">
              {seeker.bio}
            </p>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-8 flex-1 flex flex-col gap-6">
        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          {preferredType && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-md font-semibold text-slate-600 shadow-xs">
              <Clock className="h-4 w-4 text-teal" />
              {preferredType}
            </span>
          )}
          {/* {noticePeriod && (
            <span className="px-3 py-1.5 bg-navy/5 border border-navy/10 rounded-xl text-md font-semibold text-slate-600  flex items-center gap-1.5 shadow-xs">
              <Zap className="h-4 w-4 text-amber" />
              {noticePeriod}
            </span>
          )} */}
          {availability && (
            <span className="px-3 py-1.5 bg-emerald/10 border border-emerald/20 rounded-xl text-md font-semibold text-slate-600 shadow-xs">
              {availability}
            </span>
          )}
          {seeker.yearsOfExperience !== null && (
            <span className="px-3 py-1.5 border  rounded-xl text-md font-semibold shadow-xs flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              {seeker.yearsOfExperience} {seeker.yearsOfExperience === 1 ? 'Year' : 'Years'} Exp
            </span>
          )}
          {seeker.education && seeker.education.length > 0 && (
            <span className="px-3 py-1.5 border  rounded-xl text-md font-semibold shadow-xs flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" />
              {seeker.education.sort((a, b) => b.yearOfPassing - a.yearOfPassing)[0].degree}
            </span>
          )}
        </div>

        {/* Skills */}
        {topSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="my-auto  font-bold">
              Skills : 
            </span>
            {topSkills.map((skill) => (
              <span
                key={skill.id}
                title={skill.proficiency}
                className={`px-3 py-1.5 border rounded-xl text-md font-semibold transition-all cursor-default ${getProficiencyStyle(skill.proficiency)}`}
              >
                {skill.name}
              </span>
            ))}
            {seeker.skills.length > 4 && (
              <span className="px-3 py-1.5 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-400">
                +{seeker.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto flex gap-3 pt-2">
          <Link
            href={`/talent/${seeker.id}`}
            className="flex-1 text-center py-3 px-6 rounded-2xl border border-slate-200 text-md font-semibold bg-navy text-white hover:bg-slate-50 hover:border-navy/20 hover:text-navy transition-all"
          >
            View Profile
          </Link>
          {showOutreachButton && (
            <Link
              href={`/dashboard/organization/talent/${seeker.id}/outreach`}
              className="flex-1 text-center py-3 px-6 rounded-2xl bg-navy text-white text-md font-semibold hover:bg-teal transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy/20"
            >
              Reach Out <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

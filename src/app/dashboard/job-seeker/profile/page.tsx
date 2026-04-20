import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  FileText, ArrowLeft, MapPin, Phone, Mail, 
  Briefcase, GraduationCap, Github, Linkedin, 
  Globe, User, Heart, ChevronRight, Zap, Award, Languages
} from "lucide-react"
import ProfileAvatar from "@/components/dashboard/ProfileAvatar"
import { VisibilityToggle } from "@/components/talent/VisibilityToggle"

export default async function JobSeekerProfilePage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: session.user.id },
    include: {
      experience: { orderBy: { startDate: 'desc' } },
      education: { orderBy: { yearOfPassing: 'desc' } },
      skills: true,
      languages: true,
      certifications: { orderBy: { year: 'desc' } },
      jobPreferences: true
    }
  })

  // Since we create a JobSeeker record on onboarding, this should exist.
  if (!jobSeeker) redirect("/onboarding/job-seeker")

  const fullName = `${jobSeeker.firstName} ${jobSeeker.lastName}`

  return (
    <div className="max-w-4xl w-full mx-auto pb-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/dashboard/job-seeker" className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-teal transition-all mb-4 group">
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-heading font-black text-navy tracking-tight">My Profile</h1>
          <p className="text-slate-500 font-bold mt-1">Your showcase to employers.</p>
        </div>
        <Link
          href="/dashboard/job-seeker/profile/edit"
          className="bg-linear-to-r from-navy to-teal text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-teal/20 transition-all active:scale-95 shadow-lg shadow-navy/5"
        >
          Edit Profile
        </Link>
      </div>

      {/* Visibility toggle */}
      <div className="mb-8">
        <VisibilityToggle isPublic={jobSeeker.isPublic} seekerId={jobSeeker.id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Basic Info & Contacts */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
            <ProfileAvatar 
              imageUrl={jobSeeker.avatarUrl || session.user.image || null} 
              name={fullName} 
              className="w-28 h-28 mb-6"
            />
            <h2 className="text-2xl font-black text-navy uppercase tracking-tight">{fullName}</h2>
            <p className="text-xs font-black text-teal mt-2 uppercase tracking-widest">{jobSeeker.headline || "Headline not set"}</p>
            <p className="text-[10px] font-black text-slate-400 mt-3 flex items-center gap-2 uppercase tracking-widest">
              <MapPin className="h-3 w-3 text-teal" /> {jobSeeker.city || "Location unknown"}
            </p>
            {jobSeeker.yearsOfExperience !== null && (
              <p className="text-[10px] font-black text-slate-400 mt-2 flex items-center gap-2 uppercase tracking-widest">
                <Briefcase className="h-3 w-3 text-teal" /> {jobSeeker.yearsOfExperience} {jobSeeker.yearsOfExperience === 1 ? 'Year' : 'Years'} Experience
              </p>
            )}

            <div className="w-full border-t border-slate-100 mt-6 pt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <span className="truncate">{session.user.email}</span>
              </div>
              {jobSeeker.phone && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{jobSeeker.phone}</span>
                </div>
              )}
              {jobSeeker.linkedinUrl && (
                <div className="flex items-center gap-3 text-sm text-[#09567a]">
                  <Linkedin className="h-4 w-4 shrink-0" />
                  <a href={`https://${jobSeeker.linkedinUrl}`} className="hover:underline truncate">{jobSeeker.linkedinUrl}</a>
                </div>
              )}
              {jobSeeker.githubUrl && (
                <div className="flex items-center gap-3 text-sm text-[#09567a]">
                  <Github className="h-4 w-4 shrink-0" />
                  <a href={`https://${jobSeeker.githubUrl}`} className="hover:underline truncate">{jobSeeker.githubUrl}</a>
                </div>
              )}
            </div>
          </div>

          {jobSeeker.jobPreferences.length > 0 ? (
            <div className="space-y-6">
              {jobSeeker.jobPreferences.map((pref, idx) => (
                <div key={pref.id} className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-slate-100 p-8">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-3">Preference Set {jobSeeker.jobPreferences.length > 1 ? `#${idx + 1}` : ''}</h3>
                  <div className="space-y-4 text-sm overflow-x-auto">
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Role</span>
                      <span className="font-black text-navy text-right shrink-0 ml-4 ">{pref.preferredRole || "Any"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Type</span>
                      <span className="font-black text-navy text-right shrink-0 ml-4">{pref.preferredType || "Any"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Notice</span>
                      <span className="font-black text-navy text-right shrink-0 ml-4">{pref.noticePeriod || "Immediate"}</span>
                    </div>
                    {pref.expectedSalaryMin && (
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Expected Salary</span>
                        <span className="font-black text-emerald-600 text-right shrink-0 ml-4">£{pref.expectedSalaryMin.toLocaleString()}+</span>
                      </div>
                    )}
                    {pref.preferredLocation && (
                      <div className="flex flex-col gap-2 py-3 border-b border-slate-50">
                        <span className="text-slate-500 font-bold text-[10px] uppercase tracking-wider">Preferred Locations</span>
                        <div className="flex flex-wrap justify-end gap-1.5">
                          {pref.preferredLocation.split(',').map((loc: string, lIdx: number) => (
                            <span key={lIdx} className="px-2 py-0.5 bg-teal/5 text-teal border border-teal/10 rounded-md text-[10px] font-black uppercase tracking-tight">
                              {loc.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-slate-100 p-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Job Preferences</h3>
              <p className="text-xs text-slate-400 italic">No preferences set yet.</p>
            </div>
          )}

          {/* SKILLS */}
          <div className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-slate-100 p-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-3">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {jobSeeker.skills.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No skills added yet.</p>
              ) : (
                jobSeeker.skills.map(skill => (
                  <div key={skill.id} className="flex flex-col gap-1">
                    <span className="px-3 py-1.5 bg-navy/5 border border-navy/10 rounded-xl text-[10px] font-black text-navy uppercase tracking-widest flex items-center gap-1.5">
                      <Zap className="h-3 w-3 text-amber" />
                      {skill.name}
                    </span>
                    <span className={`text-[8px] font-black uppercase tracking-tighter text-center rounded-md px-1 py-0.5 ${
                      skill.proficiency === 'Expert' ? 'text-emerald-600 bg-emerald-50' :
                      skill.proficiency === 'Intermediate' ? 'text-amber-600 bg-amber-50' :
                      'text-slate-500 bg-slate-50'
                    }`}>
                      {skill.proficiency}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* LANGUAGES */}
          {jobSeeker.languages.length > 0 && (
            <div className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-slate-100 p-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-3">Languages</h3>
              <div className="space-y-4">
                {jobSeeker.languages.map(lang => (
                  <div key={lang.id} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 pb-0">
                    <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">{lang.name}</span>
                    <span className="font-black text-navy text-xs uppercase tracking-widest">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Exp, Edu, Bios */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-bold text-[#09567a] mb-4 border-b border-slate-100 pb-3">About</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {jobSeeker.bio || "No summary provided."}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-bold text-[#09567a] mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#147f8a]" /> Experience
            </h3>
            {jobSeeker.experience.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No work experience added yet.</p>
            ) : (
              <div className="space-y-6">
                {jobSeeker.experience.map((exp: any) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200 last:border-transparent">
                    <div className="absolute w-3 h-3 bg-white border-2 border-[#147f8a] rounded-full -left-[7px] top-1"></div>
                    <h4 className="font-bold text-slate-800">{exp.title}</h4>
                    <p className="text-sm font-medium text-[#147f8a]">{exp.company}</p>
                    <p className="text-xs text-slate-500 mt-1 mb-2">
                      {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'})} - 
                      {exp.isCurrent ? " Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'}) : " N/A"}
                      <span className="mx-2">•</span>{exp.location}
                    </p>
                    {exp.responsibilities && (
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.responsibilities}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-bold text-[#09567a] mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#147f8a]" /> Education
            </h3>
            {jobSeeker.education.length === 0 ? (
              <p className="text-sm text-slate-500 italic">No education added yet.</p>
            ) : (
              <div className="space-y-6">
                {jobSeeker.education.map((edu: any) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                    <p className="text-sm font-medium text-[#147f8a]">{edu.institution}</p>
                    <p className="text-xs text-slate-500 mt-1">Class of {edu.yearOfPassing} {edu.grade ? `• ${edu.grade}` : ''}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CERTIFICATIONS */}
          {jobSeeker.certifications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-lg font-bold text-[#09567a] mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-[#147f8a]" /> Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobSeeker.certifications.map((cert: any) => (
                  <div key={cert.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-sm">{cert.name}</h4>
                    <p className="text-xs text-[#147f8a] mt-0.5">{cert.issuer}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  FileText, ArrowLeft, MapPin, Phone, Mail, 
  Briefcase, GraduationCap, Github, Linkedin, 
  Globe, User, Heart, ChevronRight
} from "lucide-react"
import ProfileAvatar from "@/components/dashboard/ProfileAvatar"

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
      certifications: { orderBy: { year: 'desc' } }
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
          <p className="text-slate-500 font-bold mt-1">Your showcase to UK employers.</p>
        </div>
        <Link
          href="/dashboard/job-seeker/profile/edit"
          className="bg-linear-to-r from-navy to-teal text-white text-xs font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-teal/20 transition-all active:scale-95 shadow-lg shadow-navy/5"
        >
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Basic Info & Contacts */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center">
            <ProfileAvatar 
              imageUrl={session.user.image} 
              name={fullName} 
              className="w-28 h-28 mb-6"
            />
            <h2 className="text-2xl font-black text-navy uppercase tracking-tight">{fullName}</h2>
            <p className="text-xs font-black text-teal mt-2 uppercase tracking-widest">{jobSeeker.headline || "Headline not set"}</p>
            <p className="text-[10px] font-black text-slate-400 mt-3 flex items-center gap-2 uppercase tracking-widest">
              <MapPin className="h-3 w-3 text-teal" /> {jobSeeker.city || "Location unknown"}
            </p>

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

          <div className="bg-white rounded-3xl shadow-xl shadow-navy/5 border border-slate-100 p-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-3">Job Preferences</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Role</span>
                <span className="font-medium text-slate-800">{jobSeeker.preferredRole || "Any"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type</span>
                <span className="font-medium text-slate-800">{jobSeeker.preferredType || "Any"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Notice</span>
                <span className="font-medium text-slate-800">{jobSeeker.noticePeriod || "Not specified"}</span>
              </div>
            </div>
          </div>
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

        </div>
      </div>
    </div>
  )
}

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileForm from "@/components/dashboard/ProfileForm"
import { Building2, Info, CheckCircle2, MapPin } from "lucide-react"

export const metadata = {
  title: "Company Profile | SponsorPath",
  description: "Manage your organization details and public presence.",
}

export default async function OrgProfilePage() {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect("/login")
  }
  
  const organization = await prisma.organization.findUnique({
    where: { userId: session.user.id }
  })

  if (!organization) {
    redirect("/dashboard/organization")
  }

  // Calculate profile completeness
  const fields = [
    organization.companyName,
    organization.industry,
    organization.website,
    organization.description,
    organization.location,
    organization.contactEmail,
    organization.logoUrl,
  ];
  const completedFields = fields.filter(f => f && f.length > 0).length;
  const completeness = Math.round((completedFields / fields.length) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black font-heading text-navy uppercase tracking-tight">Company Profile</h1>
          <p className="text-slate-500 mt-2 font-medium">
            Manage how your company appears to prospective candidates.
          </p>
        </div>
        
        <div className="bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-xl shadow-navy/5 flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Profile Strength</span>
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${completeness === 100 ? 'bg-emerald-500' : 'bg-amber'}`}
                  style={{ width: `${completeness}%` }}
                />
              </div>
              <span className="text-sm font-black text-navy">{completeness}%</span>
            </div>
          </div>
          {completeness === 100 && (
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-2xl shadow-navy/5 border border-slate-100 p-10 md:p-14">
          <ProfileForm initialData={organization} />
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-navy text-white rounded-3xl p-8 shadow-xl shadow-navy/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Info className="h-6 w-6 text-amber" />
              </div>
              <h3 className="text-lg font-black font-heading mb-4 leading-tight">Why a complete profile matters?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-amber rounded-full mt-1.5 shrink-0" />
                  <p className="text-sm text-white/70 font-medium">Companies with detailed descriptions receive <span className="text-white font-bold">40% more</span> applications.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-amber rounded-full mt-1.5 shrink-0" />
                  <p className="text-sm text-white/70 font-medium">A professional logo builds <span className="text-white font-bold">trust</span> with international candidates.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-amber rounded-full mt-1.5 shrink-0" />
                  <p className="text-sm text-white/70 font-medium">Contact emails help streamline questions about <span className="text-white font-bold">sponsorship</span>.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-6">Quick Tips</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-navy uppercase tracking-widest mb-1">Website</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Ensure your website is reachable as candidates will check it for legitimacy.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin  className="h-5 w-5 text-teal" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-navy uppercase tracking-widest mb-1">Location</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Specify a city if your role isn't remote. candidates care about cost of living.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

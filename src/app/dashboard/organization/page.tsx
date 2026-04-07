import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { PlusCircle, Search, Edit2, Eye } from "lucide-react"
import { DeleteJobButton } from "@/components/dashboard/DeleteJobButton"

export default async function OrganizationDashboard() {
  const session = await auth()
  
  const organization = await prisma.organization.findUnique({
    where: { userId: session!.user.id }
  })

  if (!organization) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold font-heading text-navy">Profile Incomplete</h2>
        <p className="text-slate-500 mt-2 mb-6">You need to setup your organization profile before posting jobs.</p>
        <Link 
          href="/onboarding/organization"
          className="bg-amber text-navy font-bold px-6 py-3 rounded-xl hover:bg-amber/90 transition-colors"
        >
          Setup Profile
        </Link>
      </div>
    )
  }

  const jobs = await prisma.jobPost.findMany({
    where: { orgId: organization.id },
    orderBy: { createdAt: "desc" }
  })

  const activeJobs = jobs.filter(j => j.isActive).length
  const expiredJobs = jobs.filter(j => !j.isActive).length

  return (
    <div className="w-full">
      <div className="flex justify-between items-start mb-8 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-navy text-white rounded-3xl flex items-center justify-center text-2xl font-black shadow-xl shadow-navy/10 overflow-hidden shrink-0 border border-slate-100">
            {organization.logoUrl ? (
              <img 
                src={organization.logoUrl} 
                alt={organization.companyName} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'w-full h-full flex items-center justify-center bg-navy text-white text-2xl font-black font-heading';
                    fallback.innerText = organization.companyName.substring(0, 2).toUpperCase();
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              organization.companyName.substring(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-4xl font-heading font-black text-navy tracking-tight leading-tight">Overview</h1>
            <p className="text-slate-500 font-bold mt-1">
              Welcome back, <span className="text-teal">{organization.companyName}</span>
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/organization/jobs/create"
          className="flex items-center gap-2 bg-amber text-navy font-bold px-5 py-2.5 rounded-xl border border-transparent shadow-sm hover:bg-amber/90 hover:shadow transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          Post New Job
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 font-medium">Active Listings</h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md">Live</span>
          </div>
          <div className="text-4xl font-heading font-bold text-navy">{activeJobs}</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 font-medium">Expired Listings</h3>
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded-md">Draft</span>
          </div>
          <div className="text-4xl font-heading font-bold text-navy">{expiredJobs}</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-500 font-medium">Sponsorship Status</h3>
          </div>
          <div className="text-xl font-heading font-bold text-navy truncate">
            {organization.sponsorStatus}
          </div>
          <Link href="/dashboard/organization/settings" className="text-sm text-amber font-semibold mt-2 inline-block hover:underline">
            Manage Status →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold font-heading text-navy">Recent Job Postings</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search jobs..."
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-6 text-sm font-semibold text-slate-500">Job Title</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500">Status</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500">Posted On</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500">Salary Range</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 px-6 text-center text-slate-500">
                    No jobs posted yet. <Link href="/dashboard/organization/jobs/create" className="text-amber font-semibold hover:underline">Create your first listing.</Link>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-navy">{job.title}</div>
                      <div className="text-sm text-slate-500">{job.visaSponsorBadge}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        job.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                      }`}>
                        {job.isActive ? "Active" : "Closed"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">
                      {job.minSalary && job.maxSalary ? `£${job.minSalary.toLocaleString()} - £${job.maxSalary.toLocaleString()}` : "Not specified"}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="p-2 text-slate-400 hover:text-navy transition-colors" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link href={`/dashboard/organization/jobs/${job.id}/edit`} className="inline-block p-2 text-slate-400 hover:text-amber transition-colors" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <DeleteJobButton id={job.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

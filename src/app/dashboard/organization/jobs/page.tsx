import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { PlusCircle, Search, Edit2, Eye } from "lucide-react"
import { DeleteJobButton } from "@/components/dashboard/DeleteJobButton"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Manage Jobs | SponsorPath",
}

export default async function ManageJobsPage() {
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

  const jobs = await prisma.jobPost.findMany({
    where: { orgId: organization.id },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-navy">Manage Jobs</h1>
          <p className="text-slate-500 mt-1">
            View and manage all your job listings.
          </p>
        </div>
        <Link
          href="/dashboard/organization/jobs/create"
          className="flex items-center gap-2 bg-amber text-navy font-bold px-5 py-2.5 rounded-xl border border-transparent shadow-sm hover:bg-amber/90 hover:shadow transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          Post New Job
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold font-heading text-navy">All Job Postings</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search jobs..."
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber w-64"
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
                  <td colSpan={5} className="py-12 px-6 text-center text-slate-500 font-medium">
                    No jobs posted yet. <Link href="/dashboard/organization/jobs/create" className="text-amber font-semibold hover:underline">Create your first listing.</Link>
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-navy">{job.title}</div>
                      <div className="text-sm font-medium text-slate-500">{job.visaSponsorBadge}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        job.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                      }`}>
                        {job.isActive ? "Active" : "Closed"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-slate-600">
                      {job.minSalary && job.maxSalary ? `£${job.minSalary.toLocaleString()} - £${job.maxSalary.toLocaleString()}` : "Not specified"}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link href={`/jobs/${job.id}`} className="inline-block p-2 text-slate-400 hover:text-navy transition-colors" title="View Public Page">
                        <Eye className="h-4 w-4" />
                      </Link>
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

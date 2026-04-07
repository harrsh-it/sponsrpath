"use client"

import { useState } from "react"
import { createJobAction } from "@/actions/jobs"
import { SalarySlider } from "@/components/ui/SalarySlider"
import { VisaBadge, SponsorStatus } from "@/components/ui/VisaBadge"
import { ArrowLeft, Briefcase, Banknote, ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function CreateJobPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [salaryRange, setSalaryRange] = useState<[number, number]>([35000, 80000])
  const [sponsorBadge, setSponsorBadge] = useState<SponsorStatus>("No Sponsorship Data")

  const badgeOptions: SponsorStatus[] = [
    "Active Sponsor (Verified)",
    "Active Sponsor (Register Match)",
    "Potential Sponsor (Post 12 Months)",
    "No Sponsorship Data",
    "Confirmed Non-Sponsor"
  ]

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append("minSalary", salaryRange[0].toString())
    formData.append("maxSalary", salaryRange[1].toString())
    formData.append("visaSponsorBadge", sponsorBadge)

    const result = await createJobAction(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/organization" className="flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-navy transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-heading font-bold text-navy">Post a New Job</h1>
        <p className="text-slate-500 mt-1">
          Create a clear, transparent listing to attract top global talent.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Basic Info Section */}
        <div className="p-8 border-b border-slate-100">
          <div className="mb-6 hidden">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-100"><Briefcase className="h-5 w-5 text-slate-500" /></div>
            <h2 className="text-lg font-bold text-navy">Role Details</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 text-center">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="title">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber focus:bg-white transition-colors text-lg"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="description">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                required
                rows={8}
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber focus:bg-white transition-colors"
                placeholder="Describe the responsibilities, requirements, and benefits..."
              />
            </div>
          </div>
        </div>

        {/* Salary Section */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <Banknote className="h-5 w-5 text-emerald-500" />
                Compensation Range
              </h2>
              <p className="text-sm text-slate-500 mt-1">Providing a salary range helps attract 40% more qualified applicants.</p>
            </div>
          </div>

          <div className="mt-8 mb-4 max-w-xl mx-auto">
            <SalarySlider 
              min={20000} 
              max={200000} 
              step={1000} 
              value={salaryRange} 
              onValueChange={(val) => setSalaryRange(val as [number, number])} 
            />
          </div>
        </div>

        {/* Visa Sponsorship Section */}
        <div className="p-8 pb-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-amber" />
                Visa Sponsorship Status
              </h2>
              <p className="text-sm text-slate-500 mt-1">Select the most accurate representation of this role's visa status.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badgeOptions.map((status) => (
              <label 
                key={status} 
                className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                  sponsorBadge === status 
                    ? "border-amber bg-amber/5 ring-1 ring-amber" 
                    : "border-slate-200 hover:border-amber/40 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="sponsorBadgeSelection" 
                    value={status}
                    checked={sponsorBadge === status}
                    onChange={() => setSponsorBadge(status as SponsorStatus)}
                    className="h-4 w-4 text-amber border-slate-300 focus:ring-amber shrink-0"
                  />
                  <div className="-mt-1">
                    <VisaBadge status={status} />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <Link 
            href="/dashboard/organization"
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-white hover:text-navy transition-colors bg-white shadow-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 rounded-xl font-bold text-navy bg-amber hover:bg-amber/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber shadow-sm transition-all disabled:opacity-70"
          >
            {loading ? "Publishing..." : "Publish Job Post"}
          </button>
        </div>
      </form>
    </div>
  )
}

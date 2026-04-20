"use client"

import { useState } from "react"
import { completeOrganizationOnboarding } from "@/actions/onboarding"
import { Building2, ArrowRight, Globe, Building } from "lucide-react"
import { Logo } from "@/components/ui/Logo"

export default function OrganizationOnboardingPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    
    const result = await completeOrganizationOnboarding(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }



  return (
    <div className="min-h-screen bg-black/15 flex flex-col items-center justify-center p-6 py-6">
      <div className="mb-6">
        <Logo size="lg" variant="dark" />
      </div>
      <div className="w-full max-w-2xl bg-white rounded-3xl  overflow-hidden  my-auto">
        <div className="bg-navy p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-amber/10 rounded-2xl flex items-center justify-center mb-6 text-amber border border-amber/30 shadow-xl backdrop-blur-sm">
              <Building2 className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-black text-navy font-heading mb-3">Setup Employer Profile</h1>
            <p className="text-navy max-w-md font-medium leading-relaxed">
              Complete your company details to start posting jobs and connecting with international talent.
            </p>
          </div>
        </div>

        <div className="p-12">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-semibold border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3" htmlFor="companyName">
                  Company Name <span className="text-amber">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-slate-900" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    required
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3" htmlFor="industry">
                  Industry
                </label>
                <select
                  name="industry"
                  id="industry"
                  className="block w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl   text-black   cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium appearance-none"
                >
                  <option value="">Select Industry... </option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3" htmlFor="website">
                  Website URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-slate-900" />
                  </div>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3" htmlFor="companySize">
                  Company Size
                </label>
                <select
                  name="companySize"
                  id="companySize"
                  className="block w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium appearance-none"
                >
                  <option value="">Select Company Size...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
            </div>



            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-3 py-4 px-6 border border-transparent rounded-2xl shadow-xl shadow-amber/20 text-sm font-semibold text-white bg-amber hover:bg-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                {loading ? "Saving Profile..." : "Go to Dashboard"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

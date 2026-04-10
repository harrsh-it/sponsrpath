"use client"

import { useState } from "react"
import { completeOrganizationOnboarding } from "@/actions/onboarding"
import { Building2, ArrowRight, ImagePlus, Globe, Building } from "lucide-react"

export default function OrganizationOnboardingPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    
    // In a real app, upload the file to S3/Blob and get the URL. We are mocking this for MVP.
    if (fileName) {
      // For now, we set null to let the initials-based fallback handle it in the UI
      // since we don't have a real persistent upload storage in this local environment.
      formData.set("logoUrl", "") 
      formData.delete("file") 
    }

    const result = await completeOrganizationOnboarding(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="min-h-screen bg-black/15 flex flex-col items-center justify-center p-6 py-6">
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

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Company Logo
              </label>
              <div className="mt-1 flex justify-center px-8 pt-8 pb-10 border-2 border-slate-100 border-dashed rounded-3xl hover:bg-amber/5 hover:border-amber transition-all cursor-pointer group relative">
                <input
                  type="file"
                  name="file"
                  id="logoUpload"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="space-y-4 text-center">
                   <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-amber group-hover:text-white transition-all shadow-sm">
                    <ImagePlus className="h-8 w-8" />
                  </div>
                  <div className="flex text-sm text-slate-600 justify-center">
                    <span className="font-semibold text-amber uppercase tracking-widest text-xs">Upload a logo</span>
                    <p className="pl-1 font-semibold text-xs uppercase tracking-widest text-slate-400">or drag and drop</p>
                  </div>
                   <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                    PNG, JPG up to 2MB
                  </p>
                  {fileName && (
                    <div className="mt-6 py-3 px-6 bg-amber/10 text-amber font-semibold rounded-2xl text-xs truncate max-w-xs mx-auto border border-amber/20 shadow-sm animate-in fade-in zoom-in duration-300">
                      ✓ {fileName}
                    </div>
                  )}
                </div>
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

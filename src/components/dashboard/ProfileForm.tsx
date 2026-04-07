"use client"

import { useState } from "react"
import { updateOrganizationProfile } from "@/actions/onboarding"
import { Building2, Globe, MapPin, Mail, AlignLeft, Save, CheckCircle2, AlertCircle, ImagePlus } from "lucide-react"

interface ProfileFormProps {
  initialData: {
    companyName: string
    industry: string | null
    website: string | null
    description: string | null
    location: string | null
    contactEmail: string | null
    logoUrl: string | null
  }
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(event.currentTarget)
    
    // Simulating file name if changed
    if (fileName) {
      formData.set("logoUrl", "") // We let the initials fallback handle it for now
    }

    const result = await updateOrganizationProfile(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Clear success after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-sm font-semibold border border-rose-100 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-semibold border border-emerald-100 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h3 className="text-sm font-black text-navy uppercase tracking-widest border-b border-slate-100 pb-2">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="companyName">
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  defaultValue={initialData.companyName}
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="industry">
                Industry
              </label>
              <select
                name="industry"
                id="industry"
                defaultValue={initialData.industry || ""}
                className="block w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium appearance-none"
              >
                <option value="">Select Industry...</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Engineering">Engineering</option>
                <option value="Consumer Goods">Consumer Goods</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h3 className="text-sm font-black text-navy uppercase tracking-widest border-b border-slate-100 pb-2">Contact & Presence</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="website">
                Website URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="url"
                  name="website"
                  id="website"
                  defaultValue={initialData.website || ""}
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="contactEmail">
                Contact Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  defaultValue={initialData.contactEmail || ""}
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium"
                  placeholder="hiring@company.com"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="location">
                Headquarters Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  defaultValue={initialData.location || ""}
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium"
                  placeholder="London, UK"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Company */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h3 className="text-sm font-black text-navy uppercase tracking-widest border-b border-slate-100 pb-2">About the Company</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="description">
              Company Description
            </label>
            <div className="relative">
              <div className="absolute top-4 left-4 pointer-events-none">
                <AlignLeft className="h-5 w-5 text-slate-300" />
              </div>
              <textarea
                name="description"
                id="description"
                rows={6}
                defaultValue={initialData.description || ""}
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-navy focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber focus:bg-white transition-all font-medium resize-none"
                placeholder="Tell candidates about your company mission, culture, and what it's like to work there..."
              />
            </div>
          </div>
        </div>

        {/* Branding (Mini) */}
        <div className="col-span-1 md:col-span-2 space-y-6">
           <h3 className="text-sm font-black text-navy uppercase tracking-widest border-b border-slate-100 pb-2">Branding</h3>
           
           <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden group">
              <div className="w-20 h-20 rounded-2xl bg-navy text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xl shadow-navy/10 relative overflow-hidden">
                {initialData.logoUrl && !logoError ? (
                  <img 
                    src={initialData.logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-cover" 
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  initialData.companyName.substring(0, 2).toUpperCase()
                )}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <ImagePlus className="h-6 w-6 text-white" />
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Company Logo</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Click the avatar to update your logo. Recommended size: 400x400px.
                </p>
                {fileName && (
                  <p className="text-[10px] font-black text-amber uppercase tracking-widest mt-2 flex items-center gap-1.5 animate-in slide-in-from-left-2 duration-300">
                    <CheckCircle2 className="h-3 w-3" /> New file selected
                  </p>
                )}
              </div>
           </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-navy text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-teal transition-all shadow-xl shadow-navy/10 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
        >
          {loading ? "Saving Changes..." : "Save Profile"}
          {!loading && <Save className="h-4 w-4" />}
        </button>
      </div>
    </form>
  )
}

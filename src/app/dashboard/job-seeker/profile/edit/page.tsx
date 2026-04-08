"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, Upload, Plus, Trash2, Save, BadgeCheck, 
  MapPin, Briefcase, FileText, Globe, GraduationCap, 
  Languages, User, Settings2
} from "lucide-react"

export default function EditProfilePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Use a massive state object to hold all sections
  const [formData, setFormData] = useState<any>({
    firstName: "", lastName: "", headline: "", phone: "", city: "", relocatable: "No",
    bio: "",
    avatarUrl: "",
    skills: [], // { name, proficiency }
    experience: [], // { title, company, startDate, endDate, isCurrent, empType, location, responsibilities }
    education: [], // { degree, institution, yearOfPassing, grade }
    certifications: [], // { name, issuer, year, url }
    resumeUrl: "", portfolioUrl: "", githubUrl: "", linkedinUrl: "",
    preferredRole: "", preferredType: "", expectedSalaryMin: "", expectedSalaryMax: "", preferredLocation: "", noticePeriod: "", availability: "",
    languages: [], // { name, proficiency }
    gender: "", dob: "", differentlyAbled: "", veteranStatus: ""
  })

  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarError, setAvatarError] = useState<string | null>(null)

  // We could fetch existing data here in a real app, but for now we start blank or assume it's loaded
  
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: string, defaultObj: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], defaultObj] }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index)
    }))
  }

  const updateArrayItem = (field: string, index: number, key: string, value: any) => {
    const updated = [...formData[field]]
    updated[index][key] = value
    setFormData((prev: any) => ({ ...prev, [field]: updated }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Import action here to avoid client boundary issues with large bundles if needed
      const { updateJobSeekerProfile } = await import("@/actions/profile-actions")
      const result = await updateJobSeekerProfile(formData)
      
      if (result.success) {
        router.push("/dashboard/job-seeker/profile")
      } else {
        alert(result.error)
      }
    } catch (error) {
      alert("Failed to save profile")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl w-full mx-auto pb-20">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/dashboard/job-seeker/profile" className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-teal transition-all mb-4 group">
            <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" /> Back to Profile
          </Link>
          <h1 className="text-4xl font-heading font-black text-navy tracking-tight">Refine your profile</h1>
          <p className="text-slate-500 font-bold mt-1">Fill in all sections to boost your visibility to recruiters</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 font-semibold text-sm flex items-center gap-2">
          <BadgeCheck className="h-5 w-5" /> Profile strength
          <span className="bg-white px-2 py-0.5 rounded-md text-emerald-800 tabular-nums">10%</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: BASIC INFO */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">1</span> 
              Basic information
            </h2>
            <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-lg uppercase tracking-widest border border-rose-100">Required</span>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex gap-6 items-center border-b border-slate-100 pb-6">
              {/* Avatar preview */}
              <label className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden cursor-pointer hover:border-teal transition-colors relative group">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-slate-400" />
                )}
                <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={avatarUploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setAvatarUploading(true)
                    setAvatarError(null)
                    const fd = new FormData()
                    fd.append("file", file)
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: fd })
                      const data = await res.json()
                      if (res.ok && data.url) {
                        handleInputChange("avatarUrl", data.url)
                      } else {
                        setAvatarError(data.error || "Upload failed")
                      }
                    } catch {
                      setAvatarError("Upload failed")
                    } finally {
                      setAvatarUploading(false)
                    }
                  }}
                />
              </label>
              <div>
                <p className="font-semibold text-slate-700 mb-1">Profile photo</p>
                <p className="text-xs text-slate-400 mt-1">Click to upload · JPG, PNG, max 5 MB</p>
                {avatarUploading && <p className="text-xs text-teal font-bold mt-1">Uploading…</p>}
                {avatarError && <p className="text-xs text-rose-500 font-bold mt-1">{avatarError}</p>}
                {formData.avatarUrl && !avatarUploading && (
                  <p className="text-xs text-emerald-600 font-bold mt-1">✓ Photo uploaded – save to confirm</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First name *</label>
                <input required type="text" value={formData.firstName} onChange={e => handleInputChange("firstName", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#147f8a]/50 focus:border-[#147f8a] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last name *</label>
                <input required type="text" value={formData.lastName} onChange={e => handleInputChange("lastName", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#147f8a]/50 focus:border-[#147f8a] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Professional headline *</label>
              <input required placeholder="e.g. Full-stack Developer · 4 yrs exp" type="text" value={formData.headline} onChange={e => handleInputChange("headline", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#147f8a]/50 flex-1 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone number *</label>
                <input required type="tel" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#147f8a]/50 transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">City / Location *</label>
                <input required placeholder="e.g. Ludhiana, Punjab" type="text" value={formData.city} onChange={e => handleInputChange("city", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all text-sm font-bold text-navy" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Open to relocation?</label>
              <select value={formData.relocatable} onChange={e => handleInputChange("relocatable", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#147f8a]/50 transition-all">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Remote only">Remote only</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 2: SUMMARY */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#09567a] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#147f8a]/10 text-[#147f8a] text-sm">2</span> 
              Professional summary
            </h2>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Recommended</span>
          </div>
          <div className="p-8">
            <textarea 
              rows={4} 
              placeholder="Write a short summary about your expertise, career goals and what makes you stand out…" 
              value={formData.bio} 
              onChange={e => handleInputChange("bio", e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#147f8a]/50 resize-y transition-all"
            />
          </div>
        </section>

        {/* SECTION 4: WORK EXPERIENCE */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#09567a] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#147f8a]/10 text-[#147f8a] text-sm">4</span> 
              Work experience
            </h2>
          </div>
          <div className="p-8 space-y-6">
            {formData.experience.map((exp: any, i: number) => (
              <div key={i} className="p-6 border border-slate-200 rounded-xl relative bg-slate-50/30">
                <button type="button" onClick={() => removeArrayItem("experience", i)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500">
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4 pr-10">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Job title *</label>
                    <input required type="text" value={exp.title} onChange={e => updateArrayItem("experience", i, "title", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company name *</label>
                    <input required type="text" value={exp.company} onChange={e => updateArrayItem("experience", i, "company", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date *</label>
                    <input required type="month" value={exp.startDate} onChange={e => updateArrayItem("experience", i, "startDate", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                    <div className="flex gap-3 items-center">
                      <input type="month" disabled={exp.isCurrent} value={exp.endDate} onChange={e => updateArrayItem("experience", i, "endDate", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white disabled:opacity-50" />
                      <label className="flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap">
                        <input type="checkbox" checked={exp.isCurrent} onChange={e => updateArrayItem("experience", i, "isCurrent", e.target.checked)} className="rounded text-[#147f8a] focus:ring-[#147f8a]" />
                        Current
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                    <select value={exp.empType} onChange={e => updateArrayItem("experience", i, "empType", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location / Mode</label>
                    <select value={exp.location} onChange={e => updateArrayItem("experience", i, "location", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white">
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Key responsibilities</label>
                <textarea rows={3} value={exp.responsibilities} onChange={e => updateArrayItem("experience", i, "responsibilities", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" placeholder="Describe your role and impact..." />
              </div>
            ))}
            
            <button type="button" onClick={() => addArrayItem("experience", { title: "", company: "", startDate: "", endDate: "", isCurrent: false, empType: "Full-time", location: "On-site", responsibilities: "" })} className="flex items-center gap-2 text-[#147f8a] font-bold hover:text-[#09567a] transition-colors">
              <Plus className="h-5 w-5" /> Add another experience
            </button>
          </div>
        </section>

        {/* SECTION 5: EDUCATION */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#09567a] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#147f8a]/10 text-[#147f8a] text-sm">5</span> 
              Education
            </h2>
          </div>
          <div className="p-8 space-y-4">
            {formData.education.map((edu: any, i: number) => (
              <div key={i} className="flex gap-4 items-start">
                <input required placeholder="Degree / qualification" type="text" value={edu.degree} onChange={e => updateArrayItem("education", i, "degree", e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                <input required placeholder="Institution name" type="text" value={edu.institution} onChange={e => updateArrayItem("education", i, "institution", e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                <input required placeholder="Year" type="number" min="1980" max="2030" value={edu.yearOfPassing} onChange={e => updateArrayItem("education", i, "yearOfPassing", e.target.value)} className="w-24 px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                <input placeholder="Grade/CGPA" type="text" value={edu.grade} onChange={e => updateArrayItem("education", i, "grade", e.target.value)} className="w-32 px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                <button type="button" onClick={() => removeArrayItem("education", i)} className="p-2 text-slate-400 hover:text-red-500 mt-1"><Trash2 className="h-5 w-5" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("education", { degree: "", institution: "", yearOfPassing: 2020, grade: "" })} className="flex items-center gap-2 text-[#147f8a] font-bold hover:text-[#09567a] transition-colors mt-2">
              <Plus className="h-5 w-5" /> Add education
            </button>
          </div>
        </section>

        {/* SECTION 7: RESUME & PORTFOLIO */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#09567a] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#147f8a]/10 text-[#147f8a] text-sm">7</span> 
              Portfolio & Links
            </h2>
          </div>
          <div className="p-8 space-y-6">
            {/* <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col items-center justify-center">
              <div className="h-12 w-12 bg-[#147f8a]/10 text-[#147f8a] rounded-full flex items-center justify-center mb-3">
                <FileText className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-700">Drop PDF here or click to upload</p>
              <p className="text-sm text-slate-400 mt-1">Max 5 MB. Make sure it highlights your skills.</p>
              
              <input type="text" placeholder="Or enter resume link temporarily" value={formData.resumeUrl} onChange={e => handleInputChange("resumeUrl", e.target.value)} className="mt-4 w-full max-w-sm px-3 py-2 text-sm rounded-lg border border-slate-200" />
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio website</label>
                <input placeholder="https://" type="url" value={formData.portfolioUrl} onChange={e => handleInputChange("portfolioUrl", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">GitHub / Dribbble</label>
                <input placeholder="github.com/" type="text" value={formData.githubUrl} onChange={e => handleInputChange("githubUrl", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn profile</label>
                <input placeholder="linkedin.com/in/" type="text" value={formData.linkedinUrl} onChange={e => handleInputChange("linkedinUrl", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: PREFERENCES */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#09567a] flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#147f8a]/10 text-[#147f8a] text-sm">8</span> 
              Job preferences
            </h2>
          </div>
          <div className="p-8 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred job role</label>
              <input type="text" value={formData.preferredRole} onChange={e => handleInputChange("preferredRole", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preferred job type</label>
              <select value={formData.preferredType} onChange={e => handleInputChange("preferredType", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white">
                <option value="">Any</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Expected salary min (£)</label>
              <input type="number" value={formData.expectedSalaryMin} onChange={e => handleInputChange("expectedSalaryMin", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Notice period</label>
              <select value={formData.noticePeriod} onChange={e => handleInputChange("noticePeriod", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white">
                <option value="">Select option...</option>
                <option value="Immediate">Immediate</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
              </select>
            </div>
          </div>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
          <Link href="/dashboard/job-seeker/profile" className="px-6 py-3 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-linear-to-r from-navy to-teal text-white font-black text-xs uppercase tracking-widest px-10 py-4 rounded-2xl hover:shadow-xl hover:shadow-teal/20 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-navy/5"
          >
            {isSubmitting ? "Saving..." : <><Save className="h-4 w-4" /> Save & publish</>}
          </button>
        </div>

      </form>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, Upload, Plus, Trash2, Save, BadgeCheck,
  User
} from "lucide-react"

interface JobSeekerProfileFormProps {
  initialData: any
}

export default function JobSeekerProfileForm({ initialData }: JobSeekerProfileFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize state with initialData to prevent "vanishing" of existing data
  const [formData, setFormData] = useState<any>({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    headline: initialData.headline || "",
    phone: initialData.phone || "",
    city: initialData.city || "",
    relocatable: initialData.relocatable || "No",
    bio: initialData.bio || "",
    avatarUrl: initialData.avatarUrl || "",
    skills: initialData.skills?.map((s: any) => ({ name: s.name, proficiency: s.proficiency })) || [],
    experience: initialData.experience?.map((e: any) => ({
      title: e.title,
      company: e.company,
      startDate: e.startDate ? new Date(e.startDate).toISOString().slice(0, 7) : "",
      endDate: e.endDate ? new Date(e.endDate).toISOString().slice(0, 7) : "",
      isCurrent: !!e.isCurrent,
      empType: e.empType,
      location: e.location,
      responsibilities: e.responsibilities
    })) || [],
    education: initialData.education?.map((e: any) => ({
      degree: e.degree,
      institution: e.institution,
      yearOfPassing: e.yearOfPassing,
      grade: e.grade
    })) || [],
    certifications: initialData.certifications?.map((c: any) => ({
      name: c.name,
      issuer: c.issuer,
      year: c.year,
      url: c.url
    })) || [],
    resumeUrl: initialData.resumeUrl || "",
    portfolioUrl: initialData.portfolioUrl || "",
    githubUrl: initialData.githubUrl || "",
    linkedinUrl: initialData.linkedinUrl || "",
    jobPreferences: initialData.jobPreferences?.map((p: any) => ({
      preferredRole: p.preferredRole || "",
      preferredType: p.preferredType || "",
      expectedSalaryMin: p.expectedSalaryMin || "",
      expectedSalaryMax: p.expectedSalaryMax || "",
      preferredLocation: p.preferredLocation ? p.preferredLocation.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      noticePeriod: p.noticePeriod || "",
      availability: p.availability || ""
    })) || (initialData.preferredRole ? [{
      preferredRole: initialData.preferredRole || "",
      preferredType: initialData.preferredType || "",
      expectedSalaryMin: initialData.expectedSalaryMin || "",
      expectedSalaryMax: initialData.expectedSalaryMax || "",
      preferredLocation: initialData.preferredLocation ? initialData.preferredLocation.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
      noticePeriod: initialData.noticePeriod || "",
      availability: initialData.availability || ""
    }] : []),
    languages: initialData.languages?.map((l: any) => ({ name: l.name, proficiency: l.proficiency })) || [],
    gender: initialData.gender || "",
    dob: initialData.dob ? new Date(initialData.dob).toISOString().slice(0, 10) : "",
    differentlyAbled: initialData.differentlyAbled || "",
    veteranStatus: initialData.veteranStatus || ""
  })

  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarError, setAvatarError] = useState<string | null>(null)

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
    setFormData((prev: any) => {
      const updated = [...prev[field]]
      updated[index] = { ...updated[index], [key]: value }
      return { ...prev, [field]: updated }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const { updateJobSeekerProfile } = await import("@/actions/profile-actions")
      const result = await updateJobSeekerProfile(formData)

      if (result.success) {
        router.push("/dashboard/job-seeker/profile")
        router.refresh()
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

  // Calculate Profile Strength
  const checklist = [
    { completed: !!(formData.firstName && formData.lastName) },
    { completed: formData.experience.length > 0 },
    { completed: formData.skills.length > 0 },
    { completed: !!(formData.resumeUrl || initialData.resumeUrl) },
    { completed: formData.education.length > 0 },
    { completed: !!formData.bio }
  ]
  const strength = Math.round((checklist.filter(c => c.completed).length / checklist.length) * 100)

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
          <span className="bg-white px-2 py-0.5 rounded-md text-emerald-800 tabular-nums">{strength}%</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BASIC INFO */}
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
              <label className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 overflow-hidden cursor-pointer hover:border-teal transition-colors relative group">
                {formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-slate-400" />
                )}
                <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="h-5 h-5 text-white" />
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
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First name *</label>
                <input required type="text" value={formData.firstName} onChange={e => handleInputChange("firstName", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last name *</label>
                <input required type="text" value={formData.lastName} onChange={e => handleInputChange("lastName", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-teal transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Professional headline *</label>
              <input required maxLength={40} placeholder="e.g. Full-stack Developer" type="text" value={formData.headline} onChange={e => handleInputChange("headline", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone number *</label>
                <input required type="tel" pattern="\d*" inputMode="numeric" maxLength={15} placeholder="e.g. 9876543210" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value.replace(/\D/g, ''))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City / Location *</label>
                <input required maxLength={30} placeholder="e.g. Ludhiana, Punjab" type="text" value={formData.city} onChange={e => handleInputChange("city", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Open to relocation?</label>
                <select value={formData.relocatable} onChange={e => handleInputChange("relocatable", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Remote only">Remote only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select value={formData.gender} onChange={e => handleInputChange("gender", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 transition-all">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY (BIO) */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">2</span>
              Professional summary
            </h2>
            <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg uppercase tracking-widest border border-amber-100">Recommended</span>
          </div>
          <div className="p-8">
            <textarea
              rows={6}
              placeholder="Write a short summary about your expertise, career goals and what makes you stand out…"
              value={formData.bio}
              onChange={e => handleInputChange("bio", e.target.value)}
              className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 resize-y transition-all leading-relaxed"
            />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">3</span>
              Work experience
            </h2>
          </div>
          <div className="p-8 space-y-6">
            {formData.experience.map((exp: any, i: number) => (
              <div key={i} className="p-6 border border-slate-200 rounded-xl relative bg-slate-50/30">
                <button type="button" onClick={() => removeArrayItem("experience", i)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500">
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
                      <label className="flex items-center gap-2 text-sm text-slate-600 whitespace-nowrap cursor-pointer">
                        <input type="checkbox" checked={exp.isCurrent} onChange={e => updateArrayItem("experience", i, "isCurrent", e.target.checked)} className="rounded text-teal focus:ring-teal" />
                        Current
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                    <select value={exp.empType} onChange={e => updateArrayItem("experience", i, "empType", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white">
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
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
                <textarea rows={3} value={exp.responsibilities} onChange={e => updateArrayItem("experience", i, "responsibilities", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white leading-relaxed" placeholder="Describe your role and impact..." />
              </div>
            ))}

            <button type="button" onClick={() => addArrayItem("experience", { title: "", company: "", startDate: "", endDate: "", isCurrent: false, empType: "Full-time", location: "On-site", responsibilities: "" })} className="flex items-center gap-2 text-teal font-black text-[10px] uppercase tracking-widest hover:text-navy transition-colors">
              <Plus className="h-4 w-4" /> Add work experience
            </button>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">4</span>
              Education
            </h2>
          </div>
          <div className="p-8 space-y-4">
            {formData.education.map((edu: any, i: number) => (
              <div key={i} className="flex gap-4 items-start bg-slate-50/30 p-4 rounded-xl border border-slate-100 relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Degree</label>
                    <input required placeholder="e.g. MSc Computer Science" type="text" value={edu.degree} onChange={e => updateArrayItem("education", i, "degree", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Institution</label>
                    <input required placeholder="e.g. University of Manchester" type="text" value={edu.institution} onChange={e => updateArrayItem("education", i, "institution", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Graduation Year</label>
                    <input required placeholder="Year" type="number" min="1980" max="2035" value={edu.yearOfPassing} onChange={e => updateArrayItem("education", i, "yearOfPassing", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Grade / CGPA</label>
                    <input placeholder="e.g. 3.8" type="text" value={edu.grade} onChange={e => updateArrayItem("education", i, "grade", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                </div>
                <button type="button" onClick={() => removeArrayItem("education", i)} className="p-2 text-slate-400 hover:text-rose-500 mt-6"><Trash2 className="h-5 w-5" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("education", { degree: "", institution: "", yearOfPassing: new Date().getFullYear(), grade: "" })} className="flex items-center gap-2 text-teal font-black text-[10px] uppercase tracking-widest hover:text-navy transition-colors mt-2">
              <Plus className="h-4 w-4" /> Add education
            </button>
          </div>
        </section>

        {/* JOB PREFERENCES - EXPANDED */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">5</span>
              Job preferences
            </h2>
          </div>
          <div className="p-8 space-y-8">
            {formData.jobPreferences.map((pref: any, i: number) => (
              <div key={i} className="p-6 border border-slate-200 rounded-xl relative bg-slate-50/30">
                <button type="button" onClick={() => removeArrayItem("jobPreferences", i)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500">
                  <Trash2 className="h-5 w-5" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-10">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferred job role *</label>
                    <input required placeholder="e.g. Software Engineer" type="text" value={pref.preferredRole} onChange={e => updateArrayItem("jobPreferences", i, "preferredRole", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferred job type</label>
                    <select value={pref.preferredType} onChange={e => updateArrayItem("jobPreferences", i, "preferredType", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white">
                      <option value="">Any type</option>
                      <option value="Full-time">Full-time / Permanent</option>
                      <option value="Contract">Fixed-term Contract</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Graduate Scheme">Graduate Scheme</option>
                      <option value="Freelance">Freelance / Project-based</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expected salary min (£ / year)</label>
                    <input type="number" placeholder="e.g. 35000" value={pref.expectedSalaryMin} onChange={e => updateArrayItem("jobPreferences", i, "expectedSalaryMin", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notice period</label>
                    <select value={pref.noticePeriod} onChange={e => updateArrayItem("jobPreferences", i, "noticePeriod", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white">
                      <option value="">Select option...</option>
                      <option value="Immediate">Immediate / Not employed</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="1 month">1 month</option>
                      <option value="2 months">2 months</option>
                      <option value="3 months">3 months</option>
                      <option value="6 months+">6 months or more</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Locations (Max 5)</label>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {pref.preferredLocation.length === 0 ? (
                          <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-wider"></span>
                        ) : (
                          pref.preferredLocation.map((loc: string, locIdx: number) => (
                            <span key={locIdx} className="flex items-center gap-2 px-3 py-1 bg-teal/10 text-teal rounded-lg text-xs font-bold border border-teal/20">
                              {loc}
                              <button
                                type="button"
                                onClick={() => {
                                  const newLocs = pref.preferredLocation.filter((_: any, li: number) => li !== locIdx)
                                  updateArrayItem("jobPreferences", i, "preferredLocation", newLocs)
                                }}
                                className="hover:text-rose-500 transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <input
                          id={`newLoc-${i}`}
                          disabled={pref.preferredLocation.length >= 5}
                          placeholder={pref.preferredLocation.length >= 5 ? "Max 5 locations reached" : "Add location (e.g. London, Remote)"}
                          type="text"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              const input = e.currentTarget
                              const val = input.value.trim()
                              if (val && pref.preferredLocation.length < 5) {
                                updateArrayItem("jobPreferences", i, "preferredLocation", [...pref.preferredLocation, val])
                                input.value = ""
                              }
                            }
                          }}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 disabled:bg-slate-50 disabled:cursor-not-allowed"
                        />
                        <button
                          type="button"
                          disabled={pref.preferredLocation.length >= 5}
                          onClick={() => {
                            const input = document.getElementById(`newLoc-${i}`) as HTMLInputElement
                            const val = input.value.trim()
                            if (val && pref.preferredLocation.length < 5) {
                              updateArrayItem("jobPreferences", i, "preferredLocation", [...pref.preferredLocation, val])
                              input.value = ""
                            }
                          }}
                          className="px-4 py-2 bg-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal transition-all disabled:opacity-50"
                        >
                          Add
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 italic">Press Enter or click Add to save a location. Leave empty for "Worldwide".</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button type="button" onClick={() => addArrayItem("jobPreferences", { preferredRole: "", preferredType: "", expectedSalaryMin: "", expectedSalaryMax: "", preferredLocation: [], noticePeriod: "", availability: "" })} className="flex items-center gap-2 text-teal font-black text-[10px] uppercase tracking-widest hover:text-navy transition-colors">
              <Plus className="h-4 w-4" /> Add job preference set
            </button>
          </div>
        </section>

        {/* SKILLS */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">6</span>
              Skills & Expertise
            </h2>
          </div>
          <div className="p-8 space-y-4">
            <div className="flex flex-wrap gap-3">
              {formData.skills.map((skill: any, i: number) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-navy/5 border border-navy/10 rounded-xl group transition-all hover:bg-navy/10">
                  <span className="text-xs font-bold text-navy">{skill.name}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md ${skill.proficiency === 'Expert' ? 'bg-emerald-100 text-emerald-700' :
                      skill.proficiency === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-200 text-slate-600'
                    }`}>
                    {skill.proficiency}
                  </span>
                  <button type="button" onClick={() => removeArrayItem("skills", i)} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-3 pt-4 border-t border-slate-50">
              <div className="flex-1">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Skill name</label>
                <input id="newSkillName" placeholder="e.g. Next.js, Python, Figma" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Proficiency</label>
                <select id="newSkillProficiency" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white min-w-[140px]">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nameEl = document.getElementById('newSkillName') as HTMLInputElement
                  const profEl = document.getElementById('newSkillProficiency') as HTMLSelectElement
                  if (nameEl.value.trim()) {
                    addArrayItem("skills", { name: nameEl.value.trim(), proficiency: profEl.value })
                    nameEl.value = ""
                  }
                }}
                className="bg-navy text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal transition-all h-[46px]"
              >
                Add Skill
              </button>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">7</span>
              Certifications
            </h2>
          </div>
          <div className="p-8 space-y-4">
            {formData.certifications.map((cert: any, i: number) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50/30 p-4 rounded-xl border border-slate-100 relative pr-12">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Certification Name</label>
                  <input type="text" value={cert.name} onChange={e => updateArrayItem("certifications", i, "name", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Issuer</label>
                  <input type="text" value={cert.issuer} onChange={e => updateArrayItem("certifications", i, "issuer", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Year</label>
                  <input type="text" value={cert.year} onChange={e => updateArrayItem("certifications", i, "year", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                </div>
                <button type="button" onClick={() => removeArrayItem("certifications", i)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500"><Trash2 className="h-5 w-5" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("certifications", { name: "", issuer: "", year: "", url: "" })} className="flex items-center gap-2 text-teal font-black text-[10px] uppercase tracking-widest hover:text-navy transition-colors">
              <Plus className="h-4 w-4" /> Add certification
            </button>
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">8</span>
              Languages
            </h2>
          </div>
          <div className="p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.languages.map((lang: any, i: number) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Language *</label>
                    <input required type="text" value={lang.name} onChange={e => updateArrayItem("languages", i, "name", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Proficiency</label>
                    <select value={lang.proficiency} onChange={e => updateArrayItem("languages", i, "proficiency", e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white">
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Professional">Professional</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Beginner">Beginner</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => removeArrayItem("languages", i)} className="mb-2 text-slate-400 hover:text-rose-500 px-2 py-1"><Trash2 className="h-5 w-5" /></button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addArrayItem("languages", { name: "", proficiency: "Fluent" })} className="flex items-center gap-2 text-teal font-black text-[10px] uppercase tracking-widest hover:text-navy transition-colors">
              <Plus className="h-4 w-4" /> Add language
            </button>
          </div>
        </section>

        {/* LINKS */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-black text-navy uppercase tracking-widest flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-xl bg-teal/10 text-teal text-[10px]">9</span>
              Online presence
            </h2>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio website</label>
                <input placeholder="https://yourportfolio.com" type="url" value={formData.portfolioUrl} onChange={e => handleInputChange("portfolioUrl", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">GitHub</label>
                <input placeholder="github.com/username" type="text" value={formData.githubUrl} onChange={e => handleInputChange("githubUrl", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn profile</label>
                <input placeholder="linkedin.com/in/username" type="text" value={formData.linkedinUrl} onChange={e => handleInputChange("linkedinUrl", e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white" />
              </div>
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
            className="flex items-center gap-2 bg-linear-to-r from-navy to-teal text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl hover:shadow-xl hover:shadow-teal/20 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-navy/5"
          >
            {isSubmitting ? "Saving changes…" : <><Save className="h-4 w-4" /> Update profile</>}
          </button>
        </div>

      </form>
    </div>
  )
}

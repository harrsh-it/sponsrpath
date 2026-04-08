"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"

export function TalentFilters() {
  const router = useRouter()
  const params = useSearchParams()

  const [skills, setSkills] = useState(params.get("skills") ?? "")
  const [jobType, setJobType] = useState(params.get("jobType") ?? "")
  const [location, setLocation] = useState(params.get("location") ?? "")
  const [availability, setAvailability] = useState(params.get("availability") ?? "")
  const [visaOnly, setVisaOnly] = useState(params.get("visaOnly") === "true")

  function applyFilters() {
    const q = new URLSearchParams()
    if (skills) q.set("skills", skills)
    if (jobType) q.set("jobType", jobType)
    if (location) q.set("location", location)
    if (availability) q.set("availability", availability)
    if (visaOnly) q.set("visaOnly", "true")
    router.push(`?${q.toString()}`)
  }

  function clearFilters() {
    setSkills("")
    setJobType("")
    setLocation("")
    setAvailability("")
    setVisaOnly(false)
    router.push("?")
  }

  const hasFilters = skills || jobType || location || availability || visaOnly

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-navy/5 p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy/10 flex items-center justify-center">
            <SlidersHorizontal className="h-5 w-5 text-navy" />
          </div>
          <h2 className="text-sm font-black text-navy uppercase tracking-widest">Filter Talent</h2>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-rose-600 flex items-center gap-1.5 transition-colors"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Skills */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Skills
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Python..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-navy placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Preferred Job Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-navy focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="">Any Type</option>
            <option value="FULL_TIME">Full-time</option>
            <option value="PART_TIME">Part-time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Location / City
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. London, Manchester..."
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-navy placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold text-navy focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all appearance-none cursor-pointer"
          >
            <option value="">Any</option>
            <option value="Immediately">Immediately</option>
            <option value="2 Weeks">2 Weeks Notice</option>
            <option value="1 Month">1 Month Notice</option>
            <option value="3 Months">3 Months Notice</option>
          </select>
        </div>

        {/* Visa sponsorship */}
        <div>
          <label className="flex items-center gap-4 cursor-pointer group">
            <div
              onClick={() => setVisaOnly(!visaOnly)}
              className={`w-12 h-6 rounded-full transition-all duration-300 relative ${visaOnly ? "bg-amber" : "bg-slate-200"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${visaOnly ? "left-7" : "left-1"}`}
              />
            </div>
            <div>
              <p className="text-xs font-black text-navy uppercase tracking-widest">Needs Visa Sponsorship</p>
              <p className="text-[10px] text-slate-400 font-bold">Only show candidates needing sponsorship</p>
            </div>
          </label>
        </div>

        <button
          onClick={applyFilters}
          className="w-full py-4 bg-navy text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal transition-all shadow-xl shadow-navy/20 active:scale-95"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

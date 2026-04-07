"use client"

import * as React from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  Building2, 
  Globe, 
  Clock, 
  Search,
  X,
  ChevronDown
} from "lucide-react"

interface FilterSidebarProps {
  industries: string[]
}

export default function FilterSidebar({ industries }: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get("q") || ""
  const sponsorship = searchParams.get("sponsorship") || ""
  const jobType = searchParams.get("type") || ""
  const location = searchParams.get("location") || ""
  const industry = searchParams.get("industry") || ""
  const salary = searchParams.get("salary") || ""

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push(pathname)
  }

  const hasFilters = sponsorship || jobType || location || industry || salary

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-lg font-bold text-navy flex items-center gap-2">
          Filters
        </h3>
        {hasFilters && (
          <button 
            onClick={clearFilters}
            className="text-xs font-semibold text-teal hover:text-navy transition-colors flex items-center gap-1"
          >
            Clear all <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Visa Sponsorship - The Primary Filter */}
      <section className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Visa Sponsorship
        </label>
        <div className="flex flex-col gap-2">
          {[
            { id: "now", label: "Can Sponsor Now", icon: CheckCircle2, color: "text-emerald-600" },
            { id: "later", label: "Can Sponsor After 12 Months", icon: Clock, color: "text-amber-600" },
            { id: "none", label: "No Sponsorship", icon: X, color: "text-rose-500" },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => updateFilters({ sponsorship: sponsorship === status.id ? null : status.id })}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all text-left ${
                sponsorship === status.id 
                  ? "bg-navy text-white border-navy shadow-md shadow-navy/10" 
                  : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
              }`}
            >
              <status.icon className={`h-4 w-4 ${sponsorship === status.id ? "text-white" : status.color}`} />
              {status.label}
            </button>
          ))}
        </div>
      </section>

      {/* Job Type */}
      <section className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Job Type
        </label>
        <div className="space-y-2">
          {[
            { id: "FULL_TIME", label: "Full-time" },
            { id: "GRADUATE_SCHEME", label: "Graduate Scheme" },
            { id: "INTERNSHIP", label: "Internship" },
          ].map((type) => (
            <label key={type.id} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox"
                  checked={jobType === type.id}
                  onChange={() => updateFilters({ type: jobType === type.id ? null : type.id })}
                  className="peer h-5 w-5 appearance-none rounded-md border-2 border-slate-200 checked:bg-teal checked:border-teal transition-all cursor-pointer"
                />
                <CheckCircle2 className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <span className={`text-sm font-medium transition-colors ${jobType === type.id ? "text-navy font-bold" : "text-slate-600 group-hover:text-navy"}`}>
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Industry */}
      <section className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Industry
        </label>
        <div className="relative">
          <select 
            value={industry}
            onChange={(e) => updateFilters({ industry: e.target.value })}
            className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all cursor-pointer"
          >
            <option value="">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </section>

      {/* Location Type */}
      <section className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Location
        </label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { id: "ONSITE", label: "On-site", icon: Building2 },
            { id: "HYBRID", label: "Hybrid", icon: MapPin },
            { id: "REMOTE", label: "Remote", icon: Globe },
          ].map((loc) => (
            <button
              key={loc.id}
              onClick={() => updateFilters({ location: location === loc.id ? null : loc.id })}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                location === loc.id 
                  ? "bg-teal/5 text-teal border-teal/20" 
                  : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
              }`}
            >
              <loc.icon className="h-4 w-4" />
              {loc.label}
            </button>
          ))}
        </div>
      </section>

      {/* Salary Band */}
      <section className="space-y-4">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Salary Band
        </label>
        <div className="space-y-2">
          {[
            { id: "20", label: "£20,000 - £30,000" },
            { id: "30", label: "£30,000 - £40,000" },
            { id: "40", label: "£40,000 - £50,000" },
            { id: "50", label: "£50,000+" },
          ].map((band) => (
            <button
              key={band.id}
              onClick={() => updateFilters({ salary: salary === band.id ? null : band.id })}
              className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                salary === band.id 
                  ? "bg-amber text-navy" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
              }`}
            >
              {band.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

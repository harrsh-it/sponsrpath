"use client"

import { useState } from "react"
import { createJobAction } from "@/actions/jobs"
import { SalarySlider } from "@/components/ui/SalarySlider"
import { VisaBadge, SponsorStatus } from "@/components/ui/VisaBadge"
import { 
  ArrowLeft, Briefcase, Banknote, ShieldAlert, 
  MapPin, Clock, Globe, Plus, Trash2, 
  CheckCircle2, Building2, Send, Zap,
  ExternalLink, FileText, Layout, Coins,
  Target, Rocket, UserPlus
} from "lucide-react"
import Link from "next/link"

interface CreateJobFormProps {
  organization: {
    companyName: string
    industry: string | null
    website: string | null
    description: string | null
    location: string | null
    contactEmail: string | null
    logoUrl: string | null
    companySize: string | null
  }
}

export default function CreateJobForm({ organization }: CreateJobFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [salaryRange, setSalaryRange] = useState<[number, number]>([35000, 80000])
  const [sponsorBadge, setSponsorBadge] = useState<SponsorStatus>("No Sponsorship Data")
  
  // Dynamic Inputs State
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [responsibilities, setResponsibilities] = useState<string[]>([""])
  const [benefitsList, setBenefitsList] = useState<string[]>([])
  const [benefitInput, setBenefitInput] = useState("")
  
  const badgeOptions: SponsorStatus[] = [
    "Active Sponsor (Verified)",
    "Active Sponsor (Register Match)",
    "Potential Sponsor (Post 12 Months)",
    "No Sponsorship Data",
    "Confirmed Non-Sponsor"
  ]

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const addBenefit = () => {
    if (benefitInput.trim() && !benefitsList.includes(benefitInput.trim())) {
      setBenefitsList([...benefitsList, benefitInput.trim()])
      setBenefitInput("")
    }
  }

  const removeBenefit = (benefit: string) => {
    setBenefitsList(benefitsList.filter(b => b !== benefit))
  }

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""])
  }

  const updateResponsibility = (index: number, value: string) => {
    const updated = [...responsibilities]
    updated[index] = value
    setResponsibilities(updated)
  }

  const removeResponsibility = (index: number) => {
    if (responsibilities.length > 1) {
      setResponsibilities(responsibilities.filter((_, i) => i !== index))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    formData.append("minSalary", salaryRange[0].toString())
    formData.append("maxSalary", salaryRange[1].toString())
    formData.append("visaSponsorBadge", sponsorBadge)
    formData.append("requiredSkills", skills.join(","))
    formData.append("benefits", benefitsList.join(","))
    formData.append("responsibilities", JSON.stringify(responsibilities.filter(r => r.trim() !== "")))

    try {
      const result = await createJobAction(formData)
      if (result?.error) {
        setError(result.error)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto pb-32 pt-10 px-6">
      <div className="mb-12">
        <Link href="/dashboard/organization" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-navy transition-all mb-6 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-heading font-black text-navy tracking-tight">Create a Job Listing</h1>
            <p className="text-slate-500 font-medium mt-2 text-lg">
              Fill in the details below to find your next great hire for <span className="text-navy font-bold">{organization.companyName}</span>.
            </p>
          </div>
          <div className="hidden md:block">
             <div className="bg-amber/10 border border-amber/20 rounded-2xl px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber shadow-sm">
                   <Rocket className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-amber uppercase tracking-widest leading-none mb-1">Status</p>
                   <p className="text-xs font-bold text-navy uppercase tracking-widest">Drafting Mode</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {error && (
          <div className="p-5 bg-rose-50 text-rose-600 rounded-2xl text-sm font-bold border border-rose-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
            <ShieldAlert className="h-6 w-6 shrink-0" />
            {error}
          </div>
        )}

        {/* 1. Basic Job Details */}
        <Section icon={Layout} title="1. Basic Job Details" color="text-navy" bg="bg-navy/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <Label htmlFor="title" required>Job Title</Label>
              <Input 
                id="title" 
                name="title" 
                required 
                placeholder="e.g. Senior Frontend Developer" 
                className="text-lg"
              />
            </div>

            <div className="md:col-span-1">
              <Label htmlFor="companyName" required>Display Company Name</Label>
              <Input id="companyName" name="companyName" required defaultValue={organization.companyName} />
            </div>

            <div className="md:col-span-1">
              <Label htmlFor="locationType" required>Remote / Hybrid / On-site</Label>
              <Select id="locationType" name="locationType" defaultValue="ONSITE">
                <option value="ONSITE">On-site</option>
                <option value="HYBRID">Hybrid</option>
                <option value="REMOTE">Fully Remote</option>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description" required>Job Description (Markdown Supported)</Label>
              <TextArea 
                id="description" 
                name="description" 
                required 
                rows={12}
                placeholder="Describe the role, impact, and day-to-day expectations..." 
              />
              <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-emerald" /> You can use bold, lists, and links.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-2">
              <div>
                <Label htmlFor="city" required>City</Label>
                <Input id="city" name="city" required placeholder="e.g. London" />
              </div>
              <div>
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" name="state" placeholder="e.g. Greater London" />
              </div>
              <div>
                <Label htmlFor="country" required>Country</Label>
                <Input id="country" name="country" required defaultValue="United Kingdom" />
              </div>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="jobType" required>Employment Type</Label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 {["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"].map((type) => (
                   <label key={type} className="relative flex items-center justify-center p-4 border rounded-2xl cursor-pointer hover:bg-slate-50 transition-all has-checked:bg-navy has-checked:text-white has-checked:border-navy group">
                      <input type="radio" name="jobType" value={type} defaultChecked={type === "FULL_TIME"} className="sr-only" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{type.replace("_", " ")}</span>
                   </label>
                 ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Salary & Compensation */}
        <Section icon={Coins} title="2. Salary & Compensation" color="text-emerald" bg="bg-emerald/5">
          <div className="space-y-12">
            <div className="bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 shadow-inner">
               <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Base Salary Range (Yearly)</p>
                    <p className="text-4xl font-black text-navy tabular-nums">
                      £{salaryRange[0].toLocaleString()} <span className="text-slate-200">/</span> £{salaryRange[1].toLocaleString()}
                    </p>
                  </div>
                  <div className="px-6 py-3 bg-white border border-slate-200 text-emerald text-xs font-black uppercase tracking-widest rounded-2xl shadow-sm">
                    Verified Range
                  </div>
               </div>
               <SalarySlider 
                min={20000} 
                max={250000} 
                step={5000} 
                value={salaryRange} 
                onValueChange={(val) => setSalaryRange(val as [number, number])} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Label htmlFor="salaryType" required>Salary Type</Label>
                <Select id="salaryType" name="salaryType" defaultValue="YEARLY">
                  <option value="YEARLY">Yearly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="HOURLY">Hourly</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="currency" required>Currency</Label>
                <Input id="currency" name="currency" required defaultValue="GBP" />
              </div>
              <div>
                <Label htmlFor="equityBonus">Equity / Bonus (Optional)</Label>
                <Input id="equityBonus" name="equityBonus" placeholder="e.g. 0.5% equity, £5k bonus" />
              </div>
            </div>

            <div>
              <Label>Benefits (Tags)</Label>
              <div className="flex gap-4 mb-5">
                <Input 
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  placeholder="e.g. Health Insurance, Gym, Pension..."
                />
                <button 
                  type="button" 
                  onClick={addBenefit}
                  className="bg-emerald text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy transition-all shadow-xl shadow-emerald/10"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-3 min-h-[60px] p-5 bg-slate-50 rounded-3xl border border-slate-100 items-center">
                {benefitsList.length === 0 && <span className="text-xs text-slate-300 font-bold italic uppercase tracking-widest ml-2">No benefits added yet...</span>}
                {benefitsList.map(benefit => (
                  <span key={benefit} className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-[10px] font-black text-navy uppercase tracking-widest flex items-center gap-4 shadow-sm group hover:border-emerald/50 transition-colors">
                    {benefit}
                    <button type="button" onClick={() => removeBenefit(benefit)} className="text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Requirements & Skills */}
        <Section icon={Target} title="3. Requirements & Skills" color="text-amber" bg="bg-amber/5">
          <div className="space-y-10">
            <div>
              <Label required>Required Skills (Tags)</Label>
              <div className="flex gap-4 mb-5">
                <Input 
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g. React, TypeScript, Docker..."
                />
                <button 
                  type="button" 
                  onClick={addSkill}
                  className="bg-amber text-white px-8 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-navy transition-all shadow-xl shadow-amber/10"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-3 min-h-[60px] p-5 bg-slate-50 rounded-3xl border border-slate-100 items-center">
                {skills.length === 0 && <span className="text-xs text-slate-300 font-bold italic uppercase tracking-widest ml-2">Add technical or soft skills...</span>}
                {skills.map(skill => (
                  <span key={skill} className="bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-[10px] font-black text-navy uppercase tracking-widest flex items-center gap-4 shadow-sm group hover:border-amber/50 transition-colors">
                    <Zap className="h-3 w-3 text-amber animate-pulse" />
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="minExperience">Min Experience (Years)</Label>
                  <Input type="number" id="minExperience" name="minExperience" placeholder="0" min={0} />
                </div>
                <div>
                  <Label htmlFor="maxExperience">Max Experience (Years)</Label>
                  <Input type="number" id="maxExperience" name="maxExperience" placeholder="5" min={0} />
                </div>
              </div>
              <div>
                <Label htmlFor="education">Education Requirements</Label>
                <Input id="education" name="education" placeholder="e.g. Bachelor's in CS or equivalent" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="certifications">Preferred Certifications</Label>
                <Input id="certifications" name="certifications" placeholder="e.g. AWS Certified Solutions Architect, PMP" />
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Responsibilities */}
        <Section icon={FileText} title="4. Key Responsibilities" color="text-blue-500" bg="bg-blue-50/50">
          <div className="space-y-6">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">List the main tasks and expected outcomes for this role.</p>
            {responsibilities.map((resp, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="w-14 h-14 rounded-[1.25rem] bg-slate-50 flex items-center justify-center text-sm font-black text-slate-300 shrink-0 border border-slate-100 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  #{idx + 1}
                </div>
                <Input 
                  value={resp} 
                  onChange={(e) => updateResponsibility(idx, e.target.value)}
                  placeholder="e.g. Build and maintain scalable React components..."
                  className="flex-1"
                />
                <button 
                  type="button" 
                  onClick={() => removeResponsibility(idx)}
                  className="p-4 text-slate-200 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addResponsibility}
              className="flex items-center gap-3 text-xs font-black text-blue-500 hover:text-navy uppercase tracking-widest transition-all mt-6 ml-18 bg-blue-50 hover:bg-white px-6 py-3 rounded-xl border border-transparent hover:border-blue-100"
            >
              <Plus className="h-5 w-5" /> Add Responsibility Item
            </button>
          </div>
        </Section>

        {/* 5. Application Details */}
        <Section icon={Send} title="5. Application Details" color="text-indigo-500" bg="bg-indigo-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <Label htmlFor="howToApply" required>Application Method</Label>
              <Select id="howToApply" name="howToApply" defaultValue="INTERNAL">
                <option value="INTERNAL">Standard Dashboard Form (Recommended)</option>
                <option value="EXTERNAL">External URL / Career Page</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="externalUrl">External Redirect URL</Label>
              <Input id="externalUrl" name="externalUrl" placeholder="https://careers.company.com/jobs/123" />
            </div>
            <div>
              <Label htmlFor="closingDate" required>Application Deadline</Label>
              <Input type="date" id="closingDate" name="closingDate" required />
            </div>
            <div>
              <Label htmlFor="openings" required>Number of Openings</Label>
              <Input type="number" id="openings" name="openings" defaultValue={1} min={1} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="contactEmail">Internal Contact Email (Optional)</Label>
              <Input type="email" id="contactEmail" name="contactEmail" placeholder="hiring@company.com" />
              <p className="mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">This email will receive applications and notifications.</p>
            </div>
          </div>
        </Section>

        {/* Sponsorship Context (Crucial for Sponsrpath) */}
        <Section icon={ShieldAlert} title="Visa Sponsorship Context" color="text-amber" bg="bg-amber/5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Choose the badge that accurately represents your company's ability to sponsor visas.</p>
          <div className="grid grid-cols-1 gap-6">
            {badgeOptions.map((status) => (
              <label 
                key={status} 
                className={`flex flex-col md:flex-row items-center justify-between p-8 border rounded-[2.5rem] cursor-pointer transition-all ${
                  sponsorBadge === status 
                    ? "border-navy bg-navy/5 shadow-xl shadow-navy/5" 
                    : "border-slate-100 hover:border-navy/20 hover:bg-slate-50 bg-white"
                }`}
              >
                <div className="flex items-center gap-8 mb-4 md:mb-0">
                  <div className="relative">
                    <input 
                      type="radio" 
                      name="sponsorBadgeSelection" 
                      value={status}
                      checked={sponsorBadge === status}
                      onChange={() => setSponsorBadge(status as SponsorStatus)}
                      className="h-8 w-8 text-navy border-slate-300 focus:ring-navy cursor-pointer"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-navy uppercase tracking-widest mb-1">{status}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Verified status for Tier 2 visa sponsorship</p>
                  </div>
                </div>
                <div className="scale-110">
                  <VisaBadge status={status} />
                </div>
              </label>
            ))}
          </div>
        </Section>

        {/* 6. Company Info */}
        <Section icon={Building2} title="6. Company Info" color="text-slate-500" bg="bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="md:col-span-2">
              <Label htmlFor="companyDescription" required>Company Description</Label>
              <TextArea 
                id="companyDescription" 
                name="companyDescription" 
                required 
                defaultValue={organization.description || ""}
                placeholder="Briefly describe your company mission, culture, and why people love working there..." 
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="websiteUrl" required>Website URL</Label>
              <div className="relative">
                 <Globe className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                 <Input id="websiteUrl" name="websiteUrl" required defaultValue={organization.website || ""} placeholder="https://company.com" className="pl-14" />
              </div>
            </div>
            <div>
              <Label htmlFor="companySize" required>Company Size</Label>
              <Select id="companySize" name="companySize" required defaultValue={organization.companySize || ""}>
                <option value="">Select Company Size...</option>
                <option value="1-10">1-10 Employees</option>
                <option value="11-50">11-50 Employees</option>
                <option value="51-200">51-200 Employees</option>
                <option value="201-500">201-500 Employees</option>
                <option value="501-1000">501-1000 Employees</option>
                <option value="1000+">1000+ Employees</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry" required>Industry</Label>
              <Input id="industry" name="industry" required defaultValue={organization.industry || ""} placeholder="e.g. FinTech, Healthcare, SaaS" />
            </div>
            <div className="flex items-center gap-8 p-8 bg-white rounded-[2rem] border border-slate-100">
               <div className="w-20 h-20 rounded-[1.5rem] bg-navy text-white flex items-center justify-center text-xl font-black shrink-0 shadow-xl overflow-hidden">
                  {organization.logoUrl ? <img src={organization.logoUrl} className="w-full h-full object-cover" /> : organization.companyName.substring(0, 2).toUpperCase()}
               </div>
               <div className="flex-1">
                  <p className="text-xs font-black text-navy uppercase tracking-widest mb-1">Company Logo</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-4">Using profile default logo</p>
                  <button type="button" className="text-[10px] font-black text-navy bg-slate-50 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition-all uppercase tracking-widest cursor-not-allowed opacity-50">
                    Change Logo
                  </button>
               </div>
            </div>
          </div>
        </Section>

        {/* Action Bar */}
        <div className="sticky bottom-8 z-40">
           <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-10 border-2 border-slate-100 rounded-[3.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-8 translate-y-0 hover:-translate-y-1 transition-all duration-500">
             <div className="text-center md:text-left">
               <h4 className="text-2xl font-black text-navy tracking-tight mb-1">Ready to publish?</h4>
               <p className="text-sm text-slate-500 font-medium">Your listing will be instantly visible to potential candidates.</p>
             </div>
             <div className="flex items-center gap-6 w-full md:w-auto">
               <Link 
                 href="/dashboard/organization"
                 className="flex-1 md:flex-none px-12 py-5 rounded-[1.5rem] border-2 border-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all text-center"
               >
                 Cancel
               </Link>
               <button
                 type="submit"
                 disabled={loading}
                 className="flex-1 md:flex-none bg-navy text-white px-16 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-amber transition-all shadow-2xl shadow-navy/20 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-4 group"
               >
                 {loading ? (
                   <>
                     <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                     Publishing...
                   </>
                 ) : (
                   <>
                     Publish Now
                     <CheckCircle2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                   </>
                 )}
               </button>
             </div>
           </div>
        </div>

      </form>
    </div>
  )
}

// Sub-components
function Section({ icon: Icon, title, children, color, bg }: { icon: any, title: string, children: React.ReactNode, color: string, bg: string }) {
  return (
    <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl shadow-navy/5 overflow-hidden group hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500">
      <div className={`px-12 py-8 border-b border-slate-50 flex items-center gap-6 ${bg}`}>
        <div className={`p-4 rounded-2xl bg-white shadow-xl shadow-navy/5 border border-slate-100/50 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <h2 className="text-sm font-black text-navy uppercase tracking-[0.4em]">{title}</h2>
      </div>
      <div className="p-12">
        {children}
      </div>
    </div>
  )
}

function Label({ htmlFor, children, required }: { htmlFor?: string, children: React.ReactNode, required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">
      {children} {required && <span className="text-rose-500 animate-pulse">*</span>}
    </label>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input 
      {...props} 
      className={`block w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[1.5rem] text-navy placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all text-sm font-semibold shadow-inner ${props.className}`}
    />
  )
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea 
      {...props} 
      className="block w-full px-8 py-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] text-navy placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all text-sm font-semibold leading-relaxed min-h-[180px] shadow-inner"
    />
  )
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative group">
      <select 
        {...props} 
        className="block w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-[1.5rem] text-navy focus:outline-none focus:ring-4 focus:ring-navy/5 focus:border-navy/20 focus:bg-white transition-all text-sm font-semibold appearance-none cursor-pointer shadow-inner"
      />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover:text-navy transition-colors">
        <Plus className="h-5 w-5 rotate-45" />
      </div>
    </div>
  )
}

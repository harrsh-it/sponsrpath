"use client"

import { useState } from "react"
import { registerUser, authenticateUser } from "@/actions/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Building2, UserCircle, Mail, Lock, User as UserIcon } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState("JOB_SEEKER")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    formData.append("role", role)
    
    const result = await registerUser(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      // Automatically log them in after registration
      const loginResult = await authenticateUser(formData)
      if (loginResult?.error) {
        // Registration succeeded but login failed - send to login page
        window.location.href = "/login"
        return
      }
      // Hard redirect to bypass stale RSC cache
      if (role === "ORGANIZATION") {
        window.location.href = "/onboarding/organization"
      } else {
        window.location.href = "/onboarding/job-seeker"
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/1    5 p-4  "> 
      <div className="w-full max-w-lg bg-white rounded-3xl  overflow-hidden border border-slate-100 p-8 md:p-12 animate-in fade-in zoom-in duration-500 my-auto">
          
          <div className="mb-10 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-8 group">
              <span className="text-2xl font-heading font-black tracking-tight text-[#06507c] group-hover:text-teal transition-colors">Sponsrpath</span>
            </Link>
            <h2 className="text-3xl font-heading font-semibold text-navy">
              Create an account
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Join Sponsrpath today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("JOB_SEEKER")}
                  className={`flex flex-col items-center justify-center p-5 border rounded-2xl cursor-pointer transition-all ${
                    role === "JOB_SEEKER" 
                      ? "border-navy bg-navy/10  text-navy ring-navy/10" 
                      : "border-slate-400 bg-white text-slate-500 hover:border-slate-200"
                  }`}
                >
                  <UserCircle className={`h-10 w-10 mb-2 ${role === "JOB_SEEKER" ? "text-navy" : "text-slate-500"}`} />
                  <span className="font-semibold text-sm uppercase tracking-widest">Job Seeker</span>
                  <span className="text-xs   text-slate-400 mt-1 font-semibold">Seeking Sponsor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("ORGANIZATION")}
                  className={`flex flex-col items-center justify-center p-5 border rounded-2xl cursor-pointer transition-all ${
                    role === "ORGANIZATION" 
                      ? "border-navy bg-navy/10 text-navy ring-navy/10" 
                      : "border-slate-400 bg-white text-slate-500 hover:border-slate-200"
                  }`}
                >
                  <Building2 className={`h-10 w-10 mb-2 ${role === "ORGANIZATION" ? "text-navy" : "text-slate-500"}`} />
                  <span className="font-semibold text-sm  uppercase tracking-widest">Employer</span>
                  <span className="text-xs text-slate-400 mt-1 font-semibold">Hiring Talent</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="name">
                Full Name {role === "ORGANIZATION" ? "(Representative)" : ""}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal focus:bg-white transition-all font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal focus:bg-white transition-all font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-300" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal focus:bg-white transition-all font-medium"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-semibold uppercase tracking-widest pl-2">Min. 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl  text-sm font-semibold text-white bg-navy hover:bg-navy/80  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-4 uppercase tracking-widest"
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="font-black text-teal hover:underline transition-colors uppercase tracking-widest text-xs">
              Sign in
            </Link>
          </p>
        </div>
    </div>
  )
}

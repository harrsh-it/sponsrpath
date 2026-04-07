"use client"

import { useState } from "react"
import { authenticateUser, signInWithGithub, signInWithGoogle } from "@/actions/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Github, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    
    const result = await authenticateUser(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      // Hard redirect to clear RSC cache and load fresh session
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side cover */ }
      <div className="hidden lg:flex w-1/2 bg-navy text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-linear-to-t from-navy to-navy/40"></div>
        
        <div className="relative z-10">
          <Link href="/" className="text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
            <span className="text-amber-light">Sponsrpath</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-heading font-black leading-tight mb-6">
            Find employers who sponsor Tier 2 Visas.
          </h1>
          <p className="text-lg text-white/80 font-medium">
            Join thousands of international students securing their future in the UK with companies that value global talent.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-white/60 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} SponsrPath.
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 relative">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-navy/5 overflow-hidden border border-slate-100 p-10">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-heading font-black text-navy flex items-center justify-center gap-2">
              Get Started
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Sign in to your SponsorPath account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="text-xs font-semibold text-teal hover:underline transition-colors uppercase tracking-widest">
                  Forgot?
                </Link>
              </div>
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
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-teal/20 text-sm font-semibold text-white bg-teal hover:bg-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-4 uppercase tracking-widest"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-slate-400 font-semibold uppercase tracking-widest">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <form action={signInWithGithub} className="w-full">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center py-3 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 font-semibold gap-2 cursor-pointer"
                >
                  <Github className="h-5 w-5" />
                  <span className="text-xs">GitHub</span>
                </button>
              </form>
              <form action={signInWithGoogle} className="w-full">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center py-3 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 font-semibold gap-2 cursor-pointer"
                >
                  <svg className="h-5 w-5" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                  <span className="text-xs">Google</span>
                </button>
              </form>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-teal hover:underline transition-colors uppercase tracking-widest text-xs">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

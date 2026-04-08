"use client"

import { useState } from "react"
import { authenticateUser, signInWithGithub, signInWithGoogle } from "@/actions/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Mail, Lock } from "lucide-react"
import { Google, GitHub } from "@/components/SvgIcons"
import Image from "next/image"

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
    <div className="min-h-screen flex items-center justify-center bg-black/15 p-6 relative overflow-hidden"> 
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-navy/5 overflow-hidden border border-slate-100 p-8 md:p-12 animate-in fade-in zoom-in duration-500 z-10 relative">
          
          <div className="mb-10 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-8 group">
              <span className="text-2xl font-heading font-black tracking-tight text-[#06507c] group-hover:text-teal transition-colors">Sponsrpath</span>
            </Link>
            <h2 className="text-3xl font-heading font-semibold text-navy">
              Welcome back
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Log in to your account</p>
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
                  <Mail className="h-5 w-5 text-black" />
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
                <Link href="#" className="text-xs font-semibold text-navy hover:underline transition-colors uppercase tracking-widest">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-black " />
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
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl  text-sm font-semibold text-white bg-navy hover:bg-navy/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-4 uppercase tracking-widest"
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
                  <GitHub className="h-5 w-5" />
                  <span className="text-xs">GitHub</span>
                </button>
              </form>
              <form action={signInWithGoogle} className="w-full">
                <button
                  
                  type="submit"
                  className="w-full  inline-flex justify-center items-center py-3 px-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-600 font-semibold gap-2 cursor-pointer"
                >
                  <Google className="h-5 w-5"/>
                  <span className="text-xs">Google</span>
                </button>
              </form>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-navy hover:underline transition-colors uppercase tracking-widest text-xs">
              Sign up
            </Link>
          </p>
      </div>
    </div>
  )
}

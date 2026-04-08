import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Briefcase } from "lucide-react"

export default function JobNotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-navy/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Briefcase className="h-12 w-12 text-navy/20" />
          </div>
          <h1 className="text-3xl font-black text-navy uppercase tracking-tight mb-3">
            Job Not Found
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            This listing may have been removed or the link is no longer valid.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-navy text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-teal transition-all shadow-xl shadow-navy/10"
          >
            Browse all jobs
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

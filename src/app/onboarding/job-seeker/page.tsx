"use client"

import { useState } from "react"
import { completeJobSeekerOnboarding } from "@/actions/onboarding"
import { UploadCloud, ArrowRight, UserCircle } from "lucide-react"

export default function JobSeekerOnboardingPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(event.currentTarget)
    
    // In a real app, upload the file to S3/Blob and get the URL. We are mocking this for MVP.
    // If a file was selected, let's mock the resume URL
    if (fileName) {
      formData.append("resumeUrl", `/uploads/mock-resume-${encodeURIComponent(fileName)}.pdf`)
      formData.delete("file") // Remove large binary from server payload since we're mocking
    }

    const result = await completeJobSeekerOnboarding(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="min-h-screen bg-black/15  flex flex-col items-center justify-center p-6 py-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl  overflow-hidden border border-slate-100 my-auto">
        <div className=" p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 "></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20  rounded-2xl flex items-center justify-center mb-6 text-navy border-2  border-navy shadow-xl backdrop-blur-sm">
              <UserCircle className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-black font-heading mb-3 text-navy">Complete Your Profile</h1>
            <p className="text-navy/80 max-w-md font-medium leading-relaxed">
              Tell us a bit about yourself and upload your CV to start discovering opportunities with visa sponsors.
            </p>
          </div>
        </div>

        <div className="p-12">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3" htmlFor="bio">
                Professional Bio (Optional)
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={4}
                className="block w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy focus:bg-white transition-all font-medium leading-relaxed resize-none"
                placeholder="A short description of your skills and career goals..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                CV / Resume (PDF)
              </label>
              <div className="mt-1 flex justify-center px-8 pt-8 pb-10 border-2 border-slate-100 border-dashed rounded-3xl hover:bg-navy/5 hover:border-navy transition-all cursor-pointer group relative">
                <input
                  type="file"
                  name="file"
                  id="fileUpload"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-navy group-hover:text-white transition-all shadow-sm">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <div className="flex text-sm text-slate-600 justify-center">
                    <span className="font-semibold text-navy uppercase tracking-widest text-xs">Upload a file</span>
                    <p className="pl-1 font-semibold text-xs uppercase tracking-widest text-slate-400">or drag and drop</p>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                    PDF up to 10MB
                  </p>
                  {fileName && (
                    <div className="mt-6 py-3 px-6 bg-emerald/10 text-emerald font-semibold rounded-2xl text-xs truncate max-w-xs mx-auto border border-emerald/20 shadow-sm animate-in fade-in zoom-in duration-300">
                      ✓ {fileName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-3 py-4 px-6 border border-transparent rounded-2xl shadow-xl shadow-navy/20 text-sm font-semibold text-white bg-navy hover:bg-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest"
              >
                {loading ? "Saving Profile..." : "Complete Profile"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

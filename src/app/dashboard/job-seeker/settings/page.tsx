import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Bell, Shield, Trash2 } from "lucide-react"
import { deleteAccountAction } from "@/actions/auth"

export default async function JobSeekerSettingsPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/job-seeker" className="flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-navy transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-heading font-bold text-navy">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences.</p>
      </div>

      <div className="space-y-4">
        {/* Account Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg"><Shield className="h-5 w-5 text-blue-600" /></div>
            <h2 className="text-lg font-bold text-navy">Account</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Email</span>
              <span className="text-sm font-medium text-navy">{session.user.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm text-slate-600">Name</span>
              <span className="text-sm font-medium text-navy">{session.user.name ?? "—"}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600">Account Type</span>
              <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded-md">Job Seeker</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber/10 rounded-lg"><Bell className="h-5 w-5 text-amber" /></div>
            <h2 className="text-lg font-bold text-navy">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "New job matches", desc: "Get notified when new visa-sponsored jobs match your profile" },
              { label: "Application updates", desc: "Updates on your job applications" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-navy">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <div className="ml-4 w-10 h-6 bg-slate-200 rounded-full relative cursor-pointer shrink-0">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg"><Trash2 className="h-5 w-5 text-red-500" /></div>
            <h2 className="text-lg font-bold text-red-700">Danger Zone</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">Deleting your account is permanent and cannot be undone.</p>
          <form action={deleteAccountAction}>
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

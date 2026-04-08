import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Bell, Shield, Trash2 } from "lucide-react"
import { deleteAccountAction } from "@/actions/auth"

export default async function OrgSettingsPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="mb-8">
        <Link href="/dashboard/organization" className="flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-navy transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-heading font-bold text-navy">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your organisation account preferences.</p>
      </div>

      <div className="space-y-4">
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
              <span className="text-sm text-slate-600">Contact Name</span>
              <span className="text-sm font-medium text-navy">{session.user.name ?? "—"}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-slate-600">Account Type</span>
              <span className="text-xs font-bold px-2 py-1 bg-amber/10 text-navy rounded-md">Organisation</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-lg"><Trash2 className="h-5 w-5 text-red-500" /></div>
            <h2 className="text-lg font-bold text-red-700">Danger Zone</h2>
          </div>
          <p className="text-sm text-slate-500 mb-4">Deleting your account will remove all job listings and company data permanently.</p>
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

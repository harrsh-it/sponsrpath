import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Suspense } from "react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-row bg-black/15">
      <Suspense fallback={<div className="w-64 bg-navy min-h-screen shrink-0" />}>
        <Sidebar role={(session!.user as any).role} />
      </Suspense>
      <main className="flex-1 p-8 overflow-auto bg-white rounded-4xl m-2">
        {children}
      </main>
    </div>
  )
}


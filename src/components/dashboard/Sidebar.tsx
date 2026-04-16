"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Briefcase, PlusCircle, Settings, LogOut, Search, User, Bookmark, Award, Users, Bell } from "lucide-react"
import { signOutUser } from "@/actions/auth"
import { Logo } from "../ui/Logo"

interface SidebarProps {
  role?: string
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const orgNavItems = [
    { name: "Dashboard", href: "/dashboard/organization", icon: LayoutDashboard, exact: true },
    { name: "Post a Job", href: "/dashboard/organization/jobs/create", icon: PlusCircle, exact: false },
    { name: "My Listings", href: "/dashboard/organization/jobs", icon: Briefcase, exact: true },
    { name: "Find Talent", href: "/dashboard/organization/talent", icon: Users, exact: false },
    { name: "Company Profile", href: "/dashboard/organization/profile", icon: User, exact: false },
    { name: "Settings", href: "/dashboard/organization/settings", icon: Settings, exact: false },
  ]

  const seekerNavItems = [
    { name: "Dashboard", href: "/dashboard/job-seeker", icon: LayoutDashboard, exact: true },
    { name: "Saved Jobs", href: "/dashboard/job-seeker/favorites", icon: Bookmark, exact: true },
    { name: "Applications", href: "/dashboard/job-seeker/applications", icon: Award, exact: true },
    { name: "Outreach", href: "/dashboard/job-seeker/outreach", icon: Bell, exact: true },
    { name: "Browse Jobs", href: "/jobs", icon: Search, exact: false },
    { name: "My Profile", href: "/dashboard/job-seeker/profile", icon: User, exact: false },
    { name: "Settings", href: "/dashboard/job-seeker/settings", icon: Settings, exact: false },
  ]

  const navItems = role === "ORGANIZATION" ? orgNavItems : seekerNavItems

  return (
    <div className="w-64 bg-navy rounded-2xl text-white h-[calc(100vh-1rem)] sticky top-2 flex-col pt-8 pb-4 hidden md:flex shrink-0 mx-2">
      <div className="px-6 mb-10">
        <Logo size="md" variant="white" className="justify-center" />
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                isActive
                  ? "bg-white text-navy"
                  : "text-white hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "opacity-100" : "opacity-60"}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 mt-auto">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-4">
          <div className="text-lg font-semibold">Need help?</div>
          <p className="text-sm text-white/50 mt-1 mb-3">Contact our support team.</p>
          <button className="text-sm font-semibold text-amber hover:text-amber/80 transition-colors">
            Support Center
          </button>
        </div>
        <form action={signOutUser}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-white/70 hover:bg-white/5 hover:text-red-400"
          >
            <LogOut className="h-5 w-5 " />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  )
}

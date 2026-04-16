"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react"
import { signOutUser } from "@/actions/auth"
import { Logo } from "./ui/Logo"

interface NavUser {
  name: string | null
  email: string | null
  image: string | null
  role: string
}

interface NavbarClientProps {
  user: NavUser | null
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const dashboardHref =
    user?.role === "ORGANIZATION"
      ? "/dashboard/organization"
      : user?.role === "JOB_SEEKER"
      ? "/dashboard/job-seeker"
      : "/dashboard"

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Logo size="md" variant="navy" />

        {/* Center Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-base font-bold uppercase tracking-widest text-slate-500">
          <Link href="/jobs" className="hover:text-teal transition-colors">Find Jobs</Link>
          <a href="#employers" className="hover:text-teal transition-colors">For Employers</a>
          <Link href="/talent" className="hover:text-teal transition-colors">Find Talent</Link>
          <a href="#resources" className="hover:text-teal transition-colors">Resources</a>
        </div>

        {/* Right Section — desktop */}
        <div className="hidden md:flex items-center gap-6  cursor-pointer">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-slate-50 transition-all border border-slate-100 group shadow-sm bg-white"
              >
                {/* Avatar */}
                {user.image && !imageError ? (
                  <img
                    src={user.image}
                    alt={user.name ?? "User"}
                    width={32}
                    height={32}
                    className="rounded-xl object-cover ring-2 ring-white shadow-sm w-8 h-8"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-linear-to-br from-navy to-teal flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm uppercase tracking-tighter">
                    {initials}
                  </div>
                )}
                <div className="text-left hidden lg:block">
                  <p className="text-md font-bold text-navy">{user.name?.split(" ")[0] ?? "Account"}</p>
                  <p className="text-sm  text-slate-400 mt-1 leading-none font-bold truncate max-w-[100px]">{user.role.replace("_", " ")}</p>
                </div>
                <ChevronDown className={`h-3 w-3 text-slate-300 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-3xl shadow-2xl shadow-navy/10 border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 ">
                  <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-sm  text-slate-400 font-bold  mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-navy truncate">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href={dashboardHref}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-6 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-teal transition-all"
                    >
                      <LayoutDashboard className="h-6 w-6" />
                      Dashboard
                    </Link>
                    <Link
                      href={user.role === "JOB_SEEKER" ? "/dashboard/job-seeker/profile" : "/dashboard/organization"}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-6 py-3.5 text-sm font-bold  text-slate-600 hover:bg-slate-50 hover:text-teal transition-all"
                    >
                      <User className="h-6 w-6" />
                      My Profile
                    </Link>
                  </div>
                  <div className="border-t border-slate-50 py-2">
                    <form action={signOutUser}>
                      <button
                        type="submit"
                        className="w-full flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                prefetch={false}
                className="text-sm font-bold  uppercase tracking-widest text-slate-600 hover:text-teal transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                prefetch={false}
                className="bg-[#06507c] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-2xl  hover:shadow-navy/20 hover:-translate-y-0.5 transition-all whitespace-nowrap active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-2xl hover:bg-slate-50 transition-all"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block h-0.5 w-5 bg-navy transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-4 bg-teal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-navy transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-1 px-6 pb-8 pt-4 border-t border-slate-50">
          {[
            { label: "Find Jobs", href: "/jobs" },
            { label: "For Employers", href: "#employers" },
            { label: "Find Talent", href: "/talent" },
            { label: "Resources", href: "#resources" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-teal py-4 border-b border-dashed border-slate-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex flex-col gap-4 mt-6">
            {user ? (
              <>
                {/* Mobile user info */}
                <div className="flex items-center gap-4 py-4 px-4 bg-slate-50 rounded-2xl border border-slate-100">
                  {user.image && !imageError ? (
                    <img
                      src={user.image}
                      alt={user.name ?? "User"}
                      width={44}
                      height={44}
                      className="rounded-xl object-cover w-11 h-11"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-navy to-teal flex items-center justify-center text-white text-xs font-bold uppercase tracking-tighter">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-navy uppercase tracking-widest">{user.name}</p>
                    <p className="text-xs text-slate-400 font-bold italic">{user.role.replace("_", " ")}</p>
                  </div>
                </div>
                <Link
                  href={dashboardHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-teal py-2"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <form action={signOutUser}>
                  <button type="submit" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-rose-500 py-2 cursor-pointer">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </form>
              </>
            ) : (
              <div className="space-y-4">
                <Link
                  href="/login"
                  prefetch={false}
                  className="block text-center text-xs font-bold uppercase tracking-widest text-slate-600 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  prefetch={false}
                  className="block w-full bg-linear-to-r from-navy to-teal text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-2xl shadow-xl shadow-teal/20 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

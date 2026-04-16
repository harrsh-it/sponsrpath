"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Search, FileText, Award, ArrowRight, TrendingUp,
  Users, Calendar, Clock, CheckCircle2, Circle,
  MapPin, Briefcase, Plus, ExternalLink,
  Bell, Bookmark, Zap, HelpCircle
} from "lucide-react"
import Link from "next/link"
import ProfileAvatar from "@/components/dashboard/ProfileAvatar"
import SaveJobButton from "@/components/jobs/SaveJobButton"

interface JobSeekerDashboardClientProps {
  user: {
    name: string | null
    image: string | null
  }
  jobSeeker: {
    firstName: string | null
    lastName: string | null
    bio: string | null
    resumeUrl: string | null
    profileStrength: number
    checklist: {
      label: string
      completed: boolean
    }[]
  }
  recommendedJobs: any[]
  savedJobIds: string[]
  applications: any[]
  interviews: any[]
}

export default function JobSeekerDashboardClient({
  user,
  jobSeeker,
  recommendedJobs,
  savedJobIds,
  applications,
  interviews,
}: JobSeekerDashboardClientProps) {
  const firstName = jobSeeker.firstName || user.name?.split(" ")[0] || "there"

  return (
    <div className="max-w-[1400px] mx-auto pb-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-heading font-semibold text-navy tracking-tight">
            Good morning, {firstName}
          </h1>
          <p className="text-slate-500 font-semibold mt-1">
            You have <span className="text-navy font-black">{recommendedJobs.length} new matches</span> and <span className="text-navy font-black">{interviews.length} interview</span> today.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-teal hover:border-teal/30 hover:shadow-lg transition-all shadow-sm cursor-pointer">
            <Bell className="h-5 w-5" />
          </button>
          <Link
            href="/dashboard/job-seeker/profile/edit"
            className="hidden sm:flex items-center gap-3 bg-amber border-2 border-amber text-navy px-6 py-3 rounded-2xl font-semibold text-md hover:bg-amber/90 transition-colors shadow-xl shadow-navy/10 group h-fit"
          >
            <Zap className="h-4 w-4 fill-navy group-hover:animate-pulse" /> Complete Profile
          </Link>
          <ProfileAvatar
            imageUrl={user.image}
            name={user.name || firstName}
            className="w-12 h-12"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5  border-b-2 pb-8">
        {[
          { label: "Total applied", value: applications.length.toString(), sub: "+0 this week", icon: Briefcase, color: "text-black", bg: "bg-navy/10" },
          { label: "Interviews", value: interviews.length.toString(), sub: `${interviews.length} upcoming`, icon: Calendar, color: "text-black", bg: "bg-navy/10" },
          { label: "Profile strength", value: `${jobSeeker.profileStrength}%`, sub: "Add skills", icon: Award, color: "text-black", bg: "bg-navy/10" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-navy/5 transition-all cursor-default relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-6 relative z-10">
              <span className="text-xl font-bold text-black">{stat.label}</span>
              <div className={`p-3  ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="flex items-baseline gap-3 relative z-10">
              <span className="text-4xl font-bold text-black">{stat.value}</span>
              <span className="text-sm font-semibold text-navy bg-navy/10 px-2 py-1 rounded-lg ">{stat.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 space-y-10">

          {/* Recommended Jobs */}
          <section className="border-b-2 pb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-heading font-bold text-navy flex items-center gap-3">
                <Search className="h-6 w-6 text-navy" /> Recommended for you
              </h2>
              <Link href="/jobs" className="text-lg font-semibold text-navy hover:text-navy  flex items-center gap-1 transition-colors">
                View all <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
            {recommendedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedJobs.map((job, i) => (
                  <motion.div
                    key={job.id}
                    whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 bg-navy text-white rounded-2xl flex items-center justify-center font-black text-xl group-hover:bg-teal transition-all overflow-hidden shadow-inner border border-slate-100">
                          {job.organization?.logoUrl ? (
                            <img
                              src={job.organization.logoUrl}
                              alt={job.organization.companyName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                const parent = (e.target as HTMLImageElement).parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'w-full h-full flex items-center justify-center bg-navy text-white text-xl font-black font-heading';
                                  fallback.innerText = job.organization.companyName.substring(0, 2).toUpperCase();
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          ) : (
                            job.organization?.companyName.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-navy text-lg group-hover:text-teal transition-colors leading-tight">{job.title}</h3>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{job.organization?.companyName} · {job.visaSponsorBadge}</p>
                        </div>
                      </div>
                      <div className="bg-emerald/10 text-emerald font-black px-2 py-1 rounded-lg text-[9px] uppercase tracking-widest border border-emerald/20">
                        Top Match
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.minSalary && (
                        <span className="text-[10px] font-black text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-xl uppercase tracking-widest">
                          ₹{(job.minSalary / 100000).toFixed(1)}L - {(job.maxSalary / 100000).toFixed(1)}L PA
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald" />
                        <span className="text-[10px] font-black text-navy uppercase tracking-widest">Verified Sponsor</span>
                      </div>
                      <div className="flex gap-2">
                        <SaveJobButton 
                          jobId={job.id} 
                          initialSaved={savedJobIds.includes(job.id)} 
                          className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-rose-100 h-10 w-10"
                        />
                        <Link href={`/jobs/${job.id}`} className="bg-teal text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-navy transition-all shadow-lg shadow-teal/10">
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2.5rem] p-16 text-center shadow-inner">
                <div className="mx-auto w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-xl shadow-navy/5">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-navy font-black text-xl uppercase tracking-widest">Finding Matches...</h3>
                <p className="text-slate-500 font-medium text-sm mt-2 max-w-xs mx-auto leading-relaxed">Complete your profile skills to help our algorithm find the best sponsoring jobs for you.</p>
                <Link href="/dashboard/job-seeker/profile/edit" className="mt-8 inline-flex items-center gap-2 text-xs font-black text-white bg-teal px-8 py-4 rounded-2xl hover:bg-navy transition-all shadow-xl shadow-teal/20 uppercase tracking-widest group">
                  Add skills <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </section>

          {/* Application Tracker */}
          <section className="border-b-2 pb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl  font-bold text-navy flex items-center gap-3">
                <Clock className="h-6 w-6 text-navy" /> Your Applications
              </h2>
              <Link href="#" className="text-lg font-semibold text-navy hover:text-navy  flex items-center gap-1 transition-colors">
                View all <ExternalLink className="h-5 w-5" />
              </Link>
            </div>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-navy/5 overflow-hidden">
              {applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Company & Role</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Current Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center text-xs font-black group-hover:bg-teal transition-all shadow-sm overflow-hidden">
                                {app.jobPost.organization.logoUrl ? (
                                  <img
                                    src={app.jobPost.organization.logoUrl}
                                    alt={app.jobPost.organization.companyName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                      const parent = (e.target as HTMLImageElement).parentElement;
                                      if (parent) {
                                        const fallback = document.createElement('div');
                                        fallback.className = 'w-full h-full flex items-center justify-center bg-navy text-white text-sm font-black font-heading';
                                        fallback.innerText = app.jobPost.organization.companyName.substring(0, 2).toUpperCase();
                                        parent.appendChild(fallback);
                                      }
                                    }}
                                  />
                                ) : (
                                  app.jobPost.organization.companyName.substring(0, 2).toUpperCase()
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-black text-navy group-hover:text-teal transition-colors tracking-tight">{app.jobPost.title}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{app.jobPost.organization.companyName}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs text-slate-500 font-black tabular-nums">
                              {new Date(app.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-center">
                              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${app.status === 'Offer' ? 'bg-emerald/10 text-emerald border-emerald/20' :
                                  app.status === 'Interview' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    app.status === 'Rejected' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                                      app.status === 'Viewed' ? 'bg-amber/10 text-amber border-amber/20' :
                                        'bg-slate-100 text-slate-500 border-slate-200'
                                }`}>
                                {app.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-16 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                    <FileText className="h-8 w-8" />
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">No active applications yet.</p>
                  <Link href="/jobs" className="mt-6 inline-flex items-center gap-2 text-xs font-black text-navy bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all uppercase tracking-widest shadow-sm">
                    Browse jobs <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Quick Actions & Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h2 className="text-3xl font-bold text-navy mb-6">Quick actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Search jobs", icon: Search, href: "/jobs" },
                  { label: "Update CV", icon: FileText, href: "/dashboard/job-seeker/profile/edit" },
                  { label: "Edit profile", icon: TrendingUp, href: "/dashboard/job-seeker/profile/edit" },
                  { label: "Skills", icon: Zap, href: "/dashboard/job-seeker/profile/edit" },
                  { label: "Saved", icon: Bookmark, href: "/dashboard/job-seeker/favorites" },
                  { label: "Offers", icon: Award, href: "#" }
                ].map((action, i) => (
                  <Link href={action.href} key={i} className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-teal/30 transition-all group">
                    <div className="p-3 bg-slate-50 text-slate-300 group-hover:bg-teal group-hover:text-white rounded-2xl transition-all shadow-inner">
                      <action.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-navy text-center">{action.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-navy">Match strength</h2>
                <Link href="/dashboard/job-seeker/profile/edit" className="text-lg font-semibold text-navy flex items-center gap-1 hover:underline">
                  Improve <Plus className="h-5 w-5" />
                </Link>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-navy/5 space-y-4 min-h-[260px] flex flex-col justify-center">
                {jobSeeker.checklist.some(item => item.label === "Skills tagged" && item.completed) ? (
                  <div className="space-y-6 w-full">
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald/20 shadow-sm shadow-emerald/5">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <p className="text-sm font-black text-navy uppercase tracking-widest">Skills matched!</p>
                      <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">Our algorithm is now matching you with sponsoring roles based on your verified stack.</p>
                    </div>
                    <Link href="/dashboard/job-seeker/profile/edit" className="w-full py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[9px] font-black uppercase text-slate-400 hover:text-teal hover:bg-white transition-all text-center block tracking-widest shadow-sm">
                      Manage Stack
                    </Link>
                  </div>
                ) : (
                  <div className="text-center px-4">
                    <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <Zap className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-black text-slate-400 italic uppercase tracking-widest">No skills tagged.</p>
                    <Link href="/dashboard/job-seeker/profile/edit" className="mt-4 inline-block text-[10px] font-black text-teal hover:underline uppercase tracking-widest">Add skills now →</Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar Content (Right) */}
        <div className="lg:col-span-10 space-y-10">

          {/* Profile Completion */}
          <section className="bg-navy p-8 rounded-[2.5rem] text-white shadow-2xl shadow-teal/20 relative overflow-hidden group">
            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
            <div className="absolute -left-12 -top-12 w-32 h-32 bg-teal/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">Verification</h3>
                <Link href="/dashboard/job-seeker/profile/edit" className="text-lg font-semibold bg-white/20 hover:bg-white text-white hover:text-navy px-4 py-1.5 rounded-xl transition-all">
                  Boost ↗
                </Link>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-20 h-20 flex items-center justify-center bg-white/10 rounded-[2rem] shadow-inner backdrop-blur-sm border border-white/10">
                  <svg className="w-16 h-16 -rotate-90">
                    <circle cx="32" cy="32" r="28" className="stroke-white/10 fill-none" strokeWidth="5" />
                    <motion.circle
                      cx="32" cy="32" r="28"
                      className="stroke-white fill-none"
                      strokeWidth="5"
                      strokeDasharray={176}
                      initial={{ strokeDashoffset: 176 }}
                      animate={{ strokeDashoffset: 176 - (176 * jobSeeker.profileStrength) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <span className="absolute text-sm font-black tabular-nums">{jobSeeker.profileStrength}%</span>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white  mb-1">Status</p>
                  <p className="text-lg text-white leading-snug">
                    {jobSeeker.profileStrength < 100 ? "Growing Presence" : "Elite Status"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {jobSeeker.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    {item.completed ? (
                      <div className="w-5 h-5 rounded-lg bg-emerald flex items-center justify-center shadow-lg shadow-emerald/30">
                        <CheckCircle2 className="h-8 w-8 text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-lg border-2 border-white/10 flex items-center justify-center">
                        <Circle className="h-8 w-8 text-white/20" />
                      </div>
                    )}
                    <span className={`text-lg font-semibold ${item.completed ? 'text-white' : 'text-white/20'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Upcoming Interview */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-3xl  font-bold text-navy">Interviews</h3>
              <Link href="#" className="text-lg font-semibold  text-navy hover:text-navy  transition-colors flex gap-1 items-center">View all <ExternalLink className="h-5 w-5" /></Link>
            </div>
            {interviews.length > 0 ? (
              <div className="space-y-6">
                {interviews.map((interview, i) => (
                  <div key={interview.id} className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-navy/5 space-y-6 ${i > 0 ? 'opacity-50 grayscale' : 'shadow-xl shadow-navy/5 animate-in slide-in-from-right duration-500'}`}>
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-amber/5 text-amber rounded-2xl flex flex-col items-center justify-center border border-amber/10 shadow-sm">
                        <span className="text-[9px] font-black uppercase tracking-tighter">
                          {new Date(interview.scheduledAt).toLocaleDateString(undefined, { month: 'short' })}
                        </span>
                        <span className="text-xl font-black tabular-nums">
                          {new Date(interview.scheduledAt).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-navy text-sm leading-tight mb-1">{interview.jobPost.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{interview.jobPost.organization.companyName}</p>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-teal uppercase tracking-widest bg-teal/5 px-2 py-1 rounded-lg">
                            <Clock className="h-3 w-3" /> {new Date(interview.scheduledAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                            <Zap className="h-3 w-3" /> {interview.round}
                          </div>
                        </div>
                      </div>
                    </div>
                    {i === 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                        <button className="py-3 bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all cursor-pointer">Reschedule</button>
                        <button className="py-3 bg-navy text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-teal transition-all shadow-xl shadow-navy/10 cursor-pointer">Join Call</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-200">
                  <Calendar className="h-7 w-7" />
                </div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">No sessions scheduled.</p>
              </div>
            )}
          </section>


        </div>

      </div>
    </div>
  )
}

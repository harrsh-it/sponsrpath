// "use client";

// import React, { useRef } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ArrowRight,
//   Bookmark,
//   BookmarkCheck,
//   MapPin,
//   Building2,
//   CheckCircle,
//   RefreshCw,
//   HelpCircle,
// } from "lucide-react";
// import { create } from "zustand";

// /* =========================
//    Utils
// ========================= */
// function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// /* =========================
//    Button Component
// ========================= */
// function Button({
//   children,
//   className,
//   onClick,
//   variant = "default",
//   size = "default",
// }: any) {
//   const base =
//     "inline-flex items-center justify-center rounded-xl text-lg font-medium transition-all";

//   const variants: any = {
//     default: "bg-[#09567a] text-white hover:bg-[#147f8a]",
//     outline: "border border-gray-200 hover:bg-gray-100",
//     ghost: "hover:bg-gray-100",
//   };

//   const sizes: any = {
//     default: "h-9 px-3",
//     sm: "h-14 px-2.5 text-lg",
//     icon: "h-9 w-9",
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={cn(base, variants[variant], sizes[size], className)}
//     >
//       {children}
//     </button>
//   );
// }

// /* =========================
//    Sponsor Badge
// ========================= */
// const BADGE_CONFIG: any = {
//   confirmed: {
//     label: "Confirms Tier 2",
//     icon: CheckCircle,
//     bg: "bg-emerald-50",
//     text: "text-emerald-700",
//   },
//   likely: {
//     label: "Likely Sponsor",
//     icon: RefreshCw,
//     bg: "bg-yellow-50",
//     text: "text-yellow-700",
//   },
//   unverified: {
//     label: "Unverified",
//     icon: HelpCircle,
//     bg: "bg-gray-100",
//     text: "text-gray-600",
//   },
// };

// function SponsorBadge({ status }: any) {
//   const cfg = BADGE_CONFIG[status];
//   const Icon = cfg.icon;

//   return (
//     <span
//       className={cn(
//         "inline-flex items-center gap-1.5 px-2.5 py-1 text-base rounded-full",
//         cfg.bg,
//         cfg.text
//       )}
//     >
//       <Icon className="w-3 h-3" />
//       {cfg.label}
//     </span>
//   );
// }

// /* =========================
//    Mock Data
// ========================= */
// const MOCK_JOBS = [
//   {
//     id: "1",
//     title: "Software Engineer",
//     company: "Deloitte",
//     location: "London",
//     salary: "£45k – £65k",
//     sponsorStatus: "confirmed",
//   },
//   {
//     id: "2",
//     title: "Data Analyst",
//     company: "HSBC",
//     location: "Manchester",
//     salary: "£35k – £48k",
//     sponsorStatus: "confirmed",
//   },
//   {
//     id: "3",
//     title: "Mechanical Engineer",
//     company: "Rolls-Royce",
//     location: "Derby",
//     salary: "£40k – £55k",
//     sponsorStatus: "confirmed",
//   },
//   {
//     id: "4",
//     title: "Marketing Manager",
//     company: "Unilever",
//     location: "London",
//     salary: "£42k – £58k",
//     sponsorStatus: "likely",
//   },
//   {
//     id: "5",
//     title: "UX Designer",
//     company: "Thoughtworks",
//     location: "London",
//     salary: "£50k – £70k",
//     sponsorStatus: "likely",
//   },
// ];

// /* =========================
//    Zustand Store
// ========================= */
// const useAppStore = create<any>((set, get) => ({
//   savedJobs: ["1"],

//   toggleSaveJob: (id: string) =>
//     set((state: any) => ({
//       savedJobs: state.savedJobs.includes(id)
//         ? state.savedJobs.filter((j: string) => j !== id)
//         : [...state.savedJobs, id],
//     })),

//   isJobSaved: (id: string) => get().savedJobs.includes(id),
// }));

// /* =========================
//    Main Component
// ========================= */
// export function FeaturedJobs() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const { isJobSaved, toggleSaveJob } = useAppStore();

//   const scroll = (dir: "left" | "right") => {
//     if (!scrollRef.current) return;
//     scrollRef.current.scrollBy({
//       left: dir === "left" ? -320 : 320,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="py-20 bg-[#f4f9fb] ">
//       <div className="max-w-full mx-auto px-16  ">
//         {/* Header */}
//         <div className="flex justify-between items-end mb-10">
//           <div>
//             <p className="text-lg text-[#1a9889] font-medium mb-2">
//               Hot Right Now
//             </p>
//             <h2 className="text-5xl font-bold text-[#09567a]">
//               Featured Sponsoring Jobs
//             </h2>
//           </div>

//           <div className="flex items-center gap-3">
//             <Button variant="outline" size="icon" onClick={() => scroll("left")}>
//               <ChevronLeft />
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={() => scroll("right")}
//             >
//               <ChevronRight />
//             </Button>

//             <Link href="/jobs">
//               <Button variant="ghost">
//                 View all <ArrowRight className="ml-1 w-4 h-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Cards */}
//         <div
//           ref={scrollRef}
//           className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden"
//         >
//           {MOCK_JOBS.map((job: any, i: number) => {
//             const saved = isJobSaved(job.id);

//             return (
//               <motion.div
//                 key={job.id}
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="min-w-70 bg-white rounded-2xl border p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition"
//               >
//                 {/* Top */}
//                 <div className="flex justify-between">
//                   <div className="w-15 h-15 rounded-xl bg-gray-100 flex items-center justify-center">
//                     <Building2 className="w-10 h-10 text-gray-500" />
//                   </div>

//                   <button onClick={() => toggleSaveJob(job.id)}>
//                     {saved ? (
//                       <BookmarkCheck className="w-8 h-8 text-[#1a9889]" />
//                     ) : (
//                       <Bookmark className="w-8 h-8 text-gray-400" />
//                     )}
//                   </button>
//                 </div>

//                 {/* Info */}
//                 <div>
//                   <p className="text-xl font-semibold text-gray-500">{job.company}</p>
//                   <h3 className=" text-2xl font-semibold text-[#09567a]">
//                     {job.title}
//                   </h3>
//                 </div>

//                 <SponsorBadge status={job.sponsorStatus} />

//                 <div className="flex items-center text-lg text-gray-500 gap-1">
//                   <MapPin className="w-3 h-3" />
//                   {job.location}
//                 </div>

//                 <p className="font-semibold text-[#147f8a] text-lg">
//                   {job.salary}
//                 </p>

//                 <Button className="mt-auto bg-[#09567a] hover:bg-[#147f8a] text-white  ">
//                   Quick Apply
//                 </Button>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Building2,
  CheckCircle,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { create } from "zustand";

/* =========================
   Utils
========================= */
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   Button Component
========================= */
function Button({
  children,
  className,
  onClick,
  variant = "default",
  size = "default",
}: any) {
  const base =
    "inline-flex items-center justify-center rounded-xl text-lg font-medium transition-all";

  const variants: any = {
    default: "bg-[#09567a] text-white hover:bg-[#147f8a]",
    outline: "border border-gray-200 hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
  };

  const sizes: any = {
    default: "h-9 px-3",
    sm: "h-14 px-2.5 text-lg",
    icon: "h-9 w-9",
  };

  return (
    <button
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}

/* =========================
   Sponsor Badge
========================= */
const BADGE_CONFIG: any = {
  "Can Sponsor Now": {
    label: "Can Sponsor Now",
    icon: CheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  "Can Sponsor After 12 Months": {
    label: "Can Sponsor After 12 Months",
    icon: RefreshCw,
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  "No Sponsorship": {
    label: "No Sponsorship",
    icon: HelpCircle,
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
};

function SponsorBadge({ status }: any) {
  const cfg = BADGE_CONFIG[status];
  const Icon = cfg.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-base rounded-full",
        cfg.bg,
        cfg.text
      )}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

/* =========================
   Mock Data
========================= */
const MOCK_JOBS = [
  {
    id: "1",
    title: "Software Engineer",
    company: "Deloitte",
    location: "London",
    salary: "£45k – £65k",
    sponsorStatus: "Can Sponsor Now",
  },
  {
    id: "2",
    title: "Data Analyst",
    company: "HSBC",
    location: "Manchester",
    salary: "£35k – £48k",
    sponsorStatus: "Can Sponsor Now",
  },
  {
    id: "3",
    title: "Mechanical Engineer",
    company: "Rolls-Royce",
    location: "Derby",
    salary: "£40k – £55k",
    sponsorStatus: "Can Sponsor Now",
  },
  {
    id: "4",
    title: "Marketing Manager",
    company: "Unilever",
    location: "London",
    salary: "£42k – £58k",
    sponsorStatus: "Can Sponsor After 12 Months",
  },
  {
    id: "5",
    title: "UX Designer",
    company: "Thoughtworks",
    location: "London",
    salary: "£50k – £70k",
    sponsorStatus: "Can Sponsor After 12 Months",
  },
];

/* =========================
   Zustand Store
========================= */
const useAppStore = create<any>((set, get) => ({
  savedJobs: ["1"],

  toggleSaveJob: (id: string) =>
    set((state: any) => ({
      savedJobs: state.savedJobs.includes(id)
        ? state.savedJobs.filter((j: string) => j !== id)
        : [...state.savedJobs, id],
    })),

  isJobSaved: (id: string) => get().savedJobs.includes(id),
}));

/* =========================
   Main Component
========================= */
export function FeaturedJobs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isJobSaved, toggleSaveJob } = useAppStore();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-[#f4f9fb]">
      <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 sm:mb-8 lg:mb-10">
          <div>
            <p className="text-base sm:text-lg text-[#1a9889] font-medium mb-1 sm:mb-2">
              Hot Right Now
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09567a]">
              Featured Sponsoring Jobs
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="icon" onClick={() => scroll("left")}>
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")}>
              <ChevronRight />
            </Button>

            <Link href="/jobs">
              <Button variant="ghost" className="text-base sm:text-lg">
                View all <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hidden"
        >
          {MOCK_JOBS.map((job: any, i: number) => {
            const saved = isJobSaved(job.id);

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[260px] sm:min-w-[280px] lg:min-w-[280px] bg-white rounded-2xl border p-4 sm:p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition flex-shrink-0"
              >
                {/* Top */}
                <div className="flex justify-between">
                  <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Building2 className="w-7 h-7 sm:w-10 sm:h-10 text-gray-500" />
                  </div>

                  <button onClick={() => toggleSaveJob(job.id)}>
                    {saved ? (
                      <BookmarkCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#1a9889]" />
                    ) : (
                      <Bookmark className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Info */}
                <div>
                  <p className="text-base sm:text-xl font-semibold text-gray-500">{job.company}</p>
                  <h3 className="text-lg sm:text-2xl font-semibold text-[#09567a]">
                    {job.title}
                  </h3>
                </div>

                <SponsorBadge status={job.sponsorStatus} />

                <div className="flex items-center text-sm sm:text-lg text-gray-500 gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </div>

                <p className="font-semibold text-[#147f8a] text-base sm:text-lg">
                  {job.salary}
                </p>

                <Button className="mt-auto bg-[#09567a] hover:bg-[#147f8a] text-white text-base sm:text-lg">
                  Quick Apply
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
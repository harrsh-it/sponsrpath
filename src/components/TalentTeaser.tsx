// "use client";

// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, Eye } from "lucide-react";

// /* =========================
//    Utils
// ========================= */
// function cn(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// /* =========================
//    Button
// ========================= */
// function Button({ children, className }: any) {
//   return (
//     <button
//       className={cn(
//         "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all",
//         "bg-[#09567a] text-white hover:bg-[#147f8a]",
//         className
//       )}
//     >
//       {children}
//     </button>
//   );
// }

// /* =========================
//    Mock Data
// ========================= */
// const MOCK_STUDENTS = [
//   {
//     id: "1",
//     firstName: "Priya",
//     lastInitial: "S",
//     university: "UCL",
//     course: "MSc Computer Science",
//     skills: ["React", "Python", "ML", "Node"],
//     avatar: `https://i.pravatar.cc/80?u=priya`,
//     bio: "Full-stack dev with ML focus",
//     availability: "actively-looking",
//   },
//   {
//     id: "2",
//     firstName: "Arjun",
//     lastInitial: "M",
//     university: "Manchester",
//     course: "Chemical Engineering",
//     skills: ["MATLAB", "CAD", "Simulation"],
//     avatar: `https://i.pravatar.cc/80?u=arjun`,
//     bio: "Sustainable energy engineer",
//     availability: "open",
//   },
//   {
//     id: "3",
//     firstName: "Sneha",
//     lastInitial: "R",
//     university: "Edinburgh",
//     course: "Data Science",
//     skills: ["Python", "SQL", "Tableau"],
//     avatar: `https://i.pravatar.cc/80?u=sneha`,
//     bio: "Healthcare data scientist",
//     availability: "actively-looking",
//   },
// ];

// /* =========================
//    Student Card
// ========================= */
// function StudentCard({ student }: any) {
//   return (
//     <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3">
//       {/* Top */}
//       <div className="flex items-center gap-3">
//         <img
//           src={student.avatar}
//           alt=""
//           className="w-20 h-20 rounded-full"
//         />
//         <div>
//           <p className="font-semibold text-[#09567a] text-2xl">
//             {student.firstName} {student.lastInitial}.
//           </p>
//           <p className="text-xl text-gray-500">{student.university}</p>
//         </div>
//       </div>

//       {/* Course */}
//       <p className="text-xl  text-gray-600">{student.course}</p>

//       {/* Skills */}
//       <div className="flex flex-wrap gap-1">
//         {student.skills.slice(0, 3).map((skill: string) => (
//           <span
//             key={skill}
//             className="text-xl  font-semibold px-2 py-1 rounded-full bg-[#e6f4f5] text-[#147f8a]"
//           >
//             {skill}
//           </span>
//         ))}
//       </div>

//       {/* Bio */}
//       <p className="text-lg text-gray-500 line-clamp-2">
//         {student.bio}
//       </p>

//       {/* Availability */}
//       <div className="mt-auto">
//         <span
//           className={cn(
//             "text-lg px-2 py-1 rounded-full font-semibold",
//             student.availability === "actively-looking"
//               ? "bg-[#1a9889]/10 text-[#1a9889]"
//               : "bg-gray-100 text-gray-600"
//           )}
//         >
//           {student.availability === "actively-looking"
//             ? "Actively Looking"
//             : "Open to roles"}
//         </span>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    Main Component
// ========================= */
// export function TalentTeaser() {
//   return (
//     <section className="py-2  bg-[#f4f9fb]">
//       <div className="w-full mx-auto px-16">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12"
//         >
//           <div>
//             <p className="text-xl text-[#1a9889] font-medium mb-2">
//               For Employers
//             </p>

//             <h2 className="text-5xl font-bold text-[#09567a] ">
//               Let Your Career Find You
//             </h2>

//             <p className="mt-4 text-2xl text-gray-600 max-w-3xl">
//               Build a public talent profile and get discovered by recruiters —
//               without sending a single CV.
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 sm:items-end">
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <Eye className="w-4 h-4 text-[#1a9889]" />
//               <span>
//                 <strong className="text-[#09567a]">847</strong> recruiter views
//                 this week
//               </span>
//             </div>

//             <Link href="/register">
//               <Button>
//                 Build Profile <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </Link>
//           </div>
//         </motion.div>

//         {/* Cards */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {MOCK_STUDENTS.map((student, i) => (
//             <motion.div
//               key={student.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//             >
//               <div className="relative">
//                 <StudentCard student={student} />

//                 {/* Highlight badge */}
//                 {i === 0 && (
//                   <div className="absolute -top-3 -right-3 bg-[#1a9889] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//                     🔥 Recruiter Interested
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Footer Link */}
//         <div className="text-center mt-10">
//           <Link
//             href="/talent"
//             className="inline-flex items-center gap-1 text-lg font-medium text-[#09567a] hover:text-[#1a9889]"
//           >
//             Browse all profiles <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";

/* =========================
   Utils
========================= */
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   Button
========================= */
function Button({ children, className }: any) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all",
        "bg-[#09567a] text-white hover:bg-[#147f8a]",
        className
      )}
    >
      {children}
    </button>
  );
}

/* =========================
   Mock Data
========================= */
const MOCK_STUDENTS = [
  {
    id: "1",
    firstName: "Priya",
    lastInitial: "S",
    university: "UCL",
    course: "MSc Computer Science",
    skills: ["React", "Python", "ML", "Node"],
    avatar: `https://i.pravatar.cc/80?u=priya`,
    bio: "Full-stack dev with ML focus",
    availability: "actively-looking",
  },
  {
    id: "2",
    firstName: "Arjun",
    lastInitial: "M",
    university: "Manchester",
    course: "Chemical Engineering",
    skills: ["MATLAB", "CAD", "Simulation"],
    avatar: `https://i.pravatar.cc/80?u=arjun`,
    bio: "Sustainable energy engineer",
    availability: "open",
  },
  {
    id: "3",
    firstName: "Sneha",
    lastInitial: "R",
    university: "Edinburgh",
    course: "Data Science",
    skills: ["Python", "SQL", "Tableau"],
    avatar: `https://i.pravatar.cc/80?u=sneha`,
    bio: "Healthcare data scientist",
    availability: "actively-looking",
  },
];

/* =========================
   Student Card
========================= */
function StudentCard({ student }: any) {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex flex-col gap-3">
      {/* Top */}
      <div className="flex items-center gap-3">
        <img
          src={student.avatar}
          alt=""
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex-shrink-0"
        />
        <div>
          <p className="font-semibold text-[#09567a] text-lg sm:text-2xl">
            {student.firstName} {student.lastInitial}.
          </p>
          <p className="text-base sm:text-xl text-gray-500">{student.university}</p>
        </div>
      </div>

      {/* Course */}
      <p className="text-base sm:text-xl text-gray-600">{student.course}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {student.skills.slice(0, 3).map((skill: string) => (
          <span
            key={skill}
            className="text-base sm:text-xl font-semibold px-2 py-1 rounded-full bg-[#e6f4f5] text-[#147f8a]"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="text-sm sm:text-lg text-gray-500 line-clamp-2">
        {student.bio}
      </p>

      {/* Availability */}
      <div className="mt-auto">
        <span
          className={cn(
            "text-sm sm:text-lg px-2 py-1 rounded-full font-semibold",
            student.availability === "actively-looking"
              ? "bg-[#1a9889]/10 text-[#1a9889]"
              : "bg-gray-100 text-gray-600"
          )}
        >
          {student.availability === "actively-looking"
            ? "Actively Looking"
            : "Open to roles"}
        </span>
      </div>
    </div>
  );
}

/* =========================
   Main Component
========================= */
export function TalentTeaser() {
  return (
    <section className="py-8 sm:py-10 lg:py-2 bg-[#f4f9fb]">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12"
        >
          <div>
            <p className="text-base sm:text-xl text-[#1a9889] font-medium mb-1 sm:mb-2">
              For Employers
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#09567a]">
              Let Your Career Find You
            </h2>

            <p className="mt-2 sm:mt-4 text-base sm:text-xl lg:text-2xl text-gray-600 max-w-3xl">
              Build a public talent profile and get discovered by recruiters —
              without sending a single CV.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end w-full sm:w-auto">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="w-4 h-4 text-[#1a9889]" />
              <span>
                <strong className="text-[#09567a]">847</strong> recruiter views
                this week
              </span>
            </div>

            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                Build Profile <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {MOCK_STUDENTS.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative">
                <StudentCard student={student} />

                {/* Highlight badge */}
                {i === 0 && (
                  <div className="absolute -top-3 -right-3 bg-[#1a9889] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    🔥 Recruiter Interested
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/talent"
            className="inline-flex items-center gap-1 text-base sm:text-lg font-medium text-[#09567a] hover:text-[#1a9889]"
          >
            Browse all profiles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
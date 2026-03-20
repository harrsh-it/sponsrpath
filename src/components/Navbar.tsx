// import React from "react";
// // import { Button } from "@/components/ui/button"; // optional (shadcn), remove if not using

// const Navbar = () => {
//   return (
//     <nav className="w-full bg-white">
//       <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

//         {/* Logo */}
//         <div className="text-2xl font-semibold tracking-tight">
//           <span className="text-[#09567a]">Sponsr</span>
//           <span className="text-[#1a9889]">Path</span>
//         </div>

//         {/* Center Links */}
//         <div className="hidden md:flex items-center gap-8 text-lg font-semibold text-gray-600">
//           <a href="#" className="hover:text-[#147f8a] transition">
//             Find Jobs
//           </a>
//           <a href="#" className="hover:text-[#147f8a] transition">
//             For Employers
//           </a>
//           <a href="#" className="hover:text-[#147f8a] transition">
//             Talent Showcase
//           </a>
//           <a href="#" className="hover:text-[#147f8a] transition">
//             Resources
//           </a>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-4">
//           <a
//             href="#"
//             className="text-lg font-semibold text-gray-700 hover:text-[#147f8a]"
//           >
//             Sign In
//           </a>

//           <button className="bg-linear-to-r from-[#09567a] via-[#147f8a] to-[#1a9889] text-white text-lg font-semibold px-5 py-2 rounded-full shadow-sm hover:opacity-90 transition">
//             Get Started — It&apos;s Free
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client"
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-semibold tracking-tight shrink-0">
          <span className="text-[#09567a]">Sponsr</span>
          <span className="text-[#1a9889]">Path</span>
        </div>

        {/* Center Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-base lg:text-lg font-semibold text-gray-600">
          <a href="#" className="hover:text-[#147f8a] transition">Find Jobs</a>
          <a href="#" className="hover:text-[#147f8a] transition">For Employers</a>
          <a href="#" className="hover:text-[#147f8a] transition">Talent Showcase</a>
          <a href="#" className="hover:text-[#147f8a] transition">Resources</a>
        </div>

        {/* Right Section — hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#"
            className="text-base lg:text-lg font-semibold text-gray-700 hover:text-[#147f8a] transition"
          >
            Sign In
          </a>
          <button className="bg-gradient-to-r from-[#09567a] via-[#147f8a] to-[#1a9889] text-white text-base lg:text-lg font-semibold px-4 lg:px-5 py-2 rounded-full shadow-sm hover:opacity-90 transition whitespace-nowrap">
            Get Started — It&apos;s Free
          </button>
        </div>

        {/* Hamburger — visible on mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col gap-1 px-6 pb-5 pt-2 border-t border-gray-100">
          {["Find Jobs", "For Employers", "Talent Showcase", "Resources"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-base font-semibold text-gray-600 hover:text-[#147f8a] py-2 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            )
          )}

          <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-gray-100">
            <a
              href="#"
              className="text-base font-semibold text-gray-700 hover:text-[#147f8a] transition"
            >
              Sign In
            </a>
            <button className="bg-gradient-to-r from-[#09567a] via-[#147f8a] to-[#1a9889] text-white text-base font-semibold px-5 py-2.5 rounded-full shadow-sm hover:opacity-90 transition w-full">
              Get Started — It&apos;s Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
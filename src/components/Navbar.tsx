import React from "react";
// import { Button } from "@/components/ui/button"; // optional (shadcn), remove if not using

const Navbar = () => {
  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-semibold tracking-tight">
          <span className="text-[#09567a]">Sponsr</span>
          <span className="text-[#1a9889]">Path</span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-semibold text-gray-600">
          <a href="#" className="hover:text-[#147f8a] transition">
            Find Jobs
          </a>
          <a href="#" className="hover:text-[#147f8a] transition">
            For Employers
          </a>
          <a href="#" className="hover:text-[#147f8a] transition">
            Talent Showcase
          </a>
          <a href="#" className="hover:text-[#147f8a] transition">
            Resources
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-lg font-semibold text-gray-700 hover:text-[#147f8a]"
          >
            Sign In
          </a>

          <button className="bg-linear-to-r from-[#09567a] via-[#147f8a] to-[#1a9889] text-white text-lg font-semibold px-5 py-2 rounded-full shadow-sm hover:opacity-90 transition">
            Get Started — It&apos;s Free
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
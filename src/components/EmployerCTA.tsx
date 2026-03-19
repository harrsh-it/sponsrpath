"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Target,
  BarChart3,
  Shield,
} from "lucide-react";

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
        "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all",
        className
      )}
    >
      {children}
    </button>
  );
}

/* =========================
   Value Props
========================= */
const VALUE_PROPS = [
  { icon: Target, text: "Direct talent search — filter by skills, not CVs" },
  { icon: Users, text: "Pre-vetted student profiles with verified visa status" },
  { icon: BarChart3, text: "Diversity hiring metrics built-in" },
  { icon: Shield, text: "CoC verification badge for trusted employers" },
];

/* =========================
   Stats
========================= */
const STATS = [
  { label: "Avg. time to first interview", value: "11 days" },
  { label: "Students actively looking", value: "4,200+" },
  { label: "Employer satisfaction rate", value: "94%" },
  { label: "Sectors covered", value: "18+" },
];

/* =========================
   Main Component
========================= */
export function EmployerCTA() {
  return (
    <section className="py-8  relative  overflow-hidden">
      {/* subtle gradient overlay */}
      <div className="absolute inset-0  opacity-60" />

      <div className="relative w-full  mx-auto px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-[#1a9889] font-semibold   mb-4">
              For Employers
            </p>

            <h2 className="text-5xl font-bold text-black mb-6 leading-tight">
              Hire International Talent. <br />
              <span className="text-[#1a9889]">
                Filter by Skills, Not Applications.
              </span>
            </h2>

            <p className="text-black/80 mb-8 max-w-xl leading-relaxed text-xl  font-semibold">
              Stop wading through hundreds of CVs. Search verified talent from
              top universities — filtered by skill, availability, and graduation year.
            </p>

            {/* VALUE LIST */}
            <ul className="space-y-4 mb-10">
              {VALUE_PROPS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 text-black/80 text-xl font-semibold"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#1a9889]" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-3">
              <Link href="/employers">
                <Button className="bg-[#1a9889] hover:bg-[#147f8a] text-black text-xl font-semibold">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              <Link href="/talent">
                <Button className="border border-white/30 text-black text-xl font-semibold hover:bg-white/10">
                  Browse Talent
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT - STATS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-200   backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition"
              >
                <p className="text-3xl font-bold text-[#1a9889] mb-2">
                  {stat.value}
                </p>
                <p className="text-lg font-semibold text-black/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
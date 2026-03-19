"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Briefcase, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Profile",
    description:
      "Build your student profile with skills, experience, and visa status. Set your preferences and let employers discover you.",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    step: "02",
    icon: Search,
    title: "Browse Verified Sponsoring Jobs",
    description:
      "Every job on SponsorPath shows a Sponsorship Confidence Score — so you only apply to employers who'll actually sponsor you.",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    step: "03",
    icon: Briefcase,
    title: "Get Hired or Be Discovered",
    description:
      "Apply directly or let our Talent Showcase put you in front of recruiters from 2,400+ verified sponsoring employers.",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    iconBg: "bg-emerald-100",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className=" text-[#09567a]  font-semibold    mb-3">Simple Process</p>
          <h2 className="text-[#09567a] text-5xl  font-bold ">How It Works</h2>
          <p className="  text-2xl font-semibold   mt-4 max-w-2xl mx-auto">
            From profile to offer in three steps — designed specifically for international students.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-border z-0" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (    
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step icon circle */}
                <div className={`relative w-20 h-20 rounded-2xl border-2 ${step.color} flex items-center justify-center mb-6 shadow-sm`}>
                  <Icon className="w-8 h-8" />
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-2xl font-bold  mb-3">{step.title}</h3>
                <p className="text-sm font-semibold leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Arrow between steps */}
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-5 top-10 w-5 h-5 text-border z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/* =========================
   Mock Data
========================= */
const MOCK_TESTIMONIALS = [
  {
    id: "1",
    name: "Ananya Krishnan",
    university: "UCL",
    role: "Software Engineer at Deloitte",
    avatar: `https://i.pravatar.cc/60?u=ananya`,
    quote:
      "SponsorPath was a game-changer. I applied to 8 jobs and got 5 interviews — all at confirmed sponsors. Landed my role in 6 weeks.",
  },
  {
    id: "2",
    name: "Rahul Sharma",
    university: "Manchester",
    role: "Data Analyst at HSBC",
    avatar: `https://i.pravatar.cc/60?u=rahul`,
    quote:
      "The confidence score saved me so much time. I only applied to high-quality roles and avoided visa uncertainty completely.",
  },
  {
    id: "3",
    name: "Meera Iyer",
    university: "Warwick",
    role: "Graduate Accountant at PwC",
    avatar: `https://i.pravatar.cc/60?u=meera`,
    quote:
      "Recruiters reached out directly. I didn’t even apply — they found me through my profile. That changed everything.",
  },
  {
    id: "4",
    name: "Vikram Patel",
    university: "KCL",
    role: "Pharmacist at Boots UK",
    avatar: `https://i.pravatar.cc/60?u=vikram`,
    quote:
      "Finding visa-sponsored employers was impossible before. SponsorPath verified everything — completely stress-free.",
  },
];

/* =========================
   Main Component
========================= */
export function Testimonials() {
  return (
    <section className="py-8 bg-[#f4f9fb]">
      <div className="w-full mx-auto px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-bold text-[#09567a]">
            Real Students. Real Offers.
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-xl font-semibold text-gray-600">
            Join thousands of international students who found sponsored roles
            faster and smarter.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10  text-[#1a9889]/60" />

              {/* Text */}
              <p className="text-lg text-center text-gray-600 leading-relaxed flex-1">
                “{t.quote}”
              </p>

              {/* User */}
              <div className="flex items-center gap-3 pt-3 border-t">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border"
                />

                <div>
                  <p className="text-lg font-semibold text-[#09567a]">
                    {t.name}
                  </p>

                  <p className="text-lg text-gray-500">
                    {t.university}
                  </p>

                  <p className="text-base font-medium text-[#147f8a] mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
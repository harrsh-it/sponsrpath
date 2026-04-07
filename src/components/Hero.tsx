// import React from "react";
// import Image from "next/image";
// import { Briefcase, FileText, TrendingUp } from "lucide-react";

// const avatars = [
//   "/heroassests/user1.png",
//   "/heroassests/user1.png",
//   "/heroassests/user1.png",
//   "/heroassests/user1.png"
// ];

// const Hero = () => {
//   return (
//     <section className="w-full bg-white relative overflow-hidden">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-10 " />

//       <div className="w-full mx-auto px-16 py-16 lg:py-12 grid lg:grid-cols-2 gap-2 items-center">
//         {/* LEFT SIDE */}
//         <div className="space-y-4  w-5xl">
//           {/* Eyebrow */}
//           <p className="text-base font-extrabold uppercase mb-0 text-[#147f8a]">
//             Built exclusively for Indian students in the UK
//           </p>

//           {/* Headline */}
//           <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
//             Stop applying blindly. <br />
//             Find jobs that actually <br />
//             sponsor your visa.
//           </h1>

//           {/* Subheadline */}
//           <p className="text-gray-600 text-base sm:text-lg max-w-3xl font-semibold">
//             The UK&apos;s only job portal built for Indian students who need Tier 2 /
//             Skilled Worker visa sponsorship. Every listing verified. Full
//             transparency. No more finding out at offer stage.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-4 ">
//             <button className="px-6 py-3 text-lg bg-[#09567a] text-white font-semibold rounded-xl hover:bg-[#147f8a] transition">
//               Browse Verified Jobs →
//             </button>
//             <button className="px-6 py-3 border-2 text-lg    border-[#09567a] text-[#09567a] font-semibold rounded-xl hover:bg-[#09567a] hover:text-white transition">
//               Build Your Showcase Profile
//             </button>
//           </div>

//           {/* Trust Signals */}
//           <div className="flex flex-wrap gap-4 text-xl font-bold    text-gray-500">
//             <span>✓ Free for students</span>
//             <span>✓ GDPR Compliant</span>
//             <span>✓ UK-based</span>
//             <span>✓ No spam</span>
//           </div>

//           {/* Mini Profiles */}
//           <div className="flex items-center gap-3 mt-6">
//             <div className="flex -space-x-3">
//                 {avatars.map((src, i) => (
//                     <Image
//                     key={i}
//                     src={src}
//                     alt={`Profile ${i + 1}`}
//                     width={40}
//                     height={40}
//                     className="rounded-full border-2 border-white object-cover"
//                     />
//                 ))}
//                 </div>
//             <p className="text-base font-semibold text-gray-900">
//               340K+ Member Active
//             </p>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="relative flex justify-end  ">
//           {/* Main Image */}
//           <Image
//             src="/heroassests/hero-bgImage.png"
//             alt="hero"
//             width={450}
//             height={450}    
//             className="relative z-10 w-75 sm:w-100 lg:w-130"
//           />

//           {/* Floating Cards */}
//           <div className="absolute left-40 top-0 bg-white shadow-xl rounded-xl p-4  ">
//             <p className="text-2xl font-bold text-[#09567a]">8,420+</p>
//             <p className="text-sm text-gray-500">Verified employers</p>
//           </div>

//           <div className="absolute right-0 top-0 bg-white shadow-xl rounded-xl p-4 ">
//             <p className="text-2xl font-bold text-[#09567a]">2,314</p>
//             <p className="text-sm text-gray-500">Active Tier 2 roles</p>
//           </div>

//           <div className="absolute bottom-0 left-40 bg-white shadow-xl rounded-xl p-4 ">
//             <p className="text-2xl font-bold text-[#09567a]">94%</p>
//             <p className="text-sm text-gray-500">Interview success</p>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM CARDS */}
//       <div className="max-w-full mx-auto px-16 pb-16 grid md:grid-cols-3 gap-6 bg-white">

//         {/* CARD 1 */}
//         <div className="group relative overflow-hidden rounded-2xl p-16 text-center shadow-md bg-gray-100 border border-transparent hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">

//           {/* Top Gradient Line */}
//           <div className="absolute top-0 left-0 w-full h-2 bg-[#09567a]  origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

//           {/* Icon */}
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#147f8a]/10 text-[#147f8a] group-hover:bg-[#147f8a] group-hover:text-white group-hover:scale-110 transition-all duration-300">
//               <Briefcase size={32} />
//             </div>
//           </div>

//           <h3 className="font-bold text-2xl text-gray-900">
//             Talents Agency
//           </h3>

//           <p className="text-lg text-gray-500 mt-2">
//             Connect with verified employers hiring international talent.
//           </p>
//         </div>

//         {/* CARD 2 */}
//         <div className="group relative overflow-hidden rounded-2xl p-16 text-center shadow-md bg-linear-to-r from-[#147f8a] to-[#1a9889] text-white border border-transparent hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">

//           {/* Top Gradient Line */}
//           <div className="absolute top-0 left-0 w-full h-2 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

//           {/* Icon */}
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 text-white group-hover:bg-white group-hover:text-[#147f8a] group-hover:scale-110 transition-all duration-300">
//               <FileText size={32} />
//             </div>
//           </div>

//           <h3 className="font-bold text-2xl">
//             Portal Job
//           </h3>

//           <p className="text-lg mt-2 text-white/90">
//             Explore jobs that clearly state visa sponsorship availability.
//           </p>
//         </div>

//         {/* CARD 3 */}
//         <div className="group relative overflow-hidden rounded-2xl p-16 text-center shadow-md bg-gray-100  border border-transparent hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">

//           {/* Top Gradient Line */}
//           <div className="absolute top-0 left-0 w-full h-2 bg-[#09567a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

//           {/* Icon */}
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#147f8a]/10 text-[#147f8a] group-hover:bg-[#147f8a] group-hover:text-white group-hover:scale-110 transition-all duration-300">
//               <TrendingUp size={32} />
//             </div>
//           </div>

//           <h3 className="font-bold text-2xl text-gray-900">
//             Careers Coaching
//           </h3>

//           <p className="text-lg text-gray-500 mt-2">
//             Get expert guidance to land your first UK job faster.
//           </p>
//         </div>

//       </div>

//     </section>
//   );
// };

// export default Hero;


import React from "react";
import Image from "next/image";
import { Briefcase, FileText, TrendingUp } from "lucide-react";

const avatars = [
  "/heroassests/user1.png",
  "/heroassests/user1.png",
  "/heroassests/user1.png",
  "/heroassests/user1.png"
];

const Hero = () => {
  return (
    <section className="w-full bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" />

      <div className="w-full mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-12 grid lg:grid-cols-2 gap-10 lg:gap-2 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-4 w-full lg:w-5xl">
          {/* Eyebrow */}
          <p className="text-base font-extrabold uppercase mb-0 text-[#147f8a]">
            Built exclusively for Indian students in the UK
          </p>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
            Stop applying blindly. <br />
            Find jobs that actually <br />
            sponsor your visa.
          </h1>

          {/* Subheadline */}
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl font-semibold">
            The UK&apos;s only job portal built for Indian students who need Tier 2 /
            Skilled Worker visa sponsorship. Every listing verified. Full
            transparency. No more finding out at offer stage.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-6 py-3 text-lg bg-[#09567a] text-white font-semibold rounded-xl hover:bg-[#147f8a] transition">
              Browse Verified Jobs →
            </button>
            <button className="px-6 py-3 border-2 text-lg border-[#09567a] text-[#09567a] font-semibold rounded-xl hover:bg-[#09567a] hover:text-white transition">
              Build Your Showcase Profile
            </button>
          </div>

          {/* Trust Signals */}
          

          {/* Mini Profiles */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Profile ${i + 1}`}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="text-base font-semibold text-gray-900">
              340K+ Member Active
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center lg:justify-end mt-8 sm:mt-0">
          {/* Main Image */}
          <Image
            src="/heroassests/hero-bgImage.png"
            alt="hero"
            width={450}
            height={450}
            className="relative z-10 w-64 sm:w-80 lg:w-130"
          />

          {/* Floating Cards */}
          <div className="absolute left-0 sm:left-10 lg:left-40 top-0 bg-white shadow-xl rounded-xl p-3 sm:p-4 z-20">
            <p className="text-xl sm:text-2xl font-bold text-[#09567a]">8,420+</p>
            <p className="text-xs sm:text-sm text-gray-500">Verified employers</p>
          </div>

          <div className="absolute right-0 top-0 bg-white shadow-xl rounded-xl p-3 sm:p-4 z-20">
            <p className="text-xl sm:text-2xl font-bold text-[#09567a]">2,314</p>
            <p className="text-xs sm:text-sm text-gray-500">Active Tier 2 roles</p>
          </div>

          <div className="absolute bottom-0 left-0 sm:left-10 lg:left-40 bg-white shadow-xl rounded-xl p-3 sm:p-4 z-20">
            <p className="text-xl sm:text-2xl font-bold text-[#09567a]">94%</p>
            <p className="text-xs sm:text-sm text-gray-500">Interview success</p>
          </div>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="max-w-full mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 lg:pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white">

        {/* CARD 1 */}
        <div className="group relative overflow-hidden rounded-2xl p-10 sm:p-12 lg:p-16 text-center shadow-md bg-gray-100 border border-transparent hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#09567a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#147f8a]/10 text-[#147f8a] group-hover:bg-[#147f8a] group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <Briefcase size={32} />
            </div>
          </div>
          <h3 className="font-bold text-2xl text-gray-900">Talents Agency</h3>
          <p className="text-lg text-gray-500 mt-2">
            Connect with verified employers hiring international talent.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="group relative overflow-hidden rounded-2xl p-10 sm:p-12 lg:p-16 text-center shadow-md bg-linear-to-r from-[#147f8a] to-[#1a9889] text-white border border-transparent hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer">
          <div className="absolute top-0 left-0 w-full h-2 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/20 text-white group-hover:bg-white group-hover:text-[#147f8a] group-hover:scale-110 transition-all duration-300">
              <FileText size={32} />
            </div>
          </div>
          <h3 className="font-bold text-2xl">Portal Job</h3>
          <p className="text-lg mt-2 text-white/90">
            Explore  jobs that clearly state visa sponsorship availability.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="group relative overflow-hidden rounded-2xl p-10 sm:p-12 lg:p-16 text-center shadow-md bg-gray-100 border border-transparent hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer sm:col-span-2 md:col-span-1">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#09567a] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#147f8a]/10 text-[#147f8a] group-hover:bg-[#147f8a] group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <TrendingUp size={32} />
            </div>
          </div>
          <h3 className="font-bold text-2xl text-gray-900">Careers Coaching</h3>
          <p className="text-lg text-gray-500 mt-2">
            Get expert guidance to land your first UK job faster.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
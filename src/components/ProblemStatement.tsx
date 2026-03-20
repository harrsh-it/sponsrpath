// import React from 'react';
// import { Frown, EyeOff, Clock } from 'lucide-react';

// const ProblemStatement = () => {
//   return (
//     <section className=" px-6 md:px-16 font-sans overflow-hidden ">
//       <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">

//         {/* Left Column: Narrative */}
//         <div className="space-y-6  w-5xl p-12 rounded-2xl text-white">
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-[#147f8a]"></span>
//             <p className="text-base font-bold uppercase tracking-widest text-[#09567a]">
//               Why SponsorPath exists
//             </p>
//           </div>

//           <h2 className="text-4xl md:text-5xl font-extrabold text-[#09567a] leading-tight">
//             &quot;You&apos;ve sent 200 applications. <br />
//             <span className="text-[#147f8a]">Most won&apos;t sponsor.</span> You just don&apos;t know which ones yet.&quot;
//           </h2>

//           <p className="text-lg text-gray-600 leading-relaxed max-w-3xl font-semibold">
//             Indian students in the UK face <strong>&quot;application fatigue&quot;</strong> — spending hundreds of hours applying to roles, only to discover at the final interview stage that the employer doesnt hold a Tier 2 sponsor licence. SponsorPath was built to eliminate this black hole, permanently.
//           </p>

//           <div className="pt-6 border-t border-gray-200  max-w-2xl">
//             <p className="italic text-2xl text-[#1a9889] font-medium leading-relaxed">
//               &quot;We built the platform we wish had existed when we were applying. SponsorPath shows you exactly which employers can and will sponsor — before you apply.&quot;
//             </p>
//             <p className="mt-2 text-sm font-bold text-[#09567a]"></p>
//           </div>
//         </div>

//         {/* Right Column: Floating Cards Design */}
//         <div className="relative ">
//           <div className="flex flex-col gap-6 md:pl-12">

//             {/* Card 1 */}
//             <div className="relative self-end max-w-xs p-4 mt-1 bg-[#09567a] text-white rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
//               <div className="absolute right-0 top-0 bottom-0 w-2 rounded-r-2xl"></div>
//               <Frown className="mb-4 " size={36} />
//               <p className="text-xl font-semibold uppercase tracking-wider">Wasted Applications</p>
//               <h3 className="text-3xl font-bold mt-2 mb-3">500+</h3>
//               <p className="text-base  leading-snug font-semibold">Spending weeks on roles that can never legally hire you.</p>
//             </div>

//             {/* Card 2 */}      
//                 <div className="relative self-end w-full max-w-[450]   p-4 bg-[#147f8a] text-white rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform duration-300 md:-mt-4">
//                 <div className="absolute right-0 top-0 bottom-0 w-2  rounded-r-2xl"></div>
//                 <EyeOff className="mb-4" size={36} />
//                 <p className="text-xl font-semibold uppercase tracking-wider ">No Transparency</p>
//               <h3 className="text-3xl font-bold mt-2 mb-3">Hidden</h3>
//               <p className="text-base font-semibold leading-snug">Job boards don&apos;t tell you if an employer is a licensed sponsor.</p>
//             </div>

//             {/* Card 3 */}
//             <div className="relative self-end w-full  p-4 bg-[#1a9889] text-white rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform duration-300 md:-mt-4">
//               <div className="absolute right-0 top-0 bottom-0 w-2  rounded-r-2xl"></div>
//               <Clock className="mb-4" size={36} />
//               <p className="text-xl font-semibold uppercase tracking-wider ">Visa Clock Ticking</p>
//               <h3 className="text-3xl font-bold mt-2 mb-3">24/7</h3>
//               <p className="text-base font-semibold leading-snug">Every month counts. You can&apos;t afford to waste time.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProblemStatement;


import React from 'react';
import { Frown, EyeOff, Clock } from 'lucide-react';

const ProblemStatement = () => {
  return (
    <section className="px-6 md:px-16 font-sans overflow-hidden">
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">

        {/* Left Column: Narrative */}
        <div className="space-y-6 w-full lg:w-5xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl text-white">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#147f8a]"></span>
            <p className="text-base font-bold uppercase tracking-widest text-[#09567a]">
              Why SponsorPath exists
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#09567a] leading-tight">
            &quot;You&apos;ve sent 200 applications. <br />
            <span className="text-[#147f8a]">Most won&apos;t sponsor.</span> You just don&apos;t know which ones yet.&quot;
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl font-semibold">
            Indian students in the UK face <strong>&quot;application fatigue&quot;</strong> — spending hundreds of hours applying to roles, only to discover at the final interview stage that the employer doesnt hold a Tier 2 sponsor licence. SponsorPath was built to eliminate this black hole, permanently.
          </p>

          <div className="pt-6 border-t border-gray-200 max-w-2xl">
            <p className="italic text-lg sm:text-xl md:text-2xl text-[#1a9889] font-medium leading-relaxed">
              &quot;We built the platform we wish had existed when we were applying. SponsorPath shows you exactly which employers can and will sponsor — before you apply.&quot;
            </p>
            <p className="mt-2 text-sm font-bold text-[#09567a]"></p>
          </div>
        </div>

        {/* Right Column: Floating Cards */}
        <div className="relative">
          <div className="flex flex-col gap-4 sm:gap-6 lg:pl-12">

            {/* Card 1 */}
            <div className="relative w-full sm:self-end sm:max-w-xs lg:max-w-xs p-4 mt-1 bg-[#09567a] text-white rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
              <div className="absolute right-0 top-0 bottom-0 w-2 rounded-r-2xl"></div>
              <Frown className="mb-4" size={32} />
              <p className="text-base sm:text-xl font-semibold uppercase tracking-wider">Wasted Applications</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">500+</h3>
              <p className="text-sm sm:text-base leading-snug font-semibold">Spending weeks on roles that can never legally hire you.</p>
            </div>

            {/* Card 2 */}
            <div className="relative w-full sm:self-end sm:max-w-[450px] p-4 bg-[#147f8a] text-white rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform duration-300 lg:-mt-4">
              <div className="absolute right-0 top-0 bottom-0 w-2 rounded-r-2xl"></div>
              <EyeOff className="mb-4" size={32} />
              <p className="text-base sm:text-xl font-semibold uppercase tracking-wider">No Transparency</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">Hidden</h3>
              <p className="text-sm sm:text-base font-semibold leading-snug">Job boards don&apos;t tell you if an employer is a licensed sponsor.</p>
            </div>

            {/* Card 3 */}
            <div className="relative w-full sm:self-end p-4 bg-[#1a9889] text-white rounded-2xl shadow-xl transform hover:-translate-y-1 transition-transform duration-300 lg:-mt-4">
              <div className="absolute right-0 top-0 bottom-0 w-2 rounded-r-2xl"></div>
              <Clock className="mb-4" size={32} />
              <p className="text-base sm:text-xl font-semibold uppercase tracking-wider">Visa Clock Ticking</p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">24/7</h3>
              <p className="text-sm sm:text-base font-semibold leading-snug">Every month counts. You can&apos;t afford to waste time.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
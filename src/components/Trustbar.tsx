
// "use client";
// import { Star } from "lucide-react";

// import Image from "next/image";

// const logos = [
//   "/ClientsLogo2/logo1.png",
//   "/ClientsLogo2/logo2.png",
//   "/ClientsLogo2/logo3.png",
//   "/ClientsLogo2/logo4.png",
//   "/ClientsLogo2/logo5.png",
//   "/ClientsLogo2/logo6.png",
//   "/ClientsLogo2/logo7.png",
//   "/ClientsLogo2/logo8.png",
//   "/ClientsLogo2/logo9.png",
//   "/ClientsLogo2/logo10.png",
//   "/ClientsLogo2/logo11.png",
//   "/ClientsLogo2/logo12.png",
//   "/ClientsLogo2/logo13.png",
//   "/ClientsLogo2/logo14.png",
//   "/ClientsLogo2/logo15.png",
//   "/ClientsLogo2/logo16.png",
//   "/ClientsLogo2/logo17.png",
//   "/ClientsLogo2/logo18.png",
//   "/ClientsLogo2/logo19.png",               
//   "/ClientsLogo2/logo20.png",
//   "/ClientsLogo2/logo21.png",
// ];

// export default function Trustbar() {
//   return (
//     <section className="w-full flex justify-center  ">
//       <div className="w-full overflow-hidden bg-white px-6 md:px-0 max-sm:px-0 lg:px-0 py-4 ">

//         {/* Heading */}
//         <h2 className=" flex flex-row justify-center items-center text-lg md:text-4xl leading-relaxed lg:px-20 text-yellow-400 ">
//           <Star size={40} fill="currentColor"/><Star size={40} fill="currentColor"/><Star size={40} fill="currentColor"/><Star size={40} fill="currentColor"/><Star size={40} fill="currentColor"/><Star size={40} fill="currentColor"  /> 
//         </h2>
//         <h2 className="text-center text-lg md:text-3xl font-bold text-black leading-relaxed lg:px-20">
//           Trusted by students from top UK universities.
//         </h2>
//        {/* ---------- DESKTOP IMAGE ---------- */}
//         <div className="flex justify-center mt-2">
//           <div className="relative w-full overflow-hidden flex items-center md:h-72">
//             {/* Background Gradient */}
//             <div className="absolute inset-0 bg-transparent" />

//             {/* Animated Strip */}
//             <div className="flex animate-scrollX whitespace-nowrap relative z-10">
//               {logos.concat(logos).map((logo, index) => (
//                 <div key={index} className="w-40 h-auto mx-6 max-sm:mx-2 max-sm:w-20     ">
//                   <Image
//                     src={logo}
//                     width={120}
//                     height={120}
//                     alt={`Customer Logo ${index + 1}`}
//                     className="w-full h-32 max-sm:h-20 max-sm:w-40 object-contain"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";
import { Star } from "lucide-react";
import Image from "next/image";

const logos = [
  "/ClientsLogo2/logo1.png",
  "/ClientsLogo2/logo2.png",
  "/ClientsLogo2/logo3.png",
  "/ClientsLogo2/logo4.png",
  "/ClientsLogo2/logo5.png",
  "/ClientsLogo2/logo6.png",
  "/ClientsLogo2/logo7.png",
  "/ClientsLogo2/logo8.png",
  "/ClientsLogo2/logo9.png",
  "/ClientsLogo2/logo10.png",
  "/ClientsLogo2/logo11.png",
  "/ClientsLogo2/logo12.png",
  "/ClientsLogo2/logo13.png",
  "/ClientsLogo2/logo14.png",
  "/ClientsLogo2/logo15.png",
  "/ClientsLogo2/logo16.png",
  "/ClientsLogo2/logo17.png",
  "/ClientsLogo2/logo18.png",
  "/ClientsLogo2/logo19.png",
  "/ClientsLogo2/logo20.png",
  "/ClientsLogo2/logo21.png",
];

export default function Trustbar() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full overflow-hidden bg-white py-4">

        {/* Stars */}
        <h2 className="flex flex-row justify-center items-center text-yellow-400">
          {[...Array(6)].map((_, i) => (
            <Star
              key={i}
              fill="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
            />
          ))}
        </h2>

        {/* Heading */}
        <h2 className="text-center text-base sm:text-xl md:text-3xl font-bold text-black leading-relaxed px-4 lg:px-20 mt-1">
          Trusted by students from top UK universities.
        </h2>

        {/* Scrolling Logo Strip */}
        <div className="flex justify-center mt-2">
          <div className="relative w-full overflow-hidden flex items-center h-24 sm:h-36 md:h-52 lg:h-72">
            <div className="absolute inset-0 bg-transparent" />

            <div className="flex animate-scrollX whitespace-nowrap relative z-10">
              {logos.concat(logos).map((logo, index) => (
                <div
                  key={index}
                  className="w-16 h-auto mx-2 sm:w-24 sm:mx-3 md:w-32 md:mx-4 lg:w-40 lg:mx-6 flex-shrink-0"
                >
                  <Image
                    src={logo}
                    width={120}
                    height={120}
                    alt={`Customer Logo ${index + 1}`}
                    className="w-full h-14 sm:h-20 md:h-28 lg:h-32 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
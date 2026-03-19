import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Trustbar from "@/components/Trustbar";
import ProblemStatement from "@/components/ProblemStatement";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { TalentTeaser } from "@/components/TalentTeaser";
import { Testimonials } from "@/components/Testimonials";
import { EmployerCTA } from "@/components/EmployerCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Trustbar/>
      <ProblemStatement/> 
      <HowItWorks/>
      <FeaturedJobs/>
      <TalentTeaser/>
      <Testimonials/>
      <EmployerCTA/>
      <Footer/>
    </main>
  );
}

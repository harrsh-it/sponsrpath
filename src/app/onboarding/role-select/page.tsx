import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { selectRole } from "@/actions/onboarding";
import { Briefcase, Building2, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export default async function RoleSelectPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // If user already has a role other than USER, they shouldn't be here
  const role = (session.user as any).role;
  if (role === "JOB_SEEKER") {
    redirect("/dashboard/job-seeker");
  } else if (role === "ORGANIZATION") {
    redirect("/dashboard/organization");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo size="lg" variant="dark" />
      </div>
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-black mb-4 text-navy">Welcome to Sponsrpath!</h1>
        <p className="text-lg text-slate-500 font-medium">To get started, please tell us how you'll be using the platform.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mx-auto">
        {/* Job Seeker Card */}
        <form action={selectRole} className="h-full">
          <input type="hidden" name="role" value="JOB_SEEKER" />
          <button 
            type="submit"
            className="w-full h-full bg-white border border-slate-200 rounded-3xl p-8 hover:border-teal hover:shadow-2xl hover:shadow-teal/10 transition-all text-left flex flex-col gap-6 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="h-16 w-16 bg-teal/10 text-teal rounded-2xl flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all shadow-sm">
              <Briefcase size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-2 group-hover:text-teal transition-colors">I am a Job Seeker</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                I&apos;m looking for Tier 2 visa sponsored jobs in the UK and want to connect with verified employers.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity">
                Get started <ArrowRight size={16} />
            </div>
          </button>
        </form>

        {/* Organization Card */}
        <form action={selectRole} className="h-full">
          <input type="hidden" name="role" value="ORGANIZATION" />
          <button 
            type="submit"
            className="w-full h-full bg-white border border-slate-200 rounded-3xl p-8 hover:border-amber hover:shadow-2xl hover:shadow-amber/10 transition-all text-left flex flex-col gap-6 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <div className="h-16 w-16 bg-amber/10 text-amber rounded-2xl flex items-center justify-center group-hover:bg-amber group-hover:text-white transition-all shadow-sm">
              <Building2 size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-navy mb-2 group-hover:text-amber transition-colors">I am an Employer</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                I represent a company looking to hire international talent and sponsor Tier 2 visas.
              </p>
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-amber opacity-0 group-hover:opacity-100 transition-opacity">
                Post jobs <ArrowRight size={16} />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

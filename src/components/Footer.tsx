import Link from "next/link";
import { Compass, Twitter, Linkedin, Instagram, Github } from "lucide-react";

const FOOTER_LINKS = {
  "Find Work": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Graduate Schemes", href: "/jobs?type=graduate-scheme" },
    { label: "Tech Jobs", href: "/jobs?sector=Tech" },
    { label: "Finance Jobs", href: "/jobs?sector=Finance" },
    { label: "Healthcare Jobs", href: "/jobs?sector=Healthcare" },
  ],
  "For Students": [
    { label: "Create Profile", href: "/register" },
    { label: "Talent Showcase", href: "/talent" },
    { label: "Job Alerts", href: "/dashboard#alerts" },
    { label: "Application Tracker", href: "/dashboard" },
    { label: "Resources Hub", href: "/resources" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "/employers" },
    { label: "Search Talent", href: "/talent" },
    { label: "CoC Verification", href: "/employers#verify" },
    { label: "Pricing", href: "/employers#pricing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "GDPR & Data Rights", href: "/gdpr" },
  { label: "Right to be Forgotten", href: "/gdpr#delete" },
  { label: "Cookie Settings", href: "/gdpr#cookies" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
        {/* Top: Logo + Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Sponsrpath
              </span>
            </Link>
            <p className="text-xl font-semibold text-white/60 leading-relaxed max-w-63">
              The job portal built exclusively for Indian international students in the UK.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12   rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xl font-bold uppercase tracking-widest text-white/40 mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Legal + Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg text-white/40">
            © {new Date().getFullYear()} SponsorPath Ltd. Registered in England &amp; Wales. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-center text-xl text-white/30 mt-6">
          🔒 GDPR compliant · ICO registered · We never sell your data · Right to be forgotten guaranteed
        </p>
      </div>
    </footer>
  );
}

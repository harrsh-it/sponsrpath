import * as React from "react"
import { CheckCircle2, ShieldCheck, HelpCircle, XCircle, Clock } from "lucide-react"

export type SponsorStatus = 
  | "Can Sponsor Now"
  | "Can Sponsor After 12 Months"
  | "No Sponsorship"
  | "Active Sponsor (Verified)"
  | "Active Sponsor (Register Match)"
  | "Potential Sponsor (Post 12 Months)"
  | "No Sponsorship Data"
  | "Confirmed Non-Sponsor"

interface VisaBadgeProps {
  status: SponsorStatus | string
  className?: string
  showLabel?: boolean
}

export function VisaBadge({ status, className = "", showLabel = true }: VisaBadgeProps) {
  let details = {
    colorInfo: "bg-slate-100 text-slate-700 border-slate-200",
    icon: HelpCircle,
    label: status === "No Sponsorship Data" ? "Sponsorship Unverified" : status,
    tooltip: "We don't have enough data to determine if this company sponsors Tier 2 visas."
  }

  // Determine styles and config based on status
  switch (status) {
    case "Can Sponsor Now":
    case "Active Sponsor (Verified)":
    case "Active Sponsor (Register Match)":
      details = {
        colorInfo: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
        icon: ShieldCheck,
        label: "Can Sponsor Now",
        tooltip: "This company is currently active on the UK Register of Sponsors and verified to sponsor Tier 2 visas.",
      }
      break
    case "Can Sponsor After 12 Months":
    case "Potential Sponsor (Post 12 Months)":
      details = {
        colorInfo: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock,
        label: "Can Sponsor After 12 Months",
        tooltip: "This company has sponsored recently but currently requires additional time or verification to sponsor new roles.",
      }
      break
    case "No Sponsorship":
    case "Confirmed Non-Sponsor":
      details = {
        colorInfo: "bg-rose-50 text-rose-700 border-rose-200",
        icon: XCircle,
        label: "No Sponsorship",
        tooltip: "This company has explicitly stated they do not provide visa sponsorship.",
      }
      break
    case "No Sponsorship Data":
    default:
      // default is already set
      break
  }

  const Icon = details.icon

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-md font-semibold border transition-all hover:shadow-md cursor-help ${details.colorInfo} ${className}`}
      title={details.tooltip}
    >
      <Icon className="h-4 w-4" />
      {showLabel && <span>{details.label}</span>}
    </div>
  )
}

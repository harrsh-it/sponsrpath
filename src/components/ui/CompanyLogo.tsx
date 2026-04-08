"use client"

import { useState } from "react"

interface CompanyLogoProps {
  logoUrl?: string | null
  companyName: string
  className?: string
  textClassName?: string
}

export function CompanyLogo({ logoUrl, companyName, className = "", textClassName = "" }: CompanyLogoProps) {
  const [error, setError] = useState(false)
  const initials = companyName.substring(0, 2).toUpperCase()

  if (logoUrl && !error) {
    return (
      <img
        src={logoUrl}
        alt={companyName}
        className={`w-full h-full object-cover ${className}`}
        onError={() => setError(true)}
      />
    )
  }

  return (
    <div className={`w-full h-full flex items-center justify-center bg-navy text-white font-black font-heading ${textClassName}`}>
      {initials}
    </div>
  )
}

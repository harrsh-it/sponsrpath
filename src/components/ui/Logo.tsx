"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "navy" | "teal" | "white" | "dark"
  showText?: boolean
  className?: string
  textClassName?: string
}

export function Logo({ 
  size = "md", 
  variant = "navy", 
  showText = true, 
  className = "",
  textClassName = ""
}: LogoProps) {
  
  const sizeMap = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 40, text: "text-3xl" },
    xl: { icon: 56, text: "text-5xl" },
  }

  const { icon: iconSize, text: textSize } = sizeMap[size]

  const colorMap = {
    navy: "text-[#06507c]",
    teal: "text-teal",
    white: "text-white",
    dark: "text-navy"
  }

  const textColor = colorMap[variant]

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2 group transition-all active:scale-95 ${className}`}
    >
      <div className={`relative shrink-0 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow ${size === 'sm' ? 'p-0.5' : 'p-1'}`}>
        <Image
          src="/logo-mark.png"
          alt="Sponsrpath Logo"
          width={iconSize}
          height={iconSize}
          className="object-contain"
        />
      </div>
      
      {showText && (
        <span className={`${textSize} font-heading font-black tracking-tight ${textColor} group-hover:brightness-110 transition-all ${textClassName}`}>
          Sponsrpath
        </span>
      )}
    </Link>
  )
}

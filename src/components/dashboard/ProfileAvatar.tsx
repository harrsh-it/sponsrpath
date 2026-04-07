"use client"

import { useState } from "react"
import { User } from "lucide-react"
import Image from "next/image"

interface ProfileAvatarProps {
  imageUrl: string | null
  name: string
  className?: string
}

export default function ProfileAvatar({ imageUrl, name, className = "" }: ProfileAvatarProps) {
  const [error, setError] = useState(false)

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={`rounded-[2rem] bg-linear-to-br from-navy to-teal border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative group ${className}`}>
      {imageUrl && !error ? (
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white tracking-tighter">
                {initials}
            </span>
        </div>
      )}
    </div>
  )
}

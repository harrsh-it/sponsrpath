"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

interface SalarySliderProps {
  min: number
  max: number
  step: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
}

export function SalarySlider({
  min, max, step, value, onValueChange
}: SalarySliderProps) {
  
  // Format to e.g. "£45k"
  const formatSalary = (val: number) => {
    return `£${(val / 1000)}k`
  }

  return (
    <div className="w-full relative py-6">
      {/* Visual tooltips for current min/max */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Minimum</span>
          <span className="text-2xl font-heading font-bold text-navy">{formatSalary(value[0])}</span>
        </div>
        <div className="h-px w-8 bg-slate-300 mx-4"></div>
        <div className="flex flex-col text-right">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Maximum</span>
          <span className="text-2xl font-heading font-bold text-navy">{formatSalary(value[1])}</span>
        </div>
      </div>

      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center shadow-sm"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onValueChange as (value: number[]) => void}
        aria-label="Salary range"
      >
        <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-slate-100 border border-slate-200/50">
          <SliderPrimitive.Range className="absolute h-full bg-amber shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
        </SliderPrimitive.Track>
        
        {value.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-6 w-6 rounded-full border-2 border-amber bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 shadow-md cursor-grab active:cursor-grabbing z-10"
          />
        ))}
      </SliderPrimitive.Root>
      
      <div className="flex justify-between mt-3 text-xs font-medium text-slate-400">
        <span>{formatSalary(min)}</span>
        <span>{formatSalary(max)}</span>
      </div>
    </div>
  )
}

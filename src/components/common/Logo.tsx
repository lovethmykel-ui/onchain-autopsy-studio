'use client'

import React from 'react'

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export default function Logo({ size = 32, showText = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* High-Precision Split Ring Aperture Logo Matching Reference Image */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-transform duration-300 hover:scale-105"
      >
        {/* Top Semi-Ring Arc (Split at 12 o'clock and 6 o'clock) */}
        <path 
          d="M 52 8 A 42 42 0 0 1 92 48 L 74 48 A 24 24 0 0 0 52 26 Z M 48 8 L 48 26 A 24 24 0 0 0 26 48 L 8 48 A 42 42 0 0 1 48 8 Z" 
          fill="#D1D5DB" 
        />
        
        {/* Bottom Semi-Ring Arc */}
        <path 
          d="M 92 52 A 42 42 0 0 1 52 92 L 52 74 A 24 24 0 0 0 74 52 Z M 26 52 A 24 24 0 0 0 48 74 L 48 92 A 42 42 0 0 1 8 52 Z" 
          fill="#9CA3AF" 
        />

        {/* Inner Thin White Circle Accent */}
        <circle cx="50" cy="50" r="21" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.85" />

        {/* Center Dark Red Dot */}
        <circle cx="50" cy="50" r="9.5" fill="#991B1B" />
        <circle cx="50" cy="50" r="6" fill="#DC2626" opacity="0.9" />
      </svg>

      {showText && (
        <div className="leading-none">
          <div className="text-[13px] sm:text-[14px] font-black tracking-[1.2px] text-white font-heading">ONCHAIN</div>
          <div className="text-[8px] sm:text-[8.5px] font-bold tracking-[2px] text-text-muted mt-1 font-heading">AUTOPSY STUDIO</div>
        </div>
      )}
    </div>
  )
}

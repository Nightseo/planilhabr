/**
 * PlanilhaBR Logo Component
 * Custom SVG icon with Brazilian green/yellow theme
 */

import React from 'react'

interface PlanilhaBRLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'light' | 'dark' | 'auto'
}

// Custom SVG Icon - Document/spreadsheet inside circle
function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
      aria-label="PlanilhaBR"
      role="img"
    >
      {/* Circle background */}
      <circle cx="24" cy="24" r="23" fill="#059669" />

      {/* Document shape with folded corner */}
      <path
        d="M14 10C14 9.44772 14.4477 9 15 9H26L33 16V38C33 38.5523 32.5523 39 32 39H15C14.4477 39 14 38.5523 14 38V10Z"
        fill="white"
      />
      {/* Folded corner */}
      <path
        d="M26 9V15C26 15.5523 26.4477 16 27 16H33"
        fill="#dcfce7"
      />

      {/* Spreadsheet grid inside */}
      <rect x="17" y="19" width="13" height="2.5" rx="0.5" fill="#059669" />
      <rect x="17" y="23" width="5.5" height="2.5" rx="0.5" fill="#FBBF24" />
      <rect x="24.5" y="23" width="5.5" height="2.5" rx="0.5" fill="#e5e7eb" />
      <rect x="17" y="27" width="5.5" height="2.5" rx="0.5" fill="#e5e7eb" />
      <rect x="24.5" y="27" width="5.5" height="2.5" rx="0.5" fill="#FBBF24" />
      <rect x="17" y="31" width="5.5" height="2.5" rx="0.5" fill="#e5e7eb" />
      <rect x="24.5" y="31" width="5.5" height="2.5" rx="0.5" fill="#e5e7eb" />
    </svg>
  )
}

export default function PlanilhaBRLogo({
  className = '',
  size = 'md',
  showText = true,
  variant = 'auto'
}: PlanilhaBRLogoProps) {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 36,
    xl: 44
  }

  const textSizeMap = {
    sm: 'text-[14px]',
    md: 'text-[16px]',
    lg: 'text-[18px]',
    xl: 'text-[20px]'
  }

  const pixelSize = sizeMap[size]
  const textSize = textSizeMap[size]

  // Determine text colors based on variant
  const getTextColors = () => {
    if (variant === 'dark') {
      return {
        planilha: 'text-white',
        br: 'bg-gradient-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent'
      }
    }
    return {
      planilha: 'text-green-900',
      br: 'bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent'
    }
  }

  const colors = getTextColors()

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon size={pixelSize} />

      {showText && (
        <div className={`font-bold ${textSize} tracking-tight`}>
          <span className={colors.planilha}>Planilha</span>
          <span className={colors.br}>BR</span>
        </div>
      )}
    </div>
  )
}

export function PlanilhaBRIcon({
  className = '',
  size = 32
}: {
  className?: string
  size?: number
}) {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      <LogoIcon size={size} />
    </div>
  )
}

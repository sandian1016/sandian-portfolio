import type { ReactNode } from 'react'
import { BorderGlow } from './border-glow'

type GlowCardProps = {
  children: ReactNode
  className?: string
  radius?: number
  tone?: 'dark' | 'light'
  compact?: boolean
}

export function GlowCard({
  children,
  className = '',
  radius = 24,
  tone = 'dark',
  compact = false,
}: GlowCardProps) {
  const light = tone === 'light'

  return (
    <BorderGlow
      className={className}
      backgroundColor={light ? '#ffffff' : '#101116'}
      borderRadius={radius}
      edgeSensitivity={compact ? 36 : 30}
      glowColor={light ? '201 94 58' : '198 88 70'}
      glowRadius={compact ? 16 : 24}
      glowIntensity={light ? 0.42 : 0.52}
      coneSpread={compact ? 16 : 20}
      colors={
        light
          ? ['rgba(0, 85, 255, 0.9)', 'rgba(0, 85, 255, 0.62)', 'rgba(0, 85, 255, 0.3)']
          : ['rgba(0, 85, 255, 0.9)', 'rgba(0, 85, 255, 0.62)', 'rgba(0, 85, 255, 0.3)']
      }
      fillOpacity={light ? 0.07 : 0.12}
    >
      {children}
    </BorderGlow>
  )
}

import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useRef,
} from 'react'
import './border-glow.css'

type GlowStyle = CSSProperties & Record<`--${string}`, string | number>

type BorderGlowProps = {
  children: ReactNode
  className?: string
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  colors?: string[]
  fillOpacity?: number
}

const gradientPositions = [
  '80% 55%',
  '69% 34%',
  '8% 6%',
  '41% 38%',
  '86% 85%',
  '82% 18%',
  '51% 4%',
]
const gradientKeys = [
  '--gradient-one',
  '--gradient-two',
  '--gradient-three',
  '--gradient-four',
  '--gradient-five',
  '--gradient-six',
  '--gradient-seven',
] as const
const colorMap = [0, 1, 2, 0, 1, 2, 1]

function parseHsl(value: string) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 210, s: 100, l: 72 }
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) }
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHsl(glowColor)
  const opacities = [100, 60, 50, 40, 30, 20, 10]
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10']
  const vars: GlowStyle = {}

  opacities.forEach((opacity, index) => {
    vars[`--glow-color${keys[index]}`] =
      `hsl(${h}deg ${s}% ${l}% / ${Math.min(opacity * intensity, 100)}%)`
  })

  return vars
}

function buildGradientVars(colors: string[]) {
  const vars: GlowStyle = {}
  gradientPositions.forEach((position, index) => {
    const color = colors[Math.min(colorMap[index], colors.length - 1)]
    vars[gradientKeys[index]] = `radial-gradient(at ${position}, ${color} 0px, transparent 50%)`
  })
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`
  return vars
}

export function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 28,
  glowColor = '205 100 72',
  backgroundColor = '#0d0e12',
  borderRadius = 24,
  glowRadius = 30,
  glowIntensity = 0.52,
  coneSpread = 22,
  colors = ['#64CEFB', '#6FA8FF', '#B6C8D8'],
  fillOpacity = 0.18,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const deltaX = x - centerX
    const deltaY = y - centerY

    const scaleX = deltaX === 0 ? Number.POSITIVE_INFINITY : centerX / Math.abs(deltaX)
    const scaleY = deltaY === 0 ? Number.POSITIVE_INFINITY : centerY / Math.abs(deltaY)
    const edge = Math.min(Math.max(1 / Math.min(scaleX, scaleY), 0), 1)
    let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI + 90
    if (angle < 0) angle += 360

    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3))
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`)
  }, [])

  const style: GlowStyle = {
    '--card-bg': backgroundColor,
    '--edge-sensitivity': edgeSensitivity,
    '--border-radius': `${borderRadius}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': coneSpread,
    '--fill-opacity': fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={style}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}

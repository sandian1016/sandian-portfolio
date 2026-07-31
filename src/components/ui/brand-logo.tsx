import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

type BrandLogoProps = {
  large?: boolean
  light?: boolean
  className?: string
}

export function BrandLogo({ large = false, light = false, className = '' }: BrandLogoProps) {
  const reduceMotion = useReducedMotion()
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness: 300, damping: 20, mass: 0.4 })
  const y = useSpring(targetY, { stiffness: 300, damping: 20, mass: 0.4 })
  const rotateX = useTransform(y, [-5, 5], [8, -8])
  const rotateY = useTransform(x, [-5, 5], [-8, 8])

  const resetPosition = () => {
    targetX.set(0)
    targetY.set(0)
  }

  return (
    <motion.span
      className={`group/logo relative grid shrink-0 place-items-center overflow-hidden rounded-[11px] ${
        large ? 'h-14 w-14' : 'h-10 w-10'
      } ${light ? 'drop-shadow-[0_8px_18px_rgba(47,105,255,0.16)]' : 'drop-shadow-[0_8px_20px_rgba(47,105,255,0.24)]'} ${className}`}
      style={{ x, y, rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 700 }}
      whileHover={reduceMotion ? undefined : { scale: 1.1, rotate: [0, -6, 5, -2, 0], y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.9, rotate: -6 }}
      transition={{ type: 'spring', stiffness: 360, damping: 18 }}
      onPointerMove={(event) => {
        if (reduceMotion) return
        const rect = event.currentTarget.getBoundingClientRect()
        const normalizedX = (event.clientX - rect.left) / rect.width - 0.5
        const normalizedY = (event.clientY - rect.top) / rect.height - 0.5
        targetX.set(normalizedX * 8)
        targetY.set(normalizedY * 8)
      }}
      onPointerLeave={resetPosition}
      aria-hidden="true"
    >
      <motion.img
        src="/assets/sandian-logo.svg"
        alt=""
        draggable={false}
        className="h-full w-full select-none"
        animate={
          large && !reduceMotion
            ? {
                y: [0, -4, 0],
                rotate: [-3, 3, -3],
                scale: [1, 1.04, 1],
              }
            : undefined
        }
        transition={
          large && !reduceMotion
            ? {
                duration: 2.4,
                ease: 'easeInOut',
                repeat: Infinity,
              }
            : undefined
        }
      />
      <span className="pointer-events-none absolute inset-y-[-30%] left-[-70%] w-5 rotate-[18deg] bg-white/55 blur-[5px] transition-transform duration-700 ease-out group-hover/logo:translate-x-[570%]" />
    </motion.span>
  )
}

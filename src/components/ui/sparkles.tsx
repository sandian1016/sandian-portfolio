import Particles, { ParticlesProvider } from '@tsparticles/react'
import type { Container, Engine } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'
import { motion, useAnimation } from 'framer-motion'
import { useCallback, useId, useMemo } from 'react'

type SparklesCoreProps = {
  id?: string
  className?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

export function SparklesCore({
  id,
  className = '',
  minSize = 0.4,
  maxSize = 1.2,
  speed = 2.2,
  particleColor = '#ffffff',
  particleDensity = 520,
}: SparklesCoreProps) {
  const controls = useAnimation()
  const generatedId = useId()
  const initializeParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo(
    () => ({
      background: { color: { value: '#00000000' }, opacity: 0 },
      fullScreen: { enable: false, zIndex: 1 },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onClick: { enable: false, mode: 'push' },
          onHover: { enable: false, mode: 'repulse' },
          resize: { enable: true, delay: 0.5 },
        },
      },
      particles: {
        color: { value: particleColor },
        collisions: { enable: false },
        links: { enable: false },
        move: {
          enable: true,
          direction: 'none' as const,
          random: true,
          speed: { min: 0.08, max: 0.42 },
          straight: false,
          outModes: { default: 'out' as const },
        },
        number: {
          density: { enable: true, width: 720, height: 160 },
          value: particleDensity,
        },
        opacity: {
          value: { min: 0.08, max: 0.92 },
          animation: {
            enable: true,
            speed,
            sync: false,
            startValue: 'random' as const,
            mode: 'auto' as const,
          },
        },
        shape: { type: 'circle' },
        size: { value: { min: minSize, max: maxSize } },
      },
    }),
    [maxSize, minSize, particleColor, particleDensity, speed],
  )

  const handleLoaded = useCallback(async (container?: Container) => {
    if (!container) return
    await controls.start({ opacity: 1, transition: { duration: 1.1 } })
  }, [controls])

  return (
    <motion.div animate={controls} initial={{ opacity: 0 }} className={className}>
      <ParticlesProvider init={initializeParticles}>
        <Particles id={id ?? generatedId} className="h-full w-full" options={options} particlesLoaded={handleLoaded} />
      </ParticlesProvider>
    </motion.div>
  )
}

export function HeroSparkles() {
  return (
    <div className="pointer-events-none relative h-24 w-[min(86vw,44rem)] overflow-hidden sm:h-28 md:h-32" aria-hidden="true">
      <div className="absolute inset-x-[10%] top-2 h-px bg-gradient-to-r from-transparent via-sky-300/90 to-transparent" />
      <div className="absolute inset-x-[19%] top-1 h-[4px] bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent blur-[5px]" />
      <div className="absolute inset-x-[36%] top-0 h-[8px] bg-sky-300/35 blur-lg" />

      <SparklesCore
        id="hero-sparkles"
        className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_82%_115%_at_50%_0%,black_12%,transparent_82%)]"
        minSize={0.35}
        maxSize={1.05}
        particleDensity={620}
        particleColor="#e7f7ff"
        speed={1.8}
      />
    </div>
  )
}

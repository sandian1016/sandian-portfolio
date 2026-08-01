import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ChevronDown, Menu, X } from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import Galaxy from './components/Galaxy'
import { AboutSection } from './components/ui/about-section'
import { BrandLogo } from './components/ui/brand-logo'
import { Footer } from './components/ui/footer-section'
import { HomeProjectShowcase } from './components/ui/home-project-showcase'
import { ProjectMenuPanel } from './components/ui/navbar-menu'
import { ProjectExperiencePage } from './components/ui/project-experience-page'
import {
  ProjectShowcaseLab,
  type ShowcaseVariant,
} from './components/ui/project-showcase-lab'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4'
const MOBILE_VIDEO_URL = '/media/hero-mobile.mp4'
const VIDEO_POSTER_URL = '/media/hero-poster.webp'

const BACKGROUND_HOLD_MS = 9000
const BACKGROUND_FADE_MS = 1600
const PROJECT_ENTRY_EASE = [0.22, 1, 0.36, 1] as const

const navItems = [
  { label: '主页', href: '#home' },
  { label: '项目分类', href: '#projects' },
  { label: '个人简介', href: '#about' },
  { label: '联系方式', href: '#contact' },
]

function TitleGlow({ children }: { children: string }) {
  return (
    <motion.span
      className="inline-block text-white"
      animate={{
        textShadow: [
          '0 0 18px rgba(255,255,255,0.10), 0 0 42px rgba(100,206,251,0.08)',
          '0 0 24px rgba(255,255,255,0.22), 0 0 58px rgba(100,206,251,0.17)',
          '0 0 18px rgba(255,255,255,0.10), 0 0 42px rgba(100,206,251,0.08)',
        ],
      }}
      transition={{
        duration: 4.2,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  )
}

function OpeningSequence({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.025,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,206,251,0.10),transparent_34%)]" />
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ scale: 0.72, rotate: -22 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrandLogo large />
            </motion.div>

            <motion.p
              className="mt-5 text-sm font-bold tracking-[0.18em] text-white"
              initial={{ opacity: 0, letterSpacing: '0.32em' }}
              animate={{ opacity: 1, letterSpacing: '0.18em' }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Sandian design
            </motion.p>
            <span className="mt-5 h-[3px] w-52 overflow-hidden rounded-full bg-white/[0.10] sm:w-60">
              <motion.span
                className="block h-full origin-left rounded-full bg-gradient-to-r from-[#64CEFB] via-white to-[#B8F1FF] shadow-[0_0_14px_rgba(100,206,251,0.82)]"
                initial={{ scaleX: 0, opacity: 0.65 }}
                animate={{ scaleX: [0, 0.22, 0.48, 0.72, 0.9, 1], opacity: [0.65, 1, 1, 1, 1, 0.95] }}
                transition={{
                  duration: 1.3,
                  delay: 0.18,
                  times: [0, 0.18, 0.42, 0.67, 0.86, 1],
                  ease: 'easeInOut',
                }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ProjectPageEntrance({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 42,
              filter: 'blur(10px)',
              clipPath: 'inset(7% 0 0 0 round 18px)',
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        clipPath: 'inset(0% 0 0 0 round 0px)',
      }}
      transition={{
        duration: reduceMotion ? 0 : 1.2,
        delay: reduceMotion ? 0 : 0.12,
        ease: PROJECT_ENTRY_EASE,
      }}
    >
      {children}
    </motion.div>
  )
}

function Brand({ homeHref = '#home', light = false }: { homeHref?: string; light?: boolean }) {
  return (
    <a href={homeHref} className="group flex shrink-0 items-center gap-3" aria-label="Sandian design home">
      <BrandLogo light={light} />
      <span className={`text-sm font-bold tracking-tight ${light ? 'text-[#173149]' : 'text-white'}`}>Sandian design</span>
    </a>
  )
}

function Navigation({ standalone = false, lightGlass = false }: { standalone?: boolean; lightGlass?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectMenuOpen, setProjectMenuOpen] = useState(false)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 48)
  const standardNavItems = navItems.slice(0, -1)
  const contactItem = navItems[navItems.length - 1]
  const resolveHref = (href: string) => (standalone ? `/${href}` : href)
  const closeMobileMenu = () => {
    setMenuOpen(false)
    setMobileProjectsOpen(false)
  }

  useEffect(() => {
    let frameId = 0

    const updateNavigationWidth = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48)
      })
    }

    updateNavigationWidth()
    window.addEventListener('scroll', updateNavigationWidth, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateNavigationWidth)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-5 pt-4 sm:px-8 md:pt-5 lg:px-10">
      <motion.div
        className="mx-auto w-full"
        initial={false}
        animate={{ maxWidth: scrolled ? 1200 : 980 }}
        transition={{ type: 'spring', stiffness: 170, damping: 24, mass: 0.72 }}
      >
        <div
          className={`flex h-[72px] items-center justify-between rounded-[22px] border px-4 backdrop-blur-[28px] backdrop-saturate-[175%] sm:px-6 ${
            lightGlass
              ? 'border-white/70 bg-white/42 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_18px_54px_rgba(45,86,118,0.16)]'
              : 'border-white/[0.16] bg-[#17151f]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_18px_60px_rgba(0,0,0,0.24)]'
          }`}
        >
          <Brand homeHref={resolveHref('#home')} light={lightGlass} />

          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary navigation">
            {standardNavItems.map((item) =>
              item.href === '#projects' ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setProjectMenuOpen(true)}
                  onMouseLeave={() => setProjectMenuOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setProjectMenuOpen((open) => !open)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      lightGlass
                        ? projectMenuOpen
                          ? 'bg-white/55 text-[#102235]'
                          : 'text-[#173149]/65 hover:bg-white/45 hover:text-[#102235]'
                        : projectMenuOpen
                          ? 'bg-white/[0.07] text-white'
                          : 'text-white/55 hover:bg-white/[0.06] hover:text-white'
                    }`}
                    aria-expanded={projectMenuOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${projectMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {projectMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.985 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-[-12rem] top-[calc(100%+14px)] pt-2"
                      >
                        <ProjectMenuPanel
                          theme={lightGlass ? 'light' : 'dark'}
                          onNavigate={() => setProjectMenuOpen(false)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={resolveHref(item.href)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    lightGlass
                      ? 'text-[#173149]/65 hover:bg-white/45 hover:text-[#102235]'
                      : 'text-white/55 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ),
            )}
            <a
              href={resolveHref(contactItem.href)}
              className={`ml-2 rounded-[14px] px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                lightGlass
                  ? 'border border-white/75 bg-white/90 text-[#102235] shadow-[0_10px_30px_rgba(61,98,126,0.16)] hover:bg-white'
                  : 'bg-white text-[#111016] shadow-[0_8px_26px_rgba(255,255,255,0.08)] hover:bg-white/90'
              }`}
            >
              {contactItem.label}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`grid h-11 w-11 place-items-center rounded-[14px] border transition-colors duration-300 lg:hidden ${
              lightGlass
                ? 'border-[#173149]/15 bg-white/38 text-[#102235] hover:bg-white/60'
                : 'border-white/15 bg-white/[0.06] text-white hover:bg-white/10'
            }`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className={`absolute left-5 right-5 top-[6.25rem] max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-[22px] border border-white/20 p-3 shadow-2xl backdrop-blur-2xl sm:left-8 sm:right-8 lg:hidden ${
              lightGlass ? 'bg-[#173149]/88' : 'bg-[#17151f]/95'
            }`}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) =>
              item.href === '#projects' ? (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() => setMobileProjectsOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                    aria-expanded={mobileProjectsOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${mobileProjectsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileProjectsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ProjectMenuPanel compact theme="dark" onNavigate={closeMobileMenu} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={resolveHref(item.href)}
                  onClick={closeMobileMenu}
                  className="block rounded-2xl px-4 py-3 text-sm text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function HeroBackground() {
  const [scene, setScene] = useState<'video' | 'galaxy'>('galaxy')
  const [galaxyActive, setGalaxyActive] = useState(true)
  const [mobileViewport, setMobileViewport] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const videoRef = useRef<HTMLVideoElement>(null)
  const transitionTimerRef = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handleViewportChange = () => setMobileViewport(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.load()

    const tryPlay = () => {
      void video.play().catch(() => undefined)
    }

    tryPlay()
    window.addEventListener('touchstart', tryPlay, { once: true, passive: true })
    window.addEventListener('pointerdown', tryPlay, { once: true, passive: true })

    return () => {
      window.removeEventListener('touchstart', tryPlay)
      window.removeEventListener('pointerdown', tryPlay)
    }
  }, [mobileViewport])

  useEffect(() => {
    if (reduceMotion) return

    const sceneTimer = window.setTimeout(() => {
      if (scene === 'video') {
        setGalaxyActive(true)
        setScene('galaxy')
        transitionTimerRef.current = window.setTimeout(() => {
          videoRef.current?.pause()
        }, BACKGROUND_FADE_MS)
      } else {
        void videoRef.current?.play().catch(() => undefined)
        setScene('video')
        transitionTimerRef.current = window.setTimeout(() => {
          setGalaxyActive(false)
        }, BACKGROUND_FADE_MS)
      }
    }, BACKGROUND_HOLD_MS)

    return () => window.clearTimeout(sceneTimer)
  }, [reduceMotion, scene])

  useEffect(
    () => () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current)
      }
    },
    [],
  )

  return (
    <div className="absolute inset-0 bg-black" aria-hidden="true">
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-[cubic-bezier(0.45,0,0.15,1)] will-change-[opacity] ${
          scene === 'video' ? 'opacity-100' : 'opacity-0'
        }`}
        src={mobileViewport ? MOBILE_VIDEO_URL : VIDEO_URL}
        poster={VIDEO_POSTER_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => void videoRef.current?.play().catch(() => undefined)}
        onError={() => {
          setGalaxyActive(true)
          setScene('galaxy')
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.45,0,0.15,1)] will-change-[opacity] ${
          scene === 'galaxy' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Galaxy
          active={galaxyActive && !reduceMotion}
          mouseInteraction={!mobileViewport}
          mouseRepulsion
          density={mobileViewport ? 0.72 : 1}
          glowIntensity={mobileViewport ? 0.25 : 0.3}
          saturation={0.5}
          hueShift={180}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          transparent={false}
        />
      </div>
    </div>
  )
}

function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const aboutPreviewMode = searchParams.get('aboutPreview') === '1'
  const bgProductMode = searchParams.get('page') === 'bg-product'
  const projectExperienceMode = searchParams.get('page') === 'experience'
  const projectPreviewParam = searchParams.get('projectPreview')
  const projectPreviewMode = projectPreviewParam === '1' || projectPreviewParam === '2' || projectPreviewParam === '3'
  const projectPreviewVariant: ShowcaseVariant =
    projectPreviewParam === '2' ? 'stage' : projectPreviewParam === '3' ? 'archive' : 'atlas'
  const [introVisible, setIntroVisible] = useState(!aboutPreviewMode)
  const heroRef = useRef<HTMLElement>(null)
  const reducePageMotion = useReducedMotion()
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroContentY = useTransform(heroScrollProgress, [0, 1], [0, -92])
  const heroContentScale = useTransform(heroScrollProgress, [0, 0.72, 1], [1, 0.985, 0.96])
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.58, 1], [1, 0.78, 0.16])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.085,
      wheelMultiplier: 0.9,
      overscroll: false,
      anchors: {
        offset: -104,
      },
    })

    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    const shouldReturnHome = window.location.hash === '' || window.location.hash === '#home'
    if (!shouldReturnHome) return

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    const returnToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    returnToTop()
    const animationFrame = window.requestAnimationFrame(returnToTop)
    const timer = window.setTimeout(returnToTop, 80)
    window.addEventListener('pageshow', returnToTop)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(timer)
      window.removeEventListener('pageshow', returnToTop)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useEffect(() => {
    if (aboutPreviewMode) return
    const timer = window.setTimeout(() => setIntroVisible(false), 1550)
    return () => window.clearTimeout(timer)
  }, [aboutPreviewMode])

  if (aboutPreviewMode) {
    return (
      <main className="min-h-screen bg-black font-sans text-white">
        <Navigation />
        <div className="h-[92px] bg-[#08080b] md:h-[96px]" aria-hidden="true" />
        <AboutSection previewMode />
      </main>
    )
  }

  if (bgProductMode) {
    window.location.replace('/#projects')
    return null
  }

  if (projectPreviewMode) {
    return (
      <main className="min-h-screen bg-black font-sans text-white">
        <Navigation />
        <ProjectPageEntrance>
          <div className="h-[92px] bg-[#08080b] md:h-[96px]" aria-hidden="true" />
          <ProjectShowcaseLab initialVariant={projectPreviewVariant} />
        </ProjectPageEntrance>
      </main>
    )
  }

  if (projectExperienceMode) {
    return (
      <main className="min-h-screen bg-black font-sans text-white">
        <Navigation standalone />
        <ProjectPageEntrance>
          <ProjectExperiencePage />
        </ProjectPageEntrance>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black font-sans text-white">
      <OpeningSequence visible={introVisible} />
      <Navigation />

      <section ref={heroRef} id="home" className="relative h-screen min-h-[680px] overflow-hidden bg-black">
        <HeroBackground />
        <div className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45)_0%,transparent_32%,rgba(0,0,0,0.2)_72%,rgba(0,0,0,0.58)_100%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1920px] flex-col px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="h-[92px] shrink-0 md:h-[96px]" aria-hidden="true" />

          <motion.div
            style={
              reducePageMotion
                ? undefined
                : { y: heroContentY, scale: heroContentScale, opacity: heroContentOpacity }
            }
            className="flex flex-1 flex-col items-center justify-center pb-14 text-center will-change-transform sm:pb-16 md:pb-20"
          >
          <motion.h1
            initial={{ opacity: 0.08, y: 30, scale: 0.975, filter: 'blur(16px)' }}
            animate={
              introVisible
                ? { opacity: 0.08, y: 30, scale: 0.975, filter: 'blur(16px)' }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-yahei whitespace-nowrap text-[clamp(2.75rem,9vw,11rem)] font-bold leading-[0.85] tracking-[clamp(1px,0.2vw,4px)] text-white"
          >
            <TitleGlow>UIUX作品集</TitleGlow>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={
              introVisible
                ? { opacity: 0, y: 14, filter: 'blur(8px)' }
                : { opacity: 0.8, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 1.05, delay: introVisible ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="font-alimama mt-7 text-xs font-bold uppercase tracking-[0.22em] text-white/80 md:mt-9 md:text-sm"
          >
            UI/UX Design Portfolio
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={
              introVisible
                ? { opacity: 0, y: 20, filter: 'blur(10px)' }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
            }
            transition={{ duration: 1.05, delay: introVisible ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="font-yahei relative top-10 mt-3 flex items-center gap-6 md:top-14 md:mt-4 md:gap-8"
          >
            <a
              href="#projects"
              className="rounded-[15px] bg-white px-7 py-4 text-sm font-semibold text-[#111016] shadow-[0_10px_30px_rgba(255,255,255,0.09)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              开始预览
            </a>
            <a
              href="#about"
              className="rounded-[15px] border border-white/[0.12] bg-[#1a1821]/75 px-7 py-4 text-sm font-semibold text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
            >
              了解更多
            </a>
          </motion.div>
          </motion.div>
        </div>
      </section>

      <AboutSection />
      <HomeProjectShowcase />
      <Footer />
    </main>
  )
}

export default App

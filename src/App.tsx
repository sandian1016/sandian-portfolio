import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Menu, X } from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import Galaxy from './components/Galaxy'
import { AigcProjectPage } from './components/ui/aigc-project-page'
import { AboutSection } from './components/ui/about-section'
import { BrandLogo } from './components/ui/brand-logo'
import { Footer } from './components/ui/footer-section'
import { HeroCarousel } from './components/ui/hero-carousel'
import { HomeProjectShowcase } from './components/ui/home-project-showcase'
import { MobileProjectPage } from './components/ui/mobile-project-page'
import { ProjectExperiencePage } from './components/ui/project-experience-page'
import {
  ProjectShowcaseLab,
  type ShowcaseVariant,
} from './components/ui/project-showcase-lab'
import { WebProjectPage } from './components/ui/web-project-page'
import { VisualizationProjectPage } from './components/ui/visualization-project-page'

const PROJECT_ENTRY_EASE = [0.22, 1, 0.36, 1] as const
const OPENING_SEQUENCE_SESSION_KEY = 'sandian-opening-sequence-seen'

function hasSeenOpeningSequence() {
  try {
    return window.sessionStorage.getItem(OPENING_SEQUENCE_SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

const navItems = [
  { label: '主页', href: '#home' },
  { label: '移动端', href: '/?page=mobile-project' },
  { label: 'WEB端', href: '/?page=web-project' },
  { label: '可视化', href: '/?page=visualization-project' },
  { label: 'AIGC设计', href: '/?page=aigc-project' },
  { label: '个人简介', href: '#about' },
  { label: '联系方式', href: '#contact' },
]

function TitleGlow({ children }: { children: string }) {
  return (
    <motion.span
      className="inline-block text-white"
      animate={{
        textShadow: [
          '0 0 18px rgba(255,255,255,0.10), 0 0 42px rgba(0,85,255,0.08)',
          '0 0 24px rgba(255,255,255,0.22), 0 0 58px rgba(0,85,255,0.17)',
          '0 0 18px rgba(255,255,255,0.10), 0 0 42px rgba(0,85,255,0.08)',
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,85,255,0.10),transparent_34%)]" />
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
                className="block h-full origin-left rounded-full bg-gradient-to-r from-brand via-white to-brand/50 shadow-[0_0_14px_rgba(0,85,255,0.55)]"
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
        duration: reduceMotion ? 0 : 0.82,
        delay: reduceMotion ? 0 : 0.06,
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

function Navigation({ standalone = false, lightGlass: preferLightGlass = false }: { standalone?: boolean; lightGlass?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 48)
  const [overDarkSection, setOverDarkSection] = useState(false)
  const lightGlass = preferLightGlass && !overDarkSection
  const standardNavItems = navItems.slice(0, -1)
  const contactItem = navItems[navItems.length - 1]
  const resolveHref = (href: string) => (standalone && href.startsWith('#') ? `/${href}` : href)
  const mobileLinkClass = lightGlass
    ? 'text-[#173149]/76 hover:bg-[#eaf6fc] hover:text-[#0b1f33]'
    : 'text-white/80 hover:bg-white/10 hover:text-white'
  const closeMobileMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    let frameId = 0

    const updateNavigationWidth = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48)
        if (preferLightGlass) {
          const overDark = ['about', 'projects', 'contact'].some(id => {
            const section = document.getElementById(id)
            if (!section) return false
            const bounds = section.getBoundingClientRect()
            return bounds.top <= 92 && bounds.bottom > 20
          })
          setOverDarkSection(current => current === overDark ? current : overDark)
        }
      })
    }

    updateNavigationWidth()
    window.addEventListener('scroll', updateNavigationWidth, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateNavigationWidth)
    }
  }, [preferLightGlass])

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
            {standardNavItems.map((item) => (
              <a
                key={item.href}
                href={resolveHref(item.href)}
                className={`whitespace-nowrap rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
                  lightGlass
                    ? 'text-[#173149]/65 hover:bg-white/45 hover:text-[#102235]'
                    : 'text-white/55 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
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
            className={`absolute left-5 right-5 top-[6.25rem] max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-[22px] p-3 backdrop-blur-2xl sm:left-8 sm:right-8 lg:hidden ${
              lightGlass
                ? 'border border-white/70 bg-white/92 shadow-[0_20px_60px_rgba(39,94,126,0.18)]'
                : 'border border-white/20 bg-[#17151f]/95 shadow-2xl'
            }`}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={resolveHref(item.href)}
                onClick={closeMobileMenu}
                className={`block rounded-2xl px-4 py-3 text-sm transition-colors duration-300 ${mobileLinkClass}`}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function HeroBackground() {
  const [mobileViewport, setMobileViewport] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handleViewportChange = () => setMobileViewport(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [])

  return (
    <div className="absolute inset-0 bg-black" aria-hidden="true">
      <Galaxy
        active={!reduceMotion}
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
  )
}

function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const aboutPreviewMode = searchParams.get('aboutPreview') === '1'
  const projectExperienceMode = searchParams.get('page') === 'experience'
  const webProjectMode = searchParams.get('page') === 'web-project'
  const mobileProjectMode = searchParams.get('page') === 'mobile-project'
  const visualizationProjectMode = searchParams.get('page') === 'visualization-project'
  const aigcProjectMode = searchParams.get('page') === 'aigc-project'
  const projectPreviewParam = searchParams.get('projectPreview')
  const projectPreviewMode = projectPreviewParam === '1' || projectPreviewParam === '2' || projectPreviewParam === '3'
  const projectPreviewVariant: ShowcaseVariant =
    projectPreviewParam === '2' ? 'stage' : projectPreviewParam === '3' ? 'archive' : 'atlas'
  const isStandalonePage = aboutPreviewMode || projectExperienceMode || projectPreviewMode || webProjectMode || mobileProjectMode || visualizationProjectMode || aigcProjectMode
  const [introVisible, setIntroVisible] = useState(() => !isStandalonePage && !hasSeenOpeningSequence())
  const heroRef = useRef<HTMLElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const reducePageMotion = useReducedMotion()
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroContentY = useTransform(heroScrollProgress, [0, 1], [0, -42])
  const heroContentScale = useTransform(heroScrollProgress, [0, 0.72, 1], [1, 0.992, 0.978])
  const heroContentOpacity = useTransform(heroScrollProgress, [0, 0.55, 1], [1, 0.96, 0.78])

  useEffect(() => {
    if (isStandalonePage) return
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

    lenisRef.current = lenis

    return () => {
      lenisRef.current = null
      lenis.destroy()
    }
  }, [isStandalonePage])

  useEffect(() => {
    if (isStandalonePage) return

    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    const positionAtSection = () => {
      const sectionId = window.location.hash.slice(1) || 'home'
      if (!['home', 'about', 'projects', 'contact'].includes(sectionId)) return
      const section = document.getElementById(sectionId)
      if (!section) return

      const offset = sectionId === 'home' ? 0 : 104
      const top = Math.max(0, window.scrollY + section.getBoundingClientRect().top - offset)
      if (lenisRef.current) {
        lenisRef.current.resize()
        lenisRef.current.scrollTo(top, { immediate: true })
      } else {
        window.scrollTo({ top, left: 0, behavior: 'instant' })
      }
    }

    const animationFrame = window.requestAnimationFrame(positionAtSection)
    const timer = window.setTimeout(positionAtSection, 80)
    window.addEventListener('pageshow', positionAtSection)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.clearTimeout(timer)
      window.removeEventListener('pageshow', positionAtSection)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [isStandalonePage])

  useEffect(() => {
    try {
      window.sessionStorage.setItem(OPENING_SEQUENCE_SESSION_KEY, 'true')
    } catch {
      // Keep the opening sequence functional when session storage is unavailable.
    }
  }, [])

  useEffect(() => {
    if (aboutPreviewMode) return
    const timer = window.setTimeout(() => setIntroVisible(false), 1550)
    return () => window.clearTimeout(timer)
  }, [aboutPreviewMode])

  if (aboutPreviewMode) {
    return (
      <main className="min-h-screen bg-[#050505] font-sans text-[#e7e7ed]">
        <Navigation />
        <div className="h-[92px] md:h-[96px]" aria-hidden="true" />
        <AboutSection previewMode />
      </main>
    )
  }

  if (webProjectMode) {
    return (
      <main className="min-h-screen bg-[#151515] font-sans text-white">
        <Navigation standalone />
        <ProjectPageEntrance>
          <WebProjectPage />
        </ProjectPageEntrance>
      </main>
    )
  }

  if (mobileProjectMode) {
    return (
      <main className="h-svh overflow-hidden bg-[#151515] font-sans text-white">
        <Navigation standalone />
        <ProjectPageEntrance className="h-full">
          <MobileProjectPage />
        </ProjectPageEntrance>
      </main>
    )
  }

  if (visualizationProjectMode) {
    return (
      <main className="h-svh overflow-hidden bg-[#151515] font-sans text-white">
        <Navigation standalone />
        <ProjectPageEntrance className="h-full">
          <VisualizationProjectPage />
        </ProjectPageEntrance>
      </main>
    )
  }

  if (aigcProjectMode) {
    return (
      <main className="h-svh overflow-hidden bg-[#151515] font-sans text-white">
        <Navigation standalone />
        <ProjectPageEntrance className="h-full">
          <AigcProjectPage />
        </ProjectPageEntrance>
      </main>
    )
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
    <main className="min-h-screen bg-[#f8fbfd] font-sans text-[#0b1f33]">
      <OpeningSequence visible={introVisible} />
      <Navigation lightGlass />

      <section
        ref={heroRef}
        id="home"
        className="relative h-[clamp(600px,100svh,720px)] overflow-hidden bg-[#f4f8ff] text-[#0b1f33] md:h-[600px]"
      >
        <motion.div
          style={reducePageMotion ? undefined : { y: heroContentY, scale: heroContentScale, opacity: heroContentOpacity }}
          className="h-full will-change-transform"
        >
          <HeroCarousel introVisible={introVisible} />
        </motion.div>
      </section>

      <AboutSection />
      <HomeProjectShowcase />
      <Footer />
    </main>
  )
}

export default App

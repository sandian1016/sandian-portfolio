import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/** Accent themes for the hero banner — one per carousel slide. */
export type HeroAccent = 'sky' | 'violet' | 'cyan'

interface AccentTheme {
  glow: string
  floor: string
  device: string
  avatar: string
  chipMain: string
  tags: [string, string, string]
  mic: string
  meter: string
  ring: string
  sparkleA: string
  sparkleB: string
  plusA: string
  plusB: string
  studio: string
}

const ACCENTS: Record<HeroAccent, AccentTheme> = {
  sky: {
    glow: 'bg-[radial-gradient(circle_at_50%_55%,rgba(96,165,250,0.35),rgba(167,139,250,0.18)_45%,transparent_72%)]',
    floor: 'from-sky-300/55 via-sky-200/25 to-transparent',
    device: 'from-white via-sky-50 to-violet-50',
    avatar: 'from-sky-400 via-blue-500 to-violet-500',
    chipMain: 'from-sky-500 to-violet-500',
    tags: ['from-sky-500 to-blue-500', 'from-violet-500 to-fuchsia-500', 'from-cyan-500 to-sky-500'],
    mic: 'from-blue-500 via-indigo-500 to-violet-500',
    meter: 'from-sky-500 via-blue-500 to-violet-500',
    ring: 'ring-sky-100',
    sparkleA: 'text-sky-400/80',
    sparkleB: 'text-violet-400/80',
    plusA: 'text-sky-300',
    plusB: 'text-violet-300',
    studio: 'text-sky-500/85',
  },
  violet: {
    glow: 'bg-[radial-gradient(circle_at_50%_55%,rgba(167,139,250,0.38),rgba(96,165,250,0.16)_45%,transparent_72%)]',
    floor: 'from-violet-300/55 via-violet-200/25 to-transparent',
    device: 'from-white via-violet-50 to-fuchsia-50',
    avatar: 'from-violet-400 via-purple-500 to-fuchsia-500',
    chipMain: 'from-violet-500 to-fuchsia-500',
    tags: ['from-violet-500 to-purple-500', 'from-fuchsia-500 to-pink-500', 'from-purple-500 to-indigo-500'],
    mic: 'from-violet-500 via-purple-500 to-fuchsia-500',
    meter: 'from-violet-500 via-purple-500 to-fuchsia-500',
    ring: 'ring-violet-100',
    sparkleA: 'text-violet-400/80',
    sparkleB: 'text-fuchsia-400/80',
    plusA: 'text-violet-300',
    plusB: 'text-fuchsia-300',
    studio: 'text-violet-500/85',
  },
  cyan: {
    glow: 'bg-[radial-gradient(circle_at_50%_55%,rgba(34,211,238,0.32),rgba(96,165,250,0.18)_45%,transparent_72%)]',
    floor: 'from-cyan-300/55 via-cyan-200/25 to-transparent',
    device: 'from-white via-cyan-50 to-sky-50',
    avatar: 'from-cyan-400 via-sky-500 to-blue-500',
    chipMain: 'from-cyan-500 to-blue-500',
    tags: ['from-cyan-500 to-sky-500', 'from-sky-500 to-blue-500', 'from-teal-500 to-cyan-500'],
    mic: 'from-cyan-500 via-sky-500 to-blue-500',
    meter: 'from-cyan-500 via-sky-500 to-blue-500',
    ring: 'ring-cyan-100',
    sparkleA: 'text-cyan-400/80',
    sparkleB: 'text-sky-400/80',
    plusA: 'text-cyan-300',
    plusB: 'text-sky-300',
    studio: 'text-cyan-600/85',
  },
}

interface HeroBannerProps {
  /** Color theme, varies per carousel slide. Defaults to 'sky'. */
  accent?: HeroAccent
  /** Short label shown inside the avatar circle. Defaults to 'SD'. */
  badge?: string
}

/**
 * HeroBanner
 * --------------------------------------------------------------
 * Cloud-product visual for the home hero. Pure CSS / SVG — no 3D libs.
 * Layered floating glass device + floating UI chips with subtle motion.
 *
 * Design language:
 *   - soft blue → violet gradient backdrop with radial glow
 *   - central tilted "device" card with avatar + waveform
 *   - floating chips (project thumbnail, voice meter, skill tag, mic)
 *   - sparkle / plus accents
 */
export function HeroBanner({ accent = 'sky', badge = 'SD' }: HeroBannerProps) {
  const t = ACCENTS[accent]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.05, delay: 0.25, ease: EASE }}
      className="relative mx-auto w-full max-w-[560px]"
      aria-hidden="true"
    >
      {/* Aspect wrapper keeps the illustration proportions stable */}
      <div className="relative aspect-[1/1] w-full">
        {/* Radial glow background */}
        <div className={`absolute inset-0 rounded-[40px] blur-[2px] ${t.glow}`} />

        {/* Concentric soft rings (ZEGO-ish floor) */}
        <div className={`absolute bottom-[8%] left-1/2 h-[20%] w-[72%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b blur-2xl ${t.floor}`} />
        <div className="absolute bottom-[5%] left-1/2 h-[10%] w-[52%] -translate-x-1/2 rounded-[50%] bg-white/60 blur-xl" />

        {/* Decorative sparkle top-left */}
        <Sparkle className={`left-[10%] top-[6%] ${t.sparkleA}`} size={18} />
        <Sparkle className={`right-[14%] top-[10%] ${t.sparkleB}`} size={14} />
        <Plus className={`left-[18%] top-[26%] ${t.plusA}`} size={12} />
        <Plus className={`right-[10%] top-[40%] ${t.plusB}`} size={10} />

        {/* ============== Floating chip: project thumbnail (top-left) ============== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="absolute left-[2%] top-[16%] sm:left-[3%] sm:top-[18%]"
        >
          <div className="hero-banner-float-slow">
            <div className={`flex items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-3 shadow-[0_18px_44px_rgba(56,89,158,0.18)] ring-1 backdrop-blur-xl ${t.ring}`}>
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-inner ${t.chipMain}`}>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.6" />
                  <rect x="14" y="3" width="7" height="7" rx="1.6" />
                  <rect x="3" y="14" width="7" height="7" rx="1.6" />
                  <rect x="14" y="14" width="7" height="7" rx="1.6" />
                </svg>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="h-1.5 w-20 rounded-full bg-slate-700/85" />
                <span className="h-1 w-14 rounded-full bg-slate-400/70" />
                <span className="mt-0.5 h-1 w-10 rounded-full bg-sky-400/85" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============== Floating chip: live voice meter (top-right) ============== */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          className="absolute right-[2%] top-[12%] sm:right-[4%] sm:top-[14%]"
        >
          <div className="hero-banner-float-medium">
            <div className={`rounded-2xl bg-white/95 px-3.5 py-3 shadow-[0_18px_44px_rgba(76,29,149,0.16)] ring-1 backdrop-blur-xl ${t.ring}`}>
              <div className="flex items-end gap-[3px]">
                {[6, 11, 7, 14, 9, 16, 8, 13, 6, 10, 7, 12, 5, 9, 11, 8].map((h, i) => (
                  <span
                    key={i}
                    className={`hero-banner-meter w-[3px] rounded-full bg-gradient-to-t ${t.meter}`}
                    style={{ height: `${h * 1.4}px`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
                <span className="h-1 w-16 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============== Main device card (center) ============== */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.35, ease: EASE }}
          className="absolute left-1/2 top-[24%] h-[58%] w-[42%] -translate-x-1/2"
        >
          {/* Outer glow */}
          <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-sky-300/30 via-blue-300/20 to-violet-300/30 blur-2xl" />
          {/* Device body */}
          <div className={`hero-banner-float-slow relative h-full w-full overflow-hidden rounded-[28px] bg-gradient-to-br shadow-[0_30px_80px_rgba(56,89,158,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70 ${t.device}`}>
            {/* Top toolbar */}
            <div className="flex items-center justify-between px-4 pt-3.5">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400/85" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/85" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/85" />
              </div>
              <span className={`text-[9px] font-semibold tracking-[0.18em] ${t.studio}`}>
                SANDIAN STUDIO
              </span>
              <span className="h-2 w-2 rounded-full bg-violet-300" />
            </div>

            {/* Avatar block */}
            <div className="mt-5 flex flex-col items-center px-4">
              <div className="relative">
                <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-br opacity-60 blur-md ${t.avatar}`} />
                <div className={`relative grid h-[64px] w-[64px] place-items-center rounded-full bg-gradient-to-br ring-[3px] ring-white shadow-[0_8px_24px_rgba(56,89,158,0.35)] ${t.avatar}`}>
                  <span className="text-[15px] font-bold text-white">{badge}</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-white shadow ring-1 ring-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
              </div>
              <div className="mt-3 flex flex-col items-center gap-1.5">
                <span className="h-1.5 w-20 rounded-full bg-slate-700/85" />
                <span className="h-1 w-14 rounded-full bg-slate-400/70" />
              </div>
            </div>

            {/* Waveform inside device */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-end gap-[2px]">
              {[10, 16, 12, 22, 14, 26, 18, 24, 12, 20, 15, 28, 14, 18, 10, 22, 16, 12, 20, 14].map(
                (h, i) => (
                  <span
                    key={i}
                    className={`hero-banner-meter w-[2.5px] rounded-full bg-gradient-to-t ${t.meter}`}
                    style={{ height: `${h}px`, animationDelay: `${i * 0.05}s` }}
                  />
                ),
              )}
            </div>

            {/* Subtle highlight */}
            <div className="pointer-events-none absolute inset-x-4 top-2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
          </div>
        </motion.div>

        {/* ============== Floating chip: design tags (bottom-left) ============== */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
          className="absolute bottom-[20%] left-[1%] sm:bottom-[22%] sm:left-[3%]"
        >
          <div className="hero-banner-float-fast">
            <div className={`flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-[0_14px_34px_rgba(56,89,158,0.18)] ring-1 backdrop-blur-xl ${t.ring}`}>
              {t.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white ${
                    ['UI', 'UX', 'DS'][i]
                  }`}
                >
                  {['UI', 'UX', 'DS'][i]}
                </span>
              ))}
              <span className="ml-1 h-1 w-12 rounded-full bg-slate-300" />
            </div>
          </div>
        </motion.div>

        {/* ============== Floating chip: circular mic CTA (bottom-right) ============== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.95, ease: EASE }}
          className="absolute bottom-[16%] right-[3%] sm:bottom-[18%] sm:right-[5%]"
        >
          <div className="hero-banner-float-medium">
            <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br shadow-[0_18px_44px_rgba(67,56,202,0.4)] ring-1 ring-white/40 ${t.mic}`}>
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0" />
                <path d="M12 18v3" />
                <path d="M9 21h6" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* ============== Soft secondary ribbon card ============== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 1.05, ease: EASE }}
          className="absolute bottom-[6%] left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <div className="hero-banner-float-slow">
            <div className={`flex items-center gap-3 rounded-full bg-white/85 px-4 py-2 shadow-[0_14px_34px_rgba(56,89,158,0.18)] ring-1 backdrop-blur-xl ${t.ring}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${t.chipMain}`}>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <span className="h-1.5 w-24 rounded-full bg-slate-700/80" />
              <span className="h-1.5 w-3 rounded-full bg-sky-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function Sparkle({ className = '', size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`absolute ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0l1.8 7.2L21 9l-7.2 1.8L12 18l-1.8-7.2L3 9l7.2-1.8L12 0z" />
    </svg>
  )
}

function Plus({ className = '', size = 12 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`absolute ${className}`}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="5" y="0" width="2" height="12" rx="1" />
      <rect x="0" y="5" width="12" height="2" rx="1" />
    </svg>
  )
}

export default HeroBanner

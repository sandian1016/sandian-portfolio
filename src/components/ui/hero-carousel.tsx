import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

const SWITCH_INTERVAL = 6000
const EASE = [0.22, 1, 0.36, 1] as const

interface HeroSlide {
  id: string
  tag?: string
  tab: string
  title: string
  mobileTitleSegments: string[]
  description: string
  cta: string
  poster: string
  video: string
  mobileMediaClass: string
}

const SLIDES: HeroSlide[] = [
  {
    id: 'ai-renew',
    tab: 'AI 换新 · 智启新局',
    title: '用 AI 缩短从想法到体验的距离',
    mobileTitleSegments: ['用 AI 缩短', '从想法到体验的距离'],
    description: '将 AIGC 与 AI 编程融入设计探索和原型搭建，让创意更快转化为可交互、可验证的产品体验。',
    cta: '立即查看',
    poster: '/home-hero/ai-renew.jpg',
    video: '/home-hero/ai-renew.mp4',
    mobileMediaClass: 'object-[82%_center] md:object-center',
  },
  {
    id: 'lighthouse',
    tab: 'WEB端复杂业务系统体验设计',
    title: '在复杂业务中，建立清晰的管理判断',
    mobileTitleSegments: ['在复杂业务中', '建立清晰的管理判断'],
    description: '面向多角色、多层级协同场景，梳理信息架构与关键任务链路，让状态、风险与下一步动作保持清晰可见。',
    cta: '立即查看',
    poster: '/home-hero/lighthouse.jpg',
    video: '/home-hero/lighthouse.mp4',
    mobileMediaClass: 'object-[78%_center] md:object-center',
  },
  {
    id: 'adp',
    tab: '轻量、连续的移动任务体验',
    title: '让长流程任务在移动场景中自然完成',
    mobileTitleSegments: ['让长流程任务', '在移动场景中自然完成'],
    description: '把专业字段与复杂流程拆解为轻量步骤，支持随时保存、继续填写与清晰的任务进度反馈。',
    cta: '立即查看',
    poster: '/home-hero/adp.jpg',
    video: '/home-hero/adp.mp4',
    mobileMediaClass: 'object-[84%_center] md:object-center',
  },
]

export function HeroCarousel({ introVisible }: { introVisible: boolean }) {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  const goTo = useCallback((nextIndex: number) => {
    setIndex((current) => (current === nextIndex ? current : nextIndex))
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, SWITCH_INTERVAL)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const current = SLIDES[index]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={introVisible ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="relative h-full w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="作品集首页项目轮播"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current.id}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.018 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={reduceMotion ? { duration: 0.18 } : { duration: 0.6, ease: EASE }}
          className="absolute inset-0"
        >
          <img
            src={current.poster}
            alt=""
            fetchPriority="high"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover ${current.mobileMediaClass}`}
          />
          {!reduceMotion && (
            <video
              key={current.video}
              className={`absolute inset-0 h-full w-full object-cover ${current.mobileMediaClass}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={current.poster}
              aria-hidden="true"
            >
              <source src={current.video} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,251,255,0.98)_0%,rgba(247,251,255,0.94)_42%,rgba(247,251,255,0.68)_62%,rgba(247,251,255,0.12)_84%,rgba(247,251,255,0)_100%)] md:bg-[linear-gradient(90deg,rgba(247,251,255,0.95)_0%,rgba(247,251,255,0.85)_28%,rgba(247,251,255,0.18)_53%,rgba(247,251,255,0)_74%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 px-5 pb-8 pt-[124px] sm:px-8 md:grid-cols-[210px_minmax(0,1fr)] md:pb-0 md:pt-[104px] lg:grid-cols-[250px_minmax(0,1fr)] lg:px-12">
        <nav className="hidden h-[420px] border-r border-[#dbe9f7] pr-7 md:block" aria-label="首页活动页签">
          {SLIDES.map((slide, itemIndex) => {
            const active = itemIndex === index
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(itemIndex)}
                className={`relative flex h-[78px] w-full items-center justify-end border-r-2 pr-4 text-right text-[14px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0067ff] focus-visible:ring-inset ${
                  active ? 'border-[#0067ff] bg-white/42 text-[#0067ff]' : 'border-transparent text-[#1b2635] hover:bg-white/35 hover:text-[#0067ff]'
                }`}
                aria-current={active ? 'true' : undefined}
              >
                <span className="inline-flex max-w-[206px] items-center justify-end gap-2 leading-5">
                  {slide.tag && <span className="shrink-0 rounded-[2px] bg-[#1683ff] px-1.5 py-[1px] text-[12px] leading-5 text-white">{slide.tag}</span>}
                  <span>{slide.tab}</span>
                </span>
                {active && !reduceMotion && <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#0067ff] animate-[hero-tab-progress_6s_linear]" aria-hidden="true" />}
              </button>
            )
          })}
        </nav>

        <div className="flex min-w-0 flex-col justify-start pl-0 md:justify-center md:pb-14 md:pl-7 lg:pl-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={reduceMotion ? { duration: 0.18 } : { duration: 0.35, delay: 0.06, ease: EASE }}
              className="max-w-[610px]"
            >
              <div className="-mx-5 mb-6 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:-mx-8 sm:px-8 md:hidden" role="tablist" aria-label="首页活动页签">
                {SLIDES.map((slide, itemIndex) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goTo(itemIndex)}
                    className={`snap-start shrink-0 rounded-full border px-3 py-2 text-xs leading-4 transition ${itemIndex === index ? 'border-[#0067ff] bg-[#0067ff] text-white' : 'border-[#b8cadf] bg-white/70 text-[#32475e]'}`}
                    aria-current={itemIndex === index ? 'true' : undefined}
                  >
                    {slide.tab}
                  </button>
                ))}
              </div>
              <h1 className="max-w-[21rem] text-[clamp(28px,8vw,32px)] font-semibold leading-[1.18] tracking-[-0.035em] text-[#111820] [text-wrap:balance] sm:text-[clamp(30px,3vw,46px)] md:max-w-none">
                <span className="md:hidden">
                  {current.mobileTitleSegments.map((segment) => (
                    <span key={segment} className="inline-block">
                      {segment}
                    </span>
                  ))}
                </span>
                <span className="hidden md:inline">{current.title}</span>
              </h1>
              <p className="mt-4 max-w-[610px] text-[15px] leading-7 text-[#435a73] lg:text-[15px]">{current.description}</p>
              <a
                href="#projects"
                className="mt-8 flex h-11 w-full items-center justify-between rounded-[8px] bg-[#0067f5] px-4 text-[15px] font-medium text-white shadow-[0_8px_20px_rgba(0,97,240,0.16)] transition-colors hover:bg-[#0057da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0067ff] focus-visible:ring-offset-2 sm:mt-10 sm:inline-flex sm:h-10 sm:w-auto sm:min-w-[274px] sm:text-[14px]"
              >
                {current.cta}
                <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">当前 Banner：{current.tab}</span>
    </motion.div>
  )
}

export default HeroCarousel

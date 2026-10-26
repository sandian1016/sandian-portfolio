import { useEffect, useRef, useState } from 'react'
import { Footer } from './footer-section'
import { ProjectBackLink } from './project-back-link'
import { ProjectImageLightbox } from './project-image-lightbox'
import { useChapterNavFollow } from './use-chapter-nav-follow'

type HmiProjectGroup = {
  id: string
  label: string
  startFrame: number
}

type HmiProjectFrame = {
  id: string
  groupId: string
  src: string
  alt: string
  width: number
  height: number
}

const hmiProjectGroups: HmiProjectGroup[] = [
  { id: 'hmi-overview', label: '项目概览', startFrame: 1 },
  { id: 'hmi-research', label: '用户与场景', startFrame: 3 },
  { id: 'hmi-architecture', label: '信息架构', startFrame: 8 },
  { id: 'hmi-core-interface', label: '核心界面', startFrame: 9 },
  { id: 'hmi-interaction', label: '交互设计', startFrame: 14 },
  { id: 'hmi-visual-system', label: '视觉规范', startFrame: 21 },
  { id: 'hmi-scenarios', label: '场景展示', startFrame: 25 },
]

function getGroupId(frameNumber: number) {
  return [...hmiProjectGroups]
    .reverse()
    .find((group) => frameNumber >= group.startFrame)?.id ?? hmiProjectGroups[0].id
}

const hmiProjectFrames: HmiProjectFrame[] = Array.from({ length: 29 }, (_, index) => {
  const frameNumber = index + 1

  return {
    id: `hmi-frame-${String(frameNumber).padStart(2, '0')}`,
    groupId: getGroupId(frameNumber),
    src: `/projects/hmi-cockpit/hmi-frame-${String(frameNumber).padStart(2, '0')}.webp`,
    alt: `XIAOMI SU7 智能座舱概念设计第 ${frameNumber} 页`,
    width: 1920,
    height: frameNumber === 7 ? 4916 : frameNumber === 6 ? 1081 : 1080,
  }
})

const hmiHeroVideo = '/projects/hmi-cockpit/hmi-hero-motion.mp4'

export function HmiCockpitProjectPage() {
  const [activeGroupId, setActiveGroupId] = useState(hmiProjectGroups[0].id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const chapterNavigationRef = useChapterNavFollow(activeGroupId)

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const frame = hmiProjectFrames.find((item) => item.id === hash)
    const group = hmiProjectGroups.find((item) => item.id === hash)
    setActiveGroupId(frame?.groupId ?? group?.id ?? hmiProjectGroups[0].id)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleFrame = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleFrame) return

        const frame = hmiProjectFrames.find((item) => item.id === visibleFrame.target.id)
        if (!frame) return

        setActiveGroupId(frame.groupId)
        if (window.location.hash.slice(1) !== frame.id) {
          window.history.replaceState(null, '', `#${frame.id}`)
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-18% 0px -55%',
        threshold: [0.08, 0.3, 0.6],
      },
    )

    hmiProjectFrames.forEach((frame) => {
      const target = document.getElementById(frame.id)
      if (target) observer.observe(target)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="project-detail-page relative h-svh overflow-hidden bg-[#151515]">
      <aside className="web-project-sidebar" aria-label="HMI 智能座舱设计项目章节">
        <ProjectBackLink />
        <nav ref={chapterNavigationRef} className="web-project-sidebar__nav" aria-label="HMI 智能座舱作品目录" data-lenis-prevent>
          <ol>
            {hmiProjectGroups.map((group) => {
              const targetFrameId = hmiProjectFrames[group.startFrame - 1].id

              return (
                <li key={group.id}>
                  <a
                    href={`#${targetFrameId}`}
                    aria-current={activeGroupId === group.id ? 'location' : undefined}
                    className={`web-project-sidebar__link${
                      activeGroupId === group.id ? ' is-current' : ''
                    }`}
                    onClick={() => setActiveGroupId(group.id)}
                  >
                    {group.label}
                  </a>
                </li>
              )
            })}
          </ol>
        </nav>
      </aside>

      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        className="project-frame-scroll flex h-full w-full flex-col gap-[18px] overflow-y-auto overscroll-contain"
      >
        {hmiProjectFrames.map((frame, index) => (
          <figure
            id={frame.id}
            key={frame.id}
            className="mx-auto w-[calc(100%-32px)] max-w-[1440px] flex-none scroll-mt-4 overflow-hidden rounded-[29px] border border-white/[0.06] bg-[#0f0f0f] shadow-[0_34px_80px_rgba(0,0,0,0.28)] sm:w-[calc(100%-48px)] md:w-[calc(100%-80px)]"
          >
            <button
              type="button"
              className="group block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
              aria-label={`放大查看：${frame.alt}`}
              onClick={() => setLightboxIndex(index)}
            >
              {index === 0 ? (
                <video
                  src={hmiHeroVideo}
                  poster={frame.src}
                  width={frame.width}
                  height={frame.height}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                  className="block aspect-video h-auto w-full object-cover transition-opacity duration-200 group-hover:opacity-95"
                />
              ) : (
                <img
                  src={frame.src}
                  alt={frame.alt}
                  width={frame.width}
                  height={frame.height}
                  loading="lazy"
                  fetchPriority="auto"
                  decoding="async"
                  className="block h-auto w-full object-contain transition-opacity duration-200 group-hover:opacity-95"
                />
              )}
            </button>
          </figure>
        ))}

        <div className="w-full flex-none scroll-mt-0 bg-black">
          <Footer standalone />
        </div>
      </div>

      <ProjectImageLightbox
        items={hmiProjectFrames}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  )
}

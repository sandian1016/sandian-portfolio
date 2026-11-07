import { useEffect, useRef, useState } from 'react'
import { Footer } from './footer-section'
import { ProjectBackLink } from './project-back-link'
import { ProjectImageLightbox } from './project-image-lightbox'
import { useChapterNavFollow } from './use-chapter-nav-follow'

type VisualizationProjectFrame = {
  id: string
  label: string
  src: string
  alt: string
  width: number
  height: number
}

const visualizationProjectFrames: VisualizationProjectFrame[] = [
  ['digital-twin-cover', '项目封面', 1280, 720],
  ['digital-twin-concept', '设计理念', 1280, 1119],
  ['digital-twin-components', '设计组件', 1920, 1990],
  ['digital-twin-overview', '页面展示', 1280, 1801],
  ['digital-twin-production', '生产车间', 1280, 720],
  ['digital-twin-process', '生产工艺', 1920, 1080],
  ['digital-twin-equipment', '设备管理', 1790, 2160],
  ['digital-twin-quality', '质量管理', 1920, 1080],
  ['digital-twin-gallery', '场景展示', 1280, 720],
  ['digital-twin-end', '结束页', 1280, 720],
].map(([id, label, width, height], index) => ({
  id: String(id),
  label: String(label),
  src: index === 0
    ? '/projects/digital-twin/cover-updated.webp'
    : index === 9
      ? '/projects/digital-twin/end-updated.webp'
      : `/projects/digital-twin/${String(index + 1).padStart(2, '0')}.${[3, 6, 8].includes(index + 1) ? 'gif' : 'webp'}`,
  alt: `研究院数字孪生管控系统：${label}`,
  width: Number(width),
  height: Number(height),
}))

export function VisualizationProjectPage() {
  const [activeSectionId, setActiveSectionId] = useState('digital-twin-cover')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const chapterNavigationRef = useChapterNavFollow(activeSectionId)

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
    const syncActiveSection = () => {
      const hash = window.location.hash.slice(1)
      const section = visualizationProjectFrames.find((item) => item.id === hash)
      setActiveSectionId(section?.id ?? 'digital-twin-cover')
    }

    syncActiveSection()
    window.addEventListener('hashchange', syncActiveSection)

    return () => window.removeEventListener('hashchange', syncActiveSection)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleFrame = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleFrame) return

        const nextId = visibleFrame.target.id
        setActiveSectionId(nextId)

        if (window.location.hash.slice(1) !== nextId) {
          window.history.replaceState(null, '', `#${nextId}`)
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '-20% 0px -52%',
        threshold: [0.1, 0.35, 0.6],
      },
    )

    visualizationProjectFrames.forEach((frame) => {
      const target = document.getElementById(frame.id)
      if (target) observer.observe(target)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="project-detail-page relative h-svh overflow-hidden bg-[#151515]">
      <aside className="web-project-sidebar" aria-label="可视化项目章节">
        <ProjectBackLink />
        <nav ref={chapterNavigationRef} className="web-project-sidebar__nav" aria-label="可视化作品目录" data-lenis-prevent>
          <ol>
            {visualizationProjectFrames.map((frame) => (
              <li key={frame.id}>
                <a
                  href={`#${frame.id}`}
                  aria-current={activeSectionId === frame.id ? 'location' : undefined}
                  className={`web-project-sidebar__link${
                    activeSectionId === frame.id ? ' is-current' : ''
                  }`}
                  onClick={() => setActiveSectionId(frame.id)}
                >
                  {frame.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        className="project-frame-scroll flex h-full w-full flex-col gap-[18px] overflow-y-auto overscroll-contain"
      >
        {visualizationProjectFrames.map((frame, index) => (
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
              <img
                src={frame.src}
                alt={frame.alt}
                width={frame.width}
                height={frame.height}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                className="block h-auto w-full object-contain transition-opacity duration-200 group-hover:opacity-95"
              />
            </button>
          </figure>
        ))}
        <div className="w-full flex-none scroll-mt-0 bg-black">
          <Footer standalone />
        </div>
      </div>

      <ProjectImageLightbox
        items={visualizationProjectFrames}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  )
}

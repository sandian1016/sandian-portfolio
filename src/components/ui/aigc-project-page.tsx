import { useEffect, useRef, useState } from 'react'
import { Footer } from './footer-section'
import { ProjectBackLink } from './project-back-link'
import { ProjectImageLightbox } from './project-image-lightbox'
import { useChapterNavFollow } from './use-chapter-nav-follow'

type AigcProjectFrame = {
  id: string
  label: string
  src: string
  alt: string
  width: number
  height: number
  chapterId?: string
}

const featuredFrames: AigcProjectFrame[] = [
  {
    id: 'aigc-visual-collection',
    label: '主视觉展示合集',
    src: '/projects/aigc-project/aigc-frame-01.webp',
    alt: 'AIGC 主视觉设计作品合集',
    width: 1920,
    height: 2935,
  },
  {
    id: 'aigc-recruitment-illustration',
    label: '插画设计｜招聘',
    src: '/projects/aigc-project/aigc-frame-02.webp',
    alt: '联通数科二〇二六年夏季招聘插画设计',
    width: 1920,
    height: 5057,
  },
  {
    id: 'aigc-ip-illustration',
    label: '插画设计｜IP形象',
    src: '/projects/aigc-project/aigc-frame-03.webp',
    alt: '联通数科通通 IP 形象插画设计',
    width: 1920,
    height: 5057,
  },
  {
    id: 'aigc-festival-posters',
    label: '情感化设计｜节日海报',
    src: '/projects/aigc-project/aigc-frame-04.webp',
    alt: '联通数科通通 IP 节日海报插画设计',
    width: 1920,
    height: 4493,
  },
]

const xuzhouImageDescriptions = [
  '徐州文旅 AIGC 设计项目封面',
  '徐州文旅项目背景与设计策略',
  '徐州文旅移动端体验设计',
  '徐州文旅四季品牌主视觉设计',
  '徐州文旅文创周边设计总览',
  '徐州文旅 AIGC 方法与项目总结',
  '徐州文旅春季主视觉',
  '徐州文旅夏季主视觉',
  '徐州文旅秋季主视觉',
  '徐州文旅红色文化主视觉',
  '徐州文旅博物馆主题主视觉',
  '徐州文旅冬季主视觉',
  '徐州文旅春季户外广告展示',
  '徐州文旅纪念票券设计',
  '徐州文旅立体书设计',
  '徐州文旅帆布袋设计',
  '徐州文旅冰箱贴设计',
  '徐州文旅纪念挂件设计',
  '徐州文旅文创礼盒设计',
  '徐州文旅纪念章设计',
] as const

const xuzhouProjectFrames: AigcProjectFrame[] = xuzhouImageDescriptions.map((alt, index) => {
  const chapterId = index < 6
    ? 'xuzhou-case-study'
    : index < 12
      ? 'xuzhou-seasonal-visuals'
      : 'xuzhou-merchandise'
  const number = String(index + 1).padStart(2, '0')

  return {
    id: index === 0 || index === 6 || index === 12 ? chapterId : `xuzhou-image-${number}`,
    chapterId,
    label: alt,
    src: `/projects/aigc-project/xuzhou-cultural-tourism-${number}.png`,
    alt,
    width: index < 6 ? 1672 : index < 12 ? 1916 : 1448,
    height: index < 6 ? 941 : index < 12 ? 821 : 1086,
  }
})

const aigcProjectFrames = [...featuredFrames, ...xuzhouProjectFrames]
const aigcProjectChapters = [
  ...featuredFrames.map(({ id, label }) => ({ id, label })),
  { id: 'xuzhou-case-study', label: '徐州文旅｜设计方案' },
  { id: 'xuzhou-seasonal-visuals', label: '徐州文旅｜四季视觉' },
  { id: 'xuzhou-merchandise', label: '徐州文旅｜文创周边' },
]

export function AigcProjectPage() {
  const [activeSectionId, setActiveSectionId] = useState('aigc-visual-collection')
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
      const section = aigcProjectChapters.find((item) => item.id === hash)
      setActiveSectionId(section?.id ?? 'aigc-visual-collection')
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

        const frame = aigcProjectFrames.find((item) => item.id === visibleFrame.target.id)
        const nextId = frame?.chapterId ?? visibleFrame.target.id
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

    aigcProjectFrames.forEach((frame) => {
      const target = document.getElementById(frame.id)
      if (target) observer.observe(target)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="project-detail-page relative h-svh overflow-hidden bg-[#151515]">
      <aside className="web-project-sidebar" aria-label="AIGC 项目章节">
        <ProjectBackLink />
        <nav ref={chapterNavigationRef} className="web-project-sidebar__nav" aria-label="AIGC 作品目录" data-lenis-prevent>
          <ol>
            {aigcProjectChapters.map((chapter) => (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={activeSectionId === chapter.id ? 'location' : undefined}
                  className={`web-project-sidebar__link${
                    activeSectionId === chapter.id ? ' is-current' : ''
                  }`}
                  onClick={() => setActiveSectionId(chapter.id)}
                >
                  {chapter.label}
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
        {aigcProjectFrames.map((frame, index) => (
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
        items={aigcProjectFrames}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  )
}

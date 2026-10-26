import { useEffect, useRef, useState } from 'react'
import { Footer } from './footer-section'
import { ProjectBackLink } from './project-back-link'
import { ProjectImageLightbox } from './project-image-lightbox'
import { useChapterNavFollow } from './use-chapter-nav-follow'

type WebProjectFrame = {
  id: string
  label: string
  src: string
  alt: string
  width: number
  height: number
}

const webProjectFrames: WebProjectFrame[] = [
  {
    id: 'web-project-cover',
    label: '项目封面',
    src: '/projects/web-project/web-frame-01.webp',
    alt: '工业物联网安全生产平台 WEB 端项目封面',
    width: 1920,
    height: 1080,
  },
  {
    id: 'project-background',
    label: '产品背景',
    src: '/projects/web-project/web-frame-02.webp',
    alt: '工业物联网安全生产平台产品背景',
    width: 1920,
    height: 1080,
  },
  {
    id: 'visual-revision',
    label: '改版升级',
    src: '/projects/web-project/web-frame-03.webp',
    alt: '工业物联网安全生产平台改版升级',
    width: 1920,
    height: 1080,
  },
  {
    id: 'user-analysis',
    label: '用户分析',
    src: '/projects/web-project/web-frame-04.webp',
    alt: '工业物联网安全生产平台用户分析',
    width: 1920,
    height: 1080,
  },
  {
    id: 'design-strategy',
    label: '设计策略',
    src: '/projects/web-project/web-frame-05.webp',
    alt: '工业物联网安全生产平台设计策略',
    width: 1920,
    height: 1080,
  },
  {
    id: 'interface-analysis',
    label: '界面功能分析',
    src: '/projects/web-project/web-frame-06.webp',
    alt: '工业物联网安全生产平台界面功能分析',
    width: 1920,
    height: 1080,
  },
  {
    id: 'scene-management',
    label: '场景管理模块设计',
    src: '/projects/web-project/web-frame-07.webp',
    alt: '工业物联网安全生产平台场景管理模块设计',
    width: 1920,
    height: 1080,
  },
  {
    id: 'document-center',
    label: '企业资料管理界面设计',
    src: '/projects/web-project/web-frame-08.webp',
    alt: '工业物联网安全生产平台企业资料管理界面设计',
    width: 1920,
    height: 1080,
  },
  {
    id: 'rules-and-messages',
    label: '规则与消息闭环设计',
    src: '/projects/web-project/web-frame-09.webp',
    alt: '工业物联网安全生产平台规则与消息闭环设计',
    width: 1920,
    height: 1080,
  },
  {
    id: 'design-validation',
    label: '设计效果与数据验证',
    src: '/projects/web-project/web-frame-10.webp',
    alt: '工业物联网安全生产平台设计效果与数据验证',
    width: 1920,
    height: 1080,
  },
]

export function WebProjectPage() {
  const [activeSectionId, setActiveSectionId] = useState('web-project-cover')
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
      const section = webProjectFrames.find((item) => item.id === hash)

      setActiveSectionId(section?.id ?? 'web-project-cover')
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

    webProjectFrames.forEach((frame) => {
      const target = document.getElementById(frame.id)
      if (target) observer.observe(target)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="project-detail-page relative h-svh overflow-hidden bg-[#151515]">
      <aside
        className="web-project-sidebar"
        aria-label="WEB 端项目章节"
      >
        <ProjectBackLink />
        <nav ref={chapterNavigationRef} className="web-project-sidebar__nav" aria-label="WEB 端作品目录" data-lenis-prevent>
          <ol>
            {webProjectFrames.map((frame) => (
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
        {webProjectFrames.map((frame, index) => (
          <figure
            id={frame.id}
            key={frame.id}
            className="mx-auto w-[calc(100%-32px)] max-w-[1440px] flex-none scroll-mt-32 overflow-hidden rounded-[29px] border border-white/[0.06] bg-[#0f0f0f] shadow-[0_34px_80px_rgba(0,0,0,0.28)] sm:w-[calc(100%-48px)] md:w-[calc(100%-80px)]"
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
        items={webProjectFrames}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Footer } from './footer-section'
import { ProjectBackLink } from './project-back-link'
import { ProjectImageLightbox } from './project-image-lightbox'
import { useChapterNavFollow } from './use-chapter-nav-follow'

type ProjectFrame = {
  id: string
  label: string
  src: string
  alt: string
  width: number
  height: number
}

type ProjectFrameSeed = readonly [label: string, height?: number]

function createFrames({
  idPrefix,
  assetPath,
  assetPrefix,
  projectName,
  seeds,
}: {
  idPrefix: string
  assetPath: string
  assetPrefix: string
  projectName: string
  seeds: readonly ProjectFrameSeed[]
}): ProjectFrame[] {
  return seeds.map(([label, height = 1080], index) => ({
    id: `${idPrefix}-${String(index + 1).padStart(2, '0')}`,
    label,
    src: `${assetPath}/${assetPrefix}-${String(index + 1).padStart(2, '0')}.webp`,
    alt: `${projectName}：${label}`,
    width: 1920,
    height,
  }))
}

const smartSiteFrames = createFrames({
  idPrefix: 'smart-site-frame',
  assetPath: '/projects/mobile-smart-site',
  assetPrefix: 'smart-site-frame',
  projectName: '智慧工地 APP',
  seeds: [
    ['项目封面'],
    ['项目背景'],
    ['业务痛点'],
    ['产品定位'],
    ['设计目标'],
    ['视觉规范', 3060],
    ['产品架构'],
    ['首页设计', 1686],
    ['工地切换'],
    ['工作台与消息'],
    ['实时监控'],
    ['违规随手拍'],
    ['设备监控'],
    ['环境监控'],
    ['设计复盘'],
  ],
})

const stateGridFrames = createFrames({
  idPrefix: 'state-grid-frame',
  assetPath: '/projects/web-state-grid',
  assetPrefix: 'state-grid-frame',
  projectName: '国网电动企业门户网站',
  seeds: [
    ['项目封面'],
    ['改版背景'],
    ['设计策略'],
    ['结构方案分析'],
    ['原方案内容分析'],
    ['浏览结构分层'],
    ['内容层级重构'],
    ['视觉风格探索'],
    ['登录氛围设计'],
    ['轮播图延展'],
    ['实时交互增强'],
    ['最终效果'],
    ['设计规范'],
    ['组件梳理'],
    ['组件库展示'],
  ],
})

const fireVisualizationFrames = createFrames({
  idPrefix: 'fire-frame',
  assetPath: '/projects/visualization-fire',
  assetPrefix: 'fire-frame',
  projectName: '智慧消防平台可视化设计',
  seeds: [
    ['项目封面'],
    ['项目背景'],
    ['可视化体系', 3058],
    ['核心界面设计', 2700],
    ['效果展示'],
  ],
})

function ImageProjectPage({
  frames,
  navigationLabel,
}: {
  frames: ProjectFrame[]
  navigationLabel: string
}) {
  const [activeSectionId, setActiveSectionId] = useState(frames[0].id)
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
      const section = frames.find((item) => item.id === hash)
      setActiveSectionId(section?.id ?? frames[0].id)
    }

    syncActiveSection()
    window.addEventListener('hashchange', syncActiveSection)
    return () => window.removeEventListener('hashchange', syncActiveSection)
  }, [frames])

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

    frames.forEach((frame) => {
      const target = document.getElementById(frame.id)
      if (target) observer.observe(target)
    })

    return () => observer.disconnect()
  }, [frames])

  return (
    <section className="project-detail-page relative h-svh overflow-hidden bg-[#151515]">
      <aside className="web-project-sidebar" aria-label={navigationLabel}>
        <ProjectBackLink />
        <nav ref={chapterNavigationRef} className="web-project-sidebar__nav" aria-label={`${navigationLabel}目录`} data-lenis-prevent>
          <ol>
            {frames.map((frame) => (
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
        {frames.map((frame, index) => (
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
        items={frames}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  )
}

export function SmartSiteProjectPage() {
  return <ImageProjectPage frames={smartSiteFrames} navigationLabel="智慧工地 APP 项目章节" />
}

export function StateGridPortalProjectPage() {
  return <ImageProjectPage frames={stateGridFrames} navigationLabel="国网电动企业门户网站项目章节" />
}

export function FireVisualizationProjectPage() {
  return <ImageProjectPage frames={fireVisualizationFrames} navigationLabel="智慧消防可视化项目章节" />
}

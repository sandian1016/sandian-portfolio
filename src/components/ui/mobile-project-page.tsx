import { useEffect, useRef, useState } from 'react'
import { Footer } from './footer-section'
import { ProjectBackLink } from './project-back-link'
import { ProjectImageLightbox } from './project-image-lightbox'

type MobileProjectFrame = {
  id: string
  label: string
  src: string
  alt: string
  width: number
  height: number
}

const mobileProjectFrames: MobileProjectFrame[] = [
  ['mobile-project-cover', '项目封面', '酷潮移动端 APP 项目封面'],
  ['mobile-interface-showcase', '核心界面展示', '酷潮移动端 APP 核心界面展示'],
  ['mobile-project-background', '项目背景', '酷潮移动端 APP 项目背景'],
  ['mobile-business-problem', '业务问题', '酷潮移动端 APP 业务问题'],
  ['mobile-design-task', '设计任务', '酷潮移动端 APP 设计任务'],
  ['mobile-style-definition', '设计风格定义', '酷潮移动端 APP 设计风格定义'],
  ['mobile-typography', '字体规范', '酷潮移动端 APP 字体规范'],
  ['mobile-ip-design', '情感化设计IP形象', '酷潮移动端 APP 情感化设计 IP 形象'],
  ['mobile-ai-workflow', 'Codex/Cursor快速输出方案', '酷潮移动端 APP Codex 与 Cursor 快速输出方案'],
  ['mobile-content-discovery', '内容发现与设计', '酷潮移动端 APP 内容发现与设计'],
  ['mobile-blind-box', '盲盒核心体验', '酷潮移动端 APP 盲盒核心体验'],
  ['mobile-membership', '会员成长体系', '酷潮移动端 APP 会员成长体系'],
  ['mobile-community', '社区增长', '酷潮移动端 APP 社区增长'],
  ['mobile-final-showcase', '核心界面总览', '酷潮移动端 APP 核心界面总览'],
].map(([id, label, alt], index) => ({
  id,
  label,
  src: `/projects/mobile-project/mobile-frame-${String(index + 1).padStart(2, '0')}.webp`,
  alt,
  width: 1920,
  height: 1080,
}))

export function MobileProjectPage() {
  const [activeSectionId, setActiveSectionId] = useState('mobile-project-cover')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
      const section = mobileProjectFrames.find((item) => item.id === hash)
      setActiveSectionId(section?.id ?? 'mobile-project-cover')
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

    mobileProjectFrames.forEach((frame) => {
      const target = document.getElementById(frame.id)
      if (target) observer.observe(target)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="project-detail-page relative h-svh overflow-hidden bg-[#151515]">
      <aside className="web-project-sidebar" aria-label="移动端项目章节">
        <ProjectBackLink />
        <nav className="web-project-sidebar__nav" aria-label="移动端作品目录" data-lenis-prevent>
          <ol>
            {mobileProjectFrames.map((frame) => (
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
        {mobileProjectFrames.map((frame, index) => (
          <figure
            id={frame.id}
            key={frame.id}
            className="mx-auto w-[calc(100%-24px)] max-w-[1280px] flex-none scroll-mt-4 overflow-hidden rounded-[29px] border border-white/[0.06] bg-[#0f0f0f] shadow-[0_34px_80px_rgba(0,0,0,0.28)] sm:w-[calc(100%-40px)] md:w-[calc(100%-64px)]"
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
        items={mobileProjectFrames}
        activeIndex={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </section>
  )
}

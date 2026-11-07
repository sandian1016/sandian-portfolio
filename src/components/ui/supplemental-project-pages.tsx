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

const budingFrames: ProjectFrame[] = [
  ['品牌介绍', 3053], ['IP 形象与品牌色', 2743], ['标志与设计过程', 3293],
  ['品牌关键词', 2980], ['治愈与陪伴', 2733], ['品牌理念', 2045],
  ['悦己奖励', 2434], ['温暖陪伴', 2344], ['快乐分享', 2034], ['品牌延展', 2551],
  ['表情延展 01', 600], ['表情延展 02', 600], ['表情延展 03', 600],
  ['表情延展 04', 600], ['表情延展 05', 600], ['表情延展 06', 600],
  ['材质延展', 2807], ['材质实验室', 1695], ['品牌插画', 2428],
  ['甜品补给站', 2078], ['甜品好心情', 1912], ['甜品出炉', 3307],
  ['动作延展 01', 2248], ['动作延展 02', 2402], ['动作延展 03', 2509],
  ['甜蜜冒险', 2799], ['场景海报', 1790],
  ['甜蜜场景', 1737], ['周边展示', 1867], ['品牌挂饰', 2432],
  ['手提购物袋', 2205], ['品牌玩具', 1184], ['居家玩偶', 2116],
  ['盲盒系列', 1114], ['品牌物料', 2618], ['产品包装', 2097], ['贴纸与门店', 2063],
].map(([label, height], index) => ({
  id: `buding-frame-${String(index + 1).padStart(2, '0')}`,
  label: String(label),
  src: [3, 10, 18, 19, 20, 21, 22, 34, 36].includes(index + 1)
    ? `/projects/buding/${String(index + 1).padStart(2, '0')}-seam.webp`
    : index === 3 ? '/projects/buding/04-cropped.webp' : `/projects/buding/${String(index + 1).padStart(2, '0')}.webp`,
  alt: `布叮甜坊品牌 IP 设计：${label}`,
  width: index >= 10 && index < 16 ? 2500 : 1280,
  height: Number(height),
}))

const c5OaFrames: ProjectFrame[] = [
  ['项目封面', 1], ['划分核心场景', 2], ['用户场景洞察', 3], ['分析关键阶段', 4], ['确定设计内容', 5],
  ['操作区域优化', 6], ['导航轻量化', 7], ['高效工作台', 9], ['待办信息展示', 10],
  ['表格信息优化', 11], ['信息分层', 12], ['栅格布局', 13], ['表单优化', 14],
  ['减少冗余信息', 15], ['组件库', 16], ['页面展示', 17],
].map(([label, number]) => ({
  id: `c5-oa-frame-${String(number).padStart(2, '0')}`,
  label: String(label),
  src: number === 1 ? '/projects/c5-oa/cover-updated.webp' : `/projects/c5-oa/${String(number).padStart(2, '0')}.webp`,
  alt: `全管C5-OA办公系统：${label}`,
  width: 1280,
  height: number === 16 ? 1485 : number === 17 ? 713 : 720,
}))

const mliFrames: ProjectFrame[] = [
  ['项目封面', 1280, 2267], ['角色介绍', 1280, 2935], ['角色介绍续', 1280, 2935],
  ['角色背面', 1280, 412], ['品牌故事', 1280, 2267], ['视觉规范', 1280, 2267],
  ['动态表情', 2678, 1506], ['表情延展', 2678, 633], ['互动展示', 1280, 3561],
  ['主视觉', 1280, 4569], ['快闪店', 1280, 3495], ['包装设计', 1280, 2486], ['品牌应用', 1280, 5373],
].map(([label, width, height], index) => ({
  id: `mli-frame-${String(index + 1).padStart(2, '0')}`,
  label: String(label),
  src: `/projects/mli/${String(index + 1).padStart(2, '0')}.${index === 6 || index === 7 ? 'gif' : 'webp'}`,
  alt: `原创潮玩 IP MLI：${label}`,
  width: Number(width),
  height: Number(height),
}))

const smartSiteFrames = createFrames({
  idPrefix: 'smart-site-frame',
  assetPath: '/projects/smart-site-updated',
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
  seamless = false,
}: {
  frames: ProjectFrame[]
  navigationLabel: string
  seamless?: boolean
}) {
  const [activeSectionId, setActiveSectionId] = useState(frames[0].id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const activeNavigationId = frames === budingFrames && /^buding-frame-1[1-6]$/.test(activeSectionId)
    ? 'buding-frame-11'
    : activeSectionId
  const chapterNavigationRef = useChapterNavFollow(activeNavigationId)

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
            {frames.filter((frame) => frames !== budingFrames || !/^buding-frame-1[2-6]$/.test(frame.id)).map((frame) => (
              <li key={frame.id}>
                <a
                  href={`#${frame.id}`}
                  aria-current={activeNavigationId === frame.id ? 'location' : undefined}
                  className={`web-project-sidebar__link${
                    activeNavigationId === frame.id ? ' is-current' : ''
                  }`}
                  onClick={() => setActiveSectionId(frame.id)}
                >
                  {frames === budingFrames && frame.id === 'buding-frame-11' ? '表情延展' : frame.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <div
        ref={scrollContainerRef}
        data-lenis-prevent
        className={`project-frame-scroll flex h-full w-full flex-col overflow-y-auto overscroll-contain ${seamless ? 'gap-0' : 'gap-[18px]'}`}
      >
        {frames.map((frame, index) => (
          <figure
            id={frame.id}
            key={frame.id}
            className={`mx-auto w-[calc(100%-32px)] max-w-[1440px] flex-none scroll-mt-4 overflow-hidden bg-[#0f0f0f] sm:w-[calc(100%-48px)] md:w-[calc(100%-80px)] ${seamless ? '' : 'rounded-[29px] border border-white/[0.06] shadow-[0_34px_80px_rgba(0,0,0,0.28)]'}`}
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
        <div className={`w-full flex-none scroll-mt-0 bg-black ${seamless ? 'mt-16 md:mt-24' : ''}`}>
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

export function BudingProjectPage() {
  return <ImageProjectPage frames={budingFrames} navigationLabel="布叮甜坊品牌设计项目章节" seamless />
}

export function MliProjectPage() {
  return <ImageProjectPage frames={mliFrames} navigationLabel="原创潮玩 IP 项目章节" seamless />
}

export function C5OaProjectPage() {
  return <ImageProjectPage frames={c5OaFrames} navigationLabel="全管C5-OA办公系统项目章节" />
}

export function StateGridPortalProjectPage() {
  return <ImageProjectPage frames={stateGridFrames} navigationLabel="国网电动企业门户网站项目章节" />
}

export function FireVisualizationProjectPage() {
  return <ImageProjectPage frames={fireVisualizationFrames} navigationLabel="智慧消防可视化项目章节" />
}

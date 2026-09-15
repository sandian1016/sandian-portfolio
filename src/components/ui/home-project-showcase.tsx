import { type LucideIcon, BarChart3, Boxes, MonitorCog, Smartphone, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type FeaturePill = {
  title: string
  description: string
}

type HomeProject = {
  id: string
  index: string
  title: string
  shortTitle: string
  href?: string
  icon: LucideIcon
  image: string
  imageAlt: string
  imagePosition?: string
  pills: FeaturePill[]
}

const projects: HomeProject[] = [
  {
    id: 'mobile-app',
    index: '01',
    title: '移动端 APP 设计',
    shortTitle: '移动端 APP',
    href: '/?page=mobile-project',
    icon: Smartphone,
    image: '/projects/home-showcase/mobile-kuchao-cover.jpg',
    imageAlt: '酷潮移动端 APP 视觉设计封面',
    pills: [
      { title: '高频任务清晰', description: '聚焦关键入口、状态反馈与连续操作。' },
      { title: '轻量交互节奏', description: '让复杂流程在移动场景中更容易完成。' },
      { title: '多状态可感知', description: '用明确反馈降低用户的判断与记忆成本。' },
      { title: '组件规范统一', description: '保证页面、控件与操作路径保持一致。' },
    ],
  },
  {
    id: 'web-system',
    index: '02',
    title: 'WEB端设计',
    shortTitle: 'WEB端设计',
    href: '/?page=web-project',
    icon: MonitorCog,
    image: '/projects/home-showcase/web-industrial-iot-cover.jpg',
    imageAlt: '工业物联网安全生产平台 WEB 端设计封面',
    pills: [
      { title: '多角色信息结构', description: '把业务层级、权限与任务优先级清晰组织。' },
      { title: '复杂流程可控', description: '将长链路操作拆解为连续、稳定的任务步骤。' },
      { title: '操作反馈明确', description: '让用户始终知道当前状态与下一步动作。' },
      { title: '系统组件复用', description: '沉淀可扩展的模块与一致的视觉规则。' },
    ],
  },
  {
    id: 'data-visualization',
    index: '03',
    title: '数据可视化设计',
    shortTitle: '数据可视化',
    href: '/?page=visualization-project',
    icon: BarChart3,
    image: '/projects/home-showcase/data-southern-city-cover.jpg',
    imageAlt: '南部新城智慧城市运营中心数据可视化封面',
    pills: [
      { title: '关键信息聚合', description: '让设备、告警与空间信息在同一视野内呈现。' },
      { title: '态势变化可读', description: '用层级与视觉节奏辅助快速识别趋势。' },
      { title: '告警状态突出', description: '让需要处理的异常被优先看见与理解。' },
      { title: '数据叙事连贯', description: '从概览到细节建立可追溯的信息路径。' },
    ],
  },
  {
    id: 'aigc-design',
    index: '04',
    title: 'AIGC 设计',
    shortTitle: 'AIGC 设计',
    href: '/?page=aigc-project',
    icon: Sparkles,
    image: '/projects/home-showcase/aigc-ip-design-cover.jpg',
    imageAlt: '联通数科通通 IP AIGC 设计封面',
    imagePosition: 'center top',
    pills: [
      { title: '视觉方向验证', description: '快速比较不同创意方向与可落地效果。' },
      { title: '运营素材协同', description: '让视觉资产适配真实内容与交付节奏。' },
      { title: '生成结果可控', description: '把探索过程组织为可复用的设计方法。' },
      { title: '从创意到交付', description: '缩短方案验证到实际使用之间的距离。' },
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function HomeProjectShowcase() {
  const reduceMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState(0)
  const stackRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    let frame = 0

    const updateStack = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const stack = stackRef.current
        if (!stack) return
        const triggerLine = 114
        const distanceIntoStack = triggerLine - stack.getBoundingClientRect().top
        const nextActive = Math.min(projects.length - 1, Math.max(0, Math.floor(distanceIntoStack / 420)))
        setActiveProject((current) => (current === nextActive ? current : nextActive))

        const lastCard = cardRefs.current[cardRefs.current.length - 1]
        if (!lastCard) return

        const referenceTop = lastCard.getBoundingClientRect().top
        const stackLevels = [
          { startScale: 0.9, offset: 0, distance: 900 },
          { startScale: 0.93, offset: 40, distance: 760 },
          { startScale: 0.96, offset: 80, distance: 630 },
          { startScale: 1, offset: 120, distance: 500 },
        ]

        cardRefs.current.forEach((card, index) => {
          if (!card) return
          if (reduceMotion) {
            card.style.transform = 'none'
            return
          }
          const level = stackLevels[index]
          if (!level) return
          const progress = Math.max(0, Math.min(1, referenceTop / level.distance))
          const scale = level.startScale + (1 - level.startScale) * progress
          card.style.transform = `scale(${scale}) perspective(1200px) translate3d(0, ${level.offset}px, 0)`
        })
      })
    }

    updateStack()
    window.addEventListener('scroll', updateStack, { passive: true })
    window.addEventListener('resize', updateStack)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateStack)
      window.removeEventListener('resize', updateStack)
    }
  }, [reduceMotion])

  const selectProject = (index: number) => {
    setActiveProject(index)
    const stack = stackRef.current
    if (!stack) return
    const targetTop = window.scrollY + stack.getBoundingClientRect().top + index * 420 - 114
    window.scrollTo({ top: targetTop, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section id="projects" className="relative isolate scroll-mt-24 bg-white px-4 pb-24 pt-20 text-[#091221] sm:px-6 md:px-8 md:pb-28 md:pt-28 lg:px-10 lg:pb-32 lg:pt-32 xl:px-12 2xl:px-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[linear-gradient(180deg,rgba(245,250,255,0.6),rgba(255,255,255,0))]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1480px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 42, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.38 }}
          transition={{ duration: 0.95, ease }}
          className="project-showcase-intro max-w-4xl"
        >
          <div className="brand-tech-gradient-text flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em]">
            <Boxes className="h-4 w-4" aria-hidden="true" />
            <span>Selected Projects</span>
          </div>
          <h2 className="font-yahei mt-5 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#091221] sm:text-4xl lg:text-[3rem]">项目展示</h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#091221]/65 sm:text-base">从移动端、B/G 端系统、数据可视化到 AIGC 设计，以更紧凑的项目卡片展示设计重点与真实界面。</p>
        </motion.div>

        <div className="project-showcase-nav mt-10 sm:mt-12" aria-label="项目展示导航">
          {projects.map((project, index) => {
            const Icon = project.icon
            const selected = activeProject === index
            return (
              <button key={project.id} type="button" onClick={() => selectProject(index)} className={`project-showcase-nav__item ${selected ? 'is-active' : ''}`} aria-pressed={selected}>
                <Icon aria-hidden="true" />
                <span>{project.shortTitle}</span>
              </button>
            )
          })}
        </div>

        <div ref={stackRef} className="project-feature-stack mt-9 sm:mt-11">
          {projects.map((project, index) => (
            <ProjectFeatureCard
              key={project.id}
              project={project}
              setRef={(element) => { cardRefs.current[index] = element }}
            />
          ))}
        </div>
        <div className="project-showcase-bottom-space" aria-hidden="true" />
      </div>
    </section>
  )
}

function ProjectFeatureCard({
  project,
  setRef,
}: {
  project: HomeProject
  setRef: (element: HTMLElement | null) => void
}) {
  const Icon = project.icon

  return (
    <article
      ref={setRef}
      className="project-feature-card"
    >
      {project.href ? (
        <a
          href={project.href}
          className="absolute inset-0 z-20 rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0055ff]"
          aria-label={`查看${project.title}项目详情`}
        >
          <span className="sr-only">查看{project.title}项目详情</span>
        </a>
      ) : null}
      <div className="project-feature-card__image">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={project.index === '01' ? 'eager' : 'lazy'}
          style={{ objectPosition: project.imagePosition ?? 'center' }}
        />
      </div>
      <div className="project-feature-card__mask" aria-hidden="true" />

      <div className="project-feature-card__content">
        <div className="project-feature-card__heading">
          <span className="project-feature-card__icon"><Icon aria-hidden="true" /></span>
          <h3>{project.title}</h3>
        </div>

        <div className="project-feature-card__pills">
          {project.pills.map((pill) => (
            <div key={pill.title} className="project-feature-pill">
              <strong>{pill.title}</strong>
              <span>{pill.description}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

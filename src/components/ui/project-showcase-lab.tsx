import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  Grid2X2,
  Layers3,
  Rows3,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

type ShowcaseVariant = 'atlas' | 'stage' | 'archive'

type Category = {
  id: string
  index: string
  label: string
  english: string
  project: string
  role: string
  description: string
  outcome: string
  tags: string[]
  icon: LucideIcon
  accent: string
  href: string
}

const variants: Array<{
  id: ShowcaseVariant
  index: string
  title: string
  description: string
  icon: LucideIcon
}> = [
  { id: 'atlas', index: '01', title: '编辑式作品墙', description: '用版式节奏建立作品记忆点', icon: Grid2X2 },
  { id: 'stage', index: '02', title: '沉浸式项目舞台', description: '逐类聚焦项目与设计价值', icon: Layers3 },
  { id: 'archive', index: '03', title: '分层项目索引', description: '高效比较四类专业能力', icon: Rows3 },
]

const categories: Category[] = [
  {
    id: 'bg-products',
    index: '01',
    label: 'B / G 端产品',
    english: 'Enterprise & Government',
    project: '新型负荷管理平台 II',
    role: '产品策略 · 信息架构 · 复杂交互',
    description: '面向政企与行业级复杂系统，梳理多角色、多层级流程，建立稳定、清晰、可复用的产品体验。',
    outcome: '建立省市两级协同与全流程管理闭环',
    tags: ['多角色流程', '复杂表单', '组件规范'],
    icon: Layers3,
    accent: '#64CEFB',
    href: '/?page=experience#load-platform',
  },
  {
    id: 'data-visualization',
    index: '02',
    label: '数据可视化',
    english: 'Data Visualization',
    project: '格物消防可视化大屏',
    role: '数据叙事 · 态势监控 · 告警闭环',
    description: '将设备、告警与空间信息组织成层级明确的监控界面，让关键状态被快速理解并转化为行动。',
    outcome: '核心体验支撑项目全国化推进',
    tags: ['实时监控', '指挥决策', '可视化组件'],
    icon: ChartNoAxesCombined,
    accent: '#8F97FF',
    href: '/?page=experience#fire-visualization',
  },
  {
    id: 'mobile-products',
    index: '03',
    label: '移动端产品',
    english: 'Mobile Experience',
    project: '新型电力负荷摸排小程序',
    role: '任务拆解 · 分步填写 · 状态反馈',
    description: '把专业字段与长流程任务拆成轻量步骤，让用户随时保存、继续填写并清楚掌握任务进度。',
    outcome: '形成从企业档案到资源摸排的线上闭环',
    tags: ['移动交互', '任务进度', '长流程优化'],
    icon: Smartphone,
    accent: '#5BE2CD',
    href: '/?page=experience#load-survey',
  },
  {
    id: 'ai-design',
    index: '04',
    label: 'AI 设计',
    english: 'AI-assisted Design',
    project: 'AIGC 视觉探索与可交互原型',
    role: '视觉探索 · 原型验证 · 设计开发协同',
    description: '将 AIGC、ComfyUI 与 AI 编程融入探索和交付，让想法更快进入可交互、可验证的产品状态。',
    outcome: '缩短从概念方向到可体验原型的路径',
    tags: ['ComfyUI', '高保真原型', 'AI 协同'],
    icon: Sparkles,
    accent: '#C2A7FF',
    href: '/#about',
  },
]

export function ProjectShowcaseLab({ initialVariant = 'atlas' }: { initialVariant?: ShowcaseVariant }) {
  const [variant, setVariant] = useState<ShowcaseVariant>(initialVariant)
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="projects"
      className="relative isolate min-h-screen scroll-mt-24 overflow-hidden border-t border-white/[0.08] bg-[#08080b] px-5 pb-24 pt-10 text-white sm:px-8 md:pb-28 lg:px-10 lg:pb-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(100,206,251,0.09),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(123,104,238,0.07),transparent_30%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 rounded-[25px] border border-white/[0.11] bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl lg:mb-14">
          <div className="grid gap-2 md:grid-cols-3">
            {variants.map((item) => {
              const Icon = item.icon
              const selected = variant === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVariant(item.id)}
                  className={`group rounded-[17px] px-5 py-4 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#64CEFB]/60 ${
                    selected ? 'bg-white text-[#111016]' : 'bg-white/[0.02] text-white/52 hover:bg-white/[0.06] hover:text-white'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.2em] opacity-45">{item.index}</span>
                    <Icon className="h-4 w-4 opacity-55" />
                  </span>
                  <span className="font-yahei mt-2 block text-base font-bold">{item.title}</span>
                  <span className="mt-1.5 block text-xs opacity-55">{item.description}</span>
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={variant}
            initial={reduceMotion ? false : { opacity: 0, y: 38, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 1.02, ease: [0.22, 1, 0.36, 1] }}
          >
            {variant === 'atlas' && <EditorialAtlas />}
            {variant === 'stage' && <ImmersiveStage />}
            {variant === 'archive' && <ProjectArchive />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export function ProjectArchiveSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/[0.08] bg-[#08080b] px-5 pb-12 pt-20 text-white sm:px-8 md:pb-16 md:pt-28 lg:px-10 lg:pb-20 lg:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(100,206,251,0.09),transparent_28%),radial-gradient(circle_at_90%_80%,rgba(123,104,238,0.07),transparent_30%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#64CEFB]/30 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1600px]"
      >
        <ProjectArchive />
      </motion.div>
    </section>
  )
}

function SectionIntro({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? '' : 'grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end'}>
      <div>
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#64CEFB]">
          <span>02</span>
          <span className="h-px w-10 bg-[#64CEFB]/45" />
          <span>Selected Work</span>
        </div>
        <h1 className="font-yahei mt-5 text-5xl font-bold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">项目分类</h1>
      </div>
      {!compact && (
        <p className="max-w-2xl text-base leading-8 text-white/46 lg:justify-self-end lg:text-lg">
          四类作品对应四种问题尺度：从复杂业务结构，到数据判断、移动任务，再到 AI 驱动的快速验证。
        </p>
      )}
    </div>
  )
}

function EditorialAtlas() {
  return (
    <div>
      <SectionIntro />
      <div className="mt-12 grid auto-rows-[230px] gap-4 lg:mt-16 lg:grid-cols-12 lg:auto-rows-[255px]">
        {categories.map((category, index) => (
          <AtlasCard
            key={category.id}
            category={category}
            className={
              index === 0
                ? 'lg:col-span-7 lg:row-span-2'
                : index === 1
                  ? 'lg:col-span-5'
                  : index === 2
                    ? 'lg:col-span-5'
                    : 'lg:col-span-12'
            }
            wide={index === 0 || index === 3}
          />
        ))}
      </div>
    </div>
  )
}

function AtlasCard({ category, className, wide }: { category: Category; className: string; wide: boolean }) {
  const Icon = category.icon
  return (
    <motion.a
      href={category.href}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative isolate overflow-hidden rounded-[28px] border border-white/[0.1] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-xl sm:p-8 ${className}`}
    >
      <span
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-[0.13] blur-3xl transition-opacity duration-500 group-hover:opacity-[0.22]"
        style={{ backgroundColor: category.accent }}
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute -bottom-8 right-4 font-yahei text-[9rem] font-bold leading-none tracking-[-0.12em] text-white/[0.025] lg:text-[12rem]" aria-hidden="true">
        {category.index}
      </span>
      <div className={`relative z-10 flex h-full ${wide ? 'flex-col justify-between' : 'flex-col'}`}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.23em]" style={{ color: category.accent }}>
              {category.english}
            </p>
            <h2 className="font-yahei mt-3 text-2xl font-bold tracking-[-0.025em] text-white sm:text-3xl">{category.label}</h2>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/[0.1] bg-black/20 text-white/55">
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <div className={wide ? 'mt-10 max-w-xl' : 'mt-auto pt-8'}>
          {wide && <p className="max-w-lg text-sm leading-7 text-white/42 sm:text-base">{category.description}</p>}
          <div className={`${wide ? 'mt-8 border-t border-white/[0.09] pt-6' : ''} flex items-end justify-between gap-5`}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">Representative project</p>
              <p className="font-yahei mt-2 text-base font-bold text-white/88 sm:text-lg">{category.project}</p>
              {wide && <p className="mt-2 text-xs text-white/35">{category.outcome}</p>}
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-white/38 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
          </div>
        </div>
      </div>
    </motion.a>
  )
}

function ImmersiveStage() {
  const [activeId, setActiveId] = useState(categories[0].id)
  const active = categories.find((category) => category.id === activeId) ?? categories[0]
  const Icon = active.icon

  return (
    <div>
      <SectionIntro />
      <div className="mt-12 overflow-hidden rounded-[34px] border border-white/[0.11] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_34px_100px_rgba(0,0,0,0.28)] lg:mt-16">
        <div className="grid lg:min-h-[650px] lg:grid-cols-[0.36fr_0.64fr]">
          <div className="border-b border-white/[0.09] p-5 lg:border-b-0 lg:border-r lg:p-6">
            <p className="px-3 pb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">Choose a field</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {categories.map((category) => {
                const CategoryIcon = category.icon
                const selected = category.id === active.id
                return (
                  <button
                    key={category.id}
                    type="button"
                    onMouseEnter={() => setActiveId(category.id)}
                    onFocus={() => setActiveId(category.id)}
                    onClick={() => setActiveId(category.id)}
                    className={`group flex min-h-[112px] items-center gap-4 rounded-[20px] px-4 py-4 text-left transition-all duration-300 ${
                      selected ? 'bg-white text-[#111016]' : 'bg-white/[0.018] text-white/46 hover:bg-white/[0.055] hover:text-white'
                    }`}
                    aria-pressed={selected}
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[15px] border ${selected ? 'border-black/10 bg-black/[0.04]' : 'border-white/[0.09] bg-white/[0.025]'}`}>
                      <CategoryIcon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[9px] font-semibold tracking-[0.18em] opacity-40">{category.index}</span>
                      <span className="font-yahei mt-1 block text-base font-bold">{category.label}</span>
                      <span className="mt-1 block truncate text-[11px] opacity-45">{category.project}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="relative overflow-hidden p-7 sm:p-10 lg:p-12 xl:p-14">
            <span
              className="pointer-events-none absolute right-[-7rem] top-[-8rem] h-[32rem] w-[32rem] rounded-full opacity-[0.12] blur-[90px]"
              style={{ backgroundColor: active.accent }}
              aria-hidden="true"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: active.accent }}>
                      {active.english}
                    </p>
                    <h2 className="font-yahei mt-5 max-w-2xl text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                      {active.project}
                    </h2>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] border border-white/[0.1] bg-black/20 text-white/58">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <p className="mt-8 max-w-2xl text-base leading-8 text-white/46 sm:text-lg">{active.description}</p>

                <div className="mt-10 grid gap-5 border-y border-white/[0.09] py-7 sm:grid-cols-2">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/24">Design role</p>
                    <p className="mt-3 text-sm leading-6 text-white/65">{active.role}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/24">Project value</p>
                    <p className="mt-3 text-sm leading-6 text-white/65">{active.outcome}</p>
                  </div>
                </div>

                <div className="mt-auto flex flex-col items-start justify-between gap-6 pt-10 sm:flex-row sm:items-end">
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[11px] text-white/42">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={active.href} className="group inline-flex items-center gap-3 rounded-[15px] bg-white px-5 py-3.5 text-sm font-semibold text-[#111016] transition-transform duration-300 hover:-translate-y-0.5">
                    查看案例
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectArchive() {
  const reduceMotion = useReducedMotion()

  return (
    <div>
      <div className="grid gap-10 border-b border-white/[0.1] pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:pb-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -56, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ type: 'spring', stiffness: 92, damping: 22, mass: 0.82 }}
        >
          <SectionIntro compact />
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 56, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 92, damping: 22, mass: 0.82 }}
          className="lg:justify-self-end"
        >
          <p className="max-w-xl text-base leading-8 text-white/46">
            以项目档案的方式呈现能力范围，减少装饰，让项目类型、设计角色与成果证据更容易被比较。
          </p>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/24">04 fields · 04 representative cases</p>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 64, scale: 0.965, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 grid overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#0a0b0f]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:min-h-[720px] lg:auto-rows-fr lg:grid-cols-2 xl:min-h-[680px]"
      >
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <motion.article
              key={category.id}
              initial={reduceMotion ? false : { opacity: 0, y: 44, scale: 0.975 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ delay: index * 0.08, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden p-5 transition-all duration-500 hover:bg-white/[0.045] sm:p-7 lg:p-8 xl:p-9 ${
                index > 0 ? 'border-t border-white/[0.09]' : ''
              } ${index === 1 ? 'lg:border-l lg:border-t-0' : ''} ${index === 2 ? 'lg:border-t' : ''} ${
                index === 3 ? 'lg:border-l lg:border-t' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full opacity-0 blur-[90px] transition-opacity duration-500 group-hover:opacity-[0.18]"
                style={{ backgroundColor: category.accent }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-px origin-center scale-y-0 opacity-0 transition-all duration-500 group-hover:scale-y-100 group-hover:opacity-80"
                style={{ backgroundColor: category.accent }}
              />

              <div className="relative z-10 grid h-full gap-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-stretch sm:gap-5 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-8">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0.4, scale: 1.14 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.42 }}
                  transition={{ delay: 0.08 + index * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[16/10] w-full self-center overflow-hidden rounded-[20px] border border-white/[0.10] bg-white/[0.025] transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.025] group-hover:border-white/25 group-hover:bg-white/[0.055] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.36)]"
                  aria-label={`${category.label} 项目图片预留区域`}
                  role="img"
                >
                  <span
                    className="pointer-events-none absolute -right-14 -top-16 h-44 w-44 rounded-full opacity-[0.16] blur-3xl"
                    style={{ backgroundColor: category.accent }}
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 text-[10px] font-semibold tracking-[0.2em] text-white/30">
                    {category.index}
                  </span>
                  <span className="absolute inset-0 grid place-items-center text-white/28 transition-all duration-500 group-hover:scale-105 group-hover:text-white/55">
                    <Icon className="h-10 w-10" />
                  </span>
                  <span className="absolute bottom-4 left-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/22">
                    Project image
                  </span>
                </motion.div>

                <div className="flex min-w-0 flex-col py-1 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: category.accent }}>
                        {category.label}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/42">{category.description}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 cursor-default place-items-center rounded-full border border-white/[0.11] text-white/38 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-[#08080b] group-hover:shadow-[0_10px_30px_rgba(255,255,255,0.16)]"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-8 sm:mt-auto sm:pt-8">
                    <h2 className="font-yahei text-2xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-[1.7rem] xl:text-3xl">
                      {category.project}
                    </h2>
                    <div className="mt-4 flex items-start gap-3 border-t border-white/[0.08] pt-4">
                      <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/24">角色定位</span>
                      <p className="text-xs leading-5 text-white/50 sm:text-sm">{category.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          )
        })}
      </motion.div>

    </div>
  )
}

function WarmProjectArchive() {
  const [activeId, setActiveId] = useState(categories[0].id)

  return (
    <div>
      <div className="grid gap-10 border-b border-[#1c1713]/18 pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:pb-12">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b54830]">
            <span>02</span>
            <span className="h-px w-10 bg-[#b54830]/55" />
            <span>Selected Work</span>
          </div>
          <h1 className="font-yahei mt-5 text-5xl font-bold tracking-[-0.055em] text-[#1c1713] sm:text-6xl lg:text-7xl">
            项目分类
          </h1>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-xl text-base leading-8 text-[#1c1713]/65">
            以编辑档案的方式呈现能力范围，让项目类型、设计角色与成果证据形成清晰的阅读节奏。
          </p>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c1713]/38">
            04 fields · 04 representative cases
          </p>
        </div>
      </div>

      <div className="mt-6 divide-y divide-[#1c1713]/15 border-b border-[#1c1713]/18">
        {categories.map((category) => {
          const Icon = category.icon
          const selected = activeId === category.id

          return (
            <article key={category.id}>
              <button
                type="button"
                onClick={() => setActiveId(category.id)}
                className="group grid w-full gap-5 py-7 text-left outline-none transition-colors hover:bg-[#1c1713]/[0.025] focus-visible:bg-[#1c1713]/[0.04] sm:grid-cols-[70px_1fr_auto] sm:items-center lg:py-8"
                aria-expanded={selected}
              >
                <span className="text-xs font-semibold tracking-[0.18em] text-[#1c1713]/40 transition-colors group-hover:text-[#b54830]">
                  {category.index}
                </span>
                <span className="flex items-center gap-4">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] border transition-all duration-300 ${
                      selected
                        ? 'border-[#b54830] bg-[#b54830] text-[#fffaf1] shadow-[0_10px_24px_rgba(181,72,48,0.18)]'
                        : 'border-[#1c1713]/15 bg-[#fffaf1]/45 text-[#1c1713]/55 group-hover:border-[#1c1713]/28 group-hover:text-[#1c1713]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="font-yahei block text-2xl font-bold tracking-[-0.025em] text-[#1c1713] sm:text-3xl">
                      {category.label}
                    </span>
                    <span className="mt-1.5 block text-[10px] uppercase tracking-[0.19em] text-[#1c1713]/35">
                      {category.english}
                    </span>
                  </span>
                </span>
                <span className="flex items-center gap-3 text-xs text-[#1c1713]/48">
                  {selected ? '收起信息' : '展开项目'}
                  <ArrowUpRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      selected
                        ? 'rotate-90 text-[#b54830]'
                        : 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1c1713]'
                    }`}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {selected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-9 pl-0 sm:pl-[86px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-11">
                      <div>
                        <p className="font-yahei text-xl font-bold text-[#1c1713] sm:text-2xl">{category.project}</p>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#1c1713]/62 sm:text-base">
                          {category.description}
                        </p>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b54830]">Design role</p>
                          <p className="mt-2 text-sm text-[#1c1713]/68">{category.role}</p>
                        </div>
                        <div className="flex items-end justify-between gap-5 border-t border-[#1c1713]/14 pt-5">
                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b54830]">Outcome</p>
                            <p className="mt-2 text-sm leading-6 text-[#1c1713]/68">{category.outcome}</p>
                          </div>
                          <a
                            href={category.href}
                            aria-label={`查看${category.project}`}
                            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#1c1713]/22 text-[#1c1713]/60 transition-all hover:border-[#1c1713] hover:bg-[#1c1713] hover:text-[#fffaf1]"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          )
        })}
      </div>

      <div className="mt-12 overflow-hidden rounded-[28px] bg-[#201915] text-[#f4eee3] shadow-[0_28px_70px_rgba(45,30,23,0.16)] lg:mt-14">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
          <div className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#e5795d]">
              <span>Project archive</span>
              <span className="h-px w-10 bg-[#e5795d]/55" />
              <span className="text-white/30">Read the process</span>
            </div>
            <h3 className="font-yahei mt-5 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.035em] sm:text-3xl">
              不只展示结果，也呈现从问题到落地的完整推导。
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/48 sm:text-base">
              继续查看代表项目，了解业务目标、信息架构、关键交互与设计协同如何形成可验证的产品方案。
            </p>
          </div>

          <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-10">
            <div className="grid grid-cols-3 gap-5">
              {[
                ['03', '代表项目'],
                ['04', '能力方向'],
                ['05', '年行业经验'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{value}</p>
                  <p className="mt-2 text-[10px] leading-5 text-white/35 sm:text-xs">{label}</p>
                </div>
              ))}
            </div>
            <a
              href="/?page=experience"
              className="group mt-9 inline-flex w-full items-center justify-between rounded-[16px] bg-[#e5795d] px-5 py-4 text-sm font-semibold text-[#201915] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f08a6f]"
            >
              查看完整项目经历
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { ShowcaseVariant }

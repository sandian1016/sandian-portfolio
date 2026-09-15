import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CalendarDays, Layers3, Target } from 'lucide-react'
import { GlowCard } from './glow-card'
import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'

const projects = [
  {
    id: 'south-new-city',
    index: '01',
    period: '2025.08 - 2025.10',
    title: '南部新城可视化大屏',
    english: 'Nanjing South New City Visualization',
    category: '数据可视化 / B · G 端',
    role: 'UI 交互设计师',
    summary:
      '以数字孪生与智慧城市理念为基础，构建覆盖“规划、建造、运管”全周期的可视化指挥与决策系统，让城市运行态势从宏观总览下钻至微观设备。',
    challenge:
      '近 6 亿条 GIS、BIM、IoT 与业务流数据需要实时融合；同时还要打通“规、建、管、运、治”跨部门链路，并在有限大屏空间中平衡全局洞察与微观下钻。',
    work: [
      '构建“宏观—中观—微观”三级可视化体系，形成城市全景、场景看板与设备孪生的连续认知路径。',
      '建立深蓝与青色为主、告警橙红为辅的科技视觉语言，并设计数据流转、镜头缩放和楼层剖分动效。',
      '规划时间轴回溯、地理围栏筛选、多端联动与即时标注等交互，支持跨层级指挥和业务协同。',
      '将能耗、人流与城市体征转化为动态折线图、3D 热力图和桑基图，提升趋势洞察与决策效率。',
    ],
    results: [
      '入选国家数据局“数据要素 × 城市治理”典型案例，形成全国智慧城市建设的示范样本。',
      '实现对 6 大智能建造示范项目及全域市政设施的一屏统管，运维效率提升约 40%，故障响应缩短至分钟级。',
      '验证“CIM + IoT + AI”技术路线，沉淀可复制的建设标准与数据规范，为其他片区数字化开发提供依据。',
    ],
    tags: ['数字孪生', '智慧城市', '数据可视化', '决策大屏'],
  },
  {
    id: 'load-platform',
    index: '02',
    period: '2021.06 — 2021.09',
    title: '新型负荷管理平台 II',
    english: 'New Load Management Platform II',
    category: 'B · G 端产品 / 数据可视化',
    role: 'UI 交互设计师',
    summary:
      '面向吉林省电力负荷管理场景，搭建覆盖指标管理、方案管理、执行监测与市级评价分析的业务平台，形成从方案制定到执行复盘的管理闭环。',
    challenge: '省、市两级管理角色协同复杂，指标、方案、用户分配与执行结果分散，缺少统一的过程监控视图。',
    work: [
      '梳理多角色业务流程，规划指标、方案、监测与评价四大模块的信息架构。',
      '设计指标维护及方案创建、编辑、用户分配与配置确认等关键交互。',
      '通过地图、趋势图与状态信息构建执行监测大屏，突出异常与执行进度。',
      '统一表格、弹窗、筛选和图表组件规范，配合研发完成高保真设计交付。',
    ],
    results: [
      '实现指标配置、方案下发、执行监控与效果评价的全流程数字化闭环。',
      '集中呈现负荷调控信息，提升省、市两级管理人员的协同与决策效率。',
      '沉淀后台管理与数据可视化规范，为后续多地区复用与产品迭代提供基础。',
    ],
    tags: ['信息架构', '方案管理', '执行监测', '评价分析'],
  },
  {
    id: 'fire-visualization',
    index: '03',
    period: '2023.11 — 至今',
    title: '格物消防可视化大屏',
    english: 'Gewu Fire Safety Visualization',
    category: '智慧消防 / 数据可视化',
    role: 'UI 交互设计师',
    summary:
      '面向城市级与园区级智慧消防运营，以“多维感知、业务联动、闭环处置”为核心，打造监督管理一张图与应急指挥决策体验。',
    challenge: '海量设备状态、告警事件与空间信息同时涌入，需要兼顾日常态势监控和火情应急指挥两类高时效场景。',
    work: [
      '参与业务共创，拆解日常监控与应急指挥场景，设计多级告警推送与处置闭环。',
      '主导从 0 到 1 的信息架构和高保真原型，构建设备、故障、隐患与空间地图的交互链路。',
      '搭建大屏可视化组件库与交互规范，统一预警弹窗、地图分布和数据指标模块。',
      '协同产品与研发推进一期落地，并持续支撑后续全国范围的产品布局。',
    ],
    results: [
      '设计方案在客户高层评审中获得认可，推动项目一期高质量落地。',
      '大屏体验成为产品核心亮点，支撑项目二期向全国范围推进。',
      '根据简历记录，项目最终驱动部门实现 10 亿元商业创收。',
    ],
    tags: ['智慧消防', '实时告警', '指挥决策', '可视化组件库'],
    highlight: '10 亿元',
    highlightLabel: '商业创收支撑',
  },
]

const glassAccents = ['100, 206, 251', '132, 137, 255', '91, 226, 205']

export function ProjectExperiencePage() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#08080b] px-5 pb-24 pt-36 text-white sm:px-8 md:pt-40 lg:px-10 lg:pb-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_4%,rgba(0,85,255,0.11),transparent_25%),radial-gradient(circle_at_91%_36%,rgba(0,85,255,0.08),transparent_28%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <a
            href="/#about"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/42 transition-colors duration-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            返回个人简介
          </a>

          <div className="mt-10 grid gap-10 border-b border-white/[0.1] pb-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                <span>Selected Work</span>
                <span className="h-px w-12 bg-brand/50" />
                <span>2021 — Now</span>
              </div>
              <h1 className="font-yahei mt-7 text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[6.6rem]">
                项目经历
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-base leading-8 text-white/48 sm:text-lg">
                从电力负荷管理到智慧消防，以业务理解、信息架构和交互验证，推动复杂系统从需求走向稳定落地。
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {['B / G 端产品', '数据可视化', '移动端产品'].map((item) => (
                  <span key={item} className="rounded-full border border-white/[0.1] bg-white/[0.035] px-4 py-2 text-xs text-white/45">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid border-b border-white/[0.09] py-8 sm:grid-cols-3">
            {[
              ['03', '代表项目'],
              ['05 Years', '产品设计经验'],
              ['01:01', '设计落地还原'],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`py-4 sm:px-7 sm:py-2 ${index > 0 ? 'border-t border-white/[0.08] sm:border-l sm:border-t-0' : ''}`}
              >
                <p className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{value}</p>
                <p className="mt-2 text-xs text-white/32">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 space-y-8 lg:mt-20 lg:space-y-10">
          {projects.map((project, projectIndex) => (
            <Reveal key={project.id} delay={0.06 + projectIndex * 0.06}>
              <LiquidGlassCard
                id={project.id}
                accent={glassAccents[projectIndex]}
              >
                <div className="grid lg:grid-cols-[0.82fr_2.18fr]">
                  <div className="relative border-b border-white/[0.09] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                    <span className="font-yahei text-7xl font-bold tracking-[-0.08em] text-white/[0.055] sm:text-8xl">
                      {project.index}
                    </span>
                    <div className="mt-10 space-y-5">
                      <Meta icon={<CalendarDays className="h-4 w-4" />} label="项目周期" value={project.period} />
                      <Meta icon={<BriefcaseBusiness className="h-4 w-4" />} label="担任角色" value={project.role} />
                      <Meta icon={<Layers3 className="h-4 w-4" />} label="项目类型" value={project.category} />
                    </div>
                    {project.highlight && (
                      <div className="mt-9 border-t border-white/[0.08] pt-7">
                        <p className="text-3xl font-semibold tracking-[-0.04em] text-brand">{project.highlight}</p>
                        <p className="mt-2 text-xs text-white/32">{project.highlightLabel}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-7 sm:p-9 lg:p-10 xl:p-12">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-brand">{project.english}</p>
                    <h2 className="font-yahei mt-4 text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
                      {project.title}
                    </h2>
                    <p className="mt-6 max-w-4xl text-base leading-8 text-white/50 sm:text-lg">{project.summary}</p>

                    <div className="mt-9 rounded-[20px] border border-white/[0.08] bg-black/20 px-5 py-5 sm:px-6">
                      <div className="flex items-start gap-3">
                        <Target className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/28">核心挑战</p>
                          <p className="mt-2 text-sm leading-6 text-white/52">{project.challenge}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 grid gap-10 xl:grid-cols-2 xl:gap-12">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">Design Contribution</p>
                        <h3 className="font-yahei mt-3 text-lg font-bold text-white">核心设计工作</h3>
                        <ol className="mt-6 space-y-4">
                          {project.work.map((item, index) => (
                            <li key={item} className="flex gap-4 text-sm leading-6 text-white/43">
                              <span className="mt-0.5 text-[10px] font-semibold tracking-[0.14em] text-brand">0{index + 1}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">Project Outcome</p>
                        <h3 className="font-yahei mt-3 text-lg font-bold text-white">项目成果</h3>
                        <ul className="mt-6 space-y-4">
                          {project.results.map((item) => (
                            <li key={item} className="flex gap-4 text-sm leading-6 text-white/43">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_10px_rgba(0,85,255,0.5)]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3.5 py-2 text-[11px] text-white/38">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-16 flex flex-col items-start justify-between gap-7 border-t border-white/[0.1] pt-10 sm:flex-row sm:items-center lg:mt-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.23em] text-brand">Next</p>
              <p className="font-yahei mt-3 text-2xl font-bold text-white">继续了解我的设计能力与工作方法</p>
            </div>
            <a
              href="/#about"
              className="group inline-flex items-center gap-3 rounded-[15px] bg-white px-6 py-4 text-sm font-semibold text-[#111016] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              返回个人简介
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function LiquidGlassCard({ id, accent, children }: { id: string; accent: string; children: ReactNode }) {
  const cardRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion || !cardRef.current) return
    const bounds = cardRef.current.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    cardRef.current.style.setProperty('--glass-x', `${x}%`)
    cardRef.current.style.setProperty('--glass-y', `${y}%`)
  }

  const resetLight = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--glass-x', '50%')
    cardRef.current.style.setProperty('--glass-y', '0%')
  }

  return (
    <div
      className="relative"
      style={{ '--glass-accent': accent } as CSSProperties & Record<string, string>}
    >
      <span className="liquid-glass-backdrop" aria-hidden="true" />
      <motion.div
        whileHover={reduceMotion ? undefined : { y: -5, scale: 1.0015 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <GlowCard radius={34}>
          <article
            ref={cardRef}
            id={id}
            className="liquid-glass-card group relative overflow-hidden rounded-[33px] border-transparent"
            style={
              {
                '--glass-x': '50%',
                '--glass-y': '0%',
                '--glass-accent': accent,
              } as CSSProperties & Record<string, string>
            }
            onPointerMove={handlePointerMove}
            onPointerLeave={resetLight}
          >
            <span className="liquid-glass-ambient" aria-hidden="true" />
            <span className="liquid-glass-refraction" aria-hidden="true" />
            <span className="liquid-glass-sheen" aria-hidden="true" />
            <div className="relative z-[2]">{children}</div>
          </article>
        </GlowCard>
      </motion.div>
    </div>
  )
}

function Meta({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-brand">{icon}</span>
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30">{label}</p>
        <p className="mt-1.5 text-[14px] leading-6 text-white/58">{value}</p>
      </div>
    </div>
  )
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Database,
  FileCheck2,
  Goal,
  Route,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const businessScopes = [
  {
    index: '01',
    title: '负荷资源',
    description: '聚合商、有序用电用户、用户档案与资源关系管理。',
    icon: UsersRound,
  },
  {
    index: '02',
    title: '需求响应',
    description: '响应任务创建、用户邀约、执行监测与结果审核。',
    icon: Workflow,
  },
  {
    index: '03',
    title: '有序用电',
    description: '用户资源组织、任务策略与执行过程协同。',
    icon: Activity,
  },
  {
    index: '04',
    title: '方案管理',
    description: '应急方案与负控方案的配置、流转、审核和归档。',
    icon: FileCheck2,
  },
  {
    index: '05',
    title: '运行管理',
    description: '围绕状态、任务和控制建立连续的运行管理路径。',
    icon: ShieldCheck,
  },
  {
    index: '06',
    title: '数据统计',
    description: '对资源、执行与业务结果进行多维统计和过程追溯。',
    icon: Database,
  },
]

const projectStrategy = [
  {
    index: '01',
    label: '设计目标',
    icon: Goal,
    title: '让复杂业务快速形成判断',
    description:
      '围绕多角色、多区域与多任务协同，建立清晰的信息优先级，让管理者在关键节点快速掌握资源、进度与风险。',
    points: ['统一业务入口与导航层级', '突出核心指标和异常状态', '降低跨模块理解与操作成本'],
  },
  {
    index: '02',
    label: '落地举措',
    icon: Route,
    title: '从资源管理进入任务闭环',
    description:
      '以资源列表、用户档案、响应执行和方案审核为主线，串联需求响应、有序用电与运行管理等高频场景。',
    points: ['列表、详情与审核路径统一', '监测、分析、执行逻辑一致', '沉淀可复用组件与状态规范'],
  },
  {
    index: '03',
    label: '设计亮点',
    icon: Sparkles,
    title: '复杂任务保持一致判断逻辑',
    description:
      '将用户、资源、执行进度、审核状态与操作反馈组织为连续任务视野，兼顾信息密度、操作效率与业务深度。',
    points: ['高密度信息仍保持层级清晰', '多维条件支持快速定位任务', '复杂系统保持稳定视觉秩序'],
  },
]

const heroPages = [
  {
    id: 'overview',
    number: '01',
    label: '项目概览',
    title: '新型负荷管理平台 II',
    description: '面向省级电力负荷管理场景，重构从资源汇聚、方案管理到响应执行的复杂业务体验。',
    image: '/assets/bg-product-hero.png',
    alt: '新型负荷管理平台工业场景主视觉',
  },
  {
    id: 'business',
    number: '02',
    label: '业务全景',
    title: '让关键状态快速被理解',
    description: '在同一判断视野中组织资源规模、响应进度、异常状态与业务结果，减少跨页面比对。',
    image: '/projects/bg/load-overview.png',
    alt: '新型负荷管理平台业务总览界面',
  },
  {
    id: 'strategy',
    number: '03',
    label: '设计策略',
    title: '从目标到落地形成完整闭环',
    description: '围绕设计目标、落地举措与设计亮点，建立可验证、可复用、可持续演进的复杂业务体验。',
    image: '/projects/bg/load-overview.png',
    alt: '新型负荷管理平台设计策略界面',
  },
]

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function HeroPager() {
  const [activePage, setActivePage] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const active = heroPages[activePage]

  useEffect(() => {
    if (paused || reduceMotion) return
    const timer = window.setInterval(() => {
      setActivePage((page) => (page + 1) % heroPages.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  const move = (direction: number) => {
    setActivePage((page) => (page + direction + heroPages.length) % heroPages.length)
  }

  return (
    <motion.div
      className="relative mx-auto mt-14 w-full max-w-[1000px] sm:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="轮播图"
      aria-label="B / G 端产品项目分页"
      initial={reduceMotion ? false : { opacity: 0, y: 46, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.24, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-x-[8%] -top-9 bottom-[62px] z-0 rounded-[24px] border border-[#dce3ea] bg-white/70 shadow-[0_10px_40px_rgba(31,56,76,0.08)]" />
      <div className="pointer-events-none absolute inset-x-[4%] -top-[18px] bottom-[62px] z-0 rounded-[24px] border border-[#dce3ea] bg-white/88 shadow-[0_16px_50px_rgba(31,56,76,0.09)]" />

      <div className="relative z-10 overflow-hidden rounded-[24px] border border-[#d7dee5] bg-white p-2.5 shadow-[0_28px_80px_rgba(31,56,76,0.16)] sm:p-3">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={reduceMotion ? false : { opacity: 0, x: 42, scale: 0.992, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -36, scale: 0.992, filter: 'blur(7px)' }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[430px] overflow-hidden rounded-[17px] bg-[#f5f7f9] sm:min-h-[520px]"
          >
            <motion.img
              key={active.image + active.id}
              src={active.image}
              alt={active.alt}
              className={`absolute inset-0 h-full w-full object-cover ${active.id === 'business' ? 'object-left-top' : active.id === 'strategy' ? 'object-right-top' : 'object-center'}`}
              initial={reduceMotion ? false : { scale: 1.035 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="relative z-20 mx-auto mt-7 flex w-fit max-w-full items-center gap-2 rounded-full border border-[#dde3e8] bg-white/82 p-1.5 shadow-[0_10px_34px_rgba(31,56,76,0.08)] backdrop-blur-xl">
        <button type="button" onClick={() => move(-1)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#56616a] transition-all duration-300 hover:bg-[#f2f4f6] hover:text-[#202a32]" aria-label="上一页">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {heroPages.map((page, index) => (
            <button
              key={page.id}
              type="button"
              onClick={() => setActivePage(index)}
              className={`group flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-left transition-all duration-300 ${
                index === activePage ? 'bg-[#f0f3f5]' : 'hover:bg-[#f5f6f7]'
              }`}
              aria-current={index === activePage ? 'true' : undefined}
            >
              <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${index === activePage ? 'bg-[#00A3FF]' : 'bg-[#59636b]/16'}`} />
              <span className="text-[11px] font-semibold text-[#4f5961]">{page.number}</span>
              <span className="hidden text-[11px] font-semibold text-[#4f5961] sm:inline">{page.label}</span>
            </button>
          ))}
        </div>
        <span className="hidden min-w-[52px] text-center text-[11px] font-semibold tracking-[0.12em] text-[#647078] md:block">
          {String(activePage + 1).padStart(2, '0')} / 03
        </span>
        <button type="button" onClick={() => move(1)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#56616a] transition-all duration-300 hover:bg-[#f2f4f6] hover:text-[#202a32]" aria-label="下一页">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}

export function BgProductPage() {
  return (
    <div className="overflow-hidden bg-[#fafafa] text-[#202a32]">
      <section id="bg-product-home" className="relative isolate min-h-screen overflow-hidden bg-[#fafafa] px-5 pb-24 pt-32 sm:px-8 md:pt-36 lg:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(55,65,75,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(55,65,75,0.055)_1px,transparent_1px)] [background-size:82px_82px]" />
        <div className="pointer-events-none absolute left-1/2 top-[32%] h-[600px] w-[980px] -translate-x-1/2 rounded-full bg-white blur-[130px]" />

        <div className="relative mx-auto max-w-[1320px]">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 38, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.16, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-bold tracking-[0.24em] text-[#6c7680]">B / G 端产品 · 01</p>
            <h1 className="font-yahei mx-auto mt-7 max-w-[860px] text-[clamp(3rem,5vw,4.4rem)] font-medium leading-[0.96] tracking-[-0.052em] text-[#444547]">
              在复杂业务中，<br />建立清晰的管理判断
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#60656b]/72 sm:text-base sm:leading-8">
              以新型负荷管理平台为代表项目，呈现从业务理解、信息架构到交互验证与设计落地的完整过程。
            </p>
          </motion.div>

          <HeroPager />

          <a href="#project-intro" className="group mx-auto mt-12 flex w-fit items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-[#4f555a]/58 transition-colors hover:text-[#202a32]">
            继续浏览项目
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#27323b]/10 bg-white transition-transform duration-300 group-hover:translate-y-1">
              <ArrowDown className="h-4 w-4" />
            </span>
          </a>
        </div>
      </section>

      <section id="project-intro" className="relative bg-[linear-gradient(180deg,#fafafa_0%,#f4f9fc_14%,#f8fbfd_100%)] px-5 py-20 sm:px-8 md:py-28 lg:px-10 lg:py-32">
        <div className="pointer-events-none absolute left-[-12%] top-0 h-[520px] w-[520px] rounded-full bg-[#bcecff]/42 blur-[130px]" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="grid gap-12 border-b border-[#173149]/10 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pb-24">
            <Reveal>
              <div className="flex items-center gap-4 text-[11px] font-bold tracking-[0.22em] text-[#00A3FF]">
                <span>02</span>
                <span className="h-px w-12 bg-[#00A3FF]/35" />
                <span>项目介绍</span>
              </div>
              <h2 className="font-yahei mt-8 max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[3.15rem]">
                <span className="block">让复杂业务链路，</span>
                <span className="mt-2 block text-[#00A3FF]">保持清晰可控。</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[#00A3FF]">项目背景</p>
              <p className="font-yahei mt-6 text-xl font-semibold leading-9 text-[#173149] sm:text-2xl sm:leading-10">
                省级负荷管理平台同时承载资源汇聚、需求响应、有序用电、方案管理与运行监测等复杂任务。
              </p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#315069]/66">
                项目需要面对多区域、多角色与多层级业务协同。设计从负荷资源、需求响应与运行管理等高频链路入手，重新梳理列表、详情、配置与审核等关键任务，并通过稳定的信息层级与交互规范支撑后续业务扩展。
              </p>

              <div className="mt-10 grid gap-px overflow-hidden rounded-[20px] border border-[#173149]/10 bg-[#173149]/10 shadow-[0_18px_52px_rgba(53,94,122,0.08)] sm:grid-cols-3">
                {[
                  ['项目类型', 'B / G 端复杂业务系统'],
                  ['设计角色', '产品策略 · 体验设计 · 规范搭建'],
                  ['核心范围', '负荷资源 · 需求响应 · 运行管理'],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/88 px-5 py-5 backdrop-blur-xl">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#315069]/48">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-[#173149]/82">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="border-b border-[#173149]/10 py-16 lg:py-24">
            <Reveal className="grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-20">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#00A3FF]">业务范围</p>
                <h3 className="font-yahei mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">从功能页提取的业务版图</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-[#315069]/62">
                  项目内容依据各业务模块的页面结构、操作任务与状态流转进行归纳，呈现真实的产品复杂度。
                </p>
              </div>

              <div className="grid gap-px overflow-hidden rounded-[24px] border border-[#173149]/10 bg-[#173149]/10 shadow-[0_24px_70px_rgba(43,86,116,0.09)] sm:grid-cols-2">
                {businessScopes.map((scope) => {
                  const Icon = scope.icon
                  return (
                    <div key={scope.title} className="group bg-white/84 p-5 backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-[inset_0_0_0_1px_rgba(0,163,255,0.18)] sm:p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-[0.18em] text-[#315069]/38">{scope.index}</span>
                        <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#173149]/8 bg-[#e8f5fb] text-[#00A3FF] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                          <Icon className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="font-yahei mt-6 text-lg font-bold text-[#102235]">{scope.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#315069]/62">{scope.description}</p>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>

          <div className="pt-16 lg:pt-24">
            <Reveal className="mb-8 flex items-end justify-between gap-8">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#00A3FF]">设计拆解</p>
                <h3 className="font-yahei mt-4 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">从目标到落地的设计路径</h3>
              </div>
              <span className="hidden text-xs font-semibold tracking-[0.16em] text-[#315069]/40 sm:block">目标 · 举措 · 亮点</span>
            </Reveal>

            <div className="grid overflow-hidden rounded-[28px] border border-[#173149]/10 bg-[#173149]/10 shadow-[0_28px_80px_rgba(44,88,116,0.10)] lg:grid-cols-3">
              {projectStrategy.map((item, index) => {
                const Icon = item.icon
                return (
                  <Reveal
                    key={item.label}
                    delay={index * 0.09}
                    className={`relative bg-white/88 p-6 backdrop-blur-xl sm:p-8 lg:min-h-[430px] lg:p-9 ${index > 0 ? 'border-t border-[#173149]/10 lg:border-l lg:border-t-0' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] font-bold tracking-[0.18em] text-[#00A3FF]">{item.index}</span>
                      <span className="grid h-10 w-10 place-items-center rounded-[13px] border border-[#173149]/9 bg-[#e9f6fb] text-[#00A3FF]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                    </div>
                    <p className="mt-12 text-[11px] font-bold tracking-[0.18em] text-[#315069]/44">{item.label}</p>
                    <h4 className="font-yahei mt-3 text-2xl font-bold leading-tight tracking-[-0.025em] text-[#102235]">{item.title}</h4>
                    <p className="mt-5 text-sm leading-7 text-[#315069]/64">{item.description}</p>
                    <ul className="mt-8 space-y-3 border-t border-[#173149]/9 pt-6">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm leading-6 text-[#315069]/76">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00A3FF] shadow-[0_0_10px_rgba(0,163,255,0.45)]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

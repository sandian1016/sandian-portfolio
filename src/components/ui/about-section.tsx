import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BriefcaseBusiness, MapPin, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BorderGlow } from './border-glow'
import { GlowCard } from './glow-card'

const career = [
  {
    period: '2023.09 — 至今',
    company: '联通物联网责任有限公司',
    role: '产品设计师',
    description: '聚焦物联网产品与数据可视化体验，推动复杂业务从需求共创、交互设计到开发验收的全链路落地。',
  },
  {
    period: '2021.04 — 2023.06',
    company: '国电南瑞科学研究院',
    role: 'UI交互设计师',
    description: '深耕电力行业 B / G 端产品，负责信息架构、复杂流程、可视化界面与统一设计规范。',
  },
]

const capabilities = [
  {
    index: '01',
    title: '复杂 B / G 端产品',
    description: '拆解多角色、多层级业务流程，建立清晰的信息架构与可复用交互规范。',
  },
  {
    index: '02',
    title: '数据可视化',
    description: '将实时监控、告警与决策数据转化为层级明确、响应高效的可视化体验。',
  },
  {
    index: '03',
    title: '移动端产品',
    description: '把专业长流程转化为轻量、可续填、状态清晰的移动任务体验。',
  },
  {
    index: '04',
    title: 'AI 设计',
    description: '使用 AIGC 与 AI 编程工具加速视觉探索、原型验证与高保真交付。',
  },
]

const outcomes = [
  { value: '+68%', label: '用户操作效率' },
  { value: '+80%', label: '产品视觉满意度' },
  { value: '1:1', label: '设计落地还原' },
]

const designProcess = [
  {
    index: '01',
    english: 'Discover',
    title: '业务理解',
    description: '明确用户、角色与核心目标',
  },
  {
    index: '02',
    english: 'Structure',
    title: '信息架构',
    description: '组织流程、层级与业务规则',
  },
  {
    index: '03',
    english: 'Validate',
    title: '交互验证',
    description: '通过原型、测试与迭代验证体验',
  },
  {
    index: '04',
    english: 'Deliver',
    title: '落地协同',
    description: '完成规范、验收与设计复盘',
  },
]

type ProfileVariant = 'editorial' | 'timeline' | 'manifesto'

const profileVariants: Array<{ id: ProfileVariant; index: string; title: string; description: string }> = [
  { id: 'editorial', index: '01', title: '编辑双栏', description: '定位、经历与方法并置' },
  { id: 'timeline', index: '02', title: '职业时间轴', description: '强调成长路径与阶段' },
  { id: 'manifesto', index: '03', title: '设计宣言', description: '突出观点与专业方向' },
]

export function AboutSection({ previewMode = false }: { previewMode?: boolean }) {
  const [activeCapability, setActiveCapability] = useState(0)
  const [profileVariant, setProfileVariant] = useState<ProfileVariant>('editorial')
  const active = capabilities[activeCapability]

  return (
    <section
      id="about"
      className={`relative isolate min-h-screen scroll-mt-6 overflow-hidden border-t border-white/[0.09] bg-[#08080b] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 ${
        previewMode ? 'pb-20 pt-12 md:pb-24 md:pt-14 lg:pb-28 lg:pt-16' : 'py-20 md:py-28 lg:py-32'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(100,206,251,0.09),transparent_27%),radial-gradient(circle_at_88%_72%,rgba(107,91,210,0.07),transparent_28%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#64CEFB]/35 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1920px]">
        {previewMode && (
          <Reveal>
            <div className="mb-12 overflow-hidden rounded-[24px] border border-white/[0.11] bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
              <div className="grid gap-2 md:grid-cols-3">
                {profileVariants.map((variant) => {
                  const selected = profileVariant === variant.id
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setProfileVariant(variant.id)}
                      className={`group rounded-[17px] px-5 py-4 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#64CEFB]/60 ${
                        selected ? 'bg-white text-[#111016]' : 'bg-white/[0.02] text-white/52 hover:bg-white/[0.06] hover:text-white'
                      }`}
                      aria-pressed={selected}
                    >
                      <span className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold tracking-[0.2em] opacity-45">{variant.index}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${selected ? 'bg-[#0c8fc6]' : 'bg-white/20'}`} />
                      </span>
                      <span className="font-yahei mt-2 block text-base font-bold">{variant.title}</span>
                      <span className="mt-1.5 block text-xs opacity-55">{variant.description}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={profileVariant}
            initial={previewMode ? { opacity: 0, y: 16, filter: 'blur(8px)' } : false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={previewMode ? { opacity: 0, y: -10, filter: 'blur(6px)' } : undefined}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {profileVariant === 'editorial' && (
              <EditorialProfile
                activeCapability={activeCapability}
                setActiveCapability={setActiveCapability}
                active={active}
              />
            )}
            {profileVariant === 'timeline' && <TimelineProfile />}
            {profileVariant === 'manifesto' && (
              <ManifestoProfile
                activeCapability={activeCapability}
                setActiveCapability={setActiveCapability}
                active={active}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

type CapabilityProfileProps = {
  activeCapability: number
  setActiveCapability: (index: number) => void
  active: (typeof capabilities)[number]
}

function EditorialProfile({ activeCapability, setActiveCapability, active }: CapabilityProfileProps) {
  return (
    <div>
      <div className="grid gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-20">
      <Reveal direction="left">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#64CEFB]">
              <span>01</span>
              <span className="h-px w-10 bg-[#64CEFB]/55" />
              <span>About / Profile</span>
            </div>

            <h2 className="font-yahei mt-8 max-w-4xl text-4xl font-bold leading-[1.06] tracking-[-0.055em] text-white sm:text-6xl lg:text-[3.55rem] xl:text-[3.75rem]">
              <span className="block">设计不是装饰，</span>
              <span className="mt-3 block text-white/48">是让复杂业务更清晰。</span>
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/52 sm:text-lg">
              我是邓威，一名 UI 交互设计师。专注复杂业务系统、数据可视化与全链路产品体验，擅长从业务目标出发，梳理结构、验证交互，并推动方案稳定落地。
            </p>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-y border-white/[0.09] py-5 text-sm">
              <span className="inline-flex items-center gap-2.5 text-white/78">
                <BriefcaseBusiness className="h-4 w-4 text-[#64CEFB]" />
                UI/UX & Product Designer
              </span>
              <span className="inline-flex items-center gap-2.5 text-white/48">
                <MapPin className="h-4 w-4" />
                南京 · 5 年产品设计经验
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-7">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={outcome.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnimatedMetricValue value={outcome.value} delay={0.2 + index * 0.1} />
                  <p className="mt-2 text-[11px] leading-5 text-white/38 sm:text-xs">{outcome.label}</p>
                </motion.div>
              ))}
            </div>

            <a
              href="/?page=experience"
              className="group mt-12 inline-flex items-center gap-3 rounded-[15px] bg-white px-6 py-4 text-sm font-semibold text-[#111016] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              查看项目经历
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
      </Reveal>

      <Reveal delay={0.12} direction="right">
            <GlowCard radius={28}>
            <div className="h-full overflow-hidden bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.09] px-6 py-5 sm:px-7">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#64CEFB]">Career / Experience</p>
                  <p className="font-yahei mt-2 text-xl font-bold text-white">工作经历</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white/55">
                  <Sparkles className="h-4 w-4" />
                </span>
              </div>

              <div className="px-6 sm:px-7">
                {career.map((item, index) => (
                  <motion.article
                    key={item.company}
                    className={`group grid gap-4 py-7 sm:grid-cols-[8.5rem_1fr] sm:gap-6 ${
                      index < career.length - 1 ? 'border-b border-white/[0.08]' : ''
                    }`}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-xs font-medium tracking-[0.06em] text-white/36">{item.period}</p>
                    <div>
                      <h3 className="font-yahei text-lg font-bold text-white transition-colors duration-300 group-hover:text-[#B9EAFF]">
                        {item.company}
                      </h3>
                      <p className="mt-1 text-sm text-white/52">{item.role}</p>
                      <p className="mt-4 text-sm leading-6 text-white/40">{item.description}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="border-t border-white/[0.09] bg-black/20 p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-2">
                  {capabilities.map((capability, index) => {
                    const selected = activeCapability === index
                    return (
                      <button
                        key={capability.index}
                        type="button"
                        onMouseEnter={() => setActiveCapability(index)}
                        onFocus={() => setActiveCapability(index)}
                        onClick={() => setActiveCapability(index)}
                        className={`rounded-[16px] px-4 py-3.5 text-left transition-all duration-300 ${
                          selected
                            ? 'bg-white text-[#111016]'
                            : 'bg-white/[0.025] text-white/48 hover:bg-white/[0.07] hover:text-white'
                        }`}
                        aria-pressed={selected}
                      >
                        <span className="block text-[9px] font-semibold tracking-[0.18em] opacity-45">{capability.index}</span>
                        <span className="font-yahei mt-1 block text-sm font-bold">{capability.title}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="min-h-[84px] px-3 pb-2 pt-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.index}
                      initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#64CEFB] shadow-[0_0_12px_rgba(100,206,251,0.75)]" />
                      <p className="text-sm leading-6 text-white/48">{active.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            </GlowCard>
      </Reveal>
      </div>

      <Reveal delay={0.18}>
        <div className="mt-14 overflow-hidden rounded-[28px] border border-white/[0.11] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_28px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:mt-16">
          <div className="grid lg:grid-cols-[0.82fr_2.18fr]">
            <div className="border-b border-white/[0.08] px-6 py-7 sm:px-8 sm:py-8 lg:border-b-0 lg:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#64CEFB]">Design Process</p>
              <h3 className="font-yahei mt-4 max-w-xs text-2xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-[1.75rem]">
                从复杂业务到可落地体验
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/38">
                不止完成界面，也建立从问题定义到交付验证的完整设计闭环。
              </p>
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.17em] text-white/24">
                Figma · AE · 墨刀 · ComfyUI · Codex
              </p>
            </div>

            <div className="grid gap-2 p-2 sm:grid-cols-2 lg:grid-cols-4">
              {designProcess.map((step) => (
                <motion.div
                  key={step.index}
                  className="min-h-[190px]"
                  whileHover={{ y: -4, scale: 1.008 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <BorderGlow
                    className="group"
                    backgroundColor="#101116"
                    borderRadius={18}
                    edgeSensitivity={32}
                    glowColor="198 88 70"
                    glowRadius={18}
                    glowIntensity={0.5}
                    coneSpread={18}
                    colors={['#64CEFB', '#6FA8FF', '#B6C8D8']}
                    fillOpacity={0.12}
                  >
                    <article className="relative flex h-full min-h-[190px] flex-col px-5 py-6 transition-colors duration-500 group-hover:bg-white/[0.025] sm:px-6 sm:py-7">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold tracking-[0.18em] text-[#64CEFB]">{step.index}</span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/20 transition-colors duration-300 group-hover:text-white/38">
                          {step.english}
                        </span>
                      </div>
                      <div className="mt-10 h-px w-8 bg-[#64CEFB]/40 transition-all duration-500 group-hover:w-14 group-hover:bg-[#64CEFB]/75" />
                      <h4 className="font-yahei mt-5 text-lg font-bold text-white/82 transition-colors duration-300 group-hover:text-white">
                        {step.title}
                      </h4>
                      <p className="mt-3 text-xs leading-6 text-white/34 transition-colors duration-300 group-hover:text-white/52">
                        {step.description}
                      </p>
                    </article>
                  </BorderGlow>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function TimelineProfile() {
  return (
    <div>
      <div className="grid gap-9 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#64CEFB]">
            <span>02</span>
            <span className="h-px w-10 bg-[#64CEFB]/55" />
            <span>Career / Timeline</span>
          </div>
          <h2 className="font-yahei mt-7 max-w-5xl text-4xl font-bold leading-[1.06] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.35rem]">
            <span className="block">5年，持续把复杂系统</span>
            <span className="mt-3 block text-white/46">变得更清晰。</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-base leading-8 text-white/48">
            从电力行业到物联网产品，持续参与需求共创、结构梳理、交互验证与开发验收，让设计真正进入业务闭环。
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm text-white/68">
            <MapPin className="h-4 w-4 text-[#64CEFB]" />
            南京 · UI/UX & Product Designer
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.14}>
        <div className="mt-14">
        <GlowCard radius={28}>
        <div className="overflow-hidden bg-white/[0.03] backdrop-blur-2xl">
          <div className="grid lg:grid-cols-2">
            {career
              .slice()
              .reverse()
              .map((item, index) => (
                <motion.article
                  key={item.company}
                  className={`relative p-7 sm:p-9 ${index === 0 ? 'border-b border-white/[0.09] lg:border-b-0 lg:border-r' : ''}`}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.035)' }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="mb-7 flex items-center justify-between border-b border-white/[0.08] pb-5">
                    <span className="text-xs font-semibold tracking-[0.08em] text-[#64CEFB]">{item.period}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">Stage 0{index + 1}</span>
                  </div>
                  <h3 className="font-yahei text-2xl font-bold text-white">{item.company}</h3>
                  <p className="mt-2 text-sm text-white/52">{item.role}</p>
                  <p className="mt-6 max-w-xl text-sm leading-7 text-white/42">{item.description}</p>
                </motion.article>
              ))}
          </div>

          <div className="grid border-t border-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <div
                key={capability.index}
                className="group border-b border-white/[0.08] px-6 py-6 transition-colors duration-300 hover:bg-white/[0.045] sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <span className="text-[10px] font-semibold tracking-[0.18em] text-white/25">{capability.index}</span>
                <h3 className="font-yahei mt-2 text-base font-bold text-white/72 transition-colors duration-300 group-hover:text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 text-xs leading-5 text-white/34">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
        </GlowCard>
        </div>
      </Reveal>
    </div>
  )
}

function ManifestoProfile({ activeCapability, setActiveCapability, active }: CapabilityProfileProps) {
  return (
    <div>
      <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#64CEFB]">
            <span>03</span>
            <span className="h-px w-10 bg-[#64CEFB]/55" />
            <span>Designer / Manifesto</span>
          </div>
          <h2 className="font-yahei mt-8 max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.06em] text-white sm:text-6xl lg:text-[4.15rem]">
            <span className="block">我用设计，</span>
            <span className="mt-3 block">连接业务目标</span>
            <span className="mt-3 block text-white/42">与真实用户。</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/48">
            擅长拆解复杂业务、建立清晰的信息架构，并用高保真原型验证关键体验，推动方案从概念稳定走向产品。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/?page=experience"
              className="group inline-flex items-center gap-3 rounded-[15px] bg-white px-6 py-4 text-sm font-semibold text-[#111016] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              查看代表项目
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span className="inline-flex items-center gap-2.5 px-2 text-sm text-white/42">
              <MapPin className="h-4 w-4" />
              南京 · 邓威
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <GlowCard radius={28} className="h-full">
          <div className="h-full overflow-hidden bg-white/[0.03] p-3 backdrop-blur-2xl">
            {capabilities.map((capability, index) => {
              const selected = activeCapability === index
              return (
                <button
                  key={capability.index}
                  type="button"
                  onMouseEnter={() => setActiveCapability(index)}
                  onFocus={() => setActiveCapability(index)}
                  onClick={() => setActiveCapability(index)}
                  className={`group flex w-full items-center justify-between rounded-[18px] border-b border-white/[0.07] px-5 py-5 text-left transition-all duration-300 last:border-b-0 ${
                    selected ? 'bg-white text-[#111016]' : 'text-white/52 hover:bg-white/[0.055] hover:text-white'
                  }`}
                  aria-pressed={selected}
                >
                  <span className="flex items-center gap-5">
                    <span className="text-[10px] font-semibold tracking-[0.18em] opacity-40">{capability.index}</span>
                    <span className="font-yahei text-lg font-bold">{capability.title}</span>
                  </span>
                  <ArrowUpRight className={`h-4 w-4 transition-transform duration-300 ${selected ? 'rotate-45' : 'opacity-30'}`} />
                </button>
              )
            })}

            <div className="min-h-[112px] px-5 pb-4 pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.index}
                  initial={{ opacity: 0, y: 8, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#64CEFB]">Selected expertise</p>
                  <p className="mt-3 text-sm leading-6 text-white/46">{active.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          </GlowCard>
        </Reveal>
      </div>

      <Reveal delay={0.18}>
        <div className="mt-14">
        <GlowCard radius={24}>
        <div className="grid overflow-hidden bg-black/15 lg:grid-cols-[0.5fr_1fr_1fr]">
          <div className="border-b border-white/[0.08] px-6 py-6 lg:border-b-0 lg:border-r">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">Career signal</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">5 Years</p>
          </div>
          {career
            .slice()
            .reverse()
            .map((item) => (
              <div key={item.company} className="border-b border-white/[0.08] px-6 py-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <p className="text-xs font-medium text-[#64CEFB]">{item.period}</p>
                <p className="font-yahei mt-3 text-base font-bold text-white">{item.company}</p>
                <p className="mt-1 text-xs text-white/40">{item.role}</p>
              </div>
            ))}
        </div>
        </GlowCard>
        </div>
      </Reveal>
    </div>
  )
}

function Reveal({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) return <div>{children}</div>

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === 'left' ? -56 : direction === 'right' ? 56 : 0,
        y: direction === 'up' ? 36 : 0,
        filter: 'blur(10px)',
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ delay, duration: 0.95, type: 'spring', stiffness: 92, damping: 22, mass: 0.82 }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedMetricValue({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.75 })
  const reduceMotion = useReducedMotion()
  const ratio = value.includes(':')
  const target = ratio ? Number(value.split(':')[0]) || 1 : Number(value.replace(/[^0-9.]/g, '')) || 0
  const [display, setDisplay] = useState(ratio ? '0:0' : '+0%')

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const controls = animate(0, target, {
      duration: ratio ? 0.9 : 1.45,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ratio) {
          const digit = Math.min(1, Math.round(latest))
          setDisplay(`${digit}:${digit}`)
        } else {
          setDisplay(`+${Math.round(latest)}%`)
        }
      },
      onComplete: () => setDisplay(value),
    })

    return () => controls.stop()
  }, [delay, isInView, ratio, reduceMotion, target, value])

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0.25, y: 8, filter: 'blur(6px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="tabular-nums text-2xl font-semibold tracking-[-0.04em] text-white sm:text-4xl"
    >
      {display}
    </motion.p>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Blocks,
  ChartNoAxesCombined,
  Layers3,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

type ProjectCategory = {
  id: string
  index: string
  label: string
  english: string
  title: string
  description: string
  project: string
  tags: string[]
  icon: LucideIcon
}

const projectCategories: ProjectCategory[] = [
  {
    id: 'bg-products',
    index: '01',
    label: 'B丨G端产品',
    english: 'Enterprise & Government',
    title: '复杂业务系统体验设计',
    description:
      '面向政企与行业级复杂系统，梳理多角色、多层级业务流程，建立清晰的信息架构、交互路径与可复用设计规范。',
    project: '新型负荷管理平台 II',
    tags: ['信息架构', '复杂表单', '组件规范'],
    icon: Layers3,
  },
  {
    id: 'data-visualization',
    index: '02',
    label: '数据可视化',
    english: 'Data Visualization',
    title: '让复杂数据快速形成判断',
    description:
      '围绕监控、预警与指挥决策场景，将多源实时数据转化为层级清晰、重点明确、可快速响应的可视化体验。',
    project: '格物消防可视化大屏',
    tags: ['实时监控', '告警闭环', '数据大屏'],
    icon: ChartNoAxesCombined,
  },
  {
    id: 'mobile-products',
    index: '03',
    label: '移动端产品',
    english: 'Mobile Experience',
    title: '轻量、连续的移动任务体验',
    description:
      '针对专业字段与长流程任务，设计分步骤、可保存、可续填的移动端体验，降低理解与操作成本。',
    project: '新型电力负荷摸排小程序',
    tags: ['移动端交互', '分步填写', '任务进度'],
    icon: Smartphone,
  },
  {
    id: 'ai-design',
    index: '04',
    label: 'AI设计',
    english: 'AI-assisted Design',
    title: 'AI驱动的设计探索与交付',
    description:
      '将 AIGC、ComfyUI 与 AI 编程工具融入视觉探索、原型验证和前端还原，让设计方案更快进入可交互、可验证状态。',
    project: 'AIGC视觉探索与可交互原型',
    tags: ['ComfyUI', '原型验证', '设计开发协同'],
    icon: Sparkles,
  },
]

export function ProjectMenuPanel({
  compact = false,
  theme = 'dark',
  onNavigate,
}: {
  compact?: boolean
  theme?: 'light' | 'dark'
  onNavigate?: () => void
}) {
  const [activeId, setActiveId] = useState(projectCategories[0].id)
  const activeCategory = projectCategories.find((category) => category.id === activeId) ?? projectCategories[0]
  const light = theme === 'light'

  return (
    <div
      className={
        compact
          ? 'space-y-3 border-t border-white/[0.08] px-1 pt-3'
          : `grid w-[760px] grid-cols-[238px_1fr] gap-3 rounded-[26px] border p-3 ${
              light
                ? 'border-[#173149]/10 bg-white shadow-[0_28px_80px_rgba(36,68,91,0.18)]'
                : 'border-white/[0.12] bg-[#08080b] shadow-[0_28px_90px_rgba(0,0,0,0.58)]'
            }`
      }
    >
      <div className={compact ? 'grid grid-cols-2 gap-2' : 'grid h-full grid-rows-4 gap-1'}>
        {projectCategories.map((category) => {
          const Icon = category.icon
          const selected = activeId === category.id

          return (
            <button
              key={category.id}
              type="button"
              onMouseEnter={() => setActiveId(category.id)}
              onFocus={() => setActiveId(category.id)}
              onClick={() => setActiveId(category.id)}
              className={`group flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left transition-all duration-300 ${
                compact ? '' : 'h-full'
              } ${
                selected
                  ? light
                    ? 'bg-[#edf2f6] text-[#102235]'
                    : 'bg-white text-[#101014]'
                  : light
                    ? 'bg-[#f7f8fa] text-[#173149]/55 hover:bg-[#e8eef3] hover:text-[#102235]'
                    : 'bg-[#121217] text-white/55 hover:bg-[#1a1a20] hover:text-white'
              }`}
              aria-pressed={selected}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${
                  selected
                    ? light
                      ? 'border-[#173149]/10 bg-white'
                      : 'border-black/10 bg-black/[0.05]'
                    : light
                      ? 'border-[#173149]/10 bg-white'
                      : 'border-white/[0.09] bg-[#19191f]'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold tracking-[0.16em] opacity-45">{category.index}</span>
                <span className="mt-0.5 block whitespace-nowrap text-sm font-semibold">{category.label}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div
        className={`group/preview relative min-h-[274px] overflow-hidden rounded-[20px] border p-5 transition-colors duration-300 sm:p-6 ${
          light ? 'border-[#173149]/10 bg-[#f7f8fa]' : 'border-white/[0.08] bg-[#121217]'
        }`}
      >
        <Blocks
          className={`absolute -bottom-5 -right-5 h-32 w-32 ${
            light ? 'text-[#173149]/[0.035]' : 'text-white/[0.025]'
          }`}
          aria-hidden="true"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full flex-col"
          >
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                light ? 'text-[#007dbf]' : 'text-[#64CEFB]'
              }`}
            >
              {activeCategory.english}
            </p>
            <h3 className={`font-yahei mt-3 text-xl font-bold sm:text-2xl ${light ? 'text-[#102235]' : 'text-white'}`}>
              {activeCategory.title}
            </h3>
            <p className={`mt-3 max-w-md text-sm leading-6 ${light ? 'text-[#173149]/60' : 'text-white/55'}`}>
              {activeCategory.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeCategory.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1.5 text-[11px] ${
                    light
                      ? 'border-[#173149]/10 bg-white text-[#173149]/55'
                      : 'border-white/[0.09] bg-[#19191f] text-white/50'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className={`mt-auto inline-flex items-center justify-between border-t pt-4 text-sm ${
                light ? 'border-[#173149]/10 text-[#173149]/65' : 'border-white/[0.08] text-white/65'
              }`}
            >
              <span>
                代表项目 ·{' '}
                <strong className={`font-medium ${light ? 'text-[#102235]' : 'text-white'}`}>
                  {activeCategory.project}
                </strong>
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/preview:-translate-y-0.5 group-hover/preview:translate-x-0.5" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

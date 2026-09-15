import {
  ChartNoAxesCombined,
  Layers3,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

type ProjectCategory = {
  id: string
  index: string
  label: string
  href?: string
  english: string
  title: string
  description: string
  tags: string[]
  icon: LucideIcon
}

export const projectCategories: ProjectCategory[] = [
  {
    id: 'bg-products',
    index: '01',
    label: 'WEB端页面',
    href: '/?page=web-project',
    english: 'Enterprise & Government',
    title: '复杂业务系统体验设计',
    description:
      '面向政企与行业级复杂系统，梳理多角色、多层级业务流程，建立清晰的信息架构、交互路径与可复用设计规范。',
    tags: ['信息架构', '复杂表单', '组件规范'],
    icon: Layers3,
  },
  {
    id: 'data-visualization',
    index: '02',
    label: '可视化页面',
    href: '/?page=visualization-project',
    english: 'Data Visualization',
    title: '让复杂数据快速形成判断',
    description:
      '围绕监控、预警与指挥决策场景，将多源实时数据转化为层级清晰、重点明确、可快速响应的可视化体验。',
    tags: ['实时监控', '告警闭环', '数据大屏'],
    icon: ChartNoAxesCombined,
  },
  {
    id: 'mobile-products',
    index: '03',
    label: '移动端页面',
    href: '/?page=mobile-project',
    english: 'Mobile Experience',
    title: '轻量、连续的移动任务体验',
    description:
      '针对专业字段与长流程任务，设计分步骤、可保存、可续填的移动端体验，降低理解与操作成本。',
    tags: ['移动端交互', '分步填写', '任务进度'],
    icon: Smartphone,
  },
  {
    id: 'ai-design',
    index: '04',
    label: 'AIGC设计',
    href: '/?page=aigc-project',
    english: 'AI-assisted Design',
    title: 'AI驱动的设计探索与交付',
    description:
      '将 AIGC、ComfyUI 与 AI 编程工具融入视觉探索、原型验证和前端还原，让设计方案更快进入可交互、可验证状态。',
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
  const light = theme === 'light'

  return (
    <div
      className={
        compact
          ? 'border-t border-white/[0.08] px-1 pt-3'
          : `w-[380px] rounded-[24px] border p-2 ${
              light
                ? 'border-[#173149]/10 bg-white shadow-[0_28px_80px_rgba(36,68,91,0.18)]'
                : 'border-white/[0.12] bg-[#08080b] shadow-[0_28px_90px_rgba(0,0,0,0.58)]'
            }`
      }
    >
      <ul className={compact ? 'space-y-2' : 'space-y-1'} aria-label="项目分类">
        {projectCategories.map((category) => {
          const Icon = category.icon

          return (
            <li key={category.id}>
              <a
                href={category.href ?? '#projects'}
                onClick={() => onNavigate?.()}
                className={`group flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  light
                    ? 'text-[#173149]/70 hover:bg-[#edf2f6] hover:text-[#102235] focus-visible:outline-[#0055ff]'
                    : 'text-white/62 hover:bg-white/[0.08] hover:text-white focus-visible:outline-white'
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition-colors duration-200 ${
                    light
                      ? 'border-[#173149]/10 bg-[#f7f8fa] group-hover:bg-white'
                      : 'border-white/[0.09] bg-[#19191f] group-hover:bg-white/[0.12]'
                  }`}
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 text-sm font-semibold">{category.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

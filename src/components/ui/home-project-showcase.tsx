import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import { BorderGlow } from './border-glow'

type HomeProject = {
  index: string
  eyebrow: string
  title: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
}

const projects: HomeProject[] = [
  {
    index: '01',
    eyebrow: 'Mobile App / UIUX',
    title: '移动端 APP 设计',
    description:
      '基于用户视角梳理高频任务、关键路径与状态反馈，让复杂业务在移动场景中更轻、更快，也更容易继续完成。',
    tags: ['用户研究', '交互设计', 'APP'],
    image: '/projects/home-showcase/mobile-app-card.jpg',
    imageAlt: '移动端 APP 设计展示',
  },
  {
    index: '02',
    eyebrow: 'B-Side System / Web',
    title: 'B 端界面',
    description:
      '企业后台管理系统：面向多角色和长链路业务，重组信息架构、操作层级与组件规则，建立稳定、清晰、可复用的产品体验。',
    tags: ['信息架构', '复杂交互', '设计系统'],
    image: '/projects/home-showcase/bg-interface-card.jpg',
    imageAlt: 'B 端企业后台管理系统展示',
  },
  {
    index: '03',
    eyebrow: 'Data Visualization / Dashboard',
    title: '数据可视化设计',
    description:
      '可视化大屏优化升级：将设备、告警与空间信息组织成层级明确的监控界面，让关键状态被快速理解并转化为行动。',
    tags: ['数据叙事', '态势监控', '大屏设计'],
    image: '/projects/home-showcase/data-visualization-card.jpg',
    imageAlt: '数据可视化大屏设计展示',
  },
  {
    index: '04',
    eyebrow: 'AIGC / Visual Operation',
    title: 'AIGC 设计',
    description:
      '视觉运营设计：把生成式视觉能力融入内容探索、方案验证与运营交付，缩短从创意方向到可使用视觉资产的路径。',
    tags: ['AIGC', '视觉运营', '快速验证'],
    image: '/assets/aiwork/iucL70QH8s8Kuk1p0eRSZ950zA.jpg',
    imageAlt: 'AIGC 视觉运营设计展示',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function HomeProjectShowcase() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="projects"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/[0.06] bg-[#08090c] px-4 pb-24 pt-20 text-white sm:px-6 md:px-8 md:pb-28 md:pt-28 lg:px-10 lg:pb-32 lg:pt-32 xl:px-12 2xl:px-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(100,206,251,0.035),transparent_30%),radial-gradient(circle_at_88%_74%,rgba(126,160,186,0.018),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#64CEFB]/16 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1920px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 42, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.38 }}
          transition={{ duration: 0.95, ease }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#64CEFB]/70">
            <Layers3 className="h-4 w-4" />
            <span>Selected Projects</span>
          </div>
          <h2 className="font-yahei mt-6 text-5xl font-bold leading-none tracking-[-0.055em] text-white sm:text-6xl lg:text-[5rem]">
            项目展示
          </h2>
          <p className="mt-7 max-w-4xl text-base leading-8 text-white/43 sm:text-lg">
            覆盖移动端、B 端系统、数据可视化与 AIGC 视觉运营，用真实项目呈现从问题定义到设计落地的完整过程。
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-2 lg:gap-6 xl:grid-cols-3 min-[1440px]:grid-cols-4 2xl:gap-7">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.index}
              project={project}
              index={index}
              className={index === 3 ? 'xl:col-start-2 min-[1440px]:col-start-auto' : ''}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  className,
}: {
  project: HomeProject
  index: number
  className: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 54, scale: 0.98, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ delay: Math.min(index, 2) * 0.08, duration: 0.92, ease }}
      className={`min-h-[520px] sm:min-h-[580px] lg:min-h-[610px] ${className}`}
    >
      <BorderGlow
        className="group"
        backgroundColor="#0d0e12"
        borderRadius={24}
        edgeSensitivity={28}
        glowColor="198 88 70"
        glowRadius={30}
        glowIntensity={0.52}
        coneSpread={22}
        colors={['#64CEFB', '#6FA8FF', '#B6C8D8']}
        fillOpacity={0.18}
      >
        <article
          className="relative flex h-full flex-col bg-white/[0.01] transition-colors duration-500 group-hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#64CEFB]/60"
        >
        <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#0b0c10]">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0c0d11]/40 via-transparent to-transparent opacity-55"
        />
        <span className="absolute left-5 top-5 rounded-full border border-black/10 bg-black/35 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-white/78 backdrop-blur-md">
          {project.index}
        </span>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-7 pt-7 sm:px-7 sm:pb-8">
        <div className="flex items-start justify-between gap-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">{project.eyebrow}</p>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/[0.1] text-white/38 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-white group-hover:bg-white group-hover:text-[#0a0913]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <h3 className="font-yahei mt-5 text-[1.7rem] font-bold leading-tight tracking-[-0.035em] text-white sm:text-[1.85rem]">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-white/42 sm:text-[15px]">{project.description}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.075] bg-white/[0.04] px-3.5 py-2 text-[10px] font-medium text-white/34 transition-colors duration-300 group-hover:text-white/52"
            >
              {tag}
            </span>
          ))}
        </div>
        </div>
        </article>
      </BorderGlow>
    </motion.div>
  )
}

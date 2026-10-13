import { type LucideIcon, ArrowRight, BarChart3, CarFront, MonitorCog, Smartphone, Sparkles } from 'lucide-react'
import { type MotionStyle, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { type PointerEvent, useState } from 'react'

type HomeProject = {
  id: string
  title: string
  category: string
  href: string
  icon: LucideIcon
  image: string
  imageAlt: string
  accent: string
  imagePosition?: string
  featured?: boolean
}

const projects: HomeProject[] = [
  {
    id: 'hmi-cockpit',
    title: 'HMI智能座舱设计',
    category: 'HMI & Intelligent Cockpit',
    href: '/?page=hmi-cockpit',
    icon: CarFront,
    image: '/projects/hmi-cockpit/hmi-frame-01.webp',
    imageAlt: 'XIAOMI SU7 智能座舱概念设计封面',
    accent: '#70A7FF',
    featured: true,
  },
  {
    id: 'mobile-app',
    title: '移动端 APP 设计',
    category: 'Mobile Experience',
    href: '/?page=mobile-project',
    icon: Smartphone,
    image: '/projects/home-showcase/mobile-kuchao-cover.jpg',
    imageAlt: '酷潮移动端 APP 视觉设计封面',
    accent: '#AEFF62',
  },
  {
    id: 'web-system',
    title: 'WEB端设计',
    category: 'Web & Business Systems',
    href: '/?page=web-project',
    icon: MonitorCog,
    image: '/projects/home-showcase/web-industrial-iot-cover.jpg',
    imageAlt: '工业物联网安全生产平台 WEB 端设计封面',
    accent: 'var(--brand-tech-gradient-start)',
  },
  {
    id: 'data-visualization',
    title: '数据可视化设计',
    category: 'Data Visualization',
    href: '/?page=visualization-project',
    icon: BarChart3,
    image: '/projects/home-showcase/data-southern-city-cover.jpg',
    imageAlt: '南部新城智慧城市运营中心数据可视化封面',
    accent: '#66DDFF',
  },
  {
    id: 'aigc-design',
    title: 'AIGC 设计',
    category: 'AI & Creative Exploration',
    href: '/?page=aigc-project',
    icon: Sparkles,
    image: '/projects/home-showcase/aigc-ip-design-cover.jpg',
    imageAlt: '联通数科通通 IP AIGC 设计封面',
    imagePosition: 'center top',
    accent: '#B98EFF',
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function HomeProjectShowcase() {
  const reduceMotion = useReducedMotion()
  const [activeProject, setActiveProject] = useState<string | null>(null)

  return (
    <section id="projects" className="project-gallery" aria-labelledby="project-gallery-title">
      <div className="project-gallery__inner">
        <header className="project-gallery__intro">
          <span className="project-gallery__eyebrow">SELECTED PROJECTS</span>
          <h2 id="project-gallery-title">项目展示</h2>
        </header>
        <div className="project-gallery__grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`project-gallery__item${project.featured ? ' is-featured' : ''}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: project.featured ? 0 : (index - 1) % 2 * 0.08, ease }}
            >
              <ProjectGalleryCard
                project={project}
                active={activeProject === project.id}
                subdued={activeProject !== null && activeProject !== project.id}
                onActivate={() => setActiveProject(project.id)}
                onDeactivate={() => setActiveProject(current => current === project.id ? null : current)}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectGalleryCard({ project, active, subdued, onActivate, onDeactivate }: {
  project: HomeProject
  active: boolean
  subdued: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const spring = { stiffness: 180, damping: 24, mass: 0.8 }
  const x = useSpring(pointerX, spring)
  const y = useSpring(pointerY, spring)
  const rotateX = useSpring(tiltX, spring)
  const rotateY = useSpring(tiltY, spring)
  const Icon = project.icon

  const reset = () => {
    pointerX.set(0)
    pointerY.set(0)
    tiltX.set(0)
    tiltY.set(0)
  }

  const trackPointer = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const horizontal = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1))
    const vertical = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1))
    pointerX.set(horizontal * 10)
    pointerY.set(vertical * 10)
    tiltX.set(-vertical * 3.5)
    tiltY.set(horizontal * 3.5)
  }

  return (
    <motion.a
      href={project.href}
      className={`project-gallery-card${active ? ' is-active' : ''}`}
      aria-label={`查看${project.title}项目详情`}
      style={{ '--project-accent': project.accent, x, y, rotateX, rotateY, transformPerspective: 1400 } as MotionStyle}
      animate={{ scale: reduceMotion ? 1 : active ? (project.featured ? 1.025 : 1.055) : subdued ? 0.96 : 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24 }}
      onPointerEnter={event => { if (event.pointerType === 'mouse') onActivate() }}
      onPointerMove={trackPointer}
      onPointerLeave={event => {
        reset()
        if (!event.currentTarget.matches(':focus-visible')) onDeactivate()
      }}
      onFocus={onActivate}
      onBlur={() => { reset(); onDeactivate() }}
    >
      <div className="project-gallery-card__copy">
        <span className="project-gallery-card__category"><Icon size={14} aria-hidden="true" />{project.category}</span>
        <h3>{project.title}</h3>
      </div>
      <div className="project-gallery-card__media">
        <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" width={1920} height={1080} style={{ objectPosition: project.imagePosition ?? 'center' }} />
      </div>
      <span className="project-gallery-card__cta">查看作品 <ArrowRight size={16} aria-hidden="true" /></span>
    </motion.a>
  )
}

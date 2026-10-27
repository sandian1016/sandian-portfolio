import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, CarFront, MonitorCog, Smartphone, Sparkles, type LucideIcon } from 'lucide-react'
import { useState } from 'react'

type HomeProject = {
  id: string
  title: string
  category: string
  description: string
  href: string
  icon: LucideIcon
  image: string
  imageAlt: string
  imagePosition?: string
  gradient: string
  activeGradient: string
}

const projects: HomeProject[] = [
  {
    id: 'hmi-cockpit',
    title: 'HMI智能座舱设计',
    category: 'HMI & Intelligent Cockpit',
    description: '以清晰的信息层级和沉浸式视觉，呈现智能座舱中的多场景交互体验。',
    href: '/?page=hmi-cockpit',
    icon: CarFront,
    image: '/projects/hmi-cockpit/hmi-frame-01.webp',
    imageAlt: 'XIAOMI SU7 智能座舱概念设计封面',
    imagePosition: '68% center',
    gradient: 'linear-gradient(160deg, #0e7367 0%, #18b29c 50%, #0c5f67 100%)',
    activeGradient: 'linear-gradient(155deg, #a6e5dc 0%, #d4f1ed 53%, #fbfefd 100%)',
  },
  {
    id: 'mobile-app',
    title: '移动端 APP 设计',
    category: 'Mobile Experience',
    description: '围绕内容发现与产品使用场景，探索更直观、更流畅的移动端体验。',
    href: '/?page=mobile-project',
    icon: Smartphone,
    image: '/projects/home-showcase/mobile-kuchao-cover.jpg',
    imageAlt: '酷潮移动端 APP 视觉设计封面',
    gradient: 'linear-gradient(160deg, #315fe7 0%, #55a8fa 52%, #1546cd 100%)',
    activeGradient: 'linear-gradient(155deg, #a7c9ff 0%, #dceaff 53%, #fdfefe 100%)',
  },
  {
    id: 'web-system',
    title: 'WEB端设计',
    category: 'Web & Business Systems',
    description: '梳理复杂业务流程与信息结构，让系统界面更易理解和使用。',
    href: '/?page=web-project',
    icon: MonitorCog,
    image: '/projects/home-showcase/web-industrial-iot-cover.jpg',
    imageAlt: '工业物联网安全生产平台 WEB 端设计封面',
    gradient: 'linear-gradient(160deg, #1da5e2 0%, #32cce4 54%, #1ab6d8 100%)',
    activeGradient: 'linear-gradient(155deg, #a0e8f5 0%, #cff5fb 53%, #fbfefe 100%)',
  },
  {
    id: 'data-visualization',
    title: '数据可视化设计',
    category: 'Data Visualization',
    description: '将城市运行信息组织成直观的可视化画面，帮助快速理解关键数据。',
    href: '/?page=visualization-project',
    icon: BarChart3,
    image: '/projects/home-showcase/data-southern-city-cover.jpg',
    imageAlt: '南部新城智慧城市运营中心数据可视化封面',
    gradient: 'linear-gradient(160deg, #087dcc 0%, #35b9ef 52%, #0a58ac 100%)',
    activeGradient: 'linear-gradient(155deg, #9ddcfb 0%, #d9f0ff 53%, #fcfeff 100%)',
  },
  {
    id: 'aigc-design',
    title: 'AIGC 设计',
    category: 'AI & Creative Exploration',
    description: '探索生成式创作在角色形象与视觉表达中的更多可能。',
    href: '/?page=aigc-project',
    icon: Sparkles,
    image: '/projects/aigc-project/aigc-frame-04.webp',
    imageAlt: '联通数科通通 IP 节日海报插画合集',
    imagePosition: 'center 45%',
    gradient: 'linear-gradient(160deg, #c82d50 0%, #f27378 52%, #a92347 100%)',
    activeGradient: 'linear-gradient(155deg, #ffb8bc 0%, #ffe0e2 53%, #fffdfd 100%)',
  },
]

function ProjectCard({ project, active, onActivate }: {
  project: HomeProject
  active: boolean
  onActivate: () => void
}) {
  const Icon = project.icon

  return (
    <article
      className={'project-gallery__item' + (active ? ' is-active' : '')}
      style={{ backgroundImage: project.gradient }}
      onMouseEnter={onActivate}
      aria-label={project.title}
    >
      {active ? (
        <div className="project-gallery-card project-gallery-card--active" style={{ backgroundImage: project.activeGradient }}>
          <div className="project-gallery-card__media">
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="eager"
              decoding="async"
              width={1920}
              height={1080}
              className={'project-gallery-card__media-image' + (project.id === 'aigc-design' ? ' project-gallery-card__media-image--aigc' : '')}
              draggable={false}
              style={{ objectPosition: project.imagePosition ?? 'center' }}
            />
          </div>
          <div className="project-gallery-card__copy">
            <span className="project-gallery-card__category"><Icon size={20} aria-hidden="true" />{project.category}</span>
            <div className="project-gallery-card__body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <a href={project.href} className="project-gallery-card__cta" aria-label={'查看' + project.title + '项目详情'}>查看作品 <ArrowUpRight size={19} aria-hidden="true" /></a>
          </div>
        </div>
      ) : (
        <button type="button" className="project-gallery-card project-gallery-card--collapsed" onClick={onActivate} aria-label={'展开' + project.title + '项目卡片'}>
          <span className="project-gallery-card__collapsed-content">
            <span className="project-gallery-card__collapsed-category"><Icon size={21} aria-hidden="true" />{project.category}</span>
            <span className="project-gallery-card__collapsed-bottom">
              <span className="project-gallery-card__collapsed-title">{project.title}</span>
              <span className="project-gallery-card__collapsed-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
            </span>
          </span>
        </button>
      )}
    </article>
  )
}

export function HomeProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [windowStart, setWindowStart] = useState(0)

  const activateProject = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(projects.length - 1, index)))
    setWindowStart(current => index < current ? index : index > current + 2 ? index - 2 : current)
  }

  const desktopProjects = projects.slice(windowStart, windowStart + 3)
  const mobileNeighborIndex = activeIndex < projects.length - 1 ? activeIndex + 1 : activeIndex - 1

  return (
    <section id="projects" className="project-gallery" aria-labelledby="project-gallery-title">
      <div className="project-gallery__inner">
        <header className="project-gallery__intro">
          <span className="project-gallery__eyebrow">SELECTED PROJECTS</span>
          <h2 id="project-gallery-title">项目展示</h2>
        </header>

        <div className="project-gallery__track project-gallery__track--desktop" role="group" aria-label="项目卡片">
          {desktopProjects.map(project => {
            const index = projects.indexOf(project)
            return <ProjectCard key={project.id} project={project} active={index === activeIndex} onActivate={() => activateProject(index)} />
          })}
        </div>

        <div className="project-gallery__track project-gallery__track--mobile" role="group" aria-label="项目卡片">
          <ProjectCard key={projects[activeIndex].id} project={projects[activeIndex]} active onActivate={() => activateProject(activeIndex)} />
          <ProjectCard key={projects[mobileNeighborIndex].id} project={projects[mobileNeighborIndex]} active={false} onActivate={() => activateProject(mobileNeighborIndex)} />
        </div>

        <div className="project-gallery__footer">
          <div
            className="project-gallery__progress"
            role="progressbar"
            aria-label="项目轮播进度"
            aria-valuemin={1}
            aria-valuemax={projects.length}
            aria-valuenow={activeIndex + 1}
          >
            <span style={{ width: ((activeIndex + 1) / projects.length) * 100 + '%' }} />
          </div>
          <div className="project-gallery__controls">
            <button type="button" aria-label="上一个项目" disabled={activeIndex === 0} onClick={() => activateProject(activeIndex - 1)}>
              <ArrowLeft size={19} aria-hidden="true" />
            </button>
            <button type="button" aria-label="下一个项目" disabled={activeIndex === projects.length - 1} onClick={() => activateProject(activeIndex + 1)}>
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

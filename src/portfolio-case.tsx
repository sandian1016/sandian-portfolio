import { StrictMode, useEffect, useState, type ComponentType, type CSSProperties } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowDown,
  ArrowUpRight,
  Blocks,
  ChartNoAxesCombined,
  ChevronRight,
  LayoutTemplate,
  Layers3,
  Mail,
  Menu,
  MousePointer2,
  Sparkles,
  Smartphone,
  Workflow,
  X,
} from 'lucide-react'
import './portfolio-case.css'

type CategoryId = 'web' | 'visualization' | 'mobile' | 'aigc'

type Category = {
  id: CategoryId
  index: string
  label: string
  english: string
  title: string
  description: string
  tags: string[]
  image: string
  imageAlt: string
  role: string
  process: string
  outcome: string
  accent: string
  icon: ComponentType<{ className?: string }>
}

const categories: Category[] = [
  {
    id: 'web',
    index: '01',
    label: 'WEB端页面',
    english: 'Enterprise & Government',
    title: '复杂业务系统体验设计',
    description:
      '面向政企与行业级复杂系统，梳理多角色、多层级业务流程，建立清晰的信息架构、交互路径与可复用设计规范。',
    tags: ['信息架构', '复杂表单', '组件规范'],
    image: '/projects/home-showcase/bg-interface-card.jpg',
    imageAlt: 'WEB 端企业后台管理系统界面预览',
    role: '产品分析 / 信息架构 / 交互与视觉设计',
    process: '从角色、任务与权限出发，把长链路业务拆成可理解、可执行的页面结构。',
    outcome: '用系统化页面与组件关系，表达复杂业务如何被稳定地使用。',
    accent: 'rgba(0, 85, 255, 0.9)',
    icon: Layers3,
  },
  {
    id: 'visualization',
    index: '02',
    label: '可视化页面',
    english: 'Data Visualization',
    title: '让复杂数据快速形成判断',
    description:
      '围绕监控、预警与指挥决策场景，将多源实时数据转化为层级清晰、重点明确、可快速响应的可视化体验。',
    tags: ['实时监控', '告警闭环', '数据大屏'],
    image: '/projects/home-showcase/data-visualization-card.jpg',
    imageAlt: '数据可视化大屏界面预览',
    role: '数据关系梳理 / 信息层级 / 大屏界面设计',
    process: '先建立指标、状态与动作的对应关系，再决定图表、颜色和空间层级。',
    outcome: '让图形承担解释任务，帮助使用者更快识别异常、趋势和下一步动作。',
    accent: 'rgba(0, 85, 255, 0.9)',
    icon: ChartNoAxesCombined,
  },
  {
    id: 'mobile',
    index: '03',
    label: '移动端页面',
    english: 'Mobile Experience',
    title: '轻量、连续的移动任务体验',
    description:
      '针对专业字段与长流程任务，设计分步骤、可保存、可续填的移动端体验，降低理解与操作成本。',
    tags: ['移动端交互', '分步填写', '任务进度'],
    image: '/projects/home-showcase/mobile-app-card.jpg',
    imageAlt: '移动端 APP 设计界面预览',
    role: '任务路径 / 交互反馈 / 移动端 UI 设计',
    process: '围绕高频任务压缩路径，让用户在碎片化场景中也能继续完成工作。',
    outcome: '用明确的状态反馈与节奏，降低移动端操作中的记忆和返回成本。',
    accent: 'rgba(0, 85, 255, 0.9)',
    icon: Smartphone,
  },
  {
    id: 'aigc',
    index: '04',
    label: 'AIGC设计',
    english: 'AI-assisted Design',
    title: 'AI驱动的设计探索与交付',
    description:
      '将 AIGC、ComfyUI 与 AI 编程工具融入视觉探索、原型验证和运营交付，让设计方案更快进入可交互、可验证状态。',
    tags: ['AIGC', '原型验证', '设计开发协同'],
    image: '/assets/aiwork/iucL70QH8s8Kuk1p0eRSZ950zA.jpg',
    imageAlt: 'AIGC 视觉运营设计预览',
    role: '视觉探索 / 原型验证 / 设计开发协同',
    process: '把生成式能力放在探索与验证环节，用设计判断筛选方向，再进入可交互交付。',
    outcome: '展示从视觉概念到可验证原型的连接方式，而不是把 AI 当作装饰效果。',
    accent: 'rgba(0, 85, 255, 0.9)',
    icon: Sparkles,
  },
]

const processSteps = [
  { id: '01', label: '问题定义', detail: '理解业务目标、用户角色与使用场景。', icon: MousePointer2 },
  { id: '02', label: '信息结构', detail: '拆解页面层级、任务路径与内容关系。', icon: Workflow },
  { id: '03', label: '方案验证', detail: '用流程、原型与界面方案快速验证判断。', icon: LayoutTemplate },
  { id: '04', label: '交付协同', detail: '建立组件规范，推进设计、开发与走查。', icon: Blocks },
]

function CategoryPreview({ category, large = false }: { category: Category; large?: boolean }) {
  const Icon = category.icon

  return (
    <div className={`category-preview category-preview--${category.id} ${large ? 'category-preview--large' : ''}`}>
      <div className="category-preview__topline">
        <span className="category-preview__brand">
          <Icon className="category-preview__icon" />
          {category.english}
        </span>
        <span className="category-preview__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="category-preview__canvas">
        <div className="category-preview__sidebar" aria-hidden="true">
          <span className="is-active" />
          <span />
          <span />
          <span />
        </div>
        <img src={category.image} alt="" loading="lazy" />
        <div className="category-preview__scanline" aria-hidden="true" />
      </div>

      <div className="category-preview__meta">
        <strong>{category.label}</strong>
        <span>{large ? '案例内容结构预览' : category.tags[0]}</span>
      </div>
    </div>
  )
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="case-header">
      <div className="case-container case-header__inner">
        <a className="case-brand" href="/" aria-label="返回 Sandian Design 首页" onClick={closeMenu}>
          <span className="case-brand__mark">YN</span>
          <span className="case-brand__label">DESIGN</span>
        </a>

        <nav className={`case-nav ${menuOpen ? 'is-open' : ''}`} aria-label="独立案例预览导航">
          <a href="/" onClick={closeMenu}>首页</a>
          <a className="is-current" href="#category-index" onClick={closeMenu}>作品分类</a>
          <a href="#case-footer" onClick={closeMenu}>关于</a>
          <a className="case-header__contact" href="mailto:1270434903@qq.com" onClick={closeMenu}>
            联系我 <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>

        <button
          className="case-menu-toggle"
          type="button"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="case-hero" id="case-top">
      <div className="case-hero__glow case-hero__glow--one" aria-hidden="true" />
      <div className="case-hero__glow case-hero__glow--two" aria-hidden="true" />
      <div className="case-hero__orbit case-hero__orbit--one" aria-hidden="true" />
      <div className="case-hero__orbit case-hero__orbit--two" aria-hidden="true" />
      <div className="case-hero__orbit-dot" aria-hidden="true" />

      <div className="case-container case-hero__inner">
        <div className="case-hero__copy case-reveal">
          <p className="case-kicker"><span>2026</span><i /> Independent portfolio sandbox</p>
          <h1>把复杂产品，<br /><em>讲清楚</em></h1>
          <p className="case-hero__summary">
            UI/UX Product Designer · WEB 端 / 可视化 / 移动端 / AIGC 设计。<br />
            用结构和体验把设计能力落到真实产品语境里。
          </p>
          <button className="case-hero__action" type="button" onClick={onExplore}>
            查看四类项目 <ArrowDown aria-hidden="true" />
          </button>
        </div>

        <div className="case-hero__signal case-reveal" aria-label="项目分类概览">
          <div className="case-hero__signal-header">
            <span>PROJECT CATEGORIES</span>
            <span>01 — 04</span>
          </div>
          <div className="case-hero__signal-line"><span /></div>
          <div className="case-hero__signal-list">
            {categories.map((category) => (
              <div key={category.id}>
                <span>{category.index}</span>
                <strong>{category.label}</strong>
              </div>
            ))}
          </div>
          <div className="case-hero__signal-foot">
            <span>Selected system</span>
            <span className="case-status"><i /> Ready to explore</span>
          </div>
        </div>
      </div>

      <div className="case-hero__scroll-hint" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <i />
      </div>
    </section>
  )
}

function CategoryIndex({ activeId, onSelect }: { activeId: CategoryId; onSelect: (id: CategoryId) => void }) {
  return (
    <section className="category-index" id="category-index">
      <div className="case-container">
        <div className="section-heading case-reveal">
          <div>
            <p className="section-index">01 / PROJECT INDEX</p>
            <h2>四种语境，<br /><span>一套设计判断</span></h2>
          </div>
          <p className="section-heading__note">
            先看我在哪些产品语境中工作，再进入每类项目的职责、过程与界面证据。
          </p>
        </div>

        <div className="category-index__rail" role="tablist" aria-label="项目分类切换">
          {categories.map((category) => {
            const Icon = category.icon
            const selected = category.id === activeId

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`category-index__item ${selected ? 'is-selected' : ''}`}
                style={{ '--category-accent': category.accent } as CSSProperties}
                onClick={() => onSelect(category.id)}
              >
                <span className="category-index__number">{category.index}</span>
                <span className="category-index__icon"><Icon /></span>
                <span className="category-index__name">{category.label}</span>
                <span className="category-index__arrow"><ChevronRight /></span>
              </button>
            )
          })}
        </div>

        <div className="category-index__detail case-reveal">
          <div className="category-index__detail-copy">
            <p>{categories.find((category) => category.id === activeId)?.english}</p>
            <h3>{categories.find((category) => category.id === activeId)?.title}</h3>
            <span>当前选中 · 点击上方分类查看不同项目语境</span>
          </div>
          <CategoryPreview category={categories.find((category) => category.id === activeId) ?? categories[0]} />
        </div>
      </div>
    </section>
  )
}

function CategorySections({ activeId }: { activeId: CategoryId }) {
  return (
    <div className="category-sections">
      {categories.map((category, index) => (
        <article
          key={category.id}
          id={`category-${category.id}`}
          className={`category-section category-section--${index % 2 === 1 ? 'reverse' : 'forward'} case-reveal ${activeId === category.id ? 'is-focused' : ''}`}
          style={{ '--category-accent': category.accent } as CSSProperties}
        >
          <div className="case-container category-section__inner">
            <div className="category-section__copy">
              <div className="category-section__topline">
                <span className="section-index">{category.index} / {category.english}</span>
                <span className="category-section__focus">{activeId === category.id ? 'SELECTED' : 'CASE TYPE'}</span>
              </div>
              <h2>{category.label}<br /><span>{category.title}</span></h2>
              <p className="category-section__description">{category.description}</p>

              <div className="category-section__meta">
                <div>
                  <span>我的职责</span>
                  <strong>{category.role}</strong>
                </div>
                <div>
                  <span>设计过程</span>
                  <strong>{category.process}</strong>
                </div>
              </div>

              <div className="category-section__tags">
                {category.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="category-section__visual">
              <div className="category-section__visual-label">
                <span>CASE PREVIEW</span>
                <span>{category.index} / 04</span>
              </div>
              <CategoryPreview category={category} large />
              <div className="category-section__outcome">
                <span>最终表达</span>
                <p>{category.outcome}</p>
                <ArrowUpRight aria-hidden="true" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function ProcessStrip() {
  const [activeStep, setActiveStep] = useState(0)
  const step = processSteps[activeStep]
  const StepIcon = step.icon

  return (
    <section className="process-strip case-reveal" id="process">
      <div className="case-container">
        <div className="process-strip__heading">
          <div>
            <p className="section-index">02 / WORKING MODEL</p>
            <h2>从分类进入项目，<br /><span>再回到设计判断</span></h2>
          </div>
          <p>每类项目的展示顺序不相同，但都要让人看见：问题是什么、我做了什么、为什么这样做。</p>
        </div>

        <div className="process-strip__body">
          <div className="process-strip__steps" role="tablist" aria-label="设计过程步骤">
            {processSteps.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  className={activeStep === index ? 'is-active' : ''}
                  onClick={() => setActiveStep(index)}
                >
                  <span>{item.id}</span>
                  <Icon />
                  <strong>{item.label}</strong>
                  <ChevronRight aria-hidden="true" />
                </button>
              )
            })}
          </div>

          <div className="process-strip__detail" role="tabpanel">
            <div className="process-strip__detail-icon"><StepIcon /></div>
            <div>
              <span>STEP {step.id}</span>
              <h3>{step.label}</h3>
              <p>{step.detail}</p>
            </div>
            <div className="process-strip__detail-line" aria-hidden="true"><i /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="case-footer" id="case-footer">
      <div className="case-container case-footer__inner">
        <div>
          <p className="section-index">SANɃIAN / PORTFOLIO SANDBOX</p>
          <h2>让设计判断，<br /><span>被看见。</span></h2>
        </div>
        <div className="case-footer__contact">
          <span>继续查看正式作品集</span>
          <a href="/">返回首页 <ArrowUpRight aria-hidden="true" /></a>
          <a href="mailto:1270434903@qq.com"><Mail aria-hidden="true" /> 发送邮件</a>
        </div>
      </div>
      <div className="case-container case-footer__bottom">
        <span>Independent case preview · visual system experiment</span>
        <a href="#case-top">BACK TO TOP <ArrowDown aria-hidden="true" /></a>
      </div>
    </footer>
  )
}

function PortfolioCasePreview() {
  const [activeId, setActiveId] = useState<CategoryId>('web')

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.case-reveal')
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      }),
      { threshold: 0.12 },
    )

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const jumpToCategories = () => document.querySelector('#category-index')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main className="case-preview">
      <Navigation />
      <Hero onExplore={jumpToCategories} />
      <CategoryIndex activeId={activeId} onSelect={setActiveId} />
      <CategorySections activeId={activeId} />
      <ProcessStrip />
      <Footer />
    </main>
  )
}

createRoot(document.getElementById('portfolio-case-root')!).render(
  <StrictMode>
    <PortfolioCasePreview />
  </StrictMode>,
)

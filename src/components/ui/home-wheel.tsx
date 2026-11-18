import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowUpRight, BarChart3, Box, Monitor, Smartphone, Sparkles, Building2, Globe, LayoutDashboard, Flame, Palette } from 'lucide-react'
import './home-wheel.css'
import { ProjectReader } from './project-reader'

const wrap = (value: number, length: number) => ((value % length) + length) % length

const projects = [
  { title: '觅潮移动端 APP', category: 'MOBILE EXPERIENCE', image: '/projects/michao/01.webp', href: '/?page=mobile-project', icon: Smartphone, shortTitle: '觅潮 APP' },
  { title: '工业物联网安全生产平台', category: 'WEB & PRODUCT DESIGN', image: '/projects/home-showcase/web-industrial-iot-cover.jpg', href: '/?page=web-project', icon: Monitor, shortTitle: '工业物联网' },
  { title: '研究院数字孪生管控系统', category: 'DATA VISUALIZATION', image: '/projects/digital-twin/cover-updated.webp', href: '/?page=visualization-project', icon: BarChart3, shortTitle: '数字孪生' },
  { title: '智慧工地 APP', category: 'MOBILE EXPERIENCE', image: '/projects/smart-site-updated/smart-site-frame-01.webp', href: '/?page=mobile-smart-site', icon: Building2, shortTitle: '智慧工地' },
  { title: '布叮甜坊品牌设计', category: 'BRAND & VISUAL', image: '/projects/home-wheel/buding-cover.jpg', href: '/?page=brand-buding', icon: Box, shortTitle: '布叮甜坊' },
  { title: 'AIGC 设计', category: 'AI & CREATIVE', image: '/projects/home-wheel/aigc-cover.jpg', href: '/?page=aigc-project', icon: Sparkles, shortTitle: 'AIGC 设计' },
  { title: '国网电动企业门户网站', category: 'WEB & PRODUCT DESIGN', image: '/projects/web-state-grid/state-grid-frame-01.webp', href: '/?page=web-state-grid', icon: Globe, shortTitle: '国网门户' },
  { title: '全管 C5-OA 办公系统', category: 'WEB & PRODUCT DESIGN', image: '/projects/c5-oa/cover-updated.webp', href: '/?page=web-c5-oa', icon: LayoutDashboard, shortTitle: 'C5-OA' },
  { title: '智慧消防平台', category: 'DATA VISUALIZATION', image: '/projects/visualization-fire/fire-frame-01.webp', href: '/?page=visualization-fire', icon: Flame, shortTitle: '智慧消防' },
  { title: '原创潮玩 IP', category: 'BRAND & VISUAL', image: '/projects/mli/07.gif', href: '/?page=brand-mli', icon: Palette, shortTitle: '原创潮玩 IP' },
]

export function HomeWheel() {
  const [position, setPosition] = useState(0)
  const [preview, setPreview] = useState<number | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const positionRef = useRef(0)
  const targetRef = useRef(0)
  const pauseUntil = useRef(0)
  const isHovering = useRef(false)
  const isPreviewOpen = useRef(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<number | null>(null)
  const dragPosition = useRef(0)
  const dragged = useRef(false)
  const active = ((Math.round(position) % projects.length) + projects.length) % projects.length
  const relative = (offset: number) => (active + offset + projects.length) % projects.length
  const changePreview = useCallback((index: number) => {
    const current = positionRef.current
    const delta = wrap(index - current + projects.length / 2, projects.length) - projects.length / 2
    positionRef.current = current + delta
    targetRef.current = positionRef.current
    setPosition(positionRef.current)
    isPreviewOpen.current = true
    setPreview(index)
  }, [])
  const closePreview = useCallback(() => { isPreviewOpen.current = false; isHovering.current = false; setPreview(null); pauseUntil.current = performance.now() + 500 }, [])
  const go = (index: number) => {
    setHasInteracted(true)
    const current = positionRef.current
    const delta = wrap(index - current + projects.length / 2, projects.length) - projects.length / 2
    targetRef.current = current + delta
    pauseUntil.current = performance.now() + 3000
  }

  useEffect(() => {
    let frame = 0
    let previous = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const tick = (now: number) => {
      const dt = previous ? Math.min(now - previous, 50) : 0
      previous = now
      if (!reduced.matches && !document.hidden && !isHovering.current && !isPreviewOpen.current && dragStart.current === null && now > pauseUntil.current) targetRef.current += dt / 8500
      const diff = targetRef.current - positionRef.current
      if (Math.abs(diff) > 0.0001) {
        positionRef.current += diff * (1 - Math.exp(-dt / 250))
        setPosition(positionRef.current)
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let lastWheel = 0
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      event.stopPropagation()
      const now = performance.now()
      if (Math.abs(event.deltaY) > 12 && now - lastWheel > 550) {
        setHasInteracted(true)
        lastWheel = now
        const next = Math.round(targetRef.current) + (event.deltaY > 0 ? 1 : -1)
        targetRef.current = next
        pauseUntil.current = now + 3000
      }
    }
    stage.addEventListener('wheel', handleWheel, { passive: false })
    return () => stage.removeEventListener('wheel', handleWheel)
  }, [])


  return (
    <section id="home" className="home-wheel" aria-label="精选作品">
      <div className="home-wheel__intro"><strong>邓威 · UI/UX 设计师</strong><span>专注复杂业务系统与数据可视化</span></div>
      <div className="home-wheel__labels" aria-label="选择作品">
        <h1 className="sr-only">{projects[active].title}</h1>
        {projects.map((project, index) => {
          const offset = wrap(index - position + projects.length / 2, projects.length) - projects.length / 2
          const distance = Math.abs(offset)
          return <button key={project.href} type="button" className="home-wheel__title-option" aria-current={index === active ? 'true' : undefined} tabIndex={distance > 1.7 ? -1 : 0} aria-hidden={distance > 1.7 || undefined} onClick={() => go(index)} style={{
            transform: `translate(${-Math.min(distance * distance * 3, 25)}px, calc(-50% + ${offset * 70}px)) rotate(${offset * 6}deg)`,
            opacity: index === active ? 1 : Math.max(0, 1 - distance * .72),
            filter: `blur(${Math.max(0, distance - .1) * .7}px)`,
            pointerEvents: distance > 1.7 ? 'none' : 'auto',
          }}>{project.title}</button>
        })}
      </div>
      <div ref={stageRef} className="home-wheel__stage"
        onPointerEnter={event => { if (event.pointerType === 'mouse') { isHovering.current = true; targetRef.current = positionRef.current } }}
        onPointerDown={event => { if (event.button !== 0) return; setHasInteracted(true); dragStart.current = event.clientY; dragPosition.current = positionRef.current; targetRef.current = positionRef.current; dragged.current = false }}
        onPointerMove={event => { if (dragStart.current === null) return; const distance = event.clientY - dragStart.current; if (Math.abs(distance) > 8) dragged.current = true; if (dragged.current) targetRef.current = dragPosition.current - distance / 220 }}
        onPointerUp={() => { if (dragStart.current === null) return; dragStart.current = null; if (dragged.current) targetRef.current = Math.round(targetRef.current) }}
        onPointerLeave={() => { if (dragStart.current !== null) { dragStart.current = null; if (dragged.current) targetRef.current = Math.round(targetRef.current) }; isHovering.current = false; pauseUntil.current = 0 }}
        onPointerCancel={() => { dragStart.current = null; isHovering.current = false; targetRef.current = Math.round(targetRef.current); pauseUntil.current = 0 }}
        onKeyDown={event => { if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); go(active + (event.key === 'ArrowDown' ? 1 : -1)) } }}>
        <div className="home-wheel__rings" aria-hidden="true" />
        <div className="home-wheel__panels">
          {projects.map((project, index) => {
            const offset = wrap(index - position + projects.length / 2, projects.length) - projects.length / 2
            const distance = Math.abs(offset)
            const travel = Math.sign(offset) * (distance <= 1 ? distance * 106 : 106 + Math.min(distance - 1, 2) * 18)
            const angle = -Math.sign(offset) * Math.min(distance * 38, 38)
            const opacity = Math.max(0, Math.min(1, (2.7 - distance) * 2)) * (index === active ? 1 : .76)
            return <button key={project.href} type="button" tabIndex={distance > 2.5 ? -1 : 0} aria-hidden={distance > 2.5 || undefined} className="home-wheel__panel" style={{ transform: `translate3d(0, ${travel}%, 0) rotateX(${angle}deg)`, transformOrigin: offset < 0 ? 'center bottom' : 'center top', opacity, zIndex: Math.round(100 - distance * 10), pointerEvents: distance > 2.5 ? 'none' : 'auto' }} onClick={() => { if (dragged.current) { dragged.current = false; return }; isPreviewOpen.current = true; setPreview(index) }} aria-label={`预览${project.title}`}>
              <img src={project.image} alt="" draggable={false} />
              {index === active && <span className="home-wheel__open">查看项目 <ArrowUpRight size={16} /></span>}
            </button>
          })}
        </div>
      </div>
      <p className={`home-wheel__hint${hasInteracted ? ' is-hidden' : ''}`} aria-hidden="true"><span className="home-wheel__hint-desktop">滚动或拖动切换</span><span className="home-wheel__hint-mobile">滑动切换</span><i />点击封面查看作品</p>
      <div className="home-wheel__bottom">
        <span className="home-wheel__caption">SELECTED<br />WORKS /</span>
        <nav className="home-wheel__nav" aria-label="选择作品" onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault()
            go(active + (event.key === 'ArrowRight' ? 1 : -1))
          }
        }}>
          {projects.map((project, index) => {
            const Icon = project.icon
            const offset = wrap(index - position + projects.length / 2, projects.length) - projects.length / 2
            const slot = offset + 2.5
            const edge = Math.max(0, 1 - Math.min(slot, 6 - slot))
            const visible = slot > -0.5 && slot < 6.5
            return <button key={project.href} className={index === active ? 'is-active' : ''} onClick={() => go(index)} aria-label={`切换至${project.title}`} aria-current={index === active ? 'true' : undefined} aria-hidden={!visible || undefined} tabIndex={visible ? 0 : -1} style={{ left: `${slot / 6 * 100}%`, opacity: visible ? Math.max(0, 1 - edge * .55) : 0, filter: `blur(${edge * 1.2}px)`, pointerEvents: visible ? 'auto' : 'none' }}><span className="home-wheel__nav-icon" aria-hidden="true"><Icon className="home-wheel__icon-glass-back" size={25} strokeWidth={1.5} /><Icon className="home-wheel__icon-front" size={23} strokeWidth={1.5} /></span><span className="home-wheel__nav-label">{project.shortTitle}</span></button>
          })}
        </nav>
        <span className="home-wheel__caption home-wheel__caption--right">PORTFOLIO<br />© SANDIAN</span>
      </div>
      <AnimatePresence>{preview !== null && <ProjectReader index={preview} projects={projects} onClose={closePreview} onChange={changePreview} />}</AnimatePresence>
      <a className="home-wheel__scroll" href="#footer">向下探索 <span>↓</span></a>
    </section>
  )
}

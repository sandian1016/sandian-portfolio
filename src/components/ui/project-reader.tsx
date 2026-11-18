import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { mobileProjectFrames } from './mobile-project-page'
import { webProjectFrames } from './web-project-page'
import { visualizationProjectFrames } from './visualization-project-page'
import { budingFrames, smartSiteFrames, stateGridFrames, c5OaFrames, fireVisualizationFrames, mliFrames } from './supplemental-project-pages'
import { featuredFrames } from './aigc-project-page'

type Frame = { label: string; src: string; alt: string; width: number; height: number }
type Project = { title: string; category: string; href: string }
const framesByHref: Record<string, Frame[]> = {
  '/?page=mobile-project': mobileProjectFrames, '/?page=web-project': webProjectFrames,
  '/?page=visualization-project': visualizationProjectFrames, '/?page=mobile-smart-site': smartSiteFrames,
  '/?page=brand-buding': budingFrames, '/?page=aigc-project': featuredFrames,
  '/?page=web-state-grid': stateGridFrames, '/?page=web-c5-oa': c5OaFrames,
  '/?page=visualization-fire': fireVisualizationFrames, '/?page=brand-mli': mliFrames,
}

export function ProjectReader({ index, projects, onClose, onChange }: { index: number; projects: Project[]; onClose: () => void; onChange: (index: number) => void }) {
  const reduceMotion = useReducedMotion()
  const frames = framesByHref[projects[index].href]
  const [chapter, setChapter] = useState(0)
  const [percent, setPercent] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setChapter(0); setPercent(0)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [index])
  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', keydown)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', keydown) }
  }, [onClose])
  const updateProgress = () => {
    const element = scrollRef.current
    if (!element) return
    const available = element.scrollHeight - element.clientHeight
    setPercent(available > 0 ? Math.round(element.scrollTop / available * 100) : 0)
    const items = Array.from(element.querySelectorAll<HTMLElement>('[data-reader-chapter]'))
    const marker = element.scrollTop + element.clientHeight * .35
    let current = 0
    items.forEach((item, i) => { if (item.offsetTop <= marker) current = i })
    setChapter(current)
  }
  const jump = (itemIndex: number) => {
    const element = scrollRef.current
    const target = element?.querySelectorAll<HTMLElement>('[data-reader-chapter]')[itemIndex]
    if (element && target) element.scrollTo({ top: target.offsetTop, behavior: 'smooth' })
  }
  return <motion.div className="home-wheel__dialog" role="dialog"
    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 18 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
    transition={{ duration: reduceMotion ? 0.12 : 0.52, ease: [0.22, 1, 0.36, 1] }} aria-modal="true" aria-label={`${projects[index].title}作品预览`}>
    <header className="home-wheel__dialog-header"><span><small>{projects[index].category}</small><strong>{projects[index].title}</strong></span><button ref={closeRef} type="button" aria-label="关闭作品预览" onClick={onClose}>×</button></header>
    <div className="project-reader__scroll" ref={scrollRef} data-lenis-prevent onScroll={updateProgress} aria-label="完整项目详情" tabIndex={0}>
      <div className="project-reader__content">{frames.map((frame, i) => <figure key={frame.src} data-reader-chapter><img src={frame.src} alt={frame.alt} width={frame.width} height={frame.height} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" /></figure>)}</div>
    </div>
    <nav className="project-reader__rail" aria-label="项目章节">{frames.map((frame, i) => <button type="button" key={frame.src} title={frame.label} aria-label={`第 ${i + 1} 段：${frame.label}`} aria-current={chapter === i ? 'location' : undefined} onClick={() => jump(i)} />)}</nav>
    <footer className="home-wheel__dialog-footer"><span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><span className="project-reader__progress">{chapter + 1} / {frames.length} 段 · {percent}%</span><span><button aria-label="预览上一个案例" onClick={() => onChange((index + projects.length - 1) % projects.length)}>←</button><button aria-label="预览下一个案例" onClick={() => onChange((index + 1) % projects.length)}>→</button></span></footer>
  </motion.div>
}

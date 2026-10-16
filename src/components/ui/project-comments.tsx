import { ArrowUp, MousePointer2, Scan, SlidersHorizontal, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react'

const projectNames: Record<string, string> = {
  'mobile-project': '移动端 APP 设计',
  'mobile-smart-site': '智慧工地',
  'web-project': '工业物联网安全生产平台',
  'web-state-grid': '国家电网门户',
  'visualization-project': '可视化大屏',
  'visualization-fire': '智慧消防',
  'hmi-cockpit': 'HMI 智能座舱',
  'aigc-project': 'AIGC 设计',
}

type Anchor = { frameId: string; x: number; y: number }
type LocalComment = { id: string; content: string; createdAt: string; number: number; anchor?: Anchor }
type Position = { x: number; y: number; visible: boolean }
const storagePrefix = 'sandian:project-comments:v1:'
const pendingId = 'pending-comment'

function readComments(key: string): LocalComment[] {
  const value: unknown = JSON.parse(window.localStorage.getItem(key) || '[]')
  if (!Array.isArray(value)) return []
  return value.filter(item => item && typeof item.id === 'string' && typeof item.content === 'string'
    && typeof item.createdAt === 'string' && Number.isFinite(Date.parse(item.createdAt)))
    .map((item, index) => ({
      id: item.id, content: item.content, createdAt: item.createdAt,
      number: Number.isSafeInteger(item.number) && item.number > 0 ? item.number : index + 1,
      anchor: item.anchor && typeof item.anchor.frameId === 'string'
        && Number.isFinite(item.anchor.x) && Number.isFinite(item.anchor.y)
        ? { frameId: item.anchor.frameId, x: Math.max(0, Math.min(1, item.anchor.x)), y: Math.max(0, Math.min(1, item.anchor.y)) } : undefined,
    }))
}

function CommentBubble({ getAnchor, children, label, onEnter, onLeave }: { getAnchor: () => HTMLElement | undefined; children: ReactNode; label: string; onEnter: () => void; onLeave: () => void }) {
  const panelRef = useRef<HTMLElement>(null)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0, visible: false })
  useLayoutEffect(() => {
    const pin = getAnchor()
    const panel = panelRef.current
    if (!pin || !panel) return
    let frame = 0
    const place = () => {
      const rect = pin.getBoundingClientRect()
      const bounds = panel.getBoundingClientRect()
      const clip = pin.closest('.project-frame-scroll')?.getBoundingClientRect()
      const right = rect.right + 12
      const fitsRight = right + bounds.width <= window.innerWidth - 8
      const fitsLeft = rect.left - bounds.width - 12 >= 8
      const preferredX = fitsRight ? right : fitsLeft ? rect.left - bounds.width - 12 : rect.left - bounds.width / 2
      const preferredY = fitsRight || fitsLeft ? rect.top - 12
        : rect.bottom + bounds.height + 12 <= window.innerHeight - 8 ? rect.bottom + 12 : rect.top - bounds.height - 12
      setPosition({
        x: Math.max(8, Math.min(preferredX, window.innerWidth - bounds.width - 8)),
        y: Math.max(8, Math.min(preferredY, window.innerHeight - bounds.height - 8)),
        visible: rect.bottom >= Math.max(0, clip?.top ?? 0) && rect.top <= Math.min(window.innerHeight, clip?.bottom ?? window.innerHeight),
      })
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(place) }
    place()
    const observer = new ResizeObserver(schedule)
    observer.observe(panel)
    if (pin.parentElement) observer.observe(pin.parentElement)
    window.addEventListener('scroll', schedule, true)
    window.addEventListener('resize', schedule)
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule, true); window.removeEventListener('resize', schedule)
    }
  }, [getAnchor])
  return <section ref={panelRef} className="project-comments__panel" role="dialog" aria-label={label}
    onPointerEnter={onEnter} onPointerLeave={event => { if (event.pointerType === 'mouse') onLeave() }}
    style={{ left: position.x, top: position.y, visibility: position.visible ? 'visible' : 'hidden' }} data-lenis-prevent>{children}</section>
}

function LocalProjectComments({ projectId, projectName }: { projectId: string; projectName: string }) {
  const storageKey = storagePrefix + projectId
  const [initial] = useState(() => {
    try { return { comments: readComments(storageKey), error: '' } }
    catch { return { comments: [], error: '无法读取本地批注，请检查浏览器存储权限。' } }
  })
  const [comments, setComments] = useState(initial.comments)
  const [frames, setFrames] = useState<HTMLElement[]>([])
  const [placing, setPlacing] = useState(false)
  const [pending, setPending] = useState<Anchor | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState(initial.error)
  const [status, setStatus] = useState('')
  const [dragPreview, setDragPreview] = useState<{ id: string; anchor: Anchor } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const pinRefs = useRef(new Map<string, HTMLButtonElement>())
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressClick = useRef<string | null>(null)
  const suppressHover = useRef<string | null>(null)
  const hoverBlockedUntil = useRef(0)
  const dragRef = useRef<{ id: string; pointerId: number; start: { x: number; y: number }; offset: { x: number; y: number }; anchor: Anchor; moved: boolean } | null>(null)
  const cancelClose = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null } }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setActiveId(current => current === pendingId ? current : null), 220)
  }
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current) }, [])

  useLayoutEffect(() => {
    setFrames(Array.from(document.querySelectorAll<HTMLElement>('.project-frame-scroll figure[id]')))
  }, [])

  useEffect(() => {
    if (!placing) return
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element) || target.closest('.project-comments, .project-comments__panel, .project-comment-pin')) return
      const figure = target.closest<HTMLElement>('.project-frame-scroll figure[id]')
      if (!figure) return
      event.preventDefault(); event.stopPropagation()
      const rect = figure.getBoundingClientRect()
      setPending({ frameId: figure.id, x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height })
      setDraft(''); setActiveId(pendingId); setPlacing(false); setError('')
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [placing])

  useEffect(() => {
    if (!activeId && !placing) return
    const close = () => { setActiveId(null); setPlacing(false); triggerRef.current?.focus() }
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    const onOutside = (event: PointerEvent) => {
      if (placing || !(event.target instanceof Element) || event.target.closest('.project-comments, .project-comments__panel, .project-comment-pin')) return
      setActiveId(null)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside) }
  }, [activeId, placing])

  useLayoutEffect(() => {
    const input = inputRef.current
    if (!input || activeId !== pendingId) return
    const resize = () => {
      input.style.height = 'auto'
      const limit = Math.min(220, window.innerHeight * 0.28)
      input.style.height = `${Math.min(input.scrollHeight, limit)}px`
      input.style.overflowY = input.scrollHeight > limit ? 'auto' : 'hidden'
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [draft, activeId])

  useEffect(() => { if (activeId === pendingId) inputRef.current?.focus() }, [activeId, pending])
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return
      try { setComments(readComments(storageKey)); setError('') }
      catch { setError('无法读取本地批注，请检查浏览器存储权限。') }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [storageKey])

  const anchorFor = (comment: LocalComment, index: number): Anchor | undefined =>
    comment.anchor && frames.some(frame => frame.id === comment.anchor?.frameId) ? comment.anchor
      : frames[0] ? { frameId: frames[0].id, x: .5 + (index % 5) * .035, y: .5 + Math.floor(index / 5) * .035 } : undefined
  const persist = (next: LocalComment[]) => {
    try {
      const anchored = next.map((comment, index) => ({ ...comment, anchor: anchorFor(comment, index) }))
      window.localStorage.setItem(storageKey, JSON.stringify(anchored))
      setComments(anchored); setError('')
      return true
    } catch { setError('无法保存，请检查浏览器存储权限。输入内容已保留。'); return false }
  }
  const save = (event: FormEvent) => {
    event.preventDefault()
    if (!pending || !draft.trim()) return
    try {
      const current = readComments(storageKey)
      const comment: LocalComment = { id: crypto.randomUUID(), content: draft.trim(), createdAt: new Date().toISOString(), anchor: pending, number: Math.max(0, ...current.map(item => item.number)) + 1 }
      if (persist([...current, comment])) { setActiveId(null); setPending(null); setDraft(''); setStatus('评论已保存在所选位置') }
    } catch { setError('无法保存，请检查浏览器存储权限。输入内容已保留。') }
  }
  const remove = (id: string) => {
    try {
      if (persist(readComments(storageKey).filter(comment => comment.id !== id))) {
        setActiveId(null); setStatus('评论已删除'); triggerRef.current?.focus()
      }
    } catch { setError('删除失败，请检查浏览器存储权限。') }
  }
  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>, id: string, anchor: Anchor) => {
    if (!event.isPrimary || event.button !== 0 || id === pendingId) return
    const frame = frames.find(item => item.id === anchor.frameId)
    if (!frame) return
    cancelClose(); suppressClick.current = null
    const rect = event.currentTarget.getBoundingClientRect()
    dragRef.current = { id, pointerId: event.pointerId, start: { x: event.clientX, y: event.clientY }, offset: { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 }, anchor, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const moveDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    if (!drag.moved && Math.hypot(event.clientX - drag.start.x, event.clientY - drag.start.y) < 5) return
    const frame = frames.find(item => item.id === drag.anchor.frameId)
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    drag.moved = true
    drag.anchor = { frameId: frame.id, x: Math.max(16 / rect.width, Math.min(1 - 16 / rect.width, (event.clientX - drag.offset.x - rect.left) / rect.width)), y: Math.max(16 / rect.height, Math.min(1 - 16 / rect.height, (event.clientY - drag.offset.y - rect.top) / rect.height)) }
    suppressClick.current = drag.id
    suppressHover.current = drag.id
    cancelClose(); setActiveId(null); setPlacing(false)
    setDragPreview({ id: drag.id, anchor: drag.anchor })
  }
  const finishDrag = (event: ReactPointerEvent<HTMLButtonElement>, cancelled = false) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    if (drag.moved) hoverBlockedUntil.current = Date.now() + 300
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (drag.moved && !cancelled) {
      try {
        if (persist(readComments(storageKey).map(comment => comment.id === drag.id ? { ...comment, anchor: drag.anchor } : comment))) setStatus('批注位置已更新')
      } catch { setError('位置保存失败，请检查浏览器存储权限。') }
    }
    setDragPreview(null)
  }
  const activeComment = comments.find(comment => comment.id === activeId)
  const nextNumber = Math.max(0, ...comments.map(comment => comment.number)) + 1
  const pins = comments.map((comment, index) => ({ id: comment.id, number: comment.number, anchor: dragPreview?.id === comment.id ? dragPreview.anchor : anchorFor(comment, index) }))
  if (pending && activeId === pendingId) pins.push({ id: pendingId, number: nextNumber, anchor: pending })

  return <>
    <div className={`project-comments${placing ? ' is-placing' : ''}`} data-lenis-prevent>
      <button ref={triggerRef} type="button" className="project-comments__trigger" aria-label={placing ? '取消添加批注' : '添加位置批注'} aria-pressed={placing}
        onClick={() => { cancelClose(); setPlacing(value => !value); setActiveId(null); setStatus('') }}>
        <span className="project-comments__tool-icon" aria-hidden="true"><Scan size={22} /><MousePointer2 size={13} /></span>批注
      </button>
      {placing ? <span className="project-comments__hint" role="status">点击作品添加批注，Esc 退出</span> : null}
      <span className="sr-only" role="status">{status}</span>
      {error && !activeId ? <p className="project-comments__error" role="alert">{error}</p> : null}
    </div>
    {pins.map(pin => {
      const frame = frames.find(frame => frame.id === pin.anchor?.frameId)
      if (!frame || !pin.anchor) return null
      return createPortal(<button type="button" key={pin.id} className={`project-comment-pin${activeId === pin.id ? ' is-active' : ''}${dragPreview?.id === pin.id ? ' is-dragging' : ''}`}
        style={{ left: `clamp(16px, ${pin.anchor.x * 100}%, calc(100% - 16px))`, top: `clamp(16px, ${pin.anchor.y * 100}%, calc(100% - 16px))` }}
        ref={element => { if (element) pinRefs.current.set(pin.id, element); else pinRefs.current.delete(pin.id) }}
        aria-label={`查看批注 ${pin.number}`} aria-expanded={activeId === pin.id}
        onPointerEnter={event => { cancelClose(); if (event.pointerType === 'mouse' && Date.now() >= hoverBlockedUntil.current && !dragRef.current && suppressHover.current !== pin.id && !placing && activeId !== pendingId) setActiveId(pin.id) }}
        onPointerLeave={event => { if (event.pointerType === 'mouse' && !dragRef.current) { suppressHover.current = null; scheduleClose() } }}
        onFocus={() => { cancelClose(); if (Date.now() >= hoverBlockedUntil.current && !placing && activeId !== pendingId && !dragRef.current && suppressHover.current !== pin.id) setActiveId(pin.id) }}
        onBlur={event => { if (!(event.relatedTarget instanceof Element) || !event.relatedTarget.closest('.project-comments__panel, .project-comment-pin')) scheduleClose() }}
        onPointerDown={event => startDrag(event, pin.id, pin.anchor!)} onPointerMove={moveDrag}
        onPointerUp={event => finishDrag(event)} onPointerCancel={event => finishDrag(event, true)}
        onLostPointerCapture={event => finishDrag(event, true)}
        onClick={event => { event.stopPropagation(); if (suppressClick.current === pin.id) { suppressClick.current = null; return } cancelClose(); setPlacing(false); setActiveId(pin.id) }}>{pin.number}</button>, frame, pin.id)
    })}
    {activeId && (activeComment || activeId === pendingId) ? <CommentBubble getAnchor={() => pinRefs.current.get(activeId)} label={`${projectName}评论`} onEnter={cancelClose} onLeave={scheduleClose}>
      {activeComment ? <div className="project-comments__saved">
        <p>{activeComment.content}</p>
        <button type="button" className="project-comments__delete" onClick={() => remove(activeComment.id)} aria-label={`删除批注 ${activeComment.number}`} title="删除批注"><Trash2 size={16} /></button>
      </div> : <form onSubmit={save} className="project-comments__composer">
        <SlidersHorizontal className="project-comments__decoration" size={17} aria-hidden="true" />
        <textarea ref={inputRef} aria-label="添加评论" value={draft} onChange={event => setDraft(event.target.value)} maxLength={1000} placeholder="添加评论…" rows={1} />
        <button className="project-comments__send" type="submit" disabled={!draft.trim()} aria-label="保存评论"><ArrowUp size={17} /></button>
      </form>}
      {error ? <p className="project-comments__error" role="alert">{error}</p> : null}
    </CommentBubble> : null}
  </>
}

export function ProjectComments() {
  const projectId = new URLSearchParams(window.location.search).get('page') || ''
  const projectName = Object.hasOwn(projectNames, projectId) ? projectNames[projectId] : undefined
  return projectName ? <LocalProjectComments key={projectId} projectId={projectId} projectName={projectName} /> : null
}

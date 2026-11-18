import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Download, X, RotateCw } from 'lucide-react'
import './contact-overlay.css'

export function ContactOverlay() {
  const [open, setOpen] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [dragging, setDragging] = useState(false)
  const closeButton = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const close = useCallback(() => { setOpen(false); setFlipped(false); returnFocus.current?.focus() }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a') : null
      if (!target || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const url = new URL(target.href, window.location.href)
      if (url.origin !== window.location.origin || url.hash !== '#contact') return
      event.preventDefault()
      returnFocus.current = target
      setOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey) }
  }, [open, close])

  return <AnimatePresence>{open && <motion.div className="contact-screen" role="dialog" aria-modal="true" aria-labelledby="contact-screen-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
    <h2 id="contact-screen-title" className="sr-only">联系方式</h2>
    <button ref={closeButton} className="contact-screen__close" onClick={close} aria-label="关闭联系方式"><X size={20} /></button>
    <div className="contact-screen__ambient" aria-hidden="true" />
    <motion.div className="contact-lanyard" initial={reduceMotion ? false : { opacity: 0, y: -55, rotate: -5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: 'spring', stiffness: 85, damping: 16 }}>
      <div className="contact-lanyard__strap" aria-hidden="true"><span>SANDIAN DESIGN · UI/UX</span></div>
      <div className="contact-lanyard__clip" aria-hidden="true" />
      <motion.div className="contact-badge-wrap" drag={!reduceMotion} dragConstraints={{ left: -65, right: 65, top: -20, bottom: 30 }} dragElastic={.22} dragSnapToOrigin onDragStart={() => setDragging(true)} onDragEnd={() => window.setTimeout(() => setDragging(false), 80)}>
        <button type="button" className={'contact-badge' + (flipped ? ' is-flipped' : '')} aria-label={flipped ? '翻回工牌正面' : '翻转工牌查看联系方式'} onClick={() => { if (!dragging) setFlipped(value => !value) }}>
          <span className="contact-badge__face contact-badge__front">
            <span className="contact-badge__slot" aria-hidden="true" />
            <span className="contact-badge__brand">SANDIAN DESIGN <small>PORTFOLIO / 2026</small></span>
            <img src="/contact/portrait.png" alt="邓威的证件照" className="contact-badge__portrait" />
            <strong className="contact-badge__name">邓威</strong><span className="contact-badge__en">DENG WEI</span>
            <span className="contact-badge__role">UI / UX 设计师</span><span className="contact-badge__specialty">复杂业务系统 · 数据可视化</span>
            <span className="contact-badge__line" /><span className="contact-badge__location">NANJING / CHINA</span><span className="contact-badge__barcode" aria-hidden="true" /><span className="contact-badge__hint"><RotateCw size={12} /> 点击翻面</span>
          </span>
          <span className="contact-badge__face contact-badge__back">
            <span className="contact-badge__slot" aria-hidden="true" /><span className="contact-badge__brand">SANDIAN DESIGN <small>LET’S CONNECT</small></span>
            <span className="contact-badge__back-title">让我们<br />一起创造。</span><span className="contact-badge__back-sub">HAVE A PROJECT IN MIND?</span>
            <span className="contact-badge__details"><span><small>EMAIL</small>1270434903@qq.com</span><span><small>PHONE</small>166 5172 0602</span><span><small>WECHAT</small>Sandian1016</span></span>
            <span className="contact-badge__hint"><RotateCw size={12} /> 点击翻回</span>
          </span>
        </button>
      </motion.div>
    </motion.div>
    <div className="contact-screen__bottom"><p>拖动工牌 · 点击翻面</p><div><a href="/contact/resume.pdf" download="邓威-UIUX设计师个人简历.pdf"><Download size={15} /> 下载简历</a><a href="/contact/portfolio.pdf" download="邓威-UIUX作品集.pdf"><Download size={15} /> 作品集 PDF</a></div></div>
  </motion.div>}</AnimatePresence>
}

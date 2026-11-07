import './card-tunnel-preview.css'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

const images = Array.from({ length: 48 }, (_, index) =>
  `/projects/card-tunnel/${String(index + 1).padStart(2, '0')}.jpg`,
)
const cards = images.map((image, index) => ({ image, angle: index / images.length * Math.PI * 5, index }))

// Cards travel out from different depths around the open center of the tunnel.
// Their angles stay mostly stable so the entire composition does not spin.
const openingAnimations = cards.map(({ index }) => {
  const opening = Array.from({ length: 36 }, (_, step) => {
    const time = step / 35
    const depth = (index / cards.length + .19 * (time * time * .5 + time * .5)) % 1
    const angle = index * 2.39996 + depth * .28
    const radius = 11 + depth * 19
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius * 1.05
    const z = -480 + depth * 650
    const size = .38 + depth * .9
    const opacity = Math.min(1, depth * 8, (1 - depth) * 14)
    const tilt = (index % 2 ? 1 : -1) * (10 + index % 5 * 6)
    return `${step}% { transform: translate(-50%,-50%) translate3d(${x.toFixed(2)}vw,${y.toFixed(2)}vh,${z.toFixed(1)}px) rotate(${tilt}deg) scale(${size.toFixed(3)}); opacity:${opacity.toFixed(3)}; animation-timing-function:linear }`
  }).join('\n')
  return `@keyframes tunnel-card-${index} {
    ${opening}
    48%,51% { transform: translate(-50%,-50%) translate3d(var(--cx),var(--cy),var(--cz)) rotateY(var(--cr)) scale(.72); opacity: 1; animation-timing-function: cubic-bezier(.25,.1,.25,1) }
    61% { transform: translate(-50%,-50%) translate3d(var(--fx),var(--fy),0) rotateY(20deg) rotateZ(5deg) scale(1); opacity: 1; animation-timing-function: cubic-bezier(.25,.1,.25,1) }
    70% { transform: translate(-50%,-50%) translate3d(calc(var(--gx) - 8vw + var(--sweep)),var(--gy),0) rotateY(25deg) rotateZ(5deg) scale(1.3); opacity: 1 }
    80%,89% { transform: translate(-50%,-50%) translate3d(calc(var(--gx) - 23vw),var(--gy),0) rotateY(25deg) rotateZ(5deg) scale(1.3); opacity: 1 }
    98%,100% { transform: translate(-50%,-50%) translate3d(calc(var(--gx) - 32vw),var(--gy),100px) rotateY(25deg) rotateZ(5deg) scale(1.5); opacity: 0 }
  }`
}).join('\n')

export function CardTunnelPreview({ embedded = false, start = true }: { embedded?: boolean; start?: boolean }) {
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const stageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let inView = true
    const update = () => setVisible(inView && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    observer.observe(stage)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  useEffect(() => {
    let active = true
    setReady(false)
    const preload = images.map((src) => {
      const image = new Image()
      image.src = src
      return image.decode().catch(() => undefined)
    })
    Promise.all(preload).then(() => {
      if (active) setReady(true)
    })
    return () => { active = false }
  }, [])

  return <div className={`tunnel-preview${embedded ? ' tunnel-preview--embedded' : ''}${ready && start && visible ? ' is-ready' : ''}`}>
    <style>{openingAnimations}</style>
    {!embedded && <nav className="tunnel-nav"><a className="tunnel-brand" href="/#home"><span>✦</span> Sandian design</a><div className="tunnel-nav-links"><a href="/#projects">作品</a><a href="/#about">个人简介</a></div><a className="tunnel-contact" href="/#contact">联系方式 ↗</a></nav>}
    <section ref={stageRef} className="tunnel-stage" aria-label="作品集动态展示">
      <div className="tunnel-heading tunnel-heading-left">设计有迹<br />创意有形</div><div className="tunnel-heading tunnel-heading-right">保持好奇<br />持续创造</div>
      <div className="tunnel-world" aria-hidden="true">{cards.map(({ image, angle, index }) => {
        const ring = 0.48 + index / (cards.length - 1) * 0.62
        const foreground = index >= 27
        const orbit = index / cards.length * Math.PI * 2
        const column = index % 6
        const row = Math.floor(index / 6)
        return <div key={index} className="tunnel-card" style={{ animationName: `tunnel-card-${index}`, '--x': Math.cos(angle) * 25 * ring + 'vw', '--y': Math.sin(angle) * 30 * ring + 'vh', '--mid-x': Math.cos(angle - .7) * 25 * ring * .48 + 'vw', '--mid-y': Math.sin(angle - .7) * 30 * ring * .48 + 'vh', '--rotation': (index % 2 ? 1 : -1) * (8 + index % 5 * 7) + 'deg', '--depth': foreground ? '120px' : (index % 5) * 75 - 160 + 'px', '--cx': Math.cos(orbit) * 13 + 'vw', '--cy': Math.sin(orbit) * 4 + 'vh', '--cz': Math.sin(orbit) * 220 + 'px', '--cr': (orbit * 180 / Math.PI + 90) + 'deg', '--fx': ((index % 16) - 8) * 5.6 + 'vw', '--fy': (Math.floor(index / 16) - 1) * 33 + 'vh', '--gx': (column - 2.5) * 11 + 'vw', '--gy': (row - 3.5) * 12 + 'vh', '--sweep': (5 - column) * 3.5 + 'vw' } as CSSProperties}><img src={image} alt="" decoding="async" /></div>
      })}</div>
      <div className="tunnel-edge-blur tunnel-edge-blur-top" aria-hidden="true" />
      <div className="tunnel-edge-blur tunnel-edge-blur-bottom" aria-hidden="true" />
      <p className="tunnel-caption">从想法到体验，<br />让设计不断向前。</p>
      <div className="tunnel-final"><h1>Start with<br />the good<br />part</h1><p>每一个作品，都是一次新的探索。<br />用设计连接想法与真实体验。</p><a href="/#projects">探索作品 ↗</a></div>
    </section>
  </div>
}

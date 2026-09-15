import { useRef } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { useInView, useReducedMotion } from 'framer-motion'
import { BrandLogo } from './brand-logo'
import { projectCategories } from './navbar-menu'

type FooterLink = { title: string; href: string }
type FooterSection = { label: string; links: FooterLink[] }

const assetRoot = 'https://zego-platform-growth.oss-cn-shanghai.aliyuncs.com/official-website/images/index'

const servicePoints = [
  { label: 'WEB端产品', iconSrc: '/footer/icon-product.svg' },
  { label: '数据可视化', iconSrc: '/footer/icon-dataviz.svg' },
  { label: '移动端产品', iconSrc: '/footer/icon-mobile.svg' },
  { label: 'AIGC设计', iconSrc: '/footer/icon-ai.svg' },
]

const footerSections: FooterSection[] = [
  {
    label: '页面导航',
    links: [
      { title: '主页', href: '#home' },
      { title: '项目分类', href: '#projects' },
      { title: '个人简介', href: '#about' },
      { title: '联系方式', href: '#contact' },
    ],
  },
  {
    label: '设计方向',
    links: projectCategories.map((category) => ({
      title: category.label,
      href: category.href ?? '#projects',
    })),
  },
]

export function Footer({ standalone = false }: { standalone?: boolean }) {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { amount: 0.16, once: false })
  const reduceMotion = useReducedMotion()
  const resolveHref = (href: string) =>
    standalone && href.startsWith('#') ? `/${href}` : href

  return (
    <footer id="contact" ref={footerRef} className="zego-clone-footer">
      <section className="zego-footer-cta">
        <div className="zego-footer-cta__background" aria-hidden="true" />
        <div className={`zego-footer-light ${isInView || reduceMotion ? 'is-active' : ''}`} aria-hidden="true">
          <img src={`${assetRoot}/footer_light.png`} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="zego-footer-shell zego-footer-cta__inner">
          <div className="zego-footer-cta__copy">
            <p>一起把复杂问题，</p>
            <p>设计得 <span>更简单</span>。</p>
            <a href={resolveHref('#projects')} className="zego-footer-trial">查看作品 <ArrowRight aria-hidden="true" /></a>
          </div>

          <div className="zego-footer-services" aria-label="设计方向">
            {servicePoints.map((point, index) => (
              <div
                key={point.label}
                className="zego-footer-service"
              >
                <img src={point.iconSrc} alt="" loading="lazy" decoding="async" />
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="zego-footer-information">
        <div className="zego-footer-shell">
          <div className="zego-footer-menu">
            <div className="zego-footer-brand">
              <a href={resolveHref('#home')} className="zego-footer-brand__identity" aria-label="Sandian design 返回首页">
                <BrandLogo />
                <span>Sandian design</span>
              </a>
              <p>专注复杂业务系统、数据可视化与全链路产品体验，用设计连接业务目标与真实用户。</p>
            </div>

            <div className="zego-footer-columns">
              {footerSections.map((section) => (
                <div className="zego-footer-column" key={section.label}>
                  <h3>{section.label}</h3>
                  <ul>
                    {section.links.map((link) => <li key={link.title}><a href={resolveHref(link.href)}>{link.title}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className="zego-footer-contact">
              <h3>关注或联系我</h3>
              <dl>
                <div><dt>邮箱：</dt><dd><a href="mailto:sandian1016@gmail.com">sandian1016@gmail.com</a><a href="mailto:1270434903@qq.com">1270434903@qq.com</a></dd></div>
                <div><dt>电话：</dt><dd><a href="tel:16651720602">16651720602</a><a href="tel:15862266874">15862266874</a></dd></div>
              </dl>
              <p className="zego-footer-location"><MapPin aria-hidden="true" /> 南京 · UI/UX &amp; Product Designer</p>
            </div>
          </div>

          <div className="zego-footer-legal">
            <p>© {new Date().getFullYear()} Sandian design. All rights reserved.</p>
            <p>Designed with clarity, built with detail.</p>
          </div>
        </div>
      </section>
    </footer>
  )
}

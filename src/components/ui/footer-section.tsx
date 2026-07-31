import type { ComponentProps, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from './brand-logo'
import { GlowCard } from './glow-card'

type FooterLink = {
  title: string
  href: string
}

type FooterSection = {
  label: string
  links: FooterLink[]
}

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
    links: [
      { title: 'B / G 端产品', href: '#projects' },
      { title: '数据可视化', href: '#projects' },
      { title: '移动端产品', href: '#projects' },
      { title: 'AI设计', href: '#about' },
    ],
  },
]

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden border-t border-white/[0.10] bg-[#08080b] px-4 py-12 sm:px-6 md:px-8 md:py-14 lg:px-10 lg:py-16 xl:px-12 2xl:px-16"
    >
      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col">
        <div className="grid gap-10 border-b border-white/[0.10] pb-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-16 lg:pb-14">
          <AnimatedContainer>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-[#64CEFB]">
              Have a project in mind?
            </p>
            <h2 className="font-yahei max-w-4xl text-4xl font-bold leading-none tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              <span className="block">一起把复杂问题，</span>
              <span className="mt-3 block">设计得更简单。</span>
            </h2>
          </AnimatedContainer>

          <AnimatedContainer delay={0.12} className="space-y-3">
            <GlowCard radius={20} compact>
              <div
                aria-label="邮箱已隐藏"
                className="group flex items-center justify-between bg-white/[0.045] px-5 py-4 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.075]"
              >
                <span className="flex items-center gap-3 text-sm text-white/80">
                  <Mail className="h-4 w-4 text-[#64CEFB]" />
                  *****
                </span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-white/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
            </GlowCard>

            <GlowCard radius={20} compact>
              <div
                aria-label="电话已隐藏"
                className="group flex items-center justify-between bg-white/[0.035] px-5 py-4 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.065]"
              >
                <span className="flex items-center gap-3 text-sm text-white/70">
                  <Phone className="h-4 w-4 text-[#64CEFB]" />
                  *****
                </span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-white/35 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
            </GlowCard>

            <div className="flex items-center gap-3 px-5 py-3 text-sm text-white/45">
              <MapPin className="h-4 w-4" />
              南京 · UI/UX & Product Designer
            </div>
          </AnimatedContainer>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:gap-14 lg:py-11">
          <AnimatedContainer className="space-y-5">
            <a href="#home" className="inline-flex items-center gap-3" aria-label="Sandian design 返回首页">
              <BrandLogo />
              <span className="text-base font-bold text-white">Sandian design</span>
            </a>
            <p className="max-w-sm text-sm leading-6 text-white/45">
              专注复杂业务系统、数据可视化与全链路产品体验，用设计连接业务目标与真实用户。
            </p>
          </AnimatedContainer>

          {footerSections.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.08 + index * 0.08}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">{section.label}</h3>
              <ul className="mt-5 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={`${section.label}-${link.title}`}>
                    <a
                      href={link.href}
                      className="inline-flex text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer
          delay={0.18}
          className="flex flex-col gap-3 border-t border-white/[0.08] pt-5 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {new Date().getFullYear()} Sandian design. All rights reserved.</p>
          <p>Designed with clarity, built with detail.</p>
        </AnimatedContainer>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.05, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(6px)', y: 18, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

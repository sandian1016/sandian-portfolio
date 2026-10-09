import { ArrowLeft } from 'lucide-react'

export function ProjectBackLink() {
  return (
    <a href="/#home" className="project-back-link">
      <ArrowLeft size={18} aria-hidden="true" />
      <span>返回主页</span>
    </a>
  )
}

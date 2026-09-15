type Experience = {
  company: string
  position: string
  periodStart: string
  periodEnd: string
  responsibilities: string[]
}

const profile = [
  { label: '姓名', value: '邓威' },
  { label: '经验', value: '5 年' },
  { label: '微信', value: 'Sandian1016' },
]

const experiences: Experience[] = [
  {
    company: '深圳领星网络科技',
    position: 'UI 交互设计师',
    periodStart: '2021.04',
    periodEnd: '2023.06',
    responsibilities: [
      '负责 Web 端与 B 端 SaaS 产品的 UI 界面和交互细节体验，提升产品易用性及用户满意度。',
      '深入理解用户场景和业务逻辑，与产品、研发团队紧密配合，平衡业务目标与用户体验，确保设计方案的可行性及技术还原落地。',
      '根据用户反馈及数据分析结果，全程参与产品迭代，持续优化，探索不同阶段产品定位及风格。',
    ],
  },
  {
    company: '联通物联网责任有限公司',
    position: '产品设计师',
    periodStart: '2023.09',
    periodEnd: '至今',
    responsibilities: ['用户需求分析、信息架构梳理与高保真原型输出', '参与需求评审，协同产品、视觉与开发推动设计落地', '开展用户研究与可用性测试，持续迭代复杂业务体验', '沉淀交互规范、组件库与设计指南，保障多端体验一致性'],
  },
]

const capabilities = [
  { title: 'AIGC 创意设计', english: 'AIGC CREATIVE DESIGN' },
  { title: '可视化原型输出', english: 'VISUAL PROTOTYPING' },
  { title: 'IP & 产品设计', english: 'IP & PRODUCT DESIGN' },
]

function SectionHeading({ title, english }: { title: string; english: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h3 className="font-yahei text-[28px] font-bold leading-tight tracking-[-0.025em] text-[#091221]">{title}</h3>
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#091221]/50">{english}</p>
    </div>
  )
}

export function AboutSection({ previewMode = false }: { previewMode?: boolean }) {
  return (
    <section
      id="about"
      className={`relative isolate overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-14 md:px-8 lg:px-10 lg:py-16 xl:px-12 2xl:px-16 ${
        previewMode ? '' : 'home-about-transition'
      }`}
    >
      <div className="relative mx-auto w-full max-w-[1280px]">
        <header className="max-w-[960px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#0055ff]">ABOUT / PERSONAL PROFILE</p>
          <h2 className="font-yahei mt-4 text-[30px] font-bold leading-[1.2] tracking-[-0.04em] text-[#091221] sm:text-[38px] lg:whitespace-nowrap lg:text-[42px]">
            从业务理解到体验落地，让复杂系统更清晰。
          </h2>
        </header>

        <div className="mt-10 sm:mt-12">
          <SectionHeading title="基本信息" english="Basic Information" />
          <dl className="mt-6 grid gap-x-12 gap-y-5 sm:grid-cols-3 lg:max-w-[840px]">
            {profile.map((item) => (
              <div key={item.label} className="flex items-baseline gap-3">
                <dt className="shrink-0 text-sm text-[#63738a]">{item.label}</dt>
                <dd className="min-w-0 text-[20px] font-semibold tracking-[-0.02em] text-[#172536] sm:text-[22px]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 sm:mt-14">
          <SectionHeading title="工作经历" english="Work Experience" />

          <ol className="mt-6 sm:mt-7" aria-label="工作经历">
            {experiences.map((experience, index) => (
              <li
                key={experience.company}
                className={`relative grid gap-4 pl-8 sm:grid-cols-[108px_minmax(0,1fr)] sm:gap-7 sm:pl-9 lg:grid-cols-[108px_minmax(0,1fr)_150px] lg:gap-9 ${
                  index < experiences.length - 1 ? 'mb-7 pb-7 sm:mb-8 sm:pb-8' : ''
                }`}
              >
                <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#0055ff] bg-white" aria-hidden="true" />
                {index < experiences.length - 1 ? (
                  <span className="absolute bottom-[-29px] left-[4px] top-[18px] w-px bg-[#091221]/[0.12] sm:bottom-[-33px]" aria-hidden="true" />
                ) : null}

                <div className="text-sm font-medium tabular-nums leading-6 text-[#53677e]">
                  <p>{experience.periodStart}</p>
                  <p className="text-[#7c8a9a]">{experience.periodEnd}</p>
                </div>

                <article className="min-w-0">
                  <h4 className="font-yahei text-[18px] font-bold leading-7 text-[#172536] sm:text-[20px]">{experience.company}</h4>
                  <ul className="mt-4 grid max-w-[960px] gap-x-10 gap-y-3 sm:grid-cols-2" aria-label={`${experience.company}职责`}>
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="relative pl-4 text-sm leading-6 text-[#344b63] before:absolute before:left-0 before:top-[0.68rem] before:h-1 before:w-1 before:rounded-full before:bg-[#0055ff]">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </article>

                <p className="text-sm font-semibold text-[#172536] sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:text-right">{experience.position}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 sm:mt-14">
          <SectionHeading title="职业拓展能力" english="Extended Capabilities" />
          <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-3">
            {capabilities.map((capability) => (
              <div key={capability.title} className="min-w-0">
                <p className="text-[18px] font-semibold leading-7 text-[#172536]">{capability.title}</p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-[#091221]/50">{capability.english}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

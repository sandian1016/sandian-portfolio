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
      '负责国内潮玩移动端产品“酷潮 APP”的 UI 与交互设计，围绕潮玩内容发现、商品交易、盲盒体验、会员成长和社区互动等核心场景，持续完善产品体验。',
      '参与用户需求分析、产品流程梳理与信息架构设计，优化从内容浏览、商品选择到下单购买的关键路径，将复杂业务规则转化为清晰、易理解的移动端操作流程。',
      '负责核心页面、高保真原型及视觉方案输出，并结合品牌定位探索年轻化、潮流化的视觉语言与情感化 IP 表达。',
      '与产品经理和研发团队协同推进方案落地，持续跟进开发还原、体验验收与版本迭代，保障设计质量和不同业务场景下的体验一致性。',
    ],
  },
  {
    company: '联通物联网责任有限公司',
    position: '产品设计师',
    periodStart: '2023.09',
    periodEnd: '2026.08',
    responsibilities: ['用户需求分析、信息架构梳理与高保真原型输出', '参与需求评审，协同产品、视觉与开发推动设计落地', '开展用户研究与可用性测试，持续迭代复杂业务体验', '沉淀交互规范、组件库与设计指南，保障多端体验一致性'],
  },
]

function SectionHeading({ title, english }: { title: string; english: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h3 className="font-yahei text-[28px] font-bold leading-tight tracking-[-0.025em] text-[#17283e]">{title}</h3>
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#71849a]">{english}</p>
    </div>
  )
}

export function AboutSection({ previewMode = false }: { previewMode?: boolean }) {
  return (
    <section
      id="about"
      className={`relative isolate scroll-mt-24 overflow-hidden bg-[#f8fbff] px-4 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8 md:px-8 lg:px-10 lg:pt-9 xl:px-12 2xl:px-16 ${
        previewMode ? '' : 'home-about-transition'
      }`}
    >
      <div className="relative mx-auto w-full max-w-[1280px]">
        <header className="max-w-[960px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#0055ff]">ABOUT / PERSONAL PROFILE</p>
          <h2 className="font-yahei mt-3 text-[30px] font-bold leading-[1.2] tracking-[-0.04em] text-[#17283e] sm:text-[38px] lg:whitespace-nowrap lg:text-[42px]">
            从业务理解到体验落地，让复杂系统更清晰。
          </h2>
        </header>

        <div className="mt-8 sm:mt-9">
          <SectionHeading title="基本信息" english="Basic Information" />
          <dl className="mt-5 grid gap-x-12 gap-y-4 sm:grid-cols-3 lg:max-w-[840px]">
            {profile.map((item) => (
              <div key={item.label} className="flex items-baseline gap-3">
                <dt className="shrink-0 text-sm text-[#63768c]">{item.label}</dt>
                <dd className="min-w-0 text-[20px] font-semibold tracking-[-0.02em] text-[#17283e] sm:text-[22px]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-9 sm:mt-10">
          <SectionHeading title="工作经历" english="Work Experience" />

          <ol className="mt-5" aria-label="工作经历">
            {experiences.map((experience, index) => (
              <li
                key={experience.company}
                className={`relative grid gap-4 pl-8 sm:grid-cols-[108px_minmax(0,1fr)] sm:gap-7 sm:pl-9 lg:grid-cols-[108px_minmax(0,1fr)_150px] lg:gap-9 ${
                  index < experiences.length - 1 ? 'mb-5 pb-5 sm:mb-6 sm:pb-6' : ''
                }`}
              >
                <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full border-2 border-[#0055ff] bg-[#f8fbff]" aria-hidden="true" />
                {index < experiences.length - 1 ? (
                  <span className="absolute bottom-[-21px] left-[4px] top-[18px] w-px bg-[#d2deed] sm:bottom-[-25px]" aria-hidden="true" />
                ) : null}

                <div className="text-sm font-medium tabular-nums leading-6 text-[#566a80]">
                  <p>{experience.periodStart}</p>
                  <p className="text-[#7b8da0]">{experience.periodEnd}</p>
                </div>

                <article className="min-w-0">
                  <h4 className="font-yahei text-[18px] font-bold leading-7 text-[#17283e] sm:text-[20px]">{experience.company}</h4>
                  <ul className="mt-3 grid max-w-[960px] gap-x-10 gap-y-2 sm:grid-cols-2" aria-label={`${experience.company}职责`}>
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="relative pl-4 text-sm leading-6 text-[#566a80] before:absolute before:left-0 before:top-[0.68rem] before:h-1 before:w-1 before:rounded-full before:bg-[#0055ff]">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </article>

                <p className="text-sm font-semibold text-[#17283e] sm:col-start-2 lg:col-start-3 lg:row-start-1 lg:text-right">{experience.position}</p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}

# Design QA — HMI 智能座舱项目页与首页项目展示

## Comparison target

- Source layout reference: `C:\Users\sandian\AppData\Local\Temp\codex-clipboard-16ff94c0-cb46-4413-baaa-1fb3305443bc.png`
- Source navigation reference: `C:\Users\sandian\AppData\Local\Temp\codex-clipboard-97e43c6e-0d24-424a-829d-78bc9d49c282.png`
- Source content truth: `C:\Users\sandian\Desktop\2026UI作品集\XIAOMI SU7概念设计.zip`
- Implementation: `http://127.0.0.1:4174/?page=hmi-cockpit`
- Desktop implementation screenshot: `C:\Users\sandian\AppData\Local\Temp\hmi-layout-implementation.png`
- Mobile implementation screenshot: `C:\Users\sandian\AppData\Local\Temp\hmi-mobile-qa.png`
- Full-view comparison: `C:\Users\sandian\AppData\Local\Temp\hmi-layout-comparison.jpg`
- Focused navigation comparison: `C:\Users\sandian\AppData\Local\Temp\hmi-nav-comparison.jpg`
- State: dark standalone HMI project page, first frame active; homepage navigation with the new entry visible.

## Viewport and normalization

- Layout source pixels: `3840 × 1907`; normalized to `1920 × 954` for structural comparison.
- Desktop implementation: `1920 × 954` CSS px, device scale factor `1`.
- Navigation source and implementation: `2157 × 216` CSS px, device scale factor `1`.
- Mobile implementation: `390 × 844` CSS px, device scale factor `1`.
- The layout source contains a different portfolio category, so only shell geometry, hierarchy, navigation placement, sidebar behavior, radii, background, and scrolling pattern were compared. The supplied XIAOMI SU7 artwork is the content truth.

## Full-view comparison evidence

- The implementation preserves the reference's fixed glass navigation, dark page background, left return action, persistent chapter navigation, centered rounded content canvas, and vertically scrolling artwork sequence.
- All 29 supplied frames render in numeric order from `01` through `29`; frame 07 preserves its original `1920 × 4916` long-form ratio.
- Desktop layout keeps a `1280` px artwork canvas and a separate left navigation rail without overlap at the tested viewport.
- Mobile collapses the primary navigation into the existing menu, hides the chapter list, retains the back action, and renders the artwork at full available width without horizontal overflow.

## Focused region comparison evidence

- The focused navigation comparison confirms that `HMI智能座舱` sits between `可视化` and `AIGC设计`, matching the annotated reference.
- The desktop navigation container was widened from `980/1200` to `1120/1280` px and switches to the compact menu below the `xl` breakpoint, preventing label collision.
- The reference and implementation both preserve the brand at left and the white `联系方式` action at right.

## Required fidelity surfaces

- Fonts and typography: existing Sandian navigation and project-sidebar typography are reused; the HMI artwork's embedded typography remains untouched inside the supplied raster frames.
- Spacing and layout rhythm: header, left rail, 18 px frame gap, rounded artwork canvases, and desktop/mobile offsets match the existing project-detail system and the supplied structural reference.
- Colors and visual tokens: the existing dark project background, translucent navigation, white controls, muted sidebar labels, and blue active marker are preserved.
- Image quality and asset fidelity: the 29 source PNGs were converted directly to WebP at original pixel dimensions and quality 90; no artwork was recreated with HTML, CSS, SVG, generated imagery, or placeholders.
- Copy and content: navigation uses the user-specified `HMI智能座舱`; the page and alt text identify the supplied work as XIAOMI SU7 smart-cockpit concept design without adding unsupported outcomes or metrics.

## Interaction and runtime verification

- Homepage HMI navigation link opens `?page=hmi-cockpit`.
- Desktop and mobile navigation entries are both reachable.
- Return-to-home link works.
- Seven sidebar chapter anchors update the active state and URL hash.
- Image lightbox opens from an artwork frame and closes with Escape.
- Desktop renders 29 figures and the first image reports `1920 × 1080` natural dimensions.
- Mobile renders 29 figures with no horizontal document overflow.
- Browser console and page-error checks passed on the final desktop reload and mobile run.
- TypeScript and Vite production build passed.

## Findings

- No actionable P0, P1, or P2 visual or interaction differences remain for the requested scope.

## Comparison history

1. First combined full-view comparison passed for the requested shell geometry and supplied content sequence.
2. Focused navigation comparison passed with the new HMI entry in the annotated position.
3. Desktop and mobile interaction runs passed; no corrective visual iteration was required.

## Follow-up polish

- The chapter labels are deliberately broad because the ZIP contains artwork but no separate chapter specification. They can be renamed later without changing the frame order.
- Future HMI pages or replacement frames can be added to the same ordered data structure.

## Homepage project showcase update

- Source reference: `C:\Users\sandian\AppData\Local\Temp\codex-clipboard-91c69db4-6173-4e03-b3b4-10a45b0cdb3c.png`
- Implementation: `http://127.0.0.1:4174/#projects`
- Desktop implementation screenshot: `C:\Users\sandian\AppData\Local\Temp\hmi-home-showcase-1440.png`
- Tablet implementation screenshots: `C:\Users\sandian\AppData\Local\Temp\hmi-home-showcase-1024.png` and `C:\Users\sandian\AppData\Local\Temp\hmi-home-showcase-768.png`
- Mobile implementation screenshot: `C:\Users\sandian\AppData\Local\Temp\hmi-home-showcase-390.png`
- Reference/implementation comparison: `C:\Users\sandian\AppData\Local\Temp\hmi-home-showcase-comparison.png`
- The new HMI case is the first featured item and spans both desktop columns. The remaining Mobile, Web, Data Visualization, and AIGC cases retain their original order in two balanced rows.
- The featured card uses the supplied `hmi-frame-01.webp` artwork at its original `1920 × 1080` ratio. Embedded artwork text is not cropped or recreated.
- At `1440`, `1024`, and `768` CSS px, the featured card uses a left-copy/right-media composition. At `390` CSS px it becomes a natural single-column card with left-aligned copy.
- All four tested widths have `scrollWidth === innerWidth`; no horizontal overflow was detected.
- The first responsive pass exposed a one-character title wrap and inherited mobile cross-axis alignment. The final CSS uses balanced heading wrapping and explicitly resets the mobile copy alignment.
- Keyboard focus reaches the featured project link with the accessible label `查看HMI智能座舱设计项目详情`.
- Activating the HMI project opens `?page=hmi-cockpit#hmi-frame-01`; all 29 HMI frame elements are present.
- All five project-cover images completed successfully during the final visual capture. No failing page or asset responses were observed in the final navigation run.
- TypeScript and Vite production build passed after the homepage update.
- No actionable P0, P1, or P2 visual, responsive, accessibility, or interaction issues remain in the requested homepage scope.

final result: passed

---

# Homepage project carousel and light sections — 2026-10-26

## Comparison target

- Source visual reference: the user's selected-cases screenshot and the live `#work` section at `https://weixubo281-code.github.io/aigcidavid-shape-experience/`.
- Implementation: `http://127.0.0.1:4173/#projects`.
- Matched `825 × 720` reference and implementation screenshots: `docs/qa/project-carousel-2026-10-26/sandian-carousel-reference-825.png`, `sandian-carousel-implementation-825.png`, and `sandian-carousel-comparison-825.png`.
- Mobile project capture: `docs/qa/project-carousel-2026-10-26/sandian-carousel-implementation-mobile.png` at `390 × 844`.
- About section captures: `docs/qa/project-carousel-2026-10-26/sandian-about-implementation-825.png` and `sandian-about-implementation-mobile.png`.

## Final design

- Project cards scroll horizontally with a preview of the next project; the original five titles, covers, order, and links remain.
- The old large card background is removed. The section height follows the media, copy, and controls.
- The carousel progress line and circular previous/next buttons use the Sandian brand blue.
- The top-right `01 / 05` counter was removed at the user's request. The progress line retains an accessible value for screen readers.
- About and project sections share a solid `#f8fbff` background: nearly white with a slight blue tint. Dark text and blue accents remain legible.
- The Extended Capabilities block was removed from About; its vertical padding and internal spacing were reduced.

## Review and verification

- Inspected About and Projects at `825` CSS px and mobile at `390` CSS px in the in-app browser after the final background adjustment.
- The project screenshot shows the title with no count at top right, the first project and next-project preview, and visible blue controls.
- The mobile project cards stack copy and image and remain inside the horizontal carousel.
- The About captures show the shortened section's remaining information and work experience content without the removed block.
- TypeScript and Vite production build passed after the latest layout changes.

final result: passed

---

# Homepage project accordion and section spacing — 2026-10-26

- Reference: `https://www.zego.im/` customer-card accordion, inspected alongside the user's screenshots.
- The active card has a colored-to-near-white full-card gradient and a consistently sized inset photo. At 1440 px, the settled image area measures approximately 318 × 372 px for each of the five projects.
- Project colors: HMI green, Mobile blue, WEB purple, Data Visualization blue, and AIGC red. Collapsed cards use saturated gradients; expanded cards use matching pale gradients.
- The bottom navy progress line and previous/next controls remain. Card dragging and horizontal sliding are disabled; the cards open on hover or click, and the width transition takes 0.72 seconds.
- About and Projects now have tighter vertical padding. The desktop gap from the last About item to the Projects eyebrow measures 72 px; the Projects section ends 56 px below its controls.
- Removed the scroll-linked movement and scaling of the homepage hero, which exposed its background as a stripe when scrolling. The hero now fills its section and fades into the About background at the bottom.
- The homepage hero carousel, including its tabs, overlay text, and CTA, was restored at the user's request.
- Final previews for the project cards and hero/About boundary: `docs/qa/project-accordion-2026-10-26/desktop-final.png`, `mobile-final.png`, and `hero-about-final.png`.
- Confirmed the project arrows change the active card and the production build completed before the hero restoration.

final result: passed

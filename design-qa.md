# Design QA

## Comparison target

- Source visual truth: `https://stunt-route-84150395.figma.site/portfolio`
- Source capture: in-app browser capture at `1539 × 1272` CSS px, device density `1`
- Supporting source screenshot: `C:\Users\sandian\AppData\Local\Temp\codex-clipboard-dd5035dd-098c-425b-af0b-e34b27c9528e.png`
- Implementation: `http://127.0.0.1:4173/#projects`
- Implementation screenshot: unavailable
- Intended state: dark desktop project showcase, default card state; responsive mobile state at `390 × 844`

## Full-view comparison evidence

- Source capture opened successfully and was measured in the in-app browser.
- Source desktop card measurements: approximately `343 × 643` CSS px, `256` px media height, `48` px source radius.
- The implementation uses the same three-column desktop rhythm, `4:3` media ratio, approximately `640` px card height, and an intentionally reduced `24` px radius per user feedback.
- A rendered implementation capture could not be obtained because the in-app browser rejected local-page access under its URL security policy.

## Focused region comparison evidence

- Source card typography, image ratio, body hierarchy, tag treatment, and hover transition were inspected from the live page.
- The implementation uses local copies of the source-style project imagery and adds the requested cursor-aware `BorderGlow` hover treatment.
- Focused rendered comparison remains unavailable for the same local-page security-policy blocker.

## Findings

- [P1] Rendered visual verification unavailable
  - Location: homepage `#projects`
  - Evidence: source design was captured; the local implementation screenshot could not be captured.
  - Impact: typography wrapping, final card crop, hover glow strength, and mobile spacing cannot be visually certified.
  - Fix: refresh the existing local preview in the user browser and capture desktop, hover, and `390 × 844` mobile states for comparison.

## Required fidelity surfaces

- Fonts and typography: implemented with the existing site Chinese display font and responsive sizes; rendered verification blocked.
- Spacing and layout rhythm: source measurements were translated to a `1124` px content frame and `640` px cards; rendered verification blocked.
- Colors and visual tokens: dark navy-black palette and low-opacity secondary text match the source direction; rendered verification blocked.
- Image quality and asset fidelity: three source-style images were copied locally and optimized to `1400 × 1050` JPEGs; rendered crop verification blocked.
- Copy and content: four project categories follow the user-provided sequence and Chinese naming.

## Comparison history

1. Source capture and desktop/mobile measurements completed.
2. Homepage project section replaced; card radius reduced from the source `48` px to the requested `24` px.
3. Cursor-aware border glow integrated from the provided React Bits component prompt.
4. TypeScript and Vite production build passed.
5. Post-build visual comparison blocked by local URL browser security policy.

## Implementation checklist

- [x] Replace the previous homepage project display.
- [x] Preserve the rest of the homepage.
- [x] Add four projects in the requested order.
- [x] Copy and optimize source-style images locally.
- [x] Add responsive one/two/three-column behavior.
- [x] Reduce card radius.
- [x] Add cursor-aware border glow hover behavior.
- [x] Pass TypeScript and production build.
- [ ] Capture and compare rendered desktop, hover, and mobile states.

## Final result

final result: blocked

Blocker: the in-app browser security policy rejected capture of the local preview URL, so rendered comparison evidence is missing.

---

# WEB Project Detail QA — 2026-09-14

## Comparison target

- Source visual truth: the five Cesare-style reference screenshots supplied in the current task.
- Primary layout references: `codex-clipboard-e26d712a-8a9f-4928-93d4-f64f589ab3b3.png`, `codex-clipboard-0636a346-fc3f-4290-af08-6a59d4ed3d2a.png`, `codex-clipboard-765d6fe1-426d-4217-95fc-9dbda0af52e7.png`, and `codex-clipboard-d489ab9c-7728-474a-bd40-afc2ec3c2f51.png`.
- Implementation: `http://127.0.0.1:4174/?page=web-project`.
- Implementation screenshot: unavailable because the in-app browser runtime failed before page capture.
- Intended state: dark WEB project detail page with a centered 1280 px artwork column, `#151515` page background, 18 px frame spacing, and a desktop-only left chapter index without back/contact buttons.

## Full-view comparison evidence

- The implemented page shell uses the existing light portfolio navigation.
- The artwork column is `max-width: 1280px`, horizontally centered with auto margins, and scales down proportionally below the design width.
- The artwork source was verified as `1920 × 1080`; the image uses intrinsic dimensions, automatic height, and `object-contain`, preventing squeeze or distortion.
- All ten user-supplied 1920 × 1080 WEB frames are rendered in upload order. No invented portfolio frames or placeholder art were added.

## Focused region comparison evidence

- The page background is explicitly `#151515` at both the route root and the page section, matching the original reference project's detail-screen background.
- The frame stack uses an exact `18px` vertical gap.
- The reference's red-marked back and contact controls are omitted.
- The left chapter navigation is independent of the centered artwork column and only appears when the viewport is at least 1900 px wide; its 260 px width and `left: calc(50% - 932px)` position keep its right edge exactly 32 px from the centered 1280 px artwork frame.
- The sidebar preserves the reference's 10 px catalogue rhythm, 4 px hover/current offset, dot scale, thin scroll track, and display font. Its fixed visible catalogue region (`min(44vh, 448px)`) makes the ten-title index scrollable and reserves the scrollbar gutter. Its text remains on the reference's white hierarchy; only the requested `#0067F5` is used for the dot and scrollbar thumb.
- Each navigation item links to its real supplied frame, updates the URL hash, and receives current-state styling as its frame becomes the dominant visible section during scrolling.
- The homepage WEB project card and the WEB item in the project menu both route to `/?page=web-project`.

## Findings

- [P1] Rendered visual verification unavailable
  - Location: WEB project detail page.
  - Evidence: TypeScript/Vite build, source inspection, image dimensions, HTTP page response, and HTTP asset response passed; the browser runtime failed with `Importing module "node:process" is not allowed in node_repl` before capture.
  - Impact: final desktop centering, navigation overlap, responsive crop, and perceived vertical rhythm cannot be visually certified in this run.
  - Fix: review the already-running 4174 page in the in-app browser and capture desktop and narrow-width states once browser control is available.

## Required fidelity surfaces

- Layout: centered 1920 px design canvas with responsive down-scaling; rendered verification blocked.
- Spacing: exact 18 px inter-frame gap; source verified.
- Color: exact `#151515` detail-page background with `#0F0F0F` artwork surfaces; source verified from the reference site's stylesheet.
- Assets: real 1920 × 1080 WEB cover; no generated or placeholder content.
- Interaction: WEB card/menu route exists; browser click verification blocked.
- Scope: mobile, data visualization, and AIGC detail pages remain intentionally unbuilt pending WEB review.

## Implementation checklist

- [x] Create the WEB-only project detail route.
- [x] Center the 1280 px artwork frame.
- [x] Preserve artwork aspect ratio without squeeze or distortion.
- [x] Apply the reference site's `#151515` project-detail background.
- [x] Restore the source-inspired chapter sidebar without return/contact controls, using `#0067F5` accents and a 32 px artboard gap.
- [x] Add all ten supplied WEB artboards in upload order and align chapter titles to their actual page content.
- [x] Apply 18 px inter-frame spacing.
- [x] Omit the red-marked back and contact controls.
- [x] Link the homepage WEB card and WEB navigation item to the detail route.
- [x] Pass TypeScript and Vite production build.
- [x] Verify page and artwork asset return HTTP 200.
- [ ] Capture and compare the rendered desktop and responsive states.
- [ ] Continue with the other three category pages only after WEB review approval.

## Final result

final result: blocked

Blocker: rendered visual comparison could not be captured because the in-app browser runtime failed during connection setup.

---

# Mobile Project Detail QA — 2026-09-14

## Accepted framework and scope

- The user explicitly approved the WEB project detail page before this mobile phase.
- The mobile page reuses the approved framework without changing the WEB artwork order, dimensions, visual styling, or 18 px frame rhythm.
- Shared detail-page behavior was subsequently clarified by the user: the top navigation and left chapter index remain fixed, while only the centered artwork column scrolls vertically.
- Implementation route: `http://127.0.0.1:4174/?page=mobile-project`.

## Implemented evidence

- Added all 14 supplied `酷潮1.png` through `酷潮14.png` artworks in upload order.
- Verified every source artwork is 1920 × 1080 and rendered with intrinsic dimensions, proportional width scaling, automatic height, and `object-contain`.
- The centered artwork container remains `max-width: 1280px`, with an exact 18 px frame gap and the shared `#151515` page background.
- Added content-derived chapter titles for project cover, core interface showcase, project background, business problem, design task, style definition, typography, IP design, AI-assisted output, content discovery, blind-box experience, membership, community growth, and final interface overview.
- The left index reuses the approved white type hierarchy; only its dot and scrollbar thumb use `#0067F5`. It remains 260 px wide and 32 px from the centered artwork at the desktop reference width.
- Browser-page scrolling is locked while the artwork stack uses its own height-bounded scroll container. Intersection observation is rooted to that container, so section highlighting follows the actual artwork scroll rather than `window` scroll.
- The homepage “移动端 APP” card and project-category “移动端页面” item both route to `/?page=mobile-project`.

## Verification

- [x] TypeScript and Vite production build passed.
- [x] `git diff --check` passed with line-ending notices only.
- [x] Mobile route returned HTTP 200.
- [x] First and final mobile artwork assets returned HTTP 200.
- [x] Source inspection confirms the body lock, independent artwork overflow, container-rooted section observer, fixed sidebar, and Lenis bypass for native nested scrolling.
- [ ] Rendered desktop interaction and responsive visual comparison remain unverified because the browser-control runtime failed during connection setup.

## Final result

final result: implementation complete; visual interaction review pending

The page is ready for user review in the already-running 4174 preview. Build and runtime-resource evidence passed; rendered appearance and pointer/wheel behavior are not claimed as independently verified in this run.

## Regression correction — fixed-height gallery

- User screenshot evidence showed all WEB/mobile artboards compressed into thin horizontal strips after the independent central scroller was introduced.
- Root cause: the artwork stack is a vertical flex container with a bounded height, and each `figure` retained the default `flex-shrink: 1` behavior.
- Correction: every WEB and mobile artwork figure now uses `flex: none`, preserving its intrinsic 16:9 height while the parent stack supplies vertical overflow.
- Follow-up visual correction: the WEB and mobile artwork-column scrollbar chrome is hidden across Chromium, Firefox, and legacy Microsoft engines while wheel, touchpad, touch, keyboard, anchor navigation, and scroll-linked chapter highlighting remain available. The left chapter catalogue scrollbar is intentionally unchanged.

---

# Visualization Detail, Lightbox and Full-width Ending QA — 2026-09-14

## Scope

- Added the visualization detail route at `/?page=visualization-project` using the approved WEB/mobile detail-page framework.
- Added all nine supplied South New City visualization artboards in source order; every source is 1920 × 1080 and remains proportionally rendered with intrinsic dimensions and `object-contain`.
- Added one shared image lightbox to the WEB, mobile and visualization detail pages.
- Added the existing approved portfolio ending/footer to the three detail routes that currently exist in source.

## Interaction implementation

- Clicking any project artwork opens an image-only modal without the reference screenshot's red-marked author/profile/thumbnail sidebar.
- Previous and next controls use the requested dark circular button treatment and wrap around at both ends.
- Keyboard controls support `Escape`, `ArrowLeft`, `ArrowRight`, `-`, and `+`.
- The bottom-center zoom control supports 75%, 100%, 125%, 150%, 175%, and 200%; clicking the percentage resets to 100%.
- The modal is rendered through a body portal, receives initial focus, restores the prior focus on close, and leaves the fixed page navigation/sidebar structure unchanged.

## Full-width ending correction

- The first implementation placed the ending/footer inside the 1280 px rounded artwork card. User comparison evidence rejected that framing.
- The corrected structure keeps each project artboard centered at a maximum width of 1280 px while the final footer spans the complete internal scrolling viewport, with no enclosing rounded card, border, or shadow.
- The central project scrollbar remains visually hidden. The left chapter scrollbar remains visible in blue by design.

## Routes and project entry points

- `/?page=web-project`
- `/?page=mobile-project`
- `/?page=visualization-project`
- The homepage data-visualization card and project-category data-visualization link now open the visualization route.
- At this checkpoint the AIGC detail route was still pending. It was added in the subsequent AIGC QA section below after the user supplied the approved long-form artwork set.

## Verification

- [x] TypeScript and Vite production build passed after the lightbox and full-width-ending changes.
- [x] WEB, mobile and visualization routes returned HTTP 200 from the correct 4174 process.
- [x] All nine visualization assets returned HTTP 200.
- [x] Source inspection confirms fixed navigation, fixed left index, central-only scrolling, hidden central scrollbar, full-width footer ending, and shared modal controls.
- [ ] Rendered modal interaction and full-width footer visual comparison are not independently certified because the in-app browser connection failed with `Importing module "node:process" is not allowed in node_repl`.
- [x] AIGC detail-page route and ending were added after the four source frames were supplied; see the subsequent AIGC QA section.

## Final result

final result: implementation complete for the WEB, mobile and visualization checkpoint; browser visual review pending

---

# AIGC Long-form Project Detail QA — 2026-09-14

## Scope and source fidelity

- Added the AIGC detail route at `/?page=aigc-project` using the approved fixed-navigation, fixed-left-index and central-only scrolling framework.
- Added the four supplied AIGC artworks in source order: `AIGC设计-2.png`, `AIGC设计-3.png`, `AIGC设计-4.png`, and `AIGC设计-5.png`.
- Verified source dimensions are respectively 1920 × 2935, 1920 × 5057, 1920 × 5057, and 1920 × 4493.
- Each artwork is centered at a maximum width of 1280 px and uses its intrinsic width/height with `width: 100%`, `height: auto`, and `object-contain`. Long-form heights therefore remain proportional and are neither cropped nor compressed into the 16:9 dimensions used by the other project sets.

## Framework and interaction

- The top portfolio navigation and left chapter index remain fixed while only the center artwork column scrolls.
- The central scrollbar remains visually hidden; the left chapter index retains its approved blue position indicator and scrollbar.
- The four chapters are “主视觉展示合集”, “插画设计｜招聘”, “插画设计｜IP形象”, and “情感化设计｜节日海报”. The full-width footer remains below the artwork stack but is no longer exposed as a chapter item.
- Clicking an artwork reuses the shared image-only lightbox, circular previous/next controls, keyboard navigation and bottom-center 75%–200% zoom control.
- The approved ending/footer spans the complete central scrolling viewport rather than being enclosed in a rounded 1280 px artwork card.
- The homepage AIGC card and “项目分类 → AIGC设计” item both route to `/?page=aigc-project`.

## Verification

- [x] TypeScript and Vite production build passed.
- [x] `git diff --check` passed with line-ending notices only.
- [x] The 4174 listener was verified as the Vite process from `个人网站-4174最新源码`.
- [x] The AIGC route and all four PNG resources returned HTTP 200.
- [x] Source inspection confirms intrinsic long-image ratios, 1280 px maximum width, central-only scrolling, hidden center scrollbar, fixed chapter navigation, shared lightbox controls and full-width ending.
- [ ] Rendered desktop interaction and visual comparison remain unverified because the in-app browser connection could not be initialized in this environment.

## Final result

final result: AIGC implementation complete; rendered interaction review pending

## Shared lightbox zoom-centering correction — 2026-09-14

- Screenshot evidence showed the artwork moving to the right as zoom increased, although the bottom zoom control itself remained centered.
- Root cause: the lightbox's centered wrapper also grew from 100% to 200% width and height, moving its own center away from the viewport center before the image scale was applied.
- Correction: the wrapper now retains the viewport-sized centering boundary; only the image is scaled, with an explicit `center center` transform origin.
- WEB, mobile, visualization and AIGC pages all use this single shared lightbox component. Source search found no page-specific zoom implementation or competing transform override.
- [x] TypeScript and Vite production build passed after the correction.
- [x] `git diff --check` passed with line-ending notices only.
- [x] All four project-detail routes returned HTTP 200 from the verified 4174 process.
- [ ] Automated rendered 100% → 150% → 200% center-position comparison remains blocked because the in-app browser connection could not be initialized.

## Shared lightbox backdrop-dismiss interaction — 2026-09-14

- Added click-to-dismiss behavior to the actual full-screen preview stage, which covers the black modal background.
- Clicking the displayed artwork is excluded from dismissal; previous/next, zoom and close controls remain independent interactive layers.
- The black empty region uses a zoom-out cursor while the artwork retains a normal cursor, clarifying the dismiss target without changing the approved visual structure.
- The shared behavior applies to WEB, mobile, visualization and AIGC project pages.
- [x] TypeScript and Vite production build passed.
- [x] `git diff --check` passed with line-ending notices only.
- [x] All four project-detail routes returned HTTP 200.
- [ ] Automated pointer-interaction proof remains blocked because the in-app browser connection could not be initialized.

## Four-page chapter-index cleanup — 2026-09-14

- Removed the “项目尾页” item from the fixed left chapter index on WEB, mobile, visualization and AIGC detail pages.
- Removed the footer-only hash target and footer intersection observation, so the final real project chapter remains selected while the user continues into the footer.
- Preserved the complete full-width portfolio footer at the bottom of every detail page without changing its layout, links or content.
- [x] Source search confirms no “项目尾页” label or ending-section state remains in the four detail-page components.
- [x] Source search confirms all four detail-page components still render `<Footer standalone />`.
- [x] TypeScript and Vite production build passed.
- [x] `git diff --check` passed with line-ending notices only.
- [x] All four project-detail routes returned HTTP 200.
- [ ] Automated rendered sidebar/footer comparison remains blocked because the in-app browser connection could not be initialized.

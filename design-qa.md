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

import { useEffect, useRef } from 'react'

export function useChapterNavFollow(activeChapterId: string) {
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const navigation = navigationRef.current
    const activeLink = navigation?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!navigation || !activeLink) return

    const navigationBounds = navigation.getBoundingClientRect()
    const linkBounds = activeLink.getBoundingClientRect()
    const safeInset = 16
    const linkIsComfortablyVisible =
      linkBounds.top >= navigationBounds.top + safeInset &&
      linkBounds.bottom <= navigationBounds.bottom - safeInset

    if (linkIsComfortablyVisible) return

    const linkTopInsideNavigation = navigation.scrollTop + linkBounds.top - navigationBounds.top
    const centeredScrollTop =
      linkTopInsideNavigation - (navigation.clientHeight - linkBounds.height) / 2
    const maximumScrollTop = Math.max(0, navigation.scrollHeight - navigation.clientHeight)
    const nextScrollTop = Math.min(maximumScrollTop, Math.max(0, centeredScrollTop))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    navigation.scrollTo({
      top: nextScrollTop,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [activeChapterId])

  return navigationRef
}

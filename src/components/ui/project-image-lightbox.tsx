import { ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type ProjectLightboxItem = {
  src: string
  alt: string
  width: number
  height: number
}

type ProjectImageLightboxProps = {
  items: ProjectLightboxItem[]
  activeIndex: number | null
  onChange: (index: number) => void
  onClose: () => void
}

const MIN_ZOOM = 0.75
const MAX_ZOOM = 2
const ZOOM_STEP = 0.25

export function ProjectImageLightbox({
  items,
  activeIndex,
  onChange,
  onClose,
}: ProjectImageLightboxProps) {
  const [zoom, setZoom] = useState(1)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const open = activeIndex !== null

  const showPrevious = useCallback(() => {
    if (activeIndex === null || items.length === 0) return
    onChange((activeIndex - 1 + items.length) % items.length)
  }, [activeIndex, items.length, onChange])

  const showNext = useCallback(() => {
    if (activeIndex === null || items.length === 0) return
    onChange((activeIndex + 1) % items.length)
  }, [activeIndex, items.length, onChange])

  const zoomOut = useCallback(() => {
    setZoom((current) => Math.max(MIN_ZOOM, Number((current - ZOOM_STEP).toFixed(2))))
  }, [])

  const zoomIn = useCallback(() => {
    setZoom((current) => Math.min(MAX_ZOOM, Number((current + ZOOM_STEP).toFixed(2))))
  }, [])

  useEffect(() => {
    if (!open) return

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(focusFrame)
      previouslyFocusedRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    setZoom(1)
  }, [activeIndex, open])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
      if (event.key === '-' || event.key === '_') zoomOut()
      if (event.key === '+' || event.key === '=') zoomIn()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open, showNext, showPrevious, zoomIn, zoomOut])

  if (!open || activeIndex === null || items.length === 0) return null

  const currentItem = items[activeIndex]

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-[#111]/[0.97]"
      role="dialog"
      aria-modal="true"
      aria-label={`${currentItem.alt}，第 ${activeIndex + 1} 张，共 ${items.length} 张`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-[#262626]/95 text-white shadow-[0_12px_35px_rgba(0,0,0,0.4)] transition-colors hover:bg-[#363636] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-6 md:top-6"
        aria-label="关闭大图"
        onClick={onClose}
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className="project-lightbox-stage absolute inset-0 cursor-zoom-out overflow-auto px-[54px] py-14 sm:px-[76px] md:px-[92px] md:py-[58px]"
        onMouseDown={(event) => {
          if (event.target instanceof HTMLImageElement) return
          onClose()
        }}
      >
        <div className="flex min-h-full min-w-full items-center justify-center">
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            width={currentItem.width}
            height={currentItem.height}
            decoding="async"
            className="block max-h-[calc(100vh-116px)] max-w-[calc(100vw-108px)] cursor-default select-none object-contain shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:max-w-[calc(100vw-152px)] md:max-w-[calc(100vw-184px)]"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            draggable={false}
          />
        </div>
      </div>

      <button
        type="button"
        className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/[0.06] bg-[#242424]/95 text-white shadow-[0_12px_36px_rgba(0,0,0,0.38)] transition-transform hover:scale-105 hover:bg-[#303030] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5 md:h-14 md:w-14"
        aria-label="上一张"
        onClick={showPrevious}
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.2} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/[0.06] bg-[#242424]/95 text-white shadow-[0_12px_36px_rgba(0,0,0,0.38)] transition-transform hover:scale-105 hover:bg-[#303030] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 md:h-14 md:w-14"
        aria-label="下一张"
        onClick={showNext}
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.2} aria-hidden="true" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-30 flex h-11 -translate-x-1/2 items-center overflow-hidden rounded-full border border-white/10 bg-[#242424]/95 px-1 text-white shadow-[0_14px_38px_rgba(0,0,0,0.42)] backdrop-blur md:bottom-5">
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label="缩小"
          disabled={zoom <= MIN_ZOOM}
          onClick={zoomOut}
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="min-w-[66px] rounded-full px-3 py-2 text-center text-xs font-semibold tabular-nums transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label={`当前缩放比例 ${Math.round(zoom * 100)}%，点击恢复到 100%`}
          onClick={() => setZoom(1)}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          aria-label="放大"
          disabled={zoom >= MAX_ZOOM}
          onClick={zoomIn}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <span className="absolute bottom-5 right-5 hidden rounded-md bg-black/55 px-2.5 py-1.5 text-xs tabular-nums text-white/70 sm:block">
        {activeIndex + 1} / {items.length}
      </span>
    </div>,
    document.body,
  )
}

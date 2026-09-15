import { motion, useInView, useReducedMotion } from 'framer-motion'
import { type CSSProperties, useMemo, useRef } from 'react'

type ThreeDMarqueeProps = {
  images: string[]
  className?: string
}

const COLUMN_COUNT = 4
const EDGE_FILL_COLUMN_COUNT = 3
const MIN_ITEMS_PER_COLUMN = 10
const GRID_SIZE = 1720
const COLUMN_GAP = 32
const COLUMN_WIDTH = (GRID_SIZE - COLUMN_GAP * (COLUMN_COUNT - 1)) / COLUMN_COUNT
const COLUMN_STRIDE = COLUMN_WIDTH + COLUMN_GAP

export function ThreeDMarquee({ images, className = '' }: ThreeDMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const isInView = useInView(containerRef, { margin: '180px 0px', amount: 0.12 })
  const chunks = useMemo(() => {
    const chunkSize = Math.ceil(images.length / COLUMN_COUNT)
    return Array.from({ length: COLUMN_COUNT }, (_, columnIndex) => {
      const start = columnIndex * chunkSize
      const sourceColumn = images.slice(start, start + chunkSize)

      if (sourceColumn.length === 0) return sourceColumn

      const itemCount = Math.max(sourceColumn.length, MIN_ITEMS_PER_COLUMN)
      return Array.from({ length: itemCount }, (_, itemIndex) => sourceColumn[itemIndex % sourceColumn.length])
    })
  }, [images])

  const shouldAnimate = !reduceMotion && isInView

  const renderColumn = (
    column: string[],
    motionIndex: number,
    key: string,
    style?: CSSProperties,
  ) => {
    const travel = motionIndex % 2 === 0 ? 100 : -100

    return (
      <motion.div
        key={key}
        style={style}
        animate={{ y: shouldAnimate ? travel : 0 }}
        transition={
          shouldAnimate
            ? {
                duration: motionIndex % 2 === 0 ? 10 : 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }
            : { duration: 0.35, ease: 'easeOut' }
        }
        className={`${style ? 'absolute top-0' : 'relative'} flex flex-col items-start gap-8 will-change-transform`}
      >
        <GridLineVertical className="-left-4" offset="80px" />
        {column.map((image, imageIndex) => (
          <div className="relative" key={`${key}-${image}-${imageIndex}`}>
            <GridLineHorizontal className="-top-4" offset="20px" />
            <motion.img
              whileHover={reduceMotion ? undefined : { y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="aspect-[970/700] rounded-lg object-cover ring-1 ring-gray-950/5 hover:shadow-2xl"
              width={970}
              height={700}
            />
          </div>
        ))}
      </motion.div>
    )
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`mx-auto block h-[520px] w-full overflow-hidden rounded-2xl sm:h-[600px] lg:h-[680px] ${className}`}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: 'rotateX(55deg) rotateY(0deg) rotateZ(-45deg)',
              transformStyle: 'preserve-3d',
            }}
            className="relative right-[50%] top-96 grid size-full origin-top-left grid-cols-4 gap-8"
          >
            {Array.from({ length: EDGE_FILL_COLUMN_COUNT }, (_, edgeIndex) => {
              const motionIndex = -(edgeIndex + 1)
              const sourceColumn = chunks[(COLUMN_COUNT - 1 - edgeIndex + COLUMN_COUNT) % COLUMN_COUNT]

              return renderColumn(sourceColumn, motionIndex, `marquee-edge-column-${edgeIndex}`, {
                left: -COLUMN_STRIDE * (edgeIndex + 1),
                width: COLUMN_WIDTH,
              })
            })}
            {chunks.map((column, columnIndex) =>
              renderColumn(column, columnIndex, `marquee-column-${columnIndex}`),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type GridLineProps = {
  className?: string
  offset?: string
}

function GridLineHorizontal({ className = '', offset = '200px' }: GridLineProps) {
  const style = {
    '--background': '#ffffff',
    '--color': 'rgba(0, 0, 0, 0.2)',
    '--height': '1px',
    '--width': '5px',
    '--fade-stop': '90%',
    '--offset': offset,
    maskComposite: 'exclude',
    WebkitMaskComposite: 'xor',
  } as CSSProperties

  return (
    <div
      style={style}
      className={`absolute left-[calc(var(--offset)/2*-1)] z-30 h-[var(--height)] w-[calc(100%+var(--offset))] bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask-composite:exclude] [mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] ${className}`}
    />
  )
}

function GridLineVertical({ className = '', offset = '150px' }: GridLineProps) {
  const style = {
    '--background': '#ffffff',
    '--color': 'rgba(0, 0, 0, 0.2)',
    '--height': '5px',
    '--width': '1px',
    '--fade-stop': '90%',
    '--offset': offset,
    maskComposite: 'exclude',
    WebkitMaskComposite: 'xor',
  } as CSSProperties

  return (
    <div
      style={style}
      className={`absolute top-[calc(var(--offset)/2*-1)] z-30 h-[calc(100%+var(--offset))] w-[var(--width)] bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)] [background-size:var(--width)_var(--height)] [mask-composite:exclude] [mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),linear-gradient(black,black)] ${className}`}
    />
  )
}

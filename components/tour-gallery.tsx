"use client"

import { motion, type MotionValue, useScroll, useTransform } from "framer-motion"
import Lenis from "lenis"
import { useEffect, useRef, useState } from "react"

const images = [
  "/images/581969051-1483330886057569-5667721862811516593-n.jpg",
  "/images/582018323-844940797943371-8265326563780866800-n.jpg",
  "/images/582032289-1147326954262030-3780448133870061312-n.jpg",
  "/images/582091012-1869121463961642-7793752119754482511-n.jpg",
  "/images/582343537-852067067240133-2496494421843177712-n.jpg",
  "/images/582009107-4325847654407861-1029002019752977216-n.jpg",
  "/images/581884421-1515467653105953-4660357507893160908-n.jpg",
  "/images/582011364-1219512443330041-4257357666659200-n.jpg",
  "/images/582280137-803561032470618-4145385938542917306-n.jpg",
  // New scenic photos
  "/images/miniature-world-aerial.jpg",
  "/images/forest-road.jpg",
  "/images/bridge-walkway.jpg",
  "/images/eiffel-tower-view.jpg",
]

const TourGallery = () => {
  const gallery = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  })

  const { height } = dimension
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {
    const lenis = new Lenis()

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf)
    resize()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <main className="w-full bg-background text-foreground">
      <div ref={gallery} className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-background p-[2vw]">
        <Column images={[images[0], images[1], images[2], images[9]]} y={y} />
        <Column images={[images[3], images[4], images[5], images[10]]} y={y2} />
        <Column images={[images[6], images[7], images[8], images[11]]} y={y3} />
        <Column images={[images[9], images[10], images[11], images[12]]} y={y4} />
      </div>
    </main>
  )
}

type ColumnProps = {
  images: string[]
  y: MotionValue<number>
}

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-lg">
          <img
            src={src || "/placeholder.svg"}
            alt="Educational tour memory"
            className="pointer-events-none h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  )
}

export { TourGallery }

"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface TextRevealProps {
  children: string
  className?: string
  blur?: number
  delay?: number
  duration?: number
  from?: "top" | "bottom"
  split?: "word" | "letter"
}

export function TextReveal({
  children,
  className = "",
  blur = 10,
  delay = 0.1,
  duration = 1,
  from = "bottom",
  split = "word",
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const items = split === "word" ? children.split(" ") : children.split("")

  const yFrom = from === "bottom" ? 20 : -20

  return (
    <span ref={ref} className={`inline-flex flex-wrap my-4 ${className}`}>
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: yFrom, filter: `blur(${blur}px)` }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration,
            delay: index * delay,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ marginRight: split === "word" ? "0.25em" : undefined }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  )
}

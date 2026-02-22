"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

type IconCharacterProps = {
  icon: string
  index: number
  centerIndex: number
  scrollYProgress: any
  totalIcons: number
}

const IconCharacter = ({ icon, index, centerIndex, scrollYProgress, totalIcons }: IconCharacterProps) => {
  const distanceFromCenter = index - centerIndex

  const delayOffset = index * 0.02

  const x = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.4 + delayOffset, 0.7 + delayOffset],
    [distanceFromCenter * 180, distanceFromCenter * 40, 0],
  )
  const rotate = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.4 + delayOffset, 0.7 + delayOffset],
    [distanceFromCenter * 35, distanceFromCenter * 8, 0],
  )
  const rotateY = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.4 + delayOffset, 0.7 + delayOffset],
    [distanceFromCenter * 60, distanceFromCenter * 15, 0],
  )
  const rotateX = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.4 + delayOffset, 0.7 + delayOffset],
    [Math.abs(distanceFromCenter) * 25, 8, 0],
  )
  const y = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.4 + delayOffset, 0.7 + delayOffset],
    [-Math.abs(distanceFromCenter) * 50, -15, 0],
  )
  const scale = useTransform(scrollYProgress, [0 + delayOffset, 0.4 + delayOffset, 0.7 + delayOffset], [0.4, 0.85, 1])
  const opacity = useTransform(scrollYProgress, [0 + delayOffset, 0.3 + delayOffset, 0.6 + delayOffset], [0, 0.7, 1])
  const z = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.4 + delayOffset, 0.7 + delayOffset],
    [-Math.abs(distanceFromCenter) * 80, -30, 0],
  )

  return (
    <motion.div
      className="inline-flex items-center justify-center mx-0.5 sm:mx-1 md:mx-2"
      style={{
        x,
        rotate,
        rotateY,
        rotateX,
        y,
        z,
        scale,
        opacity,
        transformOrigin: "center",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Icon cube */}
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-xl sm:rounded-2xl relative group cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(30px)",
        }}
      >
        {/* Back face */}
        <div
          className="absolute inset-0 rounded-xl sm:rounded-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(20,20,30,0.95) 0%, rgba(10,10,15,1) 100%)",
            transform: "translateZ(-10px)",
          }}
        />

        {/* Main face with glassmorphism */}
        <div
          className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:border-white/30"
          style={{
            background:
              "linear-gradient(145deg, rgba(50,50,70,0.6) 0%, rgba(25,25,40,0.8) 50%, rgba(15,15,25,0.95) 100%)",
          }}
        />

        {/* Top shine reflection */}
        <div
          className="absolute inset-x-2 top-1 h-1/3 rounded-t-lg sm:rounded-t-xl pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
          }}
        />

        {/* Side depth effect */}
        <div
          className="absolute -right-1 top-2 bottom-2 w-2 rounded-r-lg"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
            transform: "translateZ(-5px) rotateY(-10deg)",
          }}
        />

        {/* Bottom depth effect */}
        <div
          className="absolute left-2 right-2 -bottom-1 h-2 rounded-b-lg"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%)",
            transform: "translateZ(-5px) rotateX(10deg)",
          }}
        />

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          <img
            src={icon || "/placeholder.svg"}
            alt=""
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-11 md:h-11 lg:w-14 lg:h-14 object-contain transition-all duration-300"
          />
        </div>

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    </motion.div>
  )
}

type TitleCharacterProps = {
  char: string
  index: number
  centerIndex: number
  scrollYProgress: any
}

const TitleCharacter = ({ char, index, centerIndex, scrollYProgress }: TitleCharacterProps) => {
  const distanceFromCenter = index - centerIndex

  const x = useTransform(scrollYProgress, [0, 0.3, 0.6], [distanceFromCenter * 40, distanceFromCenter * 10, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6], [Math.abs(distanceFromCenter) * 20, 5, 0])
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.6], [distanceFromCenter * 15, distanceFromCenter * 3, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.5, 0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.8, 1])

  return (
    <motion.span
      className="inline-block text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground"
      style={{
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  )
}

const techStack = [
  { icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { icon: "https://cdn.simpleicons.org/css/1572B6" },
  { icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { icon: "https://cdn.simpleicons.org/supabase/3FCF8E" },
  { icon: "https://cdn.simpleicons.org/vercel/FFFFFF" },
  { icon: "https://cdn.simpleicons.org/github/FFFFFF" },
  { icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { icon: "https://cdn.simpleicons.org/git/F05032" },
  { icon: "https://cdn.simpleicons.org/npm/CB3837" },
]

const title = "My Tech Stack & Tools"

export function TechStackScroll() {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const centerIndex = Math.floor(techStack.length / 2)
  const titleCenterIndex = Math.floor(title.length / 2)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"],
  })

  return (
    <div
      ref={targetRef}
      className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[100vh] py-16 sm:py-24 md:py-32 flex flex-col items-center justify-center"
    >
      {/* Animated Title */}
      <div className="mb-8 sm:mb-12 md:mb-16 flex items-center justify-center flex-wrap px-2">
        {title.split("").map((char, index) => (
          <TitleCharacter
            key={index}
            char={char}
            index={index}
            centerIndex={titleCenterIndex}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <div
        className="w-full max-w-6xl mx-auto flex items-center justify-center flex-wrap gap-y-3 sm:gap-y-4 md:gap-y-6 px-2 sm:px-4 mt-8 sm:mt-12 md:mt-16"
        style={{ perspective: "1200px", perspectiveOrigin: "center center" }}
      >
        {techStack.map((tech, index) => (
          <IconCharacter
            key={index}
            icon={tech.icon}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
            totalIcons={techStack.length}
          />
        ))}
      </div>
    </div>
  )
}

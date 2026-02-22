"use client"

import { Button } from "@/components/ui/button"
import { TextReveal } from "@/components/text-reveal"
import TrueFocus from "@/components/true-focus"
import BlurText from "@/components/blur-text"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold flex justify-center my-1.5"
          >
            <BlurText text="Hi, I'm Joseph" delay={150} animateBy="words" direction="top" className="justify-center" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="-mt-4 my-0"
          >
            <TextReveal
              blur={8}
              delay={0.12}
              duration={0.8}
              from="bottom"
              split="word"
              className="justify-center text-lg xs:text-xl sm:text-2xl md:text-3xl text-muted-foreground"
            >
              UI/UX & Frontend Developer
            </TextReveal>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-2 px-2"
          >
            Crafting beautiful, intuitive digital experiences with modern technologies. Passionate about clean code and
            pixel-perfect designs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-4 pt-6 sm:pt-8 sm:flex-row sm:gap-6"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground px-6 py-5 sm:px-8 sm:py-6 w-full sm:w-auto max-w-[200px]"
              onClick={() => {
                const element = document.getElementById("projects")
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <TrueFocus
                sentence="View My Work"
                manualMode={false}
                blurAmount={3}
                borderColor="#ffffff"
                glowColor="rgba(255, 255, 255, 0.6)"
                animationDuration={0.4}
                pauseBetweenAnimations={0.8}
                textClassName="text-sm sm:text-base font-semibold"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glassmorphism px-6 py-5 sm:px-8 sm:py-6 bg-transparent w-full sm:w-auto max-w-[200px]"
              onClick={() => {
                const element = document.getElementById("contact")
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <TrueFocus
                sentence="Get In Touch"
                manualMode={false}
                blurAmount={3}
                borderColor="#888888"
                glowColor="rgba(136, 136, 136, 0.6)"
                animationDuration={0.4}
                pauseBetweenAnimations={0.8}
                textClassName="text-sm sm:text-base font-semibold"
              />
            </Button>
          </motion.div>
        </div>

        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.5 },
            y: { delay: 1.2, duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground sm:w-8 sm:h-8"
          ></svg>
        </motion.button>
      </motion.div>
    </section>
  )
}

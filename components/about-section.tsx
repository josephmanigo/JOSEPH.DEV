"use client"
import { motion, useInView, useAnimation } from "framer-motion"
import type React from "react"

import { ShimmerButton } from "@/components/shimmer-button"
import { TechStackScroll } from "@/components/tech-stack-scroll"
import { useState, useEffect, useRef, useMemo } from "react"
import ProfileCard from "@/components/profile-card"
import Link from "next/link"

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (Math.abs(currentScrollY - lastScrollY) < 10) return

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return scrollDirection
}

export function AboutSection() {
  const roles = ["Front-end Developer.", "UI/UX Designer."]
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const headerRef = useRef(null)
  const scrollDirection = useScrollDirection()
  const [animationDirection, setAnimationDirection] = useState<"up" | "down">("down")
  const headerInView = useInView(headerRef, { once: false, margin: "-50px", amount: 0.2 })
  const headerControls = useAnimation()

  useEffect(() => {
    if (headerInView) {
      setAnimationDirection(scrollDirection)
      headerControls.start("visible")
    } else {
      headerControls.start("hidden")
    }
  }, [headerInView, headerControls, scrollDirection])

  const headerVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: animationDirection === "down" ? -80 : 80,
        scale: 0.85,
        rotateX: animationDirection === "down" ? 35 : -35,
        filter: "blur(15px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 12,
          duration: 0.9,
        },
      },
    }),
    [animationDirection],
  )

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const typeSpeed = isDeleting ? 50 : 100
    const pauseDelay = isDeleting ? 50 : 1500

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDelay)
      return () => clearTimeout(timeout)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => (isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)))
      }, typeSpeed)
      return () => clearTimeout(timeout)
    }
  }, [displayText, isDeleting, currentRoleIndex, roles])

  const handleContactClick = () => {
    const element = document.getElementById("contact")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const handleProjectsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById("projects")
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16" style={{ perspective: "1200px" }} ref={headerRef}>
          <motion.h2
            variants={headerVariants}
            initial="hidden"
            animate={headerControls}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-16 md:mb-28"
            style={{ transformStyle: "preserve-3d" }}
          >
            About Me
          </motion.h2>
        </div>

        {/* Profile Section - Horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:flex-row justify-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className="text-center lg:text-left flex-1 mx-2.5 max-w-2xl order-2 lg:order-1"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {"Joseph Manigo".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="inline-block"
                  whileHover={{
                    scale: 1.2,
                    color: "#60a5fa",
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h3>

            <motion.p
              className="text-lg sm:text-xl mb-4 sm:mb-6 text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <span className="inline-block">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="inline-block ml-1 w-0.5 h-5 bg-gray-400 align-middle"
              />
            </motion.p>

            <motion.p
              className="text-muted-foreground text-base sm:text-lg leading-7 text-justify px-2 lg:px-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {
                "I'm a third-year BSIT student from Davao City, Philippines, specializing in UI/UX and front-end development. I build clean, modern, and user-focused web experiences using TypeScript, React, and Next.js. My work combines thoughtful design with reliable performance, ensuring every interface is intuitive, responsive, and visually engaging. I'm dedicated to continuous improvement, refining my craft through new tools, best practices, and emerging trends in modern web development."
              }
            </motion.p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mt-6">
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
              >
                <Link href="/educational-tour" className="block">
                  <ShimmerButton shimmerColor="#9ca3af" background="rgba(31, 41, 55, 0.8)" className="w-full sm:w-auto">
                    <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg">
                      Educational Tour
                    </span>
                  </ShimmerButton>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
                onClick={handleProjectsClick}
              >
                <ShimmerButton shimmerColor="#9ca3af" background="rgba(31, 41, 55, 0.8)" className="w-full sm:w-auto">
                  <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap text-white lg:text-lg">
                    View Project
                  </span>
                </ShimmerButton>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative flex-shrink-0 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProfileCard
              avatarUrlLight="/images/joseph.jfif"
              avatarUrlDark="/images/joseph.jfif"
              miniAvatarUrlLight="/images/joseph.jfif"
              miniAvatarUrlDark="/images/joseph.jfif"
              name="Joseph Manigo"
              title="Front-end Developer"
              handle="josephmanigo"
              status="Available for work"
              contactText="Contact Me"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={handleContactClick}
              behindGlowEnabled={true}
            />
          </motion.div>
        </motion.div>

        {/* Tech Stack Section */}
        <TechStackScroll />
      </div>
    </section>
  )
}

"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Code2 } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"

const projects = [
  {
    title: "Payroll Management",
    description:
      "A comprehensive payroll management system with employee tracking, salary computation, department distribution analytics, and real-time payroll processing dashboard.",
    image: "/images/payroll-management.png",
    video: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Charts"],
    features: ["Employee Management", "Payroll Processing", "Department Analytics", "Audit Logs"],
    link: "https://payroll-management-three.vercel.app/",
    github: "https://github.com/josephmanigo/Payroll-Management",
  },
  {
    title: "Don Macchiatos",
    description:
      "A modern coffee shop website for Don Macchiatos - Cebu's First 39 Pesos Coffee. Features menu showcase, about section, blog, and contact information.",
    image: "/images/don-macchiatos.png",
    video: null,
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    features: ["Menu Display", "Location Info", "Blog Section", "Mobile Responsive"],
    link: "https://josephmanigo.github.io/Don-Mac/donmac/",
    github: "https://github.com/josephmanigo/Don-Mac",
  },
  {
    title: "Nightraid BG",
    description:
      "A professional gaming and esports website featuring team information, match schedules, player profiles, and community engagement features.",
    image: null,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16433bff-cfaa-46d4-896c-fd71d8ad1cb5-ojbI7qcxtUxyNegTzPnN2TP0DLXh8f.mp4",
    tags: ["React", "Next.js", "Tailwind CSS", "Animation"],
    features: ["Esports Team Roster", "Clan Merch", "Achievements", "Events & Tournaments"],
    link: "https://www.nightraidbg.com/",
    github: "#",
  },
  {
    title: "Bisayang Aimlabs",
    description:
      "A 3D aim trainer game built for the web to help players improve their accuracy and reaction time. Features performance tracking and gridshot mechanics.",
    image: null,
    video: "/images/bisaya.mp4",
    tags: ["Three.js", "Web GL", "React", "Game Development"],
    features: ["Gridshot Mode", "FPS Mechanics", "Performance Tracking", "Real-time Stats"],
    link: "https://bisayang-aimlabs.onrender.com/",
    github: "https://github.com/josephmanigo/BISAYANG-AIMLABS",
  },
  {
    title: "Nightraid Bingo",
    description:
      "A multiplayer real-time bingo game featuring custom rooms, live chat, and automated number calling. Experience classic bingo with friends online.",
    image: "/images/nightraid-bingo.png",
    video: null,
    tags: ["Next.js", "Socket.io", "Tailwind CSS", "Multiplayer"],
    features: ["Real-time Multiplayer", "Live Chat", "Custom Rooms", "Auto-Call System"],
    link: "https://nightraid-bingo.vercel.app/",
    github: "https://github.com/josephmanigo/NIGHTRAID-BINGO",
  },
]

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

function AnimatedFlipCard({
  project,
  index,
  scrollDirection,
}: {
  project: (typeof projects)[0]
  index: number
  scrollDirection: "up" | "down"
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef(null)
  const [animationDirection, setAnimationDirection] = useState<"up" | "down">("down")
  const isInView = useInView(cardRef, { once: false, margin: "-50px", amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      setAnimationDirection(scrollDirection)
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: animationDirection === "down" ? 80 : -80,
        scale: 0.85,
        rotateX: animationDirection === "down" ? 15 : -15,
        filter: "blur(10px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: index * 0.1,
        },
      },
    }),
    [animationDirection, index],
  )

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      style={{ perspective: "2000px" }}
    >
      <div
        className="group h-[350px] sm:h-[380px] md:h-[420px] [perspective:2000px]"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onTouchStart={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}
        >
          {/* Front Side */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg">
              {/* Project Image or Video */}
              <div className="absolute inset-0">
                {project.video ? (
                  <video src={project.video} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                ) : (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>

              {/* Front Content */}
              <div className="relative h-full flex flex-col justify-end p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">{project.title}</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-[10px] sm:text-xs font-medium bg-secondary/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-[10px] sm:text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground sm:hidden">Tap to see details</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              {/* Back Content */}
              <div className="relative h-full flex flex-col p-4 sm:p-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1">{project.title}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Features */}
                <div className="flex-1 min-h-0">
                  <h4 className="text-[10px] sm:text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-1 sm:space-y-1.5">
                    {project.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground"
                      >
                        <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack & Actions */}
                <div className="mt-auto pt-2 sm:pt-3 border-t border-border/50">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-[10px] sm:text-xs bg-background/50 px-1.5 sm:px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      View Live
                    </a>
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-1.5 sm:p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        aria-label="View source code"
                      >
                        <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const scrollDirection = useScrollDirection()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const [animationDirection, setAnimationDirection] = useState<"up" | "down">("down")

  const isInView = useInView(sectionRef, { once: false, margin: "-50px", amount: 0.1 })
  const headerInView = useInView(headerRef, { once: false, margin: "-50px", amount: 0.2 })
  const controls = useAnimation()
  const headerControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      setAnimationDirection(scrollDirection)
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  useEffect(() => {
    if (headerInView) {
      setAnimationDirection(scrollDirection)
      headerControls.start("visible")
    } else {
      headerControls.start("hidden")
    }
  }, [headerInView, headerControls])

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

  const iconVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0,
        rotate: animationDirection === "down" ? -540 : 540,
        rotateY: animationDirection === "down" ? 180 : -180,
        y: animationDirection === "down" ? -50 : 50,
      },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        rotateY: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 150,
          damping: 12,
        },
      },
    }),
    [animationDirection],
  )

  const subtitleVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: animationDirection === "down" ? 50 : -50,
        scale: 0.9,
        filter: "blur(12px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 12,
          delay: 0.2,
        },
      },
    }),
    [animationDirection],
  )

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 overflow-hidden my-4 sm:my-7" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16" style={{ perspective: "1200px" }} ref={headerRef}>
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={headerControls}
            className="inline-flex items-center justify-center mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
            </div>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            initial="hidden"
            animate={headerControls}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance text-foreground"
            style={{ transformStyle: "preserve-3d" }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={headerControls}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-4"
          >
            A selection of my recent work showcasing modern web development and design
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <AnimatedFlipCard key={index} project={project} index={index} scrollDirection={scrollDirection} />
          ))}
        </div>
      </div>
    </section>
  )
}

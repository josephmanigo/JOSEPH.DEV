"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Code2, Search } from "lucide-react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"

const projects = [
  {
    title: "Payroll Management",
    description:
      "A full-featured payroll management system built with Next.js for handling employee records, automated salary computation, tax deductions, department-level analytics, and payroll history tracking.",
    image: "/images/payroll-management.png",
    video: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    features: ["Employee Records & CRUD", "Automated Salary Computation", "Department Analytics Charts", "Payroll History & Audit Logs"],
    link: "https://payroll-management-three.vercel.app/",
    github: "https://github.com/josephmanigo/Payroll-Management",
    featured: true,
  },
  {
    title: "Don Macchiatos",
    description:
      "A responsive promotional website for Don Macchiatos — Cebu's first ₱39 coffee brand. Showcases the full beverage menu, store locations, brand story, and blog content with a warm, inviting design.",
    image: "/images/don-macchiatos.png",
    video: null,
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    features: ["Full Beverage Menu Catalog", "Store Location & Map Info", "Brand Story & Blog", "Mobile-First Responsive Layout"],
    link: "https://josephmanigo.github.io/Don-Mac/donmac/",
    github: "https://github.com/josephmanigo/Don-Mac",
    featured: true,
  },
  {
    title: "Nightraid BG",
    description:
      "The official website for Nightraid BG — an esports organization. Features dynamic team roster pages, clan merchandise showcase, achievement highlights, and community event announcements.",
    image: null,
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16433bff-cfaa-46d4-896c-fd71d8ad1cb5-ojbI7qcxtUxyNegTzPnN2TP0DLXh8f.mp4",
    tags: ["React", "Next.js", "Tailwind CSS", "Animation"],
    features: ["Player Roster & Profiles", "Merchandise Storefront", "Team Achievements Timeline", "Community Events & News"],
    link: "https://www.nightraidbg.com/",
    github: "#",
    featured: true,
  },
  {
    title: "Bisayang Aimlabs",
    description:
      "A browser-based 3D aim trainer inspired by Aimlabs, built with Three.js and TypeScript. Players practice clicking targets in a 3D gridshot environment to sharpen FPS accuracy, reflex speed, and reaction time.",
    image: null,
    video: "/images/bisaya.mp4",
    tags: ["TypeScript", "Three.js", "WebGL", "Game Dev"],
    features: ["3D Gridshot Target Practice", "Real-time Accuracy & Reflex Stats", "FPS Camera Controls", "Score Tracking & Leaderboard"],
    link: "https://bisayang-aimlabs.onrender.com/",
    github: "https://github.com/josephmanigo/BISAYANG-AIMLABS",
    featured: true,
  },
  {
    title: "Nightraid Bingo",
    description:
      "A real-time multiplayer bingo game built with Next.js and Socket.io. Players can create or join custom rooms, chat live with opponents, and enjoy automated number calling with instant win detection.",
    image: "/images/nightraid-bingo.png",
    video: null,
    tags: ["Next.js", "TypeScript", "Socket.io", "Tailwind CSS"],
    features: ["Real-time Multiplayer via WebSockets", "Custom Room Creation & Join", "Live In-Game Chat", "Auto Number Caller & Win Detection"],
    link: "https://nightraid-bingo.vercel.app/",
    github: "https://github.com/josephmanigo/NIGHTRAID-BINGO",
    featured: true,
  },
  {
    title: "Brews Lee",
    description:
      "A modern single-page coffee shop website for Brews Lee, a Bruce Lee-inspired coffee brand. Built with React and Vite, featuring smooth animations, a visually rich beverage menu, and a responsive mobile-first design.",
    image: "/images/brews-lee.jpg",
    video: null,
    tags: ["React", "TypeScript", "Vite", "CSS"],
    features: ["Animated Beverage Menu Gallery", "Bruce Lee-Themed Branding", "Mobile-First Responsive UI", "Smooth Page Transitions"],
    link: "https://brewslee.vercel.app",
    github: "https://github.com/josephmanigo/Brews-Lee",
    featured: true,
  },
  {
    title: "Lewis Hamilton",
    description:
      "A cinematic scroll-driven storytelling website celebrating F1 legend Lewis Hamilton. Features horizontal scroll sections covering On Track stats (7 titles, 103 wins, 104 poles), Off Track lifestyle, Garage insights, and the full 2026 F1 race calendar.",
    image: "/images/lewis-hamilton.png",
    video: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    features: ["Scroll-Driven Horizontal Storytelling", "Career Stats & Milestones", "2026 F1 Calendar Grid", "Parallax Image Compositions"],
    link: "https://lewishamilton.vercel.app",
    github: "https://github.com/josephmanigo/LEWIS-HAMILTON",
    featured: true,
  },
  {
    title: "Smartbin",
    description:
      "An IoT-powered smart waste management dashboard with user authentication. Sign in to monitor real-time trash bin fill levels, receive instant alerts when bins are full, and view waste collection analytics on a clean, data-driven interface.",
    image: "/images/smart-bin.png",
    video: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "IoT"],
    features: ["User Authentication & Login", "Real-time Bin Level Monitoring", "Full Bin Alert Notifications", "Waste Analytics Dashboard"],
    link: "https://smartbins.vercel.app",
    github: "https://github.com/josephmanigo/SmartBin",
    featured: true,
  },
  {
    title: "Trash2Treasure",
    description:
      "An AI and Augmented Reality-powered recycling app. Point your camera at any waste item to instantly discover creative upcycling ideas visualized in AR. Promotes sustainability through interactive scanning, eco-education, and gamified recycling.",
    image: "/images/trash-treasure.png",
    video: null,
    tags: ["React", "TypeScript", "Three.js", "TensorFlow.js"],
    features: ["AI Waste Item Recognition", "AR Upcycling Visualization", "Camera-Based Item Scanning", "Sustainability Gamification"],
    link: "https://trash2treasures.vercel.app",
    github: "https://github.com/josephmanigo/Trash2Treasure",
    featured: true,
  },
  {
    title: "Nightraid Shop",
    description:
      "A premium e-commerce storefront for Nightraid esports team merchandise. Showcases jerseys, premium tees, gaming peripherals (keyboards, mousepads, mice, headsets), and features scroll-driven product reveals, image carousels, and a cart system — all in a dark, cinematic aesthetic.",
    image: "/images/nightraid-shop.jpg",
    video: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Jerseys & Apparel Showcase", "Gaming Peripherals Catalog", "Add-to-Cart & Checkout Flow", "Scroll-Driven Product Animations"],
    link: "https://nightraidshop.vercel.app",
    github: "https://github.com/josephmanigo/NIGHTRAID-SHOP",
    featured: true,
  },
  {
    title: "crosshere",
    description:
      "A real-time healthcare emergency management platform designed for schools and institutions. Features user authentication, role-based dashboards, emergency SOS alerts, medical symptom reporting, digital health cards, and clinic queue management. Developed by Quan Technologies.",
    image: "/images/crosshere.png",
    video: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    features: ["Role-Based Auth & Dashboards", "Real-time SOS Emergency Alerts", "Medical Symptom Reporting", "Digital Health Cards & Clinic Queue"],
    link: "https://crosshere.vercel.app",
    github: "https://github.com/josephmanigo/crosshere",
    featured: true,
  },
  {
    title: "Nightraid Bingo User Manual",
    description:
      "An interactive HTML documentation site serving as the official user manual for the Nightraid Bingo game. Covers step-by-step room creation, game rules, multiplayer settings, and troubleshooting FAQs.",
    image: null,
    video: null,
    tags: ["HTML", "CSS", "JavaScript"],
    features: ["Step-by-Step Gameplay Guide", "Room Creation Tutorial", "Multiplayer Settings Help", "Troubleshooting FAQ"],
    link: "https://nightraid-bingo-usermanual.vercel.app",
    github: "https://github.com/josephmanigo/NIGHTRAID-BINGO-USERMANUAL",
    featured: false,
  },
  {
    title: "JOSEPH.DEV Portfolio",
    description:
      "The source code for this personal developer portfolio. Built with Next.js and Framer Motion, featuring animated flip cards, custom light-ray background effects, a cinematic loading screen, and dark/light theme support.",
    image: null,
    video: null,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Animated 3D Flip Project Cards", "Custom Light-Ray Backgrounds", "Cinematic Loading Screen", "Dark/Light Theme Toggle"],
    link: "https://joseph-dev-blue.vercel.app",
    github: "https://github.com/josephmanigo/JOSEPH.DEV",
    featured: false,
  },
  {
    title: "JosepHub Utility Portal",
    description:
      "A lightweight HTML-based developer utility hub for hosting static assets, quick script experiments, and shared project deployment resources.",
    image: null,
    video: null,
    tags: ["HTML", "CSS", "JavaScript"],
    features: ["Static Asset Hosting", "Script Experiments"],
    link: "https://github.com/josephmanigo/JOSEPHUB",
    github: "https://github.com/josephmanigo/JOSEPHUB",
    featured: false,
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
  const [activeTab, setActiveTab] = useState<"featured" | "all">("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("All")

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

  const filteredRepos = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesLanguage =
        selectedLanguage === "All" ||
        project.tags.some((tag) => tag.toLowerCase() === selectedLanguage.toLowerCase())

      return matchesSearch && matchesLanguage
    })
  }, [searchQuery, selectedLanguage])

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 overflow-hidden my-4 sm:my-7" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12" style={{ perspective: "1200px" }} ref={headerRef}>
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
            Projects Showcase
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={headerControls}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-4"
          >
            Explore my work, ranging from featured design interfaces to all my public GitHub repositories
          </motion.p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full p-1 bg-secondary/30 backdrop-blur-md border border-border/50">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 relative ${
                activeTab === "featured"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "featured" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              Featured Projects
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 relative ${
                activeTab === "all"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "all" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              All Repositories ({projects.length})
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "featured" ? (
            <motion.div
              key="featured"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <AnimatedFlipCard key={index} project={project} index={index} scrollDirection={scrollDirection} />
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/30 backdrop-blur-md p-4 rounded-2xl border border-border/50">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search repository..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-background/50 border border-border/50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-foreground"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {["All", "TypeScript", "JavaScript", "HTML", "CSS"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold border transition-all duration-200 ${
                        selectedLanguage === lang
                          ? "bg-primary border-primary text-primary-foreground shadow-sm"
                          : "bg-background/40 border-border/50 text-muted-foreground hover:text-foreground hover:bg-background/80"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of All Repositories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
                      className="group flex flex-col justify-between p-5 rounded-2xl border border-border/50 bg-card/25 backdrop-blur-sm hover:bg-card/45 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full"
                    >
                      <div>
                        {/* Title & Language Indicator */}
                        <div className="flex justify-between items-start gap-4 mb-2.5">
                          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                project.tags.includes("TypeScript")
                                  ? "bg-blue-500"
                                  : project.tags.includes("JavaScript")
                                  ? "bg-yellow-500"
                                  : project.tags.includes("HTML")
                                  ? "bg-orange-500"
                                  : project.tags.includes("CSS")
                                  ? "bg-purple-500"
                                  : "bg-muted-foreground"
                              }`}
                            />
                            {project.tags.includes("TypeScript")
                              ? "TypeScript"
                              : project.tags.includes("JavaScript")
                              ? "JavaScript"
                              : project.tags.includes("HTML")
                              ? "HTML"
                              : project.tags.includes("CSS")
                              ? "CSS"
                              : "Web"}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        {/* Tag badges */}
                        <div className="flex flex-wrap gap-1 mb-3.5 h-[20px] overflow-hidden">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[9px] bg-background/50 border-border/40 text-muted-foreground py-0 px-1.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-[9px] bg-background/50 border-border/40 text-muted-foreground py-0 px-1"
                            >
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/30">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                              project.github === "#"
                                ? "text-muted-foreground cursor-not-allowed pointer-events-none opacity-40"
                                : "text-muted-foreground hover:text-foreground transition-colors"
                            }`}
                          >
                            <Github className="h-3.5 w-3.5" />
                            Repository
                          </a>
                          {project.link && project.link !== "#" && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No repositories found matching your search.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}


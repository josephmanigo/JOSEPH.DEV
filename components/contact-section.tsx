"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from "lucide-react"
import { IconCloud } from "@/components/icon-cloud"
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { cn } from "@/lib/utils"
import { motion, useInView, useAnimation } from "framer-motion"

const techStackSlugs = [
  "html5",
  "css3",
  "javascript",
  "typescript",
  "react",
  "nextdotjs",
  "tailwindcss",
  "postgresql",
  "mysql",
  "supabase",
  "vercel",
  "github",
  "figma",
  "nodedotjs",
  "git",
  "npm",
]


export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  const isInView = useInView(sectionRef, { once: true, amount: 0.1, margin: "-50px" })
  const headerInView = useInView(headerRef, { once: true, margin: "-50px", amount: 0.2 })
  const controls = useAnimation()
  const headerControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  useEffect(() => {
    if (headerInView) {
      headerControls.start("visible")
    } else {
      headerControls.start("hidden")
    }
  }, [headerInView, headerControls])

  const headerVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 80,
        scale: 0.85,
        rotateX: -35,
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
    [],
  )

  const iconVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        scale: 0,
        rotate: 540,
        rotateY: -180,
        y: 50,
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
    [],
  )

  const subtitleVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 50,
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
    [],
  )

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 80,
        scale: 0.85,
        rotateX: -15,
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
          delay: 0.1,
        },
      },
    }),
    [],
  )

  const contactItemVariants = useMemo(
    () => ({
      hidden: (i: number) => ({
        opacity: 0,
        x: 80,
        y: 30,
        scale: 0.85,
        rotateX: -15,
        filter: "blur(8px)",
      }),
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.2 + i * 0.1,
        },
      }),
    }),
    [],
  )

  const techStackVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 30,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        },
      },
    }),
    [],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => setSubmitStatus("idle"), 5000)
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ perspective: "1200px" }}>
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
            {"Let's Work Together"}
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={headerControls}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance px-4"
          >
            Have a project in mind? Feel free to reach out and {"let's"} create something amazing together
          </motion.p>
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={controls}
          style={{ transformStyle: "preserve-3d", perspective: "2000px" }}
        >
          <Card className="glassmorphism border-2 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-6 sm:gap-8 border-b lg:border-b-0 lg:border-r border-border/50">
                  <div className="space-y-4 sm:space-y-5">
                    <motion.h3
                      variants={contactItemVariants}
                      custom={0}
                      initial="hidden"
                      animate={controls}
                      className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      My Contacts
                    </motion.h3>
                    <motion.div
                      variants={contactItemVariants}
                      custom={1}
                      initial="hidden"
                      animate={controls}
                      className="flex items-center gap-3 sm:gap-4"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">Email</h4>
                        <p className="text-sm sm:text-base text-foreground break-all">joseph.manigo@hcdc.edu.ph</p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={contactItemVariants}
                      custom={2}
                      initial="hidden"
                      animate={controls}
                      className="flex items-center gap-3 sm:gap-4"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">Phone</h4>
                        <p className="text-sm sm:text-base text-foreground">+63 96 1559 6997 </p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={contactItemVariants}
                      custom={3}
                      initial="hidden"
                      animate={controls}
                      className="flex items-center gap-3 sm:gap-4"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm text-muted-foreground">Location</h4>
                        <p className="text-sm sm:text-base text-foreground">Tibungco Davao City, Philippines, 8000 </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={contactItemVariants}
                    custom={4}
                    initial="hidden"
                    animate={controls}
                    className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                      <h3 className="font-semibold text-sm sm:text-base">Available for Freelance</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {"I'm"} currently available for freelance projects and full-time opportunities. {"Let's"} build
                      something great together!
                    </p>
                  </motion.div>

                  <motion.div
                    variants={contactItemVariants}
                    custom={5}
                    initial="hidden"
                    animate={controls}
                    className="flex-1"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1 sm:space-y-1.5">
                          <label htmlFor="name" className="text-xs sm:text-sm font-medium">
                            Name
                          </label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary h-9 sm:h-10 text-sm"
                            required
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-1 sm:space-y-1.5">
                          <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary h-9 sm:h-10 text-sm"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-1.5">
                        <label htmlFor="message" className="text-xs sm:text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={3}
                          className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary text-sm sm:rows-4"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      {submitStatus === "success" && (
                        <div className="p-2.5 sm:p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs sm:text-sm flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          Message sent successfully! I'll get back to you soon.
                        </div>
                      )}

                      {submitStatus === "error" && (
                        <div className="p-2.5 sm:p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm">
                          {errorMessage || "Failed to send message. Please try again."}
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="default"
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground h-10 sm:h-11 text-sm sm:text-base"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                </div>

                <motion.div
                  variants={techStackVariants}
                  initial="hidden"
                  animate={controls}
                  className="relative p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center z-10">Tech Stack</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center mb-4 sm:mb-6 z-10">
                    Technologies I work with
                  </p>
                  <div className="w-full h-full flex items-center justify-center flex-1 z-10">
                    <IconCloud iconSlugs={techStackSlugs} />
                  </div>
                  <AnimatedGridPattern
                    numSquares={30}
                    maxOpacity={0.1}
                    duration={3}
                    repeatDelay={1}
                    className={cn(
                      "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                      "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                    )}
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
